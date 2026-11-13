import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { EngagementModels } from "@/components/AgencyCommercialSections";
import { SampleShowcase } from "@/components/SampleShowcase";
import { LiveWorkbench } from "@/components/LiveWorkbench";
import { getProjectLiveUrl } from "@/lib/projects";
import { getProjects } from "@/lib/portfolio-data";
import { FEATURED_PROJECT_SLUGS } from "@/lib/featured-projects";

export const metadata: Metadata = {
  title: { absolute: "AI Engineering Studio | Document Intelligence, RAG & Workflow Automation" },
  description: "Founder-led AI engineering for document-heavy operations, internal knowledge and multi-step workflows. Start with a practical assessment, then build what your business actually needs.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "AI Engineering Studio | Applied AI for Real Workflows",
    description: "Document intelligence, knowledge systems and agentic workflow automation, engineered around the way your business works.",
    url: "/",
    siteName: "AI Engineering Studio",
    type: "website",
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image", title: "AI Engineering Studio", description: "Practical AI systems for documents, knowledge and operations." },
};

const problems = [
  { n: "01", title: "Documents slow the team down", description: "People retype, reconcile and compare information across PDFs, spreadsheets and supplier files.", solution: "Document intelligence", color: "coral" },
  { n: "02", title: "Answers are buried in information", description: "Policies, manuals and project knowledge are scattered across files and internal systems.", solution: "Knowledge systems", color: "blue" },
  { n: "03", title: "Work gets stuck between tools", description: "Processes cross APIs, people and approvals, but handoffs and exceptions remain manual.", solution: "Workflow automation", color: "lime" },
];

const approach = [
  { n: "01", title: "Understand", copy: "Map the workflow, users, data, constraints and the outcome that matters." },
  { n: "02", title: "Scope", copy: "Decide where software, automation or AI is useful. Define a bounded first release." },
  { n: "03", title: "Build & test", copy: "Implement the system, validate representative cases and make failure paths visible." },
  { n: "04", title: "Hand over", copy: "Deploy with documentation, account ownership and operating responsibilities agreed." },
];

const faqs = [
  { q: "Do we need to know which AI technology to use?", a: "No. Start with the work that needs to improve. The assessment considers conventional software, automation and AI together, and recommends the simplest approach that fits." },
  { q: "Can you work with our existing tools and documents?", a: "That is usually the starting point. We review the formats, systems, access requirements and constraints before deciding what should be integrated or replaced." },
  { q: "Are the projects shown on this website client case studies?", a: "No. They are independent engineering builds that demonstrate implementation approaches. They are not presented as customer deployments or measured client outcomes." },
  { q: "Do the public demos require an API key?", a: "The sample walkthroughs on this page do not. The optional live technical workbench uses a bring-your-own-key connection for model requests. Do not submit confidential or production data to public demos." },
  { q: "Who owns the code and infrastructure?", a: "Ownership of source code, cloud accounts, provider credentials, third-party services and handover responsibilities is agreed in writing for each engagement." },
  { q: "How much does a project cost?", a: "Fees depend on the workflow, integrations, data quality, evaluation requirements and delivery responsibilities. The first discussion establishes fit; a written scope and fee are agreed before implementation." },
];

export default async function Home() {
  const projects = await getProjects();
  const featuredOrder: string[] = [...FEATURED_PROJECT_SLUGS];
  const orderedProjects = [...projects]
    .filter((project) => featuredOrder.includes(project.slug))
    .sort((a, b) => featuredOrder.indexOf(a.slug) - featuredOrder.indexOf(b.slug));
  const workbenchProjects = orderedProjects.map((project) => ({
    slug: project.slug,
    name: project.name,
    category: project.eyebrow,
    description: project.short,
    tags: project.tags,
    liveUrl: getProjectLiveUrl(project),
    githubUrl: project.github,
    detailsUrl: `/projects/${project.slug}`,
  }));
  const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL?.trim();

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  return (
    <main className="studio-main refresh-site">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <section className="refresh-hero">
        <div className="studio-container refresh-hero-grid">
          <div className="refresh-hero-copy">
            <p className="studio-eyebrow"><span className="refresh-eyebrow-dot" /> INDEPENDENT AI ENGINEERING / INDIA + REMOTE</p>
            <h1>Make complex work <span>move.</span></h1>
            <p className="refresh-hero-lede">We build practical AI systems for document-heavy operations, internal knowledge and multi-step business workflows.</p>
            <p className="refresh-hero-detail">From the first workflow assessment to a tested application and clear handover, you work directly with the engineer building the system.</p>
            <div className="refresh-hero-actions">
              <Link className="refresh-button refresh-button-dark" href="/contact">Discuss a workflow <span>↗</span></Link>
              <div className="refresh-hero-secondary-links">
                <Link className="refresh-hero-text-link" href="#work">Selected work <span>↓</span></Link>
                <Link className="refresh-hero-text-link" href="#live-workbench">Try live BYOK <span>↗</span></Link>
              </div>
            </div>
            <div className="refresh-hero-proof"><span>Founder-led delivery</span><span>Testable system behaviour</span><span>Clear code ownership</span></div>
          </div>

          <div className="refresh-hero-art" aria-label="Illustration of business information moving through a controlled AI workflow">
            <div className="refresh-art-orbit refresh-orbit-one" /><div className="refresh-art-orbit refresh-orbit-two" />
            <span className="refresh-art-index">STUDIO / 001</span>
            <div className="refresh-art-center"><small>THE ENGINEERING LAYER</small><strong>Intelligence<br/>with control.</strong><span>MODEL + RULES + PEOPLE</span></div>
            <div className="refresh-art-node refresh-node-doc"><i>▤</i><span><b>Documents</b><small>PDF · XLSX · DOCX</small></span></div>
            <div className="refresh-art-node refresh-node-data"><i>⌘</i><span><b>Knowledge</b><small>SEARCH · EVIDENCE</small></span></div>
            <div className="refresh-art-node refresh-node-work"><i>↗</i><span><b>Workflows</b><small>TOOLS · APPROVALS</small></span></div>
            <div className="refresh-art-stamp">BUILT<br/>TO BE<br/>USEFUL<span>✳</span></div>
            <div className="refresh-art-footer"><span>01 — 03</span><span>FROM OPERATING PROBLEM TO WORKING SYSTEM</span></div>
          </div>
        </div>
        <div className="studio-container refresh-hero-bottom"><span>NOT EVERY WORKFLOW NEEDS AN LLM.</span><span>THE RIGHT ENGINEERING STARTS WITH THE PROBLEM.</span></div>
      </section>

      <section className="refresh-problem-section" id="what-we-solve">
        <div className="studio-container">
          <div className="refresh-section-intro"><div><p className="studio-eyebrow">01 / THE PROBLEM</p><h2>Good technology starts with a <em>real bottleneck.</em></h2></div><p>We work with teams that have important information, repetitive processes or operational work spread across too many systems.</p></div>
          <div className="refresh-problem-grid">{problems.map((problem) => <article className={`refresh-problem-card tone-${problem.color}`} key={problem.n}><span className="refresh-card-number">{problem.n}</span><div className="refresh-problem-mark" aria-hidden="true">{problem.n === "01" ? "↘" : problem.n === "02" ? "⌕" : "⤴"}</div><h3>{problem.title}</h3><p>{problem.description}</p><span className="refresh-problem-solution">{problem.solution}</span></article>)}</div>
        </div>
      </section>

      <section className="refresh-services-section" id="services">
        <div className="studio-container">
          <div className="refresh-section-intro"><div><p className="studio-eyebrow">02 / WHAT WE BUILD</p><h2>Three capabilities. <em>One joined-up practice.</em></h2></div><p>We select the engineering approach around the process, data and outcome—not around a preselected framework.</p></div>
          <div className="refresh-service-grid">
            <article className="refresh-service-card refresh-service-coral"><span>01 / DOCUMENTS</span><div className="refresh-service-symbol">▤</div><h3>Document intelligence</h3><p>Extract, validate, compare and route information from documents with reviewable results and deterministic business rules.</p><Link href="/services/document-intelligence">Explore service ↗</Link></article>
            <article className="refresh-service-card refresh-service-blue"><span>02 / KNOWLEDGE</span><div className="refresh-service-symbol">⌕</div><h3>Knowledge systems</h3><p>Make internal information easier to find and use with retrieval, evidence-grounded answers and evaluation.</p><Link href="/services/knowledge-and-rag-systems">Explore service ↗</Link></article>
            <article className="refresh-service-card refresh-service-lime"><span>03 / OPERATIONS</span><div className="refresh-service-symbol">⤴</div><h3>Workflow automation</h3><p>Connect tools and APIs with stateful orchestration, approval points, exception handling and human control.</p><Link href="/services/agentic-workflow-systems">Explore service ↗</Link></article>
          </div>
          <div className="refresh-capability-note"><span>ALSO AVAILABLE</span><p>AI application engineering · API integration · AI evaluation & reliability · workflow automation</p><Link href="/services">All services ↗</Link></div>
        </div>
      </section>

      <section className="refresh-work-section" id="work">
        <div className="studio-container">
          <div className="refresh-section-intro"><div><p className="studio-eyebrow">03 / TWO FLAGSHIP BUILDS</p><h2>Two systems. <em>Built to be inspected.</em></h2></div><p>A focused portfolio: QuoteSense for document intelligence and EvidenceFlow for evidence-led knowledge retrieval. Both are independent engineering builds, not client case studies.</p></div>
          <div className="refresh-work-grid">
            {orderedProjects.map((project, index) => <article className={`refresh-work-card refresh-work-${project.accent || "default"}`} key={project.slug}>
              <div className="refresh-work-visual" aria-hidden="true"><span className="refresh-visual-kicker">SYSTEM / {String(index + 1).padStart(2, "0")}</span><div className="refresh-visual-shape"><i/><i/><i/></div><div className="refresh-visual-label">{project.slug === "quotesense" ? "EXTRACT / VALIDATE / COMPARE" : project.slug === "evidenceflow" ? "RETRIEVE / VERIFY / RESPOND" : project.slug === "flowpilot" ? "ORCHESTRATE / APPROVE / RUN" : project.slug === "legacylens" ? "ANALYSE / MIGRATE / VERIFY" : "OBSERVE / TEST / REPORT"}</div></div>
              <div className="refresh-work-copy"><div className="refresh-work-meta"><span>{project.eyebrow}</span><span>{project.status}</span></div><h3>{project.name}</h3><p>{project.short}</p><div className="refresh-work-tags">{project.tags.slice(0, 4).map((tag) => <span key={tag}>{tag}</span>)}</div><div className="refresh-work-links"><Link href={`/projects/${project.slug}`}>Project overview ↗</Link><a href={project.github} target="_blank" rel="noreferrer">Source code ↗</a></div></div>
            </article>)}
          </div>
          <p className="refresh-work-disclaimer">Public references demonstrate independent builds and engineering decisions. They do not represent paid client deployments, testimonials or customer performance claims.</p>
        </div>
      </section>

      <div className="refresh-ribbon"><div>ENGINEERED FOR REAL WORK <span>✳</span> TESTED AGAINST REAL CONSTRAINTS <span>✳</span> BUILT FOR CLEAR HANDOVER <span>✳</span> </div></div>

      <div className="studio-container"><SampleShowcase /></div>
      <LiveWorkbench projects={workbenchProjects} />

      <section className="refresh-approach-section" id="approach">
        <div className="studio-container">
          <div className="refresh-section-intro"><div><p className="studio-eyebrow">05 / DELIVERY APPROACH</p><h2>Small steps. <em>Clear decisions.</em></h2></div><p>Every engagement is scoped around a real operating problem, with tangible work products and agreed acceptance criteria.</p></div>
          <div className="refresh-approach-grid">{approach.map((step) => <article key={step.n}><span>{step.n}</span><h3>{step.title}</h3><p>{step.copy}</p></article>)}</div>
          <div className="refresh-approach-link"><Link href="/approach">Explore the delivery approach ↗</Link><span>ASSESS → PILOT → PRODUCTION</span></div>
        </div>
      </section>

      <div className="refresh-engagement-wrap"><EngagementModels /></div>

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
            <div className="refresh-founder-photo-caption"><strong>Asaif Ali</strong><span>FOUNDER · AI / ML ENGINEER</span></div>
          </div>
          <div className="refresh-founder-copy"><p className="studio-eyebrow">06 / ABOUT THE FOUNDER</p><h2>Engineering-led, <em>from first conversation to handover.</em></h2>
            <p>I’m Asaif Ali, an AI/ML engineer and the founder of AI Engineering Studio. I hold an M.Sc. in Data Science from VIT-AP University (2022–2024), and my professional background includes a Software Engineer (AI/ML) role at Bebo Technologies.</p>
            <p>My engineering work spans LLM-powered applications, retrieval-augmented generation (RAG), agentic workflows, MCP-based tool integrations, document intelligence, model evaluation and deployment. Earlier data science and AI internship experience gave me a practical grounding in machine learning, data preparation, experimentation and model development.</p>
            <p>I started this studio to make that engineering available to teams with a specific operational problem. My approach is to understand the workflow first, choose the simplest architecture that meets the need, then build with observable behaviour, evaluation and human review where appropriate. I stay directly involved from discovery and architecture through implementation, testing, deployment and handover. The goal is useful software that a team can understand, operate and own—not AI for its own sake.</p>
            <div className="refresh-founder-credentials"><span>M.Sc. Data Science · VIT-AP University (2022–2024)</span><span>Software Engineer (AI/ML) · Bebo Technologies</span><span>Agentic AI · RAG · MCP · LLM applications · Evaluation</span></div>
            <div className="refresh-founder-links"><Link href="/studio">Full founder profile ↗</Link><a href="https://www.linkedin.com/in/sk-asaif-ali-134873243" target="_blank" rel="noreferrer">LinkedIn ↗</a><a href="https://github.com/AsaifAli" target="_blank" rel="noreferrer">GitHub ↗</a></div>
          </div>
        </div>
      </section>

      <section className="refresh-faq-section">
        <div className="studio-container refresh-faq-grid"><div><p className="studio-eyebrow">07 / COMMON QUESTIONS</p><h2>Questions before <em>getting started.</em></h2><p>Start with the problem. We can work out the technical details together.</p><Link href="/contact">Ask about a project ↗</Link></div><div className="refresh-faq-list">{faqs.map((faq) => <details key={faq.q}><summary>{faq.q}<span>+</span></summary><p>{faq.a}</p></details>)}</div></div>
      </section>

      <section className="refresh-final-cta"><div className="studio-container refresh-final-cta-inner"><div><p className="studio-eyebrow">HAVE A WORKFLOW IN MIND?</p><h2>Let&apos;s make the work <em>work better.</em></h2><p>Tell us what is slowing your team down. You don&apos;t need a technical specification to start the conversation.</p></div><div className="refresh-final-actions"><Link href="/contact" className="refresh-button refresh-button-light">Start a project conversation <span>↗</span></Link>{bookingUrl ? <a href={bookingUrl} target="_blank" rel="noreferrer" className="refresh-final-booking">Book a discovery call ↗</a> : null}</div></div></section>
    </main>
  );
}
