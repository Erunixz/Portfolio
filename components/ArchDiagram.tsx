import type { Diagram, DiagramNode } from "@/content/projects"
import { cx } from "@/lib/utils"

const BW = 176
const BH = 58

function edgePath(a: DiagramNode, b: DiagramNode) {
  const dx = b.x - a.x
  const dy = b.y - a.y
  if (dx < -BW / 2) {
    const y1 = a.y + BH / 2
    const y2 = b.y + BH / 2
    const low = Math.max(y1, y2) + 60
    return { d: `M${a.x},${y1} C${a.x},${low} ${b.x},${low} ${b.x},${y2}`, mid: { x: (a.x + b.x) / 2, y: low - 16 } }
  }
  if (Math.abs(dx) < BW) {
    const s = Math.sign(dy) || 1
    const y1 = a.y + (s * BH) / 2
    const y2 = b.y - (s * BH) / 2
    return { d: `M${a.x},${y1} C${a.x},${(y1 + y2) / 2} ${b.x},${(y1 + y2) / 2} ${b.x},${y2}`, mid: { x: (a.x + b.x) / 2, y: (y1 + y2) / 2 } }
  }
  const x1 = a.x + BW / 2
  const x2 = b.x - BW / 2
  const c = (x2 - x1) * 0.5
  return { d: `M${x1},${a.y} C${x1 + c},${a.y} ${x2 - c},${b.y} ${x2},${b.y}`, mid: { x: (x1 + x2) / 2, y: (a.y + b.y) / 2 } }
}

export default function ArchDiagram({ diagram, id, dark = false }: { diagram: Diagram; id: string; dark?: boolean }) {
  const byId = Object.fromEntries(diagram.nodes.map((n) => [n.id, n]))
  const ink = dark ? "#f5f2ec" : "var(--ink)"
  const bg = dark ? "#1a1a1a" : "var(--card)"
  const halo = dark ? "#111111" : "var(--paper)"

  return (
    <figure className="m-0">

      <div className={cx("corner-marks hidden border sm:block", dark ? "grid-night border-night-line" : "grid-paper border-line bg-card/40")}>
        <svg viewBox={`0 0 1000 ${diagram.height}`} className="draw block h-auto w-full" role="img" aria-label={diagram.caption}>
          <defs>
            <marker id={`arrow-${id}`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0,1 L9,5 L0,9" fill="none" stroke={ink} strokeWidth="1.2" />
            </marker>
          </defs>
          {diagram.edges.map((e, i) => {
            const { d, mid } = edgePath(byId[e.from], byId[e.to])
            return (
              <g key={i}>
                <path id={`${id}-e${i}`} d={d} pathLength={1} fill="none" stroke={ink} strokeOpacity={0.55} className="stroke-draw" markerEnd={`url(#arrow-${id})`} style={{ transitionDelay: `${200 + i * 120}ms` }} />
                <circle className="packet" r="2.6" fill="var(--maroon)">
                  <animateMotion dur="2.8s" begin={`${i * 0.4}s`} repeatCount="indefinite">
                    <mpath href={`#${id}-e${i}`} />
                  </animateMotion>
                </circle>
                {e.label && (
                  <text x={mid.x} y={mid.y - 6} textAnchor="middle" fontSize="12" fontFamily="var(--font-mono)" fill={dark ? "#9fb0f0" : "var(--cobalt)"} stroke={halo} strokeWidth="5" paintOrder="stroke">
                    {e.label}
                  </text>
                )}
              </g>
            )
          })}
          {diagram.nodes.map((n) => {
            const accent = n.tone === "accent"
            return (
              <g key={n.id} transform={`translate(${n.x - BW / 2} ${n.y - BH / 2})`}>
                <rect width={BW} height={BH} fill={accent ? (dark ? "#3a0b22" : "var(--maroon-soft)") : bg} stroke={accent ? "var(--maroon)" : ink} strokeOpacity={n.tone === "muted" ? 0.35 : 0.9} strokeDasharray={n.tone === "muted" ? "4 3" : undefined} />
                <text x={BW / 2} y={n.sub ? 25 : 34} textAnchor="middle" fontSize="15" fontWeight="600" fill={ink}>
                  {n.label}
                </text>
                {n.sub && (
                  <text x={BW / 2} y={43} textAnchor="middle" fontSize="11" fontFamily="var(--font-mono)" fill={dark ? "#a8a29a" : "var(--mute)"}>
                    {n.sub}
                  </text>
                )}
              </g>
            )
          })}
        </svg>
      </div>

      <ol className={cx("space-y-2 sm:hidden", dark && "text-snow")}>
        {diagram.nodes.map((n, i) => (
          <li key={n.id} className="flex items-center gap-3">
            <span className="w-5 font-mono text-[10px] opacity-50">{String(i + 1).padStart(2, "0")}</span>
            <span className={cx("flex-1 border px-3 py-2", n.tone === "accent" ? "border-maroon" : dark ? "border-night-line" : "border-line-strong", n.tone === "muted" && "border-dashed")}>
              <span className="block text-sm font-semibold">{n.label}</span>
              {n.sub && <span className="block font-mono text-[11px] opacity-60">{n.sub}</span>}
            </span>
          </li>
        ))}
      </ol>

      <figcaption className={cx("mt-3 font-mono text-[11px]", dark ? "text-snow/55" : "text-mute")}>{diagram.caption}</figcaption>
    </figure>
  )
}
