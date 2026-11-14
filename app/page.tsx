
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

import { EngagementModels } from "@/components/AgencyCommercialSections";
import { AgentDeliverySystem } from "@/components/AgentDeliverySystem";
import { SampleShowcase } from "@/components/SampleShowcase";
import { getProjects } from "@/lib/portfolio-data";
import { FEATURED_PROJECT_SLUGS } from "@/lib/featured-projects";

export const metadata: Metadata = {
  title: {
    absolute:
      "AI Engineering Studio | AI Solutions, Engineering & Automation",
  },
  description:
    "An independent, founder-led AI solutions and engineering agency building custom AI applications, agentic systems and intelligent automation around real business problems.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "AI Engineering Studio | AI Solutions & Engineering",
    description:
      "Custom AI applications, agentic systems and intelligent automation engineered around real business operations.",
    url: "/",
    siteName: "AI Engineering Studio",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Solutions & Engineering | AI Engineering Studio",
    description:
      "Custom AI applications, agentic systems and intelligent automation for real business workflows.",
  },
};

const problems = [
  {
    n: "01",
    title: "Documents slow the team down",
    description:
      "People retype, reconcile and compare information across PDFs, spreadsheets and supplier files.",
    solution: "Document intelligence",
    color: "coral",
  },
  {
    n: "02",
    title: "Answers are buried in information",
    description:
      "Policies, manuals and project knowledge are scattered across files and internal systems.",
    solution: "Knowledge systems",
    color: "blue",
  },
  {
    n: "03",
    title: "Work gets stuck between tools",
    description:
      "Processes cross APIs, people and approvals, but handoffs and exceptions remain manual.",
    solution: "Workflow automation",
    color: "lime",
  },
];

const approach = [
  {
    n: "01",
    title: "Understand",
    copy:
      "Map the workflow, users, data, constraints and the outcome that matters.",
  },
  {
    n: "02",
    title: "Scope",
    copy:
      "Decide where software, automation or AI is useful. Define a bounded first release.",
  },
  {
    n: "03",
    title: "Build & test",
    copy:
      "Implement the system, validate representative cases and make failure paths visible.",
  },
  {
    n: "04",
    title: "Hand over",
    copy:
      "Deploy with documentation, account ownership and operating responsibilities agreed.",
  },
];

const faqs = [
  {
    q: "Do I need to know which AI technology to use?",
    a:
      "No. Start with the work that needs to improve. I consider conventional software, automation and AI together, then recommend the simplest approach that fits.",
  },
  {
    q: "Can you work with our existing tools and documents?",
    a:
      "That is usually the starting point. I review the formats, systems, access requirements and constraints before deciding what should be integrated or replaced.",
  },
  {
    q: "Are the projects shown here client case studies?",
    a:
      "No. QuoteSense and EvidenceFlow are independent engineering builds. They demonstrate implementation approaches; they are not presented as customer deployments or measured client outcomes.",
  },
  {
    q: "How do the AI agents fit into delivery?",
    a:
      "Specialist AI-assisted workflows support tasks such as discovery, research, architecture, implementation support and evaluation. I direct the work, review the outputs and remain accountable for engineering decisions and final delivery.",
  },
  {
    q: "Can I inspect a live implementation?",
    a:
      "Yes. The Technical Lab contains the optional live workbench. It requires your own provider API key for live model requests. The homepage sample walkthroughs do not require a key.",
  },
  {
    q: "Who owns the code and infrastructure?",
    a:
      "Ownership of source code, cloud accounts, provider credentials, third-party services and handover responsibilities is agreed in writing before implementation.",
  },
  {
    q: "What happens if you are unavailable after handover?",
    a:
      "Every delivery is planned around documentation, source-code access, deployment instructions and client-owned accounts where appropriate. Any ongoing support or continuity arrangement is agreed in the scope; I do not imply an always-on support team.",
  },
  {
    q: "How much does a project cost?",
    a:
      "Fees depend on workflow complexity, integrations, data quality, evaluation and operating responsibilities. I provide a written scope and fee before implementation begins. A preliminary discussion does not commit you to a build.",
  },
];

export default async function Home() {
  const projects = await getProjects();

  const featuredOrder: string[] = [...FEATURED_PROJECT_SLUGS];

  const orderedProjects = [...projects]
    .filter((project) => featuredOrder.includes(project.slug))
    .sort(
      (a, b) =>
        featuredOrder.indexOf(a.slug) -
        featuredOrder.indexOf(b.slug),
    );

  const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL?.trim();

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <main className="studio-main refresh-site">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd),
        }}
      />

      {/* HERO */}

      <section className="refresh-hero">
        <div className="studio-container refresh-hero-grid">
          <div className="refresh-hero-copy">
            <p className="studio-eyebrow">
              <span className="refresh-eyebrow-dot" />
              AI SOLUTIONS & ENGINEERING AGENCY
            </p>

            <h1>
              AI solutions for <span>complex work.</span>
            </h1>

            <p className="refresh-hero-lede">
              I design, build and deploy custom AI solutions—from
              intelligent applications and knowledge systems to
              agentic workflows and business automation.
            </p>

            <p className="refresh-hero-detail">
              An independent, founder-led engineering practice.
              I lead discovery, architecture, implementation and
              evaluation, with human approval at every consequential step.
            </p>

            <div className="refresh-hero-actions">
              <Link
                className="refresh-button refresh-button-dark"
                href="/contact"
              >
                Discuss an AI solution <span>↗</span>
              </Link>

              <div className="refresh-hero-secondary-links">
                <Link
                  className="refresh-hero-text-link"
                  href="#work"
                >
                  Selected work <span>↓</span>
                </Link>

                <Link
                  className="refresh-hero-text-link"
                  href="#delivery-engine"
                >
                  How delivery works <span>↓</span>
                </Link>

                <Link
                  className="refresh-hero-text-link"
                  href="/technical-lab"
                >
                  Technical Lab <span>↗</span>
                </Link>
              </div>
            </div>

            <div className="refresh-hero-proof">
              <span>Custom AI solutions</span>
              <span>Agentic systems &amp; automation</span>
              <span>Founder-led engineering</span>
            </div>
          </div>

          <div
            className="refresh-hero-art"
            role="img"
            aria-label="Illustration of business information moving through a controlled AI workflow"
          >
            <div className="refresh-art-orbit refresh-orbit-one" />
            <div className="refresh-art-orbit refresh-orbit-two" />

            <span className="refresh-art-index">
              STUDIO / 001
            </span>

            <div className="refresh-art-center">
              <small>THE ENGINEERING LAYER</small>
              <strong>
                Intelligence
                <br />
                with control.
              </strong>
              <span>MODEL + RULES + PEOPLE</span>
            </div>

            <div className="refresh-art-node refresh-node-doc">
              <i>▤</i>
              <span>
                <b>Documents</b>
                <small>PDF · XLSX · DOCX</small>
              </span>
            </div>

            <div className="refresh-art-node refresh-node-data">
              <i>⌘</i>
              <span>
                <b>Knowledge</b>
                <small>SEARCH · EVIDENCE</small>
              </span>
            </div>

            <div className="refresh-art-node refresh-node-work">
              <i>↗</i>
              <span>
                <b>Workflows</b>
                <small>TOOLS · APPROVALS</small>
              </span>
            </div>

            <div className="refresh-art-stamp">
              BUILT
              <br />
              TO BE
              <br />
              USEFUL
              <span>✳</span>
            </div>

            <div className="refresh-art-footer">
              <span>01 — 03</span>
              <span>
                FROM OPERATING PROBLEM TO WORKING SYSTEM
              </span>
            </div>
          </div>
        </div>

        <div className="studio-container refresh-hero-bottom">
          <span>NOT EVERY WORKFLOW NEEDS AN LLM.</span>
          <span>
            THE RIGHT ENGINEERING STARTS WITH THE PROBLEM.
          </span>
        </div>
      </section>

      {/* PROBLEMS */}

      <section
        className="refresh-problem-section"
        id="what-we-solve"
      >
        <div className="studio-container">
          <div className="refresh-section-intro">
            <div>
              <p className="studio-eyebrow">
                01 / THE PROBLEM
              </p>

              <h2>
                Good technology starts with a{" "}
                <em>real bottleneck.</em>
              </h2>
            </div>

            <p>
              I work with teams that have important
              information, repetitive processes or operational
              work spread across too many systems.
            </p>
          </div>

          <div className="refresh-problem-grid">
            {problems.map((problem) => (
              <article
                className={`refresh-problem-card tone-${problem.color}`}
                key={problem.n}
              >
                <span className="refresh-card-number">
                  {problem.n}
                </span>

                <div
                  className="refresh-problem-mark"
                  aria-hidden="true"
                >
                  {problem.n === "01"
                    ? "↘"
                    : problem.n === "02"
                      ? "⌕"
                      : "⤴"}
                </div>

                <h3>{problem.title}</h3>
                <p>{problem.description}</p>

                <span className="refresh-problem-solution">
                  {problem.solution}
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}

      <section
        className="refresh-services-section"
        id="services"
      >
        <div className="studio-container">
          <div className="refresh-section-intro">
            <div>
              <p className="studio-eyebrow">
                02 / SOLUTION PILLARS
              </p>

              <h2>
                Three solution pillars.{" "}
                <em>One connected engineering practice.</em>
              </h2>
            </div>

            <p>
              From custom applications to connected workflows,
              I engineer the complete system around your operations,
              data, users and constraints.
            </p>
          </div>

          <div className="refresh-service-grid">
            <article className="refresh-service-card refresh-service-coral">
              <span>01 / CUSTOM APPLICATIONS</span>
              <div className="refresh-service-symbol">▤</div>
              <h3>Custom AI applications</h3>
              <p>
                Build complete AI-powered products—from knowledge
                and RAG systems to document intelligence, copilots
                and decision-support tools.
              </p>
              <Link href="/services/ai-application-engineering">
                Explore service ↗
              </Link>
            </article>

            <article className="refresh-service-card refresh-service-blue">
              <span>02 / AGENTIC SYSTEMS</span>
              <div className="refresh-service-symbol">⌕</div>
              <h3>Agentic AI systems</h3>
              <p>
                Coordinate multi-step work across tools and
                business systems with stateful orchestration,
                scoped actions, approval gates and recovery paths.
              </p>
              <Link href="/services/agentic-workflow-systems">
                Explore service ↗
              </Link>
            </article>

            <article className="refresh-service-card refresh-service-lime">
              <span>03 / INTELLIGENT AUTOMATION</span>
              <div className="refresh-service-symbol">⤴</div>
              <h3>Automation &amp; integration</h3>
              <p>
                Connect the software your team already uses,
                reduce manual handoffs and orchestrate reliable
                workflows through APIs and automation platforms.
              </p>
              <Link href="/services/workflow-automation-and-integration">
                Explore service ↗
              </Link>
            </article>
          </div>

          <div className="refresh-capability-note">
            <span>ALSO AVAILABLE</span>
            <p>
              Document intelligence · RAG &amp; knowledge systems ·
              LLM integration · AI evaluation &amp; reliability
            </p>
            <Link href="/services">All services ↗</Link>
          </div>
        </div>
      </section>

      {/* AGENT-ASSISTED DELIVERY SYSTEM */}

      <AgentDeliverySystem />

      {/* FLAGSHIP BUILDS */}

      <section className="refresh-work-section" id="work">
        <div className="studio-container">
          <div className="refresh-section-intro">
            <div>
              <p className="studio-eyebrow">
                04 / TWO FLAGSHIP BUILDS
              </p>

              <h2>
                Two systems.{" "}
                <em>Built to be inspected.</em>
              </h2>
            </div>

            <p>
              A focused portfolio: QuoteSense for document
              intelligence and EvidenceFlow for evidence-led
              knowledge retrieval. Both are independent
              engineering builds, not client case studies.
            </p>
          </div>

          <div className="refresh-work-grid">
            {orderedProjects.map((project) => (
              <article
                className={`refresh-work-card refresh-work-${project.accent || "default"}`}
                key={project.slug}
              >
                <div
                  className="refresh-work-visual"
                  role="group"
                  aria-label={`${project.name} illustrative product visual`}
                >
                  <Image
                    src={
                      project.slug === "quotesense"
                        ? "/images/projects/quotesense-cover.webp"
                        : "/images/projects/evidenceflow-cover.webp"
                    }
                    alt={
                      project.slug === "quotesense"
                        ? "Illustrative QuoteSense procurement interface showing supplier quotation extraction, side-by-side comparison and a scored recommendation using synthetic data."
                        : "Illustrative EvidenceFlow interface showing document retrieval, a grounded answer and supporting source citations using synthetic data."
                    }
                    fill
                    sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 540px"
                    className="refresh-work-cover-image"
                  />

                  <span className="refresh-work-visual-note">
                    ILLUSTRATIVE UI · SYNTHETIC DATA
                  </span>
                </div>

                <div className="refresh-work-copy">
                  <div className="refresh-work-meta">
                    <span>{project.eyebrow}</span>
                    <span>{project.status}</span>
                  </div>

                  <h3>{project.name}</h3>
                  <p>{project.short}</p>

                  <div className="refresh-work-tags">
                    {project.tags.slice(0, 4).map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>

                  <div className="refresh-work-links">
                    <Link href={`/projects/${project.slug}`}>
                      Project overview ↗
                    </Link>

                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Source code ↗
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <p className="refresh-work-disclaimer">
            Public references demonstrate independent builds
            and engineering decisions. They do not represent
            paid client deployments, testimonials or customer
            performance claims.
          </p>
        </div>
      </section>

      <div className="refresh-ribbon">
        <div>
          ENGINEERED FOR REAL WORK <span>✳</span>{" "}
          TESTED AGAINST REAL CONSTRAINTS <span>✳</span>{" "}
          BUILT FOR CLEAR HANDOVER <span>✳</span>
        </div>
      </div>

      {/* SAMPLE SHOWCASE */}

      <div className="studio-container">
        <SampleShowcase />
      </div>

      <div className="studio-container refresh-sample-actions">
        <a
          href="/sample-assessment-report.pdf"
          target="_blank"
          rel="noreferrer"
        >
          Read an illustrative sample assessment (PDF) ↗
        </a>

        <Link href="/technical-lab">
          Open the live Technical Lab (bring your own API key) ↗
        </Link>
      </div>

      {/* FOUNDER */}

      <section className="refresh-founder-section" id="studio">
        <div className="studio-container refresh-founder-grid">
          <div className="refresh-founder-photo-wrap">
            <Image
              src="/images/asaif-ali-founder.webp"
              alt="Asaif Ali, founder of AI Engineering Studio"
              width={900}
              height={900}
              sizes="(max-width: 760px) 84vw, 380px"
              className="refresh-founder-photo"
            />

            <div className="refresh-founder-photo-caption">
              <strong>Asaif Ali</strong>
              <span>FOUNDER · AI / ML ENGINEER</span>
            </div>
          </div>

          <div className="refresh-founder-copy">
            <p className="studio-eyebrow">
              05 / THE FOUNDER
            </p>

            <h2>
              One engineer accountable for{" "}
              <em>the whole delivery.</em>
            </h2>

            <p>
              I’m Asaif Ali, an AI/ML engineer with an M.Sc.
              in Data Science from VIT-AP University
              (2022–2024) and professional software engineering
              experience.
            </p>

            <p>
              I personally lead discovery, architecture,
              implementation, integrations, evaluation,
              deployment and handover. My work focuses on
              LLM applications, RAG, agentic workflows,
              MCP-based tool integration and document
              intelligence.
            </p>

            <div className="refresh-founder-credentials">
              <span>
                M.Sc. Data Science · VIT-AP University
              </span>
              <span>Software Engineer (AI/ML)</span>
              <span>Agentic AI · RAG · MCP · Evaluation</span>
            </div>

            <div className="refresh-founder-links">
              <Link href="/studio">
                Full founder profile ↗
              </Link>

              <a
                href="https://www.linkedin.com/in/sk-asaif-ali-134873243"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn ↗
              </a>

              <a
                href="https://github.com/AsaifAli"
                target="_blank"
                rel="noreferrer"
              >
                GitHub ↗
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* DELIVERY APPROACH */}

      <section
        className="refresh-approach-section"
        id="approach"
      >
        <div className="studio-container">
          <div className="refresh-section-intro">
            <div>
              <p className="studio-eyebrow">
                06 / DELIVERY APPROACH
              </p>

              <h2>
                Small steps. <em>Clear decisions.</em>
              </h2>
            </div>

            <p>
              Every engagement is scoped around a real
              operating problem, with tangible work products
              and agreed acceptance criteria.
            </p>
          </div>

          <div className="refresh-approach-grid">
            {approach.map((step) => (
              <article key={step.n}>
                <span>{step.n}</span>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </article>
            ))}
          </div>

          <div className="refresh-approach-link">
            <Link href="/approach">
              Explore the delivery approach ↗
            </Link>
            <span>ASSESS → PILOT → PRODUCTION</span>
          </div>
        </div>
      </section>

      {/* ENGAGEMENT MODELS */}

      <div className="refresh-engagement-wrap">
        <EngagementModels />
      </div>

      {/* TIMING AND INVESTMENT */}

      <section
        className="refresh-commercial-section"
        id="engagement-details"
      >
        <div className="studio-container">
          <div className="refresh-section-intro">
            <div>
              <p className="studio-eyebrow">
                08 / SCOPE, TIMING &amp; INVESTMENT
              </p>

              <h2>
                Clear stages. <em>No open-ended build.</em>
              </h2>
            </div>

            <p>
              These are planning ranges, not delivery
              guarantees. Final timing and fees depend on
              access, data quality, integrations, review
              cycles and the acceptance criteria agreed
              for the work.
            </p>
          </div>

          <div className="refresh-timeline-grid">
            <article>
              <span>01 / ASSESSMENT</span>
              <strong>1–2 weeks</strong>
              <p>
                Workflow review, constraints, feasibility,
                risk notes and a prioritised recommendation.
              </p>
            </article>

            <article>
              <span>02 / PILOT</span>
              <strong>2–4 weeks</strong>
              <p>
                A bounded working slice tested against
                representative cases and agreed acceptance
                criteria.
              </p>
            </article>

            <article>
              <span>03 / PRODUCTION</span>
              <strong>4–8+ weeks</strong>
              <p>
                Hardening, integration, deployment,
                documentation and handover. Larger
                programmes are phased.
              </p>
            </article>
          </div>

          <div className="refresh-commercial-foot">
            <div>
              <strong>How fees are agreed</strong>
              <p>
                Assessment and pilot work are scoped as
                defined deliverables. I provide a written
                fee and exclusions before implementation;
                hosting, model usage and third-party
                services are identified separately.
              </p>
            </div>

            <div className="refresh-founding-offer">
              <span>FOUNDING-CLIENT PILOT</span>
              <h3>A first engagement with room to learn.</h3>
              <p>
                I’m opening a limited reduced-rate pilot
                for a suitable early client, in exchange
                for permission to document agreed,
                non-confidential outcomes and request
                candid feedback. Any publication requires
                separate written approval.
              </p>
              <Link href="/contact">
                Ask about the pilot ↗
              </Link>
            </div>
          </div>

          <p className="refresh-commercial-disclaimer">
            The timelines above are indicative planning
            estimates. Fixed prices are not published here
            because each engagement needs a clear scope;
            the fee is agreed in writing before work begins.
          </p>
        </div>
      </section>

      {/* FAQ */}

      <section className="refresh-faq-section">
        <div className="studio-container refresh-faq-grid">
          <div>
            <p className="studio-eyebrow">
              09 / COMMON QUESTIONS
            </p>

            <h2>
              Questions before <em>getting started.</em>
            </h2>

            <p>
              Start with the problem. I can work out the
              technical details with you.
            </p>

            <Link href="/contact">
              Ask about a project ↗
            </Link>
          </div>

          <div className="refresh-faq-list">
            {faqs.map((faq) => (
              <details key={faq.q}>
                <summary>
                  {faq.q}
                  <span>+</span>
                </summary>
                <p>{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}

      <section className="refresh-final-cta">
        <div className="studio-container refresh-final-cta-inner">
          <div>
            <p className="studio-eyebrow">
              HAVE A WORKFLOW IN MIND?
            </p>

            <h2>
              Let&apos;s make the work{" "}
              <em>work better.</em>
            </h2>

            <p>
              Tell me what is slowing your team down.
              You do not need a technical specification
              to start the conversation.
            </p>
          </div>

          <div className="refresh-final-actions">
            <Link
              href="/contact"
              className="refresh-button refresh-button-light"
            >
              Start a project conversation <span>↗</span>
            </Link>

            {bookingUrl ? (
              <a
                href={bookingUrl}
                target="_blank"
                rel="noreferrer"
                className="refresh-final-booking"
              >
                Book a discovery call ↗
              </a>
            ) : null}
          </div>
        </div>
      </section>
    </main>
  );
}
