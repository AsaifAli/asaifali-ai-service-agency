# AI Engineering Studio

A founder-led applied AI engineering practice focused on document intelligence, business knowledge systems and multi-step workflow automation.

**Website:** https://asaifali-portfolio.vercel.app

The website presents service capabilities and independent engineering references. Public project references are demonstrations of implementation approaches; they are not client case studies or claims about customer deployments.

## What the studio builds

- **Document intelligence:** document ingestion, structured extraction, validation, deterministic comparisons and reviewable outputs.
- **Knowledge systems:** document ingestion, search, retrieval, reranking, evidence-grounded answers and evaluation.
- **Agentic workflow systems:** stateful orchestration, tool integrations, approval boundaries, exception handling and controlled automation.
- **Supporting engineering:** AI application engineering, API integration, AI evaluation and reliability.

## Selected independent systems

The public website focuses on two flagship builds rather than presenting a broad catalogue.

| System | Focus | Repository |
|---|---|---|
| QuoteSense | Procurement and quotation intelligence | https://github.com/AsaifAli/quotation-analyzer |
| EvidenceFlow | Evidence-grounded RAG and research | https://github.com/AsaifAli/LangGraph-RAG |

## Stack

- Next.js App Router and React
- TypeScript
- Supabase Postgres and Auth
- Supabase SSR
- Vercel
- Shared AI gateway for optional bring-your-own-key demonstrations

## Local development

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000.

The public site uses built-in project data when Supabase is unavailable. When Supabase is configured and seeded, published project copy is loaded from the `projects` table. The contact form can store enquiries in Supabase and send studio email notifications through Resend.

## Supabase setup

1. Create a Supabase project.
2. Run `supabase/schema.sql`.
3. Run `supabase/seed.sql`.
4. Apply the migrations in `supabase/migrations/` in order.
5. Create the owner user in Supabase Auth.
6. Set the owner's trusted **App Metadata** to `{"studio_role":"admin"}`.
7. Configure the public Supabase URL and publishable key in Vercel.

Never set `studio_role` in editable User Metadata. Never expose a Supabase service-role key in browser code.

## Contact delivery

Configure `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` and `CONTACT_RATE_LIMIT_SECRET` as server-side environment variables. The sender address/domain must be verified with Resend. The app stores enquiries in Supabase and exposes an admin-only inbox at `/admin/leads`.

## Optional live demonstrations

The public homepage includes synthetic, no-key walkthroughs and an optional live BYOK workbench. The live workbench reuses the existing InteractiveDemo, AISessionProvider and shared LLM Gateway session flow. Use a test key with spend limits and synthetic or non-confidential information only.

## Visual experience

The site uses a dark-first theme with a persistent dark/light toggle and a restrained graphite-and-blue palette. The founder profile uses a locally hosted, optimized portrait.

## Engineering philosophy

Technology follows the operating problem. Model-generated outputs are validated at application boundaries; deterministic business rules remain deterministic; evidence and uncertainty should be inspectable; and ownership, hosting, provider costs and handover responsibilities are agreed before production deployment.

## Ownership and client engagements

Each engagement is separately scoped with deliverables, acceptance criteria, fees, dependencies, data handling, intellectual-property terms, support and handover responsibilities agreed in writing.
