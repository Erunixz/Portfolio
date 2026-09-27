import type { MetadataRoute } from "next"
import { projects } from "@/content/projects"
import { site } from "@/content/site"

export const dynamic = "force-static"

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/experience",
    "/projects",
    "/awards",
    "/contact",
    ...projects.map((p) => `/projects/${p.slug}`),
  ]
  return paths.map((p) => ({ url: `${site.url}${p}` }))
}
