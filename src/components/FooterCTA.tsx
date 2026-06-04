import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

const NAVY  = '#08213C'
const GREEN = '#3CB98C'

export function FooterCTA() {
  return (
    <section style={{
      background: NAVY,
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Subtle top glow */}
      <div style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: '70%', height: '260px',
        background: `radial-gradient(ellipse at top, ${GREEN}0E 0%, transparent 65%)`,
        pointerEvents: 'none',
      }} />

      {/* Dot pattern */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `radial-gradient(rgba(255,255,255,0.035) 1px, transparent 1px)`,
        backgroundSize: '28px 28px',
      }} />

      <div style={{
        position: 'relative', zIndex: 1,
        padding: 'clamp(56px,7vw,100px) clamp(24px,5vw,80px)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: 32,
      }}>
        {/* Left — copy */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
            <div style={{ width: 28, height: 1.5, background: `${GREEN}80` }} />
            <span style={{
              fontSize: 10, fontWeight: 800, color: GREEN,
              letterSpacing: '2.8px', textTransform: 'uppercase',
            }}>
              Get in touch
            </span>
          </div>
          <h2 style={{
            fontSize: 'clamp(26px,3.5vw,50px)',
            fontWeight: 900, color: '#fff',
            letterSpacing: '-0.04em', lineHeight: 1.08,
            margin: '0 0 10px',
          }}>
            Ready to move your freight?
          </h2>
          <p style={{
            fontSize: 'clamp(14px,1.2vw,16px)',
            color: 'rgba(255,255,255,0.45)',
            lineHeight: 1.75, margin: 0,
            maxWidth: 480,
          }}>
            Get a personalised quote in under 4 hours - no obligation, no fuss.
            Our team is standing by.
          </p>
        </motion.div>

        {/* Right — actions */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          style={{ display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'flex-start' }}
        >
          <a
            href="https://wa.link/ozwuxc"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 11,
              padding: '15px 32px',
              background: GREEN, borderRadius: 9,
              fontSize: 14, fontWeight: 700, color: '#fff',
              textDecoration: 'none', letterSpacing: '0.2px',
              whiteSpace: 'nowrap',
              boxShadow: `0 8px 32px ${GREEN}50`,
              transition: 'all 0.22s ease',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement
              el.style.transform = 'translateY(-3px)'
              el.style.boxShadow = `0 14px 40px ${GREEN}65`
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement
              el.style.transform = 'translateY(0)'
              el.style.boxShadow = `0 8px 32px ${GREEN}50`
            }}
          >
            Start a Conversation
            <ArrowRight size={16} strokeWidth={2.2} />
          </a>

          <a
            href="tel:1800054555"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 9,
              fontSize: 13, fontWeight: 600,
              color: 'rgba(255,255,255,0.5)',
              textDecoration: 'none',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#fff' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)' }}
          >
            Or call us toll-free:&nbsp;
            <span style={{ color: GREEN, fontWeight: 700 }}>1800 054 555</span>
          </a>
        </motion.div>
      </div>

      {/* Bottom divider — merges visually with Footer */}
      <div style={{ height: 1, background: 'rgba(255,255,255,0.07)' }} />
    </section>
  )
}
