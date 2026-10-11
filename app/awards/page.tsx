import type { Metadata } from "next"
import SectionHead from "@/components/SectionHead"
import AwardsList from "@/components/AwardsList"
import { site } from "@/content/site"

export const metadata: Metadata = {
  title: "Awards & honours",
  description: "Scholarships and competition distinctions: University of Waterloo Global Scholarship, McMaster entrance and research awards, CMOQR, CCC and more.",
  alternates: { canonical: "/awards" },
}

export default function AwardsPage() {
  return (
    <div className="shell pt-6 md:pt-10">
      <SectionHead
        as="h1"
        kicker="Awards & honours"
        title="Recognition along the way."
        aside={
          <p className="rounded-full border border-line bg-card px-4 py-2 text-sm font-semibold">
            {site.program}, {site.school} · <span className="text-maroon">GPA {site.gpa}</span>
          </p>
        }
      />
      <AwardsList />
    </div>
  )
}
