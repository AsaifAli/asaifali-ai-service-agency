import type { MetadataRoute } from "next";
import { FEATURED_PROJECT_SLUGS } from "@/lib/featured-projects";
import { services } from "@/lib/services";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const staticRoutes = [
    "",
    "/services",
    "/approach",
    "/studio",
    "/technical-lab",
    "/contact",
    "/privacy",
    "/terms",
    "/sample-assessment-report.pdf",
  ];
  const serviceRoutes = services.map((service) => `/services/${service.slug}`);
  const projectRoutes = FEATURED_PROJECT_SLUGS.map((slug) => `/projects/${slug}`);

  return [...staticRoutes, ...serviceRoutes, ...projectRoutes].map((path) => ({
    url: new URL(path, SITE_URL).toString(),
    lastModified,
  }));
}
