import { stack } from "@/content/stack"

export default function TechStack() {
  return (
    <div className="flex flex-col gap-10">
      {stack.map((cat, ci) => (
        <div key={cat.title} className="flex flex-col items-start gap-8 md:flex-row md:gap-16">
          <div className="reveal md:w-1/3" style={{ transitionDelay: `${ci * 80}ms` }}>
            <h3 className="text-lg font-extrabold tracking-tight">{cat.title}</h3>
            <p className="mt-2 text-sm font-medium text-mute">{cat.description}</p>
          </div>
          <ul className="grid w-full grid-cols-3 gap-3 sm:grid-cols-6 md:w-2/3">
            {cat.items.map((t, i) => (
              <li key={t.name} className="reveal" style={{ transitionDelay: `${ci * 80 + i * 50}ms` }}>
                <div
                  className="group flex h-full flex-col items-center justify-center rounded-2xl border border-mute/10 bg-paper-2/60 p-4 transition-all duration-300 hover:-translate-y-2 hover:border-ink/40 hover:bg-card"
                  style={{ "--brand": t.color ?? "var(--ink)" } as React.CSSProperties}
                >
                  {t.icon ? (
                    <span
                      aria-hidden
                      className="icon-mask mb-3 size-8 text-ink transition-colors duration-300 group-hover:text-[var(--brand)]"
                      style={{ "--icon": `url(/icons/${t.icon}.svg)` } as React.CSSProperties}
                    />
                  ) : (
                    <span aria-hidden className="mb-3 grid size-8 place-items-center rounded-lg bg-ink text-sm font-black text-paper">
                      {t.name.charAt(0)}
                    </span>
                  )}
                  <span className="text-center text-xs font-bold">{t.name}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
