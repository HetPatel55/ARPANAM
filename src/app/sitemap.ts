import type { MetadataRoute } from "next";

const baseUrl = "https://arpanamkids.school";

const routes = ["", "/about", "/programs", "/activities", "/gallery", "/admissions", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8
  }));
}
