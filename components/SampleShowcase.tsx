"use client";

import { useState } from "react";

type Sample = "quotesense" | "evidenceflow";

export function SampleShowcase() {
  const [active, setActive] = useState<Sample>("quotesense");

  return (
    <section className="refresh-sample" aria-labelledby="sample-heading">
      <div className="refresh-sample-heading">
        <div><p className="studio-eyebrow">Explore without an API key</p><h2 id="sample-heading">See the kind of output a system can produce.</h2></div>
        <p>These are illustrative, synthetic examples—not live customer data or performance claims. Use them to understand the workflow before opening the technical demos.</p>
      </div>

      <div className="refresh-sample-tabs" role="group" aria-label="Choose a sample walkthrough">
        <button type="button" aria-pressed={active === "quotesense"} className={active === "quotesense" ? "is-active" : ""} onClick={() => setActive("quotesense")}>QuoteSense <span>01</span></button>
        <button type="button" aria-pressed={active === "evidenceflow"} className={active === "evidenceflow" ? "is-active" : ""} onClick={() => setActive("evidenceflow")}>EvidenceFlow <span>02</span></button>
      </div>

      {active === "quotesense" ? (
        <div className="refresh-sample-panel" aria-label="QuoteSense synthetic example">
          <div className="refresh-sample-panel-top"><span className="refresh-sample-status"><i /> SYNTHETIC PROCUREMENT EXAMPLE</span><span>USD / THREE QUOTATIONS</span></div>
          <div className="refresh-quote-summary"><div><small>LOWEST QUOTED PRICE</small><strong>$18,400</strong><span>Northstar Components</span></div><div><small>REVIEW FLAG</small><strong className="refresh-warning">2 items</strong><span>Missing warranty · delivery variance</span></div><div><small>COMPARISON BASIS</small><strong>USD only</strong><span>Currency consistency checked</span></div></div>
          <div className="refresh-quote-table">
            <div className="refresh-quote-row refresh-quote-head"><span>SUPPLIER</span><span>PRICE</span><span>DELIVERY</span><span>REVIEW</span></div>
            <div className="refresh-quote-row"><strong>Northstar Components</strong><span>$18,400</span><span>21 days</span><em className="refresh-good">Complete</em></div>
            <div className="refresh-quote-row"><strong>Meridian Supply</strong><span>$19,250</span><span>18 days</span><em className="refresh-warning">Warranty missing</em></div>
            <div className="refresh-quote-row"><strong>Atlas Industrial</strong><span>$21,100</span><span>35 days</span><em className="refresh-warning">Timeline review</em></div>
          </div>
          <div className="refresh-sample-foot"><strong>Decision support, not autopilot.</strong><span>Extraction → validation → deterministic comparison → human review</span></div>
        </div>
      ) : (
        <div className="refresh-sample-panel" aria-label="EvidenceFlow synthetic example">
          <div className="refresh-sample-panel-top"><span className="refresh-sample-status"><i /> SYNTHETIC KNOWLEDGE EXAMPLE</span><span>ANSWER WITH SOURCE CONTEXT</span></div>
          <div className="refresh-evidence-query"><small>QUESTION</small><strong>What checks are required before a supplier is approved?</strong></div>
          <div className="refresh-evidence-answer"><div><small>GROUNDED RESPONSE</small><h3>Three checks are identified in the sample policy.</h3><p>Verify business registration, confirm the tax identifier, and complete the risk review before approval. The workflow keeps the cited source passages available for inspection.</p></div><aside><span>ANSWER STATUS</span><strong>Evidence attached</strong><span className="refresh-evidence-score">3 source passages</span></aside></div>
          <div className="refresh-evidence-sources"><div><span>01</span><strong>Supplier onboarding policy</strong><small>Section 2.1 · Registration checks</small></div><div><span>02</span><strong>Procurement controls</strong><small>Section 4.3 · Tax validation</small></div><div><span>03</span><strong>Risk review procedure</strong><small>Section 1.4 · Approval gate</small></div></div>
          <div className="refresh-sample-foot"><strong>Evidence before confidence.</strong><span>Retrieve → rank → inspect evidence → verify citations</span></div>
        </div>
      )}

      <p className="refresh-sample-disclaimer">All organisation names, values and policy excerpts in this preview are fictional. The examples demonstrate interface concepts only; actual system behaviour depends on the documents, rules and evaluation criteria agreed for a project.</p>
    </section>
  );
}
