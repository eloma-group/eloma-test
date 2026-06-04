import { useEffect, useRef, useState } from 'react'
import {
  Headphones, MapPin, Globe2, UserCheck,
  ShieldCheck, Zap, ClipboardList, Package,
} from 'lucide-react'

const GREEN  = '#3CB98C'
const TEXT   = '#1A2B3C'
const MUTED  = 'rgba(26,43,60,0.50)'
const BORDER = 'rgba(0,0,0,0.09)'

const CITIES = [
  { id: 'au', flag: '🇦🇺', label: 'Australia',  region: 'Oceania',        delay: 0.1  },
  { id: 'us', flag: '🇺🇸', label: 'US',         region: 'North America',  delay: 0.3  },
  { id: 'ca', flag: '🇨🇦', label: 'Canada',     region: 'North America',  delay: 0.6  },
  { id: 'gb', flag: '🇬🇧', label: 'UK',         region: 'Europe',         delay: 0.9  },
  { id: 'eu', flag: '🇪🇺', label: 'Europe',     region: 'European Union', delay: 1.05 },
  { id: 'ae', flag: '🇦🇪', label: 'Dubai',      region: 'Middle East',    delay: 1.2  },
  { id: 'in', flag: '🇮🇳', label: 'India',      region: 'South Asia',     delay: 1.5  },
  { id: 'cn', flag: '🇨🇳', label: 'China',      region: 'East Asia',      delay: 1.8  },
  { id: 'sg', flag: '🇸🇬', label: 'Singapore',  region: 'Southeast Asia', delay: 2.1  },
  { id: 'jp', flag: '🇯🇵', label: 'Japan',      region: 'East Asia',      delay: 2.4  },
]

const FEATURES = [
  { Icon: Headphones,    line1: '24×7',             line2: 'Customer Support', desc: 'Round-the-clock support from our dedicated freight specialists across every time zone.' },
  { Icon: MapPin,        line1: 'Real-time',         line2: 'Tracking',         desc: 'GPS-powered live visibility on every shipment, every mile of its journey.' },
  { Icon: Globe2,        line1: 'Global Freight',    line2: 'Network',          desc: '10 international corridors from Sydney spanning 5 continents.' },
  { Icon: UserCheck,     line1: 'Dedicated Account', line2: 'Manager',          desc: 'A personal freight specialist who knows your cargo and your business.' },
  { Icon: ShieldCheck,   line1: 'Secure Cargo',      line2: 'Handling',         desc: 'Full insurance coverage and tamper-proof transit protocols on every route.' },
  { Icon: Zap,           line1: 'Express',           line2: 'Delivery',         desc: 'Priority lanes and expedited customs clearance for time-critical freight.' },
  { Icon: ClipboardList, line1: 'Customs',           line2: 'Clearance',        desc: 'End-to-end documentation and compliant cross-border clearance handled for you.' },
  { Icon: Package,       line1: 'Door-to-Door',      line2: 'Service',          desc: 'Complete pickup-to-delivery freight management with zero-handoff accountability.' },
]

function FeatureCard({ Icon, line1, line2, desc, visible, delay }: {
  Icon: React.ElementType; line1: string; line2: string
  desc: string; visible: boolean; delay: number
}) {
  return (
    <div
      className="gn2-feat-card"
      style={{
        background: '#fff',
        borderRadius: '14px',
        border: '1.5px solid rgba(0,0,0,0.07)',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'default',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(22px)',
        transition: visible
          ? `opacity 0.5s ease ${delay}s, transform 0.5s ease ${delay}s`
          : 'none',
      }}
    >
      <div className="gn2-feat-icon-wrap" style={{
        width: '46px', height: '46px', borderRadius: '11px',
        background: '#f3f6fa', display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        marginBottom: '14px', flexShrink: 0,
        color: TEXT, transition: 'background 0.30s ease, color 0.30s ease',
      }}>
        <Icon size={21} strokeWidth={1.6} />
      </div>

      <div style={{ marginBottom: '10px', lineHeight: 1.25 }}>
        <div style={{ fontSize: '13.5px', fontWeight: 800, color: TEXT }}>{line1}</div>
        <div style={{ fontSize: '13.5px', fontWeight: 800, color: TEXT }}>{line2}</div>
      </div>

      <div className="gn2-feat-divider" style={{
        height: '2px', width: '32px', borderRadius: '2px',
        background: '#dde3ea', marginBottom: '10px', flexShrink: 0,
        transition: 'background 0.30s ease, width 0.30s ease',
      }}/>

      <p style={{
        fontSize: '11.5px', color: MUTED, lineHeight: 1.7, margin: 0, flex: 1,
      }}>
        {desc}
      </p>
    </div>
  )
}

export function GlobalNetwork2() {
  const ref = useRef<HTMLDivElement>(null)
  const [on, setOn] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect() } },
      { threshold: 0.06 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section ref={ref} className="gn2-section">

      {/* ── LEFT PANEL ── */}
      <div className="gn2-left-panel">

        {/* Badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '7px',
          padding: '4px 14px 4px 8px',
          background: `${GREEN}20`, border: `1px solid ${GREEN}45`,
          borderRadius: '999px', marginBottom: '14px', alignSelf: 'flex-start',
        }}>
          <span style={{
            display: 'block', width: '6px', height: '6px', borderRadius: '50%',
            background: GREEN, animation: 'gnBlink 1.8s ease-in-out infinite',
          }}/>
          <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: GREEN }}>
            Global Network
          </span>
        </div>

        <h2 style={{
          fontSize: 'clamp(1.1rem,1.4vw,1.55rem)', fontWeight: 800,
          letterSpacing: '-0.03em', color: TEXT, lineHeight: 1.2,
          margin: '0 0 9px',
        }}>
          Connecting<br/>Australia{' '}
          <span style={{ color: GREEN }}>to the World</span>
        </h2>

        <p style={{ fontSize: '12px', color: MUTED, lineHeight: 1.75, margin: '0 0 16px' }}>
          From Sydney, BIVRY's freight network spans 10 global corridors across 5 continents.
        </p>

        <div style={{ borderTop: `1px solid ${BORDER}`, marginBottom: '12px' }}/>

        <div style={{
          fontSize: '9px', fontWeight: 700, letterSpacing: '2px',
          textTransform: 'uppercase', color: MUTED, marginBottom: '8px',
        }}>
          Active Routes
        </div>

        <div className="gn2-routes" data-lenis-prevent style={{
          display: 'flex', flexDirection: 'column', gap: '4px',
          flex: 1, minHeight: 0, overflowY: 'auto',
        }}>
          {CITIES.map(c => (
            <div key={c.id} className="gn2-route-card" style={{
              display: 'flex', alignItems: 'center', gap: '9px',
              padding: '7px 9px',
              background: 'rgba(0,0,0,0.03)',
              border: `1px solid ${BORDER}`,
              borderLeft: `2px solid ${GREEN}`,
              borderRadius: '8px',
              opacity:   on ? 1 : 0,
              transform: on ? 'translateX(0)' : 'translateX(-14px)',
              transition: on
                ? `opacity 0.4s ease ${c.delay + 0.5}s, transform 0.4s ease ${c.delay + 0.5}s, background 0.2s, border-color 0.2s`
                : 'none',
            }}>
              <span className="gn2-flag" style={{ fontSize: '14px', lineHeight: 1, flexShrink: 0, display: 'inline-block', transition: 'transform 0.25s ease' }}>{c.flag}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="gn2-city" style={{ fontSize: '11px', fontWeight: 700, color: TEXT, transition: 'color 0.2s' }}>{c.label}</div>
                <div style={{ fontSize: '9px', color: MUTED, marginTop: '1px' }}>{c.region}</div>
              </div>
              <div className="gn2-live" style={{
                fontSize: '7.5px', fontWeight: 700, letterSpacing: '0.5px',
                color: GREEN, background: `${GREEN}18`,
                padding: '2px 6px', borderRadius: '999px', flexShrink: 0,
                transition: 'background 0.2s, color 0.2s',
              }}>LIVE</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── RIGHT: feature grid ── */}
      <div className="gn2-feat-grid">
        {FEATURES.map((f, i) => (
          <FeatureCard
            key={i}
            Icon={f.Icon}
            line1={f.line1}
            line2={f.line2}
            desc={f.desc}
            visible={on}
            delay={0.06 * i}
          />
        ))}
      </div>

      <style>{`
        /* ══════════════════════════════════════════════
           SECTION — desktop default (≥ 1025px)
           Cap at 860 px so 4K / 32-inch screens don't
           balloon the feature cards to absurd heights.
           ══════════════════════════════════════════════ */
        .gn2-section {
          display:    flex;
          flex-direction: row;
          background: #f2f6fb;
          /* height: viewport minus header, but never > 860 px */
          height:     calc(100vh - 64px);
          max-height: 860px;
          min-height: 580px;
          overflow:   hidden;
        }

        /* ── Left panel ── */
        .gn2-left-panel {
          position:             relative;
          z-index:              10;
          overflow:             hidden;
          /* width scales with viewport but is bounded */
          width:                clamp(280px, 26vw, 380px);
          flex-shrink:          0;
          background:           rgba(255,255,255,0.95);
          backdrop-filter:      blur(22px);
          -webkit-backdrop-filter: blur(22px);
          border-right:         1px solid ${BORDER};
          display:              flex;
          flex-direction:       column;
          padding:              clamp(22px, 2.4vw, 32px) clamp(16px, 1.8vw, 24px);
          box-sizing:           border-box;
        }

        /* ── Feature grid ── */
        .gn2-feat-grid {
          flex:                 1;
          display:              grid;
          grid-template-columns: repeat(4, 1fr);
          /* auto rows: cards size to content; align-content centers the 2 rows */
          grid-template-rows:   repeat(2, auto);
          align-content:        center;
          gap:                  clamp(10px, 0.9vw, 14px);
          padding:              clamp(14px, 1.4vw, 20px);
          min-width:            0;
          overflow:             hidden;
        }

        /* ── Feature card responsive padding ── */
        .gn2-feat-card {
          padding: clamp(16px, 1.6vw, 26px) clamp(12px, 1.4vw, 22px);
        }

        /* ════════════════════════════════════════════
           XL / very large screens (≥ 1600 px)
           Nudge the cap up slightly but keep it tight.
           ════════════════════════════════════════════ */
        @media (min-width: 1600px) {
          .gn2-section    { max-height: 900px; }
          .gn2-left-panel { width: 360px; }
        }
        @media (min-width: 1920px) {
          .gn2-section    { max-height: 940px; min-height: 660px; }
          .gn2-left-panel { width: 380px; }
          .gn2-feat-grid  {
            gap: 16px;
            padding: 22px;
            grid-template-columns: repeat(4, minmax(0, 320px));
            justify-content: center;
          }
        }
        @media (min-width: 2560px) {
          /* 32-inch 4K, ultra-wide, etc. */
          .gn2-section    { max-height: 960px; }
          .gn2-feat-grid  {
            gap: 18px;
            padding: 24px;
            grid-template-columns: repeat(4, minmax(0, 360px));
            justify-content: center;
          }
        }

        /* ════════════════════════════════════════════
           Tablet landscape  1025 → 1280 px
           ════════════════════════════════════════════ */
        @media (max-width: 1280px) and (min-width: 1025px) {
          .gn2-feat-grid { gap: 10px; padding: 14px; }
        }

        /* ════════════════════════════════════════════
           Tablet (≤ 1024 px)
           Stack panel on top, grid below — 2 columns.
           ════════════════════════════════════════════ */
        @media (max-width: 1024px) {
          .gn2-section {
            flex-direction: column;
            height:         auto;
            max-height:     none;
            min-height:     unset;
            overflow:       visible;
          }
          .gn2-left-panel {
            width:         100%;
            border-right:  none;
            border-bottom: 1px solid ${BORDER};
            overflow:      visible;
            padding:       24px 20px;
          }
          .gn2-routes {
            /* allow route list to scroll once it gets tall */
            max-height: 260px;
            overflow-y: auto;
          }
          .gn2-feat-grid {
            grid-template-columns: repeat(2, 1fr);
            grid-template-rows:    repeat(4, auto);
            align-content:         start;
            overflow:              visible;
            padding:               20px;
            gap:                   12px;
          }
        }

        /* ════════════════════════════════════════════
           Mobile portrait  (≤ 640 px)
           ════════════════════════════════════════════ */
        @media (max-width: 640px) {
          .gn2-left-panel { padding: 20px 16px; }
          .gn2-routes     { max-height: 220px; }
          .gn2-feat-grid  {
            grid-template-columns: repeat(2, 1fr);
            gap:     9px;
            padding: 14px;
          }
        }

        /* ════════════════════════════════════════════
           Small mobile  (≤ 400 px) — single column
           ════════════════════════════════════════════ */
        @media (max-width: 400px) {
          .gn2-feat-grid {
            grid-template-columns: 1fr;
            gap:     8px;
            padding: 12px;
          }
        }

        /* ── Scrollbar ── */
        .gn2-routes::-webkit-scrollbar       { width: 3px; }
        .gn2-routes::-webkit-scrollbar-track { background: transparent; }
        .gn2-routes::-webkit-scrollbar-thumb { background: rgba(60,185,140,0.35); border-radius: 99px; }
        .gn2-routes::-webkit-scrollbar-thumb:hover { background: rgba(60,185,140,0.6); }

        /* ── Route card hover ── */
        .gn2-route-card {
          cursor: pointer;
          transition: transform 0.22s ease, box-shadow 0.22s ease, background 0.22s ease, border-color 0.22s ease !important;
        }
        .gn2-route-card:hover {
          background: linear-gradient(90deg, rgba(60,185,140,0.09) 0%, rgba(60,185,140,0.02) 100%) !important;
          border-left-color: #3CB98C !important;
          border-color: rgba(60,185,140,0.28) !important;
          box-shadow: -3px 0 18px rgba(60,185,140,0.12), 0 2px 10px rgba(0,0,0,0.06);
          transform: translateX(4px) !important;
        }
        .gn2-route-card:hover .gn2-flag { transform: scale(1.22); }
        .gn2-route-card:hover .gn2-city { color: #3CB98C !important; }
        .gn2-route-card:hover .gn2-live {
          background: rgba(60,185,140,0.20) !important;
          box-shadow: 0 0 8px rgba(60,185,140,0.30);
        }

        /* ── Feature card hover ── */
        .gn2-feat-card {
          will-change: transform, box-shadow;
          transition:
            transform    0.32s cubic-bezier(0.34,1.56,0.64,1),
            box-shadow   0.28s ease,
            border-color 0.28s ease !important;
        }
        .gn2-feat-card:hover {
          transform:    translateY(-6px) scale(1.013) !important;
          box-shadow:   0 18px 38px rgba(60,185,140,0.13), 0 5px 16px rgba(0,0,0,0.07) !important;
          border-color: rgba(60,185,140,0.42) !important;
        }
        .gn2-feat-card:hover .gn2-feat-icon-wrap {
          background: rgba(60,185,140,0.11) !important;
          color:      #3CB98C !important;
        }
        .gn2-feat-card:hover .gn2-feat-divider {
          background: #3CB98C !important;
          width:      56px !important;
        }

        @keyframes gnBlink { 0%,100% { opacity:1; } 50% { opacity:0.25; } }
        @media (prefers-reduced-motion: reduce) {
          *,*::before,*::after { animation-duration:0.01ms !important; transition-duration:0.01ms !important; }
        }
      `}</style>
    </section>
  )
}
