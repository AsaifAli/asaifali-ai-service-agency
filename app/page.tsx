
import type { Metadata } from "next";
import Link from "next/link";
import { InteractiveDemo } from "@/components/InteractiveDemo";
import {
  ClientFit,
  EngagementModels,
  SignatureSolutions,
} from "@/components/AgencyCommercialSections";
import { services } from "@/lib/services";

export const metadata: Metadata = {
  title: {
    absolute: "AI Engineering Studio | Applied AI, Built as Software",
  },
  description:
    "Founder-led AI engineering for business knowledge systems, document intelligence, and agentic workflow automation. Design, build, integration, and evaluation.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "AI Engineering Studio | Applied AI, Built as Software",
    description:
      "Founder-led applied AI engineering for knowledge systems, document intelligence, and multi-step business workflows.",
    url: "/",
    siteName: "AI Engineering Studio",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Engineering Studio | Applied AI, Built as Software",
    description:
      "Founder-led applied AI engineering for knowledge systems, document intelligence, and workflow automation.",
  },
};

const demos = [
  {
    slug: "evidenceflow",
    name: "EvidenceFlow",
    category: "Knowledge systems / RAG",
    description:
      "A sparse-first research and knowledge system combining OpenSearch BM25, retrieval fusion, reranking, evidence tracking, and citation verification.",
    tags: ["LangGraph", "OpenSearch", "BM25", "RRF", "Reranking"],
    liveUrl: "https://langgraph-rag-hdkn.onrender.com",
    githubUrl: "https://github.com/AsaifAli/LangGraph-RAG",
    detailsUrl: "/projects/evidenceflow",
  },
  {
    slug: "quotesense",
    name: "QuoteSense",
    category: "Document intelligence / Procurement",
    description:
      "A quotation-analysis workflow that extracts document information into typed structures, validates it, and uses deterministic calculations for comparisons and anomaly checks.",
    tags: ["Document AI", "Pydantic", "Python", "FastAPI", "Validation"],
    liveUrl: "https://quotation-analyzer-9m4i.onrender.com",
    githubUrl: "https://github.com/AsaifAli/quotation-analyzer",
    detailsUrl: "/projects/quotesense",
  },
];

const operatingPatterns = [
  {
    number: "01",
    title: "Information is difficult to retrieve",
    context:
      "Knowledge lives across files, policies, project material, and internal systems.",
    response:
      "Search and retrieval systems that preserve source context and make evidence inspectable.",
    service: "Knowledge and RAG systems",
    href: "/services/knowledge-and-rag-systems",
  },
  {
    number: "02",
    title: "Documents create repetitive work",
    context:
      "People repeatedly extract, validate, compare, or re-enter information from documents.",
    response:
      "Document intelligence pipelines that produce structured information for review and downstream use.",
    service: "Document intelligence",
    href: "/services/document-intelligence",
  },
  {
    number: "03",
    title: "Processes span tools and people",
    context:
      "Work crosses APIs, teams, approval steps, and systems with fragmented state.",
    response:
      "Integrated workflows with explicit stages, exception handling, and controlled actions.",
    service: "Agentic workflows and automation",
    href: "/services/agentic-workflow-systems",
  },
];

const principles = [
  {
    title: "Define the boundary",
    copy: "Identify what the system can access, decide, and change. Keep permissions and responsibilities explicit.",
  },
  {
    title: "Keep critical rules testable",
    copy: "Use deterministic application logic for calculations, validation, permissions, and other rules that should not depend on model interpretation.",
  },
  {
    title: "Evaluate representative behaviour",
    copy: "Test normal inputs, edge cases, weak evidence, integration failures, and the situations where the system should stop or ask for review.",
  },
  {
    title: "Make ownership visible",
    copy: "Agree on provider accounts, hosting, credentials, monitoring, operating costs, and handover before deployment.",
  },
];

const questions = [
  {
    q: "What kind of work is a good fit?",
    a: "Knowledge systems, document intelligence, agentic workflows, AI applications, API-based automation, and evaluation of existing AI systems are relevant starting points. The initial discussion checks whether the problem is suitable for AI and whether the scope is clear enough to proceed.",
  },
  {
    q: "Who does the studio work with?",
    a: "The strongest fit is with operations and procurement teams, SaaS and product teams, and knowledge-intensive organisations that have a specific workflow or information problem to solve.",
  },
  {
    q: "How does a project usually begin?",
    a: "Work can begin with an AI opportunity assessment, followed by a focused pilot or a production implementation. Scope, deliverables, fees, dependencies, and acceptance criteria are agreed before implementation.",
  },
  {
    q: "Why does the interactive demonstration require BYOK?",
    a: "The public interactive workbench uses your own supported AI provider account. You connect a provider using your API key so the demonstration can make model requests without relying on a shared studio-owned public key. The key is handled by the configured gateway for temporary session use.",
  },
  {
    q: "How are implementation and operating costs handled?",
    a: "Engineering fees are scoped separately from model API usage, hosting, and third-party services. Account ownership and expected operating costs are discussed before deployment.",
  },
  {
    q: "Can we use confidential data in the public demonstrations?",
    a: "No. Public demonstrations are for technical evaluation with synthetic or non-confidential information. Do not submit production credentials, customer records, confidential documents, or sensitive business information.",
  },
];

export default function Home() {
  return (
    <main className="studio-main">
      <section className="studio-hero">
        <div className="studio-container">
          <div className="studio-hero-grid">
            <div className="studio-hero-copy">
              <p className="studio-eyebrow">
                Applied AI / Product engineering / Integration
              </p>

              <h1>
                AI systems, engineered around the way your business works.
              </h1>

              <p className="studio-hero-intro">
                AI Engineering Studio is an independent, founder-led
                engineering practice for teams working with complex
                information, document-heavy processes, and multi-step
                operations. The studio designs and builds the application,
                retrieval, automation, and evaluation layers that make AI
                useful in real workflows.
              </p>

              <div className="studio-hero-actions">
                <Link
                  className="studio-button studio-button-primary"
                  href="/contact"
                >
                  Discuss a project <span aria-hidden="true">↗</span>
                </Link>

                <Link className="studio-inline-link" href="#solutions">
                  Explore signature solutions{" "}
                  <span aria-hidden="true">↓</span>
                </Link>
              </div>

              <div className="studio-hero-meta">
                <span>Independent practice</span>
                <span>Direct founder involvement</span>
                <span>India / Remote</span>
              </div>
            </div>

            <aside
              className="studio-hero-panel"
              aria-label="Engineering scope"
            >
              <div className="studio-panel-topline">
                <span className="studio-eyebrow">
                  Engineering scope
                </span>
                <span className="studio-mono">
                  AE / FIELD NOTES 01
                </span>
              </div>

              <div className="studio-system-map">
                <div className="studio-map-source">
                  <span className="studio-map-label">
                    OPERATING CONTEXT
                  </span>
                  <strong>People · Data · Systems</strong>
                </div>

                <div className="studio-map-flow">
                  <span />
                </div>

                <div className="studio-map-core">
                  <div className="studio-core-mark">AE</div>
                  <div>
                    <span className="studio-map-label">
                      ENGINEERING LAYER
                    </span>
                    <strong>Models · Rules · Orchestration</strong>
                  </div>
                </div>

                <div className="studio-map-flow">
                  <span />
                </div>

                <div className="studio-map-outcomes">
                  <div>
                    <span>01</span>
                    <strong>Useful applications</strong>
                  </div>
                  <div>
                    <span>02</span>
                    <strong>Controlled workflows</strong>
                  </div>
                  <div>
                    <span>03</span>
                    <strong>Inspectable outputs</strong>
                  </div>
                </div>
              </div>

              <div className="studio-panel-foot">
                <span>Technology follows the problem.</span>
                <span>NOT THE OTHER WAY AROUND.</span>
              </div>
            </aside>
          </div>

          <div className="studio-principle-strip">
            <div>
              <span>01</span>
              <strong>Scope before build</strong>
            </div>
            <div>
              <span>02</span>
              <strong>Testable system behaviour</strong>
            </div>
            <div>
              <span>03</span>
              <strong>Explicit data boundaries</strong>
            </div>
            <div>
              <span>04</span>
              <strong>Transparent ownership</strong>
            </div>
          </div>
        </div>
      </section>

      <section
        className="studio-section studio-context-section"
        id="capabilities"
      >
        <div className="studio-container">
          <div className="studio-section-heading">
            <div>
              <p className="studio-eyebrow">01 / Operating context</p>
              <h2>Start with the work that needs to move forward.</h2>
            </div>

            <p>
              Applied AI is not the starting point by default. First
              identify the process, its constraints, and the part of the
              work that would benefit from better software.
            </p>
          </div>

          <div className="studio-context-list">
            {operatingPatterns.map((item) => (
              <article
                className="studio-context-row"
                key={item.number}
              >
                <span className="studio-index">{item.number}</span>

                <div className="studio-context-problem">
                  <h3>{item.title}</h3>
                  <p>{item.context}</p>
                </div>

                <div className="studio-context-response">
                  <p>{item.response}</p>
                  <Link href={item.href}>
                    {item.service} <span aria-hidden="true">↗</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <SignatureSolutions />
      <ClientFit />

      <section
        className="studio-section studio-services-section"
        id="services"
      >
        <div className="studio-container">
          <div className="studio-section-heading">
            <div>
              <p className="studio-eyebrow">
                04 / Supporting engineering capabilities
              </p>
              <h2>One connected discipline, across the full system.</h2>
            </div>

            <p>
              The three signature solutions are supported by application
              engineering, orchestration, retrieval, document processing,
              workflow integration, and evaluation.
            </p>
          </div>

          <div className="studio-service-list">
            {services.map((service) => (
              <Link
                className="studio-service-row"
                href={`/services/${service.slug}`}
                key={service.slug}
              >
                <span className="studio-index">
                  {service.number}
                </span>

                <div className="studio-service-title">
                  <span>{service.eyebrow}</span>
                  <h3>{service.title}</h3>
                </div>

                <p>{service.summary}</p>

                <span
                  className="studio-service-arrow"
                  aria-hidden="true"
                >
                  ↗
                </span>
              </Link>
            ))}
          </div>

          <div className="studio-section-tail">
            <Link className="studio-text-action" href="/services">
              View all capabilities <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </section>

      <section
        className="studio-section studio-systems-section"
        id="systems"
      >
        <div className="studio-container">
          <div className="studio-section-heading">
            <div>
              <p className="studio-eyebrow">
                05 / Engineering references
              </p>
              <h2>Working systems. Open to technical inspection.</h2>
            </div>

            <p>
              Independent builds that demonstrate specific engineering
              approaches. They are not client case studies or claims about
              deployed customer outcomes. Connect your own provider to
              launch the interactive systems.
            </p>
          </div>

          {/* BYOK remains the required connection for interactive launches. */}
          <InteractiveDemo projects={demos} />
        </div>
      </section>

      <section className="studio-section studio-approach-preview">
        <div className="studio-container">
          <div className="studio-section-heading">
            <div>
              <p className="studio-eyebrow">06 / Engineering approach</p>
              <h2>
                Make the system understandable before making it autonomous.
              </h2>
            </div>

            <p>
              A good implementation has clear boundaries, explicit failure
              behaviour, and an agreed definition of what “working” means.
            </p>
          </div>

          <div className="studio-principle-grid">
            {principles.map((item, index) => (
              <article key={item.title}>
                <span className="studio-index">
                  0{index + 1}
                </span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>

          <div className="studio-section-tail">
            <Link className="studio-text-action" href="/approach">
              Understand the engagement model{" "}
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </section>

      <EngagementModels />

      <section className="studio-founder-band">
        <div className="studio-container studio-founder-inner">
          <div>
            <p className="studio-eyebrow">08 / The practice</p>
            <h2>
              Direct engineering engagement. Clear ownership from the first
              conversation.
            </h2>
          </div>

          <div>
            <p>
              AI Engineering Studio is led by Asaif Ali, with project
              discussions, technical scoping, and implementation kept
              directly connected to the engineer responsible for the work.
              The practice combines data science foundations with applied
              AI and software engineering.
            </p>

            <Link className="studio-text-action" href="/studio">
              Meet the founder <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="studio-section studio-faq-section">
        <div className="studio-container studio-faq-layout">
          <div>
            <p className="studio-eyebrow">09 / Common questions</p>
            <h2>Practical details before an engagement.</h2>
          </div>

          <div className="studio-faq-list">
            {questions.map((item) => (
              <details className="studio-faq-item" key={item.q}>
                <summary>
                  {item.q}
                  <span aria-hidden="true">+</span>
                </summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="studio-contact-cta">
        <div className="studio-container studio-contact-cta-inner">
          <div>
            <p className="studio-eyebrow">10 / Project enquiry</p>
            <h2>Have a workflow worth engineering properly?</h2>
            <p>
              Share the operating problem and the systems involved. A
              detailed technical specification is not required to start
              the discussion.
            </p>
          </div>

          <Link
            className="studio-button studio-button-primary"
            href="/contact"
          >
            Start a conversation <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
