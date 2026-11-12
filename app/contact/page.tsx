
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { studioMetadata } from "@/lib/seo";

export const metadata = studioMetadata({
  title: "Project Enquiry",
  description:
    "Discuss an AI engineering project, business knowledge system, document intelligence workflow, or automation requirement.",
  path: "/contact",
});

const contactEmail =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() ||
  "Asaif.2361997@gmail.com";

export default function ContactPage() {
  return (
    <main className="studio-main studio-inner-page">
      <section className="studio-page-hero">
        <div className="studio-container">
          <Link className="studio-back-link" href="/">
            ← Home
          </Link>

          <p className="studio-eyebrow">
            Project enquiry / Start a conversation
          </p>

          <h1>Start with the workflow. Not a technical specification.</h1>

          <p>
            Describe the process, what is difficult today, and the
            systems involved. The initial conversation is used to
            understand fit, constraints, and a sensible next step.
          </p>
        </div>
      </section>

      <section className="studio-section">
        <div className="studio-container studio-contact-page-grid">
          <aside className="studio-contact-page-aside">
            <p className="studio-eyebrow">Useful context</p>
            <h2>What to include</h2>

            <ul>
              <li>The process or workflow you want to improve.</li>
              <li>Who uses it and which systems are involved.</li>
              <li>What makes the current approach difficult.</li>
              <li>Any access, data, or timing constraints already known.</li>
            </ul>

            <div className="studio-contact-facts">
              <div>
                <span>Engagement</span>
                <strong>Direct / Founder-led</strong>
              </div>

              <div>
                <span>Working model</span>
                <strong>Scoped milestones</strong>
              </div>

              <div>
                <span>Location</span>
                <strong>India / Remote</strong>
              </div>
            </div>

            <a
              className="studio-email-link"
              href={`mailto:${contactEmail}`}
            >
              {contactEmail} ↗
            </a>

            <div className="studio-social-links">
              <a
                href="https://www.linkedin.com/in/sk-asaif-ali-134873243"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn ↗
              </a>

              <a
                href="https://github.com/AsaifAli"
                target="_blank"
                rel="noreferrer"
              >
                GitHub ↗
              </a>
            </div>
          </aside>

          <div className="studio-contact-form-panel">
            <div className="studio-contact-form-heading">
              <p className="studio-eyebrow">Enquiry form</p>
              <h2>Tell me about the problem.</h2>
            </div>

            <ContactForm />

            <p className="studio-form-legal">
              By submitting this form, you are sharing information so
              the studio can review and respond to your enquiry. See
              the <Link href="/privacy">Privacy Notice</Link> and{" "}
              <Link href="/terms">Terms of Use</Link>.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
