
import Link from "next/link";
import { studioMetadata } from "@/lib/seo";

const contactEmail =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim();

export const metadata = studioMetadata({
  title: "Privacy",
  description:
    "How AI Engineering Studio handles project enquiries, website interactions and provider API credentials used for interactive demonstrations.",
  path: "/privacy",
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

export default function PrivacyPage() {
  return (
    <main className="studio-main studio-inner-page studio-legal-page">
      <section className="studio-page-hero">
        <div className="studio-container">
          <Link className="studio-back-link" href="/">
            ← Home
          </Link>

          <p className="studio-eyebrow">
            Legal / Privacy
          </p>

          <h1>Privacy and information handling.</h1>

          <p>
            This page explains how information is handled
            when you use the website, submit a project
            enquiry, or connect a provider API key for an
            interactive engineering demonstration.
          </p>

          <p className="studio-legal-updated">
            Last updated: 14 November 2026
          </p>
        </div>
      </section>

      <section className="studio-section">
        <div className="studio-container studio-legal-content">
          <section>
            <h2>1. Who is responsible</h2>

            <p>
              AI Engineering Studio is an independent
              practice led by Asaif Ali. For privacy
              questions relating to this website or a
              project enquiry, contact <ContactRoute />.
            </p>
          </section>

          <section>
            <h2>2. Information you provide</h2>

            <p>
              When you submit a project enquiry, the website
              may collect your name, email address, message
              and other information you choose to include.
              Please share only information needed to
              explain the enquiry.
            </p>

            <p>
              Do not use the public contact form to send
              passwords, API keys, payment details,
              confidential customer records or sensitive
              personal information.
            </p>
          </section>

          <section>
            <h2>3. How enquiry information is used</h2>

            <ul>
              <li>To read and respond to your enquiry.</li>
              <li>
                To assess whether the requested work is a
                suitable fit.
              </li>
              <li>
                To communicate about a potential or active
                engagement.
              </li>
              <li>
                To protect the website and investigate
                misuse or delivery failures.
              </li>
            </ul>
          </section>

          <section>
            <h2>4. Contact form service providers</h2>

            <p>
              The contact API can use Supabase for message
              storage and Resend for email delivery when
              those services are configured in the
              deployment. Those providers process
              information as needed to provide their
              respective infrastructure services.
            </p>

            <p>
              Whether a message is stored, emailed or
              both depends on the active deployment
              configuration. The form reports a failure
              when neither configured delivery path
              succeeds.
            </p>
          </section>

          <section>
            <h2>5. Provider API keys and demonstrations</h2>

            <p>
              The interactive demonstrations allow you
              to connect your own supported AI provider
              account using a provider API key. When you
              connect a provider, the key is submitted
              over HTTPS to the configured demonstration
              gateway for temporary session use.
            </p>

            <p>
              The gateway is designed to encrypt the key
              for temporary server-side use. The browser
              stores a short-lived session token rather
              than the raw provider API key. Session
              expiry and revocation are controlled by
              the gateway configuration.
            </p>

            <p>
              When you use a demonstration, prompts and
              data you submit may be sent to the AI
              provider selected in the workbench. That
              provider handles the information under its
              own terms and privacy policy. Review those
              terms before connecting.
            </p>

            <p>
              Do not submit confidential documents,
              production secrets, customer information,
              regulated data or other material that you
              are not authorised to share.
            </p>
          </section>

          <section>
            <h2>6. Storage, session information and logs</h2>

            <p>
              The live workbench uses browser session
              storage for its short-lived session token.
              Clearing the browser session or ending the
              session removes that local token.
            </p>

            <p>
              Server-side credential handling, session
              duration, request logging and retention
              depend on the configured gateway and
              hosting services. No public demonstration
              should be treated as a confidential or
              production environment.
            </p>
          </section>

          <section>
            <h2>7. Sharing and disclosure</h2>

            <p>
              Information may be processed by
              infrastructure providers that support the
              website, contact form, hosting or
              interactive demonstrations. Information
              may also be disclosed where required by
              applicable law or to protect the security
              and integrity of the services.
            </p>

            <p>
              Personal information is not sold to
              advertisers.
            </p>
          </section>

          <section>
            <h2>8. Retention and security</h2>

            <p>
              Enquiry information is retained for as
              long as reasonably necessary to respond,
              manage a potential or active engagement,
              maintain appropriate business records or
              address legal and security requirements.
              Actual retention periods may also be
              affected by the configured storage and
              email providers.
            </p>

            <p>
              Reasonable technical and organisational
              measures are used for the services under
              the studio&apos;s control. No website,
              internet transmission or third-party
              service can be guaranteed to be completely
              secure.
            </p>
          </section>

          <section>
            <h2>9. Your choices and requests</h2>

            <p>
              You may contact the studio to ask about an
              enquiry you submitted, request correction
              of inaccurate information or ask for
              deletion where applicable law and
              legitimate recordkeeping requirements
              permit.
            </p>

            <p>
              Contact: <ContactRoute />.
            </p>
          </section>

          <section>
            <h2>10. Changes to this notice</h2>

            <p>
              This notice may be updated when the website,
              demonstration infrastructure or
              information-handling practices change.
              The date at the top of this page identifies
              the latest revision.
            </p>
          </section>

          <div className="studio-legal-callout">
            <p>
              Public demonstrations are provided for
              technical evaluation with synthetic or
              non-confidential information. Read the{" "}
              <Link href="/terms">Terms of Use</Link>{" "}
              before using them.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
