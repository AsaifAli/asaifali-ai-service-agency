import { projects as fallbackProjects, type Project } from "./projects";
import { FEATURED_PROJECT_SLUGS } from "./featured-projects";
export { FEATURED_PROJECT_SLUGS } from "./featured-projects";
import { createClient } from "./supabase/server";

type ProjectRow = Record<string, unknown> & { slug?: string };

const featuredFallbackProjects = fallbackProjects.filter((project) =>
  FEATURED_PROJECT_SLUGS.includes(project.slug as (typeof FEATURED_PROJECT_SLUGS)[number]),
);

function arrayOrFallback<T>(value: unknown, fallback: T[]): T[] {
  return Array.isArray(value) ? (value as T[]) : fallback;
}

function textOrFallback(value: unknown, fallback: string): string {
  return typeof value === "string" && value.trim() ? value : fallback;
}

function mapProjectRow(row: ProjectRow): Project | null {
  const fallback = fallbackProjects.find((project) => project.slug === row.slug);
  if (!fallback) return null;

  return {
    ...fallback,
    number: textOrFallback(row.number, fallback.number),
    name: textOrFallback(row.name, fallback.name),
    eyebrow: textOrFallback(row.eyebrow, fallback.eyebrow),
    short: textOrFallback(row.short, fallback.short),
    description: textOrFallback(row.description, fallback.description),
    tags: arrayOrFallback(row.tags, fallback.tags),
    github: textOrFallback(row.github, fallback.github),
    status: textOrFallback(row.status, fallback.status),
    accent: textOrFallback(row.accent, fallback.accent),
    problem: textOrFallback(row.problem, fallback.problem),
    solution: textOrFallback(row.solution, fallback.solution),
    architecture: arrayOrFallback(row.architecture, fallback.architecture),
    decisions: arrayOrFallback(row.decisions, fallback.decisions),
    reliability: arrayOrFallback(row.reliability, fallback.reliability),
    // Demo URLs and detailed build notes remain code-controlled. The CMS edits
    // public copy; it cannot silently replace deployment destinations.
    liveUrl: fallback.liveUrl,
    star: fallback.star,
  };
}

/**
 * Returns published projects from Supabase, merged with trusted code defaults.
 * If Supabase is unavailable, the public site remains usable from the
 * repository's built-in project data.
 */
export async function getProjects(): Promise<Project[]> {
  try {
    const supabase = await createClient();
    if (!supabase) return featuredFallbackProjects;

    const { data, error } = await supabase
      .from("projects")
      .select("slug,number,name,eyebrow,short,description,tags,github,status,accent,problem,solution,architecture,decisions,reliability,published,sort_order")
      .eq("published", true)
      .in("slug", [...FEATURED_PROJECT_SLUGS])
      .order("sort_order", { ascending: true });

    if (error) return featuredFallbackProjects;
    if (!data?.length) return [];

    const mapped = (data as ProjectRow[])
      .map(mapProjectRow)
      .filter((project): project is Project => project !== null);

    return mapped;
  } catch {
    return featuredFallbackProjects;
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  const projects = await getProjects();
  return projects.find((project) => project.slug === slug);
}
