import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/lib/portfolio-data";
import { FEATURED_PROJECT_SLUGS } from "@/lib/featured-projects";
import { getProjectLiveUrl } from "@/lib/projects";
import { LiveWorkbench } from "@/components/LiveWorkbench";
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
  const projectCover = project.slug === "quotesense"
    ? {
        src: "/images/projects/quotesense-cover.webp",
        alt: "Illustrative QuoteSense procurement interface showing supplier quotations, comparison fields and a scored recommendation using synthetic data.",
      }
    : {
        src: "/images/projects/evidenceflow-cover.webp",
        alt: "Illustrative EvidenceFlow interface showing document retrieval, an evidence-grounded answer and linked source citations using synthetic data.",
      };

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

        <section className="refresh-project-cover-section" aria-label={`${project.name} visual overview`}>
          <figure className="refresh-project-cover">
            <Image
              src={projectCover.src}
              alt={projectCover.alt}
              width={1394}
              height={628}
              sizes="(max-width: 760px) 100vw, 1120px"
              priority
            />
            <figcaption>Illustrative product visual using synthetic data — not a captured customer deployment or live application screenshot.</figcaption>
          </figure>
        </section>

        <section className="studio-project-overview refresh-project-overview">
          <article><p className="studio-eyebrow">The problem</p><h2>What the system addresses</h2><p>{project.problem}</p></article>
          <article><p className="studio-eyebrow">The implementation</p><h2>How it is approached</h2><p>{project.solution}</p></article>
        </section>

        <section className="studio-project-section refresh-project-fit">
          <p className="studio-eyebrow">Who it is for</p>
          <h2>{slug === "quotesense" ? "Teams reviewing supplier and vendor quotations." : "Teams that need answers grounded in internal knowledge."}</h2>
          <p>{slug === "quotesense" ? "A useful reference for procurement, operations and finance teams that compare quote documents, validate line items and want exceptions surfaced for human review." : "A useful reference for operations, compliance and support teams that need policy or process answers linked back to inspectable source passages."}</p>
          <p className="refresh-project-evidence-note">Independent engineering build. The examples and evaluation criteria are illustrative; no customer deployment or measured business outcome is claimed.</p>
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
          <div className="studio-section-heading"><div><p className="studio-eyebrow">Optional technical workbench</p><h2>Go deeper with the live system.</h2></div><p>The homepage contains a no-key synthetic walkthrough. The advanced workbench is optional and requires your own provider API key for live model requests. Use synthetic or non-confidential data only; provider usage may incur charges.</p></div>
          <LiveWorkbench projects={[{ slug: project.slug, name: project.name, category: project.eyebrow, description: project.short, tags: project.tags, liveUrl: liveUrl ?? "", githubUrl: project.github, detailsUrl: "" }]} />
        </section>

        <div className="studio-project-bottom-links"><Link href="/#work">← Back to selected work</Link><Link href="/contact">Discuss a related engagement ↗</Link></div>
      </div>
    </main>
  );
}
