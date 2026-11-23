import type { Metadata } from "next"
import SectionHead from "@/components/SectionHead"
import ProjectsGrid from "@/components/ProjectsGrid"

export const metadata: Metadata = {
  title: "Projects",
  description: "Projects by Erfan Zamani: Orbitour, thru.io, AgentGuard and SweepMate.",
  alternates: { canonical: "/projects" },
}

export default function ProjectsPage() {
  return (
    <div className="shell pt-6 md:pt-10">
      <SectionHead as="h1" title="Projects" />
      <ProjectsGrid />
    </div>
  )
}
