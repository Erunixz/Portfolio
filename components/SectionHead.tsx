import { cx } from "@/lib/utils"

export default function SectionHead({
  kicker,
  title,
  aside,
  dark = false,
  as: Tag = "h2",
  className,
}: {
  kicker: string
  title: React.ReactNode
  aside?: React.ReactNode
  dark?: boolean
  as?: "h1" | "h2"
  className?: string
}) {
  return (
    <div className={cx("reveal mb-10 flex flex-wrap items-end justify-between gap-6 md:mb-12", className)}>
      <div>
        <p className={cx("mb-3 text-xs font-bold tracking-[0.2em] uppercase", dark ? "text-snow/50" : "text-mute")}>{kicker}</p>
        <Tag className="max-w-3xl text-3xl font-black tracking-tighter text-balance md:text-4xl">{title}</Tag>
      </div>
      {aside}
    </div>
  )
}
