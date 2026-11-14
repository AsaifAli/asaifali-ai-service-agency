
import Link from "next/link";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { isStudioAdmin } from "@/lib/admin";
import {
  retryLeadNotification,
  updateLead,
} from "./actions";

import styles from "./leads.module.css";

const PAGE_SIZE = 25;

const STATUSES = [
  "new",
  "replied",
  "closed",
] as const;

type LeadStatus = (typeof STATUSES)[number];

type Props = {
  searchParams: Promise<{
    page?: string;
    status?: string;
    error?: string;
    updated?: string;
    retried?: string;
  }>;
};

function dateLabel(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function statusLabel(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function pageHref(
  page: number,
  status: string,
) {
  const params = new URLSearchParams();

  params.set("page", String(page));

  if (status !== "all") {
    params.set("status", status);
  }

  return `/admin/leads?${params.toString()}`;
}

function errorMessage(error?: string) {
  const messages: Record<string, string> = {
    "invalid-lead": "The selected lead is invalid.",
    "invalid-status": "The selected lead status is invalid.",
    "save-failed": "The lead changes could not be saved.",
    "lead-not-found": "The selected lead could not be found.",
    "notification-not-retryable":
      "Only pending or failed notifications can be retried.",
    "email-not-configured":
      "Email retry is not configured. Check the server-side Resend settings.",
    "retry-failed":
      "The notification retry failed. The lead remains available in the inbox.",
    "status-update-failed":
      "The notification was processed, but its status could not be saved.",
  };

  return error ? messages[error] : undefined;
}

export const metadata = {
  title: "Lead inbox",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
  },
};

export default async function AdminLeadsPage({
  searchParams,
}: Props) {
  const params = await searchParams;

  const requestedStatus = params.status || "all";

  const status =
    requestedStatus === "all" ||
    STATUSES.includes(requestedStatus as LeadStatus)
      ? requestedStatus
      : "all";

  const parsedPage = Number.parseInt(
    params.page || "1",
    10,
  );

  const requestedPage =
    Number.isFinite(parsedPage) && parsedPage > 0
      ? parsedPage
      : 1;

  const supabase = await createClient();

  if (!supabase) {
    redirect("/admin?error=supabase-not-configured");
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/sign-in");
  }

  if (!isStudioAdmin(user)) {
    redirect("/");
  }

  let countQuery = supabase
    .from("contact_messages")
    .select("id", {
      count: "exact",
      head: true,
    });

  if (status !== "all") {
    countQuery = countQuery.eq(
      "lead_status",
      status,
    );
  }

  const {
    count,
    error: countError,
  } = await countQuery;

  if (countError) {
    return (
      <main className="studio-main studio-admin">
        <div className="studio-container studio-admin-inner">
          <Link
            href="/admin"
            className="studio-back-link"
          >
            ← Admin workspace
          </Link>

          <h1>Project enquiries.</h1>

          <p
            className="notice notice-error"
            role="alert"
          >
            Could not count enquiries. Confirm that the
            lead-operations migration has been applied.
          </p>
        </div>
      </main>
    );
  }

  const totalCount = count || 0;

  const totalPages = Math.max(
    1,
    Math.ceil(totalCount / PAGE_SIZE),
  );

  const currentPage = Math.min(
    requestedPage,
    totalPages,
  );

  const from = (currentPage - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  let leadsQuery = supabase
    .from("contact_messages")
    .select(
      "id,name,email,company,project_type,budget_range,timeline,message,notification_status,lead_status,internal_notes,created_at,updated_at",
    )
    .order("created_at", {
      ascending: false,
    });

  if (status !== "all") {
    leadsQuery = leadsQuery.eq(
      "lead_status",
      status,
    );
  }

  const {
    data,
    error,
  } = await leadsQuery.range(from, to);

  if (error) {
    return (
      <main className="studio-main studio-admin">
        <div className="studio-container studio-admin-inner">
          <Link
            href="/admin"
            className="studio-back-link"
          >
            ← Admin workspace
          </Link>

          <h1>Project enquiries.</h1>

          <p
            className="notice notice-error"
            role="alert"
          >
            Could not load the selected page of enquiries.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="studio-main studio-admin">
      <div className="studio-container studio-admin-inner">
        <Link
          href="/admin"
          className="studio-back-link"
        >
          ← Admin workspace
        </Link>

        <p className="studio-eyebrow">
          Private studio workspace
        </p>

        <h1>Project enquiries.</h1>

        <p className="studio-admin-lede">
          Enquiries stored in Supabase. Access is
          restricted to studio administrators.
        </p>

        {params.updated === "1" ? (
          <p
            className="notice notice-success"
            role="status"
          >
            Lead changes saved.
          </p>
        ) : null}

        {params.retried === "1" ? (
          <p
            className="notice notice-success"
            role="status"
          >
            Notification sent successfully.
          </p>
        ) : null}

        {errorMessage(params.error) ? (
          <p
            className="notice notice-error"
            role="alert"
          >
            {errorMessage(params.error)}
          </p>
        ) : null}

        <div className={styles.toolbar}>
          <div>
            <strong>{totalCount}</strong>
            <span>
              {status === "all"
                ? "total enquiries"
                : `${status} enquiries`}
            </span>
          </div>

          <a
            className={styles.exportLink}
            href="/api/admin/leads/export"
          >
            Export CSV ↗
          </a>
        </div>

        <form
          action="/admin/leads"
          method="get"
          className={styles.filters}
        >
          <label htmlFor="lead-status-filter">
            Filter by status
          </label>

          <select
            id="lead-status-filter"
            name="status"
            defaultValue={status}
          >
            <option value="all">
              All statuses
            </option>

            {STATUSES.map((item) => (
              <option
                key={item}
                value={item}
              >
                {statusLabel(item)}
              </option>
            ))}
          </select>

          <button type="submit">
            Apply filter
          </button>
        </form>

        {!data?.length ? (
          <div className={styles.empty}>
            No enquiries found for this filter.
          </div>
        ) : null}

        <div className={styles.leadList}>
          {(data || []).map((lead) => {
            const notificationStatus =
              lead.notification_status || "unknown";

            const canRetry =
              notificationStatus === "pending" ||
              notificationStatus === "failed";

            return (
              <article
                className={styles.leadCard}
                key={lead.id}
              >
                <div className={styles.leadHeader}>
                  <div>
                    <span className="studio-eyebrow">
                      {lead.project_type || "Project enquiry"}
                    </span>

                    <h2>{lead.name}</h2>

                    <a href={`mailto:${lead.email}`}>
                      {lead.email}
                    </a>
                  </div>

                  <time dateTime={lead.created_at}>
                    {dateLabel(lead.created_at)}
                  </time>
                </div>

                <div className={styles.leadMeta}>
                  {lead.company ? (
                    <span>{lead.company}</span>
                  ) : null}

                  {lead.budget_range ? (
                    <span>
                      Budget: {lead.budget_range}
                    </span>
                  ) : null}

                  {lead.timeline ? (
                    <span>
                      Timeline: {lead.timeline}
                    </span>
                  ) : null}

                  <span>
                    Email notification: {notificationStatus}
                  </span>
                </div>

                <div className={styles.message}>
                  <strong>Enquiry</strong>
                  <p>{lead.message}</p>
                </div>

                <form
                  action={updateLead}
                  className={styles.editForm}
                >
                  <input
                    type="hidden"
                    name="id"
                    value={lead.id}
                  />

                  <div className={styles.formField}>
                    <label htmlFor={`status-${lead.id}`}>
                      Lead status
                    </label>

                    <select
                      id={`status-${lead.id}`}
                      name="lead_status"
                      defaultValue={lead.lead_status || "new"}
                    >
                      {STATUSES.map((item) => (
                        <option
                          key={item}
                          value={item}
                        >
                          {statusLabel(item)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className={styles.formField}>
                    <label htmlFor={`notes-${lead.id}`}>
                      Private internal notes
                    </label>

                    <textarea
                      id={`notes-${lead.id}`}
                      name="internal_notes"
                      rows={3}
                      maxLength={5000}
                      defaultValue={lead.internal_notes || ""}
                      placeholder="Notes visible only in the admin inbox…"
                    />
                  </div>

                  <button
                    type="submit"
                    className={styles.saveButton}
                  >
                    Save lead changes
                  </button>
                </form>

                <div className={styles.notificationRow}>
                  <span>
                    Notification state:{" "}
                    <strong>{notificationStatus}</strong>
                  </span>

                  {canRetry ? (
                    <form action={retryLeadNotification}>
                      <input
                        type="hidden"
                        name="id"
                        value={lead.id}
                      />

                      <button
                        type="submit"
                        className={styles.retryButton}
                      >
                        Retry notification
                      </button>
                    </form>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>

        {totalPages > 1 ? (
          <nav
            className={styles.pagination}
            aria-label="Lead inbox pagination"
          >
            {currentPage > 1 ? (
              <Link
                href={pageHref(currentPage - 1, status)}
              >
                ← Previous
              </Link>
            ) : (
              <span aria-disabled="true">
                ← Previous
              </span>
            )}

            <span>
              Page {currentPage} of {totalPages}
            </span>

            {currentPage < totalPages ? (
              <Link
                href={pageHref(currentPage + 1, status)}
              >
                Next →
              </Link>
            ) : (
              <span aria-disabled="true">
                Next →
              </span>
            )}
          </nav>
        ) : null}
      </div>
    </main>
  );
}
