
import Link from "next/link";
import { studioMetadata } from "@/lib/seo";

export const metadata = studioMetadata({
  title: "The Studio",
  description:
    "Meet the founder of AI Engineering Studio and understand the practice's approach to applied AI, software engineering, and technical delivery.",
  path: "/studio",
});

export default function StudioPage() {
  return (
    <main className="studio-main studio-inner-page">
      <section className="studio-page-hero">
        <div className="studio-container">
          <Link className="studio-back-link" href="/">
            ← Home
          </Link>

          <p className="studio-eyebrow">
            The studio / Independent practice
          </p>

          <h1>Small by design. Serious about the engineering.</h1>

          <p>
            AI Engineering Studio is an independent practice led by
            Asaif Ali. It focuses on applied AI systems, software
            engineering, and the integration work that connects them
            to real business processes.
          </p>
        </div>
      </section>

      <section className="studio-section">
        <div className="studio-container studio-studio-profile">
          <div>
            <p className="studio-eyebrow">Founder / Technical lead</p>
            <h2>
              Direct access to the person responsible for the technical work.
            </h2>
          </div>

          <div className="studio-studio-copy">
            <p>
              The practice is intentionally founder-led. Discovery,
              technical scoping, implementation, and handover stay
              connected rather than being passed through layers of
              account management.
            </p>

            <p>
              The technical focus is on the parts of applied AI that
              require careful software engineering: agent orchestration,
              retrieval, document processing, API integration, evaluation,
              and the user-facing applications that make those capabilities
              useful.
            </p>

            <p>
              The right solution may include AI, conventional application
              logic, or both. Engagements are accepted where the problem,
              expected scope, access requirements, and delivery
              responsibilities can be understood clearly.
            </p>

            <div className="studio-founder-credentials">
              <div>
                <span>Education</span>
                <strong>
                  M.Sc. Data Science
                  <br />
                  VIT-AP University
                </strong>
              </div>

              <div>
                <span>Engineering focus</span>
                <strong>
                  Agentic AI · RAG · Document intelligence · Integrations
                </strong>
              </div>
            </div>

            <div className="studio-social-links">
              <a
                href="https://github.com/AsaifAli"
                target="_blank"
                rel="noreferrer"
              >
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
              The technology stack is selected to fit the task. Frameworks
              are tools; engineering decisions around data, actions,
              evaluation, and operations determine whether a system is
              fit for purpose.
            </p>
          </div>

          <div className="studio-focus-matrix">
            <div>
              <span>01</span>
              <strong>Applied AI</strong>
              <p>
                LLM applications, agentic workflows, tool use, and
                model integration.
              </p>
            </div>

            <div>
              <span>02</span>
              <strong>Retrieval and knowledge</strong>
              <p>
                Search, RAG, evidence handling, reranking, and
                citation validation.
              </p>
            </div>

            <div>
              <span>03</span>
              <strong>Application engineering</strong>
              <p>
                Python, FastAPI, React/Next.js, data models, and
                API integrations.
              </p>
            </div>

            <div>
              <span>04</span>
              <strong>Delivery and operation</strong>
              <p>
                Docker, cloud deployment, testing, evaluation, and
                technical handover.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="studio-section">
        <div className="studio-container">
          <div className="studio-section-heading">
            <div>
              <p className="studio-eyebrow">Independent engineering work</p>
              <h2>Inspect the implementation, not just the claims.</h2>
            </div>

            <p>
              The public references are independent engineering builds.
              They demonstrate implementation decisions and technical
              approaches, not customer deployments or client outcomes.
            </p>
          </div>

          <div className="studio-service-directory">
            <article className="studio-directory-row">
              <span className="studio-index">01</span>

              <div>
                <p className="studio-eyebrow">
                  Knowledge systems / RAG
                </p>
                <h2>EvidenceFlow</h2>
              </div>

              <p>
                Sparse-first retrieval, reranking, evidence tracking,
                and citation verification.
              </p>

              <Link
                className="studio-text-action"
                href="/projects/evidenceflow"
              >
                Inspect project ↗
              </Link>
            </article>

            <article className="studio-directory-row">
              <span className="studio-index">02</span>

              <div>
                <p className="studio-eyebrow">
                  Document intelligence / Procurement
                </p>
                <h2>QuoteSense</h2>
              </div>

              <p>
                Typed document extraction, schema validation,
                deterministic calculations, and comparisons.
              </p>

              <Link
                className="studio-text-action"
                href="/projects/quotesense"
              >
                Inspect project ↗
              </Link>
            </article>
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

          <Link
            className="studio-button studio-button-primary"
            href="/contact"
          >
            Project enquiry <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
