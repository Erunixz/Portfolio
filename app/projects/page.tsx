import type { Metadata } from "next"
import SectionHead from "@/components/SectionHead"
import ProjectsGrid from "@/components/ProjectsGrid"

export const metadata: Metadata = {
  title: "Projects",
  description: "Projects by Erfan Zamani: Orbitour and thru.io.",
  alternates: { canonical: "/projects" },
}

export default function ProjectsPage() {
  return (
    <div className="shell pt-6 md:pt-10">
      <SectionHead as="h1" kicker="Portfolio" title="Selected works." />
      <ProjectsGrid />
    </div>
  )
}
