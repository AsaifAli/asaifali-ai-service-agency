"use client";

import { FormEvent, useState } from "react";

export function ContactForm() {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("sending");
    setErrorMessage("");
    const form = new FormData(event.currentTarget);
    const payload = {
      name: String(form.get("name") || ""),
      email: String(form.get("email") || ""),
      message: String(form.get("message") || ""),
      company: String(form.get("company") || ""),
    };
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result?.message || result?.error || "Request failed");
      setState("sent");
      event.currentTarget.reset();
    } catch (caught) {
      setState("error");
      setErrorMessage(caught instanceof Error ? caught.message : "Could not send the message.");
    }
  }

  return <form className="form-stack personal-contact-form" onSubmit={onSubmit}>
    <div className="honeypot" aria-hidden="true"><label htmlFor="company">Company</label><input id="company" name="company" tabIndex={-1} autoComplete="off" /></div>
    <div className="field"><label htmlFor="name">Name</label><input id="name" name="name" required maxLength={120} placeholder="Your name" /></div>
    <div className="field"><label htmlFor="email">Email</label><input id="email" name="email" type="email" required maxLength={320} placeholder="you@example.com" /></div>
    <div className="field"><label htmlFor="message">Message</label><textarea id="message" name="message" rows={7} required maxLength={5000} placeholder="Describe the workflow, the problem you want to solve, the systems involved, and what you would like to improve." /></div>
    <div><button className="btn btn-primary" disabled={state === "sending"}>{state === "sending" ? "Sending…" : "Send message →"}</button></div>
    {state === "sent" && <div className="notice notice-success">Thanks — your message was sent. I’ll get back to you.</div>}
    {state === "error" && <div className="notice notice-error" role="alert">{errorMessage || "The contact service is not configured yet. Please use the email or LinkedIn links."}</div>}
  </form>;
}
