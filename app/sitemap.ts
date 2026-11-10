import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://carlgriff.com";
  return ([
    { path: "", priority: 1, changeFrequency: "weekly" },
    { path: "/books", priority: 0.8, changeFrequency: "monthly" },
    { path: "/steel-of-machina", priority: 0.9, changeFrequency: "monthly" },
    { path: "/child-of-destiny", priority: 0.9, changeFrequency: "monthly" },
    { path: "/about", priority: 0.6, changeFrequency: "yearly" },
    { path: "/gallery", priority: 0.6, changeFrequency: "monthly" },
  ] as const).map(({ path, priority, changeFrequency }) => ({
    url: `${base}${path}`,
    priority,
    changeFrequency,
  }));
}
