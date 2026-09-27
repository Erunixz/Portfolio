import type { Category } from "@/content/projects"
import { cx } from "@/lib/utils"

const style: Record<Category, string> = {
  product: "rounded-full bg-maroon",
  research: "rounded-full border border-cobalt bg-cobalt-soft",
  oss: "rotate-45 border border-ink-2",
}

export default function KindDot({ category, className }: { category: Category; className?: string }) {
  return <span aria-hidden className={cx("inline-block size-2 shrink-0", style[category], className)} />
}
