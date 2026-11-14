
import Link from "next/link";
import { EngagementModels } from "@/components/AgencyCommercialSections";
import { services } from "@/lib/services";
import { studioMetadata } from "@/lib/seo";

export const metadata = studioMetadata({
  title: "AI Solutions & Engineering",
  description:
    "End-to-end AI solutions: custom AI applications, agentic systems, intelligent automation, integrations, document intelligence and knowledge systems.",
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
            Solutions / AI engineering capabilities
          </p>

          <h1>End-to-end AI solutions. Built around your operation.</h1>

          <p>
            I design, build and integrate custom AI applications,
            agentic systems and intelligent automation around real
            business problems. Each engagement brings together the
            software, data, models and workflows needed for a usable system.
          </p>
        </div>
      </section>

      <section className="studio-commercial-section">
        <div className="studio-container">
          <div className="studio-commercial-header">
            <div>
              <p className="studio-eyebrow">Core solutions</p>
              <h2>Three pillars. One connected engineering practice.</h2>
            </div>

            <p>
              Choose the outcome, not a preselected technology. A solution
              can combine application development, retrieval, automation,
              integrations and evaluation according to the work that needs to improve.
            </p>
          </div>

          <div className="studio-offer-grid">
            <article className="studio-offer-card">
              <div className="studio-offer-top">
                <span className="studio-offer-index">01</span>
                <span>APPLICATIONS</span>
              </div>
              <h3>Custom AI applications</h3>
              <p className="studio-offer-description">
                Complete AI-powered applications—from internal knowledge
                and RAG systems to document intelligence, copilots and
                decision-support tools.
              </p>
              <div className="studio-offer-links">
                <Link href="/services/ai-application-engineering">
                  Application engineering ↗
                </Link>
                <Link href="/projects/evidenceflow">
                  Engineering reference: EvidenceFlow
                </Link>
                <Link href="/projects/quotesense">
                  Engineering reference: QuoteSense
                </Link>
              </div>
            </article>

            <article className="studio-offer-card">
              <div className="studio-offer-top">
                <span className="studio-offer-index">02</span>
                <span>AGENTIC SYSTEMS</span>
              </div>
              <h3>Agentic AI systems</h3>
              <p className="studio-offer-description">
                Multi-step AI workflows that coordinate tools and
                business systems with explicit state, scoped actions,
                approval gates and recoverable execution.
              </p>
              <div className="studio-offer-links">
                <Link href="/services/agentic-workflow-systems">
                  Agentic systems ↗
                </Link>
              </div>
            </article>

            <article className="studio-offer-card">
              <div className="studio-offer-top">
                <span className="studio-offer-index">03</span>
                <span>AUTOMATION</span>
              </div>
              <h3>Intelligent automation &amp; integration</h3>
              <p className="studio-offer-description">
                Connect existing software, reduce repetitive handoffs
                and automate operational workflows through APIs and
                workflow platforms with clear exception handling.
              </p>
              <div className="studio-offer-links">
                <Link href="/services/workflow-automation-and-integration">
                  Automation &amp; integration ↗
                </Link>
                <Link href="/services/agentic-workflow-systems">
                  Agentic workflow engineering
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
              <h2>The engineering work behind every solution.</h2>
            </div>

            <p>
              AI is only one part of a working solution. Application
              architecture, data engineering, provider integration,
              evaluation, deployment and handover are designed together.
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
            <h2>Have a business problem that needs a better system?</h2>
            <p>
              Tell me what needs to improve. I will help define whether
              the right answer is a custom AI application, an agentic system,
              intelligent automation or a combination.
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
