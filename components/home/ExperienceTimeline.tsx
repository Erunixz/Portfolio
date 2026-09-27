"use client"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { motion, useMotionValue, useSpring } from "motion/react"
import { experience, type Experience } from "@/content/experience"
import { cx } from "@/lib/utils"
import { ArrowRight } from "../Icons"

export default function ExperienceTimeline() {
  const listRef = useRef<HTMLOListElement>(null)
  const [active, setActive] = useState(0)
  const progress = useMotionValue(0)
  const fill = useSpring(progress, { stiffness: 140, damping: 26, mass: 0.3 })

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const list = listRef.current
      if (!list) return
      const items = [...list.querySelectorAll<HTMLElement>("[data-exp]")]
      const line = window.innerHeight * 0.45
      const atBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4
      let idx = 0
      items.forEach((el, i) => el.getBoundingClientRect().top < line && (idx = i))
      if (atBottom) idx = items.length - 1
      setActive(idx)
      const r = list.getBoundingClientRect()
      progress.set(atBottom ? 1 : Math.min(1, Math.max(0, (line - r.top) / r.height)))
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [progress])

  return (
    <div className="relative">

      <span aria-hidden className="absolute top-2 bottom-2 left-[11px] w-0.5 rounded-full bg-line lg:left-1/2 lg:-translate-x-1/2" />
      <motion.span aria-hidden className="absolute top-2 bottom-2 left-[11px] w-0.5 origin-top rounded-full bg-maroon lg:left-1/2 lg:-translate-x-1/2" style={{ scaleY: fill }} />

      <ol ref={listRef} className="relative space-y-6 lg:space-y-0">
        {experience.map((e, i) => {
          const isActive = i === active
          const passed = i <= active
          const left = i % 2 === 0
          return (
            <li
              key={e.id}
              data-exp

              className={cx("relative pl-12 lg:grid lg:grid-cols-[1fr_72px_1fr] lg:pl-0", i > 0 && "lg:-mt-32")}
            >
              <span
                aria-hidden
                className={cx(
                  "absolute top-6 left-0 z-10 grid size-6 place-items-center rounded-full border-2 bg-paper transition-colors duration-300 lg:top-8 lg:left-1/2 lg:-translate-x-1/2",
                  passed ? "border-maroon" : "border-line-strong",
                )}
              >
                <span className={cx("size-2 rounded-full transition-all duration-300", isActive ? "scale-100 bg-maroon" : passed ? "scale-75 bg-maroon/60" : "scale-50 bg-line-strong")} />
              </span>

              <span
                aria-hidden
                className={cx(
                  "absolute top-[43px] hidden h-0.5 w-6 transition-colors duration-300 lg:block",
                  left ? "right-1/2 mr-3" : "left-1/2 ml-3",
                  passed ? "bg-maroon/60" : "bg-line",
                )}
              />

              <article className={cx("lg:row-start-1", left ? "lg:col-start-1" : "lg:col-start-3")}>
                <Card entry={e} active={isActive} />
              </article>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

function Card({ entry: e, active }: { entry: Experience; active: boolean }) {
  return (
    <div
      className={cx(
        "card p-5 transition-all duration-500 md:p-6",
        active ? "border-ink/50 shadow-[0_20px_45px_-25px_rgb(0_0_0/0.35)] lg:opacity-100" : "lg:opacity-55",
      )}
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className={cx("rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase transition-colors", active ? "bg-ink text-paper" : "bg-paper-2 text-mute")}>{e.phase}</span>
        <span className="rounded-full border border-line px-2.5 py-1 text-[10px] font-bold tracking-wider text-mute uppercase">{e.kind}</span>
        {e.period && <span className="text-xs text-mute">{e.period}</span>}
      </div>
      <h3 className="mt-3 text-lg leading-snug font-extrabold tracking-tight">{e.title}</h3>
      <p className="mt-0.5 text-sm font-semibold text-maroon">
        {e.org}
        {e.location && <span className="font-normal text-mute"> · {e.location}</span>}
      </p>
      <p className="mt-2.5 text-sm leading-relaxed text-mute">{e.summary}</p>
      <ul className="mt-4 space-y-2">
        {e.points.map((p) => (
          <li key={p} className="flex gap-2.5 text-sm leading-relaxed text-ink-2">
            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-maroon" aria-hidden />
            {p}
          </li>
        ))}
      </ul>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        {e.tags.map((t) => (
          <span key={t} className="rounded-md border border-line bg-paper px-2 py-1 text-[11px] font-semibold tracking-wide text-ink-2 uppercase">
            {t}
          </span>
        ))}
        {e.href && (
          <Link href={e.href} className="ml-auto inline-flex items-center gap-1.5 text-sm font-bold text-ink hover:text-maroon">
            Learn more <ArrowRight />
          </Link>
        )}
      </div>
    </div>
  )
}
