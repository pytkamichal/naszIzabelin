import type { MetadataRoute } from "next";
import { site } from "@/data/site";

// The site is a single page with in-page anchors, so the sitemap has one entry.
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
