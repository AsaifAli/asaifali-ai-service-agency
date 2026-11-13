import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isStudioAdmin } from "@/lib/admin";
import { projects as fallbackProjects } from "@/lib/projects";
import { FEATURED_PROJECT_SLUGS } from "@/lib/featured-projects";

export const metadata = { robots: { index: false, follow: false } };

export default async function AdminPage() {
  const supabase = await createClient();
  if (!supabase) {
    return <main className="studio-main studio-admin"><div className="studio-container"><h1>Admin is not configured</h1><p>Configure Supabase and apply the agency hardening migration before using the studio admin.</p></div></main>;
  }

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/sign-in");
  if (!isStudioAdmin(user)) redirect("/");

  const [{ data: projectRows }, { count: leadCount }] = await Promise.all([
    supabase.from("projects").select("slug,name,short,published").in("slug", [...FEATURED_PROJECT_SLUGS]).order("sort_order", { ascending: true }),
    supabase.from("contact_messages").select("id", { count: "exact", head: true }),
  ]);

  // Normalize database rows and code fallbacks to one explicit shape.
  // The fallback Project type intentionally has no CMS `published` field.
  type AdminProject = {
    slug: string;
    name: string;
    short: string;
    published: boolean;
  };

  const rows: AdminProject[] = projectRows?.length
    ? projectRows.map((project) => ({
        slug: project.slug,
        name: project.name,
        short: project.short,
        published: project.published !== false,
      }))
    : fallbackProjects.filter((project) => FEATURED_PROJECT_SLUGS.includes(project.slug as (typeof FEATURED_PROJECT_SLUGS)[number])).map((project) => ({
        slug: project.slug,
        name: project.name,
        short: project.short,
        published: true,
      }));

  return (
    <main className="studio-main studio-admin">
      <div className="studio-container studio-admin-inner">
        <p className="studio-eyebrow">Private studio workspace</p>
        <h1>Studio control room.</h1>
        <p className="studio-admin-lede">Signed in as {user.email}. Only users with the trusted <code>app_metadata.studio_role = admin</code> claim can access this area.</p>

        <div className="studio-admin-actions">
          <Link href="/admin/leads" className="studio-admin-tile">
            <span className="studio-eyebrow">Enquiry inbox</span>
            <strong>{leadCount ?? 0} enquiries</strong>
            <span>Review submitted project enquiries →</span>
          </Link>
          <div className="studio-admin-tile">
            <span className="studio-eyebrow">Project content</span>
            <strong>{rows.length} projects</strong>
            <span>Update public project information</span>
          </div>
        </div>

        <h2>Projects</h2>
        <div className="studio-admin-list">
          {rows.map((project) => (
            <Link className="studio-admin-row" href={`/admin/projects/${project.slug}`} key={project.slug}>
              <span><strong>{project.name}</strong><small>{project.short}</small></span>
              <span>{project.published === false ? "Draft" : "Published"} →</span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
