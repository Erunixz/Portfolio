"use client"
import { useEffect } from "react"
import { MotionConfig } from "motion/react"
import { PaletteProvider } from "./CommandPalette"
import { ResumeRequestProvider } from "./ResumeRequest"

const REVEAL = ".reveal, .reveal-left, .reveal-right, .draw"

function useRevealObserver() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("in")
            io.unobserve(e.target)
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.1 },
    )
    const scan = (root: ParentNode) => root.querySelectorAll(`:is(${REVEAL}):not(.in)`).forEach((el) => io.observe(el))

    scan(document)
    const mo = new MutationObserver((muts) => {
      for (const m of muts) m.addedNodes.forEach((n) => n instanceof Element && (n.matches(REVEAL) ? io.observe(n) : scan(n)))
    })
    mo.observe(document.body, { childList: true, subtree: true })
    return () => {
      io.disconnect()
      mo.disconnect()
    }
  }, [])
}

export default function Providers({ children }: { children: React.ReactNode }) {
  useRevealObserver()
  return (
    <MotionConfig reducedMotion="user">
      <ResumeRequestProvider>
        <PaletteProvider>{children}</PaletteProvider>
      </ResumeRequestProvider>
    </MotionConfig>
  )
}
