import type { Metadata } from "next";
import { site } from "@/content/site";

export function pageMetadata(title: string, description: string, path = ""): Metadata {
  const url = `${site.domain}${path}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      type: "website",
      images: [{ url: `${site.domain}${site.assets.homeHero}`, width: 1600, height: 900 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
