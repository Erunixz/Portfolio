export type LogEntry = {
  date?: string
  scope: string
  kind: "ship" | "research" | "milestone" | "oss" | "site"
  text: string
  href?: string
}

export const shipLog: LogEntry[] = [
  { scope: "mcmaster", kind: "research", text: "ML Research Assistant, building machine learning systems", href: "/experience" },
  { scope: "orbitour", kind: "ship", text: "multi-agent trip planning with 3D fly-throughs", href: "/projects/orbitour" },
  { scope: "thru.io", kind: "milestone", text: "multilingual voice AI drive-through, GDG Mac-a-Thon 2026", href: "/projects/thru-io" },
  { scope: "kite-uhn", kind: "milestone", text: "recording system used across real patient sessions", href: "/experience" },
  { scope: "gdg", kind: "oss", text: "open source team member, Google Developer Groups", href: "/experience" },
]
