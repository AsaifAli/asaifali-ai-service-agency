
import { createHash } from "node:crypto";
import { NextResponse } from "next/server";

import { createAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RESEND_API = "https://api.resend.com/emails";

function clean(
  value: unknown,
  maxLength: number,
): string {
  return typeof value === "string"
    ? value.trim().slice(0, maxLength)
    : "";
}

function getTrustedClientIp(
  request: Request,
): string {
  const headerName = (
    process.env.CONTACT_IP_HEADER || "x-real-ip"
  )
    .trim()
    .toLowerCase();

  if (!/^[a-z0-9-]+$/.test(headerName)) {
    return "";
  }

  // Trust only the header explicitly configured for the
  // hosting proxy. Do not fall back to a visitor-controlled
  // x-forwarded-for value.
  return (
    request.headers.get(headerName)?.split(",")[0]?.trim() ||
    ""
  );
}

export async function POST(request: Request) {
  const contentLength = Number(
    request.headers.get("content-length") || 0,
  );

  if (contentLength > 16_000) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "The enquiry is too large. Please shorten your message.",
      },
      { status: 413 },
    );
  }

  const body = (await request
    .json()
    .catch(() => null)) as Record<string, unknown> | null;

  if (!body || typeof body !== "object") {
    return NextResponse.json(
      {
        ok: false,
        error: "Invalid form submission.",
      },
      { status: 400 },
    );
  }

  // Silently accept honeypot submissions without storing
  // a lead or sending an email.
  if (clean(body.website, 200)) {
    return NextResponse.json({
      ok: true,
      message:
        "Thank you. Your enquiry has been received.",
    });
  }

  const name = clean(body.name, 120)
    .replace(/[\r\n]+/g, " ");

  const email = clean(body.email, 320);

  const organization = clean(
    body.organization,
    160,
  );

  const projectType = clean(
    body.project_type,
    100,
  ).replace(/[\r\n]+/g, " ");

  const budgetRange = clean(
    body.budget_range,
    80,
  );

  const timeline = clean(body.timeline, 80);

  const message = clean(body.message, 5000);

  if (
    name.length < 2 ||
    !EMAIL_RE.test(email) ||
    projectType.length < 2 ||
    message.length < 20
  ) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Please provide your name, a valid email, a project type, and at least 20 characters about the workflow.",
      },
      { status: 400 },
    );
  }

  const supabase = createAdminClient();

  const rateSecret =
    process.env.CONTACT_RATE_LIMIT_SECRET?.trim();

  const clientIp = getTrustedClientIp(request);

  if (
    process.env.NODE_ENV === "production" &&
    (!supabase || !rateSecret || !clientIp)
  ) {
    console.error(
      "[contact] Production abuse-prevention configuration is incomplete",
      {
        hasSupabase: Boolean(supabase),
        hasRateSecret: Boolean(rateSecret),
        hasTrustedClientIp: Boolean(clientIp),
      },
    );

    return NextResponse.json(
      {
        ok: false,
        error:
          "The enquiry form is temporarily unavailable. Please try again later.",
      },
      { status: 503 },
    );
  }

  if (supabase && rateSecret && clientIp) {
    const keyHash = createHash("sha256")
      .update(`${rateSecret}:${clientIp}`)
      .digest("hex");

    const {
      data: allowed,
      error: rateError,
    } = await supabase.rpc(
      "consume_contact_rate_limit",
      {
        p_key_hash: keyHash,
      },
    );

    if (rateError) {
      console.error(
        "[contact] Rate-limit verification failed",
        {
          code: rateError.code || "unknown",
        },
      );

      return NextResponse.json(
        {
          ok: false,
          error:
            "The enquiry form could not verify its abuse-prevention check. Please try again later.",
        },
        { status: 503 },
      );
    }

    if (allowed === false) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Too many enquiries have been submitted from this connection. Please try again in about an hour.",
        },
        {
          status: 429,
          headers: {
            "Retry-After": "3600",
          },
        },
      );
    }
  }

  let stored = false;
  let emailed = false;

  const resendKey =
    process.env.RESEND_API_KEY?.trim();

  const toEmail =
    process.env.CONTACT_TO_EMAIL?.trim();

  const fromEmail =
    process.env.CONTACT_FROM_EMAIL?.trim();

  // This notification goes to the studio inbox only.
  // The route does not send an automatic acknowledgement
  // to the visitor-supplied email address.
  if (resendKey && toEmail && fromEmail) {
    try {
      const response = await fetch(RESEND_API, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [toEmail],
          reply_to: email,
          subject: `Studio enquiry: ${projectType} — ${name}`,
          text: [
            `Name: ${name}`,
            `Email: ${email}`,
            `Organisation: ${organization || "Not provided"}`,
            `Project type: ${projectType}`,
            `Budget: ${budgetRange || "Not provided"}`,
            `Timeline: ${timeline || "Not provided"}`,
            "",
            "Message:",
            message,
          ].join("\n"),
        }),
        signal: AbortSignal.timeout(8_000),
        cache: "no-store",
      });

      emailed = response.ok;

      if (!response.ok) {
        console.error(
          "[contact] Studio notification email failed",
          {
            status: response.status,
          },
        );
      }
    } catch (error) {
      console.error(
        "[contact] Studio notification request failed",
        error instanceof Error
          ? error.name
          : "UnknownError",
      );
    }
  }

  // Store the lead independently of email delivery.
  // An email outage must not discard a valid enquiry.
  try {
    if (supabase) {
      const { error } = await supabase
        .from("contact_messages")
        .insert({
          name,
          email,
          message,
          company: organization || null,
          project_type: projectType,
          budget_range: budgetRange || null,
          timeline: timeline || null,
          notification_status: emailed
            ? "sent"
            : "pending",
          lead_status: "new",
        });

      stored = !error;

      if (error) {
        console.error(
          "[contact] Lead storage failed",
          {
            code: error.code || "unknown",
          },
        );
      }
    } else {
      console.error(
        "[contact] Supabase admin client is not configured",
      );
    }
  } catch (error) {
    console.error(
      "[contact] Lead storage request failed",
      error instanceof Error
        ? error.name
        : "UnknownError",
    );
  }

  if (!stored && !emailed) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "The enquiry could not be delivered. Please try again later or use another contact method shown on the page.",
      },
      { status: 503 },
    );
  }

  const acknowledgement =
    stored && emailed
      ? "Your enquiry has been recorded and the studio has been notified. I aim to reply within two business days."
      : stored
        ? "Your enquiry has been saved in the studio inbox. The email notification is pending; I aim to reply within two business days."
        : "Your enquiry notification has been delivered to the studio. I aim to reply within two business days.";

  return NextResponse.json({
    ok: true,
    message: acknowledgement,
  });
}
