"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isStudioAdmin } from "@/lib/admin";
import { FEATURED_PROJECT_SLUGS } from "@/lib/featured-projects";

function field(formData: FormData, name: string, max: number): string {
  return String(formData.get(name) || "").trim().slice(0, max);
}

export async function saveProject(formData: FormData) {
  const supabase = await createClient();
  if (!supabase) redirect("/admin?error=supabase-not-configured");

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/sign-in");
  if (!isStudioAdmin(user)) redirect("/");

  const slug = field(formData, "slug", 100);
  if (!slug) redirect("/admin?error=missing-slug");
  if (!FEATURED_PROJECT_SLUGS.includes(slug as (typeof FEATURED_PROJECT_SLUGS)[number])) redirect("/admin?error=project-not-featured");

  const tags = field(formData, "tags", 1000)
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean)
    .slice(0, 30);

  const { error } = await supabase
    .from("projects")
    .update({
      number: field(formData, "number", 12),
      name: field(formData, "name", 120),
      eyebrow: field(formData, "eyebrow", 160),
      short: field(formData, "short", 400),
      description: field(formData, "description", 1800),
      github: field(formData, "github", 500),
      status: field(formData, "status", 50),
      problem: field(formData, "problem", 1800),
      solution: field(formData, "solution", 1800),
      tags,
      published: formData.get("published") === "on",
      updated_at: new Date().toISOString(),
    })
    .eq("slug", slug);

  if (error) redirect(`/admin/projects/${slug}?error=save-failed`);

  revalidatePath("/");
  revalidatePath("/studio");
  revalidatePath(`/projects/${slug}`);
  revalidatePath("/admin");
  redirect(`/admin/projects/${slug}?saved=1`);
}
