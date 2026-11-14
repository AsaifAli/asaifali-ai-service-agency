
const agentRoles = [
  {
    number: "01",
    code: "DISCOVERY",
    title: "Workflow analyst",
    description:
      "Maps the current process, identifies friction, captures constraints and turns the business problem into a bounded brief.",
    output: "Workflow map · Requirements · Success criteria",
    accent: "coral",
  },
  {
    number: "02",
    code: "INTELLIGENCE",
    title: "Research specialist",
    description:
      "Organises source material, checks context, identifies relevant information and prepares evidence for downstream decisions.",
    output: "Source context · Evidence · Research notes",
    accent: "blue",
  },
  {
    number: "03",
    code: "ARCHITECTURE",
    title: "Solution architect",
    description:
      "Designs the system boundaries, data flow, integrations, agent responsibilities and human approval points.",
    output: "System design · Data flow · Technical plan",
    accent: "violet",
  },
  {
    number: "04",
    code: "ENGINEERING",
    title: "Build specialist",
    description:
      "Supports implementation across application logic, retrieval, tool integrations, workflow orchestration and automation.",
    output: "Application · Integrations · Automated workflows",
    accent: "lime",
  },
  {
    number: "05",
    code: "QUALITY",
    title: "Evaluation specialist",
    description:
      "Checks outputs against representative cases, surfaces unsupported claims and tests failure and recovery paths.",
    output: "Test results · Evaluation · Risk findings",
    accent: "amber",
  },
  {
    number: "06",
    code: "DELIVERY",
    title: "Delivery coordinator",
    description:
      "Organises implementation status, documentation, release checks and handover material for the final delivery.",
    output: "Release notes · Documentation · Handover",
    accent: "coral",
  },
];

export function AgentDeliverySystem() {
  return (
    <section
      className="agent-delivery-system"
      id="delivery-engine"
      aria-labelledby="agent-delivery-title"
    >
      <div className="studio-container">
        <div className="agent-section-heading">
          <div className="agent-heading-copy">
            <p className="studio-eyebrow">
              03 / THE DELIVERY ENGINE
            </p>

            <h2 id="agent-delivery-title">
              A specialist system.
              <span> One accountable engineer.</span>
            </h2>
          </div>

          <p className="agent-section-intro">
            AI-assisted specialist workflows support research,
            architecture, implementation and evaluation. I direct
            the work, make the engineering decisions and remain
            accountable for what is delivered.
          </p>
        </div>

        <div className="agent-system-frame">
          <div className="agent-system-topline">
            <span>
              <i aria-hidden="true" />
              HUMAN-LED DELIVERY SYSTEM
            </span>
            <span>FOUNDER + SPECIALIST AI WORKFLOWS</span>
          </div>

          <div className="agent-founder-node">
            <div className="agent-founder-mark" aria-hidden="true">
              AA
            </div>

            <div className="agent-founder-copy">
              <span>HUMAN TECHNICAL LEAD</span>
              <strong>Asaif Ali</strong>
              <small>
                Discovery · Architecture · Engineering · Approval
              </small>
            </div>

            <div className="agent-founder-status">
              <i aria-hidden="true" />
              ACCOUNTABLE OWNER
            </div>
          </div>

          <div className="agent-flow-connector" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>

          <div className="agent-role-grid">
            {agentRoles.map((agent) => (
              <article
                className={`agent-role-card agent-accent-${agent.accent}`}
                key={agent.number}
              >
                <div className="agent-role-top">
                  <span className="agent-role-number">
                    {agent.number}
                  </span>
                  <span className="agent-role-code">
                    {agent.code}
                  </span>
                </div>

                <div className="agent-role-symbol" aria-hidden="true">
                  {agent.number === "01"
                    ? "⌁"
                    : agent.number === "02"
                      ? "⌕"
                      : agent.number === "03"
                        ? "⌘"
                        : agent.number === "04"
                          ? "↗"
                          : agent.number === "05"
                            ? "◎"
                            : "↳"}
                </div>

                <h3>{agent.title}</h3>

                <p>{agent.description}</p>

                <div className="agent-role-output">
                  <span>WORK PRODUCT</span>
                  <strong>{agent.output}</strong>
                </div>
              </article>
            ))}
          </div>

          <div className="agent-approval-track">
            <div className="agent-approval-heading">
              <span>HUMAN REVIEW & APPROVAL GATES</span>
              <small>
                AI output is not treated as automatic sign-off
              </small>
            </div>

            <div className="agent-approval-grid">
              <div>
                <span>01</span>
                <strong>Scope approval</strong>
                <small>Problem and acceptance criteria</small>
              </div>

              <div>
                <span>02</span>
                <strong>Design approval</strong>
                <small>Architecture and data boundaries</small>
              </div>

              <div>
                <span>03</span>
                <strong>Release approval</strong>
                <small>Quality checks and final handover</small>
              </div>
            </div>
          </div>
        </div>

        <div className="agent-principles">
          <div>
            <span className="agent-principle-index">01</span>
            <strong>Agents accelerate the work.</strong>
            <p>
              They help with bounded tasks and structured workflows.
              They do not replace engineering judgement.
            </p>
          </div>

          <div>
            <span className="agent-principle-index">02</span>
            <strong>Evidence stays inspectable.</strong>
            <p>
              Sources, outputs, exceptions and evaluation results
              remain visible wherever the workflow requires them.
            </p>
          </div>

          <div>
            <span className="agent-principle-index">03</span>
            <strong>A person owns the outcome.</strong>
            <p>
              I remain responsible for technical decisions,
              client communication, approval and delivery quality.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
