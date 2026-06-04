import { useState } from 'react'
import { motion } from 'framer-motion'
import { Header } from '../components/Header/Header'
import { Footer } from '../components/Footer'
import { InnerHero, PageCTA, NAVY, GREEN, CREAM, ease } from '../components/InnerHero'

const PARTNERS = [
  { name: 'Isuzu',           logo: '/images/isuzu.jpg',           cat: 'Fleet & Vehicles',   desc: 'Proudly delivering vehicle parts for Isuzu, helping dealerships and service networks stay supplied and operational.' },
  { name: 'Tesla',           logo: '/images/tesla.png',           cat: 'Electric Fleet',      desc: 'Sustainable electric logistics reducing our carbon footprint across high-frequency metro corridors.' },
  { name: 'Amazon',          logo: '/images/amazon.png',          cat: 'Logistics Network',   desc: 'Fulfilment and last-mile integration across the national distribution and warehousing network.' },
  { name: 'Direct Couriers', logo: '/images/direct_couriers.png', cat: 'Last Mile Delivery',  desc: 'Same-day and express courier solutions built for urgent metropolitan and regional deliveries.' },
  { name: 'Coles',           logo: '/images/coles.png',           cat: 'Retail & Grocery',    desc: 'Powering consistent supply chain delivery across Coles supermarkets and distribution centres nationwide.' },
  { name: 'Woolworths',     logo: '/images/woolworths.png',      cat: 'Retail & Grocery',    desc: "Supporting Woolworths Group's national freight movement with reliable, time-critical logistics solutions." },
]


const DEPOTS = [
  { city: 'Darwin',    state: 'NT',  role: 'Northern Territory',  highlight: false },
  { city: 'Brisbane',  state: 'QLD', role: 'Northern Hub',         highlight: false },
  { city: 'Perth',     state: 'WA',  role: 'Western Hub',          highlight: false },
  { city: 'Sydney',    state: 'NSW', role: 'Eastern Hub',          highlight: false },
  { city: 'Adelaide',  state: 'SA',  role: 'Southern Hub',         highlight: false },
  { city: 'Melbourne', state: 'VIC', role: 'HQ & Primary Hub',     highlight: true  },
  { city: 'Canberra',  state: 'ACT', role: 'Capital Region',       highlight: false },
  { city: 'Hobart',    state: 'TAS', role: 'Tasmania',             highlight: false },
]

const NETWORK_PILLARS = [
  { num: '01', title: 'National Reach',    body: 'Depot presence in every Australian state and territory, enabling consistent service from Darwin to Hobart.' },
  { num: '02', title: 'Carrier Diversity', body: 'A curated mix of national and regional carriers ensures the right vehicle and route for every consignment.' },
  { num: '03', title: 'Global Gateway',    body: 'Partnerships with international freight specialists connect your cargo to key markets across Asia, Europe and the Americas.' },
]


/* ── Partner Card — spotlight + 3D tilt ── */
function PartnerCard({ p, i }: { p: typeof PARTNERS[0]; i: number }) {
  const [mouse, setMouse] = useState({ x: 50, y: 50, hov: false })

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    setMouse({
      x: ((e.clientX - r.left) / r.width) * 100,
      y: ((e.clientY - r.top) / r.height) * 100,
      hov: true,
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: i * 0.07, ease }}
    >
      <motion.div
        onMouseMove={onMove}
        onMouseLeave={() => setMouse(m => ({ ...m, hov: false }))}
        animate={{
          rotateX: mouse.hov ? (mouse.y - 50) * -0.18 : 0,
          rotateY: mouse.hov ? (mouse.x - 50) * 0.18 : 0,
          y:       mouse.hov ? -8 : 0,
          scale:   mouse.hov ? 1.025 : 1,
        }}
        transition={{ type: 'spring', stiffness: 380, damping: 28 }}
        className="cn-card"
        style={{
          position: 'relative', overflow: 'hidden', borderRadius: 20,
          cursor: 'default', transformStyle: 'preserve-3d',
          height: 'clamp(200px,22vw,280px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          /* spotlight */
          background: mouse.hov
            ? `radial-gradient(circle 240px at ${mouse.x}% ${mouse.y}%, rgba(60,185,140,0.13) 0%, #fff 68%)`
            : '#fff',
          /* border glow */
          boxShadow: mouse.hov
            ? `inset 0 0 0 1.5px rgba(60,185,140,0.5), 0 32px 72px rgba(8,33,60,0.13), 0 6px 20px rgba(60,185,140,0.14)`
            : `0 0 0 1.5px rgba(8,33,60,0.07), 0 2px 8px rgba(8,33,60,0.04)`,
          transition: 'background 0.08s linear, box-shadow 0.38s ease',
        }}
      >
        {/* Corner accent dots */}
        {mouse.hov && (
          <>
            <div style={{ position:'absolute', top:14, left:14, width:5, height:5, borderRadius:'50%', background: GREEN, opacity:0.7 }} />
            <div style={{ position:'absolute', top:14, right:14, width:5, height:5, borderRadius:'50%', background: GREEN, opacity:0.7 }} />
          </>
        )}

        {/* Logo */}
        {p.logo ? (
          <img
            src={p.logo} alt={p.name}
            className="cn-logo-img"
            style={{
              maxWidth: '62%', maxHeight: '52%', objectFit: 'contain',
              userSelect: 'none', pointerEvents: 'none',
              transition: 'transform 0.4s ease, filter 0.4s ease',
              transform: mouse.hov ? 'scale(1.08)' : 'scale(1)',
              filter: mouse.hov ? 'drop-shadow(0 4px 16px rgba(60,185,140,0.3))' : 'none',
            }}
          />
        ) : (
          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
            userSelect: 'none', pointerEvents: 'none',
            transition: 'transform 0.4s ease',
            transform: mouse.hov ? 'scale(1.06)' : 'scale(1)',
          }}>
            <span style={{
              fontSize: 'clamp(36px,5vw,64px)', fontWeight: 900,
              color: mouse.hov ? NAVY : 'rgba(8,33,60,0.75)',
              letterSpacing: '-0.05em', lineHeight: 1,
              transition: 'color 0.3s ease, text-shadow 0.3s ease',
              textShadow: mouse.hov ? `0 4px 20px rgba(60,185,140,0.25)` : 'none',
            }}>{p.name.toUpperCase()}</span>
            <div style={{
              height: 3, borderRadius: 2, background: GREEN,
              transition: 'width 0.4s cubic-bezier(0.16,1,0.3,1)',
              width: mouse.hov ? 48 : 28,
            }} />
          </div>
        )}

        {/* Full-card slide-up overlay — frosted glass */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'rgba(248,252,250,0.94)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderTop: `3px solid ${GREEN}`,
          transform: mouse.hov ? 'translateY(0)' : 'translateY(105%)',
          transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1)',
          display: 'flex', flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 'clamp(16px,2vw,26px)',
          overflow: 'hidden',
        }}>
          {/* Ghost first-letter watermark */}
          <div style={{
            position: 'absolute', right: -6, bottom: -14,
            fontSize: 'clamp(90px,14vw,150px)', fontWeight: 900, lineHeight: 1,
            color: `${GREEN}12`, letterSpacing: '-0.06em',
            userSelect: 'none', pointerEvents: 'none',
          }}>{p.name[0].toUpperCase()}</div>

          {/* TOP ROW — category pill + arrow */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', zIndex: 1 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '4px 11px', borderRadius: 100,
              background: `${GREEN}18`, border: `1px solid ${GREEN}55`,
            }}>
              <div style={{ width: 4, height: 4, borderRadius: '50%', background: GREEN, flexShrink: 0 }} />
              <span style={{ fontSize: 8.5, fontWeight: 800, letterSpacing: '2.2px', textTransform: 'uppercase' as const, color: GREEN }}>{p.cat}</span>
            </div>

            <div style={{
              width: 30, height: 30, borderRadius: '50%', flexShrink: 0,
              border: `1.5px solid ${GREEN}55`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ color: GREEN, fontSize: 13, lineHeight: 1 }}>↗</span>
            </div>
          </div>

          {/* BOTTOM — name + rule + desc */}
          <div style={{ position: 'relative', zIndex: 1 }}>
            {/* Animated green rule */}
            <div style={{
              height: 2, borderRadius: 2, background: GREEN,
              marginBottom: 'clamp(9px,1.1vw,13px)',
              width: mouse.hov ? 36 : 0,
              transition: 'width 0.5s cubic-bezier(0.16,1,0.3,1) 0.1s',
            }} />

            {/* Company name */}
            <div style={{
              fontSize: 'clamp(17px,2vw,26px)', fontWeight: 900,
              color: NAVY, letterSpacing: '-0.04em', lineHeight: 0.95,
              textTransform: 'uppercase' as const,
              marginBottom: 'clamp(8px,1vw,11px)',
            }}>{p.name}</div>

            {/* Description */}
            <p style={{
              fontSize: 'clamp(10.5px,0.82vw,12.5px)',
              color: 'rgba(8,33,60,0.52)', lineHeight: 1.72,
              margin: 0,
            }}>{p.desc}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

type Depot = { city: string; state: string; role: string; highlight: boolean }

function DepotCard({ depot, delay }: { depot: Depot; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.5, delay, ease }}
      className={`depot-card${depot.highlight ? ' depot-hq' : ''}`}
      style={{
        padding: 'clamp(14px,1.8vw,24px)',
        borderRadius: 14,
        background: depot.highlight ? NAVY : '#fff',
        border: depot.highlight ? `1px solid rgba(60,185,140,0.25)` : '1px solid rgba(8,33,60,0.07)',
        position: 'relative', overflow: 'hidden',
      }}
    >
      {depot.highlight && (
        <div style={{ position: 'absolute', top: -40, right: -40, width: 120, height: 120, borderRadius: '50%', background: `radial-gradient(circle, ${GREEN}18 0%, transparent 70%)`, pointerEvents: 'none' }} />
      )}
      {depot.highlight && (
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, marginBottom: 10, background: GREEN, borderRadius: 100, padding: '2px 10px' }}>
          <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#fff', boxShadow: '0 0 4px rgba(255,255,255,0.8)' }} />
          <span style={{ fontSize: 9, fontWeight: 800, color: '#fff', letterSpacing: '1.5px', textTransform: 'uppercase' as const }}>HQ</span>
        </div>
      )}
      <div style={{ fontSize: 'clamp(15px,1.6vw,20px)', fontWeight: 900, color: depot.highlight ? GREEN : NAVY, letterSpacing: '-0.02em', marginBottom: 2 }}>{depot.city}</div>
      <div style={{ fontSize: 10, fontWeight: 700, color: depot.highlight ? 'rgba(255,255,255,0.28)' : 'rgba(8,33,60,0.32)', letterSpacing: '1.5px', textTransform: 'uppercase' as const, marginBottom: 6 }}>{depot.state}</div>
      <div style={{ fontSize: 12, color: depot.highlight ? 'rgba(255,255,255,0.42)' : 'rgba(8,33,60,0.5)', lineHeight: 1.55 }}>{depot.role}</div>
    </motion.div>
  )
}

export function NetworksPage() {
  return (
    <div style={{ background: CREAM, overflowX: 'hidden' }}>
      <Header />
      <main>

        <InnerHero
          badge="Our Reach"
          line1="NETWORKS &"
          line2="PARTNERS."
          description="A national carrier network, strategically placed depots, and trusted partnerships that connect your freight to every corner of Australia and beyond."
          meta={[
            { label: 'Coverage',      value: 'All States & Territories' },
            { label: 'Partners',      value: 'National & International' },
            { label: 'Depots',        value: 'Every Capital City'       },
            { label: 'International', value: 'Key Global Markets'       },
          ]}
        />

        {/* ── 1. NETWORK PILLARS — Asymmetric split ── */}
        <section style={{ background: '#fff', padding: 'clamp(56px,7vw,88px) 0', overflow: 'hidden' }}>
          <div className="net-inner" style={{ padding: '0 clamp(24px,5vw,80px)' }}>
            <div className="pillars-split" style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 'clamp(32px,6vw,96px)', alignItems: 'start' }}>

              {/* Left: sticky heading */}
              <motion.div
                initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.8, ease }}
                style={{ position: 'sticky', top: 96 }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 22 }}>
                  <div style={{ width: 3, height: 14, background: GREEN, borderRadius: 2 }} />
                  <span style={{ fontSize: 13, fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(8,33,60,0.38)' }}>Our Network</span>
                </div>
                <h2 style={{ fontSize: 'clamp(40px,6vw,80px)', fontWeight: 900, color: NAVY, letterSpacing: '-0.04em', lineHeight: 0.88, margin: '0 0 28px', textTransform: 'uppercase' }}>
                  CONNECTED<br /><span style={{ color: GREEN }}>EVERY<br />WHERE.</span>
                </h2>
                <p style={{ fontSize: 'clamp(14px,1.15vw,16px)', color: 'rgba(8,33,60,0.5)', lineHeight: 1.8, maxWidth: 340, margin: 0 }}>
                  From Darwin to Hobart, Sydney to Perth - our infrastructure spans the nation, backed by global reach when your freight crosses borders.
                </p>
                <div style={{ marginTop: 40, fontSize: 'clamp(60px,9vw,120px)', fontWeight: 900, color: 'rgba(8,33,60,0.05)', lineHeight: 1, userSelect: 'none', letterSpacing: '-0.06em' }}>→</div>
              </motion.div>

              {/* Right: numbered pillar cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {NETWORK_PILLARS.map((p, i) => (
                  <motion.div key={p.title}
                    initial={{ opacity: 0, x: 28 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.13, ease }}
                    className={`np-card${i === 1 ? ' np-navy' : ''}`}
                    style={{
                      display: 'grid', gridTemplateColumns: '52px 1fr', gap: 20,
                      padding: 'clamp(20px,2.5vw,32px)',
                      borderRadius: 16,
                      background: i === 1 ? NAVY : CREAM,
                      border: `1px solid ${i === 1 ? 'transparent' : 'rgba(8,33,60,0.06)'}`,
                      alignItems: 'start',
                    }}
                  >
                    <span style={{ fontSize: 13, fontWeight: 900, color: i === 1 ? 'rgba(255,255,255,0.18)' : 'rgba(8,33,60,0.18)', letterSpacing: '1px', paddingTop: 4 }}>{p.num}</span>
                    <div>
                      <div style={{ fontSize: 'clamp(18px,1.6vw,24px)', fontWeight: 900, color: i === 1 ? '#fff' : NAVY, marginBottom: 10, textTransform: 'uppercase', letterSpacing: '-0.01em' }}>{p.title}</div>
                      <div style={{ fontSize: 'clamp(14px,1.1vw,16px)', color: i === 1 ? 'rgba(255,255,255,0.46)' : 'rgba(8,33,60,0.5)', lineHeight: 1.78 }}>{p.body}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── 2. CARRIER PARTNERS ── */}
        <section style={{ background: '#fff', padding: 'clamp(72px,9vw,120px) clamp(24px,5vw,80px)' }}>
          <div className="net-inner">

            {/* Header */}
            <div className="partners-header" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(24px,5vw,64px)', alignItems: 'end', marginBottom: 'clamp(52px,6vw,80px)' }}>
              <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 16 }}>
                  <div style={{ width: 3, height: 14, background: GREEN, borderRadius: 2 }} />
                  <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase' as const, color: 'rgba(8,33,60,0.38)' }}>Carrier Network</span>
                </div>
                <h2 style={{ fontSize: 'clamp(44px,5.5vw,80px)', fontWeight: 900, color: NAVY, letterSpacing: '-0.04em', lineHeight: 0.9, margin: 0, textTransform: 'uppercase' as const }}>
                  TRUSTED<br /><span style={{ color: GREEN }}>PARTNERS.</span>
                </h2>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.65, delay: 0.12, ease }}
                style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: 20 }}>
                <p style={{ fontSize: 'clamp(14px,1.1vw,16px)', color: 'rgba(8,33,60,0.5)', lineHeight: 1.82, margin: 0 }}>
                  A handpicked alliance of industry leaders - spanning electric fleets, commercial vehicles, global logistics, and digital freight technology.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {['Fleet','Electric','Logistics','Last Mile','Freight Tech','Digital'].map(tag => (
                    <span key={tag} style={{
                      padding: '5px 14px', borderRadius: 100,
                      background: 'rgba(8,33,60,0.04)',
                      border: '1px solid rgba(8,33,60,0.08)',
                      fontSize: 11, fontWeight: 700,
                      color: 'rgba(8,33,60,0.5)',
                      letterSpacing: '0.5px',
                    }}>{tag}</span>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* 2 rows × 3 columns */}
            <div className="carrier-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              {PARTNERS.map((p, i) => <PartnerCard key={p.name} p={p} i={i} />)}
            </div>
          </div>
        </section>

        {/* ── 3. NATIONAL DEPOTS — Geographic grid ── */}
        <section style={{ background: CREAM, padding: 'clamp(72px,10vw,120px) clamp(24px,5vw,80px)' }}>
          <div className="net-inner">
            <div className="depots-split" style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 'clamp(32px,5vw,80px)', alignItems: 'start' }}>

              {/* Left */}
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.75, ease }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 16 }}>
                  <div style={{ width: 3, height: 14, background: GREEN, borderRadius: 2 }} />
                  <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(8,33,60,0.38)' }}>Depot Network</span>
                </div>
                <h2 style={{ fontSize: 'clamp(44px,5.5vw,80px)', fontWeight: 900, color: NAVY, letterSpacing: '-0.04em', lineHeight: 0.9, margin: '0 0 24px', textTransform: 'uppercase' }}>
                  DEPOTS<br /><span style={{ color: GREEN }}>NATION<br />WIDE.</span>
                </h2>
                <p style={{ fontSize: 'clamp(14px,1.15vw,16px)', color: 'rgba(8,33,60,0.5)', lineHeight: 1.8, margin: '0 0 36px' }}>
                  Strategic presence across every Australian capital city and territory - ensuring no destination is ever out of reach.
                </p>

                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 14,
                  padding: '16px 22px', borderRadius: 14, background: NAVY,
                  border: `1px solid rgba(60,185,140,0.2)`,
                }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: GREEN, boxShadow: `0 0 10px ${GREEN}` }} />
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 900, color: '#fff', letterSpacing: '-0.01em', marginBottom: 2 }}>Melbourne, VIC</div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: GREEN, letterSpacing: '1.5px', textTransform: 'uppercase' }}>Headquarters</div>
                  </div>
                </div>
              </motion.div>

              {/* Right: depots in rough geographic order */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {/* North row: Darwin, Brisbane */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  {DEPOTS.filter(d => ['Darwin','Brisbane'].includes(d.city)).map((d, i) => (
                    <DepotCard key={d.city} depot={d} delay={i * 0.07} />
                  ))}
                </div>
                {/* Mid row: Perth, Sydney, Adelaide */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }} className="depot-mid-row">
                  {DEPOTS.filter(d => ['Perth','Sydney','Adelaide'].includes(d.city)).map((d, i) => (
                    <DepotCard key={d.city} depot={d} delay={(i + 2) * 0.07} />
                  ))}
                </div>
                {/* South row: Melbourne, Canberra, Hobart */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }} className="depot-south-row">
                  {DEPOTS.filter(d => ['Melbourne','Canberra','Hobart'].includes(d.city)).map((d, i) => (
                    <DepotCard key={d.city} depot={d} delay={(i + 5) * 0.07} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 4. REGIONAL COVERAGE — Bento grid ── */}
        <section style={{ background: '#fff', padding: 'clamp(72px,10vw,120px) clamp(24px,5vw,80px)' }}>
          <div className="net-inner">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease }} style={{ marginBottom: 52 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 16 }}>
                <div style={{ width: 3, height: 14, background: GREEN, borderRadius: 2 }} />
                <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(8,33,60,0.38)' }}>Coverage</span>
              </div>
              <h2 style={{ fontSize: 'clamp(44px,5.5vw,80px)', fontWeight: 900, color: NAVY, letterSpacing: '-0.04em', lineHeight: 0.9, margin: 0, textTransform: 'uppercase' }}>
                WHERE WE<br /><span style={{ color: GREEN }}>DELIVER.</span>
              </h2>
            </motion.div>

            {/* Bento: row 1 = Eastern(span2) + Remote(span1), row 2 = WA + SA + QLD */}
            <div className="coverage-bento" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>

              {/* Eastern Seaboard — big feature tile */}
              <motion.div
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.6, ease }}
                className="coverage-feature"
                style={{ gridColumn: 'span 2', padding: 'clamp(28px,3vw,44px)', borderRadius: 22, background: NAVY, position: 'relative', overflow: 'hidden' }}
              >
                <div style={{ position: 'absolute', right: -60, bottom: -60, width: 280, height: 280, borderRadius: '50%', background: `radial-gradient(circle, ${GREEN}12 0%, transparent 65%)`, pointerEvents: 'none' }} />
                <div style={{ fontSize: 11, fontWeight: 800, color: 'rgba(255,255,255,0.28)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 14 }}>Eastern Seaboard</div>
                <div style={{ fontSize: 'clamp(26px,3.2vw,44px)', fontWeight: 900, color: '#fff', letterSpacing: '-0.03em', marginBottom: 24, textTransform: 'uppercase', lineHeight: 1 }}>
                  AUSTRALIA'S<br />MAIN CORRIDOR
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {['Sydney','Melbourne','Brisbane','Gold Coast','Canberra','Newcastle','Wollongong'].map(c => (
                    <span key={c} style={{ padding: '6px 14px', borderRadius: 100, background: 'rgba(255,255,255,0.07)', fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.08)' }}>{c}</span>
                  ))}
                </div>
              </motion.div>

              {/* Regional & Remote */}
              <motion.div
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.09, ease }}
                className="cov-green"
                style={{ padding: 'clamp(24px,2.5vw,38px)', borderRadius: 22, background: GREEN, position: 'relative', overflow: 'hidden' }}
              >
                <div style={{ fontSize: 11, fontWeight: 800, color: 'rgba(8,33,60,0.45)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 14 }}>Regional & Remote</div>
                <div style={{ fontSize: 'clamp(24px,2.8vw,38px)', fontWeight: 900, color: NAVY, letterSpacing: '-0.02em', marginBottom: 20, textTransform: 'uppercase', lineHeight: 1.05 }}>
                  REACHING<br />THE OUTBACK
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {['NT','Tasmania','Far-North QLD','Outback SA','WA Regional'].map(c => (
                    <span key={c} style={{ padding: '4px 10px', borderRadius: 100, background: 'rgba(8,33,60,0.1)', fontSize: 11, fontWeight: 600, color: NAVY }}>{c}</span>
                  ))}
                </div>
              </motion.div>

              {/* Western Australia */}
              <RegionCard
                label="Western Australia" heading={['PERTH', '& BEYOND']}
                cities={['Perth','Fremantle','Mandurah','Bunbury','Geraldton']}
                delay={0.14}
              />
              {/* South Australia */}
              <RegionCard
                label="South Australia" heading={['ADELAIDE', '& SURROUNDS']}
                cities={['Adelaide','Mount Gambier','Whyalla','Port Augusta']}
                delay={0.19}
              />
              {/* Queensland */}
              <RegionCard
                label="Queensland" heading={['BRISBANE', 'TO CAIRNS']}
                cities={['Brisbane','Cairns','Townsville','Mackay','Rockhampton']}
                delay={0.24}
              />
            </div>
          </div>
        </section>

        {/* ── 5. TRUST & RECOGNITION — Credential showcase (light) ── */}
        <section style={{ background: '#fff', padding: 'clamp(72px,10vw,120px) clamp(24px,5vw,80px)', position: 'relative', overflow: 'hidden' }}>
          {/* Ghost watermark rings — purely decorative */}
          <div style={{ position: 'absolute', right: 'clamp(-100px,-10vw,-40px)', top: '50%', transform: 'translateY(-50%)', width: 'clamp(300px,40vw,560px)', height: 'clamp(300px,40vw,560px)', borderRadius: '50%', border: '1px solid rgba(8,33,60,0.04)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', right: 'clamp(-60px,-6vw,0px)', top: '50%', transform: 'translateY(-50%)', width: 'clamp(200px,28vw,400px)', height: 'clamp(200px,28vw,400px)', borderRadius: '50%', border: '1px dashed rgba(8,33,60,0.05)', pointerEvents: 'none' }} />

          <div className="net-inner" style={{ position: 'relative', zIndex: 1 }}>

            {/* Top split: heading left, credential cards right */}
            <div className="recognition-split" style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: 'clamp(32px,6vw,88px)', marginBottom: 'clamp(48px,6vw,72px)', alignItems: 'start' }}>

              {/* LEFT — heading + inline stats */}
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.75, ease }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 22 }}>
                  <div style={{ width: 3, height: 14, background: GREEN, borderRadius: 2 }} />
                  <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(8,33,60,0.38)' }}>Global Recognition</span>
                </div>

                {/* Ghost "TRUST" watermark behind heading */}
                <div style={{ position: 'relative', marginBottom: 24 }}>
                  <div style={{ position: 'absolute', top: '-0.12em', left: '-0.04em', fontSize: 'clamp(80px,12vw,160px)', fontWeight: 900, color: 'rgba(8,33,60,0.035)', letterSpacing: '-0.06em', lineHeight: 1, userSelect: 'none', pointerEvents: 'none', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>TRUST</div>
                  <h2 style={{ fontSize: 'clamp(44px,5.5vw,80px)', fontWeight: 900, color: NAVY, letterSpacing: '-0.04em', lineHeight: 0.88, margin: 0, textTransform: 'uppercase', position: 'relative' }}>
                    BUILT ON<br /><span style={{ color: GREEN }}>TRUST.</span>
                  </h2>
                </div>

                <p style={{ fontSize: 'clamp(14px,1.15vw,16px)', color: 'rgba(8,33,60,0.5)', lineHeight: 1.82, maxWidth: 400, margin: '0 0 40px' }}>
                  From industry experience to global standards, BIVRY is built on a foundation of accountability, ethical growth, and verified recognition that businesses worldwide trust.
                </p>

                {/* Inline stat trio */}
                <div style={{ display: 'flex', borderTop: '1px solid rgba(8,33,60,0.08)', paddingTop: 28 }}>
                  {[
                    { val: '12+', label: 'Years Experience'  },
                    { val: '2025', label: 'Founded'           },
                    { val: '8',   label: 'Capital Depots'     },
                  ].map((s, i) => (
                    <div key={s.label} style={{
                      flex: 1,
                      paddingLeft:  i > 0 ? 'clamp(14px,2vw,24px)' : 0,
                      paddingRight: i < 2 ? 'clamp(14px,2vw,24px)' : 0,
                      borderRight:  i < 2 ? '1px solid rgba(8,33,60,0.08)' : 'none',
                    }}>
                      <div style={{ fontSize: 'clamp(22px,2.8vw,38px)', fontWeight: 900, color: NAVY, letterSpacing: '-0.04em', lineHeight: 1, marginBottom: 6 }}>{s.val}</div>
                      <div style={{ fontSize: 10, fontWeight: 700, color: 'rgba(8,33,60,0.38)', textTransform: 'uppercase', letterSpacing: '1.5px', lineHeight: 1.5 }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* RIGHT — credential badge cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

                {/* UN Global Compact */}
                <motion.div
                  initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.65, delay: 0.12, ease }}
                  className="trust-card"
                  style={{
                    padding: 'clamp(22px,2.5vw,36px)', borderRadius: 22,
                    background: CREAM, border: '1px solid rgba(8,33,60,0.07)',
                    display: 'flex', alignItems: 'center', gap: 'clamp(16px,2.2vw,28px)',
                    position: 'relative', overflow: 'hidden',
                  }}
                >
                  {/* Background ring decoration */}
                  <div style={{ position: 'absolute', right: -28, top: '50%', transform: 'translateY(-50%)', width: 110, height: 110, borderRadius: '50%', border: '1px solid rgba(8,33,60,0.06)', pointerEvents: 'none' }} />
                  <div style={{ position: 'absolute', right: -8, top: '50%', transform: 'translateY(-50%)', width: 70, height: 70, borderRadius: '50%', border: '1px dashed rgba(8,33,60,0.07)', pointerEvents: 'none' }} />

                  {/* Circular stamp seal */}
                  <div style={{ flexShrink: 0 }}>
                    <div style={{
                      width: 'clamp(64px,7vw,84px)', height: 'clamp(64px,7vw,84px)', borderRadius: '50%',
                      border: `2px solid ${NAVY}`,
                      boxShadow: `0 0 0 5px rgba(8,33,60,0.06), 0 0 0 9px rgba(8,33,60,0.025)`,
                      background: '#fff',
                      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <span style={{ fontSize: 'clamp(12px,1.4vw,16px)', fontWeight: 900, color: NAVY, letterSpacing: '-0.02em', lineHeight: 1 }}>UN</span>
                      <div style={{ width: 18, height: 1.5, background: GREEN, margin: '4px 0 3px' }} />
                      <span style={{ fontSize: 7, fontWeight: 800, color: GREEN, letterSpacing: '0.3px', textTransform: 'uppercase', textAlign: 'center', lineHeight: 1.35, padding: '0 6px' }}>GLOBAL<br />COMPACT</span>
                    </div>
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 'clamp(13px,1.2vw,16px)', fontWeight: 900, color: NAVY, letterSpacing: '-0.01em', marginBottom: 7 }}>UN Global Compact</div>
                    <div style={{ fontSize: 13, color: 'rgba(8,33,60,0.48)', lineHeight: 1.65, marginBottom: 13 }}>Participant in the world's largest corporate sustainability initiative - committed to ethical operations and human rights.</div>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 12px', borderRadius: 100, background: `${GREEN}18`, border: `1px solid ${GREEN}30` }}>
                      <div style={{ width: 5, height: 5, borderRadius: '50%', background: GREEN }} />
                      <span style={{ fontSize: 10, fontWeight: 800, color: GREEN, letterSpacing: '1px', textTransform: 'uppercase' }}>Active Since 2025</span>
                    </div>
                  </div>
                </motion.div>

                {/* WEPs Signatory */}
                <motion.div
                  initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.65, delay: 0.24, ease }}
                  className="trust-card trust-card-navy"
                  style={{
                    padding: 'clamp(22px,2.5vw,36px)', borderRadius: 22,
                    background: NAVY, border: `1px solid rgba(60,185,140,0.14)`,
                    display: 'flex', alignItems: 'center', gap: 'clamp(16px,2.2vw,28px)',
                    position: 'relative', overflow: 'hidden',
                  }}
                >
                  <div style={{ position: 'absolute', right: -28, top: '50%', transform: 'translateY(-50%)', width: 110, height: 110, borderRadius: '50%', border: '1px solid rgba(60,185,140,0.08)', pointerEvents: 'none' }} />
                  <div style={{ position: 'absolute', right: -8, top: '50%', transform: 'translateY(-50%)', width: 70, height: 70, borderRadius: '50%', border: '1px dashed rgba(60,185,140,0.1)', pointerEvents: 'none' }} />

                  {/* Circular stamp seal */}
                  <div style={{ flexShrink: 0 }}>
                    <div style={{
                      width: 'clamp(64px,7vw,84px)', height: 'clamp(64px,7vw,84px)', borderRadius: '50%',
                      border: `2px solid ${GREEN}`,
                      boxShadow: `0 0 0 5px rgba(60,185,140,0.1), 0 0 0 9px rgba(60,185,140,0.04)`,
                      background: 'rgba(60,185,140,0.08)',
                      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <span style={{ fontSize: 'clamp(10px,1.2vw,13px)', fontWeight: 900, color: GREEN, letterSpacing: '-0.01em', lineHeight: 1 }}>WEPs</span>
                      <div style={{ width: 18, height: 1.5, background: GREEN, margin: '4px 0 3px' }} />
                      <span style={{ fontSize: 7, fontWeight: 800, color: `${GREEN}BB`, letterSpacing: '0.3px', textTransform: 'uppercase', textAlign: 'center', lineHeight: 1.35, padding: '0 4px' }}>WOMEN'S<br />EMPWRT.</span>
                    </div>
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 'clamp(13px,1.2vw,16px)', fontWeight: 900, color: '#fff', letterSpacing: '-0.01em', marginBottom: 7 }}>Women's Empowerment Principles</div>
                    <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.42)', lineHeight: 1.65, marginBottom: 13 }}>Signatory to UN Women WEPs - championing gender equality, diversity, and inclusion across our operations.</div>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 12px', borderRadius: 100, background: 'rgba(60,185,140,0.12)', border: `1px solid rgba(60,185,140,0.22)` }}>
                      <div style={{ width: 5, height: 5, borderRadius: '50%', background: GREEN }} />
                      <span style={{ fontSize: 10, fontWeight: 800, color: GREEN, letterSpacing: '1px', textTransform: 'uppercase' }}>Signed 2025</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

          </div>
        </section>

        <PageCTA line1="JOIN OUR" line2="NETWORK." buttonLabel="Become a Partner" href="/contact" />
      </main>
      <Footer />

      <style>{`
        .net-inner { max-width: 1760px; margin: 0 auto; }
        @media (min-width: 2560px) { .net-inner { max-width: 2400px; } }

        /* ─── Section 1: Pillar cards — Border flash + lift ─── */
        .np-card {
          transition: transform 0.32s ease, box-shadow 0.32s ease, border-color 0.32s ease, background 0.32s ease;
          cursor: default;
        }
        .np-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 48px rgba(8,33,60,0.11);
          border-color: rgba(60,185,140,0.55) !important;
          background: rgba(60,185,140,0.07) !important;
        }
        .np-navy:hover {
          background: #0d2d50 !important;
          box-shadow: 0 20px 48px rgba(60,185,140,0.18) !important;
          border-color: rgba(60,185,140,0.35) !important;
        }

        /* ─── Section 2: Partner cards ─── */
        .carrier-grid { overflow: visible !important; }

        /* ─── Section 3: Depot cards — Glow ring ─── */
        .depot-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
          cursor: default;
        }
        .depot-card:hover {
          transform: translateY(-5px) scale(1.016);
          box-shadow: 0 0 0 2px rgba(60,185,140,0.45), 0 18px 44px rgba(8,33,60,0.1);
          border-color: rgba(60,185,140,0.45) !important;
        }
        .depot-hq:hover {
          box-shadow: 0 0 0 2.5px #3CB98C, 0 20px 50px rgba(60,185,140,0.28) !important;
        }

        /* ─── Section 4: Coverage bento — Diagonal gradient sweep ─── */
        .coverage-feature {
          transition: transform 0.35s ease, box-shadow 0.35s ease;
          cursor: default;
        }
        .coverage-feature:hover {
          transform: translateY(-5px);
          box-shadow: 0 28px 64px rgba(8,33,60,0.25);
        }
        .cov-green {
          transition: transform 0.32s ease, box-shadow 0.32s ease, filter 0.32s ease;
          cursor: default;
        }
        .cov-green:hover {
          transform: translateY(-6px) scale(1.02);
          box-shadow: 0 22px 52px rgba(60,185,140,0.38);
          filter: brightness(1.06);
        }
        .cov-card {
          transition: transform 0.32s ease, box-shadow 0.32s ease, border-color 0.32s ease;
          cursor: default;
          position: relative;
          overflow: hidden;
        }
        .cov-card::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(60,185,140,0.12) 0%, transparent 52%);
          opacity: 0;
          transition: opacity 0.38s ease;
          border-radius: inherit;
          pointer-events: none;
        }
        .cov-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 18px 44px rgba(8,33,60,0.10);
          border-color: rgba(60,185,140,0.4) !important;
        }
        .cov-card:hover::after { opacity: 1; }

        /* ─── Section 5: Trust cards — Shimmer sweep ─── */
        .trust-card {
          transition: transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease;
          cursor: default;
          position: relative;
          overflow: hidden;
        }
        .trust-card::before {
          content: '';
          position: absolute;
          top: 0; left: -80%;
          width: 55%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(60,185,140,0.09), transparent);
          transition: left 0.65s ease;
          pointer-events: none;
          z-index: 2;
        }
        .trust-card:hover::before { left: 150%; }
        .trust-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 22px 56px rgba(8,33,60,0.13);
          border-color: rgba(60,185,140,0.4) !important;
        }
        .trust-card-navy:hover {
          box-shadow: 0 22px 56px rgba(60,185,140,0.16) !important;
          border-color: rgba(60,185,140,0.45) !important;
        }

        /* Tablet */
        @media (max-width: 1024px) {
          .pillars-split      { grid-template-columns: 1fr !important; }
          .depots-split       { grid-template-columns: 1fr !important; }
          .coverage-bento     { grid-template-columns: repeat(2, 1fr) !important; }
          .coverage-feature   { grid-column: span 2 !important; }
          .recognition-split  { grid-template-columns: 1fr !important; }
          .partners-header    { grid-template-columns: 1fr !important; }
          .carrier-grid       { grid-template-columns: repeat(2, 1fr) !important; }
        }
        /* Mobile */
        @media (max-width: 640px) {
          .coverage-bento   { grid-template-columns: 1fr !important; }
          .coverage-feature { grid-column: span 1 !important; }
          .depot-mid-row    { grid-template-columns: repeat(2, 1fr) !important; }
          .depot-south-row  { grid-template-columns: repeat(2, 1fr) !important; }
          .carrier-grid     { grid-template-columns: 1fr !important; }
          .cn-emblem        { width: 100px !important; }
        }

        /* 2 K */
        @media (min-width: 2560px) {
          .coverage-bento { grid-template-columns: repeat(5, 1fr) !important; }
          .coverage-feature { grid-column: span 2 !important; }
          .trust-grid { grid-template-columns: repeat(5, 1fr) !important; }
          .depots-split { grid-template-columns: 1fr 2fr !important; }
        }
        /* 4 K */
        @media (min-width: 3840px) {
          .coverage-bento { grid-template-columns: repeat(5, 1fr) !important; }
          .trust-grid { grid-template-columns: repeat(5, 1fr) !important; }
        }
      `}</style>
    </div>
  )
}

function RegionCard({ label, heading, cities, delay }: {
  label: string
  heading: [string, string]
  cities: string[]
  delay: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.6, delay, ease }}
      className="cov-card"
      style={{ padding: 'clamp(22px,2.5vw,36px)', borderRadius: 22, background: CREAM, border: '1px solid rgba(8,33,60,0.07)', position: 'relative', overflow: 'hidden' }}
    >
      <div style={{ position: 'absolute', right: -20, top: -20, width: 80, height: 80, borderRadius: '50%', background: `radial-gradient(circle, ${GREEN}10 0%, transparent 70%)`, pointerEvents: 'none' }} />
      <div style={{ fontSize: 11, fontWeight: 800, color: 'rgba(8,33,60,0.36)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 12 }}>{label}</div>
      <div style={{ fontSize: 'clamp(22px,2.4vw,34px)', fontWeight: 900, color: NAVY, letterSpacing: '-0.02em', marginBottom: 18, textTransform: 'uppercase', lineHeight: 1.05 }}>
        {heading[0]}<br />{heading[1]}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {cities.map(c => (
          <span key={c} style={{ padding: '4px 11px', borderRadius: 100, background: 'rgba(8,33,60,0.06)', fontSize: 11, fontWeight: 600, color: 'rgba(8,33,60,0.58)' }}>{c}</span>
        ))}
      </div>
    </motion.div>
  )
}
