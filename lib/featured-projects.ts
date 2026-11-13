/** The only two projects currently featured across public-facing studio routes. */
export const FEATURED_PROJECT_SLUGS = ["quotesense", "evidenceflow"] as const;
export type FeaturedProjectSlug = (typeof FEATURED_PROJECT_SLUGS)[number];
