import type { Metadata } from "next";
import Link from "next/link";
import { LiveWorkbench } from "@/components/LiveWorkbench";
import { getProjectLiveUrl } from "@/lib/projects";
import { getProjects } from "@/lib/portfolio-data";

export const metadata: Metadata = {
  title: "Technical Lab | Live AI Workbench",
  description: "Explore live model workflows for QuoteSense and EvidenceFlow using your own provider API key and non-confidential test data.",
  alternates: { canonical: "/technical-lab" },
};

export default async function TechnicalLabPage() {
  const projects = await getProjects();
  const workbenchProjects = projects.map((project) => ({
    slug: project.slug,
    name: project.name,
    category: project.eyebrow,
    description: project.short,
    tags: project.tags,
    liveUrl: getProjectLiveUrl(project) ?? "",
    githubUrl: project.github,
    detailsUrl: `/projects/${project.slug}`,
  }));

  return (
    <main className="studio-main studio-inner-page refresh-inner-page">
      <section className="studio-page-hero refresh-page-hero">
        <div className="studio-container">
          <Link className="studio-back-link" href="/">← Home</Link>
          <p className="studio-eyebrow">Technical Lab / Advanced inspection</p>
          <h1>Explore the systems <em>in a live workflow.</em></h1>
          <p>The homepage contains no-key synthetic walkthroughs for a quick introduction. This area is for technical evaluators who want to run live model requests through the existing demo integrations.</p>
          <div className="refresh-lab-safety">
            <strong>Before you start</strong>
            <span>Bring your own provider API key. Use a test key with a spend limit and synthetic or non-confidential data. Provider usage may be billed by your provider. Do not enter production credentials or confidential business information.</span>
          </div>
          <div className="refresh-lab-links"><Link href="/#work">Inspect the two engineering builds ↗</Link><Link href="/sample-assessment-report.pdf" target="_blank" rel="noreferrer">Read the sample assessment PDF ↗</Link></div>
        </div>
      </section>

      {workbenchProjects.length ? (
        <LiveWorkbench projects={workbenchProjects} />
      ) : (
        <section className="studio-section"><div className="studio-container"><p>The live workbench is not configured for the public project list at the moment. The no-key sample walkthrough remains available on the homepage.</p></div></section>
      )}

      <section className="studio-section studio-detail-alt">
        <div className="studio-container refresh-lab-bottom">
          <div><p className="studio-eyebrow">Keep evaluation realistic</p><h2>Use representative tests, not sensitive production data.</h2><p>For a private engagement, the workflow, data handling, evaluation set, provider configuration and deployment boundary are agreed separately. A public demo is not a production environment.</p></div>
          <Link className="studio-button studio-button-primary" href="/contact">Discuss a private assessment ↗</Link>
        </div>
      </section>
    </main>
  );
}
