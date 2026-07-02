import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, ArrowDown, Mail, Rocket, Users, GraduationCap, Globe2, Scale, Heart } from 'lucide-react'
import { Header } from '../components/Header/Header'
import { FlyFooter } from '../components/FlyFooter'
import { NAVY, GREEN, MUTED, EASE } from '../components/PageKit'

const CAREERS_EMAIL = 'connect@elomagroup.com.au'

type Role = { title: string; co: string; loc: string; type: string; desc: string }

function applyMailto(role?: Role) {
  const subject = role ? `Application - ${role.title} (${role.co})` : 'Career enquiry - Eloma Group'
  const body = role
    ? `Hi Eloma team,\n\nI'd like to apply for the ${role.title} role at ${role.co} (${role.loc} · ${role.type}).\n\nI've attached my CV. A little about me:\n\n`
    : `Hi Eloma team,\n\nI'd love to explore opportunities across the Eloma group. A little about me:\n\n`
  return `mailto:${CAREERS_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

const PERKS = [
  { Icon: Rocket, title: 'Real ownership', text: 'Work on things that ship and matter - across a group that moves fast and trusts its people.' },
  { Icon: Globe2, title: 'Global exposure', text: 'Collaborate across eight markets and five companies, from technology to logistics to travel.' },
  { Icon: GraduationCap, title: 'Grow with us', text: 'Mentorship, learning budgets and clear paths - we invest in people for the long term.' },
  { Icon: Scale, title: 'Fair & flexible', text: 'Balanced ways of working, fair pay and a culture that respects your time and your craft.' },
  { Icon: Users, title: 'One team', text: 'Independent companies, one shared standard - supportive, ambitious and down to earth.' },
  { Icon: Heart, title: 'Purpose-driven', text: 'Build a business ecosystem designed to create lasting, responsible impact.' },
]

const ROLES: Role[] = [
  { title: 'Software Engineer', co: 'EG Digital', loc: 'Melbourne · Hybrid', type: 'Full-time', desc: 'Ship web and product work across the group’s digital practice.' },
  { title: 'Customer Experience Lead', co: 'Call Center', loc: 'Remote · APAC', type: 'Full-time', desc: 'Lead a team delivering standout, always-on customer support.' },
  { title: 'Supply Chain Analyst', co: 'EG Imports', loc: 'Sydney', type: 'Full-time', desc: 'Turn trade and logistics data into smart, fast decisions.' },
  { title: 'IT Infrastructure Engineer', co: 'Eloma Group', loc: 'Melbourne', type: 'Full-time', desc: 'Keep the systems behind every company secure and running.' },
  { title: 'Travel Operations Specialist', co: 'EG Travels', loc: 'Brisbane', type: 'Full-time', desc: 'Craft seamless managed-travel experiences end to end.' },
  { title: 'Brand & Growth Marketer', co: 'EG Digital', loc: 'Remote · Australia', type: 'Contract', desc: 'Grow the brands and pipelines across the Eloma group.' },
]

const HIRING = [
  { n: '01', t: 'Apply by email', s: 'Send your CV and a short note - no long forms, no logins.' },
  { n: '02', t: 'Intro conversation', s: 'A relaxed chat to understand your goals and answer your questions.' },
  { n: '03', t: 'Meet the team', s: 'A focused interview with the people you’d actually work with.' },
  { n: '04', t: 'Offer & welcome', s: 'A fair offer, a clear plan, and a warm welcome to the group.' },
]

const DEPTS = ['All', ...Array.from(new Set(ROLES.map(r => r.co)))]

export function CareersPage() {
  const [dept, setDept] = useState('All')
  const roles = useMemo(() => (dept === 'All' ? ROLES : ROLES.filter(r => r.co === dept)), [dept])

  const rise = (d = 0) => ({
    initial: { opacity: 0, y: 26 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.7, delay: d, ease: EASE },
  })

  return (
    <div style={{ overflowX: 'hidden', background: '#fff' }}>
      <Header />

      {/* ── 1 · Hero ── */}
      <section className="cr-hero">
        <span className="cr-hero-dots" aria-hidden />
        <span className="cr-hero-glow" aria-hidden />
        <div className="cr-wrap cr-hero-in">
          <motion.div className="cr-hero-l" initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, ease: EASE }}>
            <p className="cr-eyebrow"><span className="cr-eyebrow-dot" />Careers at Eloma</p>
            <h1 className="cr-hero-h1">Build your future<br /><span className="g">across the group.</span></h1>
            <p className="cr-hero-lead">Join a multi-industry group where ambitious people build real businesses - technology, customer experience, logistics, travel and security - united by one vision.</p>
            <div className="cr-hero-btns">
              <a href="#roles" className="cr-btn cr-btn-primary">View open roles <ArrowDown size={17} strokeWidth={2.4} /></a>
              <a href={applyMailto()} className="cr-btn cr-btn-ghost">Apply by email <Mail size={16} strokeWidth={2.2} /></a>
            </div>
          </motion.div>

          <motion.div className="cr-hero-r" initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}>
            {[['05', 'Companies hiring'], ['08', 'Global markets'], ['04', 'Industry verticals'], ['∞', 'Room to grow']].map(([n, l]) => (
              <div className="cr-snap" key={l}>
                <span className="cr-snap-n">{n}</span>
                <span className="cr-snap-l">{l}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 2 · Culture bento ── */}
      <section className="cr-culture-sec">
        <div className="cr-wrap cr-culture">
          <motion.div className="cr-manifesto" {...rise()}>
            <span className="cr-mani-glow" aria-hidden />
            <p className="cr-eyebrow lt"><span className="cr-eyebrow-dot" />Life at Eloma</p>
            <h2 className="cr-mani-h">Great people, real ownership, room to grow.</h2>
            <p className="cr-mani-p">We’re building a group of independent companies that share one standard - ambitious, fair, and made to last. Here you’ll do work that ships and matters.</p>
            <div className="cr-mani-stat">
              <span className="cr-mani-stat-n">5</span>
              <span className="cr-mani-stat-x">companies · one team across 8 markets</span>
            </div>
          </motion.div>

          <div className="cr-perks">
            {PERKS.map((p, i) => (
              <motion.div key={p.title} className="cr-perk"
                initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.5, delay: (i % 2) * 0.07, ease: EASE }}>
                <span className="cr-perk-ic"><p.Icon size={20} /></span>
                <h3 className="cr-perk-t">{p.title}</h3>
                <p className="cr-perk-x">{p.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3 · Open roles ── */}
      <section id="roles" className="cr-roles-sec">
        <div className="cr-wrap">
          <div className="cr-roles-head">
            <motion.div {...rise()}>
              <p className="cr-eyebrow"><span className="cr-eyebrow-dot" />Open positions</p>
              <h2 className="cr-h2">Find your <span className="g">role.</span></h2>
            </motion.div>
            <motion.div className="cr-filter" {...rise(0.05)} role="tablist" aria-label="Filter roles by company">
              {DEPTS.map(d => (
                <button key={d} role="tab" aria-selected={dept === d} className={`cr-pill${dept === d ? ' on' : ''}`} onClick={() => setDept(d)}>{d}</button>
              ))}
            </motion.div>
          </div>

          <div className="cr-roles">
            {roles.map((r, i) => (
              <motion.a key={r.title} href={applyMailto(r)} className="cr-role"
                initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.5, delay: (i % 2) * 0.06, ease: EASE }}>
                <span className="cr-role-accent" aria-hidden />
                <div className="cr-role-top">
                  <span className="cr-role-co">{r.co}</span>
                  <span className="cr-role-type">{r.type}</span>
                </div>
                <h3 className="cr-role-title">{r.title}</h3>
                <p className="cr-role-desc">{r.desc}</p>
                <div className="cr-role-foot">
                  <span className="cr-role-loc">{r.loc}</span>
                  <span className="cr-apply">Apply <ArrowUpRight size={16} strokeWidth={2.5} /></span>
                </div>
              </motion.a>
            ))}
          </div>

          <p className="cr-note">
            Don’t see your role? We’re always meeting great people -{' '}
            <a href={applyMailto()} className="cr-note-link">introduce yourself →</a>
          </p>
        </div>
      </section>

      {/* ── 4 · How we hire ── */}
      <section className="cr-hire-sec">
        <div className="cr-wrap">
          <motion.div className="cr-hire-head" {...rise()}>
            <p className="cr-eyebrow"><span className="cr-eyebrow-dot" />How we hire</p>
            <h2 className="cr-h2">Four steps, <span className="g">no maze.</span></h2>
          </motion.div>
          <div className="cr-steps">
            {HIRING.map((h, i) => (
              <motion.div key={h.n} className="cr-step"
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.55, delay: i * 0.08, ease: EASE }}>
                <span className="cr-step-n">{h.n}</span>
                <h3 className="cr-step-t">{h.t}</h3>
                <p className="cr-step-x">{h.s}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5 · CTA (apply by email) ── */}
      <section className="cr-cta">
        <span className="cr-cta-dots" aria-hidden />
        <span className="cr-cta-glow" aria-hidden />
        <motion.div className="cr-wrap cr-cta-in" {...rise()}>
          <h2 className="cr-cta-h">Your next chapter<br /><span className="g">starts with a hello.</span></h2>
          <p className="cr-cta-p">Tell us where you’d make an impact - send your CV and a short note and we’ll be in touch.</p>
          <a href={applyMailto()} className="cr-btn cr-btn-primary lg">Apply by email <Mail size={18} strokeWidth={2.2} /></a>
          <span className="cr-cta-mail">{CAREERS_EMAIL}</span>
        </motion.div>
      </section>

      <FlyFooter />

      <style>{`
        .cr-wrap { max-width:1760px; margin:0 auto; }
        .g { color:${GREEN}; }
        .cr-eyebrow { display:inline-flex; align-items:center; gap:10px; margin:0; font-family:'Inter',sans-serif; font-weight:700; font-size:clamp(10px,0.8vw,12px); letter-spacing:2.5px; text-transform:uppercase; color:${GREEN}; }
        .cr-eyebrow-dot { width:7px; height:7px; border-radius:50%; background:${GREEN}; box-shadow:0 0 0 4px rgba(60,185,140,0.16); flex-shrink:0; }
        .cr-eyebrow.lt .cr-eyebrow-dot { box-shadow:0 0 0 4px rgba(60,185,140,0.2); }
        .cr-h2 { font-family:'Poppins',sans-serif; font-weight:700; font-size:clamp(32px,4.6vw,68px); letter-spacing:-0.035em; line-height:1.02; color:${NAVY}; margin:16px 0 0; }

        .cr-btn { display:inline-flex; align-items:center; gap:10px; text-decoration:none; border-radius:14px; padding:15px 28px; min-height:48px; font-family:'Poppins',sans-serif; font-weight:500; font-size:clamp(14px,1.05vw,16px); cursor:pointer; transition:transform 0.25s ${'cubic-bezier(0.16,1,0.3,1)'}, background 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease; }
        .cr-btn-primary { background:${GREEN}; color:#fff; border:1px solid ${GREEN}; box-shadow:0 16px 34px -14px rgba(60,185,140,0.75); }
        .cr-btn-primary:hover { transform:translateY(-2px); background:#34ab80; }
        .cr-btn-primary.lg { padding:17px 36px; font-size:clamp(15px,1.1vw,18px); }
        .cr-btn-ghost { background:transparent; color:${NAVY}; border:1px solid rgba(26,43,60,0.18); }
        .cr-btn-ghost:hover { transform:translateY(-2px); border-color:${GREEN}; color:${GREEN}; }

        /* 1 · Hero */
        .cr-hero { position:relative; overflow:hidden;
          background: radial-gradient(58% 50% at 90% 2%, rgba(60,185,140,0.12), transparent 60%), linear-gradient(180deg,#ffffff 0%,#f3faf7 100%);
          padding: clamp(120px,14vw,200px) clamp(24px,5vw,80px) clamp(56px,7vw,100px); }
        .cr-hero-dots { position:absolute; inset:0; pointer-events:none; opacity:0.5; background-image:radial-gradient(rgba(19,41,61,0.05) 1px, transparent 1px); background-size:26px 26px; -webkit-mask-image:linear-gradient(180deg,#000,transparent 82%); mask-image:linear-gradient(180deg,#000,transparent 82%); }
        .cr-hero-glow { position:absolute; top:-120px; right:-80px; width:480px; height:480px; border-radius:50%; background:radial-gradient(circle, rgba(60,185,140,0.16), transparent 64%); pointer-events:none; }
        .cr-hero-in { position:relative; z-index:1; display:grid; grid-template-columns:1.5fr 0.5fr; gap:clamp(32px,5vw,80px); align-items:end; }
        .cr-hero-h1 { font-family:'Poppins',sans-serif; font-weight:700; font-size:clamp(44px,7.6vw,120px); line-height:0.98; letter-spacing:-0.04em; color:${NAVY}; margin:clamp(18px,2.2vw,28px) 0 0; }
        .cr-hero-lead { font-family:'Inter',sans-serif; font-size:clamp(15px,1.2vw,18px); line-height:1.8; color:${MUTED}; max-width:60ch; margin:clamp(20px,2.4vw,30px) 0 clamp(26px,3vw,38px); }
        .cr-hero-btns { display:flex; flex-wrap:wrap; gap:12px; }
        .cr-hero-r { display:grid; grid-template-columns:1fr 1fr; gap:1px; background:rgba(26,43,60,0.1); border:1px solid rgba(26,43,60,0.1); border-radius:20px; overflow:hidden; }
        .cr-snap { background:#fff; padding:clamp(18px,1.8vw,26px); display:flex; flex-direction:column; gap:6px; transition:background 0.35s ease; }
        .cr-snap:hover { background:rgba(60,185,140,0.06); }
        .cr-snap-n { font-family:'Poppins',sans-serif; font-weight:700; font-size:clamp(28px,3vw,46px); letter-spacing:-0.04em; color:${NAVY}; line-height:1; }
        .cr-snap-l { font-family:'Inter',sans-serif; font-size:clamp(11px,0.85vw,13px); font-weight:600; letter-spacing:0.4px; color:${MUTED}; }

        /* 2 · Culture bento */
        .cr-culture-sec { background:#fff; padding:clamp(56px,7vw,120px) clamp(24px,5vw,80px); }
        .cr-culture { display:grid; grid-template-columns:1.05fr 1.35fr; gap:clamp(16px,1.8vw,24px); align-items:stretch; }
        .cr-manifesto { position:relative; overflow:hidden; border-radius:26px; padding:clamp(32px,3.6vw,56px); background:linear-gradient(165deg, ${NAVY} 0%, #1b3a52 100%); display:flex; flex-direction:column; }
        .cr-manifesto::before { content:''; position:absolute; inset:0; pointer-events:none; background-image:radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px); background-size:24px 24px; }
        .cr-mani-glow { position:absolute; bottom:-100px; right:-80px; width:340px; height:340px; border-radius:50%; background:radial-gradient(circle, rgba(60,185,140,0.22), transparent 64%); pointer-events:none; }
        .cr-mani-h { position:relative; z-index:1; font-family:'Poppins',sans-serif; font-weight:700; font-size:clamp(28px,3.2vw,48px); letter-spacing:-0.03em; line-height:1.08; color:#fff; margin:18px 0 16px; max-width:18ch; }
        .cr-mani-p { position:relative; z-index:1; font-family:'Inter',sans-serif; font-size:clamp(14px,1.1vw,16px); line-height:1.8; color:rgba(255,255,255,0.6); margin:0; max-width:46ch; }
        .cr-mani-stat { position:relative; z-index:1; margin-top:auto; padding-top:clamp(28px,3.2vw,42px); display:flex; flex-direction:row; align-items:center; gap:16px; }
        .cr-mani-stat-n { flex-shrink:0; font-family:'Poppins',sans-serif; font-weight:700; font-size:clamp(48px,5vw,78px); line-height:0.9; letter-spacing:-0.04em; color:${GREEN}; }
        .cr-mani-stat-x { font-family:'Inter',sans-serif; font-size:clamp(12px,0.95vw,14px); font-weight:600; letter-spacing:0.5px; color:rgba(255,255,255,0.55); }
        .cr-perks { display:grid; grid-template-columns:1fr 1fr; gap:clamp(16px,1.8vw,24px); }
        .cr-perk { background:linear-gradient(158deg,#ffffff,#f6fbf9); border:1px solid rgba(26,43,60,0.1); border-radius:20px; padding:clamp(22px,2.2vw,32px); transition:transform 0.45s ${'cubic-bezier(0.16,1,0.3,1)'}, box-shadow 0.45s ease, border-color 0.45s ease; }
        .cr-perk:hover { transform:translateY(-6px); border-color:rgba(60,185,140,0.5); box-shadow:0 30px 60px -36px rgba(60,185,140,0.45); }
        .cr-perk-ic { display:inline-flex; align-items:center; justify-content:center; width:46px; height:46px; border-radius:13px; background:rgba(60,185,140,0.12); color:${GREEN}; margin-bottom:18px; transition:transform 0.45s ${'cubic-bezier(0.16,1,0.3,1)'}, background 0.4s ease, color 0.4s ease; }
        .cr-perk:hover .cr-perk-ic { transform:translateY(-3px) rotate(-5deg); background:${GREEN}; color:#fff; }
        .cr-perk-t { font-family:'Poppins',sans-serif; font-weight:600; font-size:clamp(17px,1.5vw,21px); color:${NAVY}; letter-spacing:-0.01em; margin:0 0 10px; }
        .cr-perk-x { font-family:'Inter',sans-serif; font-size:clamp(13px,1vw,14.5px); line-height:1.7; color:${MUTED}; margin:0; }

        /* 3 · Roles */
        .cr-roles-sec { background:linear-gradient(180deg,#ffffff,#f3faf7); padding:clamp(56px,7vw,120px) clamp(24px,5vw,80px); }
        .cr-roles-head { display:flex; align-items:flex-end; justify-content:space-between; gap:24px; flex-wrap:wrap; margin-bottom:clamp(28px,3.4vw,46px); }
        .cr-filter { display:flex; flex-wrap:wrap; gap:9px; }
        .cr-pill { font-family:'Inter',sans-serif; font-size:13px; font-weight:600; color:${NAVY}; background:#fff; border:1px solid rgba(26,43,60,0.14); border-radius:99px; padding:11px 18px; min-height:44px; cursor:pointer; transition:transform 0.25s ${'cubic-bezier(0.16,1,0.3,1)'}, background 0.25s ease, border-color 0.25s ease, color 0.25s ease; }
        .cr-pill:hover { transform:translateY(-2px); border-color:${GREEN}; color:${GREEN}; }
        .cr-pill.on { background:${NAVY}; border-color:${NAVY}; color:#fff; }
        .cr-pill.on:hover { color:#fff; }

        .cr-roles { display:grid; grid-template-columns:1fr 1fr; gap:clamp(16px,1.6vw,22px); }
        .cr-role { position:relative; overflow:hidden; display:flex; flex-direction:column; text-decoration:none; background:#fff; border:1px solid rgba(26,43,60,0.1); border-radius:20px; padding:clamp(26px,2.8vw,40px); transition:transform 0.45s ${'cubic-bezier(0.16,1,0.3,1)'}, box-shadow 0.45s ease, border-color 0.45s ease; }
        .cr-role-accent { position:absolute; top:0; left:0; bottom:0; width:3px; background:${GREEN}; transform:scaleY(0); transform-origin:top; transition:transform 0.45s ${'cubic-bezier(0.16,1,0.3,1)'}; }
        .cr-role:hover { transform:translateY(-6px); border-color:rgba(60,185,140,0.5); box-shadow:0 36px 70px -40px rgba(19,41,61,0.32); }
        .cr-role:hover .cr-role-accent { transform:scaleY(1); }
        .cr-role-top { display:flex; align-items:center; justify-content:space-between; gap:12px; margin-bottom:clamp(14px,1.6vw,18px); }
        .cr-role-co { font-family:'Inter',sans-serif; font-size:11px; font-weight:800; letter-spacing:1.5px; text-transform:uppercase; color:${GREEN}; }
        .cr-role-type { font-family:'Inter',sans-serif; font-size:11px; font-weight:700; letter-spacing:0.8px; text-transform:uppercase; color:${NAVY}; background:rgba(26,43,60,0.06); padding:6px 12px; border-radius:99px; }
        .cr-role-title { font-family:'Poppins',sans-serif; font-weight:600; font-size:clamp(20px,1.9vw,28px); line-height:1.18; letter-spacing:-0.02em; color:${NAVY}; margin:0 0 10px; }
        .cr-role-desc { font-family:'Inter',sans-serif; font-size:clamp(13.5px,1vw,15px); line-height:1.7; color:${MUTED}; margin:0 0 clamp(22px,2.4vw,30px); flex:1; }
        .cr-role-foot { display:flex; align-items:center; justify-content:space-between; gap:12px; padding-top:clamp(16px,1.8vw,20px); border-top:1px solid rgba(26,43,60,0.1); }
        .cr-role-loc { font-family:'Inter',sans-serif; font-size:13px; color:${MUTED}; font-weight:500; }
        .cr-apply { display:inline-flex; align-items:center; gap:7px; font-family:'Poppins',sans-serif; font-size:13.5px; font-weight:500; color:${GREEN}; transition:gap 0.3s ease; }
        .cr-role:hover .cr-apply { gap:11px; }
        .cr-note { font-family:'Inter',sans-serif; font-size:14.5px; color:${MUTED}; margin-top:clamp(24px,3vw,36px); }
        .cr-note-link { color:${GREEN}; font-weight:600; text-decoration:none; }
        .cr-note-link:hover { text-decoration:underline; }

        /* 4 · How we hire */
        .cr-hire-sec { background:#fff; padding:clamp(56px,7vw,120px) clamp(24px,5vw,80px); }
        .cr-hire-head { margin-bottom:clamp(32px,4vw,56px); }
        .cr-steps { display:grid; grid-template-columns:repeat(4,1fr); gap:clamp(16px,1.8vw,28px); }
        .cr-step { position:relative; padding-top:clamp(20px,2.2vw,28px); border-top:2px solid ${NAVY}; }
        .cr-step-n { font-family:'Poppins',sans-serif; font-weight:700; font-size:clamp(34px,3.6vw,56px); letter-spacing:-0.04em; color:rgba(60,185,140,0.9); line-height:1; }
        .cr-step-t { font-family:'Poppins',sans-serif; font-weight:600; font-size:clamp(17px,1.5vw,22px); color:${NAVY}; letter-spacing:-0.01em; margin:clamp(14px,1.6vw,20px) 0 8px; }
        .cr-step-x { font-family:'Inter',sans-serif; font-size:clamp(13px,1vw,14.5px); line-height:1.7; color:${MUTED}; margin:0; }

        /* 5 · CTA */
        .cr-cta { position:relative; overflow:hidden; background:linear-gradient(165deg, ${NAVY} 0%, #16334a 100%); padding:clamp(72px,9vw,140px) clamp(24px,5vw,80px); text-align:center; }
        .cr-cta-dots { position:absolute; inset:0; pointer-events:none; background-image:radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px); background-size:28px 28px; }
        .cr-cta-glow { position:absolute; bottom:-160px; right:8%; width:540px; height:540px; border-radius:50%; background:radial-gradient(circle, rgba(60,185,140,0.16), transparent 62%); pointer-events:none; }
        .cr-cta-in { position:relative; z-index:1; display:flex; flex-direction:column; align-items:center; }
        .cr-cta-h { font-family:'Poppins',sans-serif; font-weight:700; font-size:clamp(34px,5.4vw,84px); letter-spacing:-0.035em; line-height:1.05; color:#fff; margin:0; }
        .cr-cta-p { font-family:'Inter',sans-serif; font-size:clamp(15px,1.2vw,18px); line-height:1.8; color:rgba(255,255,255,0.55); max-width:520px; margin:clamp(20px,2.4vw,28px) 0 clamp(28px,3.2vw,38px); }
        .cr-cta-mail { font-family:'Inter',sans-serif; font-size:13px; font-weight:600; letter-spacing:1px; color:rgba(255,255,255,0.45); margin-top:18px; }

        /* ── responsive ── */
        @media (max-width:980px){
          .cr-hero-in { grid-template-columns:1fr; align-items:start; gap:clamp(28px,5vw,40px); }
          .cr-hero-r { grid-template-columns:1fr 1fr; max-width:480px; }
          .cr-culture { grid-template-columns:1fr; }
          .cr-steps { grid-template-columns:1fr 1fr; }
        }
        @media (max-width:680px){
          .cr-perks { grid-template-columns:1fr; }
          .cr-roles { grid-template-columns:1fr; }
        }
        @media (max-width:480px){
          .cr-steps { grid-template-columns:1fr; }
          .cr-hero-r { grid-template-columns:1fr 1fr; }
        }
        @media (min-width:1920px){
          .cr-wrap { max-width:1900px; }
          .cr-hero-h1 { font-size:132px; }
          .cr-h2, .cr-cta-h { font-size:80px; }
          .cr-mani-h { font-size:54px; }
          .cr-hero-lead, .cr-cta-p { font-size:19px; }
        }
        @media (min-width:2560px){
          .cr-wrap { max-width:2400px; }
          .cr-hero { padding-top:clamp(160px,8vw,220px); }
          .cr-hero-h1 { font-size:184px; }
          .cr-h2 { font-size:104px; }
          .cr-cta-h { font-size:108px; }
          .cr-mani-h { font-size:68px; }
          .cr-role-title { font-size:34px; }
          .cr-hero-lead, .cr-cta-p, .cr-mani-p { font-size:22px; }
          .cr-step-t { font-size:28px; }
        }
      `}</style>
    </div>
  )
}
