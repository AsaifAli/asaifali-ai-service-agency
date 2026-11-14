
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { isStudioAdmin } from "@/lib/admin";

export const runtime = "nodejs";

const PAGE_SIZE = 500;
const MAX_EXPORT_ROWS = 20000;

function csvCell(value: unknown): string {
  let text = String(value ?? "")
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n");

  // Protect spreadsheet applications against formula injection.
  if (/^\s*[=+\-@]/.test(text)) {
    text = `'${text}`;
  }

  return `"${text.replace(/"/g, '""')}"`;
}

function csvRow(values: unknown[]): string {
  return values.map(csvCell).join(",");
}

export async function GET() {
  const supabase = await createClient();

  if (!supabase) {
    return NextResponse.json(
      { error: "Admin export is not configured." },
      { status: 503 },
    );
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      { error: "Authentication required." },
      { status: 401 },
    );
  }

  if (!isStudioAdmin(user)) {
    return NextResponse.json(
      { error: "Access denied." },
      { status: 403 },
    );
  }

  const headers = [
    "id",
    "created_at",
    "lead_status",
    "notification_status",
    "name",
    "email",
    "company",
    "project_type",
    "budget_range",
    "timeline",
    "message",
  ];

  const csvLines: string[] = [
    csvRow(headers),
  ];

  for (
    let offset = 0;
    offset < MAX_EXPORT_ROWS;
    offset += PAGE_SIZE
  ) {
    const { data, error } = await supabase
      .from("contact_messages")
      .select(
        "id,created_at,lead_status,notification_status,name,email,company,project_type,budget_range,timeline,message",
      )
      .order("created_at", { ascending: false })
      .range(offset, offset + PAGE_SIZE - 1);

    if (error) {
      console.error(
        "[admin-leads-export] Query failed",
        { code: error.code || "unknown" },
      );

      return NextResponse.json(
        { error: "The lead export could not be generated." },
        { status: 500 },
      );
    }

    const page = data ?? [];

    for (const lead of page) {
      csvLines.push(
        csvRow([
          lead.id,
          lead.created_at,
          lead.lead_status,
          lead.notification_status,
          lead.name,
          lead.email,
          lead.company,
          lead.project_type,
          lead.budget_range,
          lead.timeline,
          lead.message,
        ]),
      );
    }

    if (page.length < PAGE_SIZE) {
      break;
    }
  }

  const csv = `\uFEFF${csvLines.join("\r\n")}`;

  return new Response(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition":
        'attachment; filename="studio-leads.csv"',
      "Cache-Control": "private, no-store, max-age=0",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
