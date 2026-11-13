export type StudioUser = {
  app_metadata?: Record<string, unknown> | null;
} | null;

/** Admin access is controlled by a trusted Supabase app_metadata claim. */
export function isStudioAdmin(user: StudioUser): boolean {
  return user?.app_metadata?.studio_role === "admin";
}
