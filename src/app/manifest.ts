import type { MetadataRoute } from "next";
import { SITE_NAME, SITE_DESCRIPTION } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} - 真のノーコード × 最強CMS`,
    short_name: SITE_NAME,
    description: SITE_DESCRIPTION,
    lang: "ja",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#2563eb",
    icons: [
      {
        src: "/icon",
        sizes: "64x64",
        type: "image/png",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
      {
        src: "/logo.png",
        sizes: "508x176",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
