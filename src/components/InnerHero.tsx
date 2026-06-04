import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export const NAVY  = '#08213C'
export const GREEN = '#3CB98C'
export const CREAM = '#F3F0EA'
export const ease  = [0.16, 1, 0.3, 1] as [number, number, number, number]

interface HeroProps {
  badge: string
  line1: string
  line2: string
  greenLine?: 1 | 2
  description?: string
  meta?: Array<{ label: string; value: string }>
}

export function InnerHero({ badge, line1, line2, greenLine = 2, description, meta }: HeroProps) {
  return (
    <section style={{
      minHeight: '78vh', background: CREAM,
      display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      paddingTop: 64, position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', right: '-0.01em', bottom: '5%',
        fontSize: 'clamp(180px,26vw,380px)', fontWeight: 900,
        color: 'rgba(8,33,60,0.022)', lineHeight: 1,
        userSelect: 'none', pointerEvents: 'none', letterSpacing: '-0.1em',
      }}>→</div>

      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: 'clamp(48px,6vw,80px) clamp(24px,5vw,80px)',
        textAlign: 'center',
      }}>
        <motion.div
          initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            border: '1.5px solid rgba(8,33,60,0.16)', borderRadius: 100,
            padding: '7px 18px', marginBottom: 44,
          }}
        >
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: GREEN, boxShadow: `0 0 8px ${GREEN}` }} />
          <span style={{ fontSize: 11, fontWeight: 800, color: NAVY, letterSpacing: '2.5px', textTransform: 'uppercase' as const }}>{badge}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.1 }}
          style={{
            fontSize: 'clamp(52px,10.5vw,136px)', fontWeight: 900,
            letterSpacing: '-0.046em', lineHeight: 0.9,
            margin: '0 0 28px', textTransform: 'uppercase' as const,
          }}
        >
          <span style={{ color: greenLine === 1 ? GREEN : NAVY }}>{line1}</span><br />
          <span style={{ color: greenLine === 2 ? GREEN : NAVY }}>{line2}</span>
        </motion.h1>

        {description && (
          <motion.p
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.2 }}
            style={{ fontSize: 'clamp(14px,1.35vw,17px)', color: 'rgba(8,33,60,0.52)', maxWidth: 540, lineHeight: 1.85, margin: 0 }}
          >{description}</motion.p>
        )}
      </div>

      {meta && (
        <div className="innerhero-meta" style={{ background: NAVY, borderTop: `2px solid ${GREEN}`, display: 'flex' }}>
          {meta.map(({ label, value }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.3 + i * 0.08, ease }}
              className="innerhero-meta-cell"
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                gap: 14,
                padding: 'clamp(24px,2.8vw,40px) clamp(20px,3vw,48px)',
                borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.07)' : 'none',
                position: 'relative',
              }}
            >
              {/* Green rule + label */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 20, height: 2, background: GREEN, borderRadius: 2, flexShrink: 0 }} />
                <span style={{
                  fontSize: 'clamp(8.5px,0.62vw,10px)', fontWeight: 800,
                  letterSpacing: '2.8px', textTransform: 'uppercase' as const,
                  color: GREEN, opacity: 0.85,
                }}>{label}</span>
              </div>

              {/* Value */}
              <div style={{
                fontSize: 'clamp(13px,1.2vw,17px)', fontWeight: 700,
                color: 'rgba(255,255,255,0.88)',
                lineHeight: 1.35, letterSpacing: '-0.02em',
              }}>{value}</div>

              {/* Bottom accent line — animates in on hover via CSS */}
              <div className="innerhero-meta-underline" style={{
                position: 'absolute', bottom: 0, left: 0,
                height: 2, width: 0,
                background: GREEN,
                transition: 'width 0.4s cubic-bezier(0.16,1,0.3,1)',
              }} />
            </motion.div>
          ))}
        </div>
      )}
      <style>{`
        .innerhero-meta-cell {
          cursor: default;
          transition: background 0.28s ease;
        }
        .innerhero-meta-cell:hover {
          background: rgba(60,185,140,0.06) !important;
        }
        .innerhero-meta-cell:hover .innerhero-meta-underline {
          width: 100% !important;
        }

        /* Tablet: 2×2 */
        @media (max-width: 767px) {
          .innerhero-meta { flex-wrap: wrap !important; }
          .innerhero-meta-cell {
            flex: 1 1 48% !important;
            border-left: none !important;
            border-top: 1px solid rgba(255,255,255,0.07) !important;
          }
          .innerhero-meta-cell:nth-child(2n) {
            border-left: 1px solid rgba(255,255,255,0.07) !important;
          }
          .innerhero-meta-cell:first-child,
          .innerhero-meta-cell:nth-child(2) { border-top: none !important; }
        }

        /* Mobile: stacked */
        @media (max-width: 479px) {
          .innerhero-meta-cell { flex: 1 1 100% !important; }
          .innerhero-meta-cell:nth-child(2n) { border-left: none !important; }
          .innerhero-meta-cell:not(:first-child) {
            border-top: 1px solid rgba(255,255,255,0.07) !important;
            border-left: none !important;
          }
        }
      `}</style>
    </section>
  )
}

/* ── Shared bottom CTA used on all inner pages ── */
interface CTAProps {
  line1: string
  line2: string
  href?: string
  buttonLabel?: string
  sub?: string
}

export function PageCTA({ line1, line2, href = '/contact', buttonLabel = 'Get in Touch', sub }: CTAProps) {
  return (
    <section style={{
      background: NAVY, padding: 'clamp(72px,10vw,120px) clamp(24px,5vw,80px)',
      textAlign: 'center', position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.028) 1px, transparent 1px)', backgroundSize: '28px 28px', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -100, right: '10%', width: 520, height: 520, borderRadius: '50%', background: `radial-gradient(circle, ${GREEN}10 0%, transparent 60%)`, pointerEvents: 'none' }} />

      <motion.div
        initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.9, ease }}
        style={{ position: 'relative', zIndex: 1 }}
      >
        <h2 style={{ fontSize: 'clamp(52px,10vw,140px)', fontWeight: 900, color: '#fff', letterSpacing: '-0.046em', lineHeight: 0.88, margin: `0 0 ${sub ? 24 : 52}px`, textTransform: 'uppercase' as const }}>
          {line1}<br /><span style={{ color: GREEN }}>{line2}</span>
        </h2>
        {sub && (
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.45)', margin: '0 auto 44px', maxWidth: 480, lineHeight: 1.75 }}>{sub}</p>
        )}
        <a href={href} style={{
          display: 'inline-flex', alignItems: 'center', gap: 12,
          border: '2px solid rgba(255,255,255,0.28)', borderRadius: 100,
          padding: '16px 40px', color: '#fff', textDecoration: 'none',
          fontSize: 15, fontWeight: 700, transition: 'all 0.25s ease',
        }}
          onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = GREEN; el.style.borderColor = GREEN }}
          onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'transparent'; el.style.borderColor = 'rgba(255,255,255,0.28)' }}
        >
          <ArrowRight size={16} strokeWidth={2.5} />{buttonLabel}
        </a>
      </motion.div>
    </section>
  )
}
