
import type { MetadataRoute } from "next";
import { services } from "@/lib/services";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/services",
    "/approach",
    "/studio",
    "/contact",
    "/privacy",
    "/terms",
  ];

  const serviceRoutes = services.map(
    (service) => `/services/${service.slug}`,
  );

  const projectRoutes = [
    "/projects/evidenceflow",
    "/projects/quotesense",
  ];

  const allRoutes = [
    ...staticRoutes,
    ...serviceRoutes,
    ...projectRoutes,
  ];

  return allRoutes.map((path) => ({
    url: new URL(path, SITE_URL).toString(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority:
      path === ""
        ? 1
        : path === "/services"
          ? 0.85
          : path === "/privacy" || path === "/terms"
            ? 0.3
            : 0.7,
  }));
}
