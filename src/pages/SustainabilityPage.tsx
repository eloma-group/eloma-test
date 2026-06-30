import { motion } from 'framer-motion'
import { Leaf, Recycle, Sun, HeartHandshake, ShieldCheck, Sprout } from 'lucide-react'
import { Header } from '../components/Header/Header'
import { FlyFooter } from '../components/FlyFooter'
import { PageHero, PageCTA, Eyebrow, NAVY, GREEN, MUTED, EASE } from '../components/PageKit'

const FOCUS = [
  { Icon: Leaf,           title: 'Lower footprint', text: 'Reducing energy, waste and emissions across every business vertical — measured, reported and improved year on year.' },
  { Icon: Recycle,        title: 'Circular operations', text: 'Designing supply, logistics and procurement to reuse, recover and minimise what we send to landfill.' },
  { Icon: Sun,            title: 'Cleaner energy', text: 'Shifting our infrastructure and offices toward renewable power and efficient, modern systems.' },
  { Icon: HeartHandshake, title: 'People & community', text: 'Investing in our people and the communities we operate in — fair work, opportunity and local impact.' },
  { Icon: ShieldCheck,    title: 'Strong governance', text: 'Ethical, transparent practices and accountability built into how every company in the group runs.' },
  { Icon: Sprout,         title: 'Built to last', text: 'We build for the decade — ventures, partnerships and value designed to outlast short-term cycles.' },
]

const COMMITMENTS = [
  { k: 'Net-positive', t: 'intent', d: 'Every initiative measured against real environmental and social outcomes.' },
  { k: '100%', t: 'accountable', d: 'Governance and reporting embedded across all five companies.' },
  { k: 'Long-term', t: 'horizon', d: 'Decisions made for resilience, not just the next quarter.' },
]

export function SustainabilityPage() {
  return (
    <div style={{ overflowX: 'hidden', background: '#fff' }}>
      <Header />

      <PageHero
        badge="Sustainability"
        line1="Responsible"
        line2="by design."
        description="At Eloma Group, sustainability isn't a department — it's how we operate and grow. Across every vertical we work to minimise impact, act ethically and build a more resilient future."
      />

      {/* ── Commitment statement ── */}
      <section style={{ background: NAVY, padding: 'clamp(64px,8vw,120px) clamp(24px,5vw,80px)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}><Eyebrow label="Our commitment" light /></div>
          <motion.p
            initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.85, ease: EASE }}
            style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: 'clamp(24px,3.4vw,46px)', color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.3, margin: '20px 0 0' }}
          >
            We strive to build organisations that are resilient, adaptable and prepared for tomorrow — creating value not only for our stakeholders but for the <span style={{ color: GREEN }}>communities we serve.</span>
          </motion.p>
        </div>
      </section>

      {/* ── Focus areas ── */}
      <section style={{ background: 'linear-gradient(180deg,#ffffff,#f3faf7)', padding: 'clamp(64px,8vw,120px) clamp(24px,5vw,80px)' }}>
        <div style={{ maxWidth: 1760, margin: '0 auto' }}>
          <div style={{ marginBottom: 'clamp(36px,5vw,56px)' }}>
            <Eyebrow label="Focus areas" />
            <h2 style={{ fontFamily: "'Poppins',sans-serif", fontSize: 'clamp(28px,4vw,52px)', fontWeight: 700, color: NAVY, letterSpacing: '-0.03em', lineHeight: 1.05, margin: '16px 0 0' }}>
              Where we <span style={{ color: GREEN }}>focus.</span>
            </h2>
          </div>
          <div className="su-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
            {FOCUS.map((f, i) => (
              <motion.div key={f.title} className="su-card"
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: EASE }}
              >
                <span className="su-ic"><f.Icon size={22} /></span>
                <h3 className="su-title">{f.title}</h3>
                <p className="su-text">{f.text}</p>
                <div className="su-bar" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Commitments band ── */}
      <section style={{ background: '#fff', padding: 'clamp(56px,7vw,100px) clamp(24px,5vw,80px)' }}>
        <div className="su-cmt" style={{ maxWidth: 1760, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
          {COMMITMENTS.map((c, i) => (
            <motion.div key={c.t} className="su-cmt-card"
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
            >
              <div className="su-cmt-k" style={{ color: i % 2 === 0 ? GREEN : NAVY }}>{c.k}</div>
              <div className="su-cmt-t">{c.t}</div>
              <p className="su-cmt-d">{c.d}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <PageCTA line1="Grow with" line2="purpose." sub="Build with a group that measures success by lasting impact." buttonLabel="Talk to Us" />
      <FlyFooter />

      <style>{`
        .su-card { position: relative; overflow: hidden; background: linear-gradient(158deg,#ffffff,#f6fbf9); border: 1px solid rgba(26,43,60,0.08); border-radius: 22px; padding: clamp(28px,2.8vw,40px); transition: transform 0.45s ${'cubic-bezier(0.16,1,0.3,1)'}, box-shadow 0.45s ease, border-color 0.45s ease; }
        .su-card:hover { transform: translateY(-8px); border-color: ${GREEN}; box-shadow: 0 34px 64px -34px rgba(60,185,140,0.5); }
        .su-ic { display:inline-flex; align-items:center; justify-content:center; width:52px; height:52px; border-radius:15px; background:rgba(60,185,140,0.12); color:${GREEN}; margin-bottom:22px; transition: transform 0.45s ${'cubic-bezier(0.16,1,0.3,1)'}, background 0.4s ease, color 0.4s ease; }
        .su-card:hover .su-ic { transform: translateY(-3px) scale(1.08) rotate(-5deg); background:${GREEN}; color:#fff; }
        .su-title { font-family:'Poppins',sans-serif; font-weight:600; font-size:clamp(18px,1.6vw,23px); color:${NAVY}; margin:0 0 12px; letter-spacing:-0.01em; }
        .su-text { font-family:'Inter',sans-serif; font-size:14.5px; color:${MUTED}; line-height:1.7; margin:0; }
        .su-bar { margin-top:22px; height:3px; width:30px; border-radius:3px; background:${GREEN}; transition:width 0.5s ${'cubic-bezier(0.16,1,0.3,1)'}; }
        .su-card:hover .su-bar { width:60px; }

        .su-cmt-card { text-align:center; padding: clamp(28px,3vw,44px) clamp(20px,2vw,32px); border:1px solid rgba(26,43,60,0.08); border-radius:22px; background:linear-gradient(160deg,#ffffff,#f6fbf9); transition: transform 0.4s ${'cubic-bezier(0.16,1,0.3,1)'}, box-shadow 0.4s ease; }
        .su-cmt-card:hover { transform: translateY(-6px); box-shadow: 0 30px 60px -36px rgba(19,41,61,0.4); }
        .su-cmt-k { font-family:'Poppins',sans-serif; font-weight:700; font-size:clamp(34px,4vw,60px); letter-spacing:-0.04em; line-height:0.95; }
        .su-cmt-t { font-family:'Poppins',sans-serif; font-weight:600; font-size:15px; color:${NAVY}; text-transform:uppercase; letter-spacing:1.5px; margin:10px 0 8px; }
        .su-cmt-d { font-family:'Inter',sans-serif; font-size:13.5px; color:${MUTED}; line-height:1.6; margin:0; }

        @media (max-width: 860px) { .su-grid { grid-template-columns: 1fr 1fr !important; } .su-cmt { grid-template-columns: 1fr !important; } }
        @media (max-width: 560px) { .su-grid { grid-template-columns: 1fr !important; } }
        @media (min-width: 1920px) { .su-grid, .su-cmt { max-width: 1900px; } }
      `}</style>
    </div>
  )
}
