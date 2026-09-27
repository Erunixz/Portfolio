"use client"
import { useEffect, useRef, useState } from "react"

export function useInViewOnce<T extends Element>(threshold = 0.35) {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setInView(true), io.disconnect()), { threshold })
    io.observe(el)
    return () => io.disconnect()
  }, [threshold])
  return [ref, inView] as const
}

export const prefersReducedMotion = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
