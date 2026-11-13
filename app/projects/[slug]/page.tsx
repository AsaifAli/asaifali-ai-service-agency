import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/lib/portfolio-data";
import { FEATURED_PROJECT_SLUGS } from "@/lib/featured-projects";
import { getProjectLiveUrl } from "@/lib/projects";
import { InteractiveDemo } from "@/components/InteractiveDemo";
import { studioMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = true;

export function generateStaticParams() {
  return FEATURED_PROJECT_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Engineering reference not found", robots: { index: false, follow: false } };
  return studioMetadata({ title: project.name, description: project.description, path: `/projects/${project.slug}`, type: "article" });
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const liveUrl = getProjectLiveUrl(project);
  const story = project.star;

  return (
    <main className="studio-main studio-inner-page studio-project-page refresh-inner-page">
      <div className="studio-container">
        <section className="studio-project-hero refresh-project-hero">
          <Link className="studio-back-link" href="/#work">← Selected work</Link>
          <p className="studio-eyebrow">Independent system / {project.number} / {project.eyebrow}</p>
          <h1>{project.name}</h1>
          <p className="studio-project-lead">{project.description}</p>
          <div className="studio-project-links">
            {liveUrl ? <a href={liveUrl} target="_blank" rel="noreferrer">Open live system ↗</a> : null}
            <a href={project.github} target="_blank" rel="noreferrer">Inspect source code ↗</a>
            <Link href="/contact">Discuss a similar workflow ↗</Link>
          </div>
          <p className="refresh-independent-note">Independent engineering build · Not a client case study</p>
        </section>

        <section className="studio-project-overview refresh-project-overview">
          <article><p className="studio-eyebrow">The problem</p><h2>What the system addresses</h2><p>{project.problem}</p></article>
          <article><p className="studio-eyebrow">The implementation</p><h2>How it is approached</h2><p>{project.solution}</p></article>
        </section>

        <section className="studio-project-section">
          <p className="studio-eyebrow">System map</p><h2>Architecture and workflow</h2>
          <ol className="studio-architecture-list">{project.architecture.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong></li>)}</ol>
        </section>

        <section className="studio-project-section">
          <p className="studio-eyebrow">Implementation detail</p><h2>Engineering decisions and reliability</h2>
          <div className="studio-project-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
          <div className="studio-project-overview studio-project-lists">
            <article><h3>Design decisions</h3><ul>{project.decisions.map((item) => <li key={item}>{item}</li>)}</ul></article>
            <article><h3>Reliability considerations</h3><ul>{project.reliability.map((item) => <li key={item}>{item}</li>)}</ul></article>
          </div>
        </section>

        {story ? <section className="studio-project-section"><p className="studio-eyebrow">Build notes</p><h2>From problem to implementation</h2><div className="studio-story-grid">
          <article><span className="studio-number">01 / Situation</span><p>{story.situation}</p></article>
          <article><span className="studio-number">02 / Task</span><p>{story.task}</p></article>
          <article><span className="studio-number">03 / Action</span><ul>{story.action.map((item) => <li key={item}>{item}</li>)}</ul></article>
          <article><span className="studio-number">04 / Result</span><ul>{story.result.map((item) => <li key={item}>{item}</li>)}</ul></article>
        </div></section> : null}

        <section className="studio-project-demo-section" id="try-demo">
          <div className="studio-section-heading"><div><p className="studio-eyebrow">Optional technical workbench</p><h2>Go deeper with the live system.</h2></div><p>The no-key sample walkthrough is available on the homepage. This advanced workbench is optional and requires your own provider account for live model requests. Use synthetic or non-confidential data only.</p></div>
          <InteractiveDemo projects={[{ slug: project.slug, name: project.name, category: project.eyebrow, description: project.short, tags: project.tags, liveUrl, githubUrl: project.github, detailsUrl: "" }]} />
        </section>

        <div className="studio-project-bottom-links"><Link href="/#work">← Back to selected work</Link><Link href="/contact">Discuss a related engagement ↗</Link></div>
      </div>
    </main>
  );
}
