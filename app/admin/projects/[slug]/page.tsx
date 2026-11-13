import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isStudioAdmin } from "@/lib/admin";
import { projects as fallbackProjects } from "@/lib/projects";
import { FEATURED_PROJECT_SLUGS } from "@/lib/featured-projects";
import { saveProject } from "./actions";

type Props = { params: Promise<{ slug: string }>; searchParams?: Promise<{ saved?: string; error?: string }> };

export const metadata = { robots: { index: false, follow: false } };

export default async function AdminProject({ params, searchParams }: Props) {
  const { slug } = await params;
  if (!FEATURED_PROJECT_SLUGS.includes(slug as (typeof FEATURED_PROJECT_SLUGS)[number])) notFound();
  const query = searchParams ? await searchParams : {};
  const supabase = await createClient();
  if (!supabase) redirect("/admin?error=supabase-not-configured");

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/sign-in");
  if (!isStudioAdmin(user)) redirect("/");

  const { data, error } = await supabase.from("projects").select("*").eq("slug", slug).maybeSingle();
  if (error) redirect("/admin?error=load-failed");
  const project = data || fallbackProjects.find((item) => item.slug === slug);
  if (!project) notFound();

  return (
    <main className="studio-main studio-admin">
      <div className="studio-container studio-admin-inner studio-admin-editor">
        <Link href="/admin" className="studio-back-link">← Admin workspace</Link>
        <p className="studio-eyebrow">Project content / {project.slug}</p>
        <h1>Edit {project.name}</h1>
        <p className="studio-admin-lede">Changes are saved to Supabase and revalidated on the homepage, Studio page and project detail route.</p>
        {query.saved === "1" && <p className="notice notice-success" role="status">Project updated and public pages revalidated.</p>}
        {query.error && <p className="notice notice-error" role="alert">The project could not be saved. Check the Supabase migration and administrator role.</p>}

        <form className="studio-admin-form" action={saveProject}>
          <input type="hidden" name="slug" value={project.slug} />
          {([
            ["number", "Display number", project.number],
            ["name", "Project name", project.name],
            ["eyebrow", "Category", project.eyebrow],
            ["short", "Short description", project.short],
            ["description", "Full description", project.description],
            ["github", "GitHub URL", project.github],
            ["status", "Status label", project.status],
          ] as const).map(([name, label, value]) => (
            <div className="field" key={name}><label htmlFor={name}>{label}</label><input id={name} name={name} defaultValue={value || ""} maxLength={1800} required={name !== "github"} /></div>
          ))}
          <div className="field"><label htmlFor="problem">Problem context</label><textarea id="problem" name="problem" rows={4} defaultValue={project.problem} maxLength={1800} required /></div>
          <div className="field"><label htmlFor="solution">What the system does</label><textarea id="solution" name="solution" rows={4} defaultValue={project.solution} maxLength={1800} required /></div>
          <div className="field"><label htmlFor="tags">Technology tags (comma separated)</label><input id="tags" name="tags" defaultValue={(project.tags || []).join(", ")} maxLength={1000} /></div>
          <label className="studio-admin-checkbox"><input type="checkbox" name="published" defaultChecked={project.published !== false} /> Published on the public website</label>
          <button className="studio-button studio-button-primary" type="submit">Save project changes ↗</button>
        </form>
      </div>
    </main>
  );
}
