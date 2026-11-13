import type { MetadataRoute } from "next";
import { FEATURED_PROJECT_SLUGS } from "@/lib/featured-projects";
import { services } from "@/lib/services";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/services", "/approach", "/studio", "/contact", "/privacy", "/terms"];
  const serviceRoutes = services.map((service) => `/services/${service.slug}`);
  const projectRoutes = FEATURED_PROJECT_SLUGS.map((slug) => `/projects/${slug}`);

  return [...staticRoutes, ...serviceRoutes, ...projectRoutes].map((path) => ({
    url: new URL(path, SITE_URL).toString(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/services" ? 0.85 : path === "/privacy" || path === "/terms" ? 0.3 : 0.7,
  }));
}
