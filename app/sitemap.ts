import type { MetadataRoute } from "next";
import { site } from "@/data/site";

// Home — a single page with in-page anchors.
// `lastModified` updates on each build/deploy.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
