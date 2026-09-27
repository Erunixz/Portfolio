"use client"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { shipLog } from "@/content/log"

export default function ShipLogDock() {
  const reduce = useReducedMotion()
  const [i, setI] = useState(0)
  const [open, setOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (reduce || open) return
    const t = setInterval(() => setI((n) => (n + 1) % shipLog.length), 5200)
    return () => clearInterval(t)
  }, [reduce, open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    const onDown = (e: MouseEvent) => !panelRef.current?.contains(e.target as Node) && setOpen(false)
    window.addEventListener("keydown", onKey)
    window.addEventListener("mousedown", onDown)
    return () => {
      window.removeEventListener("keydown", onKey)
      window.removeEventListener("mousedown", onDown)
    }
  }, [open])

  if (hidden) return null
  const entry = shipLog[i]

  return (
    <div ref={panelRef} className="no-print fixed bottom-5 left-5 z-30 hidden font-mono text-[11px] lg:block">
      <AnimatePresence>
        {open && (
          <motion.div
            id="shiplog-panel"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.18 }}
            className="mb-2 w-[380px] border border-night-line bg-night p-4 text-snow shadow-2xl"
          >
            <div className="mb-3 flex items-center justify-between text-snow/50">
              <span>MILESTONES · curated, not live</span>
              <button type="button" onClick={() => setHidden(true)} className="hover:text-snow">
                hide dock
              </button>
            </div>
            <ol className="space-y-2">
              {shipLog.map((e) => (
                <li key={e.text}>
                  <Link href={e.href ?? "/"} onClick={() => setOpen(false)} className="group grid grid-cols-[92px_1fr] gap-2 hover:text-snow">
                    <span className="truncate text-[#e2a3c0]">{e.scope}</span>
                    <span className="text-snow/75 group-hover:text-snow">{e.text}</span>
                  </Link>
                </li>
              ))}
            </ol>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="shiplog-panel"
        className="flex h-8 max-w-[380px] items-center gap-2.5 border border-line bg-card/95 pr-3 pl-2.5 text-ink-2 shadow-sm backdrop-blur hover:border-ink"
      >
        <span className="pulse-dot size-1.5 rounded-full bg-maroon" aria-hidden />
        <span className="text-mute">log</span>
        <span className="relative block h-4 w-[300px] overflow-hidden text-left">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={entry.text}
              initial={{ y: 14, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -14, opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="block truncate"
            >
              <span className="text-maroon">{entry.scope}</span> {entry.text}
            </motion.span>
          </AnimatePresence>
        </span>
      </button>
    </div>
  )
}
