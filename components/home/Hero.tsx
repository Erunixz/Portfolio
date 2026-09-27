"use client"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useReducedMotion } from "motion/react"
import { site } from "@/content/site"
import { RequestResumeButton } from "../ResumeRequest"
import { ArrowRight } from "../Icons"

const badges = [
  { text: "ML research @ McMaster", icon: "M4 7h16M4 12h10M4 17h7" },
  { text: "OSA screening software @ KITE", icon: "M3 12h4l2-5 4 10 2-5h6" },
  { text: "Open source @ GDG", icon: "m8 8-4 4 4 4m8 0 4-4-4-4m-2-3-4 14" },
]

function useTypewriter(words: readonly string[]) {
  const reduce = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [len, setLen] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (reduce) return
    const word = words[index % words.length]
    const t = setTimeout(
      () => {
        if (!deleting && len < word.length) setLen(len + 1)
        else if (!deleting) setDeleting(true)
        else if (len > 0) setLen(len - 1)
        else {
          setDeleting(false)
          setIndex((i) => (i + 1) % words.length)
        }
      },
      !deleting && len === word.length ? 1600 : deleting ? 55 : 110,
    )
    return () => clearTimeout(t)
  }, [len, deleting, index, words, reduce])

  return reduce ? words[0] : words[index % words.length].slice(0, len)
}

export default function Hero() {
  const typed = useTypewriter(site.roles)

  return (
    <section id="home" className="shell grid items-center gap-12 pt-6 pb-16 md:grid-cols-2 md:pt-10 md:pb-20 lg:gap-16">
      <div className="reveal-left">
        <p className="inline-flex items-center gap-2 rounded-full border border-mute/20 bg-card px-3 py-1.5 text-xs font-medium text-ink-2">
          <span className="pulse-dot size-2 rounded-full bg-maroon" aria-hidden />
          {site.availability}
        </p>

        <h1 className="mt-6">
          <span className="block font-hand text-2xl text-maroon md:text-3xl">Hi, I&apos;m</span>
          <span className="relative mt-1 inline-block text-4xl leading-[1.05] font-extrabold tracking-[-0.035em] md:text-5xl">
            {site.name}

            <svg viewBox="0 0 300 14" preserveAspectRatio="none" className="draw absolute -bottom-3 left-0 h-3 w-full text-maroon" aria-hidden>
              <path d="M2 9 C 60 3, 120 3, 180 7 S 260 11, 298 5" pathLength={1} className="stroke-draw" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" style={{ transitionDelay: "400ms" }} />
            </svg>
          </span>
        </h1>
        <p className="mt-5 h-8 text-xl font-semibold tracking-tight text-ink-2 md:text-2xl" aria-label={site.roles.join(", ")}>
          <span aria-hidden>
            {typed}
            <span className="blink font-light text-mute">|</span>
          </span>
        </p>

        <p className="mt-4 max-w-xl text-[15px] leading-relaxed font-medium text-mute md:text-base">{site.intro}</p>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <Link href="/projects" className="btn btn-ink">
            See projects <ArrowRight />
          </Link>
          <RequestResumeButton className="btn btn-ghost" />
        </div>

      </div>

      <div className="reveal-right relative mx-auto mt-6 mb-12 w-full max-w-[230px] md:mt-0 md:mb-0 md:max-w-[260px]">
        <div className="absolute inset-0 scale-110 rounded-full bg-linear-to-tr from-paper-2 to-paper opacity-60 blur-2xl" aria-hidden />
        <div className="relative z-10 rounded-full border border-mute/10 bg-card p-2 shadow-2xl">
          {site.portrait ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={site.portrait} alt={site.name} width={260} height={260} fetchPriority="high" className="aspect-square w-full rounded-full object-cover" />
          ) : (
            <Monogram />
          )}
        </div>

        <ul className="absolute -bottom-12 -left-12 z-20 flex flex-col gap-1.5 lg:-left-20">
          {badges.map((b, i) => (
            <li
              key={b.text}
              className="floating flex items-center gap-2 rounded-xl border border-mute/10 bg-card/90 p-1.5 pr-3 shadow-lg backdrop-blur-md"
              style={{ animationDelay: `${i * 0.4}s` }}
            >
              <span className="rounded-md bg-ink p-1 text-paper">
                <svg className="size-3.5" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d={b.icon} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="text-[11px] font-semibold whitespace-nowrap">{b.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Monogram() {
  return (
    <div className="floating grid-paper relative grid aspect-square w-full place-items-center overflow-hidden rounded-full bg-paper-2">
      <span className="text-[5.5rem] font-black tracking-tighter md:text-[7rem]">
        EZ<span className="text-maroon">.</span>
      </span>
    </div>
  )
}
