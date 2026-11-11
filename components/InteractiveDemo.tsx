
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

function buildLaunchUrl(liveUrl: string, token: string) {
  const target = new URL(liveUrl);

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

  const [provider, setProvider] = useState<ProviderId>("google");
  const [model, setModel] = useState("gemini-3.5-flash-lite");
  const [apiKey, setApiKey] = useState("");

  const selectedProvider = useMemo(
    () =>
      providers.find((item) => item.id === provider) ??
      providers[0],
    [provider],
  );

  const handleConnect = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    await createSession({
      provider,
      model,
      apiKey,
    });

    // Do not clear the key here. If the gateway rejects the
    // request, the user can correct the issue and retry.
  };

  const launchProject = (project: DemoProject) => {
    if (!token || !project.liveUrl) {
      return;
    }

    window.open(
      buildLaunchUrl(project.liveUrl, token),
      "_blank",
      "noopener,noreferrer",
    );
  };

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
          Connect a provider once. Use that temporary
          session to open either demonstration in a new tab.
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
                Use your own provider account and API key.
                Your key is sent to the configured gateway
                for temporary encrypted session use.
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
                  API key
                </label>

                <input
                  id="demo-api-key"
                  type="password"
                  value={apiKey}
                  onChange={(event) =>
                    setApiKey(event.target.value)
                  }
                  placeholder={`Your ${selectedProvider.label} API key`}
                  autoComplete="off"
                  spellCheck={false}
                  required
                />
              </div>

              {error && (
                <p
                  className="demo-form-error"
                  role="alert"
                >
                  {error}
                </p>
              )}

              <button
                className="demo-connect-button"
                type="submit"
                disabled={creating}
              >
                {creating ? "Connecting…" : "Connect provider"}

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
              public demos.
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
                  0{index + 1}
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
                  {project.detailsUrl && (
                    <Link href={project.detailsUrl}>
                      Technical overview
                    </Link>
                  )}

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Source
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <p className="demo-workbench-footnote">
        The provider key is not written to browser storage.
        The gateway encrypts it for temporary server-side
        session use; only a short-lived session token is
        kept in this browser session. Session duration and
        security depend on the production gateway
        configuration.
      </p>
    </section>
  );
}
