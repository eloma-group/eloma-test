import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Header } from '../components/Header/Header'
import { Footer } from '../components/Footer'
import { InnerHero, PageCTA, NAVY, GREEN, CREAM, ease } from '../components/InnerHero'

const VALUES = [
  {
    num: '01', title: 'Reliability',
    desc: 'We commit and we deliver - on time, every time, no excuses. Our clients depend on us, and we never take that lightly.',
    detail: 'When you book with BIVRY, you can count on it arriving. Reliability is not a feature - it is the foundation of everything we do.',
  },
  {
    num: '02', title: 'Transparency',
    desc: 'Real-time tracking, proactive updates, and honest communication at every stage of the freight journey.',
    detail: 'Our platform shows you exactly where your freight is - no guesswork, no chasing. Just clear, live information.',
  },
  {
    num: '03', title: 'Innovation',
    desc: 'Technology-driven solutions that simplify complex logistics and give our clients a genuine competitive edge.',
    detail: 'From digital booking to automated route optimisation, we continuously invest in tools that make freight smarter.',
  },
  {
    num: '04', title: 'Partnership',
    desc: "We don't see ourselves as a vendor - we're your logistics partner. Your growth drives ours.",
    detail: 'Our dedicated account managers work alongside your team to design freight solutions that scale with your business.',
  },
  {
    num: '05', title: 'Integrity',
    desc: 'Honest pricing, no hidden fees, and service that does exactly what it says on the label.',
    detail: 'No surprise charges. No misleading timelines. We say what we mean and mean what we say - every single time.',
  },
  {
    num: '06', title: 'Sustainability',
    desc: "Responsible freight for a better future. We're reducing our environmental footprint, delivery by delivery.",
    detail: 'From route optimisation that reduces emissions to our transition to low-emission vehicles, sustainability is embedded in how we operate.',
  },
]

const MANIFESTO_LINES = [
  { text: 'WE BELIEVE FREIGHT IS MORE', align: 'left'   as const },
  { text: 'THAN MOVING BOXES.',         align: 'center' as const },
  { text: "IT'S MOVING BUSINESSES",     align: 'right'  as const },
  { text: 'FORWARD.',                   align: 'right'  as const, green: true },
]

const CULTURE = [
  {
    label: 'Culture', heading: 'People First',
    body: 'Our team are the heartbeat of BIVRY. We invest in training, wellbeing, and career growth for every driver, coordinator, and account manager.',
  },
  {
    label: 'Environment', heading: 'Greener Freight',
    body: "We're actively reducing emissions through route optimisation, vehicle upgrades, and operational efficiency improvements across our entire fleet.",
  },
  {
    label: 'Community', heading: 'Local Roots',
    body: "BIVRY was built in Melbourne and we're committed to supporting the local businesses, suppliers, and communities that helped us grow.",
  },
]

/* ─── Culture bento card ─── */
function CultureCard({ c, idx, isLarge }: {
  c: typeof CULTURE[0]; idx: number; isLarge?: boolean
}) {
  const [hov, setHov] = useState(false)

  /* Directional entry: large slides from left, small cards from top-right / bottom-right */
  const entry = isLarge
    ? { hidden: { opacity: 0, x: -80, scale: 0.96, filter: 'blur(10px)' },
        show:   { opacity: 1, x: 0,   scale: 1,    filter: 'blur(0px)'  } }
    : idx === 1
      ? { hidden: { opacity: 0, x: 60, y: -36, scale: 0.95, filter: 'blur(8px)' },
          show:   { opacity: 1, x: 0,  y: 0,   scale: 1,    filter: 'blur(0px)' } }
      : { hidden: { opacity: 0, x: 60, y:  36, scale: 0.95, filter: 'blur(8px)' },
          show:   { opacity: 1, x: 0,  y: 0,   scale: 1,    filter: 'blur(0px)' } }

  return (
    <motion.div
      className={isLarge ? 'cb-large' : `cb-small${idx === 2 ? ' cb-small-alt' : ''}`}
      variants={entry}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: isLarge ? 0.9 : 0.72, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
      onHoverStart={() => setHov(true)}
      onHoverEnd={() => setHov(false)}
      animate={{
        y: hov ? (isLarge ? -9 : -6) : 0,
        scale: hov ? (isLarge ? 1.008 : 1.015) : 1,
        boxShadow: hov
          ? isLarge
            ? '0 36px 88px rgba(8,33,60,0.13), 0 0 0 1.5px rgba(60,185,140,0.34)'
            : '0 22px 60px rgba(8,33,60,0.10), 0 0 0 1.5px rgba(60,185,140,0.28)'
          : '0 2px 10px rgba(8,33,60,0.05)',
      }}
      style={{ cursor: 'default' }}
    >
      {/* Shimmer radial gradient on hover */}
      <motion.div
        style={{ position: 'absolute', inset: 0, borderRadius: 20, zIndex: 0, pointerEvents: 'none' }}
        animate={{
          background: hov
            ? 'radial-gradient(ellipse at 72% 18%, rgba(60,185,140,0.10) 0%, transparent 62%)'
            : 'radial-gradient(ellipse at 72% 18%, rgba(60,185,140,0.00) 0%, transparent 62%)',
        }}
        transition={{ duration: 0.5 }}
      />

      {/* Ghost number — scales + rotates on hover */}
      <motion.div
        animate={{ scale: hov ? 1.22 : 1, rotate: hov ? 7 : 0 }}
        transition={{ duration: 0.48, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute', bottom: -14, right: 14, zIndex: 0,
          fontSize: isLarge ? 'clamp(100px,14vw,200px)' : 'clamp(72px,9vw,130px)',
          fontWeight: 900, lineHeight: 1, letterSpacing: '-0.06em',
          userSelect: 'none', pointerEvents: 'none',
          transformOrigin: 'bottom right',
          color: 'transparent',
          WebkitTextStroke: hov ? '1.5px rgba(60,185,140,0.28)' : '1.5px rgba(8,33,60,0.07)',
          transition: '-webkit-text-stroke-color 0.4s ease',
        }}
      >
        0{idx + 1}
      </motion.div>

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 1,
        height: isLarge ? '100%' : undefined,
        display: isLarge ? 'flex' : undefined,
        flexDirection: isLarge ? 'column' : undefined,
      }}>
        {/* Tag pill */}
        <motion.div
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '5px 14px', borderRadius: 100,
            border: `1px solid ${GREEN}40`,
            marginBottom: isLarge ? 'clamp(28px,3.5vw,48px)' : 'clamp(18px,2.2vw,28px)',
          }}
          animate={{ background: hov ? `${GREEN}28` : `${GREEN}18` }}
          transition={{ duration: 0.28 }}
        >
          <motion.div
            style={{ width: 5, height: 5, borderRadius: '50%', background: GREEN, flexShrink: 0 }}
            animate={{ scale: hov ? 1.5 : 1 }}
            transition={{ duration: 0.28 }}
          />
          <span style={{
            fontSize: 'clamp(9px,0.68vw,11px)', fontWeight: 800,
            letterSpacing: '2px', textTransform: 'uppercase', color: GREEN,
          }}>
            {c.label}
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h3
          style={{
            fontSize: isLarge ? 'clamp(32px,4vw,64px)' : 'clamp(24px,2.8vw,52px)',
            fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 0.95,
            textTransform: 'uppercase', margin: '0 0 clamp(12px,1.4vw,18px)',
          }}
          animate={{ color: hov ? GREEN : NAVY }}
          transition={{ duration: 0.28 }}
        >
          {c.heading}
        </motion.h3>

        {/* Accent bar */}
        <motion.div
          style={{ height: 3, background: GREEN, borderRadius: 2, marginBottom: isLarge ? 'clamp(16px,2vw,28px)' : 'clamp(12px,1.4vw,18px)' }}
          animate={{ width: hov ? (isLarge ? 88 : 60) : (isLarge ? 40 : 32) }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Body */}
        <p style={{
          fontSize: isLarge ? 'clamp(15px,1.15vw,19px)' : 'clamp(14px,1.05vw,17px)',
          color: 'rgba(8,33,60,0.52)', lineHeight: 1.82, margin: 0,
          flex: isLarge ? 1 : undefined,
        }}>
          {c.body}
        </p>
      </div>
    </motion.div>
  )
}

function ValueRow({ v, i }: { v: typeof VALUES[0]; i: number }) {
  const [hov, setHov] = useState(false)

  return (
    <motion.div
      className="vrow"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-48px' }}
      transition={{ duration: 0.58, delay: i * 0.06, ease }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'grid',
        gridTemplateColumns: 'clamp(72px,11vw,148px) 1px 1fr',
        borderBottom: '1px solid rgba(8,33,60,0.08)',
        background: hov ? 'rgba(60,185,140,0.028)' : 'transparent',
        borderLeft: `3px solid ${hov ? GREEN : 'transparent'}`,
        transition: 'background 0.32s ease, border-left-color 0.32s ease',
        cursor: 'default',
      }}
    >
      {/* ── Ghost number ── */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 'clamp(22px,2.8vw,44px) clamp(10px,1.2vw,18px)',
      }}>
        <span style={{
          fontSize: 'clamp(40px,5.8vw,94px)',
          fontWeight: 900, lineHeight: 1,
          letterSpacing: '-0.05em',
          userSelect: 'none',
          color: hov ? GREEN : 'transparent',
          WebkitTextStroke: `1.5px ${hov ? GREEN : 'rgba(8,33,60,0.18)'}`,
          transition: 'color 0.35s ease, -webkit-text-stroke-color 0.35s ease',
        }}>
          {v.num}
        </span>
      </div>

      {/* ── Vertical hairline ── */}
      <div className="vrow-sep" style={{ background: 'rgba(8,33,60,0.08)' }} />

      {/* ── Content ── */}
      <div style={{ padding: 'clamp(22px,2.8vw,44px) clamp(18px,3vw,52px)' }}>
        {/* Title + icon */}
        <div style={{
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12, marginBottom: 'clamp(10px,1vw,14px)',
        }}>
          <h3 style={{
            fontSize: 'clamp(24px,3.2vw,56px)',
            fontWeight: 900, color: hov ? GREEN : NAVY,
            letterSpacing: '-0.04em', lineHeight: 0.95,
            margin: 0, textTransform: 'uppercase',
            transition: 'color 0.3s ease',
          }}>
            {v.title}
          </h3>
          <div style={{
            width: 'clamp(32px,2.6vw,42px)', height: 'clamp(32px,2.6vw,42px)',
            borderRadius: '50%', flexShrink: 0,
            border: `1.5px solid ${hov ? GREEN : 'rgba(8,33,60,0.16)'}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: hov ? GREEN : 'transparent',
            transition: 'all 0.3s ease',
          }}>
            <ArrowUpRight
              size={14}
              color={hov ? '#fff' : 'rgba(8,33,60,0.38)'}
              style={{ transition: 'color 0.3s ease' }}
            />
          </div>
        </div>

        {/* Green accent bar */}
        <div style={{
          height: 3, borderRadius: 2, background: GREEN,
          width: hov ? 56 : 32,
          transition: 'width 0.32s ease',
          marginBottom: 'clamp(12px,1.6vw,22px)',
        }} />

        {/* 2-col body */}
        <div className="vrow-cols">
          <p style={{
            fontSize: 'clamp(15px,1.15vw,19px)',
            color: 'rgba(8,33,60,0.55)', lineHeight: 1.85, margin: 0,
          }}>
            {v.desc}
          </p>
          <p style={{
            fontSize: 'clamp(14px,1.05vw,17px)',
            color: 'rgba(60,185,140,0.72)', lineHeight: 1.85, margin: 0,
          }}>
            {v.detail}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export function ValuesPage() {
  return (
    <div style={{ background: CREAM, overflowX: 'hidden' }}>
      <Header />
      <main>

        <InnerHero
          badge="Core Principles"
          line1="WHAT WE"
          line2="STAND FOR."
          description="Six values that guide every decision, every delivery, and every relationship we build across Australia."
          meta={[
            { label: 'Our Promise',  value: 'On Time, Every Time'   },
            { label: 'Our Approach', value: 'Technology Driven'     },
            { label: 'Our Culture',  value: 'People & Planet First' },
            { label: 'Our Roots',    value: 'Melbourne, VIC'        },
          ]}
        />

        {/* ══════════════════════════════════════════════
            PROMISE BAND
            ══════════════════════════════════════════════ */}

        {/* ── Promise statement band ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7, ease }}
          style={{
            background: '#fff',
            borderBottom: '1px solid rgba(8,33,60,0.08)',
            padding: 'clamp(40px,5vw,68px) clamp(24px,5vw,80px)',
          }}
        >
          <div className="promise-band values-inner">

            {/* Left: statement from docs */}
            <div className="promise-left">
              <div style={{
                display: 'flex', alignItems: 'center', gap: 9,
                marginBottom: 'clamp(12px,1.4vw,18px)',
              }}>
                <div style={{ width: 3, height: 13, background: GREEN, borderRadius: 2 }} />
                <span style={{
                  fontSize: 'clamp(11px,0.82vw,14px)', fontWeight: 800,
                  letterSpacing: '2.5px', textTransform: 'uppercase',
                  color: 'rgba(8,33,60,0.38)',
                }}>
                  Our Commitment
                </span>
              </div>
              <p style={{
                fontSize: 'clamp(17px,2vw,30px)',
                fontWeight: 800, color: NAVY,
                letterSpacing: '-0.03em', lineHeight: 1.28,
                margin: 0, maxWidth: '72ch',
              }}>
                Among the first and only logistics companies registered with the{' '}
                <span style={{ color: GREEN }}>United Nations</span>
                , setting global standards in reliability, compliance, and trust.
              </p>
            </div>

            {/* Right: real credentials from docs — no numbers */}
            <div className="promise-creds">
              {[
                { label: 'UN Global Compact', sub: 'Participant'            },
                { label: 'WEPs',              sub: 'Signatory'              },
                { label: 'Australian Logistics Council', sub: 'Industry Member' },
              ].map((c, i) => (
                <motion.div
                  key={c.label}
                  initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 + i * 0.08, ease }}
                  style={{
                    borderLeft: `2px solid ${GREEN}`,
                    paddingLeft: 'clamp(12px,1.2vw,18px)',
                  }}
                >
                  <div style={{
                    fontSize: 'clamp(15px,1.3vw,21px)',
                    fontWeight: 900, color: NAVY,
                    letterSpacing: '-0.02em', lineHeight: 1.1,
                    marginBottom: 5,
                  }}>
                    {c.label}
                  </div>
                  <div style={{
                    fontSize: 'clamp(11px,0.78vw,13px)', fontWeight: 700,
                    letterSpacing: '1.8px', textTransform: 'uppercase',
                    color: GREEN,
                  }}>
                    {c.sub}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ══════════════════════════════════════════════
            VALUES — editorial full-width rows
            ══════════════════════════════════════════════ */}
        <section style={{ background: '#fff' }}>
          <div className="values-inner">
            {VALUES.map((v, i) => (
              <ValueRow key={v.num} v={v} i={i} />
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            MANIFESTO — exaggerated editorial typography
            ══════════════════════════════════════════════ */}
        <section style={{
          background: CREAM,
          padding: 'clamp(80px,11vw,148px) clamp(24px,5vw,80px)',
          position: 'relative', overflow: 'hidden',
        }}>
          {/* Faint bottom fade */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: '35%',
            background: `linear-gradient(to bottom, transparent, rgba(8,33,60,0.04))`,
            pointerEvents: 'none',
          }} />

          <div className="values-inner" style={{ position: 'relative', zIndex: 1 }}>
            {MANIFESTO_LINES.map((line, i) => (
              <motion.div
                key={i}
                className="manifesto-line"
                initial={{ opacity: 0, x: line.align === 'left' ? -40 : line.align === 'right' ? 40 : 0, y: line.align === 'center' ? 20 : 0 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.88, delay: i * 0.13, ease }}
                style={{
                  fontSize: 'clamp(40px,6vw,96px)',
                  fontWeight: 900,
                  color: line.green ? GREEN : NAVY,
                  letterSpacing: '-0.045em',
                  lineHeight: 1.0,
                  textTransform: 'uppercase',
                  textAlign: line.align,
                }}
              >
                {line.text}
              </motion.div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            HOW WE WORK — light bento layout
            ══════════════════════════════════════════════ */}
        <section style={{
          background: '#f0ede8',
          padding: 'clamp(64px,8vw,108px) clamp(24px,5vw,80px)',
        }}>
          <div className="values-inner">

            {/* ── Section header ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.65, ease }}
              style={{
                display: 'flex', alignItems: 'flex-end',
                justifyContent: 'space-between', flexWrap: 'wrap',
                gap: 16, marginBottom: 'clamp(32px,4vw,52px)',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 12 }}>
                  <div style={{ width: 3, height: 13, background: GREEN, borderRadius: 2 }} />
                  <span style={{
                    fontSize: 'clamp(10px,0.75vw,12px)', fontWeight: 800,
                    letterSpacing: '2.5px', textTransform: 'uppercase',
                    color: 'rgba(8,33,60,0.38)',
                  }}>
                    How We Work
                  </span>
                </div>
                <h2 style={{
                  fontSize: 'clamp(40px,5vw,80px)',
                  fontWeight: 900, color: NAVY,
                  letterSpacing: '-0.04em', lineHeight: 0.95,
                  margin: 0, textTransform: 'uppercase',
                }}>
                  BUILT ON <span style={{ color: GREEN }}>PURPOSE.</span>
                </h2>
              </div>
              <p style={{
                fontSize: 'clamp(14px,1.1vw,17px)',
                color: 'rgba(8,33,60,0.48)', lineHeight: 1.75,
                margin: 0, maxWidth: 380,
              }}>
                Every decision we make - from hiring to hauling - comes back to three commitments we refuse to compromise on.
              </p>
            </motion.div>

            {/* ── Bento grid ── */}
            <div className="culture-bento">
              <CultureCard c={CULTURE[0]} idx={0} isLarge />
              <CultureCard c={CULTURE[1]} idx={1} />
              <CultureCard c={CULTURE[2]} idx={2} />
            </div>
          </div>
        </section>

        <PageCTA line1="LIVE OUR" line2="VALUES." buttonLabel="Work With Us" href="/contact" />
      </main>
      <Footer />

      <style>{`
        /* ══════════════════════════════════════
           INNER CONTAINER — all section wrappers
           ══════════════════════════════════════ */
        .values-inner {
          max-width: 1760px;
          margin: 0 auto;
        }
        @media (min-width: 2560px) {
          .values-inner { max-width: 2400px; }
        }

        /* ══════════════════════════════════════
           PROMISE BAND
           ══════════════════════════════════════ */
        .promise-band {
          display: grid;
          grid-template-columns: 1fr auto;
          align-items: center;
          gap: clamp(28px, 4vw, 72px);
        }
        .promise-creds {
          display: flex;
          flex-direction: column;
          gap: clamp(18px, 2vw, 28px);
          flex-shrink: 0;
        }

        /* ══════════════════════════════════════
           VALUE ROWS
           ══════════════════════════════════════ */
        .vrow-cols {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(16px, 2.5vw, 40px);
        }

        /* ══════════════════════════════════════
           CULTURE BENTO
           ══════════════════════════════════════ */
        .culture-bento {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: auto auto;
          gap: clamp(12px, 1.4vw, 20px);
        }
        .cb-large {
          grid-row: 1 / 3;
          position: relative;
          overflow: hidden;
          background: #fff;
          border-radius: 20px;
          border: 1px solid rgba(8,33,60,0.08);
          padding: clamp(32px,3.5vw,56px) clamp(28px,3vw,48px);
          cursor: default;
          transition: box-shadow 0.35s ease, border-color 0.35s ease, transform 0.35s ease;
        }
        .cb-small {
          position: relative;
          overflow: hidden;
          background: #fff;
          border-radius: 20px;
          border: 1px solid rgba(8,33,60,0.08);
          padding: clamp(24px,2.8vw,44px) clamp(22px,2.6vw,40px);
          cursor: default;
          transition: box-shadow 0.35s ease, border-color 0.35s ease, transform 0.35s ease;
        }
        .cb-small-alt { background: ${CREAM}; }
        /* hover shadow/border handled by framer-motion animate */

        /* ══════════════════════════════════════
           LARGE SCREENS  ≥ 1600px
           ══════════════════════════════════════ */
        @media (min-width: 1600px) {
          .vrow-cols     { gap: 56px; }
          .culture-bento { gap: 22px; }
        }
        @media (min-width: 1920px) {
          .vrow-cols     { gap: 72px; }
          .culture-bento { gap: 26px; }
        }
        @media (min-width: 2560px) {
          .vrow-cols     { gap: 80px; }
          .culture-bento { gap: 28px; }
        }

        /* ══════════════════════════════════════
           TABLET LANDSCAPE  ≤ 1100px
           ══════════════════════════════════════ */
        @media (max-width: 1100px) {
          .vrow-cols { grid-template-columns: 1fr; gap: 10px; }
        }

        /* ══════════════════════════════════════
           TABLET  ≤ 900px
           ══════════════════════════════════════ */
        @media (max-width: 900px) {
          .promise-band  { grid-template-columns: 1fr !important; }
          .promise-creds  { flex-direction: row !important; flex-wrap: wrap; gap: 20px !important; }
          /* Bento: collapse large card to span full width, small cards side-by-side */
          .culture-bento  { grid-template-columns: 1fr 1fr; }
          .cb-large       { grid-column: 1 / 3; grid-row: auto; }
          .vrow          { grid-template-columns: clamp(56px,10vw,80px) 1px 1fr !important; }
        }

        /* ══════════════════════════════════════
           MOBILE  ≤ 640px
           ══════════════════════════════════════ */
        @media (max-width: 640px) {
          /* Bento: all cards full width on mobile */
          .culture-bento { grid-template-columns: 1fr; }
          .cb-large      { grid-column: auto; grid-row: auto; }

          /* Value rows: fully stacked */
          .vrow {
            grid-template-columns: 1fr !important;
          }
          .vrow-sep { display: none !important; }

          .vrow > div:first-child {
            padding: 18px 16px 0 16px !important;
            justify-content: flex-start !important;
          }
          .vrow > div:first-child span {
            font-size: clamp(30px, 9vw, 44px) !important;
          }
          .vrow > div:last-child {
            padding: 10px 16px 24px 16px !important;
          }

          /* Manifesto: left-align all lines on mobile
             so long wrapped lines read naturally */
          .manifesto-line { text-align: left !important; }

          /* Promise creds: stack back to column */
          .promise-creds { flex-direction: column !important; gap: 16px !important; }
        }

        /* ══════════════════════════════════════
           SMALL MOBILE  ≤ 400px
           ══════════════════════════════════════ */
        @media (max-width: 400px) {
          .promise-creds { gap: 14px !important; }
        }

        /* ══════════════════════════════════════
           REDUCED MOTION
           ══════════════════════════════════════ */
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  )
}
