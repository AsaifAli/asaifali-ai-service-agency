import { NextResponse } from "next/server";

export const runtime = "nodejs";

const ALLOWED_PROJECTS = new Set([
  "evidenceflow",
  "quotesense",
]);

const CODE_PATTERN = /^[A-Za-z0-9_-]{32,128}$/;

function noStoreHeaders() {
  return {
    "Cache-Control": "no-store, max-age=0",
    Pragma: "no-cache",
  };
}

function getGatewayHandoffUrl(): string | null {
  const configured =
    process.env.NEXT_PUBLIC_LLM_GATEWAY_URL?.trim();

  if (!configured) return null;

  try {
    const url = new URL(configured);

    if (!["https:", "http:"].includes(url.protocol)) {
      return null;
    }

    if (
      process.env.NODE_ENV === "production" &&
      url.protocol !== "https:"
    ) {
      return null;
    }

    if (
      url.username ||
      url.password ||
      url.search ||
      url.hash
    ) {
      return null;
    }

    let path = url.pathname.replace(/\/+$/, "");

    if (path.endsWith("/v1")) {
      path = path.slice(0, -3).replace(/\/+$/, "");
    }

    url.pathname = `${path}/v1/demo/session/handoff`;
    url.search = "";
    url.hash = "";

    return url.toString();
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  // The reusable session token is accepted only in the Authorization
  // header, never in a query string or request body.
  const authorization =
    request.headers.get("authorization") || "";

  const match = /^Bearer ([A-Za-z0-9._~-]{24,8192})$/i.exec(
    authorization,
  );

  if (!match) {
    return NextResponse.json(
      {
        error:
          "A valid portfolio session is required. Reconnect your provider.",
      },
      {
        status: 401,
        headers: noStoreHeaders(),
      },
    );
  }

  const body = (await request.json().catch(() => null)) as
    | { project?: unknown }
    | null;

  const project =
    typeof body?.project === "string"
      ? body.project.trim().toLowerCase()
      : "";

  if (!ALLOWED_PROJECTS.has(project)) {
    return NextResponse.json(
      { error: "Unsupported demonstration project." },
      {
        status: 400,
        headers: noStoreHeaders(),
      },
    );
  }

  const endpoint = getGatewayHandoffUrl();

  if (!endpoint) {
    return NextResponse.json(
      {
        error:
          "The shared AI Gateway is not configured for secure demo launches.",
      },
      {
        status: 503,
        headers: noStoreHeaders(),
      },
    );
  }

  try {
    const upstream = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${match[1]}`,
        "Content-Type": "application/json",
        Accept: "application/json",
        "Cache-Control": "no-store",
        Pragma: "no-cache",
      },
      body: JSON.stringify({ project }),
      cache: "no-store",
      redirect: "error",
      signal: AbortSignal.timeout(8000),
    });

    if (!upstream.ok) {
      const status =
        upstream.status === 401
          ? 401
          : upstream.status === 429
            ? 429
            : upstream.status === 503
              ? 503
              : upstream.status >= 500
                ? 502
                : 400;

      const error =
        status === 401
          ? "Your AI session is invalid or expired. Reconnect your provider."
          : status === 429
            ? "Too many launch attempts. Wait briefly and retry."
            : status === 503 || status === 502
              ? "The shared AI Gateway is temporarily unavailable."
              : "The Gateway rejected this demonstration launch.";

      return NextResponse.json(
        { error },
        {
          status,
          headers: noStoreHeaders(),
        },
      );
    }

    const payload = await upstream.json().catch(() => null);

    if (
      !payload ||
      typeof payload.code !== "string" ||
      !CODE_PATTERN.test(payload.code) ||
      payload.project !== project ||
      !Number.isInteger(payload.expires_in) ||
      payload.expires_in < 1 ||
      payload.expires_in > 60
    ) {
      return NextResponse.json(
        {
          error: "The Gateway returned an invalid handoff response.",
        },
        {
          status: 502,
          headers: noStoreHeaders(),
        },
      );
    }

    // Return only the one-time code. Never return the portfolio JWT.
    return NextResponse.json(
      {
        code: payload.code,
        expires_in: payload.expires_in,
        project,
      },
      {
        status: 200,
        headers: noStoreHeaders(),
      },
    );
  } catch {
    return NextResponse.json(
      {
        error:
          "The shared AI Gateway could not be reached. Please retry.",
      },
      {
        status: 502,
        headers: noStoreHeaders(),
      },
    );
  }
}
