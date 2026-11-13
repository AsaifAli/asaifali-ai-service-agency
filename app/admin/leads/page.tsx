import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isStudioAdmin } from "@/lib/admin";

function dateLabel(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : new Intl.DateTimeFormat("en-IN", { dateStyle: "medium", timeStyle: "short" }).format(date);
}

export const metadata = { robots: { index: false, follow: false } };

export default async function AdminLeadsPage() {
  const supabase = await createClient();
  if (!supabase) redirect("/admin?error=supabase-not-configured");
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/sign-in");
  if (!isStudioAdmin(user)) redirect("/");

  const { data, error } = await supabase
    .from("contact_messages")
    .select("id,name,email,company,project_type,budget_range,timeline,message,notification_status,created_at")
    .order("created_at", { ascending: false })
    .limit(100);

  return (
    <main className="studio-main studio-admin">
      <div className="studio-container studio-admin-inner">
        <Link href="/admin" className="studio-back-link">← Admin workspace</Link>
        <p className="studio-eyebrow">Private studio workspace</p>
        <h1>Project enquiries.</h1>
        <p className="studio-admin-lede">Recent enquiries stored in Supabase. Access is restricted to studio administrators.</p>

        {error ? <p className="notice notice-error" role="alert">Could not load enquiries. Confirm that the agency hardening migration has been applied.</p> : null}
        {!error && !data?.length ? <div className="studio-admin-empty">No enquiries have been submitted yet.</div> : null}

        <div className="studio-lead-list">
          {(data || []).map((lead) => (
            <article className="studio-lead-card" key={lead.id}>
              <div className="studio-lead-head">
                <div><span className="studio-eyebrow">{lead.project_type || "Project enquiry"}</span><h2>{lead.name}</h2><a href={`mailto:${lead.email}`}>{lead.email}</a></div>
                <time dateTime={lead.created_at}>{dateLabel(lead.created_at)}</time>
              </div>
              <div className="studio-lead-meta">
                {lead.company ? <span>{lead.company}</span> : null}
                {lead.budget_range ? <span>Budget: {lead.budget_range}</span> : null}
                {lead.timeline ? <span>Timeline: {lead.timeline}</span> : null}
                <span>Notification: {lead.notification_status || "unknown"}</span>
              </div>
              <p>{lead.message}</p>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
