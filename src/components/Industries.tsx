import { useState, useEffect } from 'react'
import {
  ShoppingCart, Car, Heart, Factory,
  UtensilsCrossed, HardHat, Wheat, Shirt,
  Truck, Package, Globe, MapPin, Clock, Zap, Shield,
  BarChart2, Navigation, Box, CheckCircle,
  Layers, Archive, Tag, Building2,
  Anchor, Plane, Activity, Gauge, Briefcase, Calendar,
  RotateCcw, Thermometer, Leaf, Scissors,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { industries } from '../data/industries'
import type { Industry } from '../data/industries'

const GREEN  = '#3CB98C'
const NAVY   = '#08213C'
const BORDER = 'rgba(8,33,60,0.08)'

/* ─── Card face data ─────────────────────────────────────────── */
type FaceMeta = {
  bg:     string   // subtle tinted white
  accent: string
  Icon:   React.ElementType
  tags:   [string, string]
}

const FACE_META: Record<string, FaceMeta> = {
  'FMCG':                { bg: '#f0fdf8', accent: '#0d9a6a', Icon: ShoppingCart,    tags: ['Same Day',      'Last Mile']       },
  'Automotive':          { bg: '#eff6ff', accent: '#1d6ef5', Icon: Car,             tags: ['Just-in-Time',  'Nationwide']      },
  'Pharma & Healthcare': { bg: '#faf5ff', accent: '#8b3cf7', Icon: Heart,           tags: ['Cold Chain',    'Compliant']       },
  'Manufacturing':       { bg: '#f0f9ff', accent: '#0284c7', Icon: Factory,         tags: ['Bulk Freight',  '24 / 7 GPS']      },
  'Restaurants & Food':  { bg: '#fff7ed', accent: '#ea6f13', Icon: UtensilsCrossed, tags: ['Temp Control',  'Daily Runs']      },
  'Construction':        { bg: '#fffbeb', accent: '#c07a0a', Icon: HardHat,         tags: ['Heavy Freight', 'Site Delivery']   },
  'Agricultural':        { bg: '#f0fdf4', accent: '#15803d', Icon: Wheat,           tags: ['Seasonal',      'Rural Routes']    },
  'Fashion & Lifestyle': { bg: '#fdf4ff', accent: '#be185d', Icon: Shirt,           tags: ['Express',       'Retail Rollouts'] },
}

/* ─── Card face ─────────────────────────────────────────────── */
function CardFace({ industry, back, innerRadius }: {
  industry: Industry; back?: boolean; innerRadius?: React.CSSProperties
}) {
  const m = FACE_META[industry.name]
  if (!m) return null

  return (
    <div style={{
      position: 'absolute', inset: 0,
      backfaceVisibility: 'hidden',
      WebkitBackfaceVisibility: 'hidden' as never,
      transform: back ? 'rotateY(180deg)' : 'none',
      background: m.bg,
      display: 'flex', flexDirection: 'column',
      overflow: 'hidden',
      ...innerRadius,
    }}>

      {/* 2px top accent bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
        background: m.accent, opacity: 0.85,
      }} />

      {/* Very soft ambient wash behind icon */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `radial-gradient(ellipse 85% 55% at 50% 34%, ${m.accent}18 0%, transparent 62%)`,
      }} />

      {/* Icon — centred in upper ~58% */}
      <div style={{
        flex: 1,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        paddingBottom: '6px', position: 'relative',
      }}>
        <div style={{
          width: '56px', height: '56px',
          borderRadius: '15px',
          background: '#ffffff',
          border: `1px solid ${m.accent}22`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: `0 4px 18px ${m.accent}22, 0 1px 4px rgba(0,0,0,0.05)`,
        }}>
          <m.Icon size={25} color={m.accent} strokeWidth={1.6} />
        </div>
      </div>

      {/* Hairline separator */}
      <div style={{
        height: '1px', margin: '0 14px',
        background: `rgba(8,33,60,0.07)`,
      }} />

      {/* Bottom content */}
      <div style={{ padding: '12px 14px 14px' }}>
        <div style={{
          fontSize: 'clamp(11.5px, 1.4vw, 15.5px)',
          fontWeight: 700, color: NAVY,
          letterSpacing: '-0.025em', lineHeight: 1.2,
          marginBottom: '8px',
        }}>
          {industry.name}
        </div>
        <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
          {m.tags.map(tag => (
            <span key={tag} style={{
              fontSize: '7.5px', fontWeight: 700, letterSpacing: '0.6px',
              padding: '3px 8px', borderRadius: '4px',
              background: `${m.accent}12`,
              color: m.accent,
              textTransform: 'uppercase',
              border: `1px solid ${m.accent}26`,
            }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─── Flip card shell ────────────────────────────────────────── */
const PAIRS: [Industry, Industry][] = [
  [industries[0], industries[4]],
  [industries[1], industries[5]],
  [industries[2], industries[6]],
  [industries[3], industries[7]],
]

const FLIP_CONFIG = [
  { interval: 5200, delay: 700  },
  { interval: 6600, delay: 2400 },
  { interval: 4900, delay: 1600 },
  { interval: 7200, delay: 3600 },
]

// 10-column grid (gridAutoRows = 9vw), 6 rows total
// 1 full row above cards, 4 rows parallel (cols 1–3 + 8–10 alongside cards), 1 full row below
const CARD_POS = [
  { gridColumn: '4 / span 2', gridRow: '2 / span 2' },
  { gridColumn: '6 / span 2', gridRow: '2 / span 2' },
  { gridColumn: '4 / span 2', gridRow: '4 / span 2' },
  { gridColumn: '6 / span 2', gridRow: '4 / span 2' },
]

// Outer corner (diagonally opposite to centre gap) stays square; other 3 corners rounded
const CARD_INNER_RADIUS: React.CSSProperties[] = [
  { borderTopRightRadius: '9px', borderBottomRightRadius: '9px', borderBottomLeftRadius: '9px' }, // top-left   → top-left sharp
  { borderTopLeftRadius:  '9px', borderBottomRightRadius: '9px', borderBottomLeftRadius: '9px' }, // top-right  → top-right sharp
  { borderTopLeftRadius:  '9px', borderTopRightRadius:    '9px', borderBottomRightRadius: '9px'}, // bottom-left → bottom-left sharp
  { borderTopLeftRadius:  '9px', borderTopRightRadius:    '9px', borderBottomLeftRadius:  '9px'}, // bottom-right → bottom-right sharp
]

function FlipCard({ pairIdx, flipped, onFlip, innerRadius }: {
  pairIdx: number; flipped: boolean; onFlip: () => void
  innerRadius: React.CSSProperties
}) {
  const [front, back] = PAIRS[pairIdx]
  const [hov, setHov] = useState(false)

  return (
    <div
      onClick={onFlip}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ height: '100%', perspective: '1200px', cursor: 'pointer', position: 'relative' }}
    >
      {/* Flip hint */}
      <div style={{
        position: 'absolute', top: '9px', right: '10px', zIndex: 10,
        display: 'flex', alignItems: 'center', gap: '3px',
        fontSize: '8px', fontWeight: 700, letterSpacing: '0.8px',
        textTransform: 'uppercase', color: 'rgba(8,33,60,0.3)',
        opacity: hov ? 1 : 0.6,
        transition: 'opacity 0.25s', pointerEvents: 'none',
      }}>
        <RotateCcw size={9} strokeWidth={2.5} style={{
          color: hov ? 'rgba(8,33,60,0.55)' : 'rgba(8,33,60,0.28)',
          transform: hov ? 'rotate(-180deg)' : 'rotate(0deg)',
          transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1)',
        }} />
        flip
      </div>

      <div style={{
        position: 'relative', width: '100%', height: '100%',
        transformStyle: 'preserve-3d',
        transition: 'transform 0.78s cubic-bezier(0.16, 1, 0.3, 1)',
        transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
      }}>
        <CardFace industry={front} innerRadius={innerRadius} />
        <CardFace industry={back} back innerRadius={innerRadius} />
      </div>
    </div>
  )
}

/* ─── Surrounding small cells ────────────────────────────────── */
const ITEMS = [
  { icon: Truck,           label: 'Road Freight'    },
  { icon: Building2,       label: 'Warehousing'     },
  { icon: Globe,           label: 'International'   },
  { icon: MapPin,          label: 'Regional'        },
  { icon: Clock,           label: 'Same Day'        },
  { icon: Zap,             label: 'Express'         },
  { icon: Shield,          label: 'Insured Cargo'   },
  { icon: Package,         label: 'Pallet Services' },
  { icon: BarChart2,       label: 'Live Tracking'   },
  { icon: Navigation,      label: 'GPS Fleet'       },
  { icon: Box,             label: 'Cross-Dock'      },
  { icon: CheckCircle,     label: 'HACCP Cert'      },
  { icon: Layers,          label: 'Multi-Mode'      },
  { icon: Archive,         label: 'Storage'         },
  { icon: Tag,             label: 'Customs'         },
  { icon: Anchor,          label: 'Port Logistics'  },
  { icon: Plane,           label: 'Air Freight'     },
  { icon: Activity,        label: 'Real-Time'       },
  { icon: Gauge,           label: 'On-Time 96%'     },
  { icon: Briefcase,       label: 'Contract'        },
  { icon: Calendar,        label: 'Scheduling'      },
  { icon: Thermometer,     label: 'Cold Chain'      },
  { icon: Leaf,            label: 'Sustainable'     },
  { icon: Scissors,        label: 'Fashion Freight' },
  { icon: ShoppingCart,    label: 'FMCG'            },
  { icon: Heart,           label: 'Healthcare'      },
  { icon: Factory,         label: 'Manufacturing'   },
  { icon: HardHat,         label: 'Construction'    },
  { icon: Wheat,           label: 'Agricultural'    },
  { icon: Car,             label: 'Automotive'      },
  { icon: UtensilsCrossed, label: 'Restaurants'     },
  { icon: Shirt,           label: 'Fashion'         },
]

// 10 cols × 6 rows = 60 slots; flip cards occupy 4 × (2 cols × 2 rows) = 16 slots → 44 small cells
const CELLS_44 = Array.from({ length: 44 }, (_, i) => ITEMS[i % ITEMS.length])

function SmallCell({ icon: Icon, label, className }: { icon: React.ElementType; label: string; className?: string }) {
  const [hov, setHov] = useState(false)
  return (
    <div
      className={className}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: '#fff',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        gap: '8px', padding: '10px 6px', userSelect: 'none',
        cursor: 'default',
        /* inset outline — no layout shift, exactly like ClickUp Automations hover */
        outline: hov ? '2px solid rgba(8,33,60,0.45)' : '2px solid transparent',
        outlineOffset: '-2px',
        transition: 'outline-color 0.15s ease',
      }}
    >
      <Icon
        size={24}
        color={hov ? NAVY : 'rgba(8,33,60,0.45)'}
        strokeWidth={1.5}
        style={{ transition: 'color 0.15s ease' }}
      />
      <span style={{
        fontSize: '10px',
        color: hov ? 'rgba(8,33,60,0.75)' : 'rgba(8,33,60,0.52)',
        fontWeight: 600, textAlign: 'center', lineHeight: 1.3,
        transition: 'color 0.15s ease',
      }}>
        {label}
      </span>
    </div>
  )
}

/* ─── Main export ────────────────────────────────────────────── */
export function Industries() {
  const [flipped, setFlipped] = useState([false, false, false, false])

  useEffect(() => {
    type H = ReturnType<typeof setTimeout> | ReturnType<typeof setInterval>
    const ids: H[] = []
    FLIP_CONFIG.forEach(({ interval, delay }, i) => {
      const tid = setTimeout(() => {
        const iid = setInterval(() => {
          setFlipped(prev => { const n = [...prev]; n[i] = !n[i]; return n })
        }, interval)
        ids.push(iid)
      }, delay)
      ids.push(tid)
    })
    return () => ids.forEach(id => {
      clearTimeout(id as ReturnType<typeof setTimeout>)
      clearInterval(id as ReturnType<typeof setInterval>)
    })
  }, [])

  const flip = (i: number) =>
    setFlipped(prev => { const n = [...prev]; n[i] = !n[i]; return n })

  return (
    <section id="industries" style={{ background: '#fff', paddingTop: 'clamp(64px,9vw,110px)', paddingBottom: 'clamp(40px,5vw,60px)', overflow: 'hidden' }}>

      {/* Header — padded */}
      <motion.div
        initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
        style={{ textAlign: 'center', marginBottom: 'clamp(40px,6vw,72px)', padding: '0 clamp(24px,5vw,80px)' }}
      >
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <span style={{ display: 'inline-flex', gap: '3px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: GREEN, display: 'block' }} />
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: GREEN, opacity: 0.45, display: 'block' }} />
          </span>
          <span style={{ fontSize: '10.5px', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: GREEN }}>
            Industries We Serve
          </span>
        </div>
        <h2 style={{ fontSize: 'clamp(28px,4vw,52px)', fontWeight: 800, color: NAVY, letterSpacing: '-0.04em', lineHeight: 1.08, margin: '0 0 14px' }}>
          Sectors That Drive<br /><span style={{ color: GREEN }}>Australian Freight.</span>
        </h2>
        <p style={{ fontSize: 'clamp(14px,1.2vw,16px)', color: 'rgba(8,33,60,0.5)', lineHeight: 1.75, maxWidth: '460px', margin: '0 auto' }}>
          From cold chain to construction - click any card to flip and explore all 8 industries we serve.
        </p>
      </motion.div>

      {/* Full-width grid wrapper with left/right fade masks */}
      <div style={{ position: 'relative' }}>
        {/* Col 1 fade (left) — covers exactly 1 column = 10% of width */}
        <div className="ind-fade-left" style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, width: '11%', zIndex: 10,
          background: 'linear-gradient(to right, #fff 20%, transparent 100%)',
          pointerEvents: 'none',
        }} />
        {/* Col 10 fade (right) */}
        <div className="ind-fade-right" style={{
          position: 'absolute', right: 0, top: 0, bottom: 0, width: '11%', zIndex: 10,
          background: 'linear-gradient(to left, #fff 20%, transparent 100%)',
          pointerEvents: 'none',
        }} />

        <div
          className="ind-grid"
          style={{
            display: 'grid',
            /* 10 equal columns — 1 col = 10vw → row height = 10vw = square cells */
            gridTemplateColumns: 'repeat(10, 1fr)',
            gridAutoRows: '8vw',
            gap: '1px',
            background: BORDER,
            borderTop: `1px solid ${BORDER}`,
            borderBottom: `1px solid ${BORDER}`,
            overflow: 'hidden',
          }}
        >
          {PAIRS.map((_, i) => (
            <div key={i} className={`ind-card ind-card-${i}`} style={{ ...CARD_POS[i], background: '#fff', padding: '5px' }}>
              <FlipCard pairIdx={i} flipped={flipped[i]} onFlip={() => flip(i)} innerRadius={CARD_INNER_RADIUS[i]} />
            </div>
          ))}

          {CELLS_44.map((cell, i) => (
            <SmallCell key={`c${i}`} icon={cell.icon} label={cell.label} className="ind-small" />
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginTop: '20px' }}>
        <div style={{ height: '1px', width: '48px', background: 'linear-gradient(to right, transparent, rgba(8,33,60,0.12))' }} />
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '7px',
          padding: '6px 14px', borderRadius: '99px',
          border: '1px solid rgba(8,33,60,0.08)',
          background: 'rgba(60,185,140,0.05)',
        }}>
          <span style={{
            width: '6px', height: '6px', borderRadius: '50%',
            background: GREEN, display: 'inline-block',
            boxShadow: `0 0 0 3px ${GREEN}28`,
            animation: 'pulse-dot 2.2s ease-in-out infinite',
          }} />
          <span style={{ fontSize: '10.5px', fontWeight: 600, letterSpacing: '0.3px', color: 'rgba(8,33,60,0.45)' }}>
            8 industries &nbsp;·&nbsp; one fleet &nbsp;·&nbsp; zero compromise
          </span>
        </div>
        <div style={{ height: '1px', width: '48px', background: 'linear-gradient(to left, transparent, rgba(8,33,60,0.12))' }} />
      </div>
      <style>{`
        @keyframes pulse-dot {
          0%, 100% { box-shadow: 0 0 0 3px ${GREEN}28; }
          50%       { box-shadow: 0 0 0 6px ${GREEN}10; }
        }
      `}</style>

      <style>{`
        /* ── Tablet ≤ 860px: 2×2 flip card grid, no surrounding cells ── */
        @media (max-width: 860px) {
          .ind-grid {
            grid-template-columns: repeat(4, 1fr) !important;
            grid-auto-rows: 24vw !important;
            gap: 8px !important;
            background: transparent !important;
            border-top: none !important;
            border-bottom: none !important;
            padding: 0 clamp(12px, 3vw, 24px) !important;
          }
          .ind-small { display: none !important; }
          .ind-fade-left, .ind-fade-right { display: none !important; }
          .ind-card-0 { grid-column: 1 / span 2 !important; grid-row: 1 / span 2 !important; }
          .ind-card-1 { grid-column: 3 / span 2 !important; grid-row: 1 / span 2 !important; }
          .ind-card-2 { grid-column: 1 / span 2 !important; grid-row: 3 / span 2 !important; }
          .ind-card-3 { grid-column: 3 / span 2 !important; grid-row: 3 / span 2 !important; }
        }

        /* ── Mobile ≤ 540px: 1 card per cell, 2 cols ── */
        @media (max-width: 540px) {
          .ind-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            grid-auto-rows: 58vw !important;
            gap: 8px !important;
            padding: 0 12px !important;
          }
          .ind-card-0 { grid-column: 1 !important; grid-row: 1 !important; }
          .ind-card-1 { grid-column: 2 !important; grid-row: 1 !important; }
          .ind-card-2 { grid-column: 1 !important; grid-row: 2 !important; }
          .ind-card-3 { grid-column: 2 !important; grid-row: 2 !important; }
        }

        /* ── Small mobile ≤ 380px: taller rows for content breathing room ── */
        @media (max-width: 380px) {
          .ind-grid { grid-auto-rows: 70vw !important; }
        }
      `}</style>
    </section>
  )
}
