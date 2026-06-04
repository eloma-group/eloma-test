import React from 'react'
import { motion } from 'framer-motion'
import { testimonials, type Testimonial } from '../data/testimonials'

const NAVY  = '#08213C'
const GREEN = '#3CB98C'

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

/* ─── Avatar colours cycling through 4 tints ─── */
const AVATAR_PALETTE = [
  { bg: '#E8F8F2', fg: '#2A9B74' },
  { bg: '#E4EDF8', fg: '#2A5A9B' },
  { bg: '#F5EEE3', fg: '#966E2C' },
  { bg: '#EDE8F8', fg: '#6B4FB8' },
]

function Avatar({ index }: { index: number }) {
  const { bg, fg } = AVATAR_PALETTE[index % AVATAR_PALETTE.length]
  return (
    <div style={{
      width: '40px', height: '40px', borderRadius: '50%',
      background: bg, display: 'flex', alignItems: 'center',
      justifyContent: 'center', flexShrink: 0,
    }}>
      <svg viewBox="0 0 24 24" fill="none" width="20" height="20" aria-hidden="true">
        <circle cx="12" cy="8" r="3.8" fill={fg}/>
        <path d="M4 20c0-4.1 3.6-7.2 8-7.2s8 3.1 8 7.2" fill={fg} opacity=".5"/>
      </svg>
    </div>
  )
}

/* ─── Five-star row ─── */
function Stars() {
  return (
    <div style={{ display: 'flex', gap: '3px', marginBottom: '14px' }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 16 16" fill="#F5A623" width="14" height="14">
          <path d="M8 1.2l1.85 3.75L14 5.68l-3 2.92.7 4.12L8 10.55 4.3 12.72l.7-4.12L2 5.68l4.15-.71L8 1.2z"/>
        </svg>
      ))}
    </div>
  )
}

/* ─── Single testimonial card ─── */
function Card({ t, idx }: { t: Testimonial; idx: number }) {
  return (
    <motion.div
      whileHover={{
        y: -6,
        boxShadow: '0 20px 48px rgba(8,33,60,0.12), 0 0 0 1.5px rgba(8,33,60,0.08)',
        transition: { type: 'spring', stiffness: 380, damping: 22 },
      }}
      style={{
        background: '#ffffff',
        border: '1px solid rgba(8,33,60,0.08)',
        borderRadius: '18px',
        padding: '24px',
        boxShadow: '0 2px 12px rgba(8,33,60,0.05)',
        cursor: 'default',
        userSelect: 'none',
      }}
    >
      <Stars/>
      <p style={{
        fontSize: '14px',
        color: 'rgba(8,33,60,0.65)',
        lineHeight: 1.76,
        margin: '0 0 20px',
      }}>
        &ldquo;{t.quote}&rdquo;
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Avatar index={idx}/>
        <div>
          <div style={{ fontSize: '13.5px', fontWeight: 700, color: NAVY, lineHeight: 1.3 }}>
            {t.author}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* ─── Infinite-scroll column ─── */
function ScrollColumn({
  items, duration, offset, hide,
}: {
  items: Testimonial[]
  duration: number
  offset: number
  hide?: 'md' | 'lg'
}) {
  return (
    <div
      style={{ flex: 1, overflow: 'hidden', minWidth: 0 }}
      className={hide === 'md' ? 'hidden md:block' : hide === 'lg' ? 'hidden lg:block' : undefined}
    >
      <motion.div
        animate={{ y: '-50%' }}
        transition={{ duration, repeat: Infinity, ease: 'linear', repeatType: 'loop' }}
        style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}
      >
        {[0, 1].map(rep => (
          <React.Fragment key={rep}>
            {items.map((t, i) => (
              <Card key={`${rep}-${i}`} t={t} idx={offset + i}/>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  )
}

/* ─── Section ─── */
export function Testimonials() {
  const col1 = testimonials.slice(0, 3)
  const col2 = testimonials.slice(3, 6)
  const col3 = testimonials.slice(6, 9)

  return (
    <section
      style={{
        background: '#F4F8FB',
        backgroundImage: 'radial-gradient(rgba(8,33,60,0.035) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
        padding: 'clamp(72px,9vw,112px) clamp(24px,4vw,64px)',
        borderTop: '1px solid rgba(8,33,60,0.07)',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.65, ease }}
        style={{ textAlign: 'center', marginBottom: 'clamp(48px,6vw,72px)' }}
      >
        {/* Label */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: '14px', marginBottom: '24px',
        }}>
          <div style={{ height: '1px', width: '52px', background: `${GREEN}55` }}/>
          <span style={{
            fontSize: '11px', fontWeight: 700, letterSpacing: '3px',
            textTransform: 'uppercase', color: GREEN,
          }}>
            Client Stories
          </span>
          <div style={{ height: '1px', width: '52px', background: `${GREEN}55` }}/>
        </div>

        <h2 style={{
          fontSize: 'clamp(30px,4vw,48px)',
          fontWeight: 800, color: NAVY,
          letterSpacing: '-0.04em', lineHeight: 1.1,
          margin: '0 0 18px',
        }}>
          Trusted Across Australia.
        </h2>

        <p style={{
          fontSize: 'clamp(14px,1.1vw,16px)',
          color: 'rgba(8,33,60,0.52)',
          lineHeight: 1.75, margin: '0 auto',
          maxWidth: '480px',
        }}>
          Businesses across every state rely on BIVRY to move their freight on time, every time.
        </p>
      </motion.div>

      {/* Scrolling columns */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.7, delay: 0.15, ease }}
        style={{
          display: 'flex',
          gap: '14px',
          maxHeight: '680px',
          overflow: 'hidden',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)',
          maskImage:        'linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)',
        }}
      >
        <ScrollColumn items={col1} duration={22} offset={0}/>
        <ScrollColumn items={col2} duration={28} offset={3} hide="md"/>
        <ScrollColumn items={col3} duration={25} offset={6} hide="lg"/>
      </motion.div>
    </section>
  )
}
