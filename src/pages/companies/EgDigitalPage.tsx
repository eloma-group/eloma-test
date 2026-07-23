import { useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Code2, Cpu, Megaphone, PenTool, Cloud, BarChart3, Check, Star } from 'lucide-react'
import { useNavigate, Link } from 'react-router-dom'
import { Header } from '../../components/Header/Header'
import { FlyFooter } from '../../components/FlyFooter'

/* ═══════════════════════════════════════════════════
   EG DIGITAL AUSTRALIA - "Product Showcase" (light)
   Space Grotesk + JetBrains Mono, indigo accent. Rich
   body: spec grid, work showcase, light metrics band.
   ═══════════════════════════════════════════════════ */

const INK    = '#111318'
const INDIGO = '#4F46E5'
const INDIGO2 = '#6366F1'
const MUTED  = 'rgba(17,19,24,0.56)'
const PAPER  = '#F5F6FB'
const EASE   = [0.16, 1, 0.3, 1] as [number, number, number, number]

const img = (id: string, w: number) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`

const CAPS = [
  { Icon: Code2, code: 'SVC.01', tag: 'react · next · node', t: 'Web Development', d: 'High-performance sites and web apps on modern frameworks - fast, accessible, responsive to the pixel.' },
  { Icon: PenTool, code: 'SVC.02', tag: 'figma · design-systems', t: 'Product & UX Design', d: 'Research-led interfaces and design systems that make complex products feel effortless and premium.' },
  { Icon: Cpu, code: 'SVC.03', tag: 'apis · portals · tooling', t: 'Custom Software', d: 'Bespoke platforms, portals and internal tools engineered around how your business really works.' },
  { Icon: Megaphone, code: 'SVC.04', tag: 'seo · social · paid', t: 'Growth Marketing', d: 'Full-funnel search, social and paid campaigns that turn attention into measurable revenue.' },
  { Icon: Cloud, code: 'SVC.05', tag: 'aws · ci/cd · monitoring', t: 'Cloud & DevOps', d: 'Scalable architecture, CI/CD and monitoring so you stay fast, secure and always on.' },
  { Icon: BarChart3, code: 'SVC.06', tag: 'ga4 · dashboards', t: 'SEO & Analytics', d: 'Technical SEO, tracking and dashboards that reveal what works and compound growth.' },
]

const WORK = [
  { cat: 'Web Platform', t: 'Retail commerce rebuild', metric: '+142%', metricL: 'organic traffic', id: 'photo-1523474253046-8cd2748b5fd2' },
  { cat: 'Custom Software', t: 'Operations portal', metric: '30%', metricL: 'faster workflows', id: 'photo-1551288049-bebda4e38f71' },
  { cat: 'Growth Marketing', t: 'Demand-gen engine', metric: '3.4x', metricL: 'return on ad spend', id: 'photo-1460925895917-afdab827c52f' },
]

export function EgDigitalPage() {
  const reduce = useReducedMotion()
  const nav = useNavigate()
  useEffect(() => { window.scrollTo(0, 0) }, [])

  const rise = (d = 0) => reduce ? {} : ({
    initial: { opacity: 0, y: 28 }, whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' }, transition: { duration: 0.8, delay: d, ease: EASE },
  })

  return (
    <div className="dg" style={{ overflowX: 'hidden', background: '#fff' }}>
      <Header />

      {/* ── HERO (product showcase) ── */}
      <section className="dg-hero">
        <span className="dg-hero-blob" aria-hidden />
        <div className="dg-wrap dg-hero-in">
          <div className="dg-hero-copy">
            <motion.nav className="dg-crumb" initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
              <Link to="/">Eloma Group</Link><span>/</span><span>Companies</span><span>/</span><em>EG Digital</em>
            </motion.nav>
            <motion.p className="dg-eyebrow" initial={reduce ? false : { opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.05, ease: EASE }}>
              <span className="dg-eyebrow-dot" />EG Digital Australia
            </motion.p>
            <motion.h1 className="dg-h1" initial={reduce ? false : { opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1, ease: EASE }}>
              We build digital<br />products that <span className="dg-hl">perform.</span>
            </motion.h1>
            <motion.p className="dg-lead" initial={reduce ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: EASE }}>
              The digital engine of Eloma Group - web platforms, custom software and growth marketing
              for ambitious brands. We own the outcome, not just the deliverable.
            </motion.p>
            <motion.div className="dg-cta-row" initial={reduce ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.28, ease: EASE }}>
              <button className="dg-btn dg-btn-p" onClick={() => nav('/contact#contact-form')}><span>Start a project</span><ArrowUpRight size={17} strokeWidth={2.4} /></button>
              <a className="dg-btn dg-btn-g" href="https://egdigital.com.au/" target="_blank" rel="noopener noreferrer">Visit egdigital.com.au</a>
            </motion.div>
          </div>

          {/* overlapping UI showcase */}
          <motion.div className="dg-show" initial={reduce ? false : { opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.24, ease: EASE }}>
            <div className="dg-card dg-card-main">
              <div className="dg-card-bar">
                <span className="dg-card-dots"><i /><i /><i /></span>
                <span className="dg-card-url">app.launch</span>
              </div>
              <div className="dg-card-body">
                <div className="dg-card-row"><span className="dg-card-lb">Traffic</span><span className="dg-card-up">+142%</span></div>
                <div className="dg-chart" aria-hidden>
                  {[38, 52, 46, 68, 60, 82, 96].map((h, i) => (
                    <span key={i} className="dg-bar" style={{ height: `${h}%` }} />
                  ))}
                </div>
              </div>
            </div>
            <div className="dg-card dg-card-stat">
              <span className="dg-card-stat-n">98<i>%</i></span>
              <span className="dg-card-stat-l">Lighthouse<br />performance</span>
            </div>
            <div className="dg-chip"><Star size={13} strokeWidth={2.4} fill="currentColor" /> 4.9/5 client rating</div>
          </motion.div>
        </div>
      </section>

      {/* ── CAPABILITIES (spec grid) ── */}
      <section className="dg-caps">
        <div className="dg-wrap">
          <motion.div className="dg-sec-head" {...rise()}>
            <p className="dg-eyebrow"><span className="dg-eyebrow-dot" />Capabilities</p>
            <h2 className="dg-h2">A complete digital team, under one roof.</h2>
            <p className="dg-sec-p">Strategy, design, engineering and marketing working as one - so nothing is lost between the idea and the launch.</p>
          </motion.div>
          <div className="dg-spec">
            {CAPS.map((c, i) => (
              <motion.article key={c.t} className="dg-cell"
                initial={reduce ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.55, delay: (i % 3) * 0.07, ease: EASE }}>
                <div className="dg-cell-top">
                  <span className="dg-cell-code">{c.code}</span>
                  <span className="dg-cell-ic"><c.Icon size={20} strokeWidth={1.9} /></span>
                </div>
                <h3 className="dg-cell-t">{c.t}</h3>
                <p className="dg-cell-d">{c.d}</p>
                <span className="dg-cell-tag">// {c.tag}</span>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ── WORK SHOWCASE ── */}
      <section className="dg-work">
        <div className="dg-wrap">
          <motion.div className="dg-sec-head" {...rise()}>
            <p className="dg-eyebrow"><span className="dg-eyebrow-dot" />Selected work</p>
            <h2 className="dg-h2">Products shipped, results measured.</h2>
          </motion.div>
          <div className="dg-work-grid">
            {WORK.map((w, i) => (
              <motion.article key={w.t} className="dg-work-card"
                initial={reduce ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.55, delay: i * 0.08, ease: EASE }}>
                <div className="dg-work-img">
                  <img src={img(w.id, 800)} alt={w.t} loading="lazy" decoding="async" />
                  <span className="dg-work-cat">{w.cat}</span>
                </div>
                <div className="dg-work-body">
                  <h3 className="dg-work-t">{w.t}</h3>
                  <div className="dg-work-result">
                    <span className="dg-work-n">{w.metric}</span>
                    <span className="dg-work-l">{w.metricL}</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ── METRICS (light band) ── */}
      <section className="dg-metrics">
        <div className="dg-wrap dg-metrics-in">
          <motion.div className="dg-metrics-copy" {...rise()}>
            <p className="dg-eyebrow"><span className="dg-eyebrow-dot" />The numbers</p>
            <h2 className="dg-h2">Work that speaks in results.</h2>
          </motion.div>
          <div className="dg-metrics-grid">
            {[{ n: '120+', l: 'products_launched' }, { n: '98%', l: 'on_time_delivery' }, { n: '7', l: 'countries_served' }, { n: '4.9/5', l: 'client_rating' }].map((s, i) => (
              <motion.div key={s.l} className="dg-stat" initial={reduce ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}>
                <span className="dg-stat-n">{s.n}</span><span className="dg-stat-l">{s.l}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PARTNER SPLIT ── */}
      <section className="dg-split">
        <div className="dg-wrap dg-split-grid">
          <motion.div className="dg-split-media" {...rise()}>
            <img src={img('photo-1519389950473-47ba0277781c', 1200)} alt="EG Digital team collaborating" decoding="async" loading="lazy" />
          </motion.div>
          <motion.div className="dg-split-copy" {...rise(0.1)}>
            <p className="dg-eyebrow"><span className="dg-eyebrow-dot" />A partner, not a vendor</p>
            <h2 className="dg-h2">We embed with your team and stay <span className="dg-hl">accountable.</span></h2>
            <p className="dg-sec-p">We learn your business, ship in the open, and stick around long after launch - which is why clients keep coming back for the next build.</p>
            <ul className="dg-check">
              {['Senior, in-house design & engineering', 'Transparent timelines and fixed scopes', 'Performance & accessibility by default', 'Ongoing growth and optimisation'].map(b => (
                <li key={b}><span className="dg-check-ic"><Check size={15} strokeWidth={3} /></span>{b}</li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* ── CTA (light) ── */}
      <section className="dg-cta">
        <div className="dg-wrap dg-cta-in">
          <motion.div className="dg-cta-copy" {...rise()}>
            <p className="dg-eyebrow"><span className="dg-eyebrow-dot" />Start a project</p>
            <h2 className="dg-cta-h">Ready to build something great?</h2>
          </motion.div>
          <motion.div className="dg-cta-act" {...rise(0.08)}>
            <p className="dg-cta-sub">Tell us about your product. We'll map the fastest path to launch.</p>
            <button className="dg-btn dg-btn-p" onClick={() => nav('/contact#contact-form')}><span>Start a project</span><ArrowUpRight size={18} strokeWidth={2.4} /></button>
          </motion.div>
        </div>
      </section>

      <FlyFooter />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@500;600&display=swap');
        .dg-wrap { max-width: none; margin: 0 auto; }
        .dg-hl { color:${INDIGO}; }
        .dg-eyebrow { display:inline-flex; align-items:center; gap:10px; margin:0; font-family:'Eloma Sans',sans-serif; font-weight:600; font-size:clamp(10px,0.8vw,12px); letter-spacing:1.5px; text-transform:uppercase; color:${INDIGO}; }
        .dg-eyebrow-dot { width:7px; height:7px; border-radius:2px; background:${INDIGO}; box-shadow:0 0 0 4px rgba(79,70,229,0.16); flex-shrink:0; }
        .dg-h2 { font-family:'Eloma Sans Heading',sans-serif; font-weight:700; font-size:clamp(30px,4.2vw,60px); line-height:1.12; letter-spacing:-0.02em; color:${INK}; margin:16px 0 0; }
        .dg-sec-head { max-width:900px; margin-bottom:clamp(34px,4vw,58px); }
        .dg-sec-p { font-family:'Eloma Sans',sans-serif; font-size:clamp(15px,1.2vw,18px); line-height:1.8; color:${MUTED}; margin:clamp(16px,1.8vw,24px) 0 0; max-width:58ch; }

        .dg-btn { display:inline-flex; align-items:center; gap:9px; cursor:pointer; font-family:'Eloma Sans Heading',sans-serif; font-weight:600; font-size:clamp(14px,1vw,16px); border-radius:10px; padding:15px 28px; border:none; text-decoration:none; transition:transform .25s cubic-bezier(0.16,1,0.3,1), background .25s ease, box-shadow .25s ease, color .25s ease, border-color .25s ease; }
        .dg-btn-p { position:relative; overflow:hidden; background:${INDIGO}; color:#fff; box-shadow:0 18px 40px -16px rgba(79,70,229,0.6); }
        .dg-btn-p span { position:relative; z-index:1; }
        .dg-btn-p::after { content:''; position:absolute; top:0; left:-120%; width:55%; height:100%; background:linear-gradient(110deg,transparent,rgba(255,255,255,0.4),transparent); transform:skewX(-18deg); transition:left .7s cubic-bezier(0.16,1,0.3,1); }
        .dg-btn-p:hover { transform:translateY(-2px); background:${INDIGO2}; box-shadow:0 24px 50px -16px rgba(79,70,229,0.8); }
        .dg-btn-p:hover::after { left:135%; }
        .dg-btn-g { background:#fff; color:${INK}; border:1.5px solid rgba(17,19,24,0.16); }
        .dg-btn-g:hover { transform:translateY(-2px); border-color:${INDIGO}; color:${INDIGO}; }

        /* HERO */
        .dg-hero { position:relative; overflow:hidden; background:linear-gradient(180deg,#ffffff 0%,${PAPER} 100%); padding:clamp(120px,13vw,185px) 45px clamp(60px,7vw,110px); }
        .dg-hero-blob { position:absolute; top:-140px; right:-60px; width:560px; height:560px; border-radius:50%; background:radial-gradient(circle, rgba(99,102,241,0.14), transparent 62%); pointer-events:none; }
        .dg-hero-in { position:relative; z-index:1; display:grid; grid-template-columns:1.02fr 0.98fr; gap:clamp(36px,5vw,72px); align-items:center; }
        .dg-crumb { display:flex; align-items:center; gap:9px; font-family:'Eloma Sans',sans-serif; font-size:clamp(10px,0.82vw,12px); color:${MUTED}; margin-bottom:clamp(20px,2.2vw,28px); flex-wrap:wrap; }
        .dg-crumb a { color:${MUTED}; text-decoration:none; transition:color .2s ease; }
        .dg-crumb a:hover { color:${INDIGO}; }
        .dg-crumb em { color:${INK}; font-style:normal; font-weight:600; }
        .dg-h1 { font-family:'Eloma Sans Heading',sans-serif; font-weight:700; font-size:clamp(46px,6.8vw,104px); line-height:1.0; letter-spacing:-0.04em; color:${INK}; margin:clamp(16px,2vw,22px) 0 0; }
        .dg-lead { font-family:'Eloma Sans',sans-serif; font-size:clamp(15px,1.2vw,18px); line-height:1.8; color:${MUTED}; max-width:50ch; margin:clamp(18px,2vw,26px) 0 0; }
        .dg-cta-row { display:flex; flex-wrap:wrap; gap:13px; margin-top:clamp(26px,3vw,36px); }

        /* UI showcase */
        .dg-show { position:relative; min-height:clamp(340px,32vw,460px); }
        .dg-card { position:absolute; background:#fff; border:1px solid rgba(17,19,24,0.08); border-radius:18px; box-shadow:0 40px 80px -46px rgba(17,19,24,0.4); }
        .dg-card-main { top:0; right:0; width:min(84%,460px); overflow:hidden; }
        .dg-card-bar { display:flex; align-items:center; gap:12px; padding:12px 16px; border-bottom:1px solid rgba(17,19,24,0.07); }
        .dg-card-dots { display:inline-flex; gap:6px; }
        .dg-card-dots i { width:9px; height:9px; border-radius:50%; background:rgba(17,19,24,0.14); }
        .dg-card-url { font-family:'Eloma Sans',sans-serif; font-size:11px; color:${MUTED}; }
        .dg-card-body { padding:clamp(18px,2vw,26px); }
        .dg-card-row { display:flex; align-items:baseline; justify-content:space-between; margin-bottom:16px; }
        .dg-card-lb { font-family:'Eloma Sans',sans-serif; font-size:13px; font-weight:600; color:${MUTED}; }
        .dg-card-up { font-family:'Eloma Sans Heading',sans-serif; font-weight:700; font-size:clamp(16px,1.6vw,22px); color:${INDIGO}; letter-spacing:-0.02em; }
        .dg-chart { display:flex; align-items:flex-end; gap:clamp(7px,0.9vw,13px); height:clamp(96px,11vw,140px); }
        .dg-bar { flex:1; border-radius:6px 6px 3px 3px; background:linear-gradient(180deg, ${INDIGO2}, ${INDIGO}); opacity:0.9; }
        .dg-bar:last-child { background:linear-gradient(180deg,#A5B4FC,${INDIGO2}); box-shadow:0 8px 20px -8px rgba(79,70,229,0.7); opacity:1; }
        .dg-card-stat { bottom:0; left:0; display:flex; align-items:center; gap:14px; padding:clamp(16px,1.8vw,22px) clamp(18px,2vw,26px); }
        .dg-card-stat-n { font-family:'Eloma Sans Heading',sans-serif; font-weight:700; font-size:clamp(30px,3.4vw,50px); color:${INDIGO}; letter-spacing:-0.04em; line-height:1; }
        .dg-card-stat-n i { font-size:0.55em; font-style:normal; }
        .dg-card-stat-l { font-family:'Eloma Sans',sans-serif; font-size:clamp(11px,0.95vw,13px); line-height:1.35; color:${MUTED}; }
        .dg-chip { position:absolute; top:clamp(-6px,-0.6vw,-6px); left:clamp(6px,3vw,40px); display:inline-flex; align-items:center; gap:7px; background:${INK}; color:#fff; font-family:'Eloma Sans',sans-serif; font-weight:600; font-size:clamp(11px,0.95vw,13px); padding:9px 15px; border-radius:99px; box-shadow:0 18px 40px -20px rgba(17,19,24,0.7); }
        .dg-chip svg { color:#FBBF24; }

        /* CAPABILITIES spec grid */
        .dg-caps { background:#fff; padding:clamp(64px,8vw,130px) 45px clamp(60px,7vw,120px); }
        .dg-spec { display:grid; grid-template-columns:repeat(3,1fr); gap:clamp(14px,1.4vw,20px); }
        .dg-cell { position:relative; overflow:hidden; background:${PAPER}; border:1px solid rgba(17,19,24,0.08); border-radius:18px; padding:clamp(24px,2.4vw,36px); transition:transform .45s cubic-bezier(0.16,1,0.3,1), border-color .45s ease, box-shadow .45s ease, background .45s ease; }
        .dg-cell::before { content:''; position:absolute; top:0; left:0; right:0; height:3px; background:${INDIGO}; transform:scaleX(0); transform-origin:left; transition:transform .45s cubic-bezier(0.16,1,0.3,1); }
        .dg-cell:hover { transform:translateY(-6px); background:#fff; border-color:rgba(79,70,229,0.4); box-shadow:0 40px 80px -50px rgba(17,19,24,0.35); }
        .dg-cell:hover::before { transform:scaleX(1); }
        .dg-cell-top { display:flex; align-items:center; justify-content:space-between; margin-bottom:clamp(22px,2.4vw,32px); }
        .dg-cell-code { font-family:'Eloma Sans',sans-serif; font-size:12px; letter-spacing:0.5px; color:rgba(17,19,24,0.32); }
        .dg-cell-ic { display:inline-flex; align-items:center; justify-content:center; width:48px; height:48px; border-radius:13px; background:rgba(79,70,229,0.1); color:${INDIGO}; transition:transform .45s cubic-bezier(0.16,1,0.3,1), background .4s ease, color .4s ease; }
        .dg-cell:hover .dg-cell-ic { transform:translateY(-3px) rotate(-6deg); background:${INDIGO}; color:#fff; }
        .dg-cell-t { font-family:'Eloma Sans Heading',sans-serif; font-weight:600; font-size:clamp(19px,1.7vw,25px); letter-spacing:-0.02em; color:${INK}; margin:0 0 10px; }
        .dg-cell-d { font-family:'Eloma Sans',sans-serif; font-size:clamp(13.5px,1vw,15.5px); line-height:1.75; color:${MUTED}; margin:0 0 16px; }
        .dg-cell-tag { font-family:'Eloma Sans',sans-serif; font-size:11px; color:${INDIGO}; opacity:0.85; }

        /* WORK SHOWCASE */
        .dg-work { background:${PAPER}; padding:clamp(60px,7vw,120px) 45px; }
        .dg-work-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:clamp(16px,1.8vw,26px); }
        .dg-work-card { background:#fff; border:1px solid rgba(17,19,24,0.08); border-radius:20px; overflow:hidden; transition:transform .45s cubic-bezier(0.16,1,0.3,1), box-shadow .45s ease, border-color .4s ease; }
        .dg-work-card:hover { transform:translateY(-8px); border-color:rgba(79,70,229,0.4); box-shadow:0 44px 84px -48px rgba(17,19,24,0.4); }
        .dg-work-img { position:relative; aspect-ratio:16/11; overflow:hidden; }
        .dg-work-img img { width:100%; height:100%; object-fit:cover; display:block; transition:transform .7s cubic-bezier(0.16,1,0.3,1); }
        .dg-work-card:hover .dg-work-img img { transform:scale(1.06); }
        .dg-work-cat { position:absolute; top:14px; left:14px; font-family:'Eloma Sans',sans-serif; font-size:10.5px; letter-spacing:0.5px; text-transform:uppercase; color:#fff; background:rgba(17,19,24,0.72); backdrop-filter:blur(4px); padding:6px 12px; border-radius:99px; }
        .dg-work-body { padding:clamp(22px,2.2vw,32px); display:flex; align-items:flex-end; justify-content:space-between; gap:16px; }
        .dg-work-t { font-family:'Eloma Sans Heading',sans-serif; font-weight:600; font-size:clamp(18px,1.6vw,23px); letter-spacing:-0.02em; color:${INK}; margin:0; max-width:16ch; }
        .dg-work-result { text-align:right; flex-shrink:0; }
        .dg-work-n { display:block; font-family:'Eloma Sans Heading',sans-serif; font-weight:700; font-size:clamp(24px,2.4vw,36px); letter-spacing:-0.03em; color:${INDIGO}; line-height:1; }
        .dg-work-l { display:block; font-family:'Eloma Sans',sans-serif; font-size:10px; color:${MUTED}; margin-top:5px; }

        /* METRICS (light band) */
        .dg-metrics { background:#fff; padding:clamp(60px,7vw,120px) 45px; }
        .dg-metrics-in { display:grid; grid-template-columns:0.85fr 1.15fr; gap:clamp(32px,5vw,72px); align-items:center; }
        .dg-metrics-grid { display:grid; grid-template-columns:1fr 1fr; gap:clamp(22px,2.6vw,40px); }
        .dg-stat { display:flex; flex-direction:column; gap:8px; padding-left:clamp(18px,2vw,26px); border-left:2px solid rgba(79,70,229,0.35); }
        .dg-stat-n { font-family:'Eloma Sans Heading',sans-serif; font-weight:700; font-size:clamp(36px,4vw,64px); line-height:0.92; letter-spacing:-0.04em; color:${INK}; }
        .dg-stat-l { font-family:'Eloma Sans',sans-serif; font-size:clamp(11px,0.9vw,13.5px); color:${INDIGO}; }

        /* SPLIT */
        .dg-split { background:${PAPER}; padding:clamp(60px,7vw,120px) 45px; }
        .dg-split-grid { display:grid; grid-template-columns:1fr 1fr; gap:clamp(32px,5vw,72px); align-items:center; }
        .dg-split-media { border-radius:16px; overflow:hidden; aspect-ratio:5/4; box-shadow:0 44px 84px -48px rgba(17,19,24,0.4); }
        .dg-split-media img { width:100%; height:100%; object-fit:cover; display:block; }
        .dg-check { list-style:none; margin:clamp(24px,3vw,34px) 0 0; padding:0; display:flex; flex-direction:column; gap:15px; }
        .dg-check li { display:flex; align-items:center; gap:13px; font-family:'Eloma Sans',sans-serif; font-weight:500; font-size:clamp(15px,1.2vw,18px); color:${INK}; }
        .dg-check-ic { display:inline-flex; align-items:center; justify-content:center; width:28px; height:28px; border-radius:8px; background:rgba(79,70,229,0.12); color:${INDIGO}; flex-shrink:0; }

        /* CTA (light, full-width closing band) */
        .dg-cta { position:relative; background:#fff; border-top:1px solid rgba(17,19,24,0.1); padding:clamp(64px,8vw,128px) 45px; }
        .dg-cta::before { content:''; position:absolute; top:-1px; left:15px; width:60px; height:3px; background:${INDIGO}; }
        .dg-cta-in { display:grid; grid-template-columns:1.15fr 0.85fr; gap:clamp(28px,4vw,72px); align-items:end; }
        .dg-cta-h { font-family:'Eloma Sans Heading',sans-serif; font-weight:700; font-size:clamp(34px,4.6vw,72px); line-height:1.0; letter-spacing:-0.04em; color:${INK}; margin:16px 0 0; }
        .dg-cta-act { display:flex; flex-direction:column; align-items:flex-start; gap:clamp(20px,2.4vw,28px); padding-bottom:6px; }
        .dg-cta-sub { font-family:'Eloma Sans',sans-serif; font-size:clamp(14px,1.15vw,17px); line-height:1.75; color:${MUTED}; margin:0; max-width:42ch; }

        /* responsive */
        @media (max-width:1024px){
          .dg-hero-in { grid-template-columns:1fr; gap:clamp(56px,8vw,72px); }
          .dg-show { max-width:520px; }
          .dg-spec { grid-template-columns:1fr 1fr; }
          .dg-work-grid { grid-template-columns:1fr; max-width:520px; }
          .dg-metrics-in { grid-template-columns:1fr; gap:clamp(28px,5vw,40px); }
          .dg-split-grid { grid-template-columns:1fr; }
          .dg-split-media { order:-1; }
          .dg-cta-in { grid-template-columns:1fr; align-items:start; gap:clamp(24px,5vw,36px); }
        }
        @media (max-width:600px){
          .dg-spec { grid-template-columns:1fr; }
          .dg-metrics-grid { grid-template-columns:1fr; }
          .dg-card-main { width:82%; }
          .dg-work-body { flex-direction:column; align-items:flex-start; }
          .dg-work-result { text-align:left; }
        }
        @media (min-width:1920px){
          .dg-wrap { max-width:none; }
          .dg-h1 { font-size:116px; }
          .dg-h2 { font-size:66px; }
          .dg-lead,.dg-sec-p { font-size:20px; }
        }
        @media (min-width:2560px){
          .dg-wrap { max-width:none; }
          .dg-h1 { font-size:150px; }
          .dg-h2 { font-size:92px; }
          .dg-cell-d { font-size:18px; }
          .dg-stat-n { font-size:76px; }
        }
        @media (prefers-reduced-motion: reduce){
          .dg-btn,.dg-cell,.dg-cell-ic,.dg-work-card { transition:none; }
        }
      `}</style>
    </div>
  )
}
