import { useEffect, useRef, useState } from 'react'
import {
  motion, useReducedMotion, useScroll, useTransform,
  type MotionValue,
} from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { takePending } from '../../utils/sectionLink'

/* ═══════════════════════════════════════════════════
   OUR COMPANIES - full-screen one-at-a-time slider
   The section pins; each scroll gesture slides exactly one
   full-width company in (via the global Lenis step-lock),
   holding on each - no peeking neighbours, no continuous
   drag. Each panel frames its image top-right over an
   L-shaped tint with two crossing hairlines. Deep-links
   jump to a company; the pin holds until all have scrolled.
   ═══════════════════════════════════════════════════ */

const NAVY  = '#13293D'
const GREEN = '#3CB98C'

const PANEL_VW = 100         // one company fills the whole width
const PW = PANEL_VW / 100

/* header/footer slug → index in COMPANIES */
const COMPANY_INDEX: Record<string, number> = {
  foundations: 0, digital: 1, imports: 2, transport: 3, travels: 4,
}

type Company = {
  slug: string
  title: string          // the big bleeding company name
  tagline: string
  id: string             // Unsplash photo id
  tint: string           // L-shaped frame colour
  to: string
}

const COMPANIES: Company[] = [
  { slug: 'foundations', title: 'Eloma Group',
    tagline: 'The backbone behind every business.',
    id: 'photo-1497366811353-6870744d04b2', tint: '#143A2C', to: '/companies/eloma-group' },
  { slug: 'digital', title: 'EG Digital Australia',
    tagline: 'Modern digital experiences, engineered for growth.',
    id: 'photo-1498050108023-c5249f4df085', tint: '#1B2C4B', to: '/companies/eg-digital' },
  { slug: 'imports', title: 'EG Imports',
    tagline: 'Global sourcing, delivered with precision.',
    id: 'photo-1613690399151-65ea69478674', tint: '#123C44', to: '/companies/eg-imports' },
  { slug: 'transport', title: 'EG Transport - BIVRY',
    tagline: 'Freight that arrives on time, every time.',
    id: 'photo-1626121300305-def4dc305387', tint: '#33302B', to: '/companies/bivry' },
  { slug: 'travels', title: 'EG Travels',
    tagline: 'Journeys designed around people.',
    id: 'photo-1436491865332-7a61a109cc05', tint: '#123049', to: '/companies/eg-travels' },
]

const img = (id: string, w: number) => {
  const host = id.startsWith('premium_photo') ? 'https://plus.unsplash.com' : 'https://images.unsplash.com'
  return `${host}/${id}?auto=format&fit=crop&w=${w}&q=80`
}

/* ── one full-screen panel ── */
function Panel({
  c, i, n, progress, useStatic, onOpen,
}: {
  c: Company
  i: number
  n: number
  progress: MotionValue<number>
  useStatic: boolean
  onOpen: () => void
}) {
  // tagline + discover only while this panel is the one on screen
  const copyOpacity = useTransform(progress, (p) => {
    const d = Math.abs(p * (n - 1) - i)
    return d < 0.5 ? Math.max(0, 1 - d * 2.6) : 0
  })
  const imgScale = useTransform(progress, (p) => {
    const d = Math.abs(p * (n - 1) - i)
    return 1 + Math.min(0.06, d * 0.05)
  })

  return (
    <div
      className="eg-acc-panel"
      role="tab"
      aria-selected={false}
      aria-label={c.title}
      style={{ ['--tint' as string]: c.tint } as React.CSSProperties}
      id={useStatic ? `eg-co-card-${i}` : undefined}
      onClick={onOpen}
      tabIndex={0}
    >
      <div className="eg-acc-media">
        <motion.img
          className="eg-acc-img"
          src={img(c.id, 1700)}
          alt={c.title}
          loading={i === 0 ? 'eager' : 'lazy'}
          decoding="async"
          style={useStatic ? undefined : { scale: imgScale }}
        />
        <span className="eg-acc-shade" aria-hidden />
      </div>

      {/* the two intersecting hairlines, mirroring the left + bottom margins */}
      <span className="eg-acc-vline" aria-hidden />
      <span className="eg-acc-hline" aria-hidden />

      <motion.div className="eg-acc-copy" style={useStatic ? undefined : { opacity: copyOpacity }}>
        <p className="eg-acc-tag">{c.tagline}</p>
        <button
          type="button"
          className="eg-acc-link"
          onClick={(e) => { e.stopPropagation(); onOpen() }}
        >
          Discover <ArrowUpRight size={16} strokeWidth={2.4} />
        </button>
      </motion.div>

      <h3 className="eg-acc-title">{c.title}</h3>
    </div>
  )
}

export function EgCompanies() {
  const reduce = useReducedMotion() ?? false
  const navigate = useNavigate()
  const stageRef = useRef<HTMLDivElement>(null)
  const suppressRef = useRef(0)
  const vwRef = useRef(typeof window !== 'undefined' ? window.innerWidth : 1440)
  const [mobile, setMobile] = useState(false)

  const n = COMPANIES.length
  const useStatic = mobile || reduce

  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ['start start', 'end end'],
  })

  // slide the whole strip so exactly one full-width panel fills the viewport
  const x = useTransform(scrollYProgress, (p) => {
    const w = vwRef.current
    const pw = PW * w
    const f = p * (n - 1)
    return 0.5 * w - (f * pw + pw / 2)
  })

  useEffect(() => {
    const onResize = () => { vwRef.current = window.innerWidth }
    onResize()
    window.addEventListener('resize', onResize)
    const mq = window.matchMedia('(max-width: 767px)')
    const onMq = () => setMobile(mq.matches)
    onMq()
    mq.addEventListener('change', onMq)
    return () => { window.removeEventListener('resize', onResize); mq.removeEventListener('change', onMq) }
  }, [])

  // ── step-lock ──
  // Each scroll gesture slides exactly one full company through the global Lenis
  // instance (`lock: true`), so it snaps one-at-a-time (no continuous drag) and
  // can't leave for the next section until every company has scrolled past.
  useEffect(() => {
    if (useStatic) return
    const stage = stageRef.current
    const lenis = (window as unknown as { __lenis?: {
      scrollTo: (t: number, o?: object) => void
      on: (e: string, cb: (a: { scroll: number }) => void) => (() => void) | void
      off?: (e: string, cb: (a: { scroll: number }) => void) => void
    } }).__lenis
    if (!stage || !lenis) return

    let busy = false
    let prevInside = false
    let safety: ReturnType<typeof setTimeout> | undefined

    const geo = () => {
      const vh = window.innerHeight
      const topY = stage.getBoundingClientRect().top + window.scrollY
      const travel = Math.max(1, stage.offsetHeight - vh)
      return { topY, travel, gap: travel / (n - 1) }
    }
    const stepY = (i: number, g: ReturnType<typeof geo>) => g.topY + i * g.gap
    const nearest = (y: number, g: ReturnType<typeof geo>) =>
      Math.max(0, Math.min(n - 1, Math.round((y - g.topY) / g.gap)))

    const goStep = (i: number, g: ReturnType<typeof geo>) => {
      busy = true
      if (safety) clearTimeout(safety)
      safety = setTimeout(() => { busy = false }, 1300)
      lenis.scrollTo(stepY(i, g), {
        lock: true,
        duration: 0.75,
        easing: (t: number) => 1 - Math.pow(1 - t, 3),
        onComplete: () => { busy = false },
      })
    }

    const onScroll = ({ scroll }: { scroll: number }) => {
      const g = geo()
      const inside = scroll > g.topY - 1 && scroll < g.topY + g.travel + 1
      if (!busy && inside && !prevInside && performance.now() >= suppressRef.current) {
        goStep(scroll <= g.topY + g.travel / 2 ? 0 : n - 1, g)
      }
      prevInside = inside
    }
    const offScroll = lenis.on('scroll', onScroll)

    const tryStep = (dir: number) => {
      if (busy || dir === 0 || performance.now() < suppressRef.current) return false
      const g = geo()
      const y = window.scrollY
      if (!(y > g.topY - 2 && y < g.topY + g.travel + 2)) return false
      const next = nearest(y, g) + dir
      if (next < 0 || next >= n) return false
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
  }, [useStatic, n])

  // Deep-link from header/footer → focus the clicked company + scroll here
  useEffect(() => {
    const focus = (id: string) => {
      const idx = COMPANY_INDEX[id]
      if (idx == null) return
      suppressRef.current = performance.now() + 1600
      requestAnimationFrame(() => {
        if (useStatic) {
          document.getElementById(`eg-co-card-${idx}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
          return
        }
        const el = stageRef.current
        if (!el) return
        const top = el.getBoundingClientRect().top + window.scrollY
        const scrollable = Math.max(1, el.offsetHeight - window.innerHeight)
        window.scrollTo({ top: top + (idx / (n - 1)) * scrollable, behavior: 'smooth' })
      })
    }
    const pending = takePending('company')
    if (pending) setTimeout(() => focus(pending), 350)
    const handler = (e: Event) => { const id = (e as CustomEvent).detail?.id; if (id) focus(id) }
    window.addEventListener('eg:company', handler)
    return () => window.removeEventListener('eg:company', handler)
  }, [useStatic, n])

  const openCompany = (i: number) => navigate(COMPANIES[i].to)

  return (
    <section className="eg-co" id="our-companies" aria-label="Our companies">
      <style>{`
        .eg-co { background: ${NAVY}; overflow-x: clip; }

        /* ── pinned full-screen horizontal stage ── */
        .eg-co-stage { position: relative; height: ${100 + (n - 1) * 82}vh; }
        .eg-acc-sticky { position: sticky; top: 0; height: 100vh; overflow: hidden; background: ${NAVY}; }
        .eg-acc-track { display: flex; height: 100%; will-change: transform; }

        .eg-acc-panel {
          position: relative; flex: 0 0 ${PANEL_VW}vw; height: 100%;
          overflow: hidden; cursor: pointer; background: var(--tint);
          --pad-l: clamp(76px, 14vw, 300px);
          --pad-b: clamp(100px, 17vh, 220px);
        }

        /* image framed top-right; the tint shows through as an L (left + bottom) */
        .eg-acc-media { position: absolute; top: 0; right: 0; left: var(--pad-l); bottom: var(--pad-b); overflow: hidden; }
        .eg-acc-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; will-change: transform; }
        .eg-acc-shade {
          position: absolute; inset: 0; pointer-events: none;
          background:
            linear-gradient(180deg, rgba(10,18,28,0.10) 0%, rgba(10,18,28,0) 40%, rgba(10,18,28,0.34) 100%),
            linear-gradient(90deg, rgba(10,18,28,0.30) 0%, rgba(10,18,28,0) 42%);
        }

        /* intersecting hairlines - full-length across image + solid; horizontal line
           sits one band-height above the bottom band (just under the tagline) */
        .eg-acc-vline { position: absolute; top: 0; bottom: 0; right: var(--pad-l); width: 1px; background: rgba(255,255,255,0.38); z-index: 4; pointer-events: none; }
        .eg-acc-hline { position: absolute; left: 0; right: 0; bottom: calc(var(--pad-b) * 2); height: 1px; background: rgba(255,255,255,0.38); z-index: 4; pointer-events: none; }

        /* the name sits low in the bottom band, its top grazing onto the image */
        .eg-acc-title {
          position: absolute; left: clamp(20px, 2.4vw, 52px);
          bottom: clamp(30px, 4.5vh, 84px);
          margin: 0; z-index: 5; pointer-events: none; white-space: nowrap;
          font-family: 'Poppins', sans-serif; font-weight: 300; letter-spacing: -0.01em; line-height: 0.95;
          font-size: clamp(38px, 6.4vw, 120px); color: #ffffff; text-shadow: 0 2px 34px rgba(0,0,0,0.32);
        }

        .eg-acc-copy {
          position: absolute; left: calc(var(--pad-l) + clamp(18px, 1.8vw, 40px)); right: clamp(22px, 2.6vw, 56px);
          bottom: calc(var(--pad-b) * 2 + clamp(14px, 2vh, 30px)); z-index: 6;
          display: flex; align-items: flex-end; justify-content: space-between; gap: 28px;
        }
        .eg-acc-tag {
          font-family: 'Inter', sans-serif; font-weight: 500; color: rgba(255,255,255,0.96);
          font-size: clamp(15px, 1.4vw, 22px); line-height: 1.4; max-width: 26ch;
          text-shadow: 0 2px 16px rgba(0,0,0,0.55);
        }
        .eg-acc-link {
          flex-shrink: 0; display: inline-flex; align-items: center; gap: 8px;
          font-family: 'Poppins', sans-serif; font-weight: 600; text-transform: uppercase;
          font-size: clamp(11px, 0.9vw, 14px); letter-spacing: 1.5px; color: #fff;
          background: none; border: none; cursor: pointer; padding: 10px 4px;
          border-bottom: 2px solid rgba(255,255,255,0.6);
          transition: color 0.25s ease, border-color 0.25s ease, gap 0.25s ease;
        }
        .eg-acc-link:hover { color: ${GREEN}; border-color: ${GREEN}; gap: 12px; }
        .eg-acc-link svg { transition: transform 0.25s ease; }
        .eg-acc-link:hover svg { transform: translate(2px, -2px); }

        /* ── mobile / reduced-motion: vertical full-bleed cards ── */
        @media (max-width: 767px) {
          .eg-co-stage { height: auto; }
          .eg-acc-sticky { position: static; height: auto; }
          .eg-acc-track { flex-direction: column; height: auto; }
          .eg-acc-panel { flex: none; width: 100%; height: clamp(340px, 74vw, 460px); border-top: 1px solid rgba(255,255,255,0.10); --pad-l: 0px; --pad-b: 0px; }
          .eg-acc-panel:first-child { border-top: none; }
          .eg-acc-vline, .eg-acc-hline { display: none; }
          .eg-acc-copy { opacity: 1 !important; top: auto; bottom: clamp(20px, 6vw, 30px); transform: none; flex-direction: column; align-items: flex-start; gap: 14px; }
          .eg-acc-title { font-size: clamp(34px, 9vw, 60px); bottom: auto; top: clamp(20px, 6vw, 30px); white-space: normal; max-width: 12ch; }
        }
        @media (min-width: 1920px) {
          .eg-acc-title { font-size: 132px; }
          .eg-acc-tag { font-size: 24px; }
        }
        @media (min-width: 2560px) {
          .eg-acc-title { font-size: 176px; }
          .eg-acc-tag { font-size: 30px; }
          .eg-acc-link { font-size: 17px; }
        }
      `}</style>

      <div className="eg-co-stage" ref={stageRef}>
        <div className="eg-acc-sticky">
          <motion.div className="eg-acc-track" style={useStatic ? undefined : { x }} role="tablist">
            {COMPANIES.map((c, i) => (
              <Panel
                key={c.slug}
                c={c}
                i={i}
                n={n}
                progress={scrollYProgress}
                useStatic={useStatic}
                onOpen={() => openCompany(i)}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
