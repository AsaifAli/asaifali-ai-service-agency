import type { MetadataRoute } from "next";
import { services } from "@/lib/services";

const SITE_URL = "https://asaifali-portfolio.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/services",
    "/approach",
    "/studio",
    "/contact",
  ];

  const serviceRoutes = services.map(
    (service) => `/services/${service.slug}`,
  );

  const projectRoutes = [
    "/projects/evidenceflow",
    "/projects/quotesense",
  ];

  return [...staticRoutes, ...serviceRoutes, ...projectRoutes].map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/services" ? 0.85 : 0.7,
  }));
}