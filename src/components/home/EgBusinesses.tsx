import { useEffect, useRef, useState, type ReactNode } from 'react'
import {
  motion, AnimatePresence, useReducedMotion,
  useScroll, useMotionValueEvent, useInView,
} from 'framer-motion'
import {
  Headset, Ship, Server, Truck, Plane,
  PhoneCall, Cloud, Boxes, Globe, Package, Cpu, MapPin, Warehouse,
} from 'lucide-react'
import { takePending } from '../../utils/sectionLink'

/* ═══════════════════════════════════════════════════
   OUR BUSINESSES - "A growing group of" (Mobbin-style)
   The wordmark holds centre-stage while colourful 3D tiles
   burst out from behind it and settle around the edges. The
   section then pins and the business name cycles one by one.
   Scrolling back up only rewinds the name - the tiles stay put.
   ═══════════════════════════════════════════════════ */

const NAVY  = '#13293D'
const GREEN = '#3CB98C'
const MUTED = 'rgba(26,43,60,0.55)'
const EASE  = [0.16, 1, 0.3, 1] as [number, number, number, number]

type Tile = {
  key: string
  Icon: typeof Ship
  c: string                 // base hue (glyph colour); the tile is a light shade of it
  pos: { left: string; top: string }
  primary?: boolean         // one of the five businesses (labelled, drives the cycle)
  title?: string
  label?: ReactNode         // optional multi-line label
  sm?: boolean              // smaller decorative accent tile
}

const TILES: Tile[] = [
  // ── the five businesses (labelled) ──
  { key: 'call-centre',       primary: true, title: 'Call Centre',       Icon: Headset, c: '#2FB587', pos: { left: '12%', top: '27%' } },
  { key: 'imports',           primary: true, title: 'Imports',           Icon: Ship,    c: '#3F8FD0', pos: { left: '88%', top: '24%' } },
  { key: 'it-infrastructure', primary: true, title: 'IT Infrastructure', label: <>IT<br />Infrastructure</>, Icon: Server, c: '#7B6BE0', pos: { left: '6%', top: '60%' } },
  { key: 'supply-chain',      primary: true, title: 'Supply Chain',      Icon: Truck,   c: '#E68A2E', pos: { left: '92%', top: '62%' } },
  { key: 'travel',            primary: true, title: 'Travel',            Icon: Plane,   c: '#16A0B0', pos: { left: '20%', top: '85%' } },
  // ── decorative accents (unlabelled, smaller, related services) ──
  { key: 'd-map',     Icon: MapPin,    c: '#EA8A5B', pos: { left: '50%', top: '19%' }, sm: true },
  { key: 'd-phone',   Icon: PhoneCall, c: '#E86A9A', pos: { left: '30%', top: '18%' }, sm: true },
  { key: 'd-cloud',   Icon: Cloud,     c: '#57ACE6', pos: { left: '70%', top: '17%' }, sm: true },
  { key: 'd-boxes',   Icon: Boxes,     c: '#E0A93A', pos: { left: '84%', top: '42%' }, sm: true },
  { key: 'd-globe',   Icon: Globe,     c: '#2FB0A0', pos: { left: '14%', top: '42%' }, sm: true },
  { key: 'd-package', Icon: Package,   c: '#6C8AE4', pos: { left: '62%', top: '87%' }, sm: true },
  { key: 'd-cpu',     Icon: Cpu,       c: '#9B7BE0', pos: { left: '39%', top: '89%' }, sm: true },
  { key: 'd-warehouse', Icon: Warehouse, c: '#E8776A', pos: { left: '80%', top: '84%' }, sm: true },
]

const PRIMARY = TILES.filter(t => t.primary)
const BIZ_INDEX: Record<string, number> = Object.fromEntries(PRIMARY.map((t, i) => [t.key, i]))

/* ── single 3D tile ── */
function TileBadge({
  t, idx, spread, dims, active, useStatic, onOpen,
}: {
  t: Tile
  idx: number
  spread: boolean
  dims: { w: number; h: number }
  active: boolean
  useStatic: boolean
  onOpen: () => void
}) {
  // offset from the tile's resting spot back to the exact stage centre
  const cx = (0.5 - parseFloat(t.pos.left) / 100) * dims.w
  const cy = (0.5 - parseFloat(t.pos.top) / 100) * dims.h

  const flyAnim = useStatic
    ? {}
    : {
        animate: spread
          ? { x: 0, y: 0, opacity: 1, scale: 1 }
          : { x: cx, y: cy, opacity: 0, scale: 0.32 },
        transition: { type: 'spring' as const, stiffness: 120, damping: 17, mass: 0.9, delay: spread ? idx * 0.045 : 0 },
      }

  return (
    <div className="egb-pos" style={useStatic ? undefined : (t.pos as React.CSSProperties)}>
      <motion.div className="egb-fly" {...flyAnim}>
        <motion.button
          type="button"
          className={`egb-tile-btn${active ? ' active' : ''}${t.sm ? ' sm' : ''}`}
          onClick={onOpen}
          whileHover={useStatic ? undefined : { scale: 1.12, y: -6, rotate: [0, -7, 6, -3, 0], transition: { duration: 0.55, ease: 'easeInOut' } }}
          whileTap={useStatic ? undefined : { scale: 0.95 }}
          style={{ ['--c' as string]: t.c } as React.CSSProperties}
          aria-label={t.title ? `Show ${t.title}` : undefined}
        >
          <span
            className="egb-tile"
            style={{ animationDuration: `${5.5 + (idx % 4) * 0.8}s`, animationDelay: `${idx * 0.35}s` }}
          >
            <t.Icon strokeWidth={2} />
          </span>
          {(t.label || t.title) && <span className="egb-tile-label">{t.label ?? t.title}</span>}
        </motion.button>
      </motion.div>
    </div>
  )
}

export function EgBusinesses() {
  const reduce = useReducedMotion() ?? false
  const sectionRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const suppressRef = useRef(0)          // pause the step-lock during deep-link scrolls
  const [dims, setDims] = useState({ w: 0, h: 0 })
  const [active, setActive] = useState(0)
  const [mobile, setMobile] = useState(false)

  const useStatic = mobile || reduce
  const N = PRIMARY.length

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  // burst the tiles out once, as the section scrolls into view (stays true)
  const spread = useInView(sectionRef, { once: true, amount: 0.12 })

  // keep the live stage size so tiles can spread from its exact centre
  useEffect(() => {
    const el = stageRef.current
    if (!el) return
    const measure = () => setDims({ w: el.offsetWidth, h: el.offsetHeight })
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // track the mobile breakpoint (static, non-pinned layout below 768px)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const on = () => setMobile(mq.matches)
    on()
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])

  // desktop: the centre name cycles with scroll (reverses on scroll-up; tiles stay put)
  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    if (useStatic) return
    setActive(Math.max(0, Math.min(N - 1, Math.floor(p * N))))
  })

  // ── step-lock ──
  // The pinned scroll is broken into N discrete steps (one per business). Each
  // scroll gesture moves exactly one step through the global Lenis instance with
  // `lock: true`, so fast flings can't skip names (Lenis smoothing lets us catch
  // and redirect an incoming fling), and every step holds for the scrollTo dwell.
  // The active name still derives from scroll position, so this only *paces* the
  // scroll - if it ever misses, behaviour degrades to the plain scrubbed version.
  useEffect(() => {
    if (useStatic) return
    const section = sectionRef.current
    const lenis = (window as unknown as { __lenis?: {
      scrollTo: (t: number, o?: object) => void
      on: (e: string, cb: (a: { scroll: number }) => void) => (() => void) | void
      off?: (e: string, cb: (a: { scroll: number }) => void) => void
    } }).__lenis
    if (!section || !lenis) return

    let busy = false
    let prevInside = false
    let safety: ReturnType<typeof setTimeout> | undefined

    const geo = () => {
      const vh = window.innerHeight
      const topY = section.getBoundingClientRect().top + window.scrollY
      const travel = Math.max(1, section.offsetHeight - vh)
      return { topY, travel, gap: travel / (N - 1) }
    }
    const stepY = (i: number, g: ReturnType<typeof geo>) => g.topY + i * g.gap
    const nearest = (y: number, g: ReturnType<typeof geo>) =>
      Math.max(0, Math.min(N - 1, Math.round((y - g.topY) / g.gap)))

    const goStep = (i: number, g: ReturnType<typeof geo>) => {
      busy = true
      if (safety) clearTimeout(safety)
      safety = setTimeout(() => { busy = false }, 1100)   // never let `busy` stick and freeze input
      lenis.scrollTo(stepY(i, g), {
        lock: true,
        duration: 0.6,
        easing: (t: number) => 1 - Math.pow(1 - t, 3),
        onComplete: () => { busy = false },
      })
    }

    // catch a fling as it enters the zone and hold it at the near end
    const onScroll = ({ scroll }: { scroll: number }) => {
      const g = geo()
      const inside = scroll > g.topY - 1 && scroll < g.topY + g.travel + 1
      if (!busy && inside && !prevInside && performance.now() >= suppressRef.current) {
        goStep(scroll <= g.topY + g.travel / 2 ? 0 : N - 1, g)
      }
      prevInside = inside
    }
    const offScroll = lenis.on('scroll', onScroll)

    const tryStep = (dir: number) => {
      if (busy || dir === 0 || performance.now() < suppressRef.current) return false
      const g = geo()
      const y = window.scrollY
      if (!(y > g.topY - 2 && y < g.topY + g.travel + 2)) return false   // outside → let it scroll
      const next = nearest(y, g) + dir
      if (next < 0 || next >= N) return false                            // boundary → release
      goStep(next, g)
      return true
    }

    const onWheel = (e: WheelEvent) => {
      if (busy) { e.preventDefault(); return }
      if (tryStep(Math.sign(e.deltaY))) e.preventDefault()
    }
    let touchY = 0
    const onTouchStart = (e: TouchEvent) => { touchY = e.touches[0].clientY }
    const onTouchMove = (e: TouchEvent) => {
      const dy = touchY - e.touches[0].clientY
      if (busy) { e.preventDefault(); return }
      if (Math.abs(dy) < 26) return
      if (tryStep(Math.sign(dy))) { e.preventDefault(); touchY = e.touches[0].clientY }
    }
    const onKey = (e: KeyboardEvent) => {
      const down = e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' '
      const up = e.key === 'ArrowUp' || e.key === 'PageUp'
      if (!down && !up) return
      if (busy) { e.preventDefault(); return }
      if (tryStep(down ? 1 : -1)) e.preventDefault()
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: false })
    window.addEventListener('keydown', onKey)
    return () => {
      if (safety) clearTimeout(safety)
      if (offScroll) offScroll(); else lenis.off?.('scroll', onScroll)
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('keydown', onKey)
    }
  }, [useStatic, N])

  // mobile / reduced-motion: gently cycle the centre name on a timer
  useEffect(() => {
    if (!useStatic) return
    const id = setInterval(() => setActive(a => (a + 1) % PRIMARY.length), 2600)
    return () => clearInterval(id)
  }, [useStatic])

  // Deep-link from header/footer → activate + scroll so the name is showing
  useEffect(() => {
    const focus = (id: string) => {
      const idx = BIZ_INDEX[id]
      if (idx == null) return
      setActive(idx)
      suppressRef.current = performance.now() + 1500   // let the deep-link land without the step-lock grabbing it
      requestAnimationFrame(() => {
        const el = sectionRef.current
        if (!el) return
        const top = el.getBoundingClientRect().top + window.scrollY
        if (useStatic) {
          window.scrollTo({ top: top - 72, behavior: 'smooth' })
        } else {
          const scrollable = Math.max(1, el.offsetHeight - window.innerHeight)
          const p = Math.min(0.999, idx / (N - 1))
          window.scrollTo({ top: top + p * scrollable, behavior: 'smooth' })
        }
      })
    }
    const pending = takePending('business')
    if (pending) setTimeout(() => focus(pending), 350)
    const handler = (e: Event) => { const id = (e as CustomEvent).detail?.id; if (id) focus(id) }
    window.addEventListener('eg:business', handler)
    return () => window.removeEventListener('eg:business', handler)
  }, [useStatic])

  // clicking any tile re-centres the whole businesses section
  const openSectionTop = () => {
    const el = sectionRef.current
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY
    window.scrollTo({ top: useStatic ? top - 72 : top, behavior: 'smooth' })
  }

  return (
    <section className="egb" id="our-businesses" aria-label="Our businesses" ref={sectionRef}>
      <style>{`
        .egb { position: relative; background: #ffffff; height: 240vh; }
        .egb-sticky {
          position: sticky; top: 0; height: 100vh; overflow: hidden;
          display: flex; align-items: center; justify-content: center;
        }
        .egb-stage {
          position: relative; width: min(calc(100vw - 140px), 2400px); height: 100%;
          margin: 0 auto;
        }

        /* ── centre wordmark ──
           the wrapper owns the centring transform so Framer Motion's animated
           transform on the inner element can't override it. */
        .egb-center {
          position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);
          z-index: 3; text-align: center; width: min(92%, 900px); pointer-events: none;
        }
        .egb-center-in { will-change: transform, opacity; }
        .egb-eyebrow {
          font-family: 'Inter', sans-serif; font-weight: 700; text-transform: uppercase;
          font-size: clamp(11px, 0.9vw, 14px); letter-spacing: 3px; color: ${MUTED}; margin: 0;
        }
        .egb-heading {
          font-family: 'Poppins', sans-serif; font-weight: 800; text-transform: uppercase;
          font-size: clamp(28px, 4.6vw, 66px); line-height: 1.0; letter-spacing: -0.02em;
          color: ${NAVY}; margin: clamp(14px, 1.8vw, 22px) 0 0;
        }
        .egb-cycler {
          position: relative; height: clamp(52px, 8.5vw, 124px); margin-top: clamp(6px, 1vw, 14px);
          display: flex; align-items: center; justify-content: center;
        }
        .egb-name {
          position: absolute; will-change: transform, opacity;
          font-family: 'Poppins', sans-serif; font-weight: 800; text-transform: uppercase;
          font-size: clamp(38px, 7vw, 108px); line-height: 0.92; letter-spacing: -0.03em;
          color: ${GREEN}; white-space: nowrap;
        }

        /* ── scattered 3D tiles ── */
        .egb-scatter { position: absolute; inset: 0; z-index: 2; pointer-events: none; }
        .egb-pos { position: absolute; transform: translate(-50%, -50%); }
        .egb-fly { will-change: transform, opacity; }
        .egb-tile-btn {
          pointer-events: auto; cursor: pointer; background: none; border: none; padding: 0;
          display: flex; flex-direction: column; align-items: center; gap: 12px;
        }
        .egb-tile {
          display: flex; align-items: center; justify-content: center;
          width: clamp(76px, 7.4vw, 106px); height: clamp(76px, 7.4vw, 106px); border-radius: 26px;
          color: var(--c);
          background: linear-gradient(150deg,
            color-mix(in srgb, var(--c) 9%, #ffffff),
            color-mix(in srgb, var(--c) 24%, #ffffff));
          border: 1px solid rgba(255,255,255,0.75);
          box-shadow:
            0 16px 32px -12px color-mix(in srgb, var(--c) 55%, transparent),
            0 4px 10px -6px color-mix(in srgb, var(--c) 42%, transparent),
            inset 0 2px 0 rgba(255,255,255,0.95),
            inset 0 -7px 14px color-mix(in srgb, var(--c) 18%, transparent);
          animation: egbFloat 6s cubic-bezier(0.45,0,0.55,1) infinite;
          will-change: transform;
          transition: box-shadow 0.3s ease;
        }
        .egb-tile svg { width: clamp(30px, 3vw, 42px); height: auto; }
        .egb-tile-btn.sm .egb-tile { width: clamp(52px, 5vw, 74px); height: clamp(52px, 5vw, 74px); border-radius: 19px; }
        .egb-tile-btn.sm .egb-tile svg { width: clamp(22px, 2.2vw, 30px); }
        .egb-tile-btn.active .egb-tile {
          box-shadow:
            0 22px 44px -12px color-mix(in srgb, var(--c) 72%, transparent),
            0 6px 14px -6px color-mix(in srgb, var(--c) 52%, transparent),
            inset 0 2px 0 rgba(255,255,255,1),
            inset 0 -7px 14px color-mix(in srgb, var(--c) 24%, transparent);
        }
        .egb-tile-label {
          font-family: 'Inter', sans-serif; font-weight: 600; color: ${MUTED};
          font-size: clamp(12px, 1vw, 15px); line-height: 1.25; text-align: center; max-width: 14ch;
          transition: color 0.25s ease;
        }
        .egb-tile-btn.active .egb-tile-label { color: var(--c); font-weight: 700; }

        @keyframes egbFloat {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-9px); }
        }

        /* ── mobile: no pin, stacked centre + wrapped tiles ── */
        @media (max-width: 767px) {
          .egb { height: auto; }
          .egb-sticky { position: static; height: auto; padding: clamp(56px, 12vw, 90px) 24px; }
          .egb-stage {
            width: 100%; height: auto;
            display: flex; flex-direction: column; align-items: center; gap: clamp(36px, 9vw, 52px);
          }
          .egb-center { position: static; transform: none; width: 100%; pointer-events: auto; }
          .egb-cycler { height: auto; min-height: clamp(48px, 16vw, 72px); }
          .egb-name { position: static; white-space: normal; }
          .egb-scatter {
            position: static; inset: auto;
            display: flex; flex-wrap: wrap; justify-content: center; align-items: flex-start;
            gap: clamp(22px, 6vw, 34px);
          }
          .egb-pos { position: static; transform: none; }
        }

        /* ── large screens ── */
        @media (min-width: 1920px) {
          .egb-heading { font-size: 78px; }
          .egb-name { font-size: 130px; }
          .egb-cycler { height: 150px; }
          .egb-tile { width: 116px; height: 116px; border-radius: 30px; }
          .egb-tile svg { width: 46px; }
          .egb-tile-btn.sm .egb-tile { width: 82px; height: 82px; }
          .egb-tile-label { font-size: 17px; }
        }
        @media (min-width: 2560px) {
          .egb-heading { font-size: 104px; }
          .egb-name { font-size: 176px; }
          .egb-cycler { height: 210px; }
          .egb-tile { width: 150px; height: 150px; border-radius: 38px; }
          .egb-tile svg { width: 58px; }
          .egb-tile-btn.sm .egb-tile { width: 104px; height: 104px; }
          .egb-tile-label { font-size: 21px; }
        }
      `}</style>

      <div className="egb-sticky">
        <div className="egb-stage" ref={stageRef}>
          <div className="egb-center">
            <motion.div
              className="egb-center-in"
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, ease: EASE }}
            >
              <p className="egb-eyebrow">Our Businesses</p>
              <h2 className="egb-heading">A growing group of</h2>
              <div className="egb-cycler">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={active}
                    className="egb-name"
                    style={{ color: PRIMARY[active].c }}
                    initial={reduce ? false : { opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? undefined : { opacity: 0, y: -18 }}
                    transition={{ duration: 0.45, ease: EASE }}
                  >
                    {PRIMARY[active].title}
                  </motion.span>
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          <div className="egb-scatter">
            {TILES.map((t, i) => (
              <TileBadge
                key={t.key}
                t={t}
                idx={i}
                spread={spread}
                dims={dims}
                active={t.primary ? PRIMARY[active].key === t.key : false}
                useStatic={useStatic}
                onOpen={openSectionTop}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
