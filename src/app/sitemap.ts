import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { getAllBlogSlugs } from "@/lib/sanity-data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    "",
    "/services",
    "/pricing",
    "/about",
    "/blog",
    "/faq",
    "/contact",
    "/assessment",
    "/privacy",
    "/terms",
  ];

  const blogSlugs = await getAllBlogSlugs();
  const blogRoutes = blogSlugs.map((slug) => `/blog/${slug}`);

  const routes = [...staticRoutes, ...blogRoutes];

  return routes.map((route) => ({
    url: `${siteConfig.siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.4,
  }));
}
