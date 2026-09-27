"use client"
import { createContext, useContext, useEffect, useId, useMemo, useRef, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { site } from "@/content/site"
import { cx } from "@/lib/utils"

const Ctx = createContext<{ open: () => void }>({ open: () => {} })
export const useResumeRequest = () => useContext(Ctx)

export function ResumeRequestProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setOpen] = useState(false)
  const value = useMemo(() => ({ open: () => setOpen(true) }), [])
  return (
    <Ctx.Provider value={value}>
      {children}
      <AnimatePresence>{isOpen && <Dialog onClose={() => setOpen(false)} />}</AnimatePresence>
    </Ctx.Provider>
  )
}

export function RequestResumeButton({ className, children = "Request résumé" }: { className?: string; children?: React.ReactNode }) {
  const { open } = useResumeRequest()
  return (
    <button type="button" onClick={open} className={className}>
      {children}
    </button>
  )
}

type State = { kind: "idle" } | { kind: "sending" } | { kind: "sent"; attached: boolean } | { kind: "error"; message: string }

function Dialog({ onClose }: { onClose: () => void }) {
  const titleId = useId()
  const panelRef = useRef<HTMLDivElement>(null)
  const [state, setState] = useState<State>({ kind: "idle" })

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null
    const overflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    panelRef.current?.querySelector<HTMLElement>("input")?.focus()
    return () => {
      document.body.style.overflow = overflow
      previous?.focus?.()
    }
  }, [])

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") return onClose()
    if (e.key !== "Tab") return
    const els = panelRef.current?.querySelectorAll<HTMLElement>("button, input, textarea, a[href]")
    if (!els?.length) return
    const first = els[0]
    const last = els[els.length - 1]
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setState({ kind: "sending" })
    const data = Object.fromEntries(new FormData(e.currentTarget))
    try {
      const res = await fetch("/api/resume-request", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) })
      const json = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(json.error ?? `Something went wrong. Email me at ${site.email}.`)
      setState({ kind: "sent", attached: json.attached !== false })
    } catch (err) {
      setState({ kind: "error", message: err instanceof Error ? err.message : "Something went wrong." })
    }
  }

  return (
    <motion.div
      className="fixed inset-0 z-[95] flex items-end justify-center bg-black/40 p-4 backdrop-blur-sm sm:items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onKeyDown={onKeyDown}
        className="relative w-full max-w-md rounded-2xl border border-line bg-card p-6 shadow-2xl sm:p-8"
        initial={{ y: 24, opacity: 0, scale: 0.97 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 24, opacity: 0, scale: 0.97 }}
        transition={{ type: "spring", stiffness: 380, damping: 32 }}
      >
        <button type="button" onClick={onClose} aria-label="Close" className="absolute top-4 right-4 grid size-9 place-items-center rounded-full text-mute hover:bg-paper-2 hover:text-ink">
          <svg viewBox="0 0 16 16" className="size-4" aria-hidden>
            <path d="M3 3l10 10M13 3 3 13" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </button>

        {state.kind === "sent" ? (
          <div className="py-4 text-center">
            <div className="mx-auto grid size-14 place-items-center rounded-full bg-maroon-soft text-2xl text-maroon" aria-hidden>
              ✓
            </div>
            <h2 id={titleId} className="mt-5 text-2xl font-extrabold tracking-tight">
              Check your inbox
            </h2>
            <p className="mt-2 text-mute">
              {state.attached ? "My résumé is on its way to you, and I've been notified too." : "Request received. I'll send my résumé over personally."}
            </p>
            <button type="button" onClick={onClose} className="btn btn-ink mt-6 w-full">
              Done
            </button>
          </div>
        ) : (
          <>
            <p className="label">Résumé</p>
            <h2 id={titleId} className="mt-2 text-2xl font-extrabold tracking-tight">
              Request my résumé
            </h2>
            <p className="mt-2 text-sm text-mute">Leave your details and it&apos;ll arrive in your inbox automatically.</p>

            <form onSubmit={submit} className="mt-6 space-y-3">
              <Field label="Name" name="name" autoComplete="name" required />
              <Field label="Email" name="email" type="email" autoComplete="email" required />
              <Field label="Company / team (optional)" name="company" autoComplete="organization" />
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold text-ink-2">Note (optional)</span>
                <textarea name="note" rows={3} maxLength={1500} className="input resize-none" placeholder="What role or project is this for?" />
              </label>

              <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

              <div aria-live="polite" className={cx("text-sm", state.kind === "error" ? "text-maroon" : "sr-only")}>
                {state.kind === "error" ? state.message : state.kind === "sending" ? "Sending…" : ""}
              </div>

              <button type="submit" disabled={state.kind === "sending"} className="btn btn-ink w-full disabled:opacity-60">
                {state.kind === "sending" ? "Sending…" : "Email me the résumé"}
              </button>
            </form>
          </>
        )}
      </motion.div>
    </motion.div>
  )
}

function Field({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold text-ink-2">{label}</span>
      <input className="input" maxLength={200} {...props} />
    </label>
  )
}
