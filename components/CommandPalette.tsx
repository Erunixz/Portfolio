"use client"
import { createContext, useCallback, useContext, useEffect, useId, useMemo, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { AnimatePresence, motion } from "motion/react"
import { projects } from "@/content/projects"
import { site } from "@/content/site"
import { Search } from "./Icons"
import { useResumeRequest } from "./ResumeRequest"

type Action = { type: "route"; href: string } | { type: "external"; href: string } | { type: "copy"; value: string } | { type: "resume" }
type Item = { id: string; group: string; label: string; hint: string; keywords: string; action: Action }

const items: Item[] = [
  ...projects.map<Item>((p) => ({
    id: `p-${p.slug}`,
    group: "Projects",
    label: p.title,
    hint: p.kind,
    keywords: `${p.oneLiner} ${p.stack.join(" ")} ${p.kind}`,
    action: { type: "route", href: `/projects/${p.slug}` },
  })),
  { id: "home", group: "Tabs", label: "Home", hint: "/", keywords: "start terminal shell about", action: { type: "route", href: "/" } },
  { id: "experience", group: "Tabs", label: "Experience", hint: "/experience", keywords: "experience jobs roles work kite uhn mcmaster gdg education linkedin", action: { type: "route", href: "/experience" } },
  { id: "projects", group: "Tabs", label: "Projects", hint: "/projects", keywords: "projects work portfolio", action: { type: "route", href: "/projects" } },
  { id: "awards", group: "Tabs", label: "Awards & honours", hint: "/awards", keywords: "awards honours scholarships competitions math ccc cmoqr", action: { type: "route", href: "/awards" } },
  { id: "contact", group: "Tabs", label: "Contact", hint: "/contact", keywords: "contact message hire email", action: { type: "route", href: "/contact" } },
  { id: "skills", group: "Tabs", label: "Tech stack", hint: "/#stack", keywords: "skills stack tools languages pytorch react python", action: { type: "route", href: "/#stack" } },
  { id: "resume", group: "Recruiters", label: "Request résumé by email", hint: "sent automatically", keywords: "cv resume hire recruiter", action: { type: "resume" } },
  { id: "email", group: "Contact", label: "Copy email address", hint: site.email, keywords: "contact email mail reach hire", action: { type: "copy", value: site.email } },
  { id: "github", group: "Contact", label: "GitHub", hint: `@${site.githubHandle}`, keywords: "code repos open source", action: { type: "external", href: site.github } },
  { id: "linkedin", group: "Contact", label: "LinkedIn", hint: "in/erfan-zamani1", keywords: "profile connect", action: { type: "external", href: site.linkedin } },
]

function score(item: Item, q: string) {
  if (!q) return 1
  const label = item.label.toLowerCase()
  if (label.startsWith(q)) return 3
  if (label.includes(q)) return 2
  return `${item.keywords} ${item.hint} ${item.group}`.toLowerCase().includes(q) ? 1 : 0
}

const PaletteContext = createContext<{ open: () => void }>({ open: () => {} })
export const usePalette = () => useContext(PaletteContext)

export function PaletteProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setOpen] = useState(false)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        setOpen((o) => !o)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  const value = useMemo(() => ({ open: () => setOpen(true) }), [])
  return (
    <PaletteContext.Provider value={value}>
      {children}
      <AnimatePresence>{isOpen && <Palette onClose={() => setOpen(false)} />}</AnimatePresence>
    </PaletteContext.Provider>
  )
}

function Palette({ onClose }: { onClose: () => void }) {
  const router = useRouter()
  const resume = useResumeRequest()
  const listId = useId()
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const [query, setQuery] = useState("")
  const [active, setActive] = useState(0)
  const [copied, setCopied] = useState(false)

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    return items
      .map((item, i) => ({ item, s: score(item, q), i }))
      .filter((r) => r.s > 0)
      .sort((a, b) => b.s - a.s || a.i - b.i)
      .map((r) => r.item)
  }, [query])

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null
    const overflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    inputRef.current?.focus()
    return () => {
      document.body.style.overflow = overflow
      previous?.focus?.()
    }
  }, [])

  useEffect(() => {
    listRef.current?.querySelector(`[data-index="${active}"]`)?.scrollIntoView({ block: "nearest" })
  }, [active])

  const run = useCallback(
    async (item: Item) => {
      const a = item.action
      if (a.type === "copy") {
        try {
          await navigator.clipboard.writeText(a.value)
          setCopied(true)
          setTimeout(onClose, 700)
        } catch {
          window.location.href = `mailto:${a.value}`
        }
        return
      }
      onClose()
      if (a.type === "resume") resume.open()
      else if (a.type === "route") router.push(a.href)
      else window.open(a.href, "_blank", "noopener,noreferrer")
    },
    [onClose, router, resume],
  )

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") onClose()
    else if (e.key === "ArrowDown") {
      e.preventDefault()
      setActive((i) => Math.min(i + 1, results.length - 1))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setActive((i) => Math.max(i - 1, 0))
    } else if (e.key === "Enter" && results[active]) {
      e.preventDefault()
      run(results[active])
    } else if (e.key === "Tab") e.preventDefault()
  }

  return (
    <motion.div
      className="fixed inset-0 z-[90] flex items-start justify-center bg-ink/25 px-4 pt-[12vh] backdrop-blur-[2px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        className="w-full max-w-xl overflow-hidden rounded-2xl border border-line-strong bg-card shadow-[0_24px_60px_-20px_rgb(20_19_18/0.35)]"
        initial={{ y: -8, scale: 0.98 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: -8, scale: 0.98 }}
        transition={{ type: "spring", stiffness: 500, damping: 36 }}
        onKeyDown={onKeyDown}
      >
        <div className="flex items-center gap-3 border-b border-line px-4">
          <Search className="size-4 text-mute" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setActive(0)
            }}
            placeholder="Jump to a project, page or link…"
            className="h-14 flex-1 bg-transparent text-base outline-none placeholder:text-mute"
            role="combobox"
            aria-expanded="true"
            aria-controls={listId}
            aria-activedescendant={results[active] ? `cmd-${results[active].id}` : undefined}
            aria-autocomplete="list"
          />
          <kbd className="label rounded border border-line px-1.5 py-0.5">esc</kbd>
        </div>
        <ul ref={listRef} id={listId} role="listbox" aria-label="Results" className="max-h-[52vh] overflow-y-auto p-2">
          {results.length === 0 && <li className="px-3 py-6 text-center text-sm text-mute">No matches. Try “orbitour” or “github”.</li>}
          {results.map((item, i) => {
            const header = item.group !== results[i - 1]?.group
            return (
              <li key={item.id} role="presentation">
                {header && <div className="label px-3 pt-3 pb-1">{item.group}</div>}
                <div
                  id={`cmd-${item.id}`}
                  role="option"
                  aria-selected={i === active}
                  data-index={i}
                  onMouseMove={() => setActive(i)}
                  onClick={() => run(item)}
                  className={`flex cursor-pointer items-center justify-between gap-4 px-3 py-2.5 text-sm ${i === active ? "bg-ink text-paper" : ""}`}
                >
                  <span className="font-medium">{item.id === "email" && copied ? "Copied ✓" : item.label}</span>
                  <span className={`truncate font-mono text-xs ${i === active ? "text-paper/70" : "text-mute"}`}>{item.hint}</span>
                </div>
              </li>
            )
          })}
        </ul>
        <div className="flex gap-4 border-t border-line px-4 py-2 font-mono text-[11px] text-mute">
          <span>↑↓ move</span>
          <span>↵ open</span>
          <span className="ml-auto">⌘K / Ctrl K anywhere</span>
        </div>
      </motion.div>
    </motion.div>
  )
}
