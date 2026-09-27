import { stack } from "@/content/stack"
import { cx } from "@/lib/utils"

const icons: Record<string, string> = {
  ...Object.fromEntries(stack.flatMap((c) => c.items.filter((i) => i.icon).map((i) => [i.name, i.icon!]))),
  "OpenAI API": "openai",
  ElevenLabs: "elevenlabs",
  "Socket.IO": "socketdotio",
  Maps: "googlemaps",
  Gemini: "googlegemini",
}

export default function TechChips({ items, className, limit }: { items: string[]; className?: string; limit?: number }) {
  const shown = limit ? items.slice(0, limit) : items
  const rest = items.length - shown.length
  return (
    <ul className={cx("flex flex-wrap gap-1.5", className)} aria-label="Tech stack">
      {shown.map((t) => (
        <li key={t} className="inline-flex items-center gap-1.5 rounded-md border border-line bg-paper px-2 py-1 text-[11px] font-semibold text-ink-2">
          {icons[t] ? (
            <span aria-hidden className="icon-mask size-3.5 text-ink" style={{ "--icon": `url(/icons/${icons[t]}.svg)` } as React.CSSProperties} />
          ) : (
            <span aria-hidden className="size-1.5 rounded-full bg-maroon" />
          )}
          {t}
        </li>
      ))}
      {rest > 0 && <li className="inline-flex items-center rounded-md border border-line px-2 py-1 text-[11px] font-semibold text-mute">+{rest}</li>}
    </ul>
  )
}
