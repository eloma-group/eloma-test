import { motion } from 'framer-motion'
import { Handshake, Network, TrendingUp, ShieldCheck } from 'lucide-react'
import { Header } from '../components/Header/Header'
import { FlyFooter } from '../components/FlyFooter'
import { PageHero, PageCTA, Eyebrow, NAVY, GREEN, MUTED, EASE } from '../components/PageKit'

const LOGOS = [
  '/images/amazon.png', '/images/tesla.png', '/images/coles.png',
  '/images/woolworths.png', '/images/isuzu.png', '/images/direct_couriers.png',
  '/images/partnerlogo1.png', '/images/direct_couriers.png',
]

const WHY = [
  { Icon: Network,     title: 'One connected ecosystem', text: 'Plug into five companies across eight markets — technology, logistics, customer experience, travel and security.' },
  { Icon: TrendingUp,  title: 'Scale with confidence', text: 'Shared infrastructure and proven operations let partners grow without rebuilding the basics.' },
  { Icon: ShieldCheck, title: 'Trust & governance', text: 'Ethical, transparent and accountable — the way long-term relationships should be built.' },
  { Icon: Handshake,   title: 'Partnership-first', text: 'We grow when you grow. Collaboration over lock-in, results over promises.' },
]

const STEPS = [
  { n: '01', t: 'Connect', d: 'Tell us about your business and where you want to grow.' },
  { n: '02', t: 'Align', d: 'We map the right companies and capabilities to your goals.' },
  { n: '03', t: 'Build', d: 'A tailored partnership across the group, with clear outcomes.' },
  { n: '04', t: 'Scale', d: 'Grow together across markets, backed by shared strength.' },
]

export function PartnersPage() {
  return (
    <div style={{ overflowX: 'hidden', background: '#fff' }}>
      <Header />

      <PageHero
        badge="Partner With Us"
        line1="Grow with"
        line2="the group."
        description="Eloma Group partners with businesses that want to move faster — bringing the strength of a connected, multi-industry ecosystem to every collaboration."
        stats={[
          { n: '5', label: 'Companies to partner' },
          { n: '8', label: 'Global markets' },
          { n: '4', label: 'Industry verticals' },
          { n: '1', label: 'Shared vision' },
        ]}
      />

      {/* ── Trusted by (logos) ── */}
      <section style={{ background: '#fff', padding: 'clamp(48px,6vw,84px) clamp(24px,5vw,80px)' }}>
        <div style={{ maxWidth: 1760, margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: MUTED, margin: '0 0 36px' }}>
            Trusted across industries
          </p>
          <div className="pt-logos">
            {LOGOS.map((l, i) => (
              <motion.div key={l} className="pt-logo"
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: (i % 8) * 0.05, ease: EASE }}>
                <img src={l} alt="" loading="lazy" decoding="async" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why partner ── */}
      <section style={{ background: 'linear-gradient(180deg,#ffffff,#f3faf7)', padding: 'clamp(64px,8vw,120px) clamp(24px,5vw,80px)' }}>
        <div style={{ maxWidth: 1760, margin: '0 auto' }}>
          <div style={{ marginBottom: 'clamp(36px,5vw,56px)' }}>
            <Eyebrow label="Why partner with Eloma" />
            <h2 style={{ fontFamily: "'Poppins',sans-serif", fontSize: 'clamp(28px,4vw,52px)', fontWeight: 700, color: NAVY, letterSpacing: '-0.03em', lineHeight: 1.05, margin: '16px 0 0' }}>
              Stronger <span style={{ color: GREEN }}>together.</span>
            </h2>
          </div>
          <div className="pt-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 16 }}>
            {WHY.map((w, i) => (
              <motion.div key={w.title} className="pt-card"
                initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: (i % 2) * 0.1, ease: EASE }}>
                <span className="pt-ic"><w.Icon size={24} /></span>
                <div>
                  <h3 className="pt-title">{w.title}</h3>
                  <p className="pt-text">{w.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section style={{ background: '#fff', padding: 'clamp(64px,8vw,120px) clamp(24px,5vw,80px)' }}>
        <div style={{ maxWidth: 1760, margin: '0 auto' }}>
          <div style={{ marginBottom: 'clamp(36px,5vw,56px)' }}>
            <Eyebrow label="How it works" />
            <h2 style={{ fontFamily: "'Poppins',sans-serif", fontSize: 'clamp(28px,4vw,52px)', fontWeight: 700, color: NAVY, letterSpacing: '-0.03em', lineHeight: 1.05, margin: '16px 0 0' }}>
              From hello to <span style={{ color: GREEN }}>scale.</span>
            </h2>
          </div>
          <div className="pt-steps" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }}>
            {STEPS.map((s, i) => (
              <motion.div key={s.n} className="pt-step"
                initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: i * 0.08, ease: EASE }}>
                <div className="pt-step-n">{s.n}</div>
                <div className="pt-step-line" />
                <h3 className="pt-step-t">{s.t}</h3>
                <p className="pt-step-d">{s.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <PageCTA line1="Let's partner" line2="and grow." sub="Tell us about your business — we'll find the right fit across the group." buttonLabel="Become a Partner" />
      <FlyFooter />

      <style>{`
        .pt-logos { display:grid; grid-template-columns: repeat(4,1fr); gap: 16px; }
        .pt-logo { display:flex; align-items:center; justify-content:center; padding: clamp(20px,2.4vw,34px); border:1px solid rgba(26,43,60,0.08); border-radius:18px; background:#fff; transition: transform 0.4s ${'cubic-bezier(0.16,1,0.3,1)'}, box-shadow 0.4s ease, border-color 0.4s ease; }
        .pt-logo:hover { transform: translateY(-5px); border-color:${GREEN}; box-shadow:0 24px 48px -28px rgba(19,41,61,0.35); }
        .pt-logo img { max-width:100%; max-height:46px; width:auto; object-fit:contain; filter: grayscale(1) opacity(0.55); transition: filter 0.4s ease; }
        .pt-logo:hover img { filter: grayscale(0) opacity(1); }

        .pt-card { display:flex; gap:18px; align-items:flex-start; position:relative; overflow:hidden; background:linear-gradient(158deg,#ffffff,#f6fbf9); border:1px solid rgba(26,43,60,0.08); border-radius:22px; padding:clamp(28px,2.8vw,40px); transition: transform 0.45s ${'cubic-bezier(0.16,1,0.3,1)'}, box-shadow 0.45s ease, border-color 0.45s ease; }
        .pt-card:hover { transform:translateY(-6px); border-color:${GREEN}; box-shadow:0 34px 64px -36px rgba(60,185,140,0.5); }
        .pt-ic { display:inline-flex; align-items:center; justify-content:center; width:56px; height:56px; border-radius:16px; background:rgba(60,185,140,0.12); color:${GREEN}; flex-shrink:0; transition: transform 0.45s ${'cubic-bezier(0.16,1,0.3,1)'}, background 0.4s ease, color 0.4s ease; }
        .pt-card:hover .pt-ic { transform: translateY(-3px) rotate(-5deg); background:${GREEN}; color:#fff; }
        .pt-title { font-family:'Poppins',sans-serif; font-weight:600; font-size:clamp(18px,1.6vw,23px); color:${NAVY}; margin:2px 0 10px; letter-spacing:-0.01em; }
        .pt-text { font-family:'Inter',sans-serif; font-size:14.5px; color:${MUTED}; line-height:1.7; margin:0; }

        .pt-step { position:relative; padding:clamp(26px,2.6vw,38px) clamp(20px,2vw,28px); border:1px solid rgba(26,43,60,0.08); border-radius:22px; background:linear-gradient(158deg,#ffffff,#f6fbf9); transition: transform 0.45s ${'cubic-bezier(0.16,1,0.3,1)'}, box-shadow 0.45s ease; }
        .pt-step:hover { transform:translateY(-6px); box-shadow:0 30px 60px -36px rgba(19,41,61,0.4); }
        .pt-step-n { font-family:'Poppins',sans-serif; font-weight:700; font-size:clamp(30px,3vw,46px); color:${GREEN}; letter-spacing:-0.04em; line-height:0.9; }
        .pt-step-line { height:3px; width:28px; border-radius:3px; background:rgba(26,43,60,0.14); margin:16px 0; transition:width 0.5s ${'cubic-bezier(0.16,1,0.3,1)'}, background 0.4s ease; }
        .pt-step:hover .pt-step-line { width:54px; background:${GREEN}; }
        .pt-step-t { font-family:'Poppins',sans-serif; font-weight:600; font-size:clamp(17px,1.5vw,21px); color:${NAVY}; margin:0 0 8px; }
        .pt-step-d { font-family:'Inter',sans-serif; font-size:13.5px; color:${MUTED}; line-height:1.65; margin:0; }

        @media (max-width: 900px) { .pt-logos { grid-template-columns: repeat(3,1fr); } .pt-grid { grid-template-columns: 1fr !important; } .pt-steps { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 560px) { .pt-logos { grid-template-columns: repeat(2,1fr); } .pt-steps { grid-template-columns: 1fr !important; } }
        @media (min-width: 1920px) { .pt-grid, .pt-steps, .pt-logos { max-width: 1900px; } }
      `}</style>
    </div>
  )
}
