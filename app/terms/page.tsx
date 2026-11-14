
import Link from "next/link";
import { studioMetadata } from "@/lib/seo";

const contactEmail =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim();

export const metadata = studioMetadata({
  title: "Terms of Use",
  description:
    "Terms covering the AI Engineering Studio website, public engineering references and interactive demonstrations using your own AI provider API key.",
  path: "/terms",
});

function ContactRoute() {
  if (contactEmail) {
    return (
      <a href={`mailto:${contactEmail}`}>
        {contactEmail}
      </a>
    );
  }

  return <Link href="/contact">the contact form</Link>;
}

export default function TermsPage() {
  return (
    <main className="studio-main studio-inner-page studio-legal-page">
      <section className="studio-page-hero">
        <div className="studio-container">
          <Link className="studio-back-link" href="/">
            ← Home
          </Link>

          <p className="studio-eyebrow">
            Legal / Terms of use
          </p>

          <h1>Terms for the website and demonstrations.</h1>

          <p>
            These terms explain the conditions for using
            the AI Engineering Studio website, public
            engineering references and interactive
            demonstrations.
          </p>

          <p className="studio-legal-updated">
            Last updated: 14 November 2026
          </p>
        </div>
      </section>

      <section className="studio-section">
        <div className="studio-container studio-legal-content">
          <section>
            <h2>1. About the studio</h2>

            <p>
              AI Engineering Studio is an independent
              applied AI engineering practice led by
              Asaif Ali. Website content describes
              services and independent engineering
              references; it does not by itself create
              a client, supplier, employment or
              partnership relationship.
            </p>
          </section>

          <section>
            <h2>2. Website and reference material</h2>

            <p>
              The website and its public project
              references are provided for general
              information and technical evaluation.
              Project descriptions explain selected
              engineering approaches and should not
              be interpreted as customer case studies
              unless explicitly identified as such.
            </p>

            <p>
              Features, interfaces, dependencies and
              availability may change as independent
              projects are maintained.
            </p>
          </section>

          <section>
            <h2>3. Interactive demonstrations</h2>

            <p>
              Interactive demonstrations are provided
              for evaluation and learning, not as
              production systems or as a substitute
              for a separately scoped implementation.
            </p>

            <ul>
              <li>
                Use synthetic or non-confidential
                information only.
              </li>
              <li>
                Do not upload sensitive, regulated or
                unauthorised data.
              </li>
              <li>
                Do not use the demonstrations for
                unlawful, harmful or abusive activity.
              </li>
              <li>
                Do not attempt to disrupt, exploit or
                bypass their security controls.
              </li>
              <li>
                Do not rely on demonstration outputs
                as professional, legal, financial,
                medical or operational advice.
              </li>
            </ul>
          </section>

          <section>
            <h2>
              4. Your AI provider account and API key
            </h2>

            <p>
              Interactive demonstrations allow you to
              connect your own supported AI provider
              account using a provider API key. You are
              responsible for the accuracy, validity,
              permissions and security of the key you
              provide.
            </p>

            <p>
              Requests may be sent to the AI provider
              selected in the workbench. Your use is
              subject to that provider&apos;s terms,
              acceptable-use requirements, privacy
              practices, rate limits and service
              availability.
            </p>

            <p>
              Model usage and other third-party charges
              are governed by your provider account and
              its pricing. You are responsible for
              reviewing usage and billing with that
              provider.
            </p>
          </section>

          <section>
            <h2>5. Availability and limitations</h2>

            <p>
              The website and demonstrations may be
              modified, suspended or unavailable due
              to maintenance, provider outages, hosting
              limitations, usage restrictions or other
              operational reasons. No uptime commitment
              or service-level agreement is created by
              using the public website or demonstrations.
            </p>

            <p>
              AI-generated outputs may be incomplete,
              incorrect, inconsistent or unsupported.
              Review outputs independently before
              relying on them or taking consequential
              action.
            </p>
          </section>

          <section>
            <h2>6. Intellectual property</h2>

            <p>
              Unless stated otherwise, the website&apos;s
              original text, branding, design and code
              are owned by or used with permission by
              the studio. Third-party names, trademarks,
              frameworks and services remain the property
              of their respective owners.
            </p>

            <p>
              Access to the website or a public
              demonstration does not transfer ownership
              or grant a licence to reuse studio
              materials beyond ordinary browsing and
              evaluation.
            </p>
          </section>

          <section>
            <h2>7. Client engagements</h2>

            <p>
              Any project engagement is subject to a
              separate written agreement defining scope,
              fees, milestones, acceptance criteria,
              responsibilities, confidentiality,
              intellectual property, support and other
              applicable terms. That agreement takes
              precedence over these general website
              terms for the work it covers.
            </p>

            <p>
              Implementation fees, model usage, hosting
              and third-party services may be separate
              cost items and should be agreed before a
              project proceeds.
            </p>
          </section>

          <section>
            <h2>8. Disclaimers and limitation</h2>

            <p>
              To the extent permitted by applicable law,
              the website and public demonstrations are
              provided on an as-available basis without
              a guarantee that they will be uninterrupted,
              error-free or suitable for a particular
              purpose.
            </p>

            <p>
              Nothing in these terms excludes rights or
              liabilities that cannot be excluded under
              applicable law.
            </p>
          </section>

          <section>
            <h2>9. Changes to these terms</h2>

            <p>
              These terms may be updated when the website
              or demonstrations change. The revision
              date at the top of this page identifies
              the latest version.
            </p>
          </section>

          <section>
            <h2>10. Contact</h2>

            <p>
              Questions about these terms can be sent
              to <ContactRoute />.
            </p>
          </section>

          <div className="studio-legal-callout">
            <p>
              For information about handling contact
              submissions and provider API key sessions,
              read the{" "}
              <Link href="/privacy">Privacy Notice</Link>.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
