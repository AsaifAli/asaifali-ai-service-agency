
import type { Metadata } from "next";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
  "https://asaifali-portfolio.vercel.app";

export const SITE_NAME = "AI Engineering Studio";

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
};

function getSocialImagePath(path: string): string {
  const normalizedPath =
    path.startsWith("/") ? path : `/${path}`;

  const isDetailPage =
    /^\/(projects|services)\/[a-z0-9-]+$/.test(
      normalizedPath,
    );

  return isDetailPage
    ? `${normalizedPath}/opengraph-image`
    : "/opengraph-image";
}

export function studioMetadata({
  title,
  description,
  path,
  type = "website",
}: PageMetadataInput): Metadata {
  const normalizedPath =
    path.startsWith("/") ? path : `/${path}`;

  const pageUrl = new URL(
    normalizedPath,
    SITE_URL,
  ).toString();

  const socialImagePath =
    getSocialImagePath(normalizedPath);

  const socialImage = {
    url: socialImagePath,
    width: 1200,
    height: 630,
    alt: `${SITE_NAME} — ${title}`,
  };

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
      images: [socialImage],
    },

    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [socialImagePath],
    },
  };
}
