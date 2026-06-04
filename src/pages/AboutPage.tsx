import { useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight, ArrowRight } from 'lucide-react'
import { Header } from '../components/Header/Header'
import { Footer } from '../components/Footer'
import { NAVY, GREEN, CREAM } from '../components/InnerHero'

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

const PILLARS = [
  { num: '01', title: 'Reliability',   text: 'On time, every time - no exceptions. Our network is built around one promise: your freight lands exactly when you need it.' },
  { num: '02', title: 'Transparency',  text: 'Real-time visibility across every leg of your freight journey. Track anything, anywhere, anytime.' },
  { num: '03', title: 'Partnership',   text: 'We grow when you grow. Long-term relationships built on consistent results, not lock-in contracts.' },
]

export function AboutPage() {
  const navigate = useNavigate()

  const goToServices = (e: React.MouseEvent) => {
    e.preventDefault()
    navigate('/')
    setTimeout(() => {
      const el = document.getElementById('services')
      if (!el) return
      const lenis = (window as unknown as Record<string, unknown>).__lenis as { scrollTo: (el: Element, opts: object) => void } | undefined
      if (lenis) lenis.scrollTo(el, { offset: -64, duration: 1.4 })
      else el.scrollIntoView({ behavior: 'smooth' })
    }, 200)
  }

  /* load cursive font for signature section */
  useEffect(() => {
    const link = document.createElement('link')
    link.href = 'https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap'
    link.rel = 'stylesheet'
    document.head.appendChild(link)
    return () => { try { document.head.removeChild(link) } catch { /* already removed */ } }
  }, [])

  /* ── Banner scroll: logo shrinks into header ── */
  const bannerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress: bannerProg } = useScroll({
    target: bannerRef,
    offset: ['start start', 'end start'],
  })
  const logoScale = useTransform(bannerProg, [0, 0.88], [1, 0.115])


  return (
    <div style={{ background: CREAM, overflowX: 'hidden' }}>
      <Header />

      {/* ════════════════════════════════════════════
          SECTION 1 — BANNER  (logo shrinks on scroll)
         ════════════════════════════════════════════ */}
      <div ref={bannerRef} style={{ height: '100vh' }}>
        <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', background: CREAM }}>

          {/* BIVRY wordmark — huge, scales to tiny on scroll */}
          <motion.div
            style={{
              position: 'absolute',
              top: 72,
              left: 'clamp(24px,4vw,64px)',
              transformOrigin: 'top left',
              scale: logoScale,
              zIndex: 1,
              pointerEvents: 'none',
              userSelect: 'none',
            }}
          >
            <div style={{
              fontSize: 'clamp(80px, 21vw, 440px)', fontWeight: 900, lineHeight: 0.88,
              letterSpacing: '-0.048em', textTransform: 'uppercase', color: NAVY,
            }}>
              BIVRY
            </div>
          </motion.div>

          {/* Right column */}
          <div className="about-banner-right" style={{
            position: 'absolute', right: 0, top: 0,
            width: '46%', height: '100%',
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            padding: '88px clamp(32px,5vw,80px) 56px',
            zIndex: 2,
          }}>
            <h1 style={{
              fontSize: 'clamp(20px,2.4vw,36px)', fontWeight: 400,
              color: NAVY, lineHeight: 1.42, letterSpacing: '-0.02em',
              margin: 0, maxWidth: 400,
              marginTop: 'clamp(60px,10vh,120px)',
              paddingLeft: 'clamp(20px,3vw,48px)',
            }}>
              A freight network built for reliability, speed and trust - connecting Australian businesses coast to coast.
            </h1>

            <div style={{ paddingLeft: 'clamp(20px,3vw,48px)' }}>
              <p style={{ fontSize: 'clamp(14px, 1.05vw, 20px)', color: 'rgba(8,33,60,0.48)', lineHeight: 1.8, margin: '0 0 28px', maxWidth: 'clamp(360px, 30vw, 520px)' }}>
                Born in Melbourne with one truck. Today a national depot network serving businesses of every size across every state and territory.
              </p>
              <a href="#about-story"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: NAVY, color: '#fff',
                  padding: 'clamp(13px, 1vw, 18px) clamp(22px, 1.8vw, 32px)',
                  fontSize: 'clamp(11px, 0.72vw, 14px)', fontWeight: 800,
                  letterSpacing: '2.5px', textTransform: 'uppercase',
                  textDecoration: 'none', transition: 'background 0.2s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = GREEN }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = NAVY }}
              >
                ABOUT BIVRY <ArrowUpRight size={13} strokeWidth={2.5} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ══ Green anchor bar ══ */}
      <div id="about-story" style={{ background: GREEN }}>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '22px clamp(32px,5vw,80px)',
        }}>
          <span style={{ fontSize: 'clamp(10px,1.05vw,13px)', fontWeight: 800, color: '#fff', letterSpacing: '2.5px', textTransform: 'uppercase' }}>
            THE ONE THING YOU NEED TO KNOW ABOUT BIVRY
          </span>
          <span style={{ fontSize: 18, color: 'rgba(255,255,255,0.65)', fontWeight: 900 }}>→</span>
        </div>
      </div>

      {/* ════════════════════════════════════════════
          SECTION 2 — MANIFESTO + CAPABILITIES
         ════════════════════════════════════════════ */}
      <section className="manifesto-section" style={{ background: NAVY, padding: 'clamp(72px,9vw,128px) clamp(24px,5vw,80px)' }}>
        <div className="manifesto-inner" style={{ maxWidth: 1760, margin: '0 auto' }}>

          {/* Top row: eyebrow + headline */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(40px,6vw,100px)', alignItems: 'start', marginBottom: 'clamp(56px,7vw,96px)' }} className="manifesto-grid">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.6, ease }}
                style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 32 }}
              >
                <div style={{ width: 3, height: 14, background: GREEN, borderRadius: 2 }} />
                <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>
                  About Bivry
                </span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.8, ease, delay: 0.06 }}
              >
                <div style={{
                  fontSize: 'clamp(36px,5.5vw,78px)', fontWeight: 900, color: '#fff',
                  letterSpacing: '-0.045em', lineHeight: 0.9, textTransform: 'uppercase',
                }}>
                  WE MOVE<br />WHAT<br /><span style={{ color: GREEN }}>MATTERS.</span>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7, ease, delay: 0.18 }}
              style={{ paddingTop: 'clamp(0px,3vw,48px)' }}
            >
              <p style={{ fontSize: 'clamp(14px,1.15vw,18px)', color: 'rgba(255,255,255,0.52)', lineHeight: 1.88, margin: '0 0 36px' }}>
                We started with one truck and one promise: your freight arrives on time. That promise hasn't changed - but our reach has. Today Bivry connects businesses from Darwin to Hobart, Broome to Brisbane, with the same care we gave our very first customer.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ height: 1, flex: 1, background: `${GREEN}44` }} />
                <span style={{ fontSize: 10, fontWeight: 800, color: 'rgba(255,255,255,0.22)', letterSpacing: '2px', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
                  Melbourne → Nationwide
                </span>
              </div>
            </motion.div>
          </div>

          {/* Bottom row: capability strips */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            {[
              { label: 'Road Freight',         desc: 'Interstate & metro lanes, B-double to van' },
              { label: 'Same-Day Delivery',     desc: 'When hours count - local and regional' },
              { label: 'Warehousing',           desc: 'Pick, pack and dispatch from our depots' },
              { label: 'Contract Logistics',    desc: 'Dedicated freight solutions at scale' },
            ].map((item, i) => (
              <motion.div key={item.label}
                initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.07, ease }}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: 'clamp(18px,2.2vw,28px) 0',
                  borderBottom: '1px solid rgba(255,255,255,0.08)',
                  gap: 24,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: GREEN, flexShrink: 0 }} />
                  <span style={{ fontSize: 'clamp(15px,1.4vw,20px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', textTransform: 'uppercase' }}>
                    {item.label}
                  </span>
                </div>
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.36)', fontWeight: 500, textAlign: 'right', maxWidth: 280 }}>
                  {item.desc}
                </span>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ════════════════════════════════════════════
          SECTION 3 — SIGNATURE: TRUSTED Partnerships.
         ════════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(80px,10vw,140px) clamp(24px,4vw,64px)', background: '#fff' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '55% 1fr', gap: 'clamp(40px,5vw,80px)', alignItems: 'start' }} className="sig-grid">

          {/* LEFT — headline + cursive */}
          <div>
            {['MOST OF OUR', 'NEW CLIENTS', 'COME FROM', 'TRUSTED'].map((line, i) => (
              <motion.div key={line}
                initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.7, ease, delay: i * 0.07 }}
                style={{
                  fontSize: 'clamp(38px,7.5vw,112px)', fontWeight: 900, color: NAVY,
                  letterSpacing: '-0.045em', lineHeight: 0.9, textTransform: 'uppercase',
                }}
              >
                {line}
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.94 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, ease, delay: 0.36 }}
              style={{
                fontFamily: "'Dancing Script', cursive",
                fontSize: 'clamp(44px,8vw,122px)',
                fontWeight: 700, color: GREEN,
                letterSpacing: '-0.01em', lineHeight: 0.95,
                marginTop: '-0.06em', marginLeft: '0.5em',
              }}
            >
              Partnerships.
            </motion.div>
          </div>

          {/* RIGHT — body + trust signals */}
          <motion.div
            initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8, ease, delay: 0.2 }}
            style={{ paddingTop: 'clamp(8px,2vw,32px)' }}
          >
            <p style={{ fontSize: 'clamp(16px,1.45vw,21px)', color: 'rgba(8,33,60,0.58)', lineHeight: 1.88, margin: '0 0 40px' }}>
              That's how a freight company that started with one truck built a national network: through reliability, consistency, and a shared commitment to delivery. Route by route, client after client - let the work speak for itself.
            </p>

            {/* Trust signals */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0, borderTop: '1px solid rgba(8,33,60,0.08)' }}>
              {[
                { title: 'Word of mouth', sub: 'Most new clients arrive through referrals from existing partners.' },
                { title: 'Long-term accounts', sub: 'The majority of our clients have been with us for years.' },
                { title: 'No lock-in contracts', sub: 'We earn your business every single delivery.' },
              ].map((item, i) => (
                <motion.div key={item.title}
                  initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.28 + i * 0.08, ease }}
                  style={{
                    display: 'flex', gap: 16, alignItems: 'flex-start',
                    padding: 'clamp(16px,1.8vw,22px) 0',
                    borderBottom: '1px solid rgba(8,33,60,0.08)',
                  }}
                >
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: GREEN, marginTop: 7, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 800, color: NAVY, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>
                      {item.title}
                    </div>
                    <div style={{ fontSize: 15, color: 'rgba(8,33,60,0.46)', lineHeight: 1.75 }}>
                      {item.sub}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </section>

      {/* ════════════════════════════════════════════
          SECTION 4 — WHAT WE DO
         ════════════════════════════════════════════ */}
      <section style={{ padding: '0 clamp(24px,4vw,64px) clamp(80px,10vw,140px)', background: '#fff' }}>

        <motion.div
          initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8, ease }}
        >
          <div style={{
            fontSize: 'clamp(60px,14.5vw,208px)', fontWeight: 900, color: NAVY,
            letterSpacing: '-0.05em', lineHeight: 0.85, textTransform: 'uppercase',
          }}>
            WHAT
          </div>
        </motion.div>

        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 32 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7, ease, delay: 0.15 }}
            style={{ maxWidth: 'clamp(260px,30vw,420px)', paddingTop: 'clamp(16px,2vw,28px)', position: 'relative', zIndex: 2 }}
          >
            <p style={{ fontSize: 'clamp(15px,1.3vw,19px)', color: NAVY, lineHeight: 1.8, marginBottom: 32 }}>
              Reliability is nothing without speed. We deliver both. Road freight, same-day delivery, warehousing and contract logistics - all under one roof, across every Australian state.
            </p>
            <a href="/#services" onClick={goToServices}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: NAVY, color: '#fff',
                padding: '13px 22px', fontSize: 11, fontWeight: 800,
                letterSpacing: '2.5px', textTransform: 'uppercase',
                textDecoration: 'none', transition: 'background 0.2s',
                cursor: 'pointer', position: 'relative', zIndex: 2,
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = GREEN }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = NAVY }}
            >
              OUR SERVICES <ArrowUpRight size={13} strokeWidth={2.5} />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8, ease, delay: 0.08 }}
          >
            <div style={{
              fontSize: 'clamp(60px,14.5vw,208px)', fontWeight: 900, color: GREEN,
              letterSpacing: '-0.05em', lineHeight: 0.85, textTransform: 'uppercase',
            }}>
              BIVRY
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8, ease, delay: 0.2 }}
        >
          <div style={{
            fontSize: 'clamp(60px,14.5vw,208px)', fontWeight: 900,
            letterSpacing: '-0.05em', lineHeight: 0.85, textTransform: 'uppercase',
            WebkitTextStroke: `2px ${NAVY}`, color: 'transparent',
          }}>
            DO.
          </div>
        </motion.div>
      </section>

      {/* ════════════════════════════════════════════
          VALUES TEASER
         ════════════════════════════════════════════ */}
      <section style={{ background: CREAM, padding: 'clamp(72px,8vw,100px) clamp(24px,5vw,80px)' }}>
        <div style={{ maxWidth: 1760, margin: '0 auto' }}>

          {/* Header row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 'clamp(40px,5vw,64px)', flexWrap: 'wrap', gap: 24 }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 16 }}>
                <div style={{ width: 3, height: 14, background: GREEN, borderRadius: 2 }} />
                <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(8,33,60,0.38)' }}>Our Values</span>
              </div>
              <h2 style={{ fontSize: 'clamp(32px,4.5vw,58px)', fontWeight: 900, color: NAVY, letterSpacing: '-0.04em', lineHeight: 0.9, margin: 0, textTransform: 'uppercase' }}>
                WHAT DRIVES<br /><span style={{ color: GREEN }}>BIVRY.</span>
              </h2>
            </motion.div>
            <motion.a href="/values" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 9, border: '1.5px solid rgba(8,33,60,0.18)', borderRadius: 100, padding: '11px 22px', fontSize: 13, fontWeight: 700, color: NAVY, textDecoration: 'none', transition: 'all 0.25s ease' }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = NAVY; el.style.color = '#fff'; el.style.borderColor = NAVY }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'transparent'; el.style.color = NAVY; el.style.borderColor = 'rgba(8,33,60,0.18)' }}
            >
              <ArrowRight size={13} strokeWidth={2.5} /> View All Values
            </motion.a>
          </div>

          {/* Pillar cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }} className="pillars-grid">
            {PILLARS.map((v, i) => (
              <motion.div key={v.title}
                className="pillar-card"
                initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1, ease }}
              >
                {/* Sliding fill layer */}
                <div className="pillar-fill" />

                {/* Number */}
                <div className="pillar-num">{v.num}</div>

                {/* Top accent line */}
                <div className="pillar-line" />

                {/* Content */}
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <h3 className="pillar-title">{v.title}</h3>
                  <p className="pillar-text">{v.text}</p>
                  <div className="pillar-cta">
                    View Value <ArrowUpRight size={11} strokeWidth={2.5} style={{ display: 'inline', verticalAlign: 'middle' }} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      <Footer />

      <style>{`
        /* ── Pillar cards ── */
        .pillar-card {
          position: relative;
          overflow: hidden;
          background: #fff;
          border-radius: 20px;
          padding: clamp(32px, 3.5vw, 48px) clamp(24px, 2.8vw, 36px);
          border: 1px solid rgba(8,33,60,0.07);
          cursor: pointer;
          transition: border-color 0.4s ease, box-shadow 0.4s ease;
        }
        .pillar-card:hover {
          border-color: #08213C;
          box-shadow: 0 20px 60px rgba(8,33,60,0.14);
        }

        /* Sliding NAVY fill that rises from bottom */
        .pillar-fill {
          position: absolute;
          inset: 0;
          background: #08213C;
          transform: translateY(100%);
          transition: transform 0.55s cubic-bezier(0.16,1,0.3,1);
          z-index: 0;
        }
        .pillar-card:hover .pillar-fill { transform: translateY(0); }

        /* Ghost number top-right */
        .pillar-num {
          position: absolute;
          top: 20px; right: 24px;
          font-size: clamp(56px,7vw,88px);
          font-weight: 900;
          line-height: 1;
          letter-spacing: -0.04em;
          color: rgba(8,33,60,0.05);
          pointer-events: none;
          z-index: 1;
          transition: color 0.4s ease;
          user-select: none;
        }
        .pillar-card:hover .pillar-num { color: rgba(255,255,255,0.05); }

        /* Green top accent line that shrinks to a dot on hover */
        .pillar-line {
          width: 32px; height: 3px;
          background: #3CB98C;
          border-radius: 2px;
          margin-bottom: 28px;
          transition: width 0.4s cubic-bezier(0.16,1,0.3,1);
          position: relative; z-index: 1;
        }
        .pillar-card:hover .pillar-line { width: 16px; }

        .pillar-title {
          font-size: clamp(18px,1.7vw,22px);
          font-weight: 900;
          color: #08213C;
          margin: 0 0 14px;
          text-transform: uppercase;
          letter-spacing: -0.02em;
          transition: color 0.35s ease;
        }
        .pillar-card:hover .pillar-title { color: #fff; }

        .pillar-text {
          font-size: 14px;
          color: rgba(8,33,60,0.5);
          line-height: 1.75;
          margin: 0 0 24px;
          transition: color 0.35s ease;
        }
        .pillar-card:hover .pillar-text { color: rgba(255,255,255,0.52); }

        .pillar-cta {
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #3CB98C;
          opacity: 0;
          transform: translateY(10px);
          transition: opacity 0.35s ease 0.1s, transform 0.35s ease 0.1s;
        }
        .pillar-card:hover .pillar-cta {
          opacity: 1;
          transform: translateY(0);
        }

        /* ── Responsive ── */

        /* Large screens: wordmark is capped at 440px so the right column
           needs more width to stay clear of the Y's right edge */
        @media (min-width: 1800px) {
          .about-banner-right { width: 50% !important; }
        }
        @media (min-width: 2200px) {
          .about-banner-right { width: 54% !important; }
        }

        /* 2K / ultra-wide: let manifesto content breathe to full width */
        @media (min-width: 1920px) {
          .manifesto-inner { max-width: 1900px !important; }
          .manifesto-section { padding-left: clamp(64px,4.5vw,120px) !important; padding-right: clamp(64px,4.5vw,120px) !important; }
        }
        @media (min-width: 2560px) {
          .manifesto-inner { max-width: 2400px !important; }
        }

        @media (max-width: 900px) {
          .manifesto-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 800px) {
          .sig-grid     { grid-template-columns: 1fr !important; }
          .pillars-grid { grid-template-columns: 1fr !important; }
        }
        /* Banner right column: widen on tablet so content isn't squashed */
        @media (max-width: 900px) {
          .about-banner-right { width: 58% !important; padding-left: 20px !important; padding-right: 20px !important; }
        }
        /* Mobile: panel anchored to bottom, gradient fade reveals BIVRY fully above */
        @media (max-width: 540px) {
          .about-banner-right {
            width: 100% !important;
            top: auto !important;
            bottom: 0 !important;
            height: 60% !important;
            justify-content: flex-end !important;
            background: linear-gradient(
              to bottom,
              transparent 0%,
              rgba(243,240,234,0.85) 20%,
              rgba(243,240,234,1) 38%
            ) !important;
            backdrop-filter: none !important;
            -webkit-backdrop-filter: none !important;
            padding: 0 24px 40px !important;
          }
        }
      `}</style>
    </div>
  )
}
