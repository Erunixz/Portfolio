import Link from "next/link"
import { categoryLabel, type Diagram, type Project } from "@/content/projects"
import { curve, isExternal } from "@/lib/utils"
import { ArrowUpRight } from "./Icons"
import TechChips from "./TechChips"

function CoverArt({ diagram }: { diagram: Diagram }) {
  const byId = Object.fromEntries(diagram.nodes.map((n) => [n.id, n]))
  return (
    <svg viewBox={`0 0 1000 ${diagram.height}`} className="draw absolute inset-0 m-auto h-[78%] w-[86%]" aria-hidden>
      {diagram.edges.map((e, i) => (
        <path key={i} d={curve(byId[e.from], byId[e.to])} pathLength={1} className="stroke-draw" fill="none" stroke="var(--ink)" strokeOpacity="0.45" strokeWidth="3" style={{ transitionDelay: `${i * 90}ms` }} />
      ))}
      {diagram.nodes.map((n) => (
        <rect
          key={n.id}
          x={n.x - 80}
          y={n.y - 26}
          width={160}
          height={52}
          rx={12}
          fill={n.tone === "accent" ? "var(--maroon)" : "var(--card)"}
          stroke="var(--ink)"
          strokeOpacity={n.tone === "muted" ? 0.3 : 0.7}
          strokeWidth="3"
        />
      ))}
    </svg>
  )
}

export default function ProjectCard({ project: p }: { project: Project }) {
  const external = p.links.find((l) => isExternal(l.href))
  return (
    <article className="card card-hover glare group flex h-full flex-col overflow-hidden">
      <Link href={`/projects/${p.slug}`} className="relative block aspect-[16/10] overflow-hidden border-b border-line bg-paper-2" tabIndex={-1} aria-hidden>
        {p.images?.[0] ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={p.images[0].src}
            alt=""
            width={p.images[0].width}
            height={p.images[0].height}
            loading="lazy"
            className="absolute inset-0 size-full object-cover object-left-top transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="grid-paper absolute inset-0 transition-transform duration-700 group-hover:scale-105">
            <CoverArt diagram={p.diagram} />
          </div>
        )}
        {!p.images?.length && (
          <span className="absolute top-4 left-4 rounded-full border border-mute/20 bg-card/90 px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase backdrop-blur-md">
            {categoryLabel[p.category]}
          </span>
        )}
      </Link>

      <div className="flex flex-grow flex-col p-5 md:p-6">
        <p className="text-xs font-semibold text-maroon">{p.kind}</p>
        <h3 className="mt-1.5 text-xl leading-tight font-black tracking-tight">
          <Link href={`/projects/${p.slug}`} className="after:absolute after:inset-0 after:content-['']">
            {p.title}
          </Link>
        </h3>
        <p className="mt-3 line-clamp-3 flex-grow text-sm leading-relaxed font-medium text-mute">{p.oneLiner}</p>
        <TechChips items={p.stack} className="mt-5" />

        <div className="mt-6 flex items-center justify-between border-t border-mute/10 pt-4">
          <span className="flex items-center gap-3 text-xs font-bold tracking-[0.2em] text-ink uppercase">
            View details
            <span className="h-0.5 w-8 bg-ink transition-all duration-300 group-hover:w-12" aria-hidden />
          </span>
          {external && (
            <a
              href={external.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${p.title} on ${external.label}`}
              className="relative z-10 rounded-full border border-mute/20 p-2 text-mute transition-all duration-300 hover:border-ink hover:bg-ink hover:text-paper"
            >
              <ArrowUpRight />
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
