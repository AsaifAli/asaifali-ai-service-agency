
"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";

type SessionState = {
  token: string | null;
  provider: string;
  model: string;
  expiresAt: number | null;
};

type CreateArgs = {
  provider: string;
  model: string;
  apiKey: string;
};

type ContextValue = SessionState & {
  hydrated: boolean;
  creating: boolean;
  error: string;
  createSession: (args: CreateArgs) => Promise<boolean>;
  revokeSession: () => Promise<void>;
};

const STORAGE_KEY = "portfolio-ai-session";

const EMPTY_SESSION: SessionState = {
  token: null,
  provider: "",
  model: "",
  expiresAt: null,
};

const GATEWAY_URL =
  process.env.NEXT_PUBLIC_LLM_GATEWAY_URL?.replace(/\/$/, "");

export const SessionContext =
  createContext<ContextValue | null>(null);

let clientSnapshot: SessionState = EMPTY_SESSION;
let clientSnapshotInitialized = false;

const listeners = new Set<() => void>();

function emitSessionChange() {
  listeners.forEach((listener) => listener());
}

function subscribeToSession(listener: () => void) {
  listeners.add(listener);

  return () => listeners.delete(listener);
}

function loadSession(): SessionState {
  if (typeof window === "undefined") {
    return EMPTY_SESSION;
  }

  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);

    if (!raw) {
      return EMPTY_SESSION;
    }

    const parsed = JSON.parse(raw) as SessionState;

    if (!parsed?.token) {
      window.sessionStorage.removeItem(STORAGE_KEY);
      return EMPTY_SESSION;
    }

    if (
      parsed.expiresAt &&
      Date.now() >= parsed.expiresAt
    ) {
      window.sessionStorage.removeItem(STORAGE_KEY);
      return EMPTY_SESSION;
    }

    return parsed;
  } catch {
    window.sessionStorage.removeItem(STORAGE_KEY);
    return EMPTY_SESSION;
  }
}

function getClientSession() {
  if (!clientSnapshotInitialized) {
    clientSnapshot = loadSession();
    clientSnapshotInitialized = true;
  }

  return clientSnapshot;
}

function getServerSession() {
  return EMPTY_SESSION;
}

export function AISessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = useSyncExternalStore(
    subscribeToSession,
    getClientSession,
    getServerSession,
  );

  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");

  const hydrated = useSyncExternalStore(
    subscribeToSession,
    () => true,
    () => false,
  );

  useEffect(() => {
    if (!session.expiresAt) {
      return;
    }

    const remaining = Math.max(
      0,
      session.expiresAt - Date.now(),
    );

    const timer = window.setTimeout(() => {
      window.sessionStorage.removeItem(STORAGE_KEY);

      clientSnapshot = EMPTY_SESSION;
      clientSnapshotInitialized = true;

      emitSessionChange();
    }, remaining);

    return () => window.clearTimeout(timer);
  }, [session.expiresAt]);

  const createSession = useCallback(
    async ({
      provider,
      model,
      apiKey,
    }: CreateArgs): Promise<boolean> => {
      if (!GATEWAY_URL) {
        setError(
          "Interactive demonstrations are not configured yet.",
        );
        return false;
      }

      if (!apiKey.trim() || !model.trim()) {
        setError(
          "Enter your provider API key and a model ID to continue.",
        );
        return false;
      }

      setCreating(true);
      setError("");

      try {
        const response = await fetch(
          `${GATEWAY_URL}/v1/demo/session`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              provider,
              model: model.trim(),
              api_key: apiKey,
            }),
            cache: "no-store",
          },
        );

        const payload = await response
          .json()
          .catch(() => ({}));

        if (!response.ok) {
          throw new Error(
            payload?.detail ||
              payload?.error?.message ||
              "Unable to create the demonstration session.",
          );
        }

        if (
          typeof payload?.access_token !== "string" ||
          !payload.access_token.trim()
        ) {
          throw new Error(
            "The gateway did not return a valid session token.",
          );
        }

        const expiresAt = payload.expires_at
          ? Number(payload.expires_at) * 1000
          : payload.expires_in
            ? Date.now() + Number(payload.expires_in) * 1000
            : Date.now() + 15 * 60 * 1000;

        if (
          !Number.isFinite(expiresAt) ||
          expiresAt <= Date.now()
        ) {
          throw new Error(
            "The gateway returned an invalid session expiry.",
          );
        }

        const next: SessionState = {
          token: payload.access_token,
          provider,
          model: model.trim(),
          expiresAt,
        };

        window.sessionStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(next),
        );

        clientSnapshot = next;
        clientSnapshotInitialized = true;

        emitSessionChange();

        return true;
      } catch (caught) {
        setError(
          caught instanceof Error
            ? caught.message
            : "Unable to create the demonstration session.",
        );

        return false;
      } finally {
        setCreating(false);
      }
    },
    [],
  );

  const revokeSession = useCallback(async () => {
    if (GATEWAY_URL && session.token) {
      try {
        await fetch(
          `${GATEWAY_URL}/v1/demo/session/revoke`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${session.token}`,
            },
            cache: "no-store",
          },
        );
      } catch {
        // Local session state is cleared even if the gateway
        // cannot be reached. The server-side token will expire.
      }
    }

    window.sessionStorage.removeItem(STORAGE_KEY);

    clientSnapshot = EMPTY_SESSION;
    clientSnapshotInitialized = true;

    emitSessionChange();
    setError("");
  }, [session.token]);

  const value = useMemo<ContextValue>(
    () => ({
      ...session,
      hydrated,
      creating,
      error,
      createSession,
      revokeSession,
    }),
    [
      session,
      hydrated,
      creating,
      error,
      createSession,
      revokeSession,
    ],
  );

  return (
    <SessionContext.Provider value={value}>
      {children}
    </SessionContext.Provider>
  );
}

export function useAISession() {
  const value = useContext(SessionContext);

  if (!value) {
    throw new Error(
      "useAISession must be used within AISessionProvider",
    );
  }

  return value;
}
