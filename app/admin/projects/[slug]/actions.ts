
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { isStudioAdmin } from "@/lib/admin";
import { FEATURED_PROJECT_SLUGS } from "@/lib/featured-projects";

function field(
  formData: FormData,
  name: string,
  max: number,
): string {
  return String(formData.get(name) || "")
    .trim()
    .slice(0, max);
}

function normalizeGitHubRepositoryUrl(
  value: string,
): string | null {
  if (!value) {
    return null;
  }

  try {
    const parsed = new URL(value);

    if (
      parsed.protocol !== "https:" ||
      parsed.hostname.toLowerCase() !== "github.com" ||
      parsed.username ||
      parsed.password ||
      parsed.search ||
      parsed.hash
    ) {
      return null;
    }

    const parts = parsed.pathname
      .split("/")
      .filter(Boolean);

    if (parts.length !== 2) {
      return null;
    }

    const [owner, repository] = parts;

    const ownerIsValid =
      /^[A-Za-z0-9](?:[A-Za-z0-9-]{0,37}[A-Za-z0-9])?$/.test(
        owner,
      );

    const repositoryIsValid =
      /^[A-Za-z0-9_.-]+$/.test(repository) &&
      repository !== "." &&
      repository !== "..";

    if (!ownerIsValid || !repositoryIsValid) {
      return null;
    }

    return `https://github.com/${owner}/${repository}`;
  } catch {
    return null;
  }
}

export async function saveProject(
  formData: FormData,
) {
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

  const slug = field(formData, "slug", 100);

  if (!slug) {
    redirect("/admin?error=missing-slug");
  }

  if (
    !FEATURED_PROJECT_SLUGS.includes(
      slug as (typeof FEATURED_PROJECT_SLUGS)[number],
    )
  ) {
    redirect("/admin?error=project-not-featured");
  }

  const githubInput = field(
    formData,
    "github",
    500,
  );

  const github = normalizeGitHubRepositoryUrl(
    githubInput,
  );

  if (!github) {
    redirect(
      `/admin/projects/${slug}?error=invalid-github`,
    );
  }

  const tags = field(
    formData,
    "tags",
    1000,
  )
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean)
    .slice(0, 30);

  const update = {
    number: field(formData, "number", 12),
    name: field(formData, "name", 120),
    eyebrow: field(formData, "eyebrow", 160),
    short: field(formData, "short", 400),
    description: field(formData, "description", 1800),
    github,
    status: field(formData, "status", 50),
    problem: field(formData, "problem", 1800),
    solution: field(formData, "solution", 1800),
    tags,
    published: formData.get("published") === "on",
    updated_at: new Date().toISOString(),
  };

  if (
    !update.name ||
    !update.eyebrow ||
    !update.short ||
    !update.description
  ) {
    redirect(
      `/admin/projects/${slug}?error=missing-fields`,
    );
  }

  const { error } = await supabase
    .from("projects")
    .update(update)
    .eq("slug", slug);

  if (error) {
    console.error(
      "[admin] Project update failed",
      {
        code: error.code || "unknown",
        slug,
      },
    );

    redirect(
      `/admin/projects/${slug}?error=save-failed`,
    );
  }

  revalidatePath("/");
  revalidatePath("/studio");
  revalidatePath(`/projects/${slug}`);
  revalidatePath("/admin");
  revalidatePath("/services");

  redirect(
    `/admin/projects/${slug}?saved=1`,
  );
}
