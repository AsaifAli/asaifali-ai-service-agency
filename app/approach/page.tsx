import Link from "next/link";
import { studioMetadata } from "@/lib/seo";

export const metadata = studioMetadata({
  title: "Approach",
  description:
    "How AI Engineering Studio assesses, scopes, builds, evaluates, and hands over applied AI systems.",
  path: "/approach",
});


const phases = [
  {
    n: "01",
    title: "Understand the operating problem",
    intent: "Clarify why the work is difficult today.",
    activities: [
      "Map the current workflow, users, handoffs, and decisions.",
      "Identify source systems, data access, and external dependencies.",
      "Separate the parts that need intelligence from the parts that need ordinary software.",
    ],
    output: "Problem definition, constraints, and fit assessment",
  },
  {
    n: "02",
    title: "Define a bounded first release",
    intent: "Agree on what the system should and should not do.",
    activities: [
      "Define scope, system boundaries, and acceptance criteria.",
      "Choose the integration and model approach based on the actual requirements.",
      "Identify approval points, failure behaviour, and operational responsibilities.",
    ],
    output: "Technical scope, architecture, and delivery plan",
  },
  {
    n: "03",
    title: "Build and integrate",
    intent: "Implement the application and connect it to the required environment.",
    activities: [
      "Develop the backend, interfaces, orchestration, and integrations.",
      "Validate data and model outputs at application boundaries.",
      "Add state, logging, retries, and exception paths where appropriate.",
    ],
    output: "Working application and integration implementation",
  },
  {
    n: "04",
    title: "Evaluate and hand over",
    intent: "Make system behaviour and ownership understandable.",
    activities: [
      "Test representative cases, edge cases, and failure paths.",
      "Review output quality and controls against agreed acceptance criteria.",
      "Document configuration, deployment, usage costs, and handover responsibilities.",
    ],
    output: "Evaluation notes, deployment handover, and operating guidance",
  },
];

const gates = [
  {
    title: "Data and access",
    description:
      "What data is needed, where it lives, who can access it, and whether it can be processed by the selected provider.",
  },
  {
    title: "Actions and permissions",
    description:
      "Which operations are read-only, which change external state, and where approval or a manual fallback is required.",
  },
  {
    title: "Quality and evidence",
    description:
      "How correctness is assessed, which sources support an answer, and what the system should do when evidence is incomplete.",
  },
  {
    title: "Operation and ownership",
    description:
      "Who owns provider accounts, hosting, credentials, monitoring, support, and ongoing operating costs.",
  },
];

export default function ApproachPage() {
  return (
    <main className="studio-main studio-inner-page">
      <section className="studio-page-hero">
        <div className="studio-container">
          <Link className="studio-back-link" href="/">← Home</Link>
          <p className="studio-eyebrow">Approach / Engagement model</p>
          <h1>Clear scope. Testable behaviour. Explicit ownership.</h1>
          <p>
            A practical engineering process for taking an applied AI problem
            from initial assessment to a working, understandable handover.
          </p>
        </div>
      </section>

      <section className="studio-section">
        <div className="studio-container">
          <div className="studio-section-heading">
            <div>
              <p className="studio-eyebrow">Delivery sequence</p>
              <h2>Four phases, with a work product at each stage.</h2>
            </div>
            <p>
              The stages scale to the engagement. A focused proof of concept
              and a larger application do not require the same level of
              documentation or operational preparation.
            </p>
          </div>

          <div className="studio-approach-phases">
            {phases.map((phase) => (
              <article className="studio-approach-phase" key={phase.n}>
                <span className="studio-index">{phase.n}</span>
                <div>
                  <p className="studio-phase-intent">{phase.intent}</p>
                  <h2>{phase.title}</h2>
                  <ul>
                    {phase.activities.map((activity) => (
                      <li key={activity}>{activity}</li>
                    ))}
                  </ul>
                  <div className="studio-phase-output">
                    <span>WORK PRODUCT</span>
                    <strong>{phase.output}</strong>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="studio-section studio-detail-alt">
        <div className="studio-container">
          <div className="studio-section-heading">
            <div>
              <p className="studio-eyebrow">Engineering checkpoints</p>
              <h2>Important questions are addressed before they become surprises.</h2>
            </div>
            <p>
              These are design and delivery considerations, not a certification
              or guarantee. The controls used depend on the system and its
              operating context.
            </p>
          </div>
          <div className="studio-principle-grid studio-gates-grid">
            {gates.map((gate, index) => (
              <article key={gate.title}>
                <span className="studio-index">0{index + 1}</span>
                <h3>{gate.title}</h3>
                <p>{gate.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="studio-contact-cta">
        <div className="studio-container studio-contact-cta-inner">
          <div>
            <p className="studio-eyebrow">Start with context</p>
            <h2>Describe the process before choosing the technology.</h2>
            <p>
              A useful first discussion can begin with the problem, the users,
              the systems, and the constraints.
            </p>
          </div>
          <Link className="studio-button studio-button-primary" href="/contact">
            Discuss an engagement <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </main>
  );
}