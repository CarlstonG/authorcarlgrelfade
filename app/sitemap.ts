import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://carlgriff.com";
  return ["", "/books", "/gallery", "/about", "/child-of-destiny", "/privacy", "/terms"].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/child-of-destiny" ? 0.9 : 0.7,
  }));
}
