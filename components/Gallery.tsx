"use client"
import { useCallback, useEffect, useState } from "react"
import { createPortal } from "react-dom"
import type { ProjectImage } from "@/content/projects"
import { cx } from "@/lib/utils"

export default function Gallery({ images }: { images: ProjectImage[] }) {
  const [index, setIndex] = useState(0)
  const [open, setOpen] = useState(false)
  const current = images[index]
  const step = useCallback((d: number) => setIndex((i) => (i + d + images.length) % images.length), [images.length])

  useEffect(() => {
    if (!open) return
    const overflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
      else if (e.key === "ArrowRight") step(1)
      else if (e.key === "ArrowLeft") step(-1)
    }
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = overflow
      window.removeEventListener("keydown", onKey)
    }
  }, [open, step])

  return (
    <figure className="m-0">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group relative block w-full overflow-hidden rounded-2xl border border-line bg-night shadow-[0_30px_60px_-30px_rgb(0_0_0/0.45)]"
        aria-label={`Open screenshot full screen: ${current.alt}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={current.src} alt={current.alt} width={current.width} height={current.height} className="block h-auto w-full transition-transform duration-700 group-hover:scale-[1.015]" />
        <span className="absolute right-3 bottom-3 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white opacity-0 transition-opacity group-hover:opacity-100">
          View full screen
        </span>
      </button>
      <figcaption className="mt-3 text-sm text-mute">{current.caption}</figcaption>

      {images.length > 1 && (
        <ul className="mt-4 grid grid-cols-4 gap-2 sm:gap-3" aria-label="Screenshots">
          {images.map((img, i) => (
            <li key={img.src}>
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show screenshot: ${img.caption}`}
                aria-pressed={i === index}
                className={cx("block w-full overflow-hidden rounded-lg border-2 transition-all", i === index ? "border-ink" : "border-transparent opacity-60 hover:opacity-100")}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img.src} alt="" width={img.width} height={img.height} loading="lazy" className="block aspect-video w-full object-cover" />
              </button>
            </li>
          ))}
        </ul>
      )}

      {open &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Screenshot viewer"
            className="page-enter fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/90 p-4"
            onClick={(e) => e.target === e.currentTarget && setOpen(false)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={current.src} alt={current.alt} className="max-h-[78vh] max-w-full rounded-xl object-contain" />
            <p className="mt-4 text-center text-sm text-white/75">{current.caption}</p>
            <div className="mt-4 flex gap-3">
              {images.length > 1 && (
                <>
                  <button type="button" onClick={() => step(-1)} className="rounded-full border border-white/30 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10" aria-label="Previous screenshot">
                    ←
                  </button>
                  <button type="button" onClick={() => step(1)} className="rounded-full border border-white/30 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10" aria-label="Next screenshot">
                    →
                  </button>
                </>
              )}
              <button type="button" autoFocus onClick={() => setOpen(false)} className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-black">
                Close
              </button>
            </div>
          </div>,
          document.body,
        )}
    </figure>
  )
}
