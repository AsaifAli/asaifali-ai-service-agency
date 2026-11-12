
import Link from "next/link";
import { EngagementModels } from "@/components/AgencyCommercialSections";
import { services } from "@/lib/services";
import { studioMetadata } from "@/lib/seo";

export const metadata = studioMetadata({
  title: "Services",
  description:
    "Business knowledge systems, document intelligence, agentic workflow automation, AI application engineering, integration, and AI evaluation.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <main className="studio-main studio-inner-page">
      <section className="studio-page-hero">
        <div className="studio-container">
          <Link className="studio-back-link" href="/">
            ← Home
          </Link>

          <p className="studio-eyebrow">
            Services / Engineering capabilities
          </p>

          <h1>Build the system around the intelligence.</h1>

          <p>
            Start with a business workflow, not a framework. The studio
            works across knowledge systems, document intelligence, and
            multi-step automation, supported by the application and
            integration engineering needed to make them usable.
          </p>
        </div>
      </section>

      <section className="studio-commercial-section">
        <div className="studio-container">
          <div className="studio-commercial-header">
            <div>
              <p className="studio-eyebrow">Core solutions</p>
              <h2>Three ways to create useful applied AI systems.</h2>
            </div>

            <p>
              Each solution can combine multiple engineering capabilities.
              Scope is shaped by the process, existing systems, data
              boundaries, and the result the team needs.
            </p>
          </div>

          <div className="studio-offer-grid">
            <article className="studio-offer-card">
              <div className="studio-offer-top">
                <span className="studio-offer-index">01</span>
                <span>KNOWLEDGE</span>
              </div>

              <h3>Business knowledge systems</h3>

              <p className="studio-offer-description">
                Document ingestion, search, retrieval, reranking,
                evidence-grounded answers, and evaluation for internal
                knowledge.
              </p>

              <div className="studio-offer-links">
                <Link href="/services/knowledge-and-rag-systems">
                  Knowledge and RAG systems ↗
                </Link>
                <Link href="/projects/evidenceflow">
                  Engineering reference: EvidenceFlow
                </Link>
              </div>
            </article>

            <article className="studio-offer-card">
              <div className="studio-offer-top">
                <span className="studio-offer-index">02</span>
                <span>DOCUMENTS</span>
              </div>

              <h3>Document intelligence</h3>

              <p className="studio-offer-description">
                Model-assisted extraction, structured validation,
                deterministic calculations, comparisons, and reviewable
                outputs.
              </p>

              <div className="studio-offer-links">
                <Link href="/services/document-intelligence">
                  Document intelligence ↗
                </Link>
                <Link href="/projects/quotesense">
                  Engineering reference: QuoteSense
                </Link>
              </div>
            </article>

            <article className="studio-offer-card">
              <div className="studio-offer-top">
                <span className="studio-offer-index">03</span>
                <span>WORKFLOWS</span>
              </div>

              <h3>Agentic workflow automation</h3>

              <p className="studio-offer-description">
                Stateful orchestration, tool integrations, approval
                points, exception handling, and controlled actions across
                business systems.
              </p>

              <div className="studio-offer-links">
                <Link href="/services/agentic-workflow-systems">
                  Agentic workflow systems ↗
                </Link>
                <Link href="/services/workflow-automation-and-integration">
                  Workflow automation and integration
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="studio-section">
        <div className="studio-container">
          <div className="studio-section-heading">
            <div>
              <p className="studio-eyebrow">
                Supporting engineering capabilities
              </p>
              <h2>Engineering work across the full system.</h2>
            </div>

            <p>
              Application design, provider integration, orchestration,
              data handling, evaluation, and operational ownership are
              considered as part of the system rather than isolated
              add-ons.
            </p>
          </div>

          <div className="studio-service-directory">
            {services.map((service) => (
              <article
                className="studio-directory-row"
                key={service.slug}
              >
                <span className="studio-index">
                  {service.number}
                </span>

                <div>
                  <p className="studio-eyebrow">
                    {service.eyebrow}
                  </p>
                  <h2>{service.title}</h2>
                </div>

                <p>{service.summary}</p>

                <Link
                  className="studio-text-action"
                  href={`/services/${service.slug}`}
                >
                  Explore capability{" "}
                  <span aria-hidden="true">↗</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <EngagementModels />

      <section className="studio-contact-cta">
        <div className="studio-container studio-contact-cta-inner">
          <div>
            <p className="studio-eyebrow">Scoping and fit</p>
            <h2>Not sure which capability fits the problem?</h2>
            <p>
              Start with the workflow and constraints. The right solution
              may combine more than one discipline.
            </p>
          </div>

          <Link
            className="studio-button studio-button-primary"
            href="/contact"
          >
            Discuss the problem <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
