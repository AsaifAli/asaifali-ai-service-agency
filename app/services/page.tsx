import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/lib/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "AI application engineering, agentic workflows, knowledge retrieval, document intelligence, workflow automation, and AI evaluation.",
};

export default function ServicesPage() {
  return (
    <main className="studio-main studio-inner-page">
      <section className="studio-page-hero">
        <div className="studio-container">
          <Link className="studio-back-link" href="/">← Home</Link>
          <p className="studio-eyebrow">Services / Engineering capabilities</p>
          <h1>Build the system around the intelligence.</h1>
          <p>
            Applied AI is a system discipline. Model selection matters, but so
            do interfaces, integrations, data boundaries, validation,
            orchestration, evaluation, and operational ownership.
          </p>
        </div>
      </section>

      <section className="studio-section">
        <div className="studio-container">
          <div className="studio-service-directory">
            {services.map((service) => (
              <article className="studio-directory-row" key={service.slug}>
                <span className="studio-index">{service.number}</span>
                <div>
                  <p className="studio-eyebrow">{service.eyebrow}</p>
                  <h2>{service.title}</h2>
                </div>
                <p>{service.summary}</p>
                <Link className="studio-text-action" href={`/services/${service.slug}`}>
                  Explore capability <span aria-hidden="true">↗</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="studio-contact-cta">
        <div className="studio-container studio-contact-cta-inner">
          <div>
            <p className="studio-eyebrow">Scoping and fit</p>
            <h2>Not sure which capability fits the problem?</h2>
            <p>
              Start with the workflow and constraints. The right solution may
              combine more than one discipline.
            </p>
          </div>
          <Link className="studio-button studio-button-primary" href="/contact">
            Discuss the problem <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </main>
  );
}