import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The Studio",
  description:
    "AI Engineering Studio is an independent applied AI engineering practice led by Asaif Ali.",
};

export default function StudioPage() {
  return (
    <main className="studio-main studio-inner-page">
      <section className="studio-page-hero">
        <div className="studio-container">
          <Link className="studio-back-link" href="/">← Home</Link>
          <p className="studio-eyebrow">The studio / Independent practice</p>
          <h1>Small by design. Serious about the engineering.</h1>
          <p>
            AI Engineering Studio is an independent practice led by Asaif Ali,
            focused on applied AI systems, software engineering, and the
            integration work that connects them to real processes.
          </p>
        </div>
      </section>

      <section className="studio-section">
        <div className="studio-container studio-studio-profile">
          <div>
            <p className="studio-eyebrow">How the practice is structured</p>
            <h2>Direct access to the person responsible for the technical work.</h2>
          </div>
          <div className="studio-studio-copy">
            <p>
              The practice is intentionally founder-led. Discovery, technical
              scoping, implementation, and handover stay connected rather than
              being passed through layers of account management.
            </p>
            <p>
              The focus is on the parts of applied AI that require careful
              software engineering: agent orchestration, retrieval, document
              processing, API integration, evaluation, and the user-facing
              applications that make those capabilities useful.
            </p>
            <p>
              Engagements are accepted where the problem, expected scope,
              access requirements, and available delivery capacity can be
              understood clearly. The right solution may include AI,
              conventional application logic, or both.
            </p>
            <div className="studio-social-links">
              <a href="https://github.com/AsaifAli" target="_blank" rel="noreferrer">
                GitHub ↗
              </a>
              <a
                href="https://www.linkedin.com/in/sk-asaif-ali-134873243"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn ↗
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="studio-section studio-detail-alt">
        <div className="studio-container">
          <div className="studio-section-heading">
            <div>
              <p className="studio-eyebrow">Technical focus</p>
              <h2>Capabilities grounded in software engineering.</h2>
            </div>
            <p>
              The technology stack is selected to fit the task. Frameworks are
              tools; the engineering decisions around data, actions,
              evaluation, and operations determine whether the system is fit
              for purpose.
            </p>
          </div>

          <div className="studio-focus-matrix">
            <div>
              <span>01</span>
              <strong>Applied AI</strong>
              <p>LLM applications, agentic workflows, tool use, and model integration.</p>
            </div>
            <div>
              <span>02</span>
              <strong>Retrieval and knowledge</strong>
              <p>Search, RAG, evidence handling, reranking, and citation validation.</p>
            </div>
            <div>
              <span>03</span>
              <strong>Application engineering</strong>
              <p>Python, FastAPI, React/Next.js, data models, and API integrations.</p>
            </div>
            <div>
              <span>04</span>
              <strong>Delivery and operation</strong>
              <p>Docker, cloud deployment, testing, evaluation, and technical handover.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="studio-contact-cta">
        <div className="studio-container studio-contact-cta-inner">
          <div>
            <p className="studio-eyebrow">Work with the studio</p>
            <h2>Bring a concrete problem. We will work out the right scope.</h2>
            <p>
              Start with the workflow and the constraints. The technology
              discussion follows.
            </p>
          </div>
          <Link className="studio-button studio-button-primary" href="/contact">
            Project enquiry <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </main>
  );
}