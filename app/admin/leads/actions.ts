
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { isStudioAdmin } from "@/lib/admin";

const VALID_STATUSES = [
  "new",
  "replied",
  "closed",
] as const;

type LeadStatus = (typeof VALID_STATUSES)[number];

const EMAIL_API = "https://api.resend.com/emails";

function getField(
  formData: FormData,
  name: string,
  maxLength: number,
): string {
  return String(formData.get(name) || "")
    .trim()
    .slice(0, maxLength);
}

function isUuid(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    value,
  );
}

async function requireAdmin() {
  const authClient = await createClient();

  if (!authClient) {
    redirect("/admin?error=supabase-not-configured");
  }

  const {
    data: { user },
  } = await authClient.auth.getUser();

  if (!user) {
    redirect("/auth/sign-in");
  }

  if (!isStudioAdmin(user)) {
    redirect("/");
  }

  const adminClient = createAdminClient();

  if (!adminClient) {
    redirect("/admin?error=supabase-not-configured");
  }

  return adminClient;
}

function refreshLeadViews() {
  revalidatePath("/admin");
  revalidatePath("/admin/leads");
}

export async function updateLead(
  formData: FormData,
) {
  const admin = await requireAdmin();

  const id = getField(formData, "id", 64);
  const statusInput = getField(
    formData,
    "lead_status",
    20,
  );
  const internalNotes = getField(
    formData,
    "internal_notes",
    5000,
  );

  if (!isUuid(id)) {
    redirect("/admin/leads?error=invalid-lead");
  }

  if (
    !VALID_STATUSES.includes(
      statusInput as LeadStatus,
    )
  ) {
    redirect("/admin/leads?error=invalid-status");
  }

  const { error } = await admin
    .from("contact_messages")
    .update({
      lead_status: statusInput,
      internal_notes: internalNotes,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    console.error("[admin-leads] Lead update failed", {
      code: error.code || "unknown",
    });

    redirect("/admin/leads?error=save-failed");
  }

  refreshLeadViews();

  redirect("/admin/leads?updated=1");
}

export async function retryLeadNotification(
  formData: FormData,
) {
  const admin = await requireAdmin();

  const id = getField(formData, "id", 64);

  if (!isUuid(id)) {
    redirect("/admin/leads?error=invalid-lead");
  }

  const { data: lead, error: readError } = await admin
    .from("contact_messages")
    .select(
      "id,name,email,company,project_type,budget_range,timeline,message,notification_status",
    )
    .eq("id", id)
    .maybeSingle();

  if (readError || !lead) {
    console.error("[admin-leads] Could not load lead for retry", {
      code: readError?.code || "not-found",
    });

    redirect("/admin/leads?error=lead-not-found");
  }

  if (
    lead.notification_status !== "pending" &&
    lead.notification_status !== "failed"
  ) {
    redirect("/admin/leads?error=notification-not-retryable");
  }

  const resendKey =
    process.env.RESEND_API_KEY?.trim();

  const toEmail =
    process.env.CONTACT_TO_EMAIL?.trim();

  const fromEmail =
    process.env.CONTACT_FROM_EMAIL?.trim();

  if (!resendKey || !toEmail || !fromEmail) {
    redirect("/admin/leads?error=email-not-configured");
  }

  const safeName = String(lead.name || "Not provided")
    .replace(/[\r\n]+/g, " ")
    .slice(0, 120);

  const safeProjectType = String(
    lead.project_type || "Project enquiry",
  )
    .replace(/[\r\n]+/g, " ")
    .slice(0, 100);

  const emailText = [
    "A project enquiry notification has been retried from the studio admin inbox.",
    "",
    `Name: ${safeName}`,
    `Email: ${lead.email}`,
    `Organisation: ${lead.company || "Not provided"}`,
    `Project type: ${safeProjectType}`,
    `Budget: ${lead.budget_range || "Not provided"}`,
    `Timeline: ${lead.timeline || "Not provided"}`,
    "",
    "Message:",
    lead.message,
  ].join("\n");

  let sent = false;

  try {
    const response = await fetch(EMAIL_API, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: lead.email,
        subject: `Studio enquiry retry: ${safeProjectType} — ${safeName}`,
        text: emailText,
      }),
      signal: AbortSignal.timeout(8000),
      cache: "no-store",
    });

    sent = response.ok;

    if (!response.ok) {
      console.error(
        "[admin-leads] Resend retry returned a non-success status",
        { status: response.status },
      );
    }
  } catch (error) {
    console.error(
      "[admin-leads] Resend retry request failed",
      error instanceof Error ? error.name : "UnknownError",
    );
  }

  const { error: updateError } = await admin
    .from("contact_messages")
    .update({
      notification_status: sent ? "sent" : "failed",
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (updateError) {
    console.error(
      "[admin-leads] Could not update notification status",
      { code: updateError.code || "unknown" },
    );

    redirect("/admin/leads?error=status-update-failed");
  }

  refreshLeadViews();

  if (!sent) {
    redirect("/admin/leads?error=retry-failed");
  }

  redirect("/admin/leads?retried=1");
}
