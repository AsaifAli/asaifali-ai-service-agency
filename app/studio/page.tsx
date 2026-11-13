import Link from "next/link";
import Image from "next/image";
import { getProjects } from "@/lib/portfolio-data";
import { studioMetadata } from "@/lib/seo";

export const metadata = studioMetadata({
  title: "The Studio",
  description: "Meet Asaif Ali and understand the founder-led approach to applied AI, software engineering and technical delivery.",
  path: "/studio",
});

export default async function StudioPage() {
  const projects = await getProjects();
  return (
    <main className="studio-main studio-inner-page refresh-inner-page refresh-studio-page">
      <section className="studio-page-hero refresh-page-hero"><div className="studio-container">
        <Link className="studio-back-link" href="/">← Home</Link>
        <p className="studio-eyebrow">The studio / Independent practice</p>
        <h1>Small by design. <em>Serious about the engineering.</em></h1>
        <p>I run AI Engineering Studio as an independent practice focused on applied AI systems and the software engineering that connects them to real business processes.</p>
      </div></section>

      <section className="studio-section"><div className="studio-container refresh-studio-profile">
        <div className="refresh-founder-photo-wrap refresh-founder-photo-wrap-large">
          <Image src="/images/asaif-ali-founder.webp" alt="Asaif Ali, founder and AI/ML engineer" width={1000} height={1000} sizes="(max-width: 760px) 86vw, 420px" className="refresh-founder-photo" />
          <div className="refresh-founder-photo-caption"><strong>Asaif Ali</strong><span>FOUNDER · TECHNICAL LEAD</span></div>
        </div>
        <div className="studio-studio-copy refresh-studio-copy">
          <p className="studio-eyebrow">Founder / Technical lead</p>
          <h2>Applied AI, built with software engineering discipline.</h2>
          <p>I’m Asaif Ali, an AI/ML engineer and the founder of AI Engineering Studio. I hold an M.Sc. in Data Science from VIT-AP University (2022–2024). My professional background includes software engineering, with a focus on AI/ML engineering, alongside earlier hands-on data science and AI internship experience.</p>
          <p>My technical work spans LLM-powered applications, retrieval-augmented generation (RAG), agentic systems, MCP and API-based tool integrations, document intelligence, evaluation and deployment. Earlier data science and AI internships gave me hands-on experience in machine learning, data preparation, experimentation and model development. I work across the full path from problem definition and architecture to implementation, testing and handover.</p>
          <p>The studio exists to make that work available to teams with a concrete operational problem. I favour clear scopes, observable system behaviour, meaningful evaluation, human review where it matters and the simplest architecture that meets the requirement. Not every workflow needs an LLM, and no system should be treated as production-ready just because a demo works.</p>
          <p>Engagements are founder-led: discovery, technical decisions, implementation and handover stay with the person responsible for the engineering. Source-code ownership, infrastructure accounts, provider costs and ongoing support are agreed before implementation begins.</p>
          <div className="studio-founder-credentials">
            <div><span>Education</span><strong>M.Sc. Data Science<br/>VIT-AP University · 2022–2024</strong></div>
            <div><span>Professional experience</span><strong>Software Engineer (AI/ML)</strong></div>
            <div><span>Engineering focus</span><strong>Agentic AI · RAG · MCP · LLM apps<br/>Document intelligence · Evaluation</strong></div>
          </div>
          <div className="studio-social-links"><a href="https://github.com/AsaifAli" target="_blank" rel="noreferrer">GitHub ↗</a><a href="https://www.linkedin.com/in/sk-asaif-ali-134873243" target="_blank" rel="noreferrer">LinkedIn ↗</a></div>
        </div>
      </div></section>

      <section className="studio-section studio-detail-alt"><div className="studio-container">
        <div className="studio-section-heading"><div><p className="studio-eyebrow">Technical focus</p><h2>Capabilities grounded in software engineering.</h2></div><p>Technology is selected to fit the task. Engineering decisions around data, actions, evaluation and operations determine whether a system is fit for purpose.</p></div>
        <div className="studio-focus-matrix"><div><span>01</span><strong>Applied AI</strong><p>LLM applications, agentic workflows, tool use and model integration.</p></div><div><span>02</span><strong>Retrieval and knowledge</strong><p>Search, RAG, evidence handling, reranking and citation validation.</p></div><div><span>03</span><strong>Application engineering</strong><p>Python, FastAPI, React/Next.js, data models and API integrations.</p></div><div><span>04</span><strong>Delivery and operation</strong><p>Docker, cloud deployment, testing, evaluation and technical handover.</p></div></div>
      </div></section>

      <section className="studio-section"><div className="studio-container">
        <div className="studio-section-heading"><div><p className="studio-eyebrow">Independent engineering work</p><h2>Inspect the implementation, not just the claims.</h2></div><p>Public references demonstrate selected engineering approaches. They are not represented as customer deployments or client outcomes.</p></div>
        <div className="studio-service-directory">{projects.map((project) => <article className="studio-directory-row" key={project.slug}><span className="studio-index">{project.number}</span><div><p className="studio-eyebrow">{project.eyebrow}</p><h2>{project.name}</h2></div><p>{project.short}</p><Link className="studio-text-action" href={`/projects/${project.slug}`}>Inspect project ↗</Link></article>)}</div>
      </div></section>
      <section className="studio-contact-cta"><div className="studio-container studio-contact-cta-inner"><div><p className="studio-eyebrow">Work with the studio</p><h2>Bring a concrete problem. I will work out a sensible scope with you.</h2><p>I start with the workflow and constraints. The technology discussion follows.</p></div><Link className="studio-button studio-button-primary" href="/contact">Project enquiry <span aria-hidden="true">↗</span></Link></div></section>
    </main>
  );
}
