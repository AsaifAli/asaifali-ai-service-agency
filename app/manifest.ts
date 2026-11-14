
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AI Engineering Studio",
    short_name: "AI Engineering",
    description:
      "Human-led applied AI engineering for documents, knowledge and business workflows.",
    start_url: "/",
    display: "browser",
    background_color: "#0b0e14",
    theme_color: "#0b0e14",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
