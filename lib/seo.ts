import type { Metadata } from "next";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://asaifali-portfolio.vercel.app";
export const SITE_NAME = "AI Engineering Studio";

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
};

export function studioMetadata({ title, description, path, type = "website" }: PageMetadataInput): Metadata {
  const pageUrl = new URL(path, SITE_URL).toString();
  const fullTitle = `${title} | ${SITE_NAME}`;
  const socialImage = { url: "/opengraph-image", width: 1200, height: 630, alt: `${SITE_NAME} — ${title}` };

  return {
    title,
    description,
    alternates: { canonical: pageUrl },
    openGraph: {
      title: fullTitle,
      description,
      url: pageUrl,
      siteName: SITE_NAME,
      locale: "en_IN",
      type,
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: ["/opengraph-image"],
    },
  };
}
