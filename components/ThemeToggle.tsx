"use client"
import { useSyncExternalStore } from "react"

const subscribe = (cb: () => void) => {
  const mo = new MutationObserver(cb)
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })
  return () => mo.disconnect()
}
const isDark = () => document.documentElement.classList.contains("dark")

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const dark = useSyncExternalStore(subscribe, isDark, () => false)

  const toggle = () => {
    const next = !isDark()
    document.documentElement.classList.toggle("dark", next)
    try {
      localStorage.setItem("theme", next ? "dark" : "light")
    } catch {}
  }

  return (
    <button type="button" onClick={toggle} aria-label={dark ? "Switch to light theme" : "Switch to dark theme"} className={`grid size-9 place-items-center rounded-full text-mute transition-colors hover:text-ink ${className}`}>
      {dark ? (
        <svg className="size-5" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M12 21a9 9 0 0 1-.5-17.986V3c-.354.966-.5 1.911-.5 3a9 9 0 0 0 9 9c.239 0 .254.018.488 0A9.004 9.004 0 0 1 12 21Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : (
        <svg className="size-5" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M12 5V3m0 18v-2M7.05 7.05 5.636 5.636m12.728 12.728L16.95 16.95M5 12H3m18 0h-2M7.05 16.95l-1.414 1.414M18.364 5.636 16.95 7.05M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      )}
    </button>
  )
}
