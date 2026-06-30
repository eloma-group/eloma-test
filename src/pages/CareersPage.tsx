import { motion } from 'framer-motion'
import { ArrowUpRight, Rocket, Users, GraduationCap, Globe2, Scale, Heart } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Header } from '../components/Header/Header'
import { FlyFooter } from '../components/FlyFooter'
import { PageHero, PageCTA, Eyebrow, NAVY, GREEN, MUTED, EASE } from '../components/PageKit'

const PERKS = [
  { Icon: Rocket,        title: 'Real ownership', text: 'Work on things that ship and matter — across a group that moves fast and trusts its people.' },
  { Icon: Globe2,        title: 'Global exposure', text: 'Collaborate across eight markets and five companies, from technology to logistics to travel.' },
  { Icon: GraduationCap, title: 'Grow with us', text: 'Mentorship, learning budgets and clear paths — we invest in people for the long term.' },
  { Icon: Scale,         title: 'Fair & flexible', text: 'Balanced ways of working, fair pay and a culture that respects your time and your craft.' },
  { Icon: Users,         title: 'One team', text: 'Independent companies, one shared standard — supportive, ambitious and down to earth.' },
  { Icon: Heart,         title: 'Purpose-driven', text: 'Build a business ecosystem designed to create lasting, responsible impact.' },
]

const ROLES = [
  { title: 'Software Engineer', co: 'EG Digital', loc: 'Melbourne · Hybrid', type: 'Full-time' },
  { title: 'Customer Experience Lead', co: 'Call Center', loc: 'Remote · APAC', type: 'Full-time' },
  { title: 'Supply Chain Analyst', co: 'EG Imports', loc: 'Sydney', type: 'Full-time' },
  { title: 'IT Infrastructure Engineer', co: 'EG Foundations', loc: 'Melbourne', type: 'Full-time' },
  { title: 'Travel Operations Specialist', co: 'EG Travels', loc: 'Brisbane', type: 'Full-time' },
  { title: 'Brand & Growth Marketer', co: 'EG Digital', loc: 'Remote · Australia', type: 'Contract' },
]

export function CareersPage() {
  const navigate = useNavigate()
  return (
    <div style={{ overflowX: 'hidden', background: '#fff' }}>
      <Header />

      <PageHero
        badge="Careers at Eloma"
        line1="Build your"
        line2="future here."
        description="Join a multi-industry group where ambitious people build real businesses across technology, customer experience, logistics, travel and security — united by one vision."
        stats={[
          { n: '5', label: 'Companies hiring' },
          { n: '8', label: 'Global markets' },
          { n: '4', label: 'Industry verticals' },
          { n: '∞', label: 'Room to grow' },
        ]}
      />

      {/* ── Why join (perks) ── */}
      <section style={{ background: 'linear-gradient(180deg,#ffffff,#f3faf7)', padding: 'clamp(64px,8vw,120px) clamp(24px,5vw,80px)' }}>
        <div style={{ maxWidth: 1760, margin: '0 auto' }}>
          <div style={{ marginBottom: 'clamp(36px,5vw,56px)' }}>
            <Eyebrow label="Why Eloma" />
            <h2 style={{ fontFamily: "'Poppins',sans-serif", fontSize: 'clamp(28px,4vw,52px)', fontWeight: 700, color: NAVY, letterSpacing: '-0.03em', lineHeight: 1.05, margin: '16px 0 0' }}>
              More than a job — a <span style={{ color: GREEN }}>place to grow.</span>
            </h2>
          </div>
          <div className="cr-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
            {PERKS.map((p, i) => (
              <motion.div key={p.title} className="cr-card"
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: EASE }}
              >
                <span className="cr-ic"><p.Icon size={22} /></span>
                <h3 className="cr-title">{p.title}</h3>
                <p className="cr-text">{p.text}</p>
                <div className="cr-bar" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Open roles ── */}
      <section style={{ background: '#fff', padding: 'clamp(64px,8vw,120px) clamp(24px,5vw,80px)' }}>
        <div style={{ maxWidth: 1760, margin: '0 auto' }}>
          <div style={{ marginBottom: 'clamp(28px,4vw,44px)' }}>
            <Eyebrow label="Open positions" />
            <h2 style={{ fontFamily: "'Poppins',sans-serif", fontSize: 'clamp(28px,4vw,52px)', fontWeight: 700, color: NAVY, letterSpacing: '-0.03em', lineHeight: 1.05, margin: '16px 0 0' }}>
              Find your <span style={{ color: GREEN }}>role.</span>
            </h2>
          </div>
          <div style={{ borderTop: '1px solid rgba(26,43,60,0.1)' }}>
            {ROLES.map((r, i) => (
              <motion.button key={r.title} className="cr-role" onClick={() => navigate('/contact')}
                initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.05, ease: EASE }}
              >
                <div className="cr-role-l">
                  <span className="cr-role-title">{r.title}</span>
                  <span className="cr-role-co">{r.co}</span>
                </div>
                <div className="cr-role-r">
                  <span className="cr-role-meta">{r.loc}</span>
                  <span className="cr-role-tag">{r.type}</span>
                  <span className="cr-role-arrow"><ArrowUpRight size={18} strokeWidth={2.4} /></span>
                </div>
              </motion.button>
            ))}
          </div>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: MUTED, marginTop: 28 }}>
            Don't see your role? We're always meeting great people — <a href="/contact" style={{ color: GREEN, fontWeight: 600, textDecoration: 'none' }}>introduce yourself →</a>
          </p>
        </div>
      </section>

      <PageCTA line1="Ready to" line2="join us?" sub="Tell us where you'd make an impact and we'll be in touch." buttonLabel="Apply Now" />
      <FlyFooter />

      <style>{`
        .cr-card { position: relative; overflow: hidden; background: linear-gradient(158deg,#ffffff,#f6fbf9); border: 1px solid rgba(26,43,60,0.08); border-radius: 22px; padding: clamp(28px,2.8vw,40px); transition: transform 0.45s ${'cubic-bezier(0.16,1,0.3,1)'}, box-shadow 0.45s ease, border-color 0.45s ease; }
        .cr-card:hover { transform: translateY(-8px); border-color: ${GREEN}; box-shadow: 0 34px 64px -34px rgba(60,185,140,0.5); }
        .cr-ic { display:inline-flex; align-items:center; justify-content:center; width:52px; height:52px; border-radius:15px; background:rgba(60,185,140,0.12); color:${GREEN}; margin-bottom:22px; transition: transform 0.45s ${'cubic-bezier(0.16,1,0.3,1)'}, background 0.4s ease, color 0.4s ease; }
        .cr-card:hover .cr-ic { transform: translateY(-3px) scale(1.08) rotate(-5deg); background:${GREEN}; color:#fff; }
        .cr-title { font-family:'Poppins',sans-serif; font-weight:600; font-size:clamp(18px,1.6vw,23px); color:${NAVY}; margin:0 0 12px; letter-spacing:-0.01em; }
        .cr-text { font-family:'Inter',sans-serif; font-size:14.5px; color:${MUTED}; line-height:1.7; margin:0; }
        .cr-bar { margin-top:22px; height:3px; width:30px; border-radius:3px; background:${GREEN}; transition:width 0.5s ${'cubic-bezier(0.16,1,0.3,1)'}; }
        .cr-card:hover .cr-bar { width:60px; }

        .cr-role { width:100%; text-align:left; cursor:pointer; background:transparent; border:none; border-bottom:1px solid rgba(26,43,60,0.1);
          display:flex; align-items:center; justify-content:space-between; gap:20px; padding:clamp(20px,2.4vw,30px) clamp(10px,1.4vw,20px);
          transition: background 0.35s ease, padding-left 0.4s ${'cubic-bezier(0.16,1,0.3,1)'}; }
        .cr-role:hover { background: rgba(60,185,140,0.05); padding-left: clamp(18px,2.2vw,30px); }
        .cr-role-l { display:flex; flex-direction:column; gap:5px; }
        .cr-role-title { font-family:'Poppins',sans-serif; font-weight:600; font-size:clamp(17px,1.6vw,24px); color:${NAVY}; letter-spacing:-0.01em; }
        .cr-role-co { font-family:'Inter',sans-serif; font-size:13px; color:${GREEN}; font-weight:700; letter-spacing:0.5px; }
        .cr-role-r { display:flex; align-items:center; gap:clamp(12px,1.6vw,24px); flex-shrink:0; }
        .cr-role-meta { font-family:'Inter',sans-serif; font-size:13.5px; color:${MUTED}; }
        .cr-role-tag { font-family:'Inter',sans-serif; font-size:11px; font-weight:700; letter-spacing:1px; text-transform:uppercase; color:${NAVY}; background:rgba(26,43,60,0.06); padding:6px 12px; border-radius:99px; }
        .cr-role-arrow { display:inline-flex; color:${NAVY}; opacity:0.4; transition: transform 0.4s ${'cubic-bezier(0.16,1,0.3,1)'}, color 0.3s ease, opacity 0.3s ease; }
        .cr-role:hover .cr-role-arrow { color:${GREEN}; opacity:1; transform: translate(3px,-3px); }

        @media (max-width: 860px) { .cr-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 600px) { .cr-grid { grid-template-columns: 1fr !important; } .cr-role-meta { display:none; } }
        @media (min-width: 1920px) { .cr-grid { max-width: 1900px; } }
      `}</style>
    </div>
  )
}
