import { useRef, useEffect, useState } from 'react'
import type { ReactNode, CSSProperties } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useInView,
  animate,
} from 'framer-motion'

/* ─────────────────────────────────────────────────────────────
   Shared scroll-animation toolkit (Daylight-style)
   120fps-safe: only `transform` / `opacity` are animated, and
   every animated element keeps `will-change: transform`.
   All scroll values flow through useScroll/useTransform so they
   run on the compositor and stay in sync with the global Lenis
   instance.
   ───────────────────────────────────────────────────────────── */

export const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number]

/* ── Parallax: translate a layer on the Y (or X) axis as the
   section scrolls through the viewport ── */
export function Parallax({
  children,
  from = 60,
  to = -60,
  axis = 'y',
  className,
  style,
}: {
  children: ReactNode
  /** offset (px) when the element first enters the viewport */
  from?: number
  /** offset (px) when the element leaves the viewport */
  to?: number
  axis?: 'x' | 'y'
  className?: string
  style?: CSSProperties
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const move = useTransform(scrollYProgress, [0, 1], [from, to])
  const motionStyle = axis === 'y' ? { y: move } : { x: move }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        ...style,
        ...(reduce ? {} : motionStyle),
        willChange: 'transform',
      }}
    >
      {children}
    </motion.div>
  )
}

/* ── Reveal: fade + slide an element in when it enters view ── */
export function Reveal({
  children,
  y = 32,
  x = 0,
  delay = 0,
  duration = 0.85,
  once = true,
  className,
  style,
  as = 'div',
}: {
  children: ReactNode
  y?: number
  x?: number
  delay?: number
  duration?: number
  once?: boolean
  className?: string
  style?: CSSProperties
  as?: 'div' | 'span' | 'li'
}) {
  const reduce = useReducedMotion()
  const MotionTag = motion[as] as typeof motion.div
  return (
    <MotionTag
      className={className}
      style={{ ...style, willChange: 'transform, opacity' }}
      initial={reduce ? false : { opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once, margin: '-60px' }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </MotionTag>
  )
}

/* ── CountUp: animate a number from 0 → target when in view ── */
export function CountUp({
  to,
  duration = 1.4,
  decimals = 0,
  suffix = '',
  className,
  style,
}: {
  to: number
  duration?: number
  decimals?: number
  suffix?: string
  className?: string
  style?: CSSProperties
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const reduce = useReducedMotion()
  const [val, setVal] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (reduce) {
      setVal(to)
      return
    }
    const controls = animate(0, to, {
      duration,
      ease: EASE,
      onUpdate: (v) => setVal(v),
    })
    return () => controls.stop()
  }, [inView, to, duration, reduce])

  return (
    <span ref={ref} className={className} style={style}>
      {val.toFixed(decimals)}
      {suffix}
    </span>
  )
}

/* ── useSectionProgress: 0→1 progress of a section through the
   viewport, for bespoke scroll-driven effects ── */
export function useSectionProgress(
  offset: [string, string] = ['start end', 'end start'],
) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    // @ts-expect-error framer accepts string edge offsets
    offset,
  })
  return { ref, scrollYProgress }
}
