
import type { Metadata } from "next";

export const SITE_URL = "https://asaifali-portfolio.vercel.app";
export const SITE_NAME = "AI Engineering Studio";

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
};

export function studioMetadata({
  title,
  description,
  path,
  type = "website",
}: PageMetadataInput): Metadata {
  const pageUrl = new URL(path, SITE_URL).toString();
  const fullTitle = `${title} | ${SITE_NAME}`;

  return {
    title,
    description,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: pageUrl,
      siteName: SITE_NAME,
      locale: "en_IN",
      type,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}
