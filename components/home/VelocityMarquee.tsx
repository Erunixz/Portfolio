"use client"
import { useRef } from "react"
import { motion, useAnimationFrame, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, useVelocity } from "motion/react"

const wrap = (min: number, max: number, v: number) => {
  const r = max - min
  return ((((v - min) % r) + r) % r) + min
}

function Row({ text, baseVelocity }: { text: string; baseVelocity: number }) {
  const reduce = useReducedMotion()
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 })
  const factor = useTransform(velocity, [0, 1000], [0, 5], { clamp: false })
  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`)
  const direction = useRef(1)

  useAnimationFrame((_, delta) => {
    if (reduce) return
    const f = factor.get()
    if (f < 0) direction.current = -1
    else if (f > 0) direction.current = 1
    let move = direction.current * baseVelocity * (delta / 1000)
    move += direction.current * move * f
    baseX.set(baseX.get() + move)
  })

  return (
    <div className="overflow-hidden">
      <motion.div className="flex text-xl font-black tracking-tighter whitespace-nowrap md:text-3xl" style={{ x }}>
        {Array.from({ length: 4 }, (_, i) => (
          <span key={i} className="pr-8">
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

export default function VelocityMarquee() {
  return (
    <section aria-hidden className="space-y-1 border-y border-mute/10 py-5 text-ink/90 select-none md:py-6">
      <Row text="Machine learning ✦ Computer vision ✦ Software engineering ✦" baseVelocity={-2} />
      <Row text="Research ✦ Full-stack ✦ Open source ✦ Software engineering ✦" baseVelocity={2} />
    </section>
  )
}
