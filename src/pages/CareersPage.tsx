import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  MapPin, Clock, Briefcase,
  TrendingUp, Shield, Heart, Zap, Users, Award,
  Coffee, Truck, ChevronRight,
} from 'lucide-react'
import { Header } from '../components/Header/Header'
import { Footer } from '../components/Footer'
import { InnerHero, NAVY, GREEN, CREAM, ease } from '../components/InnerHero'

/* ── Job listings ─────────────────────────────────────── */
type Job = {
  title: string
  dept: string
  type: 'Full-Time' | 'Part-Time' | 'Contract'
  location: string
  tags: string[]
}

const JOBS: Job[] = [
  { title: 'Head of Freight Operations',        dept: 'Operations',           type: 'Full-Time', location: 'Melbourne, VIC',    tags: ['Leadership', 'Strategy', 'Fleet Management']     },
  { title: 'Senior B-Double Truck Driver',      dept: 'Transport',            type: 'Full-Time', location: 'Multiple Depots',   tags: ['HC Licence', 'Interstate', 'Night Runs']         },
  { title: 'Fleet & Logistics Coordinator',     dept: 'Fleet',                type: 'Full-Time', location: 'Dandenong, VIC',    tags: ['Routing', 'TMS', 'Scheduling']                   },
  { title: 'Warehouse Supervisor',              dept: 'Warehousing',          type: 'Full-Time', location: 'Laverton North, VIC', tags: ['HACCP', 'Forklift Licence', 'Pick & Pack']     },
  { title: 'Customer Service & Dispatch',       dept: 'Customer Experience',  type: 'Full-Time', location: 'Melbourne, VIC',    tags: ['CRM', 'Booking Systems', 'Communication']        },
  { title: 'Business Development Manager',      dept: 'Sales',                type: 'Full-Time', location: 'Melbourne, VIC',    tags: ['B2B', 'Freight Industry', 'Hunter Role']         },
  { title: 'WHS & Compliance Officer',          dept: 'Safety',               type: 'Full-Time', location: 'Melbourne, VIC',    tags: ['Chain of Responsibility', 'Auditing', 'CoR']     },
  { title: 'Route Planner / Load Optimiser',    dept: 'Operations',           type: 'Full-Time', location: 'Dandenong, VIC',    tags: ['Load Planning', 'GPS', 'Data Analysis']          },
  { title: 'Refrigerated Transport Driver',     dept: 'Transport',            type: 'Full-Time', location: 'Multiple Depots',   tags: ['Cold Chain', 'MC/HC Licence', 'Food Grade']      },
  { title: 'Freight Account Manager',           dept: 'Sales',                type: 'Full-Time', location: 'Melbourne, VIC',    tags: ['Account Growth', 'Retention', 'Reporting']       },
  { title: 'Depot Operations Coordinator',      dept: 'Operations',           type: 'Contract',  location: 'Truganina, VIC',    tags: ['Inbound/Outbound', 'Stocktake', 'Manifesting']   },
  { title: 'Customs & Documentation Specialist',dept: 'International',        type: 'Full-Time', location: 'Melbourne, VIC',    tags: ['Import/Export', 'Customs Clearance', 'SAP']      },
]

const DEPTS = ['All', 'Operations', 'Transport', 'Fleet', 'Warehousing', 'Customer Experience', 'Sales', 'Safety', 'International']

const DEPT_COLOR: Record<string, string> = {
  Operations: NAVY, Transport: '#0284C7', Fleet: '#F5A623',
  Warehousing: '#9B59B6', 'Customer Experience': GREEN,
  Sales: '#E67E22', Safety: '#E74C3C', International: '#2C7A7B',
}

/* ── Benefits ─────────────────────────────────────────── */
const BENEFITS = [
  { Icon: TrendingUp, title: 'Career Growth',        desc: 'Clear pathways from driver to supervisor to manager - we promote from within first.',   span: 'wide' },
  { Icon: Shield,     title: 'Safety First Culture',  desc: 'Industry-leading WHS practices. Every team member goes home safe, every shift.',          span: 'normal' },
  { Icon: Heart,      title: 'Health & Wellbeing',    desc: 'EAP access, mental health support, and a workplace that genuinely looks after its people.', span: 'normal' },
  { Icon: Zap,        title: 'Competitive Pay',        desc: 'Above-award rates, penalty loadings, and annual reviews tied to performance.',             span: 'normal' },
  { Icon: Users,      title: 'Diverse & Inclusive',   desc: 'WEPs signatory. We actively support gender equity and cultural diversity across all roles.', span: 'normal' },
  { Icon: Award,      title: 'Recognised Excellence', desc: 'Annual awards, peer recognition programs, and merit bonuses for standout performers.',      span: 'wide' },
  { Icon: Coffee,     title: 'Great Team Culture',    desc: 'BBQs, team days, and a tight-knit crew that looks after each other on and off the road.',  span: 'normal' },
  { Icon: Truck,      title: 'Modern Fleet',          desc: 'Late-model vehicles, full GPS, and maintained equipment - you never work with old gear.',   span: 'normal' },
]

/* ── Benefit Card ────────────────────────────────────── */
function BenefitCard({ b, i }: { b: typeof BENEFITS[0]; i: number }) {
  const [hov, setHov] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.55, delay: i * 0.06, ease }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className={b.span === 'wide' ? 'benefit-wide' : ''}
      style={{
        background: hov
          ? `linear-gradient(140deg, #fff 55%, ${GREEN}0C 100%)`
          : '#fff',
        borderRadius: 20,
        padding: 'clamp(24px,2.5vw,32px)',
        border: `1.5px solid ${hov ? GREEN + '55' : 'rgba(8,33,60,0.07)'}`,
        gridColumn: b.span === 'wide' ? 'span 2' : 'span 1',
        display: 'flex', flexDirection: 'column', gap: 0,
        cursor: 'default', position: 'relative', overflow: 'hidden',
        transform: hov ? 'translateY(-8px) scale(1.018)' : 'translateY(0) scale(1)',
        boxShadow: hov
          ? `0 28px 56px rgba(60,185,140,0.20), 0 8px 22px rgba(0,0,0,0.07)`
          : '0 2px 8px rgba(8,33,60,0.04)',
        transition: 'all 0.38s cubic-bezier(0.34,1.56,0.64,1)',
      }}
    >
      {/* Left edge accent bar */}
      <div style={{
        position: 'absolute', left: 0, top: 0,
        width: hov ? 4 : 0,
        height: '100%',
        background: `linear-gradient(to bottom, ${GREEN}, ${GREEN}30)`,
        borderRadius: '20px 0 0 20px',
        transition: 'width 0.32s ease',
      }} />

      {/* Icon */}
      <div style={{
        width: 50, height: 50, borderRadius: 14, marginBottom: 18,
        background: hov ? `${GREEN}28` : `${GREEN}14`,
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        transform: hov ? 'scale(1.2) rotate(8deg)' : 'scale(1) rotate(0deg)',
        boxShadow: hov ? `0 8px 22px ${GREEN}45` : 'none',
        transition: 'all 0.38s cubic-bezier(0.34,1.56,0.64,1)',
      }}>
        <b.Icon size={22} strokeWidth={1.8} color={GREEN} />
      </div>

      {/* Title */}
      <div style={{
        fontSize: 'clamp(15px,1.3vw,18px)', fontWeight: 800,
        color: hov ? GREEN : NAVY,
        letterSpacing: '-0.02em', marginBottom: 8,
        transition: 'color 0.25s ease',
      }}>{b.title}</div>

      {/* Growing divider */}
      <div style={{
        height: 2, borderRadius: 2, marginBottom: 12,
        width: hov ? 40 : 0,
        background: `linear-gradient(90deg, ${GREEN}, ${GREEN}30)`,
        transition: 'width 0.38s cubic-bezier(0.34,1.56,0.64,1)',
      }} />

      <p style={{ fontSize: 'clamp(12px,0.9vw,13.5px)', color: 'rgba(8,33,60,0.45)', lineHeight: 1.7, margin: 0 }}>{b.desc}</p>
    </motion.div>
  )
}

/* ── Job Card ─────────────────────────────────────────── */
function JobCard({ job, i }: { job: Job; i: number }) {
  const [hov, setHov] = useState(false)
  const color = DEPT_COLOR[job.dept] || NAVY
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.55, delay: i * 0.05, ease }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov
          ? `linear-gradient(160deg, #fff 60%, ${color}0A 100%)`
          : '#fff',
        borderRadius: 20,
        border: `1.5px solid ${hov ? color + '55' : 'rgba(8,33,60,0.07)'}`,
        overflow: 'hidden', display: 'flex', flexDirection: 'column',
        transform: hov ? 'translateY(-8px) scale(1.018)' : 'translateY(0) scale(1)',
        boxShadow: hov
          ? `0 28px 56px ${color}30, 0 8px 22px rgba(0,0,0,0.08)`
          : '0 2px 8px rgba(8,33,60,0.04)',
        transition: 'all 0.38s cubic-bezier(0.34,1.56,0.64,1)',
        cursor: 'pointer',
      }}
    >
      {/* Top accent bar — grows + glows */}
      <div style={{
        height: hov ? 5 : 3, background: color, flexShrink: 0,
        boxShadow: hov ? `0 3px 14px ${color}80` : 'none',
        transition: 'height 0.3s ease, box-shadow 0.3s ease',
      }} />

      <div style={{ padding: 'clamp(20px,2vw,28px)', flex: 1, display: 'flex', flexDirection: 'column' }}>

        {/* Dept pill — fills solid on hover */}
        <div style={{ marginBottom: 14 }}>
          <span style={{
            fontSize: 9, fontWeight: 800, letterSpacing: '1.5px', textTransform: 'uppercase',
            color: hov ? '#fff' : color,
            background: hov ? color : `${color}12`,
            borderRadius: 100, padding: '4px 12px',
            border: `1px solid ${hov ? color : color + '28'}`,
            boxShadow: hov ? `0 4px 12px ${color}45` : 'none',
            transition: 'all 0.28s ease',
            display: 'inline-block',
          }}>{job.dept}</span>
        </div>

        {/* Title */}
        <h3 style={{
          fontSize: 'clamp(15px,1.3vw,18px)', fontWeight: 800,
          color: hov ? color : NAVY,
          letterSpacing: '-0.025em', lineHeight: 1.25, margin: '0 0 10px', flex: 1,
          transition: 'color 0.25s ease',
        }}>{job.title}</h3>

        {/* Growing divider */}
        <div style={{
          height: 2, borderRadius: 2, marginBottom: 14,
          width: hov ? 40 : 20,
          background: color, opacity: hov ? 0.7 : 0.25,
          transition: 'width 0.35s ease, opacity 0.3s ease',
        }} />

        {/* Meta */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 16 }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: 'rgba(8,33,60,0.45)', fontWeight: 600 }}>
            <MapPin size={11} strokeWidth={2} style={{ color: GREEN }} />{job.location}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: 'rgba(8,33,60,0.45)', fontWeight: 600 }}>
            <Clock size={11} strokeWidth={2} style={{ color: GREEN }} />{job.type}
          </span>
        </div>

        {/* Tags — tint to dept color on hover */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 22 }}>
          {job.tags.map(tag => (
            <span key={tag} style={{
              fontSize: 10, fontWeight: 600,
              color: hov ? color : 'rgba(8,33,60,0.5)',
              background: hov ? `${color}10` : 'rgba(8,33,60,0.05)',
              borderRadius: 6, padding: '3px 9px',
              border: `1px solid ${hov ? color + '30' : 'rgba(8,33,60,0.08)'}`,
              transition: 'all 0.22s ease',
            }}>{tag}</span>
          ))}
        </div>

        {/* Apply — becomes a pill button on hover */}
        <a href="mailto:connect@bivry.com.au" style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          fontSize: 12, fontWeight: 800, color: '#fff',
          textDecoration: 'none', letterSpacing: '0.3px',
          background: hov ? color : `${color}22`,
          padding: '9px 18px', borderRadius: 100,
          boxShadow: hov ? `0 6px 18px ${color}45` : 'none',
          alignSelf: 'flex-start',
          transition: 'all 0.28s ease',
        }}>
          <span style={{ color: hov ? '#fff' : color, transition: 'color 0.28s ease' }}>Apply Now</span>
          <ChevronRight size={13} strokeWidth={2.5} color={hov ? '#fff' : color} style={{ transition: 'color 0.28s ease' }} />
        </a>
      </div>
    </motion.div>
  )
}

/* ── Page ─────────────────────────────────────────────── */
export function CareersPage() {
  const [activeDept, setActiveDept] = useState('All')

  const filtered = activeDept === 'All' ? JOBS : JOBS.filter(j => j.dept === activeDept)

  return (
    <div style={{ background: CREAM, overflowX: 'hidden' }}>
      <Header />
      <main>

        {/* ── HERO ── */}
        <InnerHero
          badge="Careers"
          line1="JOIN"
          line2="OUR TEAM."
          greenLine={2}
          description="Drive Australia's freight forward. We're hiring passionate people across operations, transport, warehousing, and everything in between."
          meta={[
            { label: 'Open Roles',  value: `${JOBS.length} Positions`     },
            { label: 'Locations',   value: 'Melbourne · Multi-Depot'       },
            { label: 'Employment',  value: 'Full-Time, Contract'           },
            { label: 'Apply via',   value: 'connect@bivry.com.au'         },
          ]}
        />

        {/* ── OPEN ROLES ── */}
        <section style={{ background: '#fff', padding: 'clamp(64px,8vw,100px) clamp(24px,5vw,80px)' }}>
          <div style={{ maxWidth: 1760, margin: '0 auto' }} className="roles-inner">

            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.65, ease }}
              style={{ marginBottom: 'clamp(40px,5vw,56px)' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 14 }}>
                <div style={{ width: 3, height: 14, background: GREEN, borderRadius: 2 }} />
                <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(8,33,60,0.38)' }}>Open Positions</span>
              </div>
              <h2 style={{ fontSize: 'clamp(36px,5vw,72px)', fontWeight: 900, color: NAVY, letterSpacing: '-0.04em', lineHeight: 0.95, margin: '0 0 20px', textTransform: 'uppercase' }}>
                FIND YOUR <span style={{ color: GREEN }}>ROLE.</span>
              </h2>
              <p style={{ fontSize: 'clamp(14px,1.1vw,16px)', color: 'rgba(8,33,60,0.5)', lineHeight: 1.75, maxWidth: 520, margin: 0 }}>
                {JOBS.length} positions across operations, transport, warehousing, sales, and safety. All roles are based in Victoria with some interstate travel.
              </p>
            </motion.div>

            {/* Dept filter */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 40 }}>
              {DEPTS.map(d => {
                const isActive = d === activeDept
                const col = DEPT_COLOR[d] || NAVY
                return (
                  <button key={d} onClick={() => setActiveDept(d)}
                    onMouseEnter={e => {
                      if (!isActive) {
                        const el = e.currentTarget as HTMLElement
                        const c = d === 'All' ? NAVY : col
                        el.style.borderColor = c
                        el.style.color = c
                        el.style.background = `${c}10`
                        el.style.transform = 'translateY(-2px) scale(1.04)'
                        el.style.boxShadow = `0 6px 18px ${c}30`
                      }
                    }}
                    onMouseLeave={e => {
                      if (!isActive) {
                        const el = e.currentTarget as HTMLElement
                        el.style.borderColor = 'rgba(8,33,60,0.12)'
                        el.style.color = 'rgba(8,33,60,0.55)'
                        el.style.background = 'transparent'
                        el.style.transform = 'translateY(0) scale(1)'
                        el.style.boxShadow = 'none'
                      }
                    }}
                    style={{
                      padding: '10px 18px', borderRadius: 100, fontSize: 12, fontWeight: 700,
                      color: isActive ? '#fff' : 'rgba(8,33,60,0.55)',
                      background: isActive ? (d === 'All' ? NAVY : col) : 'transparent',
                      border: `1.5px solid ${isActive ? (d === 'All' ? NAVY : col) : 'rgba(8,33,60,0.12)'}`,
                      boxShadow: isActive ? `0 6px 18px ${d === 'All' ? NAVY : col}35` : 'none',
                      cursor: 'pointer', transition: 'all 0.22s cubic-bezier(0.34,1.56,0.64,1)',
                      minHeight: 40, letterSpacing: '0.3px',
                    }}>
                    {d}{d === 'All' ? '' : ` (${JOBS.filter(j => j.dept === d).length})`}
                  </button>
                )
              })}
            </div>

            {/* Jobs grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }} className="jobs-grid">
              {filtered.map((job, i) => <JobCard key={job.title} job={job} i={i} />)}
            </div>

            {/* No results */}
            {filtered.length === 0 && (
              <div style={{ textAlign: 'center', padding: '64px 0', color: 'rgba(8,33,60,0.35)', fontSize: 15 }}>
                No openings in this department right now - check back soon.
              </div>
            )}
          </div>
        </section>

        {/* ── LIFE AT BIVRY ── */}
        <section style={{ background: CREAM, padding: 'clamp(64px,8vw,100px) clamp(24px,5vw,80px)' }}>
          <div style={{ maxWidth: 1760, margin: '0 auto' }} className="life-inner">

            {/* Header row */}
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 32, marginBottom: 'clamp(40px,5vw,60px)', flexWrap: 'wrap' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 14 }}>
                  <div style={{ width: 3, height: 14, background: GREEN, borderRadius: 2 }} />
                  <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(8,33,60,0.38)' }}>Life at BIVRY</span>
                </div>
                <h2 style={{ fontSize: 'clamp(36px,5vw,72px)', fontWeight: 900, color: NAVY, letterSpacing: '-0.04em', lineHeight: 0.95, margin: 0, textTransform: 'uppercase' }}>
                  WHY WORK <span style={{ color: GREEN }}>WITH US.</span>
                </h2>
              </div>
              <p style={{ fontSize: 'clamp(14px,1.1vw,16px)', color: 'rgba(8,33,60,0.5)', lineHeight: 1.75, maxWidth: 420, margin: 0 }}>
                We're not just a freight company. We're a team of people who take pride in moving Australia's goods safely, on time, every time.
              </p>
            </div>

            {/* Benefits bento */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }} className="benefits-grid">
              {BENEFITS.map((b, i) => <BenefitCard key={b.title} b={b} i={i} />)}
            </div>
          </div>
        </section>

        {/* ── OPEN APPLICATION BANNER ── */}
        <section style={{ background: NAVY, padding: 'clamp(64px,8vw,100px) clamp(24px,5vw,80px)', position: 'relative', overflow: 'hidden' }}>
          {/* dot grid */}
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.025) 1px, transparent 1px)', backgroundSize: '28px 28px', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', top: -120, right: -120, width: 500, height: 500, borderRadius: '50%', background: `radial-gradient(circle, ${GREEN}0D 0%, transparent 65%)`, pointerEvents: 'none' }} />

          <div style={{ maxWidth: 1760, margin: '0 auto', position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 40, flexWrap: 'wrap' }} className="banner-inner">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 16 }}>
                <div style={{ width: 3, height: 14, background: GREEN, borderRadius: 2 }} />
                <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>Open Application</span>
              </div>
              <h2 style={{ fontSize: 'clamp(28px,4vw,56px)', fontWeight: 900, color: '#fff', letterSpacing: '-0.04em', lineHeight: 1.05, margin: '0 0 14px', textTransform: 'uppercase' }}>
                DON'T SEE<br />
                <span style={{ color: GREEN }}>YOUR ROLE?</span>
              </h2>
              <p style={{ fontSize: 'clamp(14px,1.1vw,16px)', color: 'rgba(255,255,255,0.45)', lineHeight: 1.75, maxWidth: 480, margin: 0 }}>
                We're always growing. Send us your CV and a short note about what you bring to the table - we review every application personally.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, flexShrink: 0 }}>
              <a href="mailto:connect@bivry.com.au" style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                background: GREEN, color: '#fff',
                borderRadius: 100, padding: 'clamp(14px,1.5vw,18px) clamp(28px,3vw,40px)',
                fontSize: 'clamp(13px,1vw,15px)', fontWeight: 700, textDecoration: 'none',
                transition: 'all 0.22s ease', minHeight: 52, whiteSpace: 'nowrap',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#2da87d'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = GREEN; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)' }}
              >
                <Briefcase size={15} strokeWidth={2} /> Send Your CV
              </a>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center' }}>
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)' }}>or call</span>
                <a href="tel:1800054555" style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.55)', textDecoration: 'none', transition: 'color 0.15s ease' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = GREEN }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.55)' }}
                >
                  1800 054 555
                </a>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />

      <style>{`
        @media (max-width: 1024px) {
          .jobs-grid { grid-template-columns: repeat(2,1fr) !important; }
          .benefits-grid { grid-template-columns: repeat(2,1fr) !important; }
          .benefit-wide { grid-column: span 2 !important; }
        }
        @media (max-width: 640px) {
          .jobs-grid { grid-template-columns: 1fr !important; }
          .benefits-grid { grid-template-columns: 1fr !important; }
          .benefit-wide { grid-column: span 1 !important; }
        }
        @media (min-width: 1920px) {
          .roles-inner, .life-inner, .banner-inner { max-width: 1900px !important; }
          .jobs-grid { grid-template-columns: repeat(4,1fr) !important; }
        }
        @media (min-width: 2560px) {
          .roles-inner, .life-inner, .banner-inner { max-width: 2400px !important; }
        }
      `}</style>
    </div>
  )
}
