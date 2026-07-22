import { useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Check, Truck, Package, Route, Snowflake, MapPin, ShieldCheck } from 'lucide-react'
import { useNavigate, Link } from 'react-router-dom'
import { Header } from '../../components/Header/Header'
import { FlyFooter } from '../../components/FlyFooter'

/* ═══════════════════════════════════════════════════
   EG TRANSPORT - BIVRY - "Cinematic Freight" (light)
   Photo-led hero + rich editorial body: sticky-intro
   capability grid, connected process timeline, fleet
   feature and a coverage band.
   ═══════════════════════════════════════════════════ */

const INK   = '#0B1B24'
const AMBER = '#3cb98c'
const AMBER2 = '#3cb98c'
const STEEL = 'rgba(11,27,36,0.56)'
const LIGHT = '#F2F5F6'
const EASE  = [0.16, 1, 0.3, 1] as [number, number, number, number]

const SERVICES = [
  { Icon: Package, t: 'Freight Transport', d: 'Full-load and part-load freight moved safely across metro and regional corridors.' },
  { Icon: Truck, t: 'Fleet Management', d: 'A modern, maintained fleet ready to move any load, monitored around the clock.' },
  { Icon: Route, t: 'Route Optimisation', d: 'Smart planning that cuts kilometres, fuel and time without cutting reliability.' },
  { Icon: Snowflake, t: 'Cold Chain', d: 'Temperature-controlled transport that holds sensitive goods in perfect condition.' },
  { Icon: MapPin, t: 'Last-Mile Delivery', d: 'Fast, tracked final-leg delivery that gets goods to the door on schedule.' },
  { Icon: ShieldCheck, t: 'Safety & Compliance', d: 'Rigorous safety and full chain-of-responsibility compliance on every journey.' },
]

const COVERAGE = ['Melbourne', 'Sydney', 'Brisbane', 'Adelaide', 'Canberra', 'Regional VIC', 'Regional NSW', 'Interstate']

export function BivryPage() {
  const reduce = useReducedMotion()
  const nav = useNavigate()
  useEffect(() => { window.scrollTo(0, 0) }, [])

  const rise = (d = 0) => reduce ? {} : ({
    initial: { opacity: 0, y: 28 }, whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' }, transition: { duration: 0.8, delay: d, ease: EASE },
  })

  return (
    <div className="bv" style={{ overflowX: 'hidden', background: '#fff' }}>
      <Header />

      {/* ── HERO (cinematic photo) ── */}
      <section className="bv-hero">
        <img className="bv-hero-img" src="/images/bivry-hero.jpg" alt="BIVRY freight road-train truck on an Australian highway" decoding="async" />
        <span className="bv-hero-scrim" aria-hidden />
        <div className="bv-wrap bv-hero-in">
          <motion.nav className="bv-crumb" initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
            <Link to="/">Eloma Group</Link><span>/</span><span>Companies</span><span>/</span><em>EG Transport - BIVRY</em>
          </motion.nav>
          <motion.p className="bv-eyebrow" initial={reduce ? false : { opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.05, ease: EASE }}>
            <span className="bv-eyebrow-dot" />EG Transport &middot; An Eloma Group Company
          </motion.p>
          <motion.h1 className="bv-h1" initial={reduce ? false : { opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1, ease: EASE }}>
            Freight that arrives<br /><span className="bv-hl">on time,</span> every time.
          </motion.h1>
          <motion.p className="bv-lead" initial={reduce ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: EASE }}>
            BIVRY is EG Transport's road-freight operation - a modern fleet run on live dispatch,
            disciplined routing and relentless on-time-in-full performance across the country.
          </motion.p>
          <motion.div className="bv-cta-row" initial={reduce ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.28, ease: EASE }}>
            <button className="bv-btn bv-btn-p" onClick={() => nav('/contact#contact-form')}><span>Book transport</span><ArrowUpRight size={17} strokeWidth={2.4} /></button>
            <button className="bv-btn bv-btn-ghost" onClick={() => nav('/contact#contact-form')}>Request a quote</button>
          </motion.div>
        </div>
      </section>

      {/* stats bar */}
      <div className="bv-wrap bv-stats-wrap">
        <motion.div className="bv-stats" initial={reduce ? false : { opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: EASE }}>
          {[{ n: '99.4%', l: 'On-time-in-full' }, { n: '2M+', l: 'Kilometres driven' }, { n: '24/7', l: 'Live dispatch' }, { n: '0', l: 'Safety compromise' }].map(s => (
            <div key={s.l} className="bv-stat">
              <span className="bv-stat-n">{s.n}</span>
              <span className="bv-stat-l">{s.l}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── CAPABILITIES (sticky intro + cards) ── */}
      <section className="bv-cap">
        <div className="bv-wrap bv-cap-grid">
          <motion.div className="bv-cap-intro" {...rise()}>
            <p className="bv-eyebrow bv-eyebrow-d"><span className="bv-eyebrow-dot" />What we move</p>
            <h2 className="bv-h2">A full logistics capability, moved with precision.</h2>
            <p className="bv-sec-p">From long-haul freight to the final mile - one operator, total visibility and a single standard of reliability across every service.</p>
            <div className="bv-cap-badge">
              <span className="bv-cap-badge-n">06</span>
              <span className="bv-cap-badge-l">core services,<br />one accountable team</span>
            </div>
          </motion.div>

          <div className="bv-cap-cards">
            {SERVICES.map((s, i) => (
              <motion.article key={s.t} className="bv-cap-card"
                initial={reduce ? false : { opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.5, delay: (i % 2) * 0.07, ease: EASE }}>
                <span className="bv-cap-bar" aria-hidden />
                <div className="bv-cap-top">
                  <span className="bv-cap-ic"><s.Icon size={22} strokeWidth={1.9} /></span>
                  <span className="bv-cap-n">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="bv-cap-t">{s.t}</h3>
                <p className="bv-cap-d">{s.d}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROMISE (editorial statement) ── */}
      <section className="bv-promise">
        <div className="bv-wrap bv-promise-in">
          <motion.p className="bv-eyebrow bv-eyebrow-d bv-promise-eb" {...rise()}><span className="bv-eyebrow-dot" />The promise</motion.p>
          <motion.blockquote className="bv-promise-q" {...rise(0.05)}>
            In transport, a late load breaks trust. So we plan every route to <span className="bv-hl">never have one.</span>
          </motion.blockquote>
          <motion.p className="bv-promise-by" {...rise(0.1)}>
            Reliability isn't a feature at BIVRY - it's the whole product. Every consignment is planned, dispatched and delivered by one accountable team that treats your deadline as its own.
          </motion.p>
        </div>
      </section>

      {/* ── FLEET FEATURE ── */}
      <section className="bv-fleet">
        <div className="bv-wrap bv-fleet-grid">
          <motion.div className="bv-fleet-media" {...rise()}>
            <img src="/images/bivry-why.webp" alt="BIVRY logistics operations" decoding="async" loading="lazy" />
            <div className="bv-fleet-tag"><span className="bv-fleet-tag-n">GPS</span><span className="bv-fleet-tag-l">Every vehicle, tracked live</span></div>
            <div className="bv-fleet-chip"><span className="bv-fleet-chip-n">99.4%</span><span className="bv-fleet-chip-l">on-time-in-full</span></div>
          </motion.div>
          <motion.div className="bv-fleet-copy" {...rise(0.1)}>
            <p className="bv-eyebrow bv-eyebrow-d"><span className="bv-eyebrow-dot" />Why BIVRY</p>
            <h2 className="bv-h2">The right fleet, the right tech, the right team.</h2>
            <p className="bv-sec-p">BIVRY is engineered around on-time-in-full performance - real-time tracking, disciplined route planning and a team that treats every deadline as sacred.</p>
            <ul className="bv-check">
              {['Modern, well-maintained fleet', 'Real-time GPS tracking on every load', 'Chain-of-responsibility compliance', 'Metro, regional and cold-chain coverage'].map(b => (
                <li key={b}><span className="bv-check-ic"><Check size={15} strokeWidth={3} /></span>{b}</li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* ── COVERAGE BAND ── */}
      <section className="bv-cov">
        <div className="bv-wrap bv-cov-in">
          <motion.div className="bv-cov-copy" {...rise()}>
            <p className="bv-eyebrow bv-eyebrow-d"><span className="bv-eyebrow-dot" />Where we run</p>
            <h2 className="bv-h2">Coverage that keeps the country moving.</h2>
            <p className="bv-sec-p">Metro, regional and interstate corridors - with cold-chain capability wherever it's needed.</p>
          </motion.div>
          <motion.div className="bv-cov-side" {...rise(0.1)}>
            <div className="bv-cov-chips">
              {COVERAGE.map(c => <span key={c} className="bv-cov-chip"><MapPin size={13} strokeWidth={2.2} />{c}</span>)}
            </div>
            <div className="bv-cov-figs">
              <div className="bv-cov-fig"><span className="bv-cov-fig-n">8+</span><span className="bv-cov-fig-l">Hubs & corridors</span></div>
              <div className="bv-cov-fig"><span className="bv-cov-fig-n">2M+</span><span className="bv-cov-fig-l">Kilometres a year</span></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA (light) ── */}
      <section className="bv-cta">
        <div className="bv-wrap">
          <motion.div className="bv-cta-in" {...rise()}>
            <div className="bv-cta-copy">
              <p className="bv-eyebrow bv-eyebrow-d"><span className="bv-eyebrow-dot" />EG Transport - BIVRY</p>
              <h2 className="bv-cta-h">Have a load that needs moving?</h2>
            </div>
            <div className="bv-cta-act">
              <p className="bv-cta-sub">Tell us your route and load. We'll keep it moving, tracked all the way to the door.</p>
              <button className="bv-btn bv-btn-p" onClick={() => nav('/contact#contact-form')}><span>Book transport</span><ArrowUpRight size={18} strokeWidth={2.4} /></button>
            </div>
          </motion.div>
        </div>
      </section>

      <FlyFooter />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@500;600;700&family=IBM+Plex+Mono:wght@500;600&display=swap');
        .bv-wrap { max-width: none; margin: 0 auto; }
        .bv-hl { color:${AMBER}; }
        .bv-eyebrow { display:inline-flex; align-items:center; gap:10px; margin:0; font-family:'IBM Plex Mono',monospace; font-weight:600; font-size:clamp(10px,0.8vw,12px); letter-spacing:2px; text-transform:uppercase; color:${AMBER2}; }
        .bv-eyebrow-dot { width:7px; height:7px; border-radius:50%; background:${AMBER2}; box-shadow:0 0 0 4px rgba(60,185,140,0.2); flex-shrink:0; }
        .bv-eyebrow-d { color:#3cb98c; }
        .bv-eyebrow-ink { color:${INK}; }
        .bv-hero-in .bv-eyebrow { color:#fff; }
        .bv-dot-ink { background:${INK}; box-shadow:0 0 0 4px rgba(11,27,36,0.14); }
        .bv-h2 { font-family:'Oswald',sans-serif; font-weight:600; font-size:clamp(30px,4.2vw,60px); line-height:1.04; letter-spacing:0.005em; text-transform:uppercase; color:${INK}; margin:16px 0 0; }
        .bv-sec-head { max-width:900px; margin-bottom:clamp(38px,4.5vw,64px); }
        .bv-sec-p { font-family:'Inter',sans-serif; font-size:clamp(15px,1.2vw,18px); line-height:1.8; color:${STEEL}; margin:clamp(16px,1.8vw,24px) 0 0; max-width:52ch; }

        .bv-btn { display:inline-flex; align-items:center; gap:9px; cursor:pointer; font-family:'Oswald',sans-serif; font-weight:600; font-size:clamp(13px,1vw,15px); letter-spacing:1.2px; text-transform:uppercase; border-radius:5px; padding:15px 26px; border:none; text-decoration:none; transition:transform .25s cubic-bezier(0.16,1,0.3,1), background .25s ease, box-shadow .25s ease, color .25s ease, border-color .25s ease; }
        .bv-btn-p { position:relative; overflow:hidden; background:${AMBER}; color:#fff; box-shadow:0 18px 40px -16px rgba(60,185,140,0.6); }
        .bv-btn-p span { position:relative; z-index:1; }
        .bv-btn-p::after { content:''; position:absolute; top:0; left:-120%; width:55%; height:100%; background:linear-gradient(110deg,transparent,rgba(255,255,255,0.5),transparent); transform:skewX(-18deg); transition:left .7s cubic-bezier(0.16,1,0.3,1); }
        .bv-btn-p:hover { transform:translateY(-2px); background:${AMBER2}; box-shadow:0 24px 50px -16px rgba(60,185,140,0.8); }
        .bv-btn-p:hover::after { left:135%; }
        .bv-btn-ghost { background:rgba(255,255,255,0.12); color:#fff; border:1.5px solid rgba(255,255,255,0.5); backdrop-filter:blur(4px); }
        .bv-btn-ghost:hover { transform:translateY(-2px); background:#fff; color:${INK}; border-color:#fff; }
        .bv-btn-ink { background:${INK}; color:#fff; }
        .bv-btn-ink:hover { transform:translateY(-2px); background:#fff; color:${INK}; }

        /* HERO */
        .bv-hero { position:relative; overflow:hidden; min-height:100vh; min-height:100dvh; display:flex; align-items:flex-end; text-align:center; padding:clamp(120px,13vw,180px) 45px clamp(72px,9vw,120px); }
        .bv-hero-img { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; }
        .bv-hero-scrim { position:absolute; inset:0; background:linear-gradient(180deg, rgba(11,27,36,0.62) 0%, rgba(11,27,36,0.58) 38%, rgba(11,27,36,0.78) 72%, rgba(11,27,36,0.9) 100%); }
        .bv-hero-in { position:relative; z-index:1; width:100%; }
        .bv-crumb { display:flex; align-items:center; justify-content:center; gap:9px; font-family:'IBM Plex Mono',monospace; font-size:clamp(10px,0.82vw,12px); color:rgba(255,255,255,0.62); margin-bottom:clamp(20px,2.2vw,28px); flex-wrap:wrap; }
        .bv-crumb a { color:rgba(255,255,255,0.62); text-decoration:none; transition:color .2s ease; }
        .bv-crumb a:hover { color:${AMBER2}; }
        .bv-crumb em { color:#fff; font-style:normal; }
        .bv-h1 { font-family:'Oswald',sans-serif; font-weight:600; font-size:clamp(36px,5.4vw,82px); line-height:0.98; letter-spacing:0.005em; text-transform:uppercase; color:#fff; margin:clamp(14px,2vw,20px) auto 0; max-width:24ch; text-shadow:0 2px 30px rgba(0,0,0,0.25); }
        .bv-lead { font-family:'Inter',sans-serif; font-size:clamp(15px,1.2vw,18px); line-height:1.8; color:rgba(255,255,255,0.82); max-width:52ch; margin:clamp(18px,2vw,26px) auto 0; }
        .bv-cta-row { display:flex; flex-wrap:wrap; justify-content:center; gap:13px; margin-top:clamp(26px,3vw,36px); }

        /* stats bar */
        .bv-stats-wrap { padding:0 15px; }
        .bv-stats { position:relative; z-index:2; margin-top:clamp(-52px,-4vw,-40px); background:#fff; border:1px solid rgba(11,27,36,0.08); border-radius:16px; box-shadow:0 40px 80px -50px rgba(11,27,36,0.4); display:grid; grid-template-columns:repeat(4,1fr); }
        .bv-stat { display:flex; flex-direction:column; gap:6px; padding:clamp(24px,2.6vw,36px) clamp(22px,2.4vw,36px); }
        .bv-stat + .bv-stat { border-left:1px solid rgba(11,27,36,0.1); }
        .bv-stat-n { font-family:'Oswald',sans-serif; font-weight:700; font-size:clamp(30px,3.4vw,54px); line-height:0.9; letter-spacing:0.01em; color:${AMBER}; }
        .bv-stat-l { font-family:'IBM Plex Mono',monospace; font-size:clamp(10px,0.85vw,12.5px); letter-spacing:0.5px; text-transform:uppercase; color:${STEEL}; }

        /* CAPABILITIES */
        .bv-cap { background:#fff; padding:clamp(64px,8vw,130px) 45px clamp(60px,7vw,120px); }
        .bv-cap-grid { display:grid; grid-template-columns:0.82fr 1.18fr; gap:clamp(36px,5vw,80px); align-items:start; }
        .bv-cap-intro { position:sticky; top:100px; }
        .bv-cap-badge { display:inline-flex; align-items:center; gap:16px; margin-top:clamp(28px,3vw,40px); padding:16px 22px; background:${LIGHT}; border-radius:14px; }
        .bv-cap-badge-n { font-family:'Oswald',sans-serif; font-weight:700; font-size:clamp(34px,3.6vw,52px); line-height:0.9; color:${AMBER}; }
        .bv-cap-badge-l { font-family:'Inter',sans-serif; font-size:clamp(12px,1vw,14px); line-height:1.5; color:${STEEL}; }
        .bv-cap-cards { display:grid; grid-template-columns:1fr 1fr; gap:clamp(14px,1.4vw,20px); }
        .bv-cap-card { position:relative; overflow:hidden; background:${LIGHT}; border:1px solid rgba(11,27,36,0.08); border-radius:18px; padding:clamp(24px,2.4vw,34px); transition:transform .45s cubic-bezier(0.16,1,0.3,1), background .4s ease, box-shadow .45s ease; }
        .bv-cap-bar { position:absolute; top:0; left:0; right:0; height:3px; background:${AMBER}; transform:scaleX(0); transform-origin:left; transition:transform .45s cubic-bezier(0.16,1,0.3,1); }
        .bv-cap-card:hover { transform:translateY(-6px); background:#fff; box-shadow:0 40px 80px -50px rgba(11,27,36,0.32); }
        .bv-cap-card:hover .bv-cap-bar { transform:scaleX(1); }
        .bv-cap-top { display:flex; align-items:center; justify-content:space-between; margin-bottom:clamp(18px,2vw,26px); }
        .bv-cap-ic { display:inline-flex; align-items:center; justify-content:center; width:52px; height:52px; border-radius:14px; background:rgba(60,185,140,0.12); color:#3cb98c; transition:transform .45s cubic-bezier(0.16,1,0.3,1), background .4s ease, color .4s ease; }
        .bv-cap-card:hover .bv-cap-ic { transform:translateY(-3px) rotate(-6deg); background:${AMBER}; color:#fff; }
        .bv-cap-n { font-family:'IBM Plex Mono',monospace; font-weight:600; font-size:13px; color:rgba(11,27,36,0.3); }
        .bv-cap-t { font-family:'Oswald',sans-serif; font-weight:600; font-size:clamp(19px,1.8vw,27px); text-transform:uppercase; letter-spacing:0.01em; color:${INK}; margin:0 0 10px; }
        .bv-cap-d { font-family:'Inter',sans-serif; font-size:clamp(13.5px,1vw,15px); line-height:1.7; color:${STEEL}; margin:0; }

        /* PROMISE */
        .bv-promise { background:${LIGHT}; padding:clamp(72px,9vw,150px) 45px; }
        .bv-promise-in { max-width:1200px; margin:0 auto; }
        .bv-promise-eb { justify-content:flex-start; }
        .bv-promise-q { margin:clamp(22px,2.6vw,34px) 0 0; font-family:'Oswald',sans-serif; font-weight:600; font-size:clamp(30px,4.8vw,74px); line-height:1.06; text-transform:uppercase; letter-spacing:0.005em; color:${INK}; }
        .bv-promise-by { margin:clamp(26px,3vw,40px) 0 0; font-family:'Inter',sans-serif; font-size:clamp(15px,1.3vw,20px); line-height:1.8; color:${STEEL}; max-width:64ch; }

        /* FLEET FEATURE */
        .bv-fleet { background:#fff; padding:clamp(60px,7vw,120px) 45px; }
        .bv-fleet-grid { display:grid; grid-template-columns:1fr 1fr; gap:clamp(32px,5vw,80px); align-items:center; }
        .bv-fleet-media { position:relative; border-radius:16px; overflow:hidden; aspect-ratio:4/5; box-shadow:0 44px 84px -48px rgba(11,27,36,0.5); }
        .bv-fleet-media img { width:100%; height:100%; object-fit:cover; object-position:center top; display:block; }
        .bv-fleet-tag { position:absolute; left:clamp(14px,1.6vw,22px); bottom:clamp(14px,1.6vw,22px); display:flex; align-items:center; gap:12px; background:rgba(11,27,36,0.85); backdrop-filter:blur(8px); border-radius:11px; padding:11px 16px; }
        .bv-fleet-tag-n { font-family:'IBM Plex Mono',monospace; font-weight:600; font-size:13px; letter-spacing:1px; color:${AMBER2}; }
        .bv-fleet-tag-l { font-family:'Inter',sans-serif; font-size:12px; color:rgba(255,255,255,0.8); }
        .bv-fleet-chip { position:absolute; right:clamp(14px,1.6vw,22px); top:clamp(14px,1.6vw,22px); display:flex; flex-direction:column; background:#fff; border-radius:12px; padding:12px 16px; box-shadow:0 22px 46px -24px rgba(11,27,36,0.5); }
        .bv-fleet-chip-n { font-family:'Oswald',sans-serif; font-weight:700; font-size:clamp(18px,1.7vw,24px); color:${AMBER}; line-height:1; }
        .bv-fleet-chip-l { font-family:'IBM Plex Mono',monospace; font-size:10px; letter-spacing:0.5px; color:${STEEL}; margin-top:4px; }
        .bv-check { list-style:none; margin:clamp(24px,3vw,34px) 0 0; padding:0; display:flex; flex-direction:column; gap:15px; }
        .bv-check li { display:flex; align-items:center; gap:13px; font-family:'Inter',sans-serif; font-weight:500; font-size:clamp(15px,1.2vw,18px); color:${INK}; }
        .bv-check-ic { display:inline-flex; align-items:center; justify-content:center; width:28px; height:28px; border-radius:8px; background:rgba(60,185,140,0.16); color:#3cb98c; flex-shrink:0; }

        /* COVERAGE */
        .bv-cov { background:${LIGHT}; padding:clamp(60px,7vw,120px) 45px; }
        .bv-cov-in { display:grid; grid-template-columns:0.9fr 1.1fr; gap:clamp(32px,5vw,80px); align-items:center; }
        .bv-cov-chips { display:flex; flex-wrap:wrap; gap:10px; }
        .bv-cov-chip { display:inline-flex; align-items:center; gap:7px; font-family:'Inter',sans-serif; font-weight:500; font-size:clamp(13px,1vw,15px); color:${INK}; background:#fff; border:1px solid rgba(11,27,36,0.1); border-radius:999px; padding:9px 16px; transition:border-color .3s ease, color .3s ease; }
        .bv-cov-chip svg { color:${AMBER}; }
        .bv-cov-chip:hover { border-color:${AMBER}; color:#3cb98c; }
        .bv-cov-figs { display:flex; gap:clamp(24px,3vw,44px); margin-top:clamp(26px,3vw,38px); }
        .bv-cov-fig { border-left:3px solid ${AMBER}; padding-left:clamp(14px,1.6vw,22px); }
        .bv-cov-fig-n { display:block; font-family:'Oswald',sans-serif; font-weight:700; font-size:clamp(34px,4vw,60px); line-height:0.9; color:${INK}; }
        .bv-cov-fig-l { display:block; font-family:'Inter',sans-serif; font-size:clamp(12px,1vw,14px); color:${STEEL}; margin-top:6px; }

        /* CTA (light, full-width closing band) */
        .bv-cta { position:relative; background:#fff; border-top:1px solid rgba(11,27,36,0.1); padding:clamp(64px,8vw,128px) 45px; }
        .bv-cta::before { content:''; position:absolute; top:-1px; left:15px; width:64px; height:3px; background:${AMBER}; }
        .bv-cta-in { display:grid; grid-template-columns:1.15fr 0.85fr; gap:clamp(28px,4vw,72px); align-items:end; }
        .bv-cta-h { font-family:'Oswald',sans-serif; font-weight:600; font-size:clamp(34px,4.8vw,76px); line-height:0.98; text-transform:uppercase; letter-spacing:0.005em; color:${INK}; margin:16px 0 0; }
        .bv-cta-act { display:flex; flex-direction:column; align-items:flex-start; gap:clamp(20px,2.4vw,28px); padding-bottom:6px; }
        .bv-cta-sub { font-family:'Inter',sans-serif; font-size:clamp(14px,1.15vw,17px); line-height:1.75; color:${STEEL}; margin:0; max-width:42ch; }

        /* responsive */
        @media (max-width:1024px){
          .bv-cap-grid { grid-template-columns:1fr; gap:clamp(32px,5vw,44px); }
          .bv-cap-intro { position:static; }
          .bv-fleet-grid { grid-template-columns:1fr; }
          .bv-fleet-media { order:-1; }
          .bv-cov-in { grid-template-columns:1fr; gap:clamp(28px,5vw,40px); }
          .bv-cta-in { grid-template-columns:1fr; align-items:start; gap:clamp(24px,5vw,36px); }
        }
        @media (max-width:600px){
          .bv-stats { grid-template-columns:1fr 1fr; }
          .bv-stat:nth-child(3){ border-left:none; }
          .bv-stat:nth-child(n+3){ border-top:1px solid rgba(11,27,36,0.1); }
          .bv-cap-cards { grid-template-columns:1fr; }
          .bv-cov-figs { gap:24px; }
        }
        @media (min-width:1920px){
          .bv-wrap { max-width:none; }
          .bv-h1 { font-size:92px; }
          .bv-h2 { font-size:70px; }
          .bv-lead,.bv-sec-p { font-size:20px; }
        }
        @media (min-width:2560px){
          .bv-wrap { max-width:none; }
          .bv-h1 { font-size:118px; }
          .bv-h2 { font-size:96px; }
          .bv-cap-d { font-size:18px; }
          .bv-stat-n { font-size:70px; }
        }
        @media (prefers-reduced-motion: reduce){
          .bv-btn,.bv-cap-card,.bv-cap-ic,.bv-step-ic { transition:none; }
        }
      `}</style>
    </div>
  )
}
