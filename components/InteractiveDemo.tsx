
"use client";

import { useMemo, useState, type FormEvent } from "react";
import Link from "next/link";
import { useAISession } from "./AISessionProvider";

type ProviderId =
  | "openrouter"
  | "google"
  | "openai"
  | "anthropic";

type ProviderOption = {
  id: ProviderId;
  label: string;
  placeholder: string;
};

export type DemoProject = {
  slug: string;
  name: string;
  category: string;
  description: string;
  tags: string[];
  liveUrl: string;
  githubUrl: string;
  detailsUrl: string;
};

type Props = {
  projects: DemoProject[];
};

const providers: ProviderOption[] = [
  {
    id: "openrouter",
    label: "OpenRouter",
    placeholder: "openai/gpt-oss-20b:free",
  },
  {
    id: "google",
    label: "Google Gemini",
    placeholder: "gemini-3.5-flash-lite",
  },
  {
    id: "openai",
    label: "OpenAI",
    placeholder: "gpt-5-mini",
  },
  {
    id: "anthropic",
    label: "Anthropic",
    placeholder: "claude-...",
  },
];

const HANDOFF_PARAM = "portfolio_llm_session";

function buildLaunchUrl(
  liveUrl: string,
  token: string,
): string {
  const target = new URL(liveUrl);

  // Transitional behaviour only.
  // Replace this with the one-time gateway handoff after
  // the gateway and receiving demo apps support code exchange.
  target.searchParams.set(HANDOFF_PARAM, token);

  return target.toString();
}

export function InteractiveDemo({ projects }: Props) {
  const {
    token,
    provider: activeProvider,
    model: activeModel,
    hydrated,
    creating,
    error,
    createSession,
    revokeSession,
  } = useAISession();

  const [provider, setProvider] =
    useState<ProviderId>("google");

  const [model, setModel] =
    useState("gemini-3.5-flash-lite");

  const [apiKey, setApiKey] = useState("");

  const selectedProvider = useMemo(
    () =>
      providers.find((item) => item.id === provider) ??
      providers[0],
    [provider],
  );

  async function handleConnect(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const connected = await createSession({
      provider,
      model,
      apiKey,
    });

    // Clear the raw provider key only when the gateway
    // confirms successful session creation.
    if (connected) {
      setApiKey("");
    }
  }

  function launchProject(project: DemoProject) {
    if (!token || !project.liveUrl) {
      return;
    }

    const launchUrl = buildLaunchUrl(
      project.liveUrl,
      token,
    );

    window.open(
      launchUrl,
      "_blank",
      "noopener,noreferrer",
    );
  }

  return (
    <section
      className="demo-workbench"
      aria-label="Live demonstration access"
    >
      <div className="demo-workbench-intro">
        <div>
          <p className="studio-eyebrow">
            Live demonstrations
          </p>

          <h3>One connection. The systems below.</h3>
        </div>

        <p>
          Connect your own AI provider API key once. Use
          that temporary session to open either
          demonstration in a new tab.
        </p>
      </div>

      <div className="demo-workbench-grid">
        <aside className="demo-access-panel">
          <div className="demo-panel-heading">
            <p className="studio-eyebrow">
              Demo access
            </p>

            <span
              className={`demo-connection-indicator ${
                token ? "is-connected" : ""
              }`}
            >
              <span aria-hidden="true" />

              {hydrated
                ? token
                  ? "Connected"
                  : "Not connected"
                : "Checking session"}
            </span>
          </div>

          {token ? (
            <div className="demo-session-active">
              <div
                className="demo-session-check"
                aria-hidden="true"
              >
                ✓
              </div>

              <h4>Provider connected</h4>

              <p className="demo-session-model">
                {activeProvider} · {activeModel}
              </p>

              <p>
                This short-lived session can be used to
                launch any demonstration shown here. It
                expires automatically or can be ended now.
              </p>

              <button
                className="demo-secondary-button"
                type="button"
                onClick={() => void revokeSession()}
              >
                End session
              </button>
            </div>
          ) : (
            <form
              className="demo-connect-form"
              onSubmit={handleConnect}
            >
              <p className="demo-form-intro">
                Connect your own AI provider account using
                an API key. The key is sent over HTTPS to
                the configured gateway for temporary
                session use. It is not saved in browser
                storage.
              </p>

              <div className="demo-field">
                <label htmlFor="demo-provider">
                  Provider
                </label>

                <select
                  id="demo-provider"
                  value={provider}
                  onChange={(event) => {
                    const nextProvider =
                      event.target.value as ProviderId;

                    setProvider(nextProvider);

                    const nextOption = providers.find(
                      (item) => item.id === nextProvider,
                    );

                    if (nextOption) {
                      setModel(nextOption.placeholder);
                    }
                  }}
                >
                  {providers.map((item) => (
                    <option
                      key={item.id}
                      value={item.id}
                    >
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="demo-field">
                <label htmlFor="demo-model">
                  Model ID
                </label>

                <input
                  id="demo-model"
                  value={model}
                  onChange={(event) =>
                    setModel(event.target.value)
                  }
                  placeholder={selectedProvider.placeholder}
                  spellCheck={false}
                  autoComplete="off"
                  required
                />
              </div>

              <div className="demo-field">
                <label htmlFor="demo-api-key">
                  Provider API key
                </label>

                <input
                  id="demo-api-key"
                  type="password"
                  value={apiKey}
                  onChange={(event) =>
                    setApiKey(event.target.value)
                  }
                  placeholder={`Your ${selectedProvider.label} API key`}
                  autoComplete="new-password"
                  spellCheck={false}
                  required
                />
              </div>

              {error ? (
                <p
                  className="demo-form-error"
                  role="alert"
                >
                  {error}
                </p>
              ) : null}

              <button
                className="demo-connect-button"
                type="submit"
                disabled={
                  creating ||
                  !apiKey.trim() ||
                  !model.trim()
                }
              >
                {creating
                  ? "Connecting…"
                  : "Connect provider"}

                <span aria-hidden="true">→</span>
              </button>
            </form>
          )}

          <div className="demo-security-note">
            <strong>For evaluation only</strong>

            <p>
              Use synthetic or non-confidential information.
              Do not submit production credentials, customer
              records, or private business documents through
              public demonstrations.
            </p>
          </div>
        </aside>

        <div className="demo-project-list">
          {projects.map((project, index) => (
            <article
              className="demo-project-card"
              key={project.slug}
            >
              <div className="demo-project-card-top">
                <span className="studio-number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="demo-project-category">
                  {project.category}
                </span>
              </div>

              <h4>{project.name}</h4>

              <p>{project.description}</p>

              <div
                className="demo-project-tags"
                aria-label={`${project.name} technologies`}
              >
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>

              <div className="demo-project-actions">
                <button
                  className="demo-launch-button"
                  type="button"
                  onClick={() => launchProject(project)}
                  disabled={!token || !project.liveUrl}
                  title={
                    !project.liveUrl
                      ? "A live deployment is not configured"
                      : token
                        ? "Open this demonstration with the connected session"
                        : "Connect a provider to enable this demonstration"
                  }
                >
                  {token
                    ? "Launch demonstration"
                    : "Connect to launch"}

                  <span aria-hidden="true">↗</span>
                </button>

                <div className="demo-project-secondary-links">
                  {project.detailsUrl ? (
                    <Link href={project.detailsUrl}>
                      Technical overview
                    </Link>
                  ) : null}

                  {project.githubUrl ? (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Source
                    </a>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <p className="demo-workbench-footnote">
        The provider API key is not written to browser
        storage. The gateway handles temporary
        server-side session use. Only a short-lived
        session token is kept in this browser session.
        Session duration, encryption and revocation depend
        on the production gateway configuration.
      </p>
    </section>
  );
}
