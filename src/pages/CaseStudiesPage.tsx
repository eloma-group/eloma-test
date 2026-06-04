import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Navigation2, BrainCircuit, Camera, Eye } from 'lucide-react'
import { Header } from '../components/Header/Header'
import { Footer } from '../components/Footer'
import { InnerHero, PageCTA, NAVY, GREEN, CREAM, ease } from '../components/InnerHero'

/* ── Case studies: 4 real + 1 supporting + 2 new real ── */
const STUDIES = [
  {
    id: 1, num: '01', tag: 'Reliability',
    title: 'Missed Deadlines.',
    subtitle: 'Back in Control.',
    challenge: '',
    solution: 'We rebuilt their entire delivery schedule from the ground up. Dedicated linehaul runs with guaranteed windows, proactive status updates before issues became problems, and a single point of contact who knew their freight inside out.',
    outcomes: ['On-time delivery rate lifted to 98%+', 'Late-delivery retailer penalties eliminated', 'Business confident to scale freight volumes'],
  },
  {
    id: 2, num: '02', tag: 'FMCG',
    title: 'Truck Broke Down Mid-Route. We Still Delivered on Time.',
    subtitle: "Here's How.",
    challenge: "Mid-way through a critical overnight FMCG run, one of our vehicles experienced a mechanical failure. The freight was time-sensitive - retail shelves were waiting and there was no room to slip.",
    solution: 'Our operations team activated a rapid-response protocol immediately: a backup vehicle was dispatched within 40 minutes, freight was transferred at a coordinated handover point, and the run was completed inside the original delivery window.',
    outcomes: ['Freight delivered within original time window', 'Client operations completely unaffected', 'Zero stockouts at any retail location'],
  },
  {
    id: 3, num: '03', tag: 'Regional',
    title: 'Delivering Through Storms.',
    subtitle: 'How We Reached a Remote Regional Site Despite Extreme Weather.',
    challenge: 'A construction project in a remote regional area needed critical materials delivered during a period of severe weather. Roads were deteriorating fast, and other carriers had already declined the job.',
    solution: 'Our team assessed alternative routing options, deployed a heavy-duty vehicle suited to difficult terrain, and coordinated closely with the site manager to time the delivery through the safest available weather window.',
    outcomes: ['Delivery completed as committed', 'Construction schedule maintained without delay', 'Client awarded us follow-on regional contracts'],
  },
  {
    id: 4, num: '04', tag: 'Manufacturing',
    title: 'Damaged Freight Was Costing the Business Thousands.',
    subtitle: "Here's How Better Handling Changed Everything.",
    challenge: 'A manufacturing client was experiencing recurring freight damage in transit - thousands in product losses every month, insurance claims piling up, and supplier relationships strained by repeated disputes.',
    solution: 'We conducted a full freight audit, introduced tailored packing and load-securing protocols specific to their product lines, trained our drivers accordingly, and introduced condition-on-pickup photography for every consignment.',
    outcomes: ['Damage incidents reduced to zero', 'Monthly freight loss costs eliminated entirely', 'Supplier relationships restored and strengthened'],
  },
  {
    id: 5, num: '05', tag: 'E-Commerce',
    title: 'Scaling Last-Mile Across Three Metro Markets.',
    subtitle: '',
    challenge: 'A fast-growing online retailer needed to expand same-day last-mile capability from Melbourne into Sydney and Brisbane without compromising the tight delivery windows their customers expected.',
    solution: "BIVRY established local dispatch coordination in each market, optimised daily route density, and integrated live tracking updates directly into the brand's customer notification flow - seamless from warehouse to doorstep.",
    outcomes: ['Same-day coverage across three metro markets', 'Customer delivery rating maintained throughout', 'Volume scaled without any service degradation'],
  },
  {
    id: 6, num: '06', tag: 'Pharma',
    title: 'Cold Chain Intact. 3,000 km. Zero Failures.',
    subtitle: 'Temperature-Critical Freight Delivered Without Compromise.',
    challenge: 'A national pharmaceutical distributor needed temperature-sensitive medications transported across three states under strict compliance requirements. A single temperature excursion would mean product loss, regulatory risk, and patient harm.',
    solution: 'BIVRY deployed dedicated refrigerated linehaul with validated temperature loggers, real-time cold-chain alerts, and full chain-of-custody documentation meeting TGA compliance requirements at every handover point.',
    outcomes: ['100% temperature compliance across all runs', 'Full TGA documentation maintained end-to-end', 'No excursions across 3,000+ km of linehaul'],
  },
  {
    id: 7, num: '07', tag: 'Retail',
    title: 'Black Friday Surge. Every Store Stocked. Not a Single Miss.',
    subtitle: '',
    challenge: 'A national retail chain needed to triple their freight volumes over a 10-day peak promotional period. Retail stores across five states were counting on stock being there - late deliveries meant empty shelves and lost revenue.',
    solution: 'BIVRY pre-staged surge capacity three weeks in advance, activated overflow fleet partnerships, and assigned a dedicated operations lead who monitored every single run in real time throughout the peak window.',
    outcomes: ['100% of peak deliveries met on time', 'Volumes tripled with zero service degradation', 'All retail stores fully stocked throughout promotion'],
  },
]

/* ── Fleet technology features ── */
const FLEET_FEATURES = [
  {
    id: 'gps', num: '01', title: 'Live GPS Tracking',
    description: 'Track the exact location of your shipment in real time. Every route is monitored closely so we can provide accurate ETAs and instant updates the moment you need them.',
    Icon: Navigation2,
  },
  {
    id: 'ai', num: '02', title: 'AI Monitoring',
    description: 'AI-powered systems detect unusual activity, optimise route efficiency, and support safer driving standards across the entire fleet - continuously, around the clock.',
    Icon: BrainCircuit,
  },
  {
    id: 'bodycam', num: '03', title: 'Body Cams',
    description: 'Body cameras add accountability at the point of delivery - recording on-ground interactions and handover activities to protect your freight and our drivers equally.',
    Icon: Camera,
  },
  {
    id: '360cam', num: '04', title: '360° Cameras',
    description: 'Full-surround vehicle camera coverage eliminates blind spots, improves safety margins, and gives us complete visual record of every journey from start to finish.',
    Icon: Eye,
  },
]


/* ── Featured study (Study 01) ── */
function FeaturedStudy({ s }: { s: typeof STUDIES[0] }) {
  const revealEase: [number, number, number, number] = [0.16, 1, 0.3, 1]

  return (
    <section style={{ background: NAVY, padding: 'clamp(72px,9vw,120px) clamp(24px,5vw,80px)', position: 'relative', overflow: 'hidden' }}>

      {/* Dot grid — fades in */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
        viewport={{ once: true }} transition={{ duration: 1.4, ease: 'easeOut' }}
        style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.022) 1px, transparent 1px)', backgroundSize: '26px 26px', pointerEvents: 'none' }}
      />

      {/* Ghost number — drifts in from right */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0, x: 80 }} animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.1, ease: revealEase, delay: 0.15 }}
        style={{
          position: 'absolute', right: 'clamp(-20px,-2vw,0px)', top: '50%', transform: 'translateY(-50%)',
          fontSize: 'clamp(200px,28vw,460px)', fontWeight: 900, lineHeight: 1,
          color: 'transparent', WebkitTextStroke: '1.5px rgba(255,255,255,0.04)',
          userSelect: 'none', pointerEvents: 'none', letterSpacing: '-0.06em',
        }}
      >{s.num}</motion.div>

      <div className="cs-wrap" style={{ position: 'relative', zIndex: 1 }}>

        {/* Label row */}
        <motion.div
          initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease }}
          style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 'clamp(28px,3vw,44px)' }}
        >
          <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)' }}>Case Study {s.num}</span>
          <div style={{ width: 1, height: 14, background: 'rgba(255,255,255,0.15)' }} />
          <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', border: '1px solid rgba(60,185,140,0.35)', borderRadius: 100, padding: '4px 12px', color: GREEN }}>{s.tag}</span>
        </motion.div>

        <div className="cs-featured-grid">

          {/* Left: staggered title */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.78, ease: revealEase, delay: 0.1 }}
              style={{
                fontSize: 'clamp(40px,6vw,88px)', fontWeight: 900,
                color: '#fff', letterSpacing: '-0.048em', lineHeight: 1.0,
                margin: 0, textTransform: 'uppercase',
              }}
            >
              {s.title}
            </motion.h2>

            {s.subtitle && (
              <motion.div
                initial={{ opacity: 0, y: 36 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.78, ease: revealEase, delay: 0.22 }}
                style={{ marginBottom: 'clamp(24px,3vw,40px)' }}
              >
                <span style={{
                  display: 'block',
                  fontSize: 'clamp(40px,6vw,88px)', fontWeight: 900,
                  color: GREEN, letterSpacing: '-0.048em', lineHeight: 1.0,
                  textTransform: 'uppercase',
                }}>
                  {s.subtitle}
                </span>
              </motion.div>
            )}

            {s.challenge && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, ease, delay: 0.38 }}
                style={{ fontSize: 'clamp(14px,1.15vw,17px)', color: 'rgba(255,255,255,0.46)', lineHeight: 1.84, margin: 0 }}
              >
                {s.challenge}
              </motion.p>
            )}
          </div>

          {/* Right: cards with hover lift */}
          <motion.div
            initial={{ opacity: 0, x: 32 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, ease, delay: 0.22 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
          >
            {/* Solution card */}
            <motion.div
              whileHover={{ scale: 1.025, borderColor: 'rgba(255,255,255,0.2)', backgroundColor: 'rgba(255,255,255,0.08)' }}
              transition={{ duration: 0.24 }}
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: 'clamp(24px,2.8vw,40px)', cursor: 'default' }}
            >
              <p style={{ fontSize: 11, fontWeight: 800, color: 'rgba(255,255,255,0.3)', letterSpacing: '2px', textTransform: 'uppercase', margin: '0 0 14px' }}>The Solution</p>
              <p style={{ fontSize: 'clamp(13px,1.1vw,15px)', color: 'rgba(255,255,255,0.55)', lineHeight: 1.84, margin: 0 }}>{s.solution}</p>
            </motion.div>

            {/* Outcomes card */}
            <motion.div
              whileHover={{ scale: 1.025, borderColor: 'rgba(60,185,140,0.42)', backgroundColor: 'rgba(60,185,140,0.12)' }}
              transition={{ duration: 0.24 }}
              style={{ background: 'rgba(60,185,140,0.08)', border: '1px solid rgba(60,185,140,0.2)', borderRadius: 16, padding: 'clamp(24px,2.8vw,40px)', cursor: 'default' }}
            >
              <p style={{ fontSize: 11, fontWeight: 800, color: 'rgba(255,255,255,0.3)', letterSpacing: '2px', textTransform: 'uppercase', margin: '0 0 16px' }}>Key Outcomes</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {s.outcomes.map((o, i) => (
                  <motion.div
                    key={o}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.45, ease, delay: 0.4 + i * 0.1 }}
                    style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}
                  >
                    <span style={{ color: GREEN, fontWeight: 900, fontSize: 14, flexShrink: 0, lineHeight: 1.5 }}>→</span>
                    <span style={{ fontSize: 'clamp(13px,1.05vw,15px)', color: 'rgba(255,255,255,0.62)', lineHeight: 1.55 }}>{o}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

/* ── Study card with slide-up reveal ── */
function StudyCard({ s, idx }: { s: typeof STUDIES[0]; idx: number }) {
  const [open, setOpen] = useState(false)
  const accentTop  = idx % 3 === 0 ? GREEN : idx % 3 === 1 ? NAVY : GREEN
  const revealDark = idx % 2 === 0 ? '#0d2236' : '#103826'

  return (
    <motion.article
      className="sc"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-28px' }}
      transition={{ duration: 0.55, delay: (idx % 3) * 0.08, ease }}
      onClick={() => setOpen(v => !v)}
      style={{
        background: CREAM, borderRadius: 20, overflow: 'hidden',
        border: '1px solid rgba(8,33,60,0.08)',
        display: 'flex', flexDirection: 'column', position: 'relative',
        cursor: 'pointer', minHeight: 'clamp(300px,30vw,400px)',
      }}
    >
      {/* Top accent bar */}
      <div style={{ height: 4, background: accentTop, flexShrink: 0 }} />

      {/* Ghost number watermark */}
      <div aria-hidden style={{
        position: 'absolute', right: -8, bottom: -14,
        fontSize: 'clamp(76px,9vw,130px)', fontWeight: 900, lineHeight: 1,
        color: 'transparent', WebkitTextStroke: '1.5px rgba(8,33,60,0.05)',
        userSelect: 'none', pointerEvents: 'none', letterSpacing: '-0.06em', zIndex: 0,
      }}>{s.num}</div>

      {/* Front face */}
      <div className="sc-front" style={{ padding: 'clamp(22px,2.6vw,38px)', flex: 1, display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18, flexWrap: 'wrap', gap: 8 }}>
          <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', border: `1px solid ${accentTop}60`, borderRadius: 100, padding: '3px 11px', color: accentTop }}>{s.tag}</span>
          <span style={{ fontSize: 10, fontWeight: 800, color: 'rgba(8,33,60,0.22)', letterSpacing: '1.5px', textTransform: 'uppercase' }}>Study {s.num}</span>
        </div>

        <h3 style={{ fontSize: 'clamp(17px,1.9vw,26px)', fontWeight: 900, color: NAVY, margin: '0 0 6px', letterSpacing: '-0.028em', lineHeight: 1.15, textTransform: 'uppercase' }}>{s.title}</h3>
        {s.subtitle && <p style={{ fontSize: 'clamp(13px,1.1vw,16px)', fontWeight: 700, color: GREEN, margin: '0 0 16px', lineHeight: 1.3 }}>{s.subtitle}</p>}

        <p style={{ fontSize: 'clamp(14px,1.2vw,16px)', color: 'rgba(8,33,60,0.48)', lineHeight: 1.8, margin: '0 0 20px', flex: 1 }}>
          {s.challenge.length > 130 ? s.challenge.slice(0, 128) + '…' : s.challenge}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
          {s.outcomes.slice(0, 2).map(o => (
            <div key={o} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
              <span style={{ color: GREEN, fontWeight: 900, fontSize: 14, flexShrink: 0, lineHeight: 1.55 }}>→</span>
              <span style={{ fontSize: 'clamp(13px,1.1vw,15px)', color: 'rgba(8,33,60,0.5)', lineHeight: 1.52 }}>{o}</span>
            </div>
          ))}
        </div>

        {/* Hover hint */}
        <div style={{ marginTop: 'auto', paddingTop: 18, width: 28, height: 3, background: accentTop, borderRadius: 2 }} />
      </div>

      {/* Slide-up reveal panel */}
      <div className={`sc-reveal${open ? ' sc-reveal-open' : ''}`} style={{ background: revealDark }}>
        <div style={{ width: 28, height: 3, background: GREEN, borderRadius: 2, marginBottom: 16 }} />
        <p style={{ fontSize: 11, fontWeight: 800, color: 'rgba(255,255,255,0.3)', letterSpacing: '2px', textTransform: 'uppercase', margin: '0 0 12px' }}>The Solution</p>
        <p style={{ fontSize: 'clamp(14px,1.2vw,16px)', color: 'rgba(255,255,255,0.65)', lineHeight: 1.84, margin: 0, flex: 1 }}>{s.solution}</p>
        <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 9 }}>
          {s.outcomes.map(o => (
            <div key={o} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
              <span style={{ color: GREEN, fontWeight: 900, fontSize: 14, flexShrink: 0, lineHeight: 1.55 }}>→</span>
              <span style={{ fontSize: 'clamp(13px,1.1vw,15px)', color: 'rgba(255,255,255,0.55)', lineHeight: 1.52 }}>{o}</span>
            </div>
          ))}
        </div>
        <a
          href="/contact"
          onClick={e => e.stopPropagation()}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 22, fontSize: 12, fontWeight: 800, letterSpacing: '1.5px', textTransform: 'uppercase', color: GREEN, textDecoration: 'none' }}
        >
          Get a Similar Result <ArrowRight size={12} strokeWidth={2.5} />
        </a>
        <span className="sc-close-hint">Tap to close</span>
      </div>
    </motion.article>
  )
}

/* ── Fleet feature row ── */
function FleetRow({ f, idx }: { f: typeof FLEET_FEATURES[0]; idx: number }) {
  const [hovered, setHovered] = useState(false)
  const { Icon } = f

  return (
    <motion.div
      initial={{ opacity: 0, x: -28 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: idx * 0.1, ease }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        display: 'grid',
        gridTemplateColumns: '48px 76px 1fr 32px',
        gap: 'clamp(20px,2.8vw,44px)',
        alignItems: 'center',
        padding: 'clamp(28px,3.5vw,52px) clamp(20px,2.5vw,40px)',
        borderTop: '1px solid rgba(8,33,60,0.07)',
        borderLeft: `4px solid ${hovered ? GREEN : 'transparent'}`,
        background: hovered ? 'rgba(60,185,140,0.04)' : 'transparent',
        boxShadow: hovered ? 'inset 0 0 0 1px rgba(60,185,140,0.12)' : 'none',
        transition: 'border-left-color 0.3s ease, background 0.3s ease, box-shadow 0.3s ease',
        cursor: 'default',
      }}
    >
      {/* Number */}
      <span style={{
        fontSize: 13, fontWeight: 900, letterSpacing: '1.5px',
        color: hovered ? GREEN : 'rgba(8,33,60,0.18)',
        transition: 'color 0.3s ease',
      }}>
        {f.num}
      </span>

      {/* Icon box — spring scale on hover */}
      <motion.div
        animate={{ scale: hovered ? 1.12 : 1 }}
        transition={{ type: 'spring', stiffness: 320, damping: 22 }}
        style={{
          width: 68, height: 68, borderRadius: 18, flexShrink: 0,
          background: hovered ? 'rgba(60,185,140,0.12)' : 'rgba(8,33,60,0.04)',
          border: `1.5px solid ${hovered ? 'rgba(60,185,140,0.38)' : 'rgba(8,33,60,0.08)'}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: hovered
            ? '0 8px 32px rgba(60,185,140,0.22), 0 2px 8px rgba(60,185,140,0.12)'
            : '0 2px 8px rgba(8,33,60,0.04)',
          transition: 'background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
        }}
      >
        <Icon size={28} color={hovered ? GREEN : 'rgba(8,33,60,0.32)'} strokeWidth={1.6} />
      </motion.div>

      {/* Title + description */}
      <div>
        <h4 style={{
          fontSize: 'clamp(18px,2.1vw,28px)', fontWeight: 900,
          color: hovered ? NAVY : 'rgba(8,33,60,0.6)',
          textTransform: 'uppercase', letterSpacing: '-0.03em',
          lineHeight: 1.1, margin: '0 0 10px',
          transition: 'color 0.3s ease',
        }}>
          {f.title}
        </h4>
        <p style={{
          fontSize: 'clamp(14px,1.25vw,17px)',
          color: hovered ? 'rgba(8,33,60,0.58)' : 'rgba(8,33,60,0.4)',
          lineHeight: 1.84, margin: 0,
          transition: 'color 0.3s ease',
        }}>
          {f.description}
        </p>
      </div>

      {/* Right arrow — slides in on hover */}
      <motion.span
        animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -10 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        style={{ fontSize: 20, fontWeight: 900, color: GREEN, flexShrink: 0, lineHeight: 1 }}
      >
        →
      </motion.span>
    </motion.div>
  )
}

/* ── Page ── */
export function CaseStudiesPage() {
  return (
    <div style={{ background: CREAM, overflowX: 'hidden' }}>
      <Header />
      <main>

        <InnerHero
          badge="Proof of Work"
          line1="CASE"
          line2="STUDIES."
          description="Real problems. Real solutions. Real results. See how BIVRY has helped businesses across Australia move freight with confidence."
          meta={[
            { label: 'Industries',  value: 'FMCG, Auto, Pharma & More' },
            { label: 'Outcomes',    value: 'Cost, Speed & Compliance'  },
            { label: 'Client Base', value: 'SME to Enterprise'         },
            { label: 'Retention',   value: 'Long-Term Partnerships'    },
          ]}
        />

        {/* Featured study 01 */}
        <FeaturedStudy s={STUDIES[0]} />

        {/* ── More Results ── */}
        <section style={{ background: '#fff', padding: 'clamp(72px,9vw,120px) clamp(24px,5vw,80px)' }}>
          <div className="cs-wrap">
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24, marginBottom: 'clamp(40px,5vw,64px)' }}>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 18 }}>
                  <div style={{ width: 3, height: 13, background: GREEN, borderRadius: 2 }} />
                  <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '2.5px', textTransform: 'uppercase' as const, color: 'rgba(8,33,60,0.38)' }}>All Case Studies</span>
                </div>
                <h2 style={{ fontSize: 'clamp(44px,7vw,100px)', fontWeight: 900, color: NAVY, letterSpacing: '-0.048em', lineHeight: 0.88, margin: 0, textTransform: 'uppercase' as const }}>
                  MORE<br /><span style={{ color: GREEN }}>RESULTS.</span>
                </h2>
              </motion.div>
              <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
                style={{ fontSize: 'clamp(13px,1.05vw,16px)', color: 'rgba(8,33,60,0.46)', lineHeight: 1.8, margin: 0, maxWidth: 300 }}>
                Hover any card to reveal the solution. Every challenge solved differently.
              </motion.p>
            </div>

            {/* 3-col grid for 6 cards */}
            <div className="cs-grid">
              {STUDIES.slice(1).map((s, i) => (
                <StudyCard key={s.id} s={s} idx={i} />
              ))}
            </div>
          </div>
        </section>

        {/* ── Fleet Section ── */}
        <section style={{ background: '#fff', padding: 'clamp(72px,9vw,120px) clamp(24px,5vw,80px)' }}>
          <div className="cs-wrap">
            {/* Header row */}
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 32, marginBottom: 'clamp(52px,7vw,88px)' }}>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 18 }}>
                  <div style={{ width: 3, height: 13, background: GREEN, borderRadius: 2 }} />
                  <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '2.5px', textTransform: 'uppercase' as const, color: 'rgba(8,33,60,0.38)' }}>Our Fleet</span>
                </div>
                <h2 style={{ fontSize: 'clamp(38px,6vw,86px)', fontWeight: 900, color: NAVY, letterSpacing: '-0.048em', lineHeight: 0.9, margin: 0, textTransform: 'uppercase' as const }}>
                  CONNECTED FLEET,<br /><span style={{ color: GREEN }}>CONNECTED YOU.</span>
                </h2>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.18, ease }} style={{ maxWidth: 420 }}>
                <p style={{ fontSize: 'clamp(13px,1.1vw,16px)', color: 'rgba(8,33,60,0.52)', lineHeight: 1.84, margin: '0 0 16px' }}>
                  When your freight is on the move, staying informed matters. Every vehicle in our fleet is equipped with smart telematics - giving you complete visibility from pickup to delivery.
                </p>
                <p style={{ fontSize: 'clamp(13px,1.1vw,16px)', color: 'rgba(8,33,60,0.52)', lineHeight: 1.84, margin: 0 }}>
                  With real-time tracking and instant alerts, you stay connected every step of the way. No guessing. No waiting.
                </p>
              </motion.div>
            </div>

            {/* Feature rows */}
            <div style={{ borderBottom: '1px solid rgba(8,33,60,0.07)' }}>
              {FLEET_FEATURES.map((f, i) => (
                <FleetRow key={f.id} f={f} idx={i} />
              ))}
            </div>
          </div>
        </section>

        <PageCTA
          line1="YOUR SUCCESS"
          line2="STORY AWAITS."
          sub="Tell us your freight challenge. We'll build a solution around it."
          buttonLabel="Discuss Your Challenge"
          href="/contact"
        />

      </main>
      <Footer />

      <style>{`
        /* ── Inner container ── */
        .cs-wrap { max-width: 1760px; margin: 0 auto; }
        @media (min-width: 1920px) { .cs-wrap { max-width: 1900px; } }
        @media (min-width: 2560px) { .cs-wrap { max-width: 2400px; } }

        /* ── Featured: 2-col ── */
        .cs-featured-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(40px,6vw,96px);
          align-items: start;
        }

        /* ── Study grid: 3-col for 6 cards ── */
        .cs-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(14px,1.6vw,22px);
        }

        /* ── Study card hover & reveal ── */
        .sc { transition: transform 0.32s ease, box-shadow 0.32s ease; }

        @media (pointer: fine) {
          .sc:hover {
            transform: translateY(-9px);
            box-shadow: 0 28px 60px rgba(8,33,60,0.14);
            z-index: 2;
          }
          .sc:hover .sc-reveal { transform: translateY(0); }
          .sc-close-hint { display: none !important; }
        }

        .sc-front { transition: opacity 0.3s ease; }
        .sc:hover .sc-front, .sc-reveal.sc-reveal-open ~ * .sc-front { opacity: 1; }

        .sc-reveal {
          position: absolute; inset: 0;
          padding: clamp(22px,2.6vw,38px);
          border-radius: inherit;
          display: flex; flex-direction: column;
          transform: translateY(101%);
          transition: transform 0.48s cubic-bezier(0.16, 1, 0.3, 1);
          z-index: 2;
          overflow-y: auto;
        }
        .sc-reveal.sc-reveal-open { transform: translateY(0); }

        .sc-close-hint {
          margin-top: 14px;
          font-size: 9px; font-weight: 800;
          letter-spacing: 2px; text-transform: uppercase;
          color: rgba(255,255,255,0.2);
          display: block;
        }

        /* ── Tablet ── */
        @media (max-width: 1024px) {
          .cs-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 900px) {
          .cs-featured-grid { grid-template-columns: 1fr; }
        }

        /* ── Mobile ── */
        @media (max-width: 600px) {
          .cs-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  )
}
