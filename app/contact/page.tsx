import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { studioMetadata } from "@/lib/seo";

const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || "Asaif.2361997@gmail.com";
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
          <p>Tell us what is difficult today, who is involved and what a useful result would look like. The first conversation is about understanding fit and constraints—not selling you a preselected AI solution.</p>
        </div>
      </section>

      <section className="studio-section">
        <div className="studio-container studio-contact-page-grid">
          <aside className="studio-contact-page-aside refresh-contact-aside">
            <p className="studio-eyebrow">A useful first conversation</p>
            <h2>What happens next?</h2>
            <ol className="refresh-contact-steps">
              <li><strong>We review the workflow.</strong><span>We read your note and identify the key questions.</span></li>
              <li><strong>We discuss fit.</strong><span>We clarify data, integrations, users and constraints.</span></li>
              <li><strong>You receive a sensible next step.</strong><span>If there is a fit, we outline a bounded assessment or pilot scope.</span></li>
            </ol>

            <div className="studio-contact-facts">
              <div><span>Engagement</span><strong>Direct / Founder-led</strong></div>
              <div><span>Working model</span><strong>Scoped milestones</strong></div>
              <div><span>Location</span><strong>India / Remote</strong></div>
            </div>

            <a className="studio-email-link" href={`mailto:${contactEmail}`}>{contactEmail} ↗</a>
            {bookingUrl ? <a className="refresh-booking-link" href={bookingUrl} target="_blank" rel="noreferrer">Book a 30-minute workflow call ↗</a> : <p className="refresh-booking-note">Prefer a call? A booking link can be added here when the studio calendar is ready.</p>}
            <div className="studio-social-links"><a href="https://www.linkedin.com/in/sk-asaif-ali-134873243" target="_blank" rel="noreferrer">LinkedIn ↗</a><a href="https://github.com/AsaifAli" target="_blank" rel="noreferrer">GitHub ↗</a></div>
          </aside>

          <div className="studio-contact-form-panel">
            <div className="studio-contact-form-heading"><p className="studio-eyebrow">Enquiry form</p><h2>Tell us what you want to improve.</h2></div>
            <ContactForm />
            <p className="studio-form-legal">Please do not include passwords, API keys, confidential customer records or sensitive personal information. See the <Link href="/privacy">Privacy Notice</Link> and <Link href="/terms">Terms of Use</Link>.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
