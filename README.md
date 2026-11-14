
# AI Engineering Studio

**Human-led. Agent-powered. Outcome-driven.**

An independent, founder-led AI solutions and engineering agency building custom AI applications, agentic systems and intelligent automation around real business problems.

The studio is directly led by Asaif Ali. Specialist AI-assisted workflows can support bounded tasks such as research, architecture support, implementation assistance and evaluation. Technical decisions, client communication, approvals and final delivery remain human-led and accountable.

## Featured engineering builds

The public portfolio focuses on two independent engineering builds:

- **QuoteSense** — document intelligence for extracting, validating and comparing supplier quotations.
- **EvidenceFlow** — knowledge retrieval and evidence-grounded responses over internal information.

These are independent engineering builds, not paid client case studies or customer deployments. Synthetic examples on the homepage are clearly labelled and do not claim customer performance.

## Website experience

The homepage positions the studio as an AI solutions and engineering agency. Its three primary solution pillars are custom AI applications, agentic AI systems, and intelligent automation and integration. Supporting capabilities include document intelligence, RAG and knowledge systems, LLM integration, evaluation, deployment and handover.

The advanced live model workbench is available at `/technical-lab`. It allows technical evaluators to connect their own supported AI provider API key for live model requests. It is optional and intended for testing with limited-spend credentials and synthetic or non-confidential data only.

The visual theme follows the visitor's operating-system appearance preference. There is no manual theme toggle or locally stored theme choice.

## Engineering principles

- Start with the operating problem, not a preferred model or framework.
- Keep model-assisted extraction, deterministic business rules and human decisions distinguishable.
- Make source evidence, exceptions and failure paths visible.
- Evaluate on representative cases before claiming readiness.
- Restrict tools and permissions to the task being performed.
- Agree source ownership, provider usage, infrastructure and support responsibilities in writing.
- Hand over understandable code, documentation and operating instructions.

## Technology

The website is built with:

- Next.js App Router
- React and TypeScript
- Supabase for project content, authentication and the enquiry inbox
- Resend for studio enquiry notifications
- A separate shared LLM gateway for optional live demonstrations

The gateway and public demo applications are separate services and have their own deployment configuration.

## Local development

Use Node.js 22.x.

Install dependencies:

```bash
npm ci
```

Create `.env.local` using `.env.example` as a reference. Preserve your existing local provider configuration and never commit the local environment file.

Run the development server:

```bash
npm run dev
```

Run quality checks:

```bash
npm run lint
npm run typecheck
npm audit --omit=dev
npm run build
```

## Environment configuration

The main environment variables are documented in `.env.example`.

Server-only values include:

- `SUPABASE_SERVICE_ROLE_KEY`
- `RESEND_API_KEY`
- `CONTACT_RATE_LIMIT_SECRET`
- `CONTACT_TO_EMAIL`
- `CONTACT_FROM_EMAIL`

The optional public settings include:

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `NEXT_PUBLIC_LLM_GATEWAY_URL`
- `NEXT_PUBLIC_CONTACT_EMAIL`
- `NEXT_PUBLIC_BOOKING_URL`

`CONTACT_IP_HEADER` must identify a client-IP header that the hosting proxy reliably overwrites. Confirm the correct header in the hosting environment before enabling production contact submissions.

Never expose service-role keys, Resend credentials, rate-limit secrets or provider API keys through `NEXT_PUBLIC_` variables.

## Supabase setup

For a new database, use:

```text
supabase/schema.sql
```

For an existing database, apply the migrations in order after backing up the project:

```text
supabase/migrations/20261113_agency_hardening.sql
supabase/migrations/202611140001_lead_operations.sql
```

The admin workspace uses the trusted Supabase `app_metadata.studio_role = admin` claim. Do not use user-editable metadata as an authorization source.

The public contact form submits through the server API. It does not insert directly into the contact-message table.

## Admin workspace

The admin area provides project content editing and a private enquiry inbox.

Lead operations include:

- Lead statuses: new, replied and closed
- Private internal notes
- Paginated lead review
- CSV export
- Retry for pending or failed email notifications

Only authenticated users with the trusted studio-admin claim should access these operations.

## Deployment and security

Before production use:

1. Configure the required Vercel environment variables.
2. Verify the Supabase service-role key and admin claim setup.
3. Confirm the hosting proxy's trusted client-IP header.
4. Verify the Resend sending domain and sender address.
5. Apply the appropriate Supabase migration for the deployment.
6. Submit a test enquiry and confirm both inbox storage and notification behaviour.
7. Confirm the security response headers and review the CSP report-only findings before tightening the policy.

Never include `.env.local`, `.env` files, service-role keys, provider credentials or other secrets in a source archive or ZIP bundle.

## Quality workflow

GitHub Actions runs:

- Dependency installation from the lockfile
- ESLint
- TypeScript type checking
- Production dependency audit
- Next.js production build

Dependabot is configured to check npm dependencies and GitHub Actions updates weekly.
