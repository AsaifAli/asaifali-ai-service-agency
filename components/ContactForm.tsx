"use client";

import { useState, type FormEvent } from "react";

type FormState = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Capture the form before awaiting fetch. React's currentTarget is only
    // guaranteed during the synchronous event-handler invocation.
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const payload = {
      name: String(form.get("name") || "").trim(),
      email: String(form.get("email") || "").trim(),
      organization: String(form.get("organization") || "").trim(),
      project_type: String(form.get("project_type") || "").trim(),
      budget_range: String(form.get("budget_range") || "").trim(),
      timeline: String(form.get("timeline") || "").trim(),
      message: String(form.get("message") || "").trim(),
      website: String(form.get("website") || "").trim(),
    };

    setState("sending");
    setMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json().catch(() => ({}))) as {
        ok?: boolean;
        message?: string;
        error?: string;
      };

      if (!response.ok || !result.ok) {
        throw new Error(
          result.message || result.error || "We could not submit your enquiry.",
        );
      }

      setState("sent");
      setMessage(
        result.message ||
          "Your enquiry has been received. You can expect a reply by email.",
      );
      formElement.reset();
    } catch (caught) {
      setState("error");
      setMessage(
        caught instanceof Error
          ? caught.message
          : "We could not send your message. Please email the studio directly.",
      );
    }
  }

  return (
    <form className="form-stack personal-contact-form refresh-contact-form" onSubmit={onSubmit}>
      <div className="refresh-honeypot" aria-hidden="true">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="refresh-form-grid">
        <div className="field">
          <label htmlFor="name">Your name *</label>
          <input id="name" name="name" required maxLength={120} autoComplete="name" placeholder="Jane Smith" />
        </div>
        <div className="field">
          <label htmlFor="email">Work email *</label>
          <input id="email" name="email" type="email" required maxLength={320} autoComplete="email" placeholder="jane@company.com" />
        </div>
      </div>

      <div className="field">
        <label htmlFor="organization">Company or organisation</label>
        <input id="organization" name="organization" maxLength={160} autoComplete="organization" placeholder="Your organisation (optional)" />
      </div>

      <div className="refresh-form-grid">
        <div className="field">
          <label htmlFor="project_type">What are you exploring? *</label>
          <select id="project_type" name="project_type" defaultValue="" required>
            <option value="" disabled>Select a project type</option>
            <option value="Document intelligence">Document intelligence</option>
            <option value="Knowledge and RAG">Knowledge and RAG</option>
            <option value="Workflow automation">Workflow automation</option>
            <option value="AI application engineering">AI application engineering</option>
            <option value="AI evaluation and reliability">AI evaluation and reliability</option>
            <option value="Not sure yet">Not sure yet</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="timeline">When are you looking to start?</label>
          <select id="timeline" name="timeline" defaultValue="Flexible">
            <option>Immediately</option>
            <option>Within 1 month</option>
            <option>Within 1–3 months</option>
            <option>Exploring / flexible</option>
            <option>Flexible</option>
          </select>
        </div>
      </div>

      <div className="field">
        <label htmlFor="budget_range">Indicative budget (optional)</label>
        <input id="budget_range" name="budget_range" maxLength={80} placeholder="Share a range, or write ‘not decided’" />
        <span className="field-hint">A rough indication is enough. Final fees depend on the agreed scope.</span>
      </div>

      <div className="field">
        <label htmlFor="message">Tell us about the workflow *</label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          minLength={20}
          maxLength={5000}
          placeholder="What happens today, what is difficult, which tools or documents are involved, and what would a useful result look like?"
        />
      </div>

      <div className="refresh-form-submit">
        <button className="btn btn-primary" type="submit" disabled={state === "sending"}>
          {state === "sending" ? "Sending enquiry…" : "Send project enquiry"}
          <span aria-hidden="true">↗</span>
        </button>
        <span>No technical specification required to start.</span>
      </div>

      {state === "sent" && <div className="notice notice-success" role="status">{message}</div>}
      {state === "error" && <div className="notice notice-error" role="alert">{message}</div>}
    </form>
  );
}
