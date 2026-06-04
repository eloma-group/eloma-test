import { motion } from 'framer-motion'
import { ArrowUpRight, Truck, Building2, Briefcase } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useIntersection } from '../hooks/useIntersection'

// Matches SplashScreen: 700 delay + 1900 fill + 380 pause + 550 exit fade
const SPLASH_MS = 3530

const GREEN = '#3CB98C'

const BADGES = [
  { icon: Truck,      label: 'Interstate Road Transport',  sub: 'All Australian States'   },
  { icon: Building2,  label: 'Warehousing',               sub: 'Multi Location'          },
  { icon: Briefcase,  label: 'Contract Logistics',        sub: 'Tailored to Your KPIs'   },
]

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number]

// Top-level stagger — orchestrates every block
const page = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.18, delayChildren: 0.1 } },
}

// Eyebrow: slide in from left
const slideLeft = {
  hidden:  { opacity: 0, x: -32 },
  visible: { opacity: 1, x: 0,  transition: { duration: 0.75, ease: EASE } },
}

// Headline container — staggers the three lines
const headGroup = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.15 } },
}

// Each headline line: blur-clear + rise
const blurUp = {
  hidden:  { opacity: 0, y: 44, filter: 'blur(10px)' },
  visible: { opacity: 1, y: 0,  filter: 'blur(0px)', transition: { duration: 1, ease: EASE } },
}

// Subtitle / supporting text: softer blur-up
const fadeUp = {
  hidden:  { opacity: 0, y: 22, filter: 'blur(5px)' },
  visible: { opacity: 1, y: 0,  filter: 'blur(0px)', transition: { duration: 0.85, ease: EASE } },
}

// CTA group — staggers the two buttons
const ctaGroup = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.11 } },
}
const ctaItem = {
  hidden:  { opacity: 0, scale: 0.9, y: 16 },
  visible: { opacity: 1, scale: 1,   y: 0,  transition: { duration: 0.65, ease: EASE } },
}

// Badge group — staggers the three cards
const badgeGroup = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1 } },
}
const badgeItem = {
  hidden:  { opacity: 0, y: 32, scale: 0.93 },
  visible: { opacity: 1, y: 0,  scale: 1,   transition: { duration: 0.7, ease: EASE } },
}

const HEADLINE_LINES = [
  { text: 'Built to Move', color: '#ffffff' },
  { text: 'Every Tonne,', color: GREEN },
  { text: 'Every Time.',  color: '#ffffff' },
]

export function Hero7() {
  const { ref, isVisible } = useIntersection(0.15)
  const [splashDone, setSplashDone] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setSplashDone(true), SPLASH_MS)
    return () => clearTimeout(t)
  }, [])

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="hero7"
      style={{
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        paddingTop: 'clamp(80px, 10vh, 160px)',
        paddingBottom: 'clamp(48px, 6vh, 100px)',
      }}
    >
      {/* Video background */}
      <video
        autoPlay muted loop playsInline
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', zIndex: 0 }}
      >
        <source src="/images/Homepage 1.mp4" type="video/mp4" />
      </video>

      {/* Left-side navy overlay */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: `linear-gradient(
          to right,
          rgba(8,33,60,0.97) 0%,
          rgba(8,33,60,0.92) 16%,
          rgba(8,33,60,0.78) 28%,
          rgba(8,33,60,0.52) 42%,
          rgba(8,33,60,0.22) 56%,
          rgba(8,33,60,0.04) 66%,
          transparent 72%
        )`,
      }} />

      {/* Top-edge nav blend */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
        background: `linear-gradient(to bottom, rgba(8,33,60,0.45) 0%, transparent 12%)`,
      }} />

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 3,
        width: '100%',
        paddingLeft:  'clamp(24px, 5vw, 80px)',
        paddingRight: 'clamp(24px, 5vw, 80px)',
      }}>
        <motion.div
          variants={page}
          initial="hidden"
          animate={(isVisible && splashDone) ? 'visible' : 'hidden'}
          style={{ maxWidth: '680px' }}
        >
          {/* Eyebrow */}
          <motion.div variants={slideLeft} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '22px' }}>
            <div style={{ width: '28px', height: '2px', background: GREEN, borderRadius: '2px' }} />
            <span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: GREEN }}>
              Australia's Premier Freight Partner
            </span>
          </motion.div>

          {/* Headline — each line animates independently */}
          <motion.div variants={headGroup} style={{ marginBottom: '26px' }}>
            {HEADLINE_LINES.map(({ text, color }) => (
              <motion.div
                key={text}
                variants={blurUp}
                style={{
                  fontSize: 'clamp(42px, 6.5vw, 86px)',
                  fontWeight: 800,
                  color,
                  lineHeight: 1.04,
                  letterSpacing: '-2px',
                }}
              >
                {text}
              </motion.div>
            ))}
          </motion.div>

          {/* Subtitle */}
          <motion.p
            variants={fadeUp}
            style={{
              fontSize: 'clamp(15px, 1.5vw, 18px)',
              color: 'rgba(255,255,255,0.62)',
              lineHeight: 1.8,
              maxWidth: '520px',
              marginBottom: '40px',
              fontWeight: 400,
            }}
          >
            BIVRY delivers premium road freight, warehousing, and last-mile
            distribution across Australia - reliable, trackable, and engineered
            around your supply chain.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={ctaGroup} style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '56px' }}>
            <motion.a
              href="#contact"
              variants={ctaItem}
              whileHover={{ y: -2, boxShadow: '0 20px 48px rgba(60,185,140,0.52)' }}
              transition={{ duration: 0.2 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '16px 32px', fontSize: '14px', fontWeight: 700,
                color: '#fff', background: GREEN, borderRadius: '50px',
                cursor: 'pointer', letterSpacing: '0.3px', textDecoration: 'none',
                boxShadow: '0 8px 28px rgba(60,185,140,0.38)',
              }}
            >
              Get a Free Quote <ArrowUpRight size={16} strokeWidth={2.5} />
            </motion.a>
            <motion.a
              href="#services"
              variants={ctaItem}
              whileHover={{ y: -2, borderColor: 'rgba(255,255,255,0.5)', background: 'rgba(255,255,255,0.1)' }}
              transition={{ duration: 0.2 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '16px 32px', fontSize: '14px', fontWeight: 600,
                color: 'rgba(255,255,255,0.88)',
                background: 'rgba(255,255,255,0.07)',
                borderRadius: '50px',
                border: '1.5px solid rgba(255,255,255,0.22)',
                cursor: 'pointer', letterSpacing: '0.3px', textDecoration: 'none',
              }}
            >
              Our Services
            </motion.a>
          </motion.div>

          {/* Badges */}
          <motion.div variants={badgeGroup} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {BADGES.map(({ icon: Icon, label, sub }) => (
              <motion.div
                key={label}
                variants={badgeItem}
                style={{
                  display: 'flex', alignItems: 'center', gap: '12px',
                  padding: '12px 18px',
                  background: 'rgba(255,255,255,0.06)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: '12px',
                  minWidth: 'clamp(140px, 18vw, 190px)',
                }}
              >
                <div style={{
                  width: '36px', height: '36px', borderRadius: '8px',
                  background: 'rgba(60,185,140,0.15)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <Icon size={17} color={GREEN} strokeWidth={2} />
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#fff', lineHeight: 1.2 }}>
                    {label}
                  </div>
                  <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.45)', marginTop: '2px' }}>
                    {sub}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
