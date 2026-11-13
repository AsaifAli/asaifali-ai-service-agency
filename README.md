# AI Engineering Studio

An independent, founder-led applied AI engineering practice focused on document intelligence, knowledge systems and controlled workflow automation.

The studio is directly led by Asaif Ali. The public portfolio highlights two independent engineering builds:

- **QuoteSense** — document intelligence for extracting, validating and comparing supplier quotations.
- **EvidenceFlow** — knowledge retrieval and evidence-grounded responses over internal information.

These are independent engineering builds, not paid client case studies or customer deployments. Synthetic examples on the homepage are clearly labelled and do not claim customer performance.

## Website experience

The homepage explains the problems addressed, capabilities, selected work, no-key sample walkthroughs, founder, delivery approach, engagement models and contact path. The advanced live model workbench is at `/technical-lab` and uses the existing provider-key workflow. It is optional and intended for technical evaluation with test credentials and non-confidential data only.

The visual theme follows the visitor's operating-system appearance preference. There is no manual theme toggle or locally stored theme choice.

## Engineering principles

- Start with the operating problem, not a preferred model or framework.
- Keep extraction, deterministic business rules and human decisions distinguishable.
- Make source evidence, exceptions and failure paths visible.
- Evaluate on representative cases before claiming readiness.
- Agree source ownership, provider usage, infrastructure and support responsibilities in writing.
- Hand over understandable code, documentation and operating instructions.

## Local development

Install dependencies with the package manager and lockfile already used by this repository, then run:

```bash
npm run dev
npm run lint
npm run typecheck
npm run build
```

Copy `.env.example` to `.env.local` only as a reference and preserve existing local provider configuration. Never commit `.env.local`, service-role keys, API keys or other secrets.

See `README-IMPLEMENTATION.md` in the section-refresh bundle for patch instructions, validation steps and outstanding production checks.
