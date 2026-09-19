import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: new URL("/privacidade", siteConfig.siteUrl).toString(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: siteConfig.siteUrl.toString(),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
