"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useRef, useState } from "react"
import { useReducedMotion } from "motion/react"
import { experience } from "@/content/experience"
import { projects } from "@/content/projects"
import { stack } from "@/content/stack"
import { awards } from "@/content/awards"
import { site } from "@/content/site"
import { useResumeRequest } from "../ResumeRequest"
import { useInViewOnce } from "../previews/useInViewOnce"

type Ctx = { run: (cmd: string) => void; push: (href: string) => void; resume: () => void }
type Command = { desc: string; hidden?: boolean; run: (args: string[], ctx: Ctx) => React.ReactNode }

const Cmd = ({ children, ctx }: { children: string; ctx: Ctx }) => (
  <button type="button" onClick={() => ctx.run(children)} className="text-blush underline decoration-blush/40 underline-offset-2 hover:decoration-blush">
    {children}
  </button>
)
const Go = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link href={href} className="text-[#9fb0f0] underline decoration-[#9fb0f0]/40 underline-offset-2 hover:decoration-[#9fb0f0]">
    {children}
  </Link>
)
const Dim = ({ children }: { children: React.ReactNode }) => <span className="text-snow/45">{children}</span>

const findProject = (q: string) => {
  const s = q.toLowerCase()
  return projects.find((p) => p.slug === s || p.title.toLowerCase() === s) ?? projects.find((p) => p.slug.startsWith(s) || p.title.toLowerCase().startsWith(s))
}

const commands: Record<string, Command> = {
  help: {
    desc: "list commands",
    run: (_, ctx) => (
      <div className="grid grid-cols-[96px_1fr] gap-x-3 gap-y-0.5 sm:grid-cols-[110px_1fr] sm:gap-x-4">
        {Object.entries(commands)
          .filter(([, c]) => !c.hidden)
          .map(([name, c]) => (
            <div key={name} className="contents">
              <Cmd ctx={ctx}>{name}</Cmd>
              <Dim>{c.desc}</Dim>
            </div>
          ))}
      </div>
    ),
  },
  whoami: {
    desc: "who I am",
    run: () => (
      <div>
        <p className="font-bold text-snow">{site.name}</p>
        <p>{site.program} · {site.school} · GPA {site.gpa}</p>
        <p>ML Research Assistant @ McMaster · ex-Software Engineer @ KITE (UHN), sleep apnea screening · GDG open source</p>
        <p>
          <Dim>{site.location} · {site.availability}</Dim>
        </p>
      </div>
    ),
  },
  experience: {
    desc: "roles & education",
    run: () => (
      <div>
        {experience.map((e) => (
          <p key={e.id}>
            <span className="text-blush">{e.phase.padEnd(12, " ")}</span>
            {e.title} <Dim>@ {e.org}</Dim>
          </p>
        ))}
        <p className="mt-1">
          → <Go href="/experience">open the Experience tab</Go>
        </p>
      </div>
    ),
  },
  projects: {
    desc: "things I've built",
    run: (_, ctx) => (
      <div>
        {projects.map((p) => (
          <p key={p.slug}>
            <Cmd ctx={ctx}>{`open ${p.slug}`}</Cmd> <Dim>{p.oneLiner}</Dim>
          </p>
        ))}
      </div>
    ),
  },
  open: {
    desc: "open a project (open orbitour)",
    run: (args, ctx) => {
      if (!args[0]) return <p>usage: open &lt;project&gt; <Dim>· try: {projects.map((p) => p.slug).join(", ")}</Dim></p>
      const p = findProject(args.join(" "))
      if (!p) return <p>open: no project named “{args.join(" ")}”. Try <Cmd ctx={ctx}>projects</Cmd>.</p>
      ctx.push(`/projects/${p.slug}`)
      return <p>opening {p.title}…</p>
    },
  },
  skills: {
    desc: "tech stack",
    run: () => (
      <div className="grid grid-cols-[170px_1fr] gap-x-4 gap-y-0.5 max-sm:grid-cols-1">
        {stack.map((c) => (
          <div key={c.title} className="contents">
            <span className="text-blush">{c.title}</span>
            <span>{c.items.map((i) => i.name).join(" · ")}</span>
          </div>
        ))}
      </div>
    ),
  },
  awards: {
    desc: "awards & honours",
    run: () => (
      <div>
        {awards.map((a) => (
            <p key={a.title}>
              ★ {a.title} {a.detail && <Dim>({a.detail})</Dim>}
            </p>
          ))}
        <p className="mt-1">
          → <Go href="/awards">see all awards</Go>
        </p>
      </div>
    ),
  },
  contact: {
    desc: "how to reach me",
    run: (_, ctx) => (
      <div>
        <p>
          email&nbsp;&nbsp;&nbsp;&nbsp;<a className="text-[#9fb0f0] underline underline-offset-2" href={`mailto:${site.email}`}>{site.email}</a>
        </p>
        <p>
          linkedin <a className="text-[#9fb0f0] underline underline-offset-2" href={site.linkedin} target="_blank" rel="noopener noreferrer">in/erfan-zamani1</a>
        </p>
        <p>
          github&nbsp;&nbsp;&nbsp;<a className="text-[#9fb0f0] underline underline-offset-2" href={site.github} target="_blank" rel="noopener noreferrer">@{site.githubHandle}</a>
        </p>
        <p className="mt-1">
          <Dim>want my résumé? run</Dim> <Cmd ctx={ctx}>resume</Cmd>
        </p>
      </div>
    ),
  },
  resume: {
    desc: "get my résumé by email",
    run: (_, ctx) => {
      ctx.resume()
      return <p>opening résumé request…</p>
    },
  },
  ls: {
    desc: "list files",
    run: () => (
      <p>
        <span className="text-[#9fb0f0]">experience/ projects/ awards/</span> contact.txt resume.pdf
      </p>
    ),
  },
  cat: {
    desc: "print a file",
    hidden: true,
    run: (args, ctx) =>
      args[0] === "contact.txt" ? commands.contact.run([], ctx) : args[0] === "resume.pdf" ? <p>binary file. Try <Cmd ctx={ctx}>resume</Cmd> instead.</p> : <p>cat: {args[0] ?? ""}: no such file</p>,
  },
  theme: {
    desc: "toggle light / dark",
    run: (args) => {
      const next = args[0] === "light" ? false : args[0] === "dark" ? true : !document.documentElement.classList.contains("dark")
      document.documentElement.classList.toggle("dark", next)
      try {
        localStorage.setItem("theme", next ? "dark" : "light")
      } catch {}
      return <p>theme: {next ? "dark" : "light"}</p>
    },
  },
  clear: { desc: "clear the screen", run: () => null },
  sudo: { desc: "", hidden: true, run: () => <p>nice try. you already have full access here.</p> },
  echo: { desc: "", hidden: true, run: (args) => <p>{args.join(" ")}</p> },
}

const chips = ["whoami", "experience", "projects", "skills", "awards", "contact", "resume", "help"]
const names = Object.keys(commands)
const PROMPT = (
  <span aria-hidden>
    <span className="text-blush">erfan</span>
    <span className="text-snow/40">@</span>
    <span className="text-[#9fb0f0]">portfolio</span>
    <span className="text-snow/40">:~$</span>
  </span>
)

type Entry = { id: number; input?: string; output: React.ReactNode }

export default function Terminal() {
  const router = useRouter()
  const resume = useResumeRequest()
  const reduce = useReducedMotion()
  const [wrapRef, inView] = useInViewOnce<HTMLDivElement>(0.4)
  const screenRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const idRef = useRef(1)
  const [entries, setEntries] = useState<Entry[]>([
    {
      id: 0,
      output: (
        <p>
          <Dim>Welcome. Type a command or tap one below. </Dim>
          <span className="text-snow/70">help</span> <Dim>lists everything.</Dim>
        </p>
      ),
    },
  ])
  const [value, setValue] = useState("")
  const [history, setHistory] = useState<string[]>([])
  const [cursor, setCursor] = useState(-1)
  const booted = useRef(false)

  const executeRef = useRef<(cmd: string) => void>(() => {})

  const execute = useCallback(
    (raw: string) => {
      const input = raw.trim()
      if (!input) return
      const [name, ...args] = input.split(/\s+/)
      const cmd = commands[name.toLowerCase()]
      setHistory((h) => [...h, input])
      setCursor(-1)
      setValue("")
      if (name.toLowerCase() === "clear") return setEntries([])
      const ctx: Ctx = { run: (c) => executeRef.current(c), push: (href) => router.push(href), resume: resume.open }
      const output = cmd ? (
        cmd.run(args, ctx)
      ) : (
        <p>
          command not found: {name}. Try <Cmd ctx={ctx}>help</Cmd>.
        </p>
      )
      setEntries((e) => [...e, { id: idRef.current++, input, output }])
    },
    [router, resume.open],
  )

  useEffect(() => {
    executeRef.current = execute
  }, [execute])

  useEffect(() => {
    const el = screenRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [entries])

  useEffect(() => {
    if (!inView || booted.current) return
    booted.current = true
    if (reduce) {
      const t = setTimeout(() => execute("whoami"), 0)
      return () => clearTimeout(t)
    }
    const word = "whoami"
    let i = 0
    const t = setInterval(() => {
      i++
      setValue(word.slice(0, i))
      if (i === word.length) {
        clearInterval(t)
        setTimeout(() => execute(word), 250)
      }
    }, 90)
    return () => clearInterval(t)
  }, [inView, reduce, execute])

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp" && history.length) {
      e.preventDefault()
      const next = cursor < 0 ? history.length - 1 : Math.max(0, cursor - 1)
      setCursor(next)
      setValue(history[next])
    } else if (e.key === "ArrowDown" && cursor >= 0) {
      e.preventDefault()
      const next = cursor + 1
      if (next >= history.length) {
        setCursor(-1)
        setValue("")
      } else {
        setCursor(next)
        setValue(history[next])
      }
    } else if (e.key === "Tab" && value) {
      const [first, ...rest] = value.split(" ")
      const pool = rest.length ? projects.map((p) => p.slug) : names.filter((n) => !commands[n].hidden)
      const partial = rest.length ? rest.join(" ") : first
      const matches = pool.filter((n) => n.startsWith(partial.toLowerCase()))
      if (matches.length === 1) {
        e.preventDefault()
        setValue(rest.length ? `${first} ${matches[0]}` : `${matches[0]} `)
      } else if (matches.length > 1) {
        e.preventDefault()
        setEntries((en) => [...en, { id: idRef.current++, input: value, output: <Dim>{matches.join("   ")}</Dim> }])
      }
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault()
      setEntries([])
    }
  }

  return (
    <div ref={wrapRef} className="min-w-0">
      <div className="overflow-hidden rounded-2xl border border-night-line bg-night text-snow shadow-[0_30px_60px_-30px_rgb(0_0_0/0.5)]">
        <div className="flex h-10 items-center gap-2 border-b border-night-line px-4">
          <span className="size-3 rounded-full bg-[#ff5f57]" aria-hidden />
          <span className="size-3 rounded-full bg-[#febc2e]" aria-hidden />
          <span className="size-3 rounded-full bg-[#28c840]" aria-hidden />
          <span className="ml-3 font-mono text-xs text-snow/50">erfan@portfolio: ~</span>
        </div>

        <div
          ref={screenRef}
          onClick={(e) => {
            if (!(e.target as HTMLElement).closest("a,button")) inputRef.current?.focus({ preventScroll: true })
          }}
          className="h-[360px] cursor-text overflow-y-auto overscroll-contain p-4 font-mono text-[12px] leading-relaxed text-snow/85 sm:p-5 sm:text-[13px] md:h-[380px]"
        >
          <div role="log" aria-live="polite" aria-label="Terminal output" className="space-y-3">
            {entries.map((en) => (
              <div key={en.id}>
                {en.input !== undefined && (
                  <p>
                    {PROMPT} <span className="text-snow">{en.input}</span>
                  </p>
                )}
                {en.output && <div className="mt-1">{en.output}</div>}
              </div>
            ))}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              execute(value)
            }}
            className="mt-3 flex items-center gap-2"
          >
            {PROMPT}
            <input
              ref={inputRef}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={onKeyDown}
              aria-label="Terminal command"
              autoComplete="off"
              autoCapitalize="off"
              spellCheck={false}
              className="min-w-0 flex-1 bg-transparent text-base text-snow caret-blush outline-none sm:text-[13px]"
            />
          </form>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2" aria-label="Quick commands">
        {chips.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => execute(c)}
            className="rounded-full border border-mute/20 bg-card px-3.5 py-2 font-mono text-xs text-ink-2 transition-colors hover:border-ink hover:text-ink"
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  )
}
