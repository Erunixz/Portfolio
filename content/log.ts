export type LogEntry = {
  date?: string
  scope: string
  kind: "ship" | "research" | "milestone" | "oss" | "site"
  text: string
  href?: string
}

export const shipLog: LogEntry[] = [
  { scope: "retinex-lab", kind: "research", text: "ablation suite: one prior at a time, size always reported", href: "/experience" },
    { scope: "orbitour", kind: "ship", text: "multi-agent planning with 3D fly-throughs", href: "/projects/orbitour" },
  { scope: "thru.io", kind: "milestone", text: "voice AI drive-through built at Mac-a-Thon 2026", href: "/projects/thru-io" },
  { scope: "clinical-recorder", kind: "milestone", text: "OSA screening recordings across real patient sessions", href: "/experience" },
  { scope: "site", kind: "site", text: "tabs, terminal and ⌘K palette live", href: "/" },
]
