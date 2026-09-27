import type { Metadata } from "next"
import { awardCategories, awards, SHOW_AMOUNTS } from "@/content/awards"
import SectionHead from "@/components/SectionHead"
import { site } from "@/content/site"

export const metadata: Metadata = {
  title: "Awards & honours",
  description: "Scholarships and competition distinctions: University of Waterloo Global Scholarship, McMaster entrance and research awards, CMOQR, CCC and more.",
  alternates: { canonical: "/awards" },
}

const Trophy = ({ className = "size-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
    <path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4ZM7 6H4a3 3 0 0 0 3 4M17 6h3a3 3 0 0 1-3 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

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

      <nav aria-label="Award categories" className="mb-8 flex flex-wrap gap-2">
        {awardCategories.map((c) => (
          <a key={c.id} href={`#${c.id}`} className="rounded-full border border-line px-4 py-2 text-[13px] font-semibold text-ink-2 transition-colors hover:border-ink hover:text-ink">
            {c.title}
          </a>
        ))}
      </nav>

      <div className="space-y-12">
        {awardCategories.map((c) => {
          const items = awards.filter((a) => a.category === c.id)
          return (
            <section key={c.id} id={c.id} aria-labelledby={`${c.id}-title`} className="grid gap-6 lg:grid-cols-12">
              <div className="reveal lg:col-span-4">
                <div className="lg:sticky lg:top-32">
                  <h2 id={`${c.id}-title`} className="text-xl font-extrabold tracking-tight">
                    {c.title}
                  </h2>
                  <p className="mt-1 text-sm text-mute">{c.blurb}</p>
                </div>
              </div>
              <ul className="reveal card divide-y divide-line overflow-hidden lg:col-span-8">
                {items.map((a) => (
                  <li key={a.title} className="grid grid-cols-[auto_1fr] items-start gap-4 p-5 transition-colors hover:bg-paper-2/60 sm:grid-cols-[auto_1fr_auto]">
                    <span className="mt-0.5 grid size-8 place-items-center rounded-lg bg-maroon-soft text-maroon">
                      <Trophy className="size-4" />
                    </span>
                    <div>
                      <p className="leading-snug font-bold">{a.title}</p>
                      <p className="mt-0.5 text-sm text-mute">
                        {[a.issuer, a.detail].filter(Boolean).join(" · ")}
                      </p>
                    </div>
                    {SHOW_AMOUNTS && a.amount ? (
                      <span className="col-start-2 w-fit rounded-full bg-maroon-soft px-2.5 py-1 text-xs font-bold text-maroon sm:col-start-3">{a.amount}</span>
                    ) : (
                      a.year && <span className="col-start-2 text-xs font-semibold text-mute sm:col-start-3 sm:pt-1">{a.year}</span>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          )
        })}
      </div>
    </div>
  )
}
