export function cx(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}

export const isExternal = (href: string) => /^(https?:|mailto:)/.test(href)

export function curve(a: { x: number; y: number }, b: { x: number; y: number }) {
  const dx = (b.x - a.x) * 0.5
  return `M${a.x},${a.y} C${a.x + dx},${a.y} ${b.x - dx},${b.y} ${b.x},${b.y}`
}
