import type { MetadataRoute } from "next";
import { site } from "@/data/site";

// Home (single page with in-page anchors) + the /strefa-6sp protest subpage.
// `lastModified` updates on each build/deploy.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${site.url}/strefa-6sp`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];
}
