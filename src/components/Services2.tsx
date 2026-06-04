import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { services } from '../data/services'
import { ServiceCategoryBar } from './ServiceCategoryBar'

const NAVY  = '#08213C'
const GREEN = '#3CB98C'

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]


/* ─── single service row ─────────────────────────────────────── */
function ServiceRow({
  svc, index, isHovered, isSelected, onEnter, onLeave,
}: {
  svc: typeof services[0]
  index: number
  isHovered: boolean
  isSelected: boolean
  onEnter: () => void
  onLeave: () => void
}) {
  const active = isHovered || isSelected
  return (
    <div id={`service-row-${svc.id}`} style={{ scrollMarginTop: '80px' }}>
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-32px' }}
      transition={{ duration: 0.7, delay: index * 0.045, ease }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        position: 'relative',
        borderBottom: '1px solid rgba(8,33,60,0.07)',
        cursor: 'default',
        overflow: 'hidden',
      }}
    >
      {/* Green left reveal bar */}
      <motion.div
        animate={{ scaleX: active ? 1 : 0 }}
        initial={{ scaleX: 0 }}
        transition={{ duration: 0.32, ease }}
        style={{
          position: 'absolute', left: 0, top: 0, bottom: 0,
          width: '3px', background: GREEN,
          transformOrigin: 'left', zIndex: 2,
        }}
      />

      {/* Subtle row bg wash */}
      <div style={{
        position: 'absolute', inset: 0,
        background: active ? 'rgba(60,185,140,0.05)' : 'transparent',
        transition: 'background 0.35s ease',
        pointerEvents: 'none',
      }} />

      {/* Row content */}
      <div style={{
        position: 'relative', zIndex: 1,
        display: 'flex', alignItems: 'center',
        gap: 'clamp(12px, 2vw, 28px)',
        padding: 'clamp(18px, 2.6vw, 32px) clamp(24px, 4vw, 64px)',
      }}>

        {/* Index number */}
        <div style={{
          fontSize: 'clamp(10px, 0.9vw, 12px)',
          fontWeight: 700, letterSpacing: '0.6px',
          color: active ? GREEN : 'rgba(8,33,60,0.22)',
          fontVariantNumeric: 'tabular-nums',
          flexShrink: 0, width: '26px',
          transition: 'color 0.3s ease',
        }}>
          {svc.number}
        </div>

        {/* Category pre-label */}
        <div style={{
          fontSize: '8.5px', fontWeight: 700,
          letterSpacing: '2px', textTransform: 'uppercase',
          color: active ? GREEN : 'rgba(8,33,60,0.3)',
          flexShrink: 0,
          width: 'clamp(68px, 7.5vw, 108px)',
          lineHeight: 1.35,
          transition: 'color 0.3s ease',
        }}>
          {svc.preLabel}
        </div>

        {/* Hairline divider */}
        <div style={{
          width: '1px', alignSelf: 'stretch',
          background: active ? `${GREEN}55` : 'rgba(8,33,60,0.08)',
          flexShrink: 0,
          transition: 'background 0.3s ease',
        }} />

        {/* Service name */}
        <motion.div
          animate={{ x: isHovered ? 10 : 0 }}
          transition={{ duration: 0.38, ease }}
          style={{
            flex: 1,
            fontSize: 'clamp(17px, 2.2vw, 32px)',
            fontWeight: 700,
            color: active ? NAVY : 'rgba(8,33,60,0.6)',
            letterSpacing: '-0.03em', lineHeight: 1.1,
            transition: 'color 0.3s ease',
          }}
        >
          {svc.name}
        </motion.div>

        {/* Arrow */}
        <motion.div
          animate={{
            rotate: isHovered ? -45 : 0,
            opacity: active ? 1 : 0.2,
          }}
          transition={{ duration: 0.28, ease }}
          style={{ flexShrink: 0, color: GREEN }}
        >
          <ArrowUpRight size={20} strokeWidth={1.8} />
        </motion.div>
      </div>
    </motion.div>
    </div>
  )
}

/* ─── sticky image panel ─────────────────────────────────────── */
function ImagePanel({ index }: { index: number }) {
  const svc = services[index]
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      <AnimatePresence mode="sync">
        <motion.div
          key={svc.id}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease }}
          style={{ position: 'absolute', inset: 0 }}
        >
          <img
            src={svc.imageUrl}
            alt={svc.imageAlt}
            loading="lazy"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Left fade — blends into white background */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
        background: 'linear-gradient(to right, rgba(235,248,243,0.88) 0%, rgba(60,185,140,0.08) 28%, transparent 55%)',
      }} />
      {/* Bottom fade — for caption legibility */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
        background: 'linear-gradient(to top, rgba(8,33,60,0.88) 0%, rgba(8,33,60,0.25) 45%, transparent 70%)',
      }} />

      {/* Service info caption */}
      <AnimatePresence mode="wait">
        <motion.div
          key={svc.id + '-caption'}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.42, ease }}
          style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            zIndex: 3, padding: 'clamp(28px, 4vw, 52px)',
          }}
        >
          <div style={{
            fontSize: '9px', fontWeight: 700,
            letterSpacing: '2.5px', textTransform: 'uppercase',
            color: GREEN, marginBottom: '10px',
          }}>
            {svc.preLabel}
          </div>
          <div style={{
            fontSize: 'clamp(20px, 2.6vw, 34px)',
            fontWeight: 700, color: '#ffffff',
            letterSpacing: '-0.035em', lineHeight: 1.1,
            marginBottom: '10px',
          }}>
            {svc.title}
          </div>
          <div style={{
            fontSize: 'clamp(12px, 1vw, 13.5px)',
            color: 'rgba(255,255,255,0.52)', lineHeight: 1.75,
            maxWidth: '320px',
          }}>
            {svc.description}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Counter badge */}
      <div style={{
        position: 'absolute', top: 'clamp(24px, 3vw, 40px)', right: 'clamp(24px, 3vw, 40px)',
        zIndex: 3,
        display: 'flex', alignItems: 'center', gap: '6px',
        padding: '6px 14px',
        background: 'rgba(8,33,60,0.55)',
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: '100px',
      }}>
        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: GREEN, flexShrink: 0 }} />
        <span style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.8)', letterSpacing: '0.3px' }}>
          {svc.number} / {String(services.length).padStart(2, '0')}
        </span>
      </div>
    </div>
  )
}

type LenisInstance = { scrollTo: (target: Element | number, opts?: Record<string, unknown>) => void }

/* ─── main export ────────────────────────────────────────────── */
export function Services2() {
  const [hovered,  setHovered]  = useState<number | null>(null)
  const [selected, setSelected] = useState<number | null>(null)
  const active = hovered ?? selected ?? 0
  const scrollToRow = useCallback((serviceId: string) => {
    const idx = services.findIndex(s => s.id === serviceId)
    if (idx === -1) return
    setSelected(idx)

    requestAnimationFrame(() => {
      const row = document.getElementById(`service-row-${serviceId}`)
      if (!row) return

      const lenis = (window as unknown as Record<string, unknown>).__lenis as LenisInstance | undefined
      if (lenis) {
        lenis.scrollTo(row, {
          offset: -80,
          duration: 1.1,
          easing: (t: number) => 1 - Math.pow(1 - t, 4),
        })
      } else {
        row.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    })
  }, [])

  // On mount: pick up cross-page serviceId from sessionStorage (set by Footer/Header before navigating)
  useEffect(() => {
    const pending = sessionStorage.getItem('pendingService')
    if (pending) {
      sessionStorage.removeItem('pendingService')
      const t = setTimeout(() => scrollToRow(pending), 600)
      return () => clearTimeout(t)
    }
  }, [scrollToRow])

  // Same-page: custom event (Header dropdowns when already on homepage)
  useEffect(() => {
    const handler = (e: Event) => {
      const { serviceId } = (e as CustomEvent<{ serviceId: string }>).detail
      scrollToRow(serviceId)
    }
    window.addEventListener('bivry:service', handler)
    return () => window.removeEventListener('bivry:service', handler)
  }, [scrollToRow])

  return (
    <section id="services" style={{ position: 'relative', overflow: 'clip' }}>

      <ServiceCategoryBar />

      {/* ── Intro header ── */}
      <div
        className="s2-intro"
        style={{
          position: 'relative', overflow: 'hidden',
          display: 'grid', gridTemplateColumns: '1fr',
          background: 'linear-gradient(135deg, rgba(8,33,60,0.06) 0%, rgba(60,185,140,0.04) 50%, #ffffff 100%)',
          borderBottom: '1px solid rgba(8,33,60,0.08)',
        }}
      >
        {/* Faint watermark number */}
        <div style={{
          position: 'absolute', right: '3%', top: '50%', transform: 'translateY(-50%)',
          fontSize: 'clamp(100px,18vw,200px)', fontWeight: 900, lineHeight: 1,
          color: 'rgba(8,33,60,0.04)', letterSpacing: '-0.06em',
          pointerEvents: 'none', userSelect: 'none', zIndex: 0,
        }}>12</div>

        {/* Left — eyebrow + large headline + count badge */}
        <div style={{
          position: 'relative', zIndex: 1,
          padding: 'clamp(28px,3.5vw,44px) clamp(24px,5vw,80px)',
          display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '14px',
        }}>
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, ease }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            <span style={{ display: 'inline-flex', gap: '3px' }}>
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: GREEN, display: 'block' }} />
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: GREEN, opacity: 0.45, display: 'block' }} />
            </span>
            <span style={{ fontSize: '10.5px', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: GREEN }}>
              Full Service Suite
            </span>
          </motion.div>

          {/* Display headline */}
          <div>
            {(['Every Service.', 'On Time, Every Time.'] as const).map((line, i) => (
              <motion.div
                key={line}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px' }}
                transition={{ duration: 0.7, delay: i * 0.1, ease }}
                style={{
                  fontSize: 'clamp(36px, 5vw, 64px)',
                  fontWeight: 800, lineHeight: 1.06, letterSpacing: '-0.045em',
                  color: i === 0 ? NAVY : GREEN,
                }}
              >
                {line}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right — description */}
        <div className="s2-intro-right" style={{
          position: 'relative', zIndex: 1,
          padding: 'clamp(28px,4vw,52px) clamp(24px,5vw,80px)',
          display: 'flex', alignItems: 'center',
          borderTop: '1px solid rgba(8,33,60,0.07)',
        }}>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            <div style={{ width: '3px', borderRadius: '2px', alignSelf: 'stretch', flexShrink: 0, background: `linear-gradient(to bottom, ${GREEN}, ${GREEN}30)` }} />
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: 0.2, ease }}
              style={{
                fontSize: 'clamp(14px, 1.3vw, 17px)',
                color: 'rgba(8,33,60,0.52)',
                lineHeight: 1.85, margin: 0,
              }}
            >
              From urgent same-day runs to long-term contract logistics - one
              coordinated fleet keeping Australian supply chains moving 24&nbsp;/&nbsp;7.
            </motion.p>
          </div>
        </div>
      </div>

      {/* ── Body: rows left + sticky image right ── */}
      <div
        className="s2-body"
        style={{ display: 'grid', gridTemplateColumns: '1fr', alignItems: 'start' }}
      >
        {/* ── Left: row list ── */}
        <div>
          <div style={{ height: '1px', background: 'rgba(8,33,60,0.07)' }} />

          {services.map((svc, i) => (
            <ServiceRow
              key={svc.id}
              svc={svc}
              index={i}
              isHovered={hovered === i}
              isSelected={selected === i}
              onEnter={() => { setHovered(i); setSelected(null) }}
              onLeave={() => { setHovered(null); setSelected(i) }}
            />
          ))}

        </div>

        {/* ── Right: sticky image panel ── */}
        <div
          className="s2-panel"
          style={{
            position: 'sticky', top: 0,
            height: '100vh', overflow: 'hidden',
            display: 'none',
          }}
        >
          <ImagePanel index={active} />
        </div>
      </div>

      <style>{`
        @media (min-width: 900px) {
          .s2-intro       { grid-template-columns: 52fr 48fr !important; }
          .s2-intro-right { border-left: none !important; }
          .s2-body        { grid-template-columns: 52fr 48fr !important; }
          .s2-panel       { display: block !important; }
        }
      `}</style>
    </section>
  )
}
