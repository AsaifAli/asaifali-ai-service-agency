export type Service = {
  slug: string;
  number: string;
  title: string;
  eyebrow: string;
  summary: string;
  detail: string;
  fit: string[];
  deliverables: string[];
  engineering: string[];
  considerations: string[];
};

export const services: Service[] = [
  {
    slug: "ai-application-engineering",
    number: "01",
    title: "AI application engineering",
    eyebrow: "Product engineering / LLM applications",
    summary:
      "Turn a useful AI capability into an application people can work with—integrated into your data, interfaces, and operating environment.",
    detail:
      "The work covers the software surrounding the model: backend services, interfaces, provider abstraction, data flows, authentication boundaries, persistence, and deployment. The objective is a coherent application, not a prompt wrapped in a screen.",
    fit: [
      "A product needs an AI-assisted feature or workflow.",
      "An existing prototype needs a more complete application layer.",
      "Model calls need to be connected to business data, APIs, or user-facing interfaces.",
    ],
    deliverables: [
      "Application and integration architecture",
      "Frontend and backend implementation",
      "Model/provider integration",
      "Configuration and deployment guidance",
      "Technical handover documentation",
    ],
    engineering: [
      "Separate model reasoning from deterministic application logic.",
      "Validate inputs and outputs at application boundaries.",
      "Handle timeouts, provider errors, retries, and incomplete responses.",
      "Make configuration and provider choices explicit.",
    ],
    considerations: [
      "Authentication and authorization requirements",
      "Data source and API availability",
      "Model choice, latency, and usage costs",
      "Hosting, observability, and ongoing ownership",
    ],
  },
  {
    slug: "agentic-workflow-systems",
    number: "02",
    title: "Agentic workflow systems",
    eyebrow: "Orchestration / Tool use / Human review",
    summary:
      "Build task-oriented agent systems that coordinate tools and multi-step work while preserving state, traceability, and human control.",
    detail:
      "Agentic systems are useful when a task involves several decisions, tools, or stages. Work begins by defining the task boundary and allowed actions, then designing orchestration, state, validation, retry behaviour, and approval points around that boundary.",
    fit: [
      "A task spans several APIs, tools, or internal systems.",
      "Work needs explicit stages, state, and recoverable execution.",
      "Some decisions can be assisted by AI but consequential actions require review.",
    ],
    deliverables: [
      "Workflow and state model",
      "Agent/tool orchestration",
      "Integration adapters",
      "Approval and exception paths",
      "Execution tests and operational notes",
    ],
    engineering: [
      "Use deterministic routing where the decision is rule-based.",
      "Constrain tools and permissions to the task.",
      "Persist state where workflows must survive process restarts.",
      "Make loops, retries, and stopping conditions explicit.",
    ],
    considerations: [
      "Which actions are read-only and which change external state?",
      "Where is human approval mandatory?",
      "How should failures, retries, and timeouts behave?",
      "What evidence is required before an action is accepted?",
    ],
  },
  {
    slug: "knowledge-and-rag-systems",
    number: "03",
    title: "Knowledge and RAG systems",
    eyebrow: "Retrieval / Search / Evidence",
    summary:
      "Make internal information easier to find and use through document ingestion, search, retrieval, reranking, and evidence-grounded responses.",
    detail:
      "A useful knowledge system depends on more than embeddings and a chat interface. The retrieval strategy, document structure, metadata, access model, evidence handling, and answer policy need to fit the information being searched and the decisions being supported.",
    fit: [
      "Knowledge is distributed across manuals, policies, project files, or structured sources.",
      "Teams need search or question answering with inspectable source material.",
      "An existing RAG system needs retrieval analysis, evaluation, or answer verification.",
    ],
    deliverables: [
      "Source and ingestion design",
      "Retrieval and indexing pipeline",
      "Search and reranking configuration",
      "Evidence and citation handling",
      "Evaluation cases and diagnostics",
    ],
    engineering: [
      "Choose lexical, sparse, dense, or hybrid retrieval based on the corpus and query patterns.",
      "Preserve source identity and metadata through retrieval.",
      "Measure retrieval quality separately from answer quality.",
      "Define behaviour for weak, conflicting, or missing evidence.",
    ],
    considerations: [
      "Document formats, volume, and update frequency",
      "Permissions and document-level access control",
      "Source quality and metadata consistency",
      "Evaluation data and acceptable failure behaviour",
    ],
  },
  {
    slug: "document-intelligence",
    number: "04",
    title: "Document intelligence",
    eyebrow: "Extraction / Validation / Decision support",
    summary:
      "Convert semi-structured documents into validated information that can support review, comparison, and downstream workflows.",
    detail:
      "Document workflows often combine uncertain extraction with deterministic business decisions. Those stages should be separated: extract candidate fields, validate them against a schema, preserve provenance, then apply calculations and rules that can be inspected.",
    fit: [
      "Teams repeatedly review quotations, reports, forms, or supplier documents.",
      "Information needs to be extracted into a known structure.",
      "Document-derived data feeds comparison, triage, or approval processes.",
    ],
    deliverables: [
      "Document ingestion and normalization",
      "Structured extraction pipeline",
      "Schema and field validation",
      "Evidence and provenance references",
      "Deterministic comparison or review logic",
    ],
    engineering: [
      "Validate fields before using them in calculations.",
      "Preserve page, sheet, or source references where available.",
      "Distinguish missing values from inferred values.",
      "Make confidence and review requirements visible.",
    ],
    considerations: [
      "Supported file formats and document quality",
      "Table, handwriting, and scanned-page complexity",
      "Validation rules and exception handling",
      "Human review and audit requirements",
    ],
  },
  {
    slug: "workflow-automation-and-integration",
    number: "05",
    title: "Workflow automation and integration",
    eyebrow: "APIs / n8n / Operational handoffs",
    summary:
      "Connect existing systems and reduce repetitive handoffs with integrations and controlled automation.",
    detail:
      "Automation should fit the actual process and the systems already in use. The work maps triggers, data movement, business rules, approvals, exceptions, and ownership before implementation—using APIs and workflow platforms where they are appropriate.",
    fit: [
      "A process moves information between multiple tools or teams.",
      "Manual handoffs, repetitive updates, or routine notifications consume time.",
      "Existing APIs can support a more consistent workflow.",
    ],
    deliverables: [
      "Workflow mapping and integration plan",
      "API connections and automation flows",
      "Validation and error paths",
      "Approval boundaries",
      "Runbook and ownership notes",
    ],
    engineering: [
      "Design for duplicate events and idempotency where needed.",
      "Validate data at integration boundaries.",
      "Make failed runs observable and recoverable.",
      "Keep credentials and permissions scoped to the integration.",
    ],
    considerations: [
      "API availability, limits, and authentication",
      "Event frequency and expected volume",
      "Failure notifications and manual fallback",
      "Account ownership and platform subscription costs",
    ],
  },
  {
    slug: "ai-evaluation-and-reliability",
    number: "06",
    title: "AI evaluation and reliability",
    eyebrow: "Evaluation / Guardrails / Regression",
    summary:
      "Evaluate how an AI system behaves, investigate failure modes, and create repeatable checks for quality and reliability.",
    detail:
      "AI quality cannot be assessed by a few successful prompts. A practical evaluation process identifies representative tasks, expected behaviour, acceptable variation, high-risk failure modes, and the evidence needed to compare changes over time.",
    fit: [
      "An AI feature works in demos but behaves inconsistently on real inputs.",
      "A RAG pipeline needs retrieval and answer quality measurement.",
      "Model, prompt, or orchestration changes need regression checks.",
    ],
    deliverables: [
      "Evaluation objectives and test cases",
      "Retrieval and generation metrics where appropriate",
      "Failure analysis and error categories",
      "Regression checks",
      "Recommendations for controls and monitoring",
    ],
    engineering: [
      "Separate retrieval, answer, tool-use, and end-to-end evaluation.",
      "Use deterministic checks for properties that do not require a judge model.",
      "Validate LLM-judge behaviour against human-reviewed examples.",
      "Track regressions across model, prompt, data, and workflow changes.",
    ],
    considerations: [
      "Representative and permissioned evaluation data",
      "Human review capacity and acceptance criteria",
      "Model and evaluator variability",
      "Monitoring scope and ownership after handover",
    ],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}