import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { Plane, Ship, Headset, ArrowLeftRight, ArrowRight } from 'lucide-react'
import { CountUp } from './egScroll'
import { takePending } from '../../utils/sectionLink'

/* ═══════════════════════════════════════════════════
   OUR CORE BUSINESSES - Clean marble bento grid.
   Six marble cards, ghost number in the top-right corner,
   blue line-art icons on the marble, uppercase titles,
   count-up stats, a tan "Explore Solutions" button and a
   crossing map-lines illustration with travelling dots on
   Supply Chain. The featured card carries a faint node-graph
   watermark; the cargo card grows a live mini bar chart.
   Hover: smooth lift + growing accent line + marble sheen.
   Header/footer deep-links (eg:business) scroll to and glow
   the matching card.
   ═══════════════════════════════════════════════════ */

const NAVY  = '#13293D'
const GRAY  = '#A2AEB8'                 // "businesses" word
const BLUE  = '#2E6FE0'                 // icons + accent
const MUTED = 'rgba(19,41,61,0.55)'
const GOLD  = '#B79768'                 // supply-chain map accents
const EASE  = [0.16, 1, 0.3, 1] as [number, number, number, number]

/* ── custom line icons to match the reference ── */
function NodeGraph() {
  const cx = 24, cy = 24, R = 15
  const pts = [-90, -30, 30, 90, 150, 210].map((a) => {
    const r = (a * Math.PI) / 180
    return [cx + R * Math.cos(r), cy + R * Math.sin(r)] as const
  })
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round">
      {pts.map(([x, y], i) => <line key={i} x1={cx} y1={cy} x2={x} y2={y} />)}
      {pts.map(([x, y], i) => <circle key={`n${i}`} cx={x} cy={y} r={2.6} fill="#fff" />)}
      <circle cx={cx} cy={cy} r={3.7} fill="#fff" />
    </svg>
  )
}

/* faint background watermark version (no fills, just the graph) */
function NodeGraphMark() {
  const cx = 24, cy = 24, R = 15
  const pts = [-90, -30, 30, 90, 150, 210].map((a) => {
    const r = (a * Math.PI) / 180
    return [cx + R * Math.cos(r), cy + R * Math.sin(r)] as const
  })
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round">
      {pts.map(([x, y], i) => <line key={i} x1={cx} y1={cy} x2={x} y2={y} />)}
      {pts.map(([x, y], i) => <circle key={`n${i}`} cx={x} cy={y} r={2.6} />)}
      <circle cx={cx} cy={cy} r={3.7} />
    </svg>
  )
}

/* live mini bar chart that grows on scroll-in */
function MiniBars() {
  const bars = [0.4, 0.62, 0.48, 0.82, 1]
  return (
    <span className="egb-bars" aria-hidden>
      {bars.map((h, i) => (
        <motion.i
          key={i}
          style={{ height: `${h * 100}%` }}
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, delay: 0.15 + i * 0.09, ease: EASE }}
        />
      ))}
    </span>
  )
}

function MapLines() {
  const bluePath = 'M6 64 L44 40 L74 52 L114 22'
  const goldPath = 'M24 74 L58 44 L92 62'
  return (
    <svg className="egb-map" viewBox="0 0 120 84" fill="none" strokeLinecap="round" aria-hidden>
      <g stroke={BLUE} strokeWidth={1.5} opacity={0.9}>
        <path d={bluePath} />
        <path d="M10 16 L40 46 L66 26 L110 60" />
        <path d="M2 40 H116" opacity={0.35} />
        <path d="M60 4 V80" opacity={0.35} />
      </g>
      <g stroke={GOLD} strokeWidth={1.6}>
        <path d={goldPath} />
      </g>
      <g fill="#fff" stroke={BLUE} strokeWidth={1.5}>
        <circle cx="44" cy="40" r="3.2" />
        <circle cx="74" cy="52" r="3.2" />
      </g>
      <g fill="#fff" stroke={GOLD} strokeWidth={1.6}>
        <circle cx="58" cy="44" r="3.4" />
      </g>
      {/* travelling dots */}
      <circle className="egb-trav" r={2.6} fill={BLUE}>
        <animateMotion dur="3.6s" repeatCount="indefinite" path={bluePath}
          calcMode="spline" keyPoints="0;1" keyTimes="0;1" keySplines="0.4 0 0.2 1" />
        <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.15;0.85;1" dur="3.6s" repeatCount="indefinite" />
      </circle>
      <circle className="egb-trav" r={2.6} fill={GOLD}>
        <animateMotion dur="3.2s" begin="0.8s" repeatCount="indefinite" path={goldPath}
          calcMode="spline" keyPoints="0;1" keyTimes="0;1" keySplines="0.4 0 0.2 1" />
        <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.15;0.85;1" dur="3.2s" begin="0.8s" repeatCount="indefinite" />
      </circle>
    </svg>
  )
}

type Stat = { n: number; suffix?: string; l: string }
type Biz = {
  key: string
  area: string
  no: string
  variant: 'featured' | 'header' | 'compact' | 'plain' | 'supply'
  title: string
  body: string
  stats?: Stat[]
  cta?: string
}

const BUSINESSES: Biz[] = [
  {
    key: 'it-infrastructure', area: 'it', no: '01', variant: 'featured',
    title: 'IT Infrastructure & Network',
    body: 'Network architecture and connected infrastructure - enterprise systems, cloud and continuity solutions.',
    stats: [{ n: 360, suffix: '+', l: 'Endpoints' }, { n: 164, l: 'Systems' }, { n: 42, suffix: '+', l: 'Clients' }],
    cta: 'Explore Solutions',
  },
  {
    key: 'travel', area: 'travel', no: '02', variant: 'header',
    title: 'Global Travel & Logistics',
    body: 'Global travel and logistics - land, sea and air freight, corporate travel and international mobility.',
  },
  {
    key: 'cargo', area: 'cargo', no: '03', variant: 'compact',
    title: 'Cargo & Freight Analytics',
    body: 'Live cargo volume and shipment analytics.',
  },
  {
    key: 'imports', area: 'import', no: '04', variant: 'plain',
    title: 'International Import / Export',
    body: 'Cross-border trade, maritime shipping and international import and export operations.',
  },
  {
    key: 'call-centre', area: 'call', no: '05', variant: 'header',
    title: 'Integrated Call Center & Support',
    body: 'Integrated call centre and customer support - staffed operations, on demand and around the clock.',
    stats: [{ n: 500, suffix: '+', l: 'Agents' }, { n: 42, suffix: '+', l: 'Support' }, { n: 6, l: 'Clients' }],
  },
  {
    key: 'supply-chain', area: 'supply', no: '06', variant: 'supply',
    title: 'Supply Chain Optimization',
    body: 'Dynamic routing and map-based optimization that keeps the whole network efficient.',
  },
]

/* ── card icon(s) per variant ── */
function CardIcon({ k }: { k: string }) {
  if (k === 'it-infrastructure') return <span className="egb-ic"><NodeGraph /></span>
  if (k === 'travel') return (
    <span className="egb-ic egb-ic-dual">
      <Plane strokeWidth={1.6} /><Ship strokeWidth={1.6} />
    </span>
  )
  if (k === 'cargo') return (
    <span className="egb-ic egb-viz">
      <Ship strokeWidth={1.6} /><MiniBars />
    </span>
  )
  if (k === 'call-centre') return <span className="egb-ic"><Headset strokeWidth={1.6} /></span>
  if (k === 'supply-chain') return <span className="egb-ic"><ArrowLeftRight strokeWidth={1.6} /></span>
  return null
}

/* ── one marble bento card ── */
function BizCard({
  b, i, anim, highlight,
}: {
  b: Biz
  i: number
  anim: boolean
  highlight: boolean
}) {
  const navigate = useNavigate()
  const Stats = b.stats ? (
    <div className="egb-stats">
      {b.stats.map((s) => (
        <div className="egb-stat" key={s.l}>
          <CountUp className="egb-stat-v" to={s.n} suffix={s.suffix ?? ''} duration={1.4} />
          <span className="egb-stat-l">{s.l}</span>
        </div>
      ))}
    </div>
  ) : null

  return (
    <motion.div
      className="egb-cell"
      style={{ gridArea: b.area }}
      initial={anim ? { opacity: 0, y: 26 } : false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{ duration: 0.75, ease: EASE, delay: i * 0.07 }}
    >
      <div id={`biz-${b.key}`} className={`egb-card v-${b.variant}${highlight ? ' lit' : ''}`}>
        <span className="egb-accent" aria-hidden />
        {b.variant === 'featured' && (
          <span className="egb-watermark" aria-hidden><NodeGraphMark /></span>
        )}
        <span className="egb-no">{b.no}</span>

        {b.variant === 'featured' && (
          <>
            <CardIcon k={b.key} />
            <h3 className="egb-title">{b.title}</h3>
            <p className="egb-text">{b.body}</p>
            {Stats}
            <button type="button" className="egb-cta" onClick={() => navigate('/contact#contact-form')}>
              {b.cta}<ArrowRight strokeWidth={2.2} />
            </button>
          </>
        )}

        {b.variant === 'header' && (
          <>
            <div className="egb-hd">
              <CardIcon k={b.key} />
              <h3 className="egb-title">{b.title}</h3>
            </div>
            <p className="egb-text">{b.body}</p>
            {Stats}
          </>
        )}

        {b.variant === 'compact' && (
          <>
            <CardIcon k={b.key} />
            <h3 className="egb-title egb-title-sm">{b.title}</h3>
            <p className="egb-text">{b.body}</p>
          </>
        )}

        {b.variant === 'plain' && (
          <>
            <h3 className="egb-title">{b.title}</h3>
            <p className="egb-text">{b.body}</p>
          </>
        )}

        {b.variant === 'supply' && (
          <div className="egb-supply">
            <div className="egb-supply-l">
              <CardIcon k={b.key} />
              <h3 className="egb-title">{b.title}</h3>
              <p className="egb-text">{b.body}</p>
            </div>
            <MapLines />
          </div>
        )}

        <span className="egb-sheen" aria-hidden />
      </div>
    </motion.div>
  )
}

export function EgBusinesses() {
  const reduce = useReducedMotion() ?? false
  const sectionRef = useRef<HTMLElement>(null)
  const [mobile, setMobile] = useState(false)
  const [lit, setLit] = useState<string | null>(null)

  const anim = !mobile && !reduce

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const on = () => setMobile(mq.matches)
    on()
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])

  // Deep-link from header/footer → scroll to the matching card and glow it
  useEffect(() => {
    let clear: ReturnType<typeof setTimeout>
    const focus = (id: string) => {
      if (!BUSINESSES.some((x) => x.key === id)) return
      setLit(id)
      requestAnimationFrame(() => {
        const el = document.getElementById(`biz-${id}`) ?? sectionRef.current
        el?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      })
      clearTimeout(clear)
      clear = setTimeout(() => setLit(null), 2400)
    }
    const pending = takePending('business')
    if (pending) setTimeout(() => focus(pending), 350)
    const handler = (e: Event) => { const id = (e as CustomEvent).detail?.id; if (id) focus(id) }
    window.addEventListener('eg:business', handler)
    return () => { window.removeEventListener('eg:business', handler); clearTimeout(clear) }
  }, [])

  return (
    <section className="egb" id="our-businesses" aria-label="Our core businesses" ref={sectionRef}>
      <style>{`
        .egb {
          position: relative; overflow-x: hidden;
          padding: clamp(56px, 8vw, 130px) 45px;
          background:
            radial-gradient(60% 55% at 12% 30%, rgba(60,185,140,0.05), transparent 60%),
            linear-gradient(180deg, #ffffff 0%, #fbfaf8 100%);
        }
        .egb-in { position: relative; max-width: none; margin: 0 auto; }

        /* ── header ── */
        .egb-h {
          font-family: 'Poppins', sans-serif; font-weight: 800; text-transform: uppercase;
          font-size: clamp(30px, 4.6vw, 68px); line-height: 0.96; letter-spacing: -0.035em;
          color: ${NAVY}; margin: 0 0 clamp(24px, 3.4vw, 46px);
        }
        .egb-h em { color: ${GRAY}; font-style: normal; font-weight: 800; }

        /* ── bento grid ── */
        .egb-grid {
          display: grid; gap: clamp(12px, 1.2vw, 20px);
          grid-template-columns: repeat(4, 1fr);
          grid-auto-rows: minmax(0, auto);
          grid-template-areas:
            "it it travel travel"
            "it it cargo  import"
            "call call supply supply";
        }
        .egb-cell { min-width: 0; will-change: transform, opacity; }

        /* ── marble card ── */
        .egb-card {
          position: relative; height: 100%; box-sizing: border-box; overflow: hidden;
          display: flex; flex-direction: column;
          padding: clamp(20px, 1.9vw, 34px);
          border-radius: clamp(16px, 1.2vw, 22px);
          will-change: transform;
          background-color: #fdfcfb;
          background-image:
            radial-gradient(150% 100% at 12% 2%, rgba(255,255,255,0.98), transparent 46%),
            radial-gradient(120% 120% at 98% 106%, rgba(214,206,192,0.42), transparent 52%),
            linear-gradient(118deg, transparent 33%, rgba(19,41,61,0.045) 39%, transparent 42%),
            linear-gradient(126deg, transparent 59%, rgba(150,130,95,0.09) 64%, transparent 67%),
            linear-gradient(100deg, transparent 77%, rgba(19,41,61,0.03) 81%, transparent 85%),
            linear-gradient(160deg, #ffffff, #f5f1ea);
          border: 1px solid rgba(19,41,61,0.08);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.95),
            0 2px 4px rgba(19,41,61,0.04),
            0 22px 42px -26px rgba(19,41,61,0.30),
            0 8px 18px -12px rgba(19,41,61,0.14);
          transition:
            transform 0.5s cubic-bezier(0.16,1,0.3,1),
            box-shadow 0.5s ease,
            border-color 0.5s ease;
        }
        .egb-card:hover {
          transform: translateY(-8px);
          border-color: rgba(46,111,224,0.28);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,1),
            0 3px 6px rgba(19,41,61,0.05),
            0 46px 76px -30px rgba(19,41,61,0.38),
            0 16px 30px -16px rgba(19,41,61,0.20);
        }
        .egb-card.lit {
          border-color: ${BLUE};
          box-shadow: 0 40px 70px -28px rgba(46,111,224,0.5), 0 0 0 2px ${BLUE};
        }
        .egb-card.v-featured { padding: clamp(24px, 2.3vw, 42px); }

        /* faint node-graph watermark on the featured card */
        .egb-watermark {
          position: absolute; right: -4%; bottom: -8%; width: clamp(150px, 20vw, 300px); z-index: 0;
          color: ${BLUE}; opacity: 0.06; pointer-events: none; transform: rotate(-8deg);
        }
        .egb-watermark svg { width: 100%; height: auto; }

        /* accent line grows from centre on hover */
        .egb-accent {
          position: absolute; left: 0; right: 0; top: 0; height: 3px; pointer-events: none; z-index: 2;
          background: linear-gradient(90deg, transparent, ${BLUE}, transparent);
          transform: scaleX(0); transform-origin: center; opacity: 0;
          transition: transform 0.55s cubic-bezier(0.16,1,0.3,1), opacity 0.4s ease;
        }
        .egb-card:hover .egb-accent { transform: scaleX(1); opacity: 1; }
        .egb-card.lit .egb-accent { transform: scaleX(1); opacity: 1; }

        /* marble sheen sweep on hover */
        .egb-sheen {
          position: absolute; inset: -30% -60%; pointer-events: none; transform: translateX(-45%); z-index: 1;
          background: linear-gradient(115deg, transparent 43%, rgba(255,255,255,0.55) 50%, transparent 57%);
          opacity: 0; transition: opacity 0.5s ease, transform 0.9s ease;
        }
        .egb-card:hover .egb-sheen { opacity: 0.8; transform: translateX(45%); }

        /* content sits above the decorative layers (watermark z0, sheen z1) */
        .egb-ic, .egb-hd, .egb-title, .egb-text, .egb-stats, .egb-cta, .egb-supply {
          position: relative; z-index: 2;
        }

        /* ghost number in corner */
        .egb-no {
          position: absolute; top: clamp(14px, 1.4vw, 24px); right: clamp(16px, 1.5vw, 26px);
          font-family: 'Poppins', sans-serif; font-weight: 800; letter-spacing: -0.03em;
          font-size: clamp(22px, 1.9vw, 34px); line-height: 1;
          color: rgba(19,41,61,0.05);
          -webkit-text-stroke: 1.3px rgba(19,41,61,0.32);
          transition: -webkit-text-stroke-color 0.4s ease, color 0.4s ease;
        }
        .egb-card:hover .egb-no { -webkit-text-stroke-color: ${BLUE}; }
        .egb-card.v-featured .egb-no { font-size: clamp(34px, 3.2vw, 58px); -webkit-text-stroke-width: 1.6px; }

        /* blue line icons directly on the marble */
        .egb-ic { display: inline-flex; align-items: center; gap: 10px; color: ${BLUE};
          margin-bottom: clamp(16px, 1.8vw, 26px);
          transition: transform 0.5s cubic-bezier(0.16,1,0.3,1); }
        .egb-card:hover .egb-ic { transform: translateY(-3px); }
        .egb-ic svg { width: clamp(30px, 2.6vw, 42px); height: auto; }
        .egb-ic-dual svg { width: clamp(26px, 2.1vw, 34px); }
        .egb-card.v-featured .egb-ic svg { width: clamp(40px, 3.4vw, 56px); }

        /* mini bar chart (cargo card) */
        .egb-viz { align-items: flex-end; gap: 14px; }
        .egb-viz svg { width: clamp(30px, 2.6vw, 40px); }
        .egb-bars { display: inline-flex; align-items: flex-end; gap: 5px;
          width: clamp(46px, 4vw, 62px); height: clamp(30px, 2.6vw, 40px); }
        .egb-bars i {
          flex: 1; min-height: 4px; border-radius: 3px 3px 1px 1px; transform-origin: bottom;
          background: linear-gradient(180deg, ${BLUE}, rgba(46,111,224,0.55));
        }

        .egb-hd { display: flex; align-items: flex-start; gap: clamp(12px, 1.2vw, 18px); margin-bottom: clamp(10px, 1vw, 14px); }
        .egb-hd .egb-ic { margin-bottom: 0; flex: none; }
        .egb-hd .egb-title { margin: clamp(2px, 0.4vw, 6px) 0 0; }

        .egb-title {
          font-family: 'Poppins', sans-serif; font-weight: 700; text-transform: uppercase;
          letter-spacing: -0.01em; font-size: clamp(16px, 1.25vw, 23px); line-height: 1.14;
          color: ${NAVY}; margin: 0 0 clamp(9px, 0.9vw, 13px); max-width: 20ch;
        }
        .egb-title-sm { font-size: clamp(14px, 1vw, 18px); }
        .egb-card.v-featured .egb-title { font-size: clamp(21px, 1.9vw, 34px); }
        .egb-text {
          font-family: 'Inter', sans-serif; font-size: clamp(12.5px, 0.9vw, 15px);
          line-height: 1.6; color: ${MUTED}; margin: 0; max-width: 44ch;
        }

        /* stats with dividers */
        .egb-stats {
          display: flex; flex-wrap: wrap; align-items: flex-end;
          margin-top: auto; padding-top: clamp(16px, 1.7vw, 24px);
          gap: clamp(14px, 1.6vw, 28px); border-top: 1px solid rgba(19,41,61,0.12);
        }
        .egb-stat { position: relative; display: flex; flex-direction: column; gap: 4px;
          padding-left: clamp(14px, 1.6vw, 28px); }
        .egb-stat:first-child { padding-left: 0; }
        .egb-stat + .egb-stat::before {
          content: ''; position: absolute; left: 0; top: 5px; bottom: 2px; width: 1px;
          background: rgba(19,41,61,0.16);
        }
        .egb-stat-v {
          font-family: 'Poppins', sans-serif; font-weight: 800; letter-spacing: -0.03em;
          font-size: clamp(22px, 1.9vw, 34px); line-height: 1; color: ${NAVY};
          font-variant-numeric: tabular-nums;
        }
        .egb-stat-l {
          font-family: 'Inter', sans-serif; font-weight: 600; text-transform: uppercase;
          letter-spacing: 1px; font-size: clamp(9.5px, 0.68vw, 11.5px); color: ${MUTED};
        }

        /* tan explore button */
        .egb-cta {
          align-self: flex-start; margin-top: clamp(18px, 1.9vw, 28px);
          display: inline-flex; align-items: center; gap: 8px; cursor: pointer;
          font-family: 'Inter', sans-serif; font-weight: 700; letter-spacing: 0.6px;
          font-size: clamp(11px, 0.82vw, 13px); text-transform: uppercase; color: #B0894A;
          padding: clamp(11px, 0.95vw, 15px) clamp(18px, 1.5vw, 26px);
          min-height: 44px; border: 1.5px solid rgba(176,137,74,0.55); border-radius: 8px;
          background: none;
          transition: background .4s ease, color .4s ease, border-color .4s ease, box-shadow .4s ease;
        }
        .egb-cta svg { width: 15px; height: 15px; transition: transform .4s cubic-bezier(0.16,1,0.3,1); }
        .egb-cta:hover {
          background: #B0894A; color: #fff; border-color: #B0894A;
          box-shadow: 0 16px 30px -12px rgba(176,137,74,0.55);
        }
        .egb-cta:hover svg { transform: translateX(6px); }

        /* supply chain split layout with map illustration */
        .egb-supply { display: flex; align-items: center; gap: clamp(18px, 3vw, 48px); height: 100%; }
        .egb-supply-l { flex: 1 1 auto; min-width: 0; }
        .egb-map { flex: none; width: clamp(120px, 16vw, 210px); height: auto;
          transition: transform 0.6s cubic-bezier(0.16,1,0.3,1); }
        .egb-card:hover .egb-map { transform: scale(1.05); }

        /* ── responsive ── */
        @media (max-width: 1023px) {
          .egb-grid {
            grid-template-columns: repeat(2, 1fr);
            grid-template-areas:
              "it it"
              "travel travel"
              "cargo import"
              "call call"
              "supply supply";
          }
        }
        @media (max-width: 767px) {
          .egb-grid {
            grid-template-columns: 1fr;
            grid-template-areas: "it" "travel" "cargo" "import" "call" "supply";
          }
          .egb-supply { flex-direction: column; align-items: flex-start; gap: 20px; }
          .egb-map { width: min(220px, 60%); }
        }
        @media (max-width: 400px) { .egb-stats { gap: 12px; } }

        /* ── large screens ── */
        @media (min-width: 1920px) { .egb-in { max-width: none; } }
        @media (min-width: 2560px) { .egb-in { max-width: none; } }

        @media (prefers-reduced-motion: reduce) {
          .egb-card, .egb-cta, .egb-sheen, .egb-ic, .egb-map, .egb-accent { transition: none; }
          .egb-trav { display: none; }
        }
      `}</style>

      <div className="egb-in">
        <motion.h2
          className="egb-h"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.75, ease: EASE }}
        >
          Our core <em>businesses</em>
        </motion.h2>

        <div className="egb-grid">
          {BUSINESSES.map((b, i) => (
            <BizCard key={b.key} b={b} i={i} anim={anim} highlight={lit === b.key} />
          ))}
        </div>
      </div>
    </section>
  )
}
