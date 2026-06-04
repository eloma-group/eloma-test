import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Phone, Mail, Plus, Minus,
  ShoppingCart, Car, Shirt, Store, FlaskConical, Stethoscope, Factory, HardHat, Wheat,
} from 'lucide-react'
import { Header } from '../components/Header/Header'
import { Footer } from '../components/Footer'
import { InnerHero, PageCTA, NAVY, GREEN, CREAM, ease } from '../components/InnerHero'

const FAQS = [
  { num: '01', q: 'What makes BIVRY different from other freight companies?',              a: 'At BIVRY, freight is more than just moving goods from one place to another. We focus on making the process simple, transparent, and stress-free - with clear communication and flexible transport support that works around your business needs.' },
  { num: '02', q: 'Can BIVRY handle urgent deliveries without affecting service quality?', a: "Yes, urgent deliveries are part of what we do. Whether it's overnight freight or a last-minute shipment, we work quickly to keep your goods moving while maintaining the same level of care and coordination." },
  { num: '03', q: 'How does BIVRY manage deliveries to regional and hard-to-reach areas?', a: 'Regional freight often comes with challenges like long distances, changing road conditions, and limited access. Our team plans every movement carefully to make sure deliveries reach their destination safely - even in areas where transport can be difficult.' },
  { num: '04', q: 'Will I know where my freight is during transit?',                       a: "Yes, staying informed matters. We keep communication clear throughout the delivery process so you always know what's happening with your freight and can plan your operations with confidence." },
  { num: '05', q: 'Does BIVRY support businesses with changing freight volumes?',          a: 'Absolutely. Freight demand can change quickly, especially during busy periods. We offer flexible transport support that adjusts to your business requirements - helping you manage both regular and high-volume freight needs.' },
  { num: '06', q: 'How does BIVRY help reduce freight disruptions?',                       a: 'Freight delays can impact your entire workflow, which is why we focus on careful planning, proactive communication, and smooth coordination - to help prevent avoidable disruptions before they affect your business.' },
  { num: '07', q: 'Can BIVRY support businesses in different industries?',                 a: 'Yes, every industry has different freight requirements, and we understand that. From retail and manufacturing to healthcare and technology, we adapt our transport support to match the specific needs of each business.' },
  { num: '08', q: 'Why do businesses continue to choose BIVRY?',                          a: 'Businesses continue to choose BIVRY because they want freight support they can trust. By keeping communication clear, operations smooth, and service flexible, we help businesses move goods with confidence and less hassle.' },
]

const INDUSTRIES = [
  { id: 'fmcg',          name: 'FMCG',                color: '#E8500A', Icon: ShoppingCart },
  { id: 'automobile',    name: 'Automobile',           color: '#1E3A5F', Icon: Car          },
  { id: 'fashion',       name: 'Fashion & Lifestyle',  color: '#B5197A', Icon: Shirt        },
  { id: 'retail',        name: 'Retail',               color: '#1355C2', Icon: Store        },
  { id: 'chemical',      name: 'Chemical',             color: '#006B5A', Icon: FlaskConical },
  { id: 'pharma',        name: 'Pharma & Healthcare',  color: '#3CB98C', Icon: Stethoscope  },
  { id: 'manufacturing', name: 'Manufacturing',        color: '#3D2094', Icon: Factory      },
  { id: 'construction',  name: 'Construction',         color: '#C04B00', Icon: HardHat      },
  { id: 'agricultural',  name: 'Agricultural',         color: '#1A6B2E', Icon: Wheat        },
]

/* ── FAQ Accordion Item ── */
function FAQItem({
  faq, isOpen, onToggle, isLast,
}: {
  faq: typeof FAQS[0]; isOpen: boolean; onToggle: () => void; isLast: boolean
}) {
  return (
    <div style={{ borderBottom: isLast ? 'none' : '1px solid rgba(8,33,60,0.07)' }}>
      {/* Question row */}
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        style={{
          width: '100%', display: 'flex', alignItems: 'center',
          gap: 'clamp(14px,2vw,36px)',
          padding: 'clamp(20px,2.2vw,30px) clamp(20px,2.8vw,40px)',
          background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
        }}
      >
        <span style={{
          fontSize: 11, fontWeight: 900, letterSpacing: '1.5px',
          color: 'rgba(8,33,60,0.25)', flexShrink: 0, minWidth: 22,
          userSelect: 'none',
        }}>
          {faq.num}
        </span>

        <h3 style={{
          flex: 1, margin: 0,
          fontSize: 'clamp(13px,1.35vw,17px)',
          fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 1.3,
          color: NAVY, textTransform: 'uppercase',
        }}>
          {faq.q}
        </h3>

        <div style={{
          flexShrink: 0, width: 44, height: 44, borderRadius: 10,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: isOpen ? GREEN : NAVY,
          transition: 'background 0.28s ease',
        }}>
          {isOpen
            ? <Minus size={18} color="white" strokeWidth={2.5} />
            : <Plus  size={18} color="white" strokeWidth={2.5} />
          }
        </div>
      </button>

      {/* Answer panel */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{
              padding: '0 clamp(20px,2.8vw,40px) clamp(22px,2.5vw,32px)',
              paddingLeft: 'clamp(56px,7vw,100px)',
            }}>
              <div style={{
                width: 32, height: 3, background: GREEN,
                borderRadius: 2, marginBottom: 14,
              }} />
              <p style={{
                margin: 0,
                fontSize: 'clamp(13px,1.1vw,16px)',
                color: 'rgba(8,33,60,0.58)',
                lineHeight: 1.84,
                maxWidth: 820,
              }}>
                {faq.a}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ── Industry Tile ── */
function IndustryTile({
  industry, arcY, rotation,
}: {
  industry: typeof INDUSTRIES[0]; arcY: number; rotation: number
}) {
  const [hovered, setHovered] = useState(false)
  const { Icon } = industry

  return (
    <motion.div
      className="ind-tile-wrap"
      animate={{ y: arcY, rotate: rotation }}
      whileHover={{ y: arcY - 18, scale: 1.22, rotate: 0 }}
      transition={{ type: 'spring', stiffness: 280, damping: 20 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{ position: 'relative', cursor: 'pointer', flexShrink: 0 }}
    >
      {/* Name label above */}
      <AnimatePresence>
        {hovered && (
          /* wrapper div handles centering so framer-motion only drives opacity+y */
          <div style={{
            position: 'absolute', bottom: 'calc(100% + 12px)',
            left: '50%', transform: 'translateX(-50%)',
            pointerEvents: 'none', zIndex: 20,
          }}>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              style={{
                background: NAVY,
                color: '#fff',
                padding: '6px 13px',
                borderRadius: 7,
                fontSize: 10,
                fontWeight: 800,
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
              }}
            >
              {industry.name}
              {/* tooltip caret */}
              <div style={{
                position: 'absolute', top: '100%', left: '50%',
                transform: 'translateX(-50%)',
                width: 0, height: 0,
                borderLeft: '6px solid transparent',
                borderRight: '6px solid transparent',
                borderTop: `6px solid ${NAVY}`,
              }} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Icon box */}
      <div
        className="ind-icon-box"
        style={{ background: `${industry.color}55` }}
      >
        <Icon size={36} color={industry.color} strokeWidth={1.6} />
      </div>
    </motion.div>
  )
}

/* ── Page ── */
export function FAQPage() {
  const [openIdx, setOpenIdx] = useState(0)
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== 'undefined' ? window.innerWidth >= 768 : true
  )

  useEffect(() => {
    const handler = () => setIsDesktop(window.innerWidth >= 768)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  const n = INDUSTRIES.length
  const arcOffsets  = INDUSTRIES.map((_, i) => isDesktop ? -Math.sin(Math.PI * i / (n - 1)) * 52 : 0)
  const rotations   = INDUSTRIES.map((_, i) => isDesktop ? (i - (n - 1) / 2) * 3.2 : 0)

  return (
    <div style={{ background: CREAM, overflowX: 'hidden' }}>
      <Header />
      <main>

        <InnerHero
          badge="Quick Answers"
          line1="FREQUENTLY"
          line2="ASKED."
          description="Everything you need to know about BIVRY - from booking your first freight to managing a national logistics partnership across Australia."
          meta={[
            { label: 'Questions',    value: '08 Answered'              },
            { label: 'Coverage',     value: 'All States & Territories' },
            { label: 'Support Line', value: '1800 054 555'             },
            { label: 'Email',        value: 'connect@bivry.com.au'     },
          ]}
        />

        {/* ── FAQ Section ── */}
        <section style={{ background: '#fff', padding: 'clamp(72px,9vw,120px) clamp(24px,5vw,80px)' }}>
          <div className="faq-wrap">

            {/* Section header — kept identical to original */}
            <div style={{
              display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
              flexWrap: 'wrap', gap: 24, marginBottom: 'clamp(40px,5vw,64px)',
            }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.6, ease }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 18 }}>
                  <div style={{ width: 3, height: 13, background: GREEN, borderRadius: 2 }} />
                  <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '2.5px', textTransform: 'uppercase' as const, color: 'rgba(8,33,60,0.38)' }}>Common Questions</span>
                </div>
                <h2 style={{ fontSize: 'clamp(44px,7vw,100px)', fontWeight: 900, color: NAVY, letterSpacing: '-0.048em', lineHeight: 0.88, margin: 0, textTransform: 'uppercase' as const }}>
                  WHAT YOU<br /><span style={{ color: GREEN }}>NEED TO KNOW.</span>
                </h2>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
                style={{ fontSize: 'clamp(13px,1.05vw,16px)', color: 'rgba(8,33,60,0.46)', lineHeight: 1.8, margin: 0, maxWidth: 320 }}
              >
                Tap any item to reveal the answer.
              </motion.p>
            </div>

            {/* Accordion container */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, ease }}
              style={{
                border: '1px solid rgba(8,33,60,0.09)',
                borderRadius: 16, overflow: 'hidden',
                background: '#FAFAF8',
              }}
            >
              {FAQS.map((faq, i) => (
                <FAQItem
                  key={faq.num}
                  faq={faq}
                  isOpen={openIdx === i}
                  onToggle={() => setOpenIdx(openIdx === i ? -1 : i)}
                  isLast={i === FAQS.length - 1}
                />
              ))}
            </motion.div>

          </div>
        </section>

        {/* ── Industries We Serve ── */}
        <section style={{ background: CREAM, padding: 'clamp(72px,9vw,120px) clamp(24px,5vw,80px)' }}>
          <div className="faq-wrap">

            {/* Header */}
            <div style={{
              display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
              flexWrap: 'wrap', gap: 24, marginBottom: 'clamp(64px,9vw,110px)',
            }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.6, ease }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 18 }}>
                  <div style={{ width: 3, height: 13, background: GREEN, borderRadius: 2 }} />
                  <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '2.5px', textTransform: 'uppercase' as const, color: 'rgba(8,33,60,0.38)' }}>Sectors We Cover</span>
                </div>
                <h2 style={{ fontSize: 'clamp(44px,7vw,100px)', fontWeight: 900, color: NAVY, letterSpacing: '-0.048em', lineHeight: 0.88, margin: 0, textTransform: 'uppercase' as const }}>
                  INDUSTRIES<br /><span style={{ color: GREEN }}>WE SERVE.</span>
                </h2>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
                style={{ fontSize: 'clamp(13px,1.05vw,16px)', color: 'rgba(8,33,60,0.46)', lineHeight: 1.8, margin: 0, maxWidth: 340 }}
              >
                Delivering freight solutions across every major industry sector in Australia. Hover an icon to explore.
              </motion.p>
            </div>

            {/* Arc of industry tiles */}
            <motion.div
              className="ind-arc"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease }}
            >
              {INDUSTRIES.map((ind, i) => (
                <IndustryTile
                  key={ind.id}
                  industry={ind}
                  arcY={arcOffsets[i]}
                  rotation={rotations[i]}
                />
              ))}
            </motion.div>

          </div>
        </section>

        {/* ── Help strip ── */}
        <section style={{ background: NAVY, padding: 'clamp(52px,7vw,88px) clamp(24px,5vw,80px)' }}>
          <div className="faq-wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 36 }}>
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 16 }}>
                <div style={{ width: 3, height: 13, background: GREEN, borderRadius: 2 }} />
                <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '2.5px', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.3)' }}>Still need help?</span>
              </div>
              <h3 style={{ fontSize: 'clamp(32px,5vw,72px)', fontWeight: 900, color: '#fff', letterSpacing: '-0.045em', lineHeight: 0.9, margin: '0 0 12px', textTransform: 'uppercase' as const }}>
                REACH OUT TO<br /><span style={{ color: GREEN }}>OUR TEAM.</span>
              </h3>
              <p style={{ fontSize: 'clamp(13px,1.05vw,16px)', color: 'rgba(255,255,255,0.38)', margin: 0 }}>
                Mon – Fri, 7am – 7pm AEST
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.14, ease }}
              style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
            >
              <a href="tel:1800054555"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 12, padding: 'clamp(16px,1.4vw,20px) clamp(28px,2.5vw,44px)', background: GREEN, color: NAVY, borderRadius: 4, fontSize: 13, fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase' as const, textDecoration: 'none', transition: 'opacity 0.2s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.85' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1' }}>
                <Phone size={14} strokeWidth={2} /> 1800 054 555
              </a>
              <a href="mailto:connect@bivry.com.au"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 12, padding: 'clamp(16px,1.4vw,20px) clamp(28px,2.5vw,44px)', background: 'transparent', color: 'rgba(255,255,255,0.65)', border: '1.5px solid rgba(255,255,255,0.18)', borderRadius: 4, fontSize: 13, fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase' as const, textDecoration: 'none', transition: 'all 0.22s' }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = GREEN; el.style.color = GREEN }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(255,255,255,0.18)'; el.style.color = 'rgba(255,255,255,0.65)' }}>
                <Mail size={14} strokeWidth={2} /> connect@bivry.com.au
              </a>
            </motion.div>
          </div>
        </section>

        <PageCTA line1="READY TO" line2="SHIP?" sub="Get a quote or speak to our team about your freight requirements." buttonLabel="Contact Our Team" href="/contact" />

      </main>
      <Footer />

      <style>{`
        /* ── Shared inner container ── */
        .faq-wrap { max-width: 1760px; margin: 0 auto; }
        @media (min-width: 1920px) { .faq-wrap { max-width: 1900px; } }
        @media (min-width: 2560px) { .faq-wrap { max-width: 2400px; } }

        /* ── Industries arc — desktop flex ── */
        .ind-arc {
          display: flex;
          align-items: flex-end;
          justify-content: center;
          gap: clamp(10px, 1.4vw, 22px);
          padding-bottom: 72px;
        }

        /* Icon box sizing */
        .ind-icon-box {
          width: clamp(78px, 8.5vw, 122px);
          height: clamp(78px, 8.5vw, 122px);
          border-radius: clamp(16px, 1.8vw, 26px);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 28px rgba(8,33,60,0.10), 0 2px 8px rgba(8,33,60,0.06);
          border: 1.5px solid rgba(8,33,60,0.07);
          transition: box-shadow 0.3s ease, border-color 0.3s ease;
        }
        .ind-tile-wrap:hover .ind-icon-box {
          box-shadow: 0 18px 48px rgba(8,33,60,0.16), 0 4px 14px rgba(8,33,60,0.09);
          border-color: rgba(8,33,60,0.12);
        }

        /* ── Tablet: flatten arc slightly, smaller tiles ── */
        @media (max-width: 1024px) and (min-width: 768px) {
          .ind-arc { padding-bottom: 60px; gap: 14px; }
          .ind-icon-box { width: 82px; height: 82px; border-radius: 18px; }
        }

        /* ── Mobile: 3-col grid, no arc ── */
        @media (max-width: 767px) {
          .ind-arc {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
            align-items: start;
            padding-bottom: 0;
            justify-items: center;
          }
          .ind-icon-box {
            width: 76px;
            height: 76px;
            border-radius: 18px;
          }
          .ind-tile-wrap { width: 100%; display: flex; justify-content: center; }
        }

        /* ── Mobile S ── */
        @media (max-width: 374px) {
          .ind-arc { grid-template-columns: repeat(3, 1fr); gap: 14px; }
          .ind-icon-box { width: 64px; height: 64px; border-radius: 14px; }
        }
      `}</style>
    </div>
  )
}
