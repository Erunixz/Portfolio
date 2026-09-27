"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSyncExternalStore } from "react"
import { motion } from "motion/react"
import { site, tabs } from "@/content/site"
import { cx } from "@/lib/utils"
import { usePalette } from "./CommandPalette"
import { RequestResumeButton } from "./ResumeRequest"
import ThemeToggle from "./ThemeToggle"
import { GitHub, LinkedIn, Search } from "./Icons"

const noop = () => () => {}

function Tabs({ id, className }: { id: string; className?: string }) {
  const pathname = usePathname()
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`))

  return (
    <nav aria-label="Sections" className={className}>
      <ul className="flex items-center justify-between gap-0.5 sm:justify-start sm:gap-1">
        {tabs.map((t) => {
          const active = isActive(t.href)
          return (
            <li key={t.href} className="relative">
              <Link
                href={t.href}
                aria-current={active ? "page" : undefined}
                className={cx(
                  "relative z-10 block rounded-full px-2.5 py-1.5 text-[12px] font-semibold whitespace-nowrap transition-colors sm:px-3.5 sm:text-[13px]",
                  active ? "text-paper" : "text-mute hover:text-ink",
                )}
              >
                {t.label}
              </Link>
              {active && <motion.span layoutId={`tab-pill-${id}`} className="absolute inset-0 rounded-full bg-ink" transition={{ type: "spring", stiffness: 500, damping: 38 }} />}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default function SiteHeader() {
  const { open } = usePalette()
  const modKey = useSyncExternalStore(noop, () => (/Mac|iPhone|iPad/.test(navigator.platform) ? "⌘" : "Ctrl"), () => "Ctrl")

  return (
    <header className="pointer-events-none fixed inset-x-0 top-3 z-50 flex justify-center px-3 md:top-5">
      <div className="pointer-events-auto w-full max-w-6xl rounded-3xl border border-mute/20 bg-paper/85 shadow-lg backdrop-blur-md lg:rounded-full">
        <div className="flex items-center justify-between gap-3 py-2 pr-2 pl-5">
          <Link href="/" className="text-[15px] font-extrabold tracking-tight whitespace-nowrap" aria-label={`${site.name}, home`}>
            {site.name}
            <span className="text-maroon">.</span>
          </Link>

          <Tabs id="desktop" className="hidden lg:block" />

          <div className="flex items-center gap-0.5">
            <button type="button" onClick={open} aria-label="Search (command palette)" className="flex h-9 items-center gap-2 rounded-full px-2.5 text-sm text-mute transition-colors hover:text-ink">
              <Search className="size-4" />
              <kbd className="hidden font-mono text-[11px] sm:inline">{modKey} K</kbd>
            </button>
            <ThemeToggle />
            <a href={site.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="grid size-9 place-items-center rounded-full text-mute hover:text-ink">
              <GitHub className="size-[18px]" />
            </a>
            <a href={site.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="grid size-9 place-items-center rounded-full text-mute hover:text-ink">
              <LinkedIn className="size-[18px]" />
            </a>
            <RequestResumeButton className="btn btn-ink btn-sm ml-1 h-9 px-3.5 text-xs">Résumé</RequestResumeButton>
          </div>
        </div>

        <Tabs id="mobile" className="overflow-x-auto border-t border-mute/15 px-1.5 py-1.5 [scrollbar-width:none] lg:hidden [&::-webkit-scrollbar]:hidden" />
      </div>
    </header>
  )
}
