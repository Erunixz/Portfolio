import { projects } from "@/content/projects"
import ProjectCard from "./ProjectCard"

export default function ProjectsGrid() {
  return (
    <ul className="grid gap-6 md:grid-cols-2">
      {projects.map((p, i) => (
        <li key={p.slug} className="reveal" style={{ transitionDelay: `${i * 100}ms` }}>
          <ProjectCard project={p} />
        </li>
      ))}
    </ul>
  )
}
