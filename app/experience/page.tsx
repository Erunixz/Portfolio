import type { Metadata } from "next"
import SectionHead from "@/components/SectionHead"
import ExperienceTimeline from "@/components/home/ExperienceTimeline"

export const metadata: Metadata = {
  title: "Experience",
  description: "Erfan Zamani's experience: ML research at McMaster, software engineering at KITE Research Institute (UHN), GDG open source, education and activities.",
  alternates: { canonical: "/experience" },
}

export default function ExperiencePage() {
  return (
    <div className="shell pt-6 md:pt-10">
      <SectionHead as="h1" kicker="Experience" title="Where I've worked and learned." aside={<p className="max-w-xs text-sm text-mute">Most recent first. Scroll through it.</p>} />
      <ExperienceTimeline />
    </div>
  )
}
