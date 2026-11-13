import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { studioMetadata } from "@/lib/seo";

const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim();
const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL?.trim();

export const metadata = studioMetadata({
  title: "Project Enquiry",
  description: "Discuss an AI engineering project, document intelligence workflow, knowledge system or business automation requirement.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <main className="studio-main studio-inner-page refresh-inner-page">
      <section className="studio-page-hero refresh-page-hero">
        <div className="studio-container">
          <Link className="studio-back-link" href="/">← Home</Link>
          <p className="studio-eyebrow">Project enquiry / Start a conversation</p>
          <h1>Start with the workflow. <em>Not a technical specification.</em></h1>
          <p>Tell me what is difficult today, who is involved and what a useful result would look like. The first conversation is about understanding fit and constraints—not selling you a preselected AI solution.</p>
        </div>
      </section>

      <section className="studio-section">
        <div className="studio-container studio-contact-page-grid">
          <aside className="studio-contact-page-aside refresh-contact-aside">
            <p className="studio-eyebrow">A useful first conversation</p>
            <h2>What happens next?</h2>
            <ol className="refresh-contact-steps">
              <li><strong>I review the workflow.</strong><span>I read your note and identify the key questions.</span></li>
              <li><strong>I discuss fit with you.</strong><span>I clarify data, integrations, users and constraints.</span></li>
              <li><strong>You receive a sensible next step.</strong><span>If there is a fit, I outline a bounded assessment or pilot scope.</span></li>
            </ol>

            <div className="studio-contact-facts">
              <div><span>Engagement</span><strong>Direct / Founder-led</strong></div>
              <div><span>Working model</span><strong>Scoped milestones</strong></div>
              <div><span>Location</span><strong>India / Remote</strong></div>
            </div>

            <div className="refresh-contact-response"><span>EXPECTED RESPONSE</span><strong>Within 2 business days</strong><p>I review each enquiry personally. Complex requests may need a little longer for a considered response.</p></div>
            {contactEmail ? <a className="studio-email-link" href={`mailto:${contactEmail}`}>{contactEmail} ↗</a> : null}
            {bookingUrl ? <a className="refresh-booking-link" href={bookingUrl} target="_blank" rel="noreferrer">Book a 30-minute workflow call ↗</a> : null}
            <a className="refresh-assessment-link" href="/sample-assessment-report.pdf" target="_blank" rel="noreferrer">Read an illustrative sample assessment (PDF) ↗</a>
            <div className="studio-social-links"><a href="https://www.linkedin.com/in/sk-asaif-ali-134873243" target="_blank" rel="noreferrer">LinkedIn ↗</a><a href="https://github.com/AsaifAli" target="_blank" rel="noreferrer">GitHub ↗</a></div>
          </aside>

          <div className="studio-contact-form-panel">
            <div className="studio-contact-form-heading"><p className="studio-eyebrow">Enquiry form</p><h2>Tell me what you want to improve.</h2></div>
            <ContactForm />
            <p className="studio-form-legal">Please do not include passwords, API keys, confidential customer records or sensitive personal information. I aim to respond within two business days. See the <Link href="/privacy">Privacy Notice</Link> and <Link href="/terms">Terms of Use</Link>.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
