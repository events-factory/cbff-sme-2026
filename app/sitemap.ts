import type { MetadataRoute } from "next";

const BASE_URL = "https://cbffsme.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/about", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/speakers", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/program", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/registration", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/sponsors", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/exhibition", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/accommodation", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/destination", priority: 0.6, changeFrequency: "monthly" as const },
  ];

  return pages.map(({ path, priority, changeFrequency }) => ({
    url: `${BASE_URL}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}
