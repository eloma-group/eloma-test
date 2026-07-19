import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import type { ReactNode } from 'react'

/* ─────────────────────────────────────────────
   Eloma Group page kit - shared hero / CTA / eyebrow
   styled in the home page's own language:
   Poppins + Inter, navy #13293D + green #3CB98C,
   white → mint backgrounds - the Eloma design language.
   ───────────────────────────────────────────── */

export const NAVY  = '#13293D'
export const GREEN = '#3CB98C'
export const MUTED = 'rgba(26,43,60,0.55)'
export const EASE  = [0.16, 1, 0.3, 1] as [number, number, number, number]

export function Eyebrow({ label, light, center }: { label: string; light?: boolean; center?: boolean }) {
  return (
    <p style={{
      display: 'inline-flex', alignItems: 'center', gap: 10, margin: center ? '0 auto' : 0,
      fontFamily: "'Inter', sans-serif", fontSize: 'clamp(10px,0.78vw,12px)',
      fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase',
      color: GREEN,
    }}>
      <span style={{ width: 7, height: 7, borderRadius: 99, background: GREEN, boxShadow: light ? 'none' : '0 0 0 4px rgba(60,185,140,0.16)' }} />
      {label}
    </p>
  )
}

interface HeroProps {
  badge: string
  line1: string
  line2: string
  description?: string
  stats?: { n: string; label: string }[]
  inline?: boolean
}

export function PageHero({ badge, line1, line2, description, stats, inline }: HeroProps) {
  return (
    <section style={{ position: 'relative', overflow: 'hidden' }}>
      <style>{`
        .pk-hero {
          position: relative; overflow: hidden;
          background:
            radial-gradient(60% 55% at 80% 0%, rgba(60,185,140,0.10), transparent 60%),
            radial-gradient(50% 50% at 0% 100%, rgba(19,41,61,0.05), transparent 60%),
            linear-gradient(180deg, #ffffff 0%, #f3faf7 100%);
          padding: clamp(130px,15vw,210px) 45px clamp(56px,7vw,96px);
          text-align: center;
        }
        .pk-hero-h1 {
          font-family: 'Poppins', sans-serif; font-weight: 700;
          font-size: clamp(42px,7vw,92px); line-height: 1.12; letter-spacing: -0.03em;
          margin: clamp(20px,2.4vw,30px) 0 0; text-transform: none;
          padding-bottom: 0.08em;
        }
        .pk-hero-p {
          font-family: 'Inter', sans-serif; font-size: clamp(15px,1.25vw,19px);
          line-height: 1.85; color: ${MUTED}; max-width: 600px;
          margin: clamp(22px,2.6vw,30px) auto 0;
        }
        .pk-hero-stats {
          margin: clamp(40px,5vw,64px) auto 0; max-width: 1100px;
          display: grid; grid-template-columns: repeat(4,1fr);
          border: 1px solid rgba(26,43,60,0.10); border-radius: 22px; overflow: hidden;
          background: linear-gradient(160deg, rgba(255,255,255,0.9), rgba(255,255,255,0.55));
          box-shadow: 0 30px 60px -40px rgba(19,41,61,0.3);
          backdrop-filter: blur(6px);
        }
        .pk-stat { padding: clamp(22px,2.4vw,34px) clamp(14px,1.6vw,24px); position: relative; transition: background 0.4s ease; }
        .pk-stat + .pk-stat { border-left: 1px solid rgba(26,43,60,0.09); }
        .pk-stat:hover { background: rgba(60,185,140,0.05); }
        .pk-stat-n { font-family:'Poppins',sans-serif; font-weight:700; font-size:clamp(30px,3.4vw,52px); line-height:0.95; letter-spacing:-0.04em; }
        .pk-stat-l { font-family:'Inter',sans-serif; font-size:clamp(11px,0.85vw,13px); color:${MUTED}; margin-top:8px; letter-spacing:0.3px; }
        @media (max-width: 720px) {
          .pk-hero-stats { grid-template-columns: 1fr 1fr; }
          .pk-stat:nth-child(3), .pk-stat:nth-child(4) { border-top: 1px solid rgba(26,43,60,0.09); }
          .pk-stat:nth-child(3) { border-left: none; }
        }
      `}</style>
      <div className="pk-hero">
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }} style={{ display: 'flex', justifyContent: 'center' }}>
          <Eyebrow label={badge} center />
        </motion.div>
        <motion.h1 className="pk-hero-h1" initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, ease: EASE, delay: 0.08 }}>
          <span style={{ color: NAVY }}>{line1}</span>{inline ? ' ' : <br />}
          <span style={{ color: GREEN }}>{line2}</span>
        </motion.h1>
        {description && (
          <motion.p className="pk-hero-p" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE, delay: 0.18 }}>
            {description}
          </motion.p>
        )}
        {stats && (
          <motion.div className="pk-hero-stats" initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE, delay: 0.26 }}>
            {stats.map((s, i) => (
              <div className="pk-stat" key={s.label}>
                <div className="pk-stat-n" style={{ color: i % 2 === 0 ? GREEN : NAVY }}>{s.n}</div>
                <div className="pk-stat-l">{s.label}</div>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  )
}

interface CTAProps {
  line1: string
  line2: string
  sub?: string
  href?: string
  buttonLabel?: string
}

export function PageCTA({ line1, line2, sub, href = '/contact#contact-form', buttonLabel = 'Get in Touch' }: CTAProps) {
  const navigate = useNavigate()
  return (
    <section style={{
      position: 'relative', overflow: 'hidden', background: NAVY,
      padding: 'clamp(72px,10vw,130px) 45px', textAlign: 'center',
    }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '28px 28px', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -120, right: '8%', width: 520, height: 520, borderRadius: '50%', background: `radial-gradient(circle, rgba(60,185,140,0.12) 0%, transparent 62%)`, pointerEvents: 'none' }} />
      <motion.div initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, ease: EASE }} style={{ position: 'relative', zIndex: 1 }}>
        <h2 style={{ fontFamily: "'Poppins',sans-serif", fontSize: 'clamp(34px,5.6vw,84px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1.1, paddingBottom: '0.08em', margin: `0 0 ${sub ? 20 : 36}px` }}>
          {line1}<br /><span style={{ color: GREEN }}>{line2}</span>
        </h2>
        {sub && <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 16, color: 'rgba(255,255,255,0.5)', margin: '0 auto 40px', maxWidth: 500, lineHeight: 1.8 }}>{sub}</p>}
        <button className="pk-cta-btn" onClick={() => navigate(href)}>
          <span>{buttonLabel}</span>
          <ArrowRight size={17} strokeWidth={2.4} />
        </button>
      </motion.div>
      <style>{`
        .pk-cta-btn {
          position: relative; overflow: hidden;
          display: inline-flex; align-items: center; gap: 10px;
          background: ${GREEN}; color: #fff; border: none; border-radius: 14px;
          padding: 16px 40px; cursor: pointer;
          font-family: 'Poppins', sans-serif; font-size: clamp(15px,1.1vw,18px); font-weight: 500;
          box-shadow: 0 16px 34px -14px rgba(60,185,140,0.75);
          transition: transform 0.25s ${'cubic-bezier(0.16,1,0.3,1)'}, background 0.25s ease, box-shadow 0.25s ease;
        }
        .pk-cta-btn span { position: relative; z-index: 1; }
        .pk-cta-btn::after { content:''; position:absolute; top:0; left:-120%; width:55%; height:100%; background:linear-gradient(110deg, transparent, rgba(255,255,255,0.45), transparent); transform: skewX(-18deg); transition: left 0.7s cubic-bezier(0.16,1,0.3,1); }
        .pk-cta-btn:hover { transform: translateY(-2px); background: #34ab80; box-shadow: 0 22px 44px -14px rgba(60,185,140,0.85); }
        .pk-cta-btn:hover::after { left: 135%; }
      `}</style>
    </section>
  )
}

/* Section wrapper helper */
export function Section({ children, mint, style }: { children: ReactNode; mint?: boolean; style?: React.CSSProperties }) {
  return (
    <section style={{
      background: mint
        ? 'linear-gradient(180deg, #ffffff 0%, #f3faf7 100%)'
        : '#ffffff',
      padding: 'clamp(64px,8vw,120px) 45px',
      ...style,
    }}>
      <div style={{ maxWidth: 'none', margin: '0 auto' }}>{children}</div>
    </section>
  )
}
