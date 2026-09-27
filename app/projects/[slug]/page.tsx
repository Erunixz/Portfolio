import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { categoryLabel, getProject, projects } from "@/content/projects"
import ArchDiagram from "@/components/ArchDiagram"
import KindDot from "@/components/KindDot"
import TechChips from "@/components/TechChips"
import Gallery from "@/components/Gallery"
import { ArrowRight, ArrowUpRight } from "@/components/Icons"
import { isExternal } from "@/lib/utils"

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false
export const generateStaticParams = () => projects.map((p) => ({ slug: p.slug }))

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getProject((await params).slug)
  if (!p) return {}
  return { title: p.title, description: p.oneLiner, alternates: { canonical: `/projects/${p.slug}` } }
}

export default async function ProjectPage({ params }: Props) {
  const p = getProject((await params).slug)
  if (!p) notFound()
  const next = projects[(projects.indexOf(p) + 1) % projects.length]

  const spec = [
    { k: "Role", v: p.role },
    { k: "Type", v: p.kind },
    { k: "Stack", v: <TechChips items={p.stack} /> },
    { k: "Highlight", v: p.highlight },
  ]

  return (
    <article>
      <header className="shell pt-4 md:pt-8">
        <nav aria-label="Breadcrumb" className="text-sm font-medium text-mute">
          <Link href="/projects" className="hover:text-ink">
            Projects
          </Link>{" "}
          / <span className="text-ink">{p.title}</span>
        </nav>
        <div className="mt-8 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-mute/20 bg-card px-3 py-1.5 text-xs font-bold tracking-widest uppercase">
              <KindDot category={p.category} /> {categoryLabel[p.category]}
            </span>
            <h1 className="rise mt-4 text-4xl leading-[0.95] font-black tracking-tighter md:text-5xl lg:text-6xl">{p.title}</h1>
            <p className="rise mt-5 max-w-2xl text-lg leading-relaxed font-medium text-mute" style={{ animationDelay: "100ms" }}>
              {p.oneLiner}
            </p>
            {p.links.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-3">
                {p.links.map((l, j) =>
                  isExternal(l.href) ? (
                    <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className={`btn ${j === 0 ? "btn-ink" : "btn-ghost"}`}>
                      {l.label} <ArrowUpRight />
                    </a>
                  ) : (
                    <Link key={l.href} href={l.href} className={`btn ${j === 0 ? "btn-ink" : "btn-ghost"}`}>
                      {l.label} <ArrowRight />
                    </Link>
                  ),
                )}
              </div>
            )}
          </div>
          <dl className="card self-end overflow-hidden text-sm lg:col-span-5">
            {spec.map((s) => (
              <div key={s.k} className="grid grid-cols-[96px_1fr] border-b border-line last:border-b-0">
                <dt className="px-4 py-3.5 text-xs font-bold tracking-widest text-mute uppercase">{s.k}</dt>
                <dd className="min-w-0 px-4 py-3.5 text-ink-2">{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      <div className="shell mt-14 md:mt-20">
        <div className="reveal">
          {p.images?.length ? <Gallery images={p.images} /> : null}
        </div>
      </div>

      <div className="shell mt-20 space-y-20 md:mt-28 md:space-y-28">
        <Block title="The problem">
          <p className="text-lg leading-relaxed">{p.problem}</p>
        </Block>

        <Block title="What I built">
          <p className="text-lg leading-relaxed">{p.built}</p>
        </Block>

        <Block title="How it's built">
          <ArchDiagram diagram={p.diagram} id={p.slug} />
          <ul className="mt-10 grid gap-x-10 gap-y-4 md:grid-cols-2">
            {p.how.map((h) => (
              <li key={h} className="reveal flex gap-3 border-t border-line pt-4 text-ink-2">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-maroon" aria-hidden />
                {h}
              </li>
            ))}
          </ul>
          {p.decisions.length > 0 && (
            <div className="mt-14">
              <p className="mb-4 text-xs font-bold tracking-widest text-mute uppercase">Decisions</p>
              <div className="grid gap-4 md:grid-cols-2">
                {p.decisions.map((d) => (
                  <div key={d.title} className="reveal card card-hover p-6">
                    <p className="font-bold">{d.title}</p>
                    <p className="mt-2 text-ink-2">{d.body}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Block>

        <Block title="What happened">
          <ul className="space-y-3">
            {p.outcome.map((o) => (
              <li key={o} className="flex items-start gap-3 text-lg leading-snug">
                <span className="mt-2.5 size-2 shrink-0 rounded-full bg-maroon" aria-hidden />
                {o}
              </li>
            ))}
          </ul>
        </Block>
      </div>

      <div className="shell mt-24 md:mt-32">
        <Link href={`/projects/${next.slug}`} className="group flex items-end justify-between gap-6 border-t border-ink pt-6">
          <span>
            <span className="text-xs font-bold tracking-widest text-mute uppercase">Next project</span>
            <span className="mt-2 block text-3xl font-black tracking-tighter transition-colors group-hover:text-maroon md:text-4xl">{next.title}</span>
          </span>
          <ArrowRight className="mb-3 size-8 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  )
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="grid gap-6 lg:grid-cols-12">
      <h2 className="reveal text-sm font-bold tracking-[0.2em] text-mute uppercase lg:col-span-3 lg:pt-2">{title}</h2>
      <div className="reveal lg:col-span-9">{children}</div>
    </section>
  )
}
