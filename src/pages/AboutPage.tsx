import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Header } from '../components/Header/Header'
import { FlyFooter } from '../components/FlyFooter'
import { PageCTA, NAVY, GREEN, MUTED, EASE } from '../components/PageKit'

const META = [
  { k: 'Established', v: 'Australia' },
  { k: 'Model', v: 'Multi-industry' },
  { k: 'Horizon', v: 'Long-term' },
]

const CHAPTERS = [
  { no: '01', title: 'Vision-led', text: 'Every company we hold is built on a clear, long-term horizon — measured in decades, not quarters. Direction comes first; everything else follows from it.' },
  { no: '02', title: 'Shared strength', text: 'Common infrastructure, governance and people let each business move faster on a stronger foundation. Independent in craft, united in capability.' },
  { no: '03', title: 'Global reach', text: 'From Australia to Asia, Europe, the Middle East and North America — an interconnected ecosystem operating as one across eight markets.' },
  { no: '04', title: 'Responsible growth', text: 'We grow with intent — sustainable, ethical and built to create lasting value for the stakeholders and communities we serve.' },
]

const FIGS = [
  { n: '5', l: 'Companies' },
  { n: '8', l: 'Countries' },
  { n: '4', l: 'Verticals' },
  { n: '1', l: 'Vision' },
]

const VALUES = [
  { no: '01', t: 'Strategy',   d: 'A clear direction set across every vertical, and held to.' },
  { no: '02', t: 'Technology', d: 'Modern systems that scale with the group as it grows.' },
  { no: '03', t: 'Execution',  d: 'Real-world delivery — on the ground, on time, at scale.' },
  { no: '04', t: 'Trust',      d: 'Relationships that compound in value over the long term.' },
]

export function AboutPage() {
  const reduce = useReducedMotion()
  const [active, setActive] = useState(0)
  const rise = (d = 0) => ({
    initial: reduce ? false : { opacity: 0, y: 26 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.8, delay: d, ease: EASE },
  })

  return (
    <div style={{ overflowX: 'clip', background: '#fff' }}>
      <Header />

      {/* ── 1 · Editorial hero (asymmetric, left-aligned) ── */}
      <section className="abx-hero">
        <span className="abx-hero-mark" aria-hidden>EG</span>
        <div className="abx-hero-in">
          <div className="abx-hero-main">
            <motion.p className="abx-eyebrow"
              initial={reduce ? false : { opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }}>
              <span className="abx-eyebrow-dot" />About Eloma Group
            </motion.p>
            <motion.h1 className="abx-hero-h1"
              initial={reduce ? false : { opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: EASE, delay: 0.08 }}>
              A house of <span className="g">companies,</span><br />one shared horizon.
            </motion.h1>
          </div>
          <motion.aside className="abx-hero-side"
            initial={reduce ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}>
            <p className="abx-hero-lead">
              Eloma Group is an Australian multi-industry holding company — building, supporting and scaling modern businesses across technology, logistics, customer experience, travel and security.
            </p>
            <ul className="abx-meta">
              {META.map((m) => (
                <li className="abx-meta-row" key={m.k}>
                  <span className="abx-meta-k">{m.k}</span>
                  <span className="abx-meta-v">{m.v}</span>
                </li>
              ))}
            </ul>
          </motion.aside>
        </div>
      </section>

      {/* ── 2 · Manifesto (containerless big type) ── */}
      <section className="abx-mani">
        <motion.p className="abx-mani-label" {...rise()}>Our belief</motion.p>
        <motion.p className="abx-mani-text" {...rise(0.08)}>
          Businesses grow stronger when they <span className="g">share roots.</span> Common values, shared infrastructure and a long view — so each company makes the others <span className="g">stronger.</span>
        </motion.p>
      </section>

      {/* ── 3 · Sticky split chapters ── */}
      <section className="abx-ch">
        <div className="abx-ch-in">
          <aside className="abx-ch-side">
            <p className="abx-kicker"><span className="abx-kicker-no">/ 01</span> The approach</p>
            <h2 className="abx-ch-title">How the group <span className="g">works.</span></h2>
            <div className="abx-ch-index">
              {CHAPTERS.map((c, i) => (
                <span className={`abx-ch-ix${active === i ? ' on' : ''}`} key={c.no}><i>{c.no}</i>{c.title}</span>
              ))}
            </div>
          </aside>
          <div className="abx-ch-main">
            {CHAPTERS.map((c, i) => (
              <motion.article key={c.no} className="abx-block"
                onViewportEnter={() => setActive(i)}
                viewport={{ amount: 0.6 }}
                animate={reduce ? undefined : { opacity: active === i ? 1 : 0.22, y: active === i ? 0 : 10 }}
                transition={{ duration: 0.5, ease: EASE }}>
                <span className="abx-block-no">{c.no}</span>
                <h3 className="abx-block-h">{c.title}</h3>
                <p className="abx-block-p">{c.text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4 · Editorial figures (no cards) ── */}
      <section className="abx-figs-sec">
        <div className="abx-figs-in">
          <motion.p className="abx-kicker" {...rise()}><span className="abx-kicker-no">/ 02</span> At a glance</motion.p>
          <div className="abx-figs">
            {FIGS.map((f, i) => (
              <motion.div key={f.l} className="abx-fig"
                initial={reduce ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}>
                <span className="abx-fig-n">{f.n}</span>
                <span className="abx-fig-l">{f.l}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5 · Values as editorial rows ── */}
      <section className="abx-val-sec">
        <div className="abx-val-in">
          <motion.div className="abx-val-head" {...rise()}>
            <p className="abx-kicker"><span className="abx-kicker-no">/ 03</span> What drives us</p>
            <h2 className="abx-val-h2">Four constants, <span className="g">held to.</span></h2>
          </motion.div>
          <div className="abx-vals">
            {VALUES.map((v, i) => (
              <motion.div key={v.t} className="abx-val"
                initial={reduce ? false : { opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.55, delay: i * 0.06, ease: EASE }}>
                <span className="abx-val-no">{v.no}</span>
                <span className="abx-val-t">{v.t}</span>
                <span className="abx-val-d">{v.d}</span>
                <span className="abx-val-line" aria-hidden />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6 · Full-bleed quote (navy) ── */}
      <section className="abx-quote-sec">
        <span className="abx-quote-glow" aria-hidden />
        <motion.blockquote className="abx-quote"
          initial={reduce ? false : { opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.9, ease: EASE }}>
          <span className="abx-quote-mark" aria-hidden>“</span>
          We don’t chase the next quarter. We build businesses <span className="g">designed to last decades.</span>
          <footer className="abx-quote-by">Eloma Group — founding principle</footer>
        </motion.blockquote>
      </section>

      <PageCTA line1="Let's build" line2="something lasting." sub="Partner with a group engineered for the long term." buttonLabel="Get in Touch" />
      <FlyFooter />

      <style>{`
        .g { color:${GREEN}; }
        .abx-eyebrow { display:inline-flex; align-items:center; gap:10px; margin:0; font-family:'Inter',sans-serif; font-weight:700; font-size:clamp(10px,0.8vw,12px); letter-spacing:2.5px; text-transform:uppercase; color:${GREEN}; }
        .abx-eyebrow-dot { width:7px; height:7px; border-radius:50%; background:${GREEN}; box-shadow:0 0 0 4px rgba(60,185,140,0.16); }
        .abx-kicker { display:flex; align-items:center; gap:12px; margin:0; font-family:'Inter',sans-serif; font-weight:700; font-size:clamp(10px,0.8vw,12px); letter-spacing:2.5px; text-transform:uppercase; color:${MUTED}; }
        .abx-kicker-no { color:${GREEN}; }

        /* ── 1 · Hero ── */
        .abx-hero { position:relative; overflow:hidden;
          background: radial-gradient(70% 60% at 90% 8%, rgba(60,185,140,0.12), transparent 58%), linear-gradient(180deg,#ffffff,#f3faf7);
          padding: clamp(104px,12vw,170px) clamp(24px,5vw,80px) clamp(56px,7vw,100px); }
        .abx-hero-mark { position:absolute; right:-2vw; top:38%; font-family:'Poppins',sans-serif; font-weight:800; font-size:clamp(220px,32vw,520px); line-height:0.8; letter-spacing:-0.05em; color:rgba(19,41,61,0.035); pointer-events:none; user-select:none; }
        .abx-hero-in { position:relative; z-index:1; max-width:1760px; margin:0 auto; display:grid; grid-template-columns:1.35fr 0.65fr; gap:clamp(36px,5vw,90px); align-items:end; }
        .abx-hero-h1 { font-family:'Poppins',sans-serif; font-weight:700; font-size:clamp(44px,8vw,118px); line-height:0.98; letter-spacing:-0.04em; color:${NAVY}; margin:clamp(20px,2.4vw,34px) 0 0; }
        .abx-hero-side { border-top:2px solid ${NAVY}; padding-top:clamp(18px,2vw,26px); }
        .abx-hero-lead { font-family:'Inter',sans-serif; font-size:clamp(14px,1.1vw,17px); color:${MUTED}; line-height:1.85; margin:0 0 clamp(22px,2.6vw,30px); }
        .abx-meta { list-style:none; margin:0; padding:0; }
        .abx-meta-row { display:flex; align-items:center; justify-content:space-between; gap:16px; padding:clamp(11px,1.3vw,15px) 0; border-bottom:1px solid rgba(26,43,60,0.12); }
        .abx-meta-k { font-family:'Inter',sans-serif; font-size:12px; font-weight:600; letter-spacing:1px; text-transform:uppercase; color:${MUTED}; }
        .abx-meta-v { font-family:'Poppins',sans-serif; font-weight:600; font-size:clamp(15px,1.3vw,19px); color:${NAVY}; letter-spacing:-0.01em; }

        /* ── 2 · Manifesto ── */
        .abx-mani { background:#fff; max-width:1760px; margin:0 auto; padding: clamp(64px,9vw,150px) clamp(24px,5vw,80px); }
        .abx-mani-label { font-family:'Inter',sans-serif; font-weight:700; font-size:clamp(10px,0.8vw,12px); letter-spacing:2.5px; text-transform:uppercase; color:${GREEN}; margin:0 0 clamp(22px,3vw,34px); }
        .abx-mani-text { font-family:'Poppins',sans-serif; font-weight:600; font-size:clamp(26px,3.8vw,60px); line-height:1.28; letter-spacing:-0.025em; color:${NAVY}; margin:0; max-width:24ch; }

        /* ── 3 · Sticky chapters ── */
        .abx-ch { background:linear-gradient(180deg,#ffffff,#f3faf7); padding: clamp(56px,7vw,120px) clamp(24px,5vw,80px); }
        .abx-ch-in { max-width:1760px; margin:0 auto; display:grid; grid-template-columns:0.85fr 1.15fr; gap:clamp(40px,6vw,110px); align-items:start; }
        .abx-ch-side { position:sticky; top:104px; }
        .abx-ch-title { font-family:'Poppins',sans-serif; font-weight:700; font-size:clamp(30px,3.8vw,56px); line-height:1.08; letter-spacing:-0.03em; color:${NAVY}; margin:18px 0 clamp(28px,3vw,40px); }
        .abx-ch-index { display:flex; flex-direction:column; gap:2px; border-top:1px solid rgba(26,43,60,0.12); }
        .abx-ch-ix { position:relative; display:flex; align-items:center; gap:14px; padding:14px 0; border-bottom:1px solid rgba(26,43,60,0.12); font-family:'Poppins',sans-serif; font-weight:600; font-size:clamp(14px,1.1vw,17px); color:rgba(19,41,61,0.4); transition:color 0.4s ease, padding-left 0.4s cubic-bezier(0.16,1,0.3,1); }
        .abx-ch-ix i { font-style:normal; font-family:'Inter',sans-serif; font-weight:700; font-size:11px; letter-spacing:1px; color:rgba(60,185,140,0.5); min-width:22px; transition:color 0.4s ease; }
        .abx-ch-ix.on { color:${NAVY}; padding-left:18px; }
        .abx-ch-ix.on i { color:${GREEN}; }
        .abx-ch-ix.on::before { content:''; position:absolute; left:0; top:50%; transform:translateY(-50%); width:8px; height:8px; border-radius:50%; background:${GREEN}; box-shadow:0 0 0 4px rgba(60,185,140,0.16); }
        .abx-ch-main { display:flex; flex-direction:column; }
        .abx-block { position:relative; min-height:62vh; display:flex; flex-direction:column; justify-content:center; padding:clamp(28px,4vw,48px) 0; border-bottom:1px solid rgba(26,43,60,0.1); will-change:opacity, transform; }
        .abx-block:last-child { border-bottom:none; }
        .abx-block-no { font-family:'Poppins',sans-serif; font-weight:700; font-size:clamp(13px,1vw,15px); color:${GREEN}; letter-spacing:1px; }
        .abx-block-h { font-family:'Poppins',sans-serif; font-weight:700; font-size:clamp(26px,3.4vw,46px); line-height:1.1; letter-spacing:-0.03em; color:${NAVY}; margin:clamp(10px,1.2vw,16px) 0 clamp(12px,1.4vw,18px); }
        .abx-block-p { font-family:'Inter',sans-serif; font-size:clamp(15px,1.2vw,19px); line-height:1.8; color:${MUTED}; margin:0; max-width:54ch; }

        /* ── 4 · Figures ── */
        .abx-figs-sec { background:#fff; padding: clamp(56px,7vw,110px) clamp(24px,5vw,80px); }
        .abx-figs-in { max-width:1760px; margin:0 auto; }
        .abx-figs { display:grid; grid-template-columns:repeat(4,1fr); margin-top:clamp(28px,3.4vw,44px); border-top:1px solid rgba(26,43,60,0.14); }
        .abx-fig { padding:clamp(26px,3vw,46px) clamp(14px,1.6vw,28px) clamp(10px,1.4vw,18px) 0; }
        .abx-fig + .abx-fig { padding-left:clamp(18px,2vw,32px); border-left:1px solid rgba(26,43,60,0.1); }
        .abx-fig-n { display:block; font-family:'Poppins',sans-serif; font-weight:700; font-size:clamp(54px,7vw,124px); line-height:0.84; letter-spacing:-0.05em; color:${NAVY}; }
        .abx-fig-l { display:block; font-family:'Inter',sans-serif; font-weight:700; font-size:clamp(11px,0.9vw,13px); letter-spacing:2px; text-transform:uppercase; color:${MUTED}; margin-top:clamp(14px,1.6vw,22px); }

        /* ── 5 · Value rows ── */
        .abx-val-sec { background:linear-gradient(180deg,#ffffff,#f3faf7); padding: clamp(56px,7vw,110px) clamp(24px,5vw,80px); }
        .abx-val-in { max-width:1760px; margin:0 auto; }
        .abx-val-head { margin-bottom:clamp(28px,3.4vw,44px); }
        .abx-val-h2 { font-family:'Poppins',sans-serif; font-weight:700; font-size:clamp(30px,4.2vw,58px); line-height:1.08; letter-spacing:-0.03em; color:${NAVY}; margin:16px 0 0; }
        .abx-vals { border-top:1px solid rgba(26,43,60,0.14); }
        .abx-val { position:relative; display:grid; grid-template-columns:90px 0.5fr 1fr; gap:clamp(16px,2.4vw,40px); align-items:baseline; padding:clamp(22px,3vw,40px) clamp(8px,1.4vw,20px); border-bottom:1px solid rgba(26,43,60,0.12); transition:padding-left 0.45s cubic-bezier(0.16,1,0.3,1); }
        .abx-val:hover { padding-left:clamp(18px,2.4vw,40px); }
        .abx-val-no { font-family:'Inter',sans-serif; font-weight:700; font-size:13px; letter-spacing:1px; color:${GREEN}; }
        .abx-val-t { font-family:'Poppins',sans-serif; font-weight:700; font-size:clamp(24px,3vw,46px); letter-spacing:-0.03em; color:${NAVY}; line-height:1; transition:color 0.35s ease; }
        .abx-val:hover .abx-val-t { color:${GREEN}; }
        .abx-val-d { font-family:'Inter',sans-serif; font-size:clamp(14px,1.05vw,16.5px); line-height:1.7; color:${MUTED}; }
        .abx-val-line { position:absolute; left:0; bottom:-1px; height:2px; width:0; background:${GREEN}; transition:width 0.5s cubic-bezier(0.16,1,0.3,1); }
        .abx-val:hover .abx-val-line { width:100%; }

        /* ── 6 · Quote ── */
        .abx-quote-sec { position:relative; overflow:hidden; background: radial-gradient(60% 80% at 50% 0%, rgba(60,185,140,0.12), transparent 62%), linear-gradient(180deg,#ffffff,#f3faf7); padding: clamp(72px,10vw,150px) clamp(24px,6vw,120px); }
        .abx-quote-sec::before { content:''; position:absolute; inset:0; pointer-events:none; background-image: radial-gradient(rgba(19,41,61,0.05) 1px, transparent 1px); background-size:30px 30px; }
        .abx-quote-glow { position:absolute; bottom:-160px; right:-60px; width:440px; height:440px; border-radius:50%; background:radial-gradient(circle, rgba(60,185,140,0.16), transparent 64%); pointer-events:none; }
        .abx-quote { position:relative; z-index:1; max-width:1100px; margin:0 auto; padding:0; font-family:'Poppins',sans-serif; font-weight:600; font-size:clamp(28px,4.2vw,68px); line-height:1.22; letter-spacing:-0.03em; color:${NAVY}; text-align:center; }
        .abx-quote-mark { display:block; font-size:1.6em; line-height:0.5; color:${GREEN}; opacity:0.55; }
        .abx-quote-by { font-family:'Inter',sans-serif; font-weight:700; font-size:clamp(11px,0.9vw,13px); letter-spacing:2px; text-transform:uppercase; color:${MUTED}; margin-top:clamp(26px,3vw,40px); }

        /* ── responsive ── */
        @media (max-width:980px){
          .abx-hero-in { grid-template-columns:1fr; align-items:start; gap:clamp(28px,5vw,40px); }
          .abx-ch-in { grid-template-columns:1fr; gap:clamp(20px,5vw,36px); }
          .abx-ch-side { position:static; }
          .abx-ch-index { display:none; }
          .abx-block { min-height:50vh; }
        }
        @media (max-width:640px){
          .abx-figs { grid-template-columns:1fr 1fr; }
          .abx-fig:nth-child(3), .abx-fig:nth-child(4){ border-top:1px solid rgba(26,43,60,0.1); }
          .abx-fig:nth-child(3){ border-left:none; padding-left:0; }
          .abx-val { grid-template-columns:48px 1fr; }
          .abx-val-d { grid-column:2; }
        }
        @media (min-width:1920px){
          .abx-hero-in, .abx-mani, .abx-ch-in, .abx-figs-in, .abx-val-in { max-width:1900px; }
          .abx-hero { padding:clamp(140px,11vw,200px) clamp(40px,5vw,90px) clamp(70px,7vw,120px); }
          .abx-hero-h1 { font-size:142px; }
          .abx-hero-lead { font-size:19px; }
          .abx-meta-v { font-size:22px; }
          .abx-mani-text { font-size:78px; }
          .abx-ch-title { font-size:68px; }
          .abx-block-h { font-size:56px; }
          .abx-block-p { font-size:22px; }
          .abx-val-h2 { font-size:70px; }
          .abx-val-t { font-size:56px; }
          .abx-val-d { font-size:18px; }
          .abx-fig-n { font-size:150px; }
          .abx-fig-l { font-size:14px; }
          .abx-quote { font-size:84px; }
        }
        @media (min-width:2560px){
          .abx-hero-in, .abx-mani, .abx-ch-in, .abx-figs-in, .abx-val-in { max-width:2400px; }
          .abx-hero { padding:clamp(190px,10vw,260px) clamp(60px,5vw,120px) clamp(90px,7vw,160px); }
          .abx-hero-h1 { font-size:200px; }
          .abx-hero-lead { font-size:24px; }
          .abx-meta-v { font-size:28px; }
          .abx-hero-mark { font-size:600px; }
          .abx-mani-text { font-size:104px; }
          .abx-ch-title { font-size:88px; }
          .abx-block-no { font-size:18px; }
          .abx-block-h { font-size:72px; }
          .abx-block-p { font-size:27px; }
          .abx-val-h2 { font-size:90px; }
          .abx-val-t { font-size:72px; }
          .abx-val-d { font-size:22px; }
          .abx-fig-n { font-size:210px; }
          .abx-fig-l { font-size:17px; }
          .abx-quote { font-size:112px; }
        }
      `}</style>
    </div>
  )
}
