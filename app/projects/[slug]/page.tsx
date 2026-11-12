
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, getProjectLiveUrl } from "@/lib/projects";
import { InteractiveDemo } from "@/components/InteractiveDemo";
import { studioMetadata } from "@/lib/seo";

const PUBLIC_PROJECT_SLUGS = [
  "evidenceflow",
  "quotesense",
] as const;

type PublicProjectSlug = (typeof PUBLIC_PROJECT_SLUGS)[number];

export const dynamicParams = false;

export function generateStaticParams() {
  return PUBLIC_PROJECT_SLUGS.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!PUBLIC_PROJECT_SLUGS.includes(slug as PublicProjectSlug)) {
    return {
      title: "Engineering reference not found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const project = getProject(slug);

  if (!project) {
    return {
      title: "Engineering reference not found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return studioMetadata({
    title: project.name,
    description: project.description,
    path: `/projects/${project.slug}`,
    type: "article",
  });
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!PUBLIC_PROJECT_SLUGS.includes(slug as PublicProjectSlug)) {
    notFound();
  }

  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  const liveUrl = getProjectLiveUrl(project);
  const story = project.star;

  return (
    <main className="studio-main studio-project-page">
      <div className="studio-container">
        <section className="studio-project-hero">
          <Link className="studio-back-link" href="/#systems">
            ← Engineering references
          </Link>

          <p className="studio-eyebrow">
            System reference / {project.number}
          </p>

          <p className="studio-project-category">
            {project.eyebrow}
          </p>

          <h1>{project.name}</h1>

          <p className="studio-project-lead">
            {project.description}
          </p>

          <div className="studio-project-links">
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noreferrer"
              >
                Open live system ↗
              </a>
            )}

            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
            >
              Inspect source ↗
            </a>
          </div>
        </section>

        <section className="studio-project-overview">
          <article>
            <p className="studio-eyebrow">Problem context</p>
            <h2>What the system addresses</h2>
            <p>{project.problem}</p>
          </article>

          <article>
            <p className="studio-eyebrow">Engineering approach</p>
            <h2>How the system is designed</h2>
            <p>{project.solution}</p>
          </article>
        </section>

        <section className="studio-project-section">
          <p className="studio-eyebrow">System architecture</p>
          <h2>Architecture and workflow</h2>

          <ol className="studio-architecture-list">
            {project.architecture.map((item, index) => (
              <li key={item}>
                <span>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <strong>{item}</strong>
              </li>
            ))}
          </ol>
        </section>

        <section className="studio-project-section">
          <p className="studio-eyebrow">
            Implementation detail
          </p>

          <h2>Technical decisions and reliability</h2>

          <div className="studio-project-tags">
            {project.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>

          <div className="studio-project-overview studio-project-lists">
            <article>
              <h3>Design decisions</h3>
              <ul>
                {project.decisions.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>

            <article>
              <h3>Reliability considerations</h3>
              <ul>
                {project.reliability.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        {story && (
          <section className="studio-project-section">
            <p className="studio-eyebrow">Build notes</p>
            <h2>From problem to implementation</h2>

            <div className="studio-story-grid">
              <article>
                <span className="studio-number">
                  01 / Situation
                </span>
                <p>{story.situation}</p>
              </article>

              <article>
                <span className="studio-number">
                  02 / Task
                </span>
                <p>{story.task}</p>
              </article>

              <article>
                <span className="studio-number">
                  03 / Action
                </span>
                <ul>
                  {story.action.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>

              <article>
                <span className="studio-number">
                  04 / Result
                </span>
                <ul>
                  {story.result.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            </div>
          </section>
        )}

        <section
          className="studio-project-demo-section"
          id="try-demo"
        >
          <div className="studio-section-heading">
            <div>
              <p className="studio-eyebrow">
                Live system access
              </p>
              <h2>
                Connect your provider and inspect the system.
              </h2>
            </div>

            <p>
              Interactive access uses the shared BYOK workbench. Connect
              your provider once and use the temporary session to launch
              this system or another public engineering reference.
            </p>
          </div>

          {/* Keep BYOK required for interactive project launches. */}
          <InteractiveDemo
            projects={[
              {
                slug: project.slug,
                name: project.name,
                category: project.eyebrow,
                description: project.short,
                tags: project.tags,
                liveUrl,
                githubUrl: project.github,
                detailsUrl: "",
              },
            ]}
          />
        </section>

        <div className="studio-project-bottom-links">
          <Link href="/#systems">
            ← Back to engineering references
          </Link>

          <Link href="/contact">
            Discuss a related engagement ↗
          </Link>
        </div>
      </div>
    </main>
  );
}
