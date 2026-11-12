
import Link from "next/link";

const solutions = [
  {
    number: "01",
    title: "Business knowledge systems",
    description:
      "Make internal knowledge easier to search, retrieve, and use. Build document ingestion, hybrid retrieval, evidence-grounded answers, and evaluation around the information your team already owns.",
    bestFor:
      "Teams working across policies, manuals, project files, technical documentation, and internal knowledge bases.",
    service: "Knowledge and RAG systems",
    href: "/services/knowledge-and-rag-systems",
    reference: "EvidenceFlow",
    referenceHref: "/projects/evidenceflow",
  },
  {
    number: "02",
    title: "Document intelligence",
    description:
      "Turn unstructured and semi-structured documents into validated information. Combine model-assisted extraction with typed schemas, deterministic calculations, exception handling, and reviewable outputs.",
    bestFor:
      "Procurement, finance, operations, and teams that repeatedly extract, compare, validate, or re-enter document data.",
    service: "Document intelligence",
    href: "/services/document-intelligence",
    reference: "QuoteSense",
    referenceHref: "/projects/quotesense",
  },
  {
    number: "03",
    title: "Agentic workflow automation",
    description:
      "Coordinate multi-step work across tools and APIs. Add stateful orchestration, bounded tool access, approval steps, retries, and clear exception paths where automation needs control.",
    bestFor:
      "Operations and product teams whose processes span several systems, people, approvals, and repetitive handoffs.",
    service: "Agentic workflow systems",
    href: "/services/agentic-workflow-systems",
    reference: null,
    referenceHref: null,
  },
];

const clientProfiles = [
  {
    number: "01",
    title: "Operations and procurement teams",
    description:
      "Document-heavy work, supplier comparisons, repetitive data entry, internal approvals, and operational handoffs.",
  },
  {
    number: "02",
    title: "SaaS and product teams",
    description:
      "AI-enabled product features, model integrations, internal tooling, workflow orchestration, and application engineering.",
  },
  {
    number: "03",
    title: "Knowledge-intensive organisations",
    description:
      "Information distributed across documents and systems, with a need for traceable retrieval and evidence-grounded answers.",
  },
];

const engagementModels = [
  {
    number: "01",
    title: "AI opportunity assessment",
    description:
      "Understand the workflow before committing to a build. Establish whether AI is appropriate, what needs to integrate, and what a useful first release should achieve.",
    includes: [
      "Workflow and problem assessment",
      "Data, access, and integration review",
      "Feasibility and risk considerations",
      "Recommended first-release scope",
    ],
    outcome: "A written scope and practical technical recommendation",
  },
  {
    number: "02",
    title: "Focused AI pilot",
    description:
      "Build a bounded solution around one meaningful workflow. Validate the important assumptions before expanding the scope.",
    includes: [
      "Agreed pilot use case and acceptance criteria",
      "Working application or workflow",
      "Representative test cases",
      "Evaluation notes and next-step recommendation",
    ],
    outcome: "A demonstrable pilot with an evidence-based review",
  },
  {
    number: "03",
    title: "Production implementation",
    description:
      "Take an agreed solution further with the integration, reliability, deployment preparation, and handover needed for its operating environment.",
    includes: [
      "Application and system integration",
      "Validation, error handling, and evaluation",
      "Deployment and configuration guidance",
      "Technical documentation and handover",
    ],
    outcome: "An implemented system with agreed operational responsibilities",
  },
];

export function SignatureSolutions() {
  return (
    <section
      className="studio-commercial-section"
      id="solutions"
      aria-labelledby="studio-solutions-heading"
    >
      <div className="studio-container">
        <div className="studio-commercial-header">
          <div>
            <p className="studio-eyebrow">02 / Signature solutions</p>
            <h2 id="studio-solutions-heading">
              Three business problems. One connected engineering practice.
            </h2>
          </div>
          <p>
            The studio focuses on knowledge-heavy work, document processes,
            and multi-step operations. Each engagement is shaped around the
            actual workflow, not a preselected AI framework.
          </p>
        </div>

        <div className="studio-offer-grid">
          {solutions.map((solution) => (
            <article className="studio-offer-card" key={solution.number}>
              <div className="studio-offer-top">
                <span className="studio-offer-index">
                  {solution.number}
                </span>
                <span>CORE SOLUTION</span>
              </div>

              <h3>{solution.title}</h3>
              <p className="studio-offer-description">
                {solution.description}
              </p>

              <div className="studio-offer-fit">
                <span>GOOD FIT FOR</span>
                <p>{solution.bestFor}</p>
              </div>

              <div className="studio-offer-links">
                <Link href={solution.href}>
                  {solution.service} <span aria-hidden="true">↗</span>
                </Link>

                {solution.reference && solution.referenceHref && (
                  <Link href={solution.referenceHref}>
                    Reference: {solution.reference}
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ClientFit() {
  return (
    <section
      className="studio-commercial-section studio-client-fit-section"
      aria-labelledby="studio-client-fit-heading"
    >
      <div className="studio-container">
        <div className="studio-commercial-header">
          <div>
            <p className="studio-eyebrow">03 / Who the studio works with</p>
            <h2 id="studio-client-fit-heading">
              Built for teams with real operational complexity.
            </h2>
          </div>
          <p>
            The strongest fit is a team with a specific process to improve,
            access to the systems involved, and a person who can help define
            what a useful result looks like.
          </p>
        </div>

        <div className="studio-fit-grid">
          {clientProfiles.map((profile) => (
            <article className="studio-fit-card" key={profile.number}>
              <span>{profile.number}</span>
              <h3>{profile.title}</h3>
              <p>{profile.description}</p>
            </article>
          ))}
        </div>

        <p className="studio-commercial-note">
          Not every workflow needs an LLM or an autonomous agent. The initial
          assessment considers conventional software, automation, and AI
          together.
        </p>
      </div>
    </section>
  );
}

export function EngagementModels() {
  return (
    <section
      className="studio-commercial-section studio-engagement-section"
      id="engagements"
      aria-labelledby="studio-engagement-heading"
    >
      <div className="studio-container">
        <div className="studio-commercial-header">
          <div>
            <p className="studio-eyebrow">Engagement models</p>
            <h2 id="studio-engagement-heading">
              Start with the right amount of engineering.
            </h2>
          </div>
          <p>
            Work is scoped in stages. The exact deliverables, fees, dependencies,
            and acceptance criteria are agreed before implementation begins.
          </p>
        </div>

        <div className="studio-engagement-grid">
          {engagementModels.map((engagement) => (
            <article
              className="studio-engagement-card"
              key={engagement.number}
            >
              <span className="studio-offer-index">
                {engagement.number}
              </span>

              <h3>{engagement.title}</h3>
              <p>{engagement.description}</p>

              <div className="studio-engagement-includes">
                <span>TYPICAL WORK PRODUCTS</span>
                <ul>
                  {engagement.includes.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="studio-engagement-outcome">
                <span>EXPECTED OUTPUT</span>
                <strong>{engagement.outcome}</strong>
              </div>
            </article>
          ))}
        </div>

        <div className="studio-engagement-note">
          <div>
            <strong>Transparent project economics</strong>
            <p>
              Engineering fees are scoped separately from model API usage,
              hosting, and third-party services. Provider accounts and
              operating costs are discussed before deployment. Ongoing
              support or maintenance is agreed separately where required.
            </p>
          </div>

          <Link className="studio-button studio-button-primary" href="/contact">
            Discuss a project <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
