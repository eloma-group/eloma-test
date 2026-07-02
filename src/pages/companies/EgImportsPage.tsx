import { useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Check, Globe2, Stamp, Ship, BadgeCheck, Warehouse, Truck, PackageSearch, ClipboardCheck } from 'lucide-react'
import { useNavigate, Link } from 'react-router-dom'
import { Header } from '../../components/Header/Header'
import { FlyFooter } from '../../components/FlyFooter'

/* ═══════════════════════════════════════════════════
   EG IMPORTS - "Global Trade" (light, marine blue)
   A trade-desk page: a hero over container imagery, a
   four-stage journey line (Source→Inspect→Clear→Deliver),
   a sourcing capability grid and a source-regions panel.
   ═══════════════════════════════════════════════════ */

const NAVY  = '#13293D'
const BLUE  = '#1C6DB5'
const DEEP  = '#0C2C46'
const MUTED = 'rgba(26,43,60,0.56)'
const EASE  = [0.16, 1, 0.3, 1] as [number, number, number, number]

const img = (id: string, w: number) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`

const JOURNEY = [
  { Icon: Globe2, t: 'Source', d: 'We identify, vet and negotiate with the right suppliers across 30+ countries.' },
  { Icon: ClipboardCheck, t: 'Inspect', d: 'Quality and compliance checks before anything leaves the origin country.' },
  { Icon: Stamp, t: 'Clear', d: 'Customs, documentation and duties handled precisely to avoid costly delays.' },
  { Icon: Truck, t: 'Deliver', d: 'Freight and last-mile distribution that lands goods where you need them.' },
]

const CAPS = [
  { Icon: PackageSearch, t: 'Global Sourcing', d: 'Vetted suppliers across 30+ countries, negotiated and managed on your behalf.' },
  { Icon: Stamp, t: 'Customs Clearance', d: 'Accurate documentation, tariffs and compliance that clear goods without delay.' },
  { Icon: Ship, t: 'Freight & Shipping', d: 'Sea, air and multimodal freight coordinated for cost, speed and reliability.' },
  { Icon: BadgeCheck, t: 'Quality Assurance', d: 'Inspections and standards checks so what ships is exactly what was ordered.' },
  { Icon: Warehouse, t: 'Warehousing', d: 'Secure storage and inventory management ready for onward distribution.' },
  { Icon: Truck, t: 'Distribution', d: 'Last-leg delivery into local markets, integrated with our transport network.' },
]

const REGIONS = ['China', 'India', 'Vietnam', 'UAE', 'Singapore', 'United Kingdom', 'USA', 'Canada']

export function EgImportsPage() {
  const reduce = useReducedMotion()
  const nav = useNavigate()
  useEffect(() => { window.scrollTo(0, 0) }, [])

  const rise = (d = 0) => reduce ? {} : ({
    initial: { opacity: 0, y: 28 }, whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' }, transition: { duration: 0.8, delay: d, ease: EASE },
  })

  return (
    <div className="im" style={{ overflowX: 'hidden', background: '#fff' }}>
      <Header />

      {/* ── HERO ── */}
      <section className="im-hero">
        <div className="im-hero-media">
          <img src={img('photo-1494412574643-ff11b0a5c1c3', 1900)} alt="Global shipping port" decoding="async" />
          <span className="im-hero-veil" aria-hidden />
        </div>
        <div className="im-wrap im-hero-in">
          <motion.nav className="im-crumb" initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
            <Link to="/">Eloma Group</Link><span>/</span><span>Companies</span><span>/</span><em>EG Imports</em>
          </motion.nav>
          <motion.p className="im-eyebrow" initial={reduce ? false : { opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.05, ease: EASE }}>
            <span className="im-eyebrow-dot" />An Eloma Group Company
          </motion.p>
          <motion.h1 className="im-h1" initial={reduce ? false : { opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1, ease: EASE }}>
            Connecting global suppliers<br />to <span className="im-hl">local markets.</span>
          </motion.h1>
          <motion.p className="im-lead" initial={reduce ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: EASE }}>
            End-to-end import operations - sourcing, customs, freight and distribution handled with
            precision, so goods move seamlessly from the world to your door.
          </motion.p>
          <motion.div className="im-cta-row" initial={reduce ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.28, ease: EASE }}>
            <button className="im-btn im-btn-p" onClick={() => nav('/contact#contact-form')}><span>Start importing</span><ArrowUpRight size={17} strokeWidth={2.4} /></button>
            <button className="im-btn im-btn-o" onClick={() => nav('/partners')}>Our partners</button>
          </motion.div>
        </div>
        <div className="im-wrap">
          <motion.div className="im-hero-stats" initial={reduce ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.34, ease: EASE }}>
            {[{ n: '30+', l: 'Source countries' }, { n: '99.2%', l: 'On-time clearance' }, { n: '10k+', l: 'Shipments handled' }, { n: '1', l: 'Point of accountability' }].map(s => (
              <div key={s.l} className="im-hs"><span className="im-hs-n">{s.n}</span><span className="im-hs-l">{s.l}</span></div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── JOURNEY LINE ── */}
      <section className="im-journey">
        <div className="im-wrap">
          <motion.div className="im-sec-head im-jhead" {...rise()}>
            <p className="im-eyebrow"><span className="im-eyebrow-dot" />The import journey</p>
            <h2 className="im-h2">One partner, from origin to destination.</h2>
            <p className="im-sec-p">We carry the complexity of international trade for you - a single accountable team across every border.</p>
          </motion.div>
          <div className="im-flow">
            <span className="im-flow-line" aria-hidden />
            {JOURNEY.map((s, i) => (
              <motion.div key={s.t} className="im-flow-step"
                initial={reduce ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.55, delay: i * 0.1, ease: EASE }}>
                <span className="im-flow-ic"><s.Icon size={26} strokeWidth={1.7} /><i className="im-flow-num">{i + 1}</i></span>
                <h3 className="im-flow-t">{s.t}</h3>
                <p className="im-flow-d">{s.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CAPABILITIES ── */}
      <section className="im-caps">
        <div className="im-wrap">
          <motion.div className="im-sec-head" {...rise()}>
            <p className="im-eyebrow"><span className="im-eyebrow-dot" />What we do</p>
            <h2 className="im-h2">The full import operation, <span className="im-hl">managed.</span></h2>
          </motion.div>
          <div className="im-grid">
            {CAPS.map((c, i) => (
              <motion.article key={c.t} className="im-card"
                initial={reduce ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.55, delay: (i % 3) * 0.07, ease: EASE }}>
                <span className="im-card-ic"><c.Icon size={22} strokeWidth={1.9} /></span>
                <h3 className="im-card-t">{c.t}</h3>
                <p className="im-card-d">{c.d}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOURCE REGIONS ── */}
      <section className="im-reg">
        <div className="im-wrap im-reg-grid">
          <motion.div className="im-reg-media" {...rise()}>
            <img src={img('photo-1578575437130-527eed3abbec', 1200)} alt="Shipping containers at port" decoding="async" loading="lazy" />
            <div className="im-reg-badge"><span className="im-reg-badge-n">30+</span><span className="im-reg-badge-l">countries<br />sourced</span></div>
          </motion.div>
          <motion.div className="im-reg-copy" {...rise(0.1)}>
            <p className="im-eyebrow"><span className="im-eyebrow-dot" />Where we source</p>
            <h2 className="im-h2">A supply network that spans the globe.</h2>
            <p className="im-sec-p">From manufacturing hubs to specialist suppliers, we source across continents - always with the same standard of quality, compliance and reliability.</p>
            <div className="im-regions">
              {REGIONS.map(r => <span key={r} className="im-region">{r}</span>)}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── STATS BAND ── */}
      <section className="im-band">
        <span className="im-band-glow" aria-hidden />
        <div className="im-wrap im-band-grid">
          {[{ n: '30+', l: 'Countries sourced from' }, { n: '99.2%', l: 'On-time customs clearance' }, { n: '10k+', l: 'Shipments handled' }, { n: '1', l: 'Contract, end to end' }].map((s, i) => (
            <motion.div key={s.l} className="im-band-item" initial={reduce ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}>
              <span className="im-band-n">{s.n}</span><span className="im-band-l">{s.l}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── WHY SPLIT ── */}
      <section className="im-why">
        <div className="im-wrap im-why-grid">
          <motion.div className="im-why-copy" {...rise()}>
            <p className="im-eyebrow"><span className="im-eyebrow-dot" />Why choose us</p>
            <h2 className="im-h2">Trade without the risk.</h2>
            <p className="im-sec-p">Importing is full of hidden costs and compliance traps. We carry that complexity for you - one team, one contract, one accountable partner from origin to destination.</p>
            <ul className="im-check">
              {['Vetted, reliable global suppliers', 'Customs and compliance expertise', 'Transparent landed-cost visibility', 'Integrated freight and distribution'].map(b => (
                <li key={b}><span className="im-check-ic"><Check size={15} strokeWidth={3} /></span>{b}</li>
              ))}
            </ul>
          </motion.div>
          <motion.div className="im-why-media" {...rise(0.1)}>
            <img src={img('photo-1600880292203-757bb62b4baf', 1100)} alt="Warehouse and distribution" decoding="async" loading="lazy" />
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="im-cta">
        <span className="im-cta-glow" aria-hidden />
        <motion.div className="im-cta-in" {...rise()}>
          <h2 className="im-cta-h">Source smarter,<br /><span className="im-hl-l">import with ease.</span></h2>
          <p className="im-cta-sub">Tell us what you need to import - we'll map the supply chain end to end.</p>
          <button className="im-btn im-btn-p im-cta-btn" onClick={() => nav('/contact#contact-form')}><span>Start importing</span><ArrowUpRight size={18} strokeWidth={2.4} /></button>
        </motion.div>
      </section>

      <FlyFooter />

      <style>{`
        .im-wrap { max-width: 1720px; margin: 0 auto; }
        .im-hl { color:${BLUE}; }
        .im-hl-l { color:#5AA9E6; }
        .im-eyebrow { display:inline-flex; align-items:center; gap:10px; margin:0; font-family:'Inter',sans-serif; font-weight:700; font-size:clamp(10px,0.8vw,12px); letter-spacing:2.5px; text-transform:uppercase; color:${BLUE}; }
        .im-eyebrow-dot { width:7px; height:7px; border-radius:50%; background:${BLUE}; box-shadow:0 0 0 4px rgba(28,109,181,0.16); flex-shrink:0; }
        .im-h2 { font-family:'Poppins',sans-serif; font-weight:700; font-size:clamp(30px,4.4vw,64px); line-height:1.12; letter-spacing:-0.035em; color:${NAVY}; margin:16px 0 0; padding-bottom:0.06em; }
        .im-sec-head { max-width:900px; margin-bottom:clamp(38px,4.5vw,64px); }
        .im-sec-p { font-family:'Inter',sans-serif; font-size:clamp(15px,1.2vw,18px); line-height:1.8; color:${MUTED}; margin:clamp(16px,1.8vw,24px) 0 0; max-width:60ch; }

        .im-btn { display:inline-flex; align-items:center; gap:9px; cursor:pointer; font-family:'Poppins',sans-serif; font-weight:500; font-size:clamp(14px,1vw,16px); border-radius:12px; padding:15px 28px; border:none; text-decoration:none; transition:transform .25s cubic-bezier(0.16,1,0.3,1), background .25s ease, box-shadow .25s ease, color .25s ease, border-color .25s ease; }
        .im-btn-p { position:relative; overflow:hidden; background:${BLUE}; color:#fff; box-shadow:0 18px 40px -16px rgba(28,109,181,0.7); }
        .im-btn-p span { position:relative; z-index:1; }
        .im-btn-p::after { content:''; position:absolute; top:0; left:-120%; width:55%; height:100%; background:linear-gradient(110deg,transparent,rgba(255,255,255,0.45),transparent); transform:skewX(-18deg); transition:left .7s cubic-bezier(0.16,1,0.3,1); }
        .im-btn-p:hover { transform:translateY(-2px); background:#1a63a4; box-shadow:0 24px 50px -16px rgba(28,109,181,0.85); }
        .im-btn-p:hover::after { left:135%; }
        .im-btn-o { background:rgba(255,255,255,0.12); color:#fff; border:1.5px solid rgba(255,255,255,0.4); backdrop-filter:blur(4px); }
        .im-btn-o:hover { transform:translateY(-2px); background:#fff; color:${DEEP}; border-color:#fff; }

        /* HERO */
        .im-hero { position:relative; padding:clamp(150px,17vw,260px) clamp(24px,5vw,72px) clamp(40px,5vw,68px); overflow:hidden; }
        .im-hero-media { position:absolute; inset:0; z-index:0; }
        .im-hero-media img { width:100%; height:100%; object-fit:cover; display:block; }
        .im-hero-veil { position:absolute; inset:0; background:linear-gradient(105deg, rgba(9,28,46,0.92) 0%, rgba(9,28,46,0.78) 42%, rgba(9,28,46,0.35) 100%), linear-gradient(0deg, rgba(9,28,46,0.6), transparent 40%); }
        .im-hero-in { position:relative; z-index:1; }
        .im-crumb { display:flex; align-items:center; gap:9px; font-family:'Inter',sans-serif; font-size:clamp(11px,0.85vw,13px); color:rgba(255,255,255,0.55); margin-bottom:clamp(18px,2vw,26px); flex-wrap:wrap; }
        .im-crumb a { color:rgba(255,255,255,0.55); text-decoration:none; transition:color .2s ease; }
        .im-crumb a:hover { color:#fff; }
        .im-crumb em { color:#fff; font-style:normal; font-weight:600; }
        .im-h1 { font-family:'Poppins',sans-serif; font-weight:700; font-size:clamp(40px,6.4vw,98px); line-height:1.06; letter-spacing:-0.04em; color:#fff; margin:clamp(16px,2vw,22px) 0 0; padding-bottom:0.04em; }
        .im-hl { color:#7FC0F5; }
        .im-h1 .im-hl { color:#7FC0F5; }
        .im-lead { font-family:'Inter',sans-serif; font-size:clamp(15px,1.25vw,19px); line-height:1.8; color:rgba(255,255,255,0.75); max-width:58ch; margin:clamp(18px,2vw,26px) 0 0; }
        .im-cta-row { display:flex; flex-wrap:wrap; gap:13px; margin-top:clamp(26px,3vw,36px); }
        .im-hero-stats { display:grid; grid-template-columns:repeat(4,1fr); gap:clamp(16px,2vw,28px); margin-top:clamp(40px,5vw,68px); position:relative; z-index:1; border-top:1px solid rgba(255,255,255,0.2); padding-top:clamp(24px,3vw,36px); }
        .im-hs { display:flex; flex-direction:column; gap:6px; }
        .im-hs + .im-hs { padding-left:clamp(16px,2vw,28px); border-left:1px solid rgba(255,255,255,0.16); }
        .im-hs-n { font-family:'Poppins',sans-serif; font-weight:700; font-size:clamp(28px,3.2vw,52px); line-height:0.9; letter-spacing:-0.04em; color:#fff; }
        .im-hs-l { font-family:'Inter',sans-serif; font-size:clamp(11px,0.9vw,14px); color:rgba(255,255,255,0.6); letter-spacing:0.3px; }

        /* JOURNEY */
        .im-journey { background:linear-gradient(180deg,#ffffff,#f2f7fb); padding:clamp(60px,7vw,120px) clamp(24px,5vw,72px); }
        .im-jhead { text-align:center; margin-left:auto; margin-right:auto; }
        .im-jhead .im-eyebrow { justify-content:center; }
        .im-jhead .im-sec-p { margin-left:auto; margin-right:auto; }
        .im-flow { position:relative; display:grid; grid-template-columns:repeat(4,1fr); gap:clamp(18px,2vw,32px); text-align:center; }
        .im-flow-line { position:absolute; top:38px; left:11%; right:11%; height:2px; background:repeating-linear-gradient(90deg, ${BLUE} 0 10px, transparent 10px 20px); opacity:0.4; pointer-events:none; }
        .im-flow-step { position:relative; display:flex; flex-direction:column; align-items:center; }
        .im-flow-ic { position:relative; z-index:1; display:flex; align-items:center; justify-content:center; width:76px; height:76px; border-radius:50%; background:#fff; border:2px solid rgba(28,109,181,0.25); color:${BLUE}; margin-bottom:clamp(18px,2vw,26px); box-shadow:0 16px 34px -18px rgba(28,109,181,0.5); transition:transform .4s cubic-bezier(0.16,1,0.3,1), background .35s ease, color .35s ease, border-color .35s ease; }
        .im-flow-step:hover .im-flow-ic { transform:translateY(-4px); background:${BLUE}; color:#fff; border-color:${BLUE}; }
        .im-flow-num { position:absolute; top:-6px; right:-6px; width:24px; height:24px; border-radius:50%; background:${NAVY}; color:#fff; font-family:'Poppins',sans-serif; font-style:normal; font-weight:700; font-size:12px; display:flex; align-items:center; justify-content:center; }
        .im-flow-t { font-family:'Poppins',sans-serif; font-weight:600; font-size:clamp(19px,1.7vw,26px); letter-spacing:-0.02em; color:${NAVY}; margin:0 0 10px; }
        .im-flow-d { font-family:'Inter',sans-serif; font-size:clamp(13.5px,1vw,15px); line-height:1.7; color:${MUTED}; margin:0; max-width:30ch; }

        /* CAPABILITIES */
        .im-caps { background:#fff; padding:clamp(60px,7vw,120px) clamp(24px,5vw,72px); }
        .im-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:clamp(14px,1.4vw,20px); }
        .im-card { position:relative; overflow:hidden; background:linear-gradient(168deg,#ffffff,#f2f7fb); border:1px solid rgba(19,41,61,0.1); border-radius:20px; padding:clamp(26px,2.6vw,38px); transition:transform .45s cubic-bezier(0.16,1,0.3,1), border-color .45s ease, box-shadow .45s ease; }
        .im-card::before { content:''; position:absolute; top:0; left:0; right:0; height:3px; background:${BLUE}; transform:scaleX(0); transform-origin:left; transition:transform .45s cubic-bezier(0.16,1,0.3,1); }
        .im-card:hover { transform:translateY(-6px); border-color:rgba(28,109,181,0.5); box-shadow:0 40px 80px -50px rgba(19,41,61,0.3); }
        .im-card:hover::before { transform:scaleX(1); }
        .im-card-ic { display:inline-flex; align-items:center; justify-content:center; width:52px; height:52px; border-radius:14px; background:rgba(28,109,181,0.12); color:${BLUE}; margin-bottom:clamp(18px,2vw,24px); transition:transform .45s cubic-bezier(0.16,1,0.3,1), background .4s ease, color .4s ease; }
        .im-card:hover .im-card-ic { transform:translateY(-3px) rotate(-6deg); background:${BLUE}; color:#fff; }
        .im-card-t { font-family:'Poppins',sans-serif; font-weight:600; font-size:clamp(18px,1.6vw,24px); letter-spacing:-0.02em; color:${NAVY}; margin:0 0 10px; }
        .im-card-d { font-family:'Inter',sans-serif; font-size:clamp(13.5px,1vw,15.5px); line-height:1.75; color:${MUTED}; margin:0; }

        /* SOURCE REGIONS */
        .im-reg { background:linear-gradient(180deg,#ffffff,#f2f7fb); padding:clamp(60px,7vw,120px) clamp(24px,5vw,72px); }
        .im-reg-grid { display:grid; grid-template-columns:1fr 1fr; gap:clamp(32px,5vw,72px); align-items:center; }
        .im-reg-media { position:relative; border-radius:24px; overflow:hidden; aspect-ratio:5/4; box-shadow:0 44px 84px -48px rgba(19,41,61,0.45); }
        .im-reg-media img { width:100%; height:100%; object-fit:cover; display:block; }
        .im-reg-badge { position:absolute; bottom:20px; left:20px; display:flex; align-items:center; gap:12px; background:rgba(12,44,70,0.9); backdrop-filter:blur(8px); border-radius:16px; padding:14px 20px; }
        .im-reg-badge-n { font-family:'Poppins',sans-serif; font-weight:700; font-size:clamp(28px,2.6vw,40px); color:#7FC0F5; letter-spacing:-0.03em; line-height:1; }
        .im-reg-badge-l { font-family:'Inter',sans-serif; font-size:12px; line-height:1.3; color:rgba(255,255,255,0.8); text-transform:uppercase; letter-spacing:1px; }
        .im-regions { display:flex; flex-wrap:wrap; gap:10px; margin-top:clamp(24px,3vw,34px); }
        .im-region { font-family:'Inter',sans-serif; font-size:clamp(13px,1.05vw,15px); font-weight:500; color:${NAVY}; padding:9px 18px; background:#fff; border:1px solid rgba(19,41,61,0.12); border-radius:999px; transition:border-color .3s ease, color .3s ease, transform .3s ease; }
        .im-region:hover { border-color:${BLUE}; color:${BLUE}; transform:translateY(-2px); }

        /* STATS BAND */
        .im-band { position:relative; overflow:hidden; background:${DEEP}; padding:clamp(52px,6vw,92px) clamp(24px,5vw,72px); }
        .im-band-glow { position:absolute; top:-160px; left:8%; width:520px; height:520px; border-radius:50%; background:radial-gradient(circle, rgba(28,109,181,0.4), transparent 62%); pointer-events:none; }
        .im-band-grid { position:relative; z-index:1; display:grid; grid-template-columns:repeat(4,1fr); gap:clamp(20px,2vw,32px); }
        .im-band-item { text-align:center; display:flex; flex-direction:column; gap:10px; align-items:center; }
        .im-band-item + .im-band-item { border-left:1px solid rgba(255,255,255,0.12); }
        .im-band-n { font-family:'Poppins',sans-serif; font-weight:700; font-size:clamp(36px,4.2vw,64px); line-height:0.9; letter-spacing:-0.045em; color:#7FC0F5; }
        .im-band-l { font-family:'Inter',sans-serif; font-size:clamp(11px,0.9vw,14px); color:rgba(255,255,255,0.6); letter-spacing:0.3px; }

        /* WHY */
        .im-why { background:#fff; padding:clamp(60px,7vw,120px) clamp(24px,5vw,72px); }
        .im-why-grid { display:grid; grid-template-columns:1fr 1fr; gap:clamp(32px,5vw,72px); align-items:center; }
        .im-why-media { border-radius:24px; overflow:hidden; aspect-ratio:5/4; box-shadow:0 44px 84px -48px rgba(19,41,61,0.45); }
        .im-why-media img { width:100%; height:100%; object-fit:cover; display:block; }
        .im-check { list-style:none; margin:clamp(24px,3vw,34px) 0 0; padding:0; display:flex; flex-direction:column; gap:15px; }
        .im-check li { display:flex; align-items:center; gap:13px; font-family:'Poppins',sans-serif; font-weight:500; font-size:clamp(15px,1.2vw,18px); color:${NAVY}; }
        .im-check-ic { display:inline-flex; align-items:center; justify-content:center; width:28px; height:28px; border-radius:8px; background:rgba(28,109,181,0.14); color:${BLUE}; flex-shrink:0; }

        /* CTA */
        .im-cta { position:relative; overflow:hidden; background:${DEEP}; padding:clamp(72px,10vw,140px) clamp(24px,5vw,72px); text-align:center; }
        .im-cta-glow { position:absolute; bottom:-140px; right:8%; width:560px; height:560px; border-radius:50%; background:radial-gradient(circle, rgba(28,109,181,0.35), transparent 62%); pointer-events:none; }
        .im-cta-in { position:relative; z-index:1; max-width:820px; margin:0 auto; }
        .im-cta-h { font-family:'Poppins',sans-serif; font-weight:700; font-size:clamp(34px,5.6vw,84px); line-height:1.1; letter-spacing:-0.04em; color:#fff; margin:0; padding-bottom:0.04em; }
        .im-cta-sub { font-family:'Inter',sans-serif; font-size:clamp(14px,1.15vw,17px); line-height:1.8; color:rgba(255,255,255,0.6); max-width:480px; margin:clamp(18px,2vw,26px) auto clamp(28px,3.5vw,40px); }
        .im-cta-btn { padding:16px 36px; }

        /* responsive */
        @media (max-width:1024px){
          .im-flow { grid-template-columns:1fr 1fr; gap:clamp(32px,5vw,44px); }
          .im-flow-line { display:none; }
          .im-grid { grid-template-columns:1fr 1fr; }
          .im-reg-grid { grid-template-columns:1fr; }
          .im-reg-media { order:-1; }
          .im-why-grid { grid-template-columns:1fr; }
          .im-why-media { order:-1; }
        }
        @media (max-width:600px){
          .im-hero-stats { grid-template-columns:1fr 1fr; gap:26px 16px; }
          .im-hs:nth-child(3){ border-left:none; padding-left:0; }
          .im-flow { grid-template-columns:1fr; }
          .im-grid { grid-template-columns:1fr; }
          .im-band-grid { grid-template-columns:1fr 1fr; gap:30px 20px; }
          .im-band-item:nth-child(3){ border-left:none; }
        }
        @media (max-width:400px){
          .im-band-grid { grid-template-columns:1fr; }
          .im-band-item + .im-band-item { border-left:none; }
        }
        @media (min-width:1920px){
          .im-wrap { max-width:1860px; }
          .im-h1 { font-size:110px; }
          .im-h2 { font-size:74px; }
          .im-lead,.im-sec-p { font-size:20px; }
        }
        @media (min-width:2560px){
          .im-wrap { max-width:2360px; }
          .im-h1 { font-size:148px; }
          .im-h2 { font-size:100px; }
          .im-card-d,.im-flow-d { font-size:18px; }
          .im-band-n { font-size:80px; }
        }
        @media (prefers-reduced-motion: reduce){
          .im-btn,.im-card,.im-card-ic,.im-flow-ic,.im-region { transition:none; }
        }
      `}</style>
    </div>
  )
}
