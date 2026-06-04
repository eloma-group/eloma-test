import { useState } from 'react'
import { useParams, Navigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Check, ArrowRight } from 'lucide-react'
import { Header } from '../components/Header/Header'
import { Footer } from '../components/Footer'
import { InnerHero, PageCTA, NAVY, GREEN, CREAM, ease } from '../components/InnerHero'
import { INDUSTRIES } from '../data/industryData'
import type { Challenge, Commitment } from '../data/industryData'

/* ── Challenge Card ───────────────────────────────────────── */
function ChallengeCard({ c, i }: { c: Challenge; i: number }) {
  const [hov, setHov] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.55, delay: i * 0.07, ease }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? `linear-gradient(140deg,#fff 55%,${GREEN}0C 100%)` : '#fff',
        border: `1.5px solid ${hov ? GREEN + '55' : 'rgba(8,33,60,0.07)'}`,
        borderRadius: 20,
        padding: 'clamp(24px,2.5vw,36px)',
        position: 'relative', overflow: 'hidden',
        transform: hov ? 'translateY(-8px) scale(1.018)' : 'translateY(0) scale(1)',
        boxShadow: hov
          ? `0 28px 56px rgba(60,185,140,0.18),0 8px 22px rgba(0,0,0,0.07)`
          : '0 2px 8px rgba(8,33,60,0.04)',
        transition: 'all 0.38s cubic-bezier(0.34,1.56,0.64,1)',
        cursor: 'default',
      }}
    >
      {/* left accent bar */}
      <div style={{
        position: 'absolute', left: 0, top: 0, height: '100%',
        width: hov ? 4 : 0,
        background: `linear-gradient(to bottom,${GREEN},${GREEN}30)`,
        borderRadius: '20px 0 0 20px',
        transition: 'width 0.32s ease',
      }} />

      {/* icon */}
      <div style={{
        width: 52, height: 52, borderRadius: 14, marginBottom: 20,
        background: hov ? `${GREEN}28` : `${GREEN}14`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transform: hov ? 'scale(1.2) rotate(8deg)' : 'scale(1) rotate(0deg)',
        boxShadow: hov ? `0 8px 22px ${GREEN}45` : 'none',
        transition: 'all 0.38s cubic-bezier(0.34,1.56,0.64,1)',
        flexShrink: 0,
      }}>
        <c.Icon size={22} strokeWidth={1.8} color={GREEN} />
      </div>

      {/* title */}
      <div style={{
        fontSize: 'clamp(15px,1.3vw,19px)', fontWeight: 800,
        color: hov ? GREEN : NAVY,
        letterSpacing: '-0.025em', marginBottom: 10,
        transition: 'color 0.25s ease',
      }}>{c.title}</div>

      {/* growing divider */}
      <div style={{
        height: 2, borderRadius: 2, marginBottom: 14,
        width: hov ? 40 : 0,
        background: `linear-gradient(90deg,${GREEN},${GREEN}30)`,
        transition: 'width 0.38s cubic-bezier(0.34,1.56,0.64,1)',
      }} />

      <p style={{
        fontSize: 'clamp(13px,1vw,15px)',
        color: 'rgba(8,33,60,0.48)',
        lineHeight: 1.75, margin: 0,
      }}>{c.desc}</p>
    </motion.div>
  )
}

/* ── Service Pill ─────────────────────────────────────────── */
function ServicePill({ label }: { label: string }) {
  const [hov, setHov] = useState(false)
  return (
    <Link
      to="/#services"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 7,
        padding: 'clamp(10px,1vw,14px) clamp(18px,1.8vw,26px)',
        borderRadius: 100, fontSize: 'clamp(12px,1vw,14px)', fontWeight: 700,
        color: hov ? '#fff' : NAVY,
        background: hov ? GREEN : '#fff',
        border: `1.5px solid ${hov ? GREEN : 'rgba(8,33,60,0.14)'}`,
        boxShadow: hov ? `0 6px 18px ${GREEN}40` : '0 2px 8px rgba(8,33,60,0.04)',
        textDecoration: 'none', whiteSpace: 'nowrap',
        transform: hov ? 'translateY(-3px)' : 'translateY(0)',
        transition: 'all 0.25s cubic-bezier(0.34,1.56,0.64,1)',
        minHeight: 44,
      }}
    >
      <ArrowRight size={13} strokeWidth={2.5} color={hov ? '#fff' : GREEN} style={{ transition: 'color 0.2s' }} />
      {label}
    </Link>
  )
}

/* ── Commitment Column ─────────────────────────────────────── */
function CommitmentColumn({ c, i, total }: { c: Commitment; i: number; total: number }) {
  const [hov, setHov] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.12, ease }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        flex: 1,
        borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.07)' : 'none',
        padding: 'clamp(40px,4vw,64px) clamp(32px,3.5vw,56px)',
        background: hov ? 'rgba(60,185,140,0.05)' : 'transparent',
        position: 'relative', overflow: 'hidden',
        transition: 'background 0.4s ease',
        cursor: 'default',
        minWidth: 0,
      }}
    >
      {/* Ghosted index */}
      <div style={{
        position: 'absolute', right: 'clamp(20px,2.5vw,36px)', bottom: 'clamp(20px,2.5vw,36px)',
        fontSize: 'clamp(80px,10vw,140px)', fontWeight: 900, lineHeight: 1,
        color: 'rgba(255,255,255,0.028)', letterSpacing: '-0.06em',
        userSelect: 'none', pointerEvents: 'none',
        fontVariantNumeric: 'tabular-nums',
      }}>
        {String(i + 1).padStart(2, '0')}
      </div>

      {/* Growing top bar */}
      <div style={{
        height: 2,
        width: hov ? '100%' : 'clamp(32px,3vw,48px)',
        background: GREEN,
        marginBottom: 'clamp(28px,3vw,40px)',
        transition: 'width 0.55s cubic-bezier(0.34,1.56,0.64,1)',
        boxShadow: hov ? `0 0 12px ${GREEN}60` : 'none',
      }} />

      {/* Category badge */}
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        marginBottom: 'clamp(16px,2vw,24px)',
      }}>
        <div style={{
          width: 5, height: 5, borderRadius: '50%',
          background: GREEN,
          boxShadow: hov ? `0 0 8px ${GREEN}` : 'none',
          transition: 'box-shadow 0.3s ease',
        }} />
        <span style={{
          fontSize: 'clamp(9px,0.7vw,11px)', fontWeight: 800,
          letterSpacing: '2.5px', textTransform: 'uppercase',
          color: hov ? GREEN : 'rgba(255,255,255,0.35)',
          transition: 'color 0.3s ease',
        }}>{c.category}</span>
      </div>

      {/* Statement */}
      <div style={{
        fontSize: 'clamp(22px,2.8vw,44px)', fontWeight: 900,
        color: hov ? GREEN : '#fff',
        letterSpacing: '-0.04em', lineHeight: 1.0,
        marginBottom: 'clamp(16px,2vw,24px)',
        textTransform: 'uppercase',
        transition: 'color 0.35s ease',
      }}>{c.statement}</div>

      {/* Body */}
      <p style={{
        fontSize: 'clamp(13px,1vw,15px)',
        color: 'rgba(255,255,255,0.42)',
        lineHeight: 1.8, margin: 0,
        maxWidth: '36ch',
      }}>{c.body}</p>

      {/* Bottom count indicator */}
      <div style={{
        marginTop: 'clamp(28px,3vw,40px)',
        display: 'flex', alignItems: 'center', gap: 8,
      }}>
        {Array.from({ length: total }).map((_, di) => (
          <div key={di} style={{
            height: 2, borderRadius: 2,
            width: di === i ? (hov ? 32 : 20) : 8,
            background: di === i ? GREEN : 'rgba(255,255,255,0.12)',
            transition: 'width 0.4s ease',
          }} />
        ))}
      </div>
    </motion.div>
  )
}

/* ── Page ─────────────────────────────────────────────────── */
export function IndustryPage() {
  const { slug } = useParams<{ slug: string }>()
  const industry = INDUSTRIES.find(ind => ind.slug === slug)

  if (!industry) return <Navigate to="/" replace />

  const groupColor: Record<string, string> = {
    Consumer: '#0d9a6a',
    Industrial: '#1d6ef5',
    Regulated: '#8b3cf7',
  }
  const accentColor = groupColor[industry.group] || GREEN

  return (
    <div style={{ background: CREAM, overflowX: 'hidden' }}>
      <Header />
      <main>

        {/* ── HERO ── */}
        <InnerHero
          badge={industry.badge}
          line1={industry.heroLine1}
          line2={industry.heroLine2}
          greenLine={industry.greenLine}
          description={industry.heroDescription}
          meta={industry.heroMeta}
        />

        {/* ── OVERVIEW ── */}
        <section style={{ background: CREAM, padding: 'clamp(64px,9vw,120px) clamp(24px,4vw,64px)' }}>
          <div style={{ maxWidth: 1760, margin: '0 auto' }} className="ind-overview-inner">
            <div className="ind-overview-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(40px,6vw,96px)', alignItems: 'start' }}>

              {/* Left — editorial heading */}
              <motion.div
                initial={{ opacity: 0, x: -32 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.8, ease }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 24 }}>
                  <div style={{ width: 3, height: 16, background: accentColor, borderRadius: 2 }} />
                  <span style={{
                    fontSize: 'clamp(10px,0.75vw,12px)', fontWeight: 800,
                    letterSpacing: '2.5px', textTransform: 'uppercase',
                    color: 'rgba(8,33,60,0.38)',
                  }}>{industry.overview.eyebrow}</span>
                </div>
                <h2 style={{
                  fontSize: 'clamp(32px,4.5vw,72px)', fontWeight: 900,
                  color: NAVY, letterSpacing: '-0.046em', lineHeight: 0.92,
                  margin: 0, textTransform: 'uppercase',
                }}>
                  {industry.overview.heading.split(' ').map((word, wi) => (
                    <span key={wi} style={{ color: word === 'AUSTRALIA.' || wi === industry.overview.heading.split(' ').length - 1 ? GREEN : NAVY }}>
                      {wi > 0 ? ' ' : ''}{word}
                    </span>
                  ))}
                </h2>
              </motion.div>

              {/* Right — body + key points */}
              <motion.div
                initial={{ opacity: 0, x: 32 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.8, ease, delay: 0.12 }}
                style={{ paddingTop: 'clamp(0px,2vw,20px)' }}
              >
                <p style={{
                  fontSize: 'clamp(14px,1.15vw,17px)',
                  color: 'rgba(8,33,60,0.55)', lineHeight: 1.85,
                  margin: '0 0 32px',
                }}>{industry.overview.body}</p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {industry.overview.keyPoints.map((pt, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 + i * 0.07, ease }}
                      style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}
                    >
                      <div style={{
                        width: 22, height: 22, borderRadius: '50%',
                        background: `${GREEN}18`, border: `1.5px solid ${GREEN}40`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0, marginTop: 2,
                      }}>
                        <Check size={12} strokeWidth={2.8} color={GREEN} />
                      </div>
                      <span style={{
                        fontSize: 'clamp(13px,1vw,15px)', fontWeight: 600,
                        color: NAVY, lineHeight: 1.5,
                      }}>{pt}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── HOW WE HELP ── */}
        <section style={{ background: '#fff', padding: 'clamp(64px,9vw,120px) clamp(24px,4vw,64px)' }}>
          <div style={{ maxWidth: 1760, margin: '0 auto' }} className="ind-help-inner">

            {/* section header */}
            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.65, ease }}
              style={{ marginBottom: 'clamp(40px,5vw,64px)' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 16 }}>
                <div style={{ width: 3, height: 14, background: GREEN, borderRadius: 2 }} />
                <span style={{
                  fontSize: 11, fontWeight: 800, letterSpacing: '2px',
                  textTransform: 'uppercase', color: 'rgba(8,33,60,0.38)',
                }}>How We Help</span>
              </div>
              <h2 style={{
                fontSize: 'clamp(32px,4.5vw,72px)', fontWeight: 900,
                color: NAVY, letterSpacing: '-0.046em', lineHeight: 0.95,
                margin: '0 0 18px', textTransform: 'uppercase',
              }}>
                THE CHALLENGES <span style={{ color: GREEN }}>WE SOLVE.</span>
              </h2>
              <p style={{
                fontSize: 'clamp(14px,1.1vw,16px)',
                color: 'rgba(8,33,60,0.48)', lineHeight: 1.75,
                maxWidth: 520, margin: 0,
              }}>
                Every {industry.name} operation faces unique freight challenges. Here's how Bivry addresses them.
              </p>
            </motion.div>

            {/* challenge cards grid */}
            <div className="ind-cards-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20 }}>
              {industry.challenges.map((c, i) => <ChallengeCard key={c.title} c={c} i={i} />)}
            </div>
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section style={{ background: CREAM, padding: 'clamp(64px,9vw,120px) clamp(24px,4vw,64px)' }}>
          <div style={{ maxWidth: 1760, margin: '0 auto' }} className="ind-services-inner">
            <div className="ind-services-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 'clamp(40px,5vw,80px)', alignItems: 'start' }}>

              {/* left: heading */}
              <motion.div
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.65, ease }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 16 }}>
                  <div style={{ width: 3, height: 14, background: GREEN, borderRadius: 2 }} />
                  <span style={{
                    fontSize: 11, fontWeight: 800, letterSpacing: '2px',
                    textTransform: 'uppercase', color: 'rgba(8,33,60,0.38)',
                  }}>Services</span>
                </div>
                <h2 style={{
                  fontSize: 'clamp(28px,3.5vw,56px)', fontWeight: 900,
                  color: NAVY, letterSpacing: '-0.046em', lineHeight: 0.95,
                  margin: '0 0 20px', textTransform: 'uppercase',
                }}>
                  WHAT WE <span style={{ color: GREEN }}>PROVIDE.</span>
                </h2>
                <p style={{
                  fontSize: 'clamp(13px,1vw,15px)',
                  color: 'rgba(8,33,60,0.48)', lineHeight: 1.75, margin: 0,
                }}>
                  Core services deployed for {industry.name} operations across our network.
                </p>
              </motion.div>

              {/* right: pill tags */}
              <motion.div
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.65, ease, delay: 0.1 }}
                style={{ display: 'flex', flexWrap: 'wrap', gap: 12, paddingTop: 'clamp(0px,1.5vw,16px)' }}
              >
                {industry.services.map(svc => <ServicePill key={svc} label={svc} />)}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── COMMITMENTS ── */}
        <section style={{ background: NAVY, position: 'relative', overflow: 'hidden' }}>
          {/* Subtle noise / dot grid */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.022) 1px, transparent 1px)',
            backgroundSize: '32px 32px', pointerEvents: 'none',
          }} />
          {/* Ambient glow */}
          <div style={{
            position: 'absolute', top: '-15%', left: '30%',
            width: '40%', height: '130%',
            background: `radial-gradient(ellipse,${GREEN}08 0%,transparent 65%)`,
            pointerEvents: 'none',
          }} />

          {/* Top hairline */}
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ height: 1, background: 'rgba(255,255,255,0.06)' }} />

            {/* Columns — no max-width, bleeds full width with internal padding */}
            <div className="ind-commit-row" style={{ display: 'flex' }}>
              {industry.commitments.map((c, i) => (
                <CommitmentColumn
                  key={c.category}
                  c={c}
                  i={i}
                  total={industry.commitments.length}
                />
              ))}
            </div>

            <div style={{ height: 1, background: 'rgba(255,255,255,0.06)' }} />
          </div>
        </section>

        {/* ── OTHER INDUSTRIES ── */}
        <section style={{ background: '#fff', padding: 'clamp(48px,7vw,96px) clamp(24px,4vw,64px)' }}>
          <div style={{ maxWidth: 1760, margin: '0 auto' }} className="ind-other-inner">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20, marginBottom: 'clamp(28px,3vw,40px)' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 12 }}>
                  <div style={{ width: 3, height: 14, background: GREEN, borderRadius: 2 }} />
                  <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(8,33,60,0.38)' }}>Industries</span>
                </div>
                <h2 style={{ fontSize: 'clamp(22px,2.8vw,42px)', fontWeight: 900, color: NAVY, letterSpacing: '-0.04em', lineHeight: 1, margin: 0, textTransform: 'uppercase' }}>
                  OTHER SECTORS <span style={{ color: GREEN }}>WE SERVE.</span>
                </h2>
              </div>
              <Link to="/" style={{ fontSize: 13, fontWeight: 700, color: GREEN, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap' }}>
                View All Industries <ArrowRight size={14} strokeWidth={2.5} />
              </Link>
            </div>

            <div className="ind-other-grid" style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {INDUSTRIES.filter(ind => ind.slug !== slug).map((ind, i) => (
                <motion.div
                  key={ind.slug}
                  initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.04, ease }}
                >
                  <Link
                    to={`/industries/${ind.slug}`}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 8,
                      padding: '10px 20px', borderRadius: 100,
                      fontSize: 'clamp(11px,0.9vw,13px)', fontWeight: 700,
                      color: 'rgba(8,33,60,0.65)',
                      background: 'rgba(8,33,60,0.04)',
                      border: '1.5px solid rgba(8,33,60,0.09)',
                      textDecoration: 'none',
                      transition: 'all 0.22s ease',
                      minHeight: 44,
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLElement
                      el.style.background = `${GREEN}12`
                      el.style.borderColor = `${GREEN}50`
                      el.style.color = NAVY
                      el.style.transform = 'translateY(-2px)'
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLElement
                      el.style.background = 'rgba(8,33,60,0.04)'
                      el.style.borderColor = 'rgba(8,33,60,0.09)'
                      el.style.color = 'rgba(8,33,60,0.65)'
                      el.style.transform = 'translateY(0)'
                    }}
                  >
                    <span style={{
                      width: 6, height: 6, borderRadius: '50%',
                      background: groupColor[ind.group] || GREEN,
                      flexShrink: 0,
                    }} />
                    {ind.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <PageCTA
          line1={industry.ctaLine1}
          line2={industry.ctaLine2}
          sub={`Talk to our ${industry.name} logistics specialists - we'll design a solution around your operation.`}
        />

      </main>
      <Footer />

      <style>{`
        .ind-overview-grid { grid-template-columns: 1fr 1fr; }
        .ind-services-layout { grid-template-columns: 1fr 2fr; }
        .ind-commit-row { flex-direction: row; }

        @media (max-width: 1024px) {
          .ind-cards-grid { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media (max-width: 860px) {
          .ind-overview-grid { grid-template-columns: 1fr !important; }
          .ind-services-layout { grid-template-columns: 1fr !important; }
          .ind-commit-row { flex-direction: column !important; }
          .ind-commit-row > div { border-left: none !important; border-top: 1px solid rgba(255,255,255,0.07) !important; }
          .ind-commit-row > div:first-child { border-top: none !important; }
        }
        @media (max-width: 640px) {
          .ind-cards-grid { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 1920px) {
          .ind-overview-inner,
          .ind-help-inner,
          .ind-services-inner,
          .ind-other-inner { max-width: 1900px !important; }
          .ind-cards-grid { grid-template-columns: repeat(4,1fr) !important; }
        }
        @media (min-width: 2560px) {
          .ind-overview-inner,
          .ind-help-inner,
          .ind-services-inner,
          .ind-other-inner { max-width: 2400px !important; }
        }
      `}</style>
    </div>
  )
}
