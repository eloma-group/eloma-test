import { useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Check, Briefcase, Umbrella, Plane, Hotel, FileText, LifeBuoy } from 'lucide-react'
import { useNavigate, Link } from 'react-router-dom'
import { Header } from '../../components/Header/Header'
import { FlyFooter } from '../../components/FlyFooter'

/* ═══════════════════════════════════════════════════
   EG TRAVELS - "Wanderlust Editorial" (light, teal)
   A full-bleed destination hero, a signature boarding-pass
   card, an elegant service set and a destination gallery.
   ═══════════════════════════════════════════════════ */

const NAVY  = '#12313A'
const TEAL  = '#1596A6'
const DEEP  = '#0B3841'
const SAND  = '#FBF7F0'
const MUTED = 'rgba(18,49,58,0.56)'
const EASE  = [0.16, 1, 0.3, 1] as [number, number, number, number]

const img = (id: string, w: number) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`

const SERVICES = [
  { Icon: Briefcase, t: 'Corporate Travel', d: 'Managed business travel with policy control, savings and effortless booking.' },
  { Icon: Umbrella, t: 'Leisure & Holidays', d: 'Tailored holidays and getaways crafted around how you want to travel.' },
  { Icon: Plane, t: 'Flights & Fares', d: 'Better fares and smart routing through trusted airline and supplier partners.' },
  { Icon: Hotel, t: 'Accommodation', d: 'Handpicked stays for every budget, negotiated and booked on your behalf.' },
  { Icon: FileText, t: 'Visa & Documentation', d: 'Guidance and support with visas, documents and travel requirements.' },
  { Icon: LifeBuoy, t: '24/7 Support', d: 'Real people, any time zone - help the moment plans change or things go wrong.' },
]

const GALLERY = [
  { id: 'photo-1469854523086-cc02fe5d8800', name: 'Mountain escapes', tall: true },
  { id: 'photo-1500835556837-99ac94a94552', name: 'Open-road journeys' },
  { id: 'photo-1476514525535-07fb3b4ae5f1', name: 'Lakeside retreats' },
  { id: 'photo-1503220317375-aaad61436b1b', name: 'Together, anywhere', tall: true },
]

export function EgTravelsPage() {
  const reduce = useReducedMotion()
  const nav = useNavigate()
  useEffect(() => { window.scrollTo(0, 0) }, [])

  const rise = (d = 0) => reduce ? {} : ({
    initial: { opacity: 0, y: 28 }, whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' }, transition: { duration: 0.8, delay: d, ease: EASE },
  })

  return (
    <div className="tv" style={{ overflowX: 'hidden', background: SAND }}>
      <Header />

      {/* ── HERO ── */}
      <section className="tv-hero">
        <div className="tv-hero-media">
          <img src={img('photo-1507525428034-b723cf961d3e', 1900)} alt="Tropical travel destination" decoding="async" />
          <span className="tv-hero-veil" aria-hidden />
        </div>
        <div className="tv-wrap tv-hero-in">
          <motion.nav className="tv-crumb" initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
            <Link to="/">Eloma Group</Link><span>/</span><span>Companies</span><span>/</span><em>EG Travels</em>
          </motion.nav>
          <motion.p className="tv-eyebrow tv-eyebrow-i" initial={reduce ? false : { opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.05, ease: EASE }}>
            <span className="tv-eyebrow-dot" />An Eloma Group Company
          </motion.p>
          <motion.h1 className="tv-h1" initial={reduce ? false : { opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1, ease: EASE }}>
            Journeys designed<br />around <span className="tv-hl-i">people.</span>
          </motion.h1>
          <motion.p className="tv-lead tv-lead-i" initial={reduce ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: EASE }}>
            Corporate and leisure travel made seamless - trusted planning, better fares and genuine
            care from the first booking to the safe return home.
          </motion.p>
          <motion.div className="tv-cta-row" initial={reduce ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.28, ease: EASE }}>
            <button className="tv-btn tv-btn-p" onClick={() => nav('/contact#contact-form')}><span>Plan a trip</span><ArrowUpRight size={17} strokeWidth={2.4} /></button>
            <button className="tv-btn tv-btn-o" onClick={() => nav('/contact#contact-form')}>Corporate travel</button>
          </motion.div>
        </div>
      </section>

      {/* ── BOARDING PASS ── */}
      <section className="tv-pass-sec">
        <div className="tv-wrap tv-pass-grid">
          <motion.div className="tv-pass-copy" {...rise()}>
            <p className="tv-eyebrow"><span className="tv-eyebrow-dot" />The EG Travels way</p>
            <h2 className="tv-h2">Every part of the journey, <span className="tv-hl">handled.</span></h2>
            <p className="tv-sec-p">One trusted travel partner for business trips and holidays alike - planned, booked and supported end to end, so travellers simply arrive, relaxed and ready.</p>
            <div className="tv-pass-stats">
              {[{ n: '50+', l: 'Destinations' }, { n: '10k+', l: 'Trips arranged' }, { n: '24/7', l: 'Support' }].map(s => (
                <div key={s.l} className="tv-pass-stat"><span className="tv-pass-stat-n">{s.n}</span><span className="tv-pass-stat-l">{s.l}</span></div>
              ))}
            </div>
          </motion.div>

          <motion.div className="tv-pass" {...rise(0.1)}>
            <div className="tv-pass-main">
              <div className="tv-pass-head">
                <span className="tv-pass-brand"><Plane size={16} strokeWidth={2.2} />EG TRAVELS</span>
                <span className="tv-pass-class">PREMIUM</span>
              </div>
              <div className="tv-pass-route">
                <div className="tv-pass-city"><span className="tv-pass-code">MEL</span><span className="tv-pass-place">Melbourne</span></div>
                <div className="tv-pass-plane"><span className="tv-pass-dash" /><Plane size={18} strokeWidth={2} /><span className="tv-pass-dash" /></div>
                <div className="tv-pass-city tv-pass-city-r"><span className="tv-pass-code">SIN</span><span className="tv-pass-place">Singapore</span></div>
              </div>
              <div className="tv-pass-info">
                <div><span className="tv-pass-k">Passenger</span><span className="tv-pass-v">Corporate &amp; Leisure</span></div>
                <div><span className="tv-pass-k">Service</span><span className="tv-pass-v">Fully managed</span></div>
                <div><span className="tv-pass-k">Support</span><span className="tv-pass-v">24 / 7</span></div>
              </div>
            </div>
            <div className="tv-pass-perf" aria-hidden><span className="tv-notch tv-notch-t" /><span className="tv-notch tv-notch-b" /></div>
            <div className="tv-pass-stub">
              <span className="tv-pass-stub-k">Boarding</span>
              <span className="tv-pass-stub-v">Anytime</span>
              <span className="tv-pass-barcode" aria-hidden />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="tv-serv">
        <div className="tv-wrap">
          <motion.div className="tv-sec-head" {...rise()}>
            <p className="tv-eyebrow"><span className="tv-eyebrow-dot" />What we do</p>
            <h2 className="tv-h2">Travel that feels effortless.</h2>
          </motion.div>
          <div className="tv-grid">
            {SERVICES.map((c, i) => (
              <motion.article key={c.t} className="tv-card"
                initial={reduce ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.55, delay: (i % 3) * 0.07, ease: EASE }}>
                <span className="tv-card-ic"><c.Icon size={22} strokeWidth={1.9} /></span>
                <h3 className="tv-card-t">{c.t}</h3>
                <p className="tv-card-d">{c.d}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section className="tv-gal-sec">
        <div className="tv-wrap">
          <motion.div className="tv-sec-head tv-gal-head" {...rise()}>
            <div>
              <p className="tv-eyebrow"><span className="tv-eyebrow-dot" />Where we'll take you</p>
              <h2 className="tv-h2">Destinations without the stress.</h2>
            </div>
            <p className="tv-sec-p tv-gal-p">From boardroom to beach - over fifty destinations, each planned with the same care and round-the-clock support.</p>
          </motion.div>
          <div className="tv-gal">
            {GALLERY.map((g, i) => (
              <motion.div key={g.name} className={`tv-gal-item${g.tall ? ' tv-gal-tall' : ''}`}
                initial={reduce ? false : { opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.6, delay: i * 0.07, ease: EASE }}>
                <img src={img(g.id, 900)} alt={g.name} decoding="async" loading="lazy" />
                <span className="tv-gal-name">{g.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS BAND ── */}
      <section className="tv-band">
        <span className="tv-band-glow" aria-hidden />
        <div className="tv-wrap tv-band-grid">
          {[{ n: '50+', l: 'Destinations served' }, { n: '10k+', l: 'Trips arranged' }, { n: '24/7', l: 'Global traveller support' }, { n: '4.9/5', l: 'Traveller satisfaction' }].map((s, i) => (
            <motion.div key={s.l} className="tv-band-item" initial={reduce ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}>
              <span className="tv-band-n">{s.n}</span><span className="tv-band-l">{s.l}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CARE SPLIT ── */}
      <section className="tv-care">
        <div className="tv-wrap tv-care-grid">
          <motion.div className="tv-care-media" {...rise()}>
            <img src={img('photo-1488646953014-85cb44e25828', 1100)} alt="Planning a journey" decoding="async" loading="lazy" />
          </motion.div>
          <motion.div className="tv-care-copy" {...rise(0.1)}>
            <p className="tv-eyebrow"><span className="tv-eyebrow-dot" />Care that travels with you</p>
            <h2 className="tv-h2">Invisible when it works, priceless when it doesn't.</h2>
            <p className="tv-sec-p">Our team stays with you across every time zone, ready to fix, rebook and reassure the moment you need it - so a change of plans never becomes a crisis.</p>
            <ul className="tv-check">
              {['Dedicated travel consultants', 'Better fares through trusted partners', 'Full corporate travel management', '24/7 support anywhere in the world'].map(b => (
                <li key={b}><span className="tv-check-ic"><Check size={15} strokeWidth={3} /></span>{b}</li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="tv-cta">
        <span className="tv-cta-glow" aria-hidden />
        <motion.div className="tv-cta-in" {...rise()}>
          <h2 className="tv-cta-h">Ready for the<br /><span className="tv-hl-l">next journey?</span></h2>
          <p className="tv-cta-sub">Tell us where you're headed - we'll handle every detail of getting there.</p>
          <button className="tv-btn tv-btn-p tv-cta-btn" onClick={() => nav('/contact#contact-form')}><span>Plan a trip</span><ArrowUpRight size={18} strokeWidth={2.4} /></button>
        </motion.div>
      </section>

      <FlyFooter />

      <style>{`
        .tv-wrap { max-width: 1720px; margin: 0 auto; }
        .tv-hl { color:${TEAL}; }
        .tv-hl-i { color:#6FD9E6; }
        .tv-hl-l { color:#6FD9E6; }
        .tv-eyebrow { display:inline-flex; align-items:center; gap:10px; margin:0; font-family:'Inter',sans-serif; font-weight:700; font-size:clamp(10px,0.8vw,12px); letter-spacing:2.5px; text-transform:uppercase; color:${TEAL}; }
        .tv-eyebrow-dot { width:7px; height:7px; border-radius:50%; background:${TEAL}; box-shadow:0 0 0 4px rgba(21,150,166,0.16); flex-shrink:0; }
        .tv-eyebrow-i { color:#8FE3ED; }
        .tv-eyebrow-i .tv-eyebrow-dot { background:#8FE3ED; box-shadow:0 0 0 4px rgba(143,227,237,0.16); }
        .tv-h2 { font-family:'Poppins',sans-serif; font-weight:700; font-size:clamp(30px,4.4vw,64px); line-height:1.12; letter-spacing:-0.035em; color:${NAVY}; margin:16px 0 0; padding-bottom:0.06em; }
        .tv-sec-head { max-width:900px; margin-bottom:clamp(38px,4.5vw,64px); }
        .tv-sec-p { font-family:'Inter',sans-serif; font-size:clamp(15px,1.2vw,18px); line-height:1.8; color:${MUTED}; margin:clamp(16px,1.8vw,24px) 0 0; max-width:60ch; }

        .tv-btn { display:inline-flex; align-items:center; gap:9px; cursor:pointer; font-family:'Poppins',sans-serif; font-weight:500; font-size:clamp(14px,1vw,16px); border-radius:12px; padding:15px 28px; border:none; text-decoration:none; transition:transform .25s cubic-bezier(0.16,1,0.3,1), background .25s ease, box-shadow .25s ease, color .25s ease, border-color .25s ease; }
        .tv-btn-p { position:relative; overflow:hidden; background:${TEAL}; color:#fff; box-shadow:0 18px 40px -16px rgba(21,150,166,0.7); }
        .tv-btn-p span { position:relative; z-index:1; }
        .tv-btn-p::after { content:''; position:absolute; top:0; left:-120%; width:55%; height:100%; background:linear-gradient(110deg,transparent,rgba(255,255,255,0.45),transparent); transform:skewX(-18deg); transition:left .7s cubic-bezier(0.16,1,0.3,1); }
        .tv-btn-p:hover { transform:translateY(-2px); background:#12889a; box-shadow:0 24px 50px -16px rgba(21,150,166,0.85); }
        .tv-btn-p:hover::after { left:135%; }
        .tv-btn-o { background:rgba(255,255,255,0.14); color:#fff; border:1.5px solid rgba(255,255,255,0.45); backdrop-filter:blur(4px); }
        .tv-btn-o:hover { transform:translateY(-2px); background:#fff; color:${DEEP}; border-color:#fff; }

        /* HERO */
        .tv-hero { position:relative; overflow:hidden; padding:clamp(150px,17vw,260px) clamp(24px,5vw,72px) clamp(64px,8vw,120px); }
        .tv-hero-media { position:absolute; inset:0; z-index:0; }
        .tv-hero-media img { width:100%; height:100%; object-fit:cover; display:block; }
        .tv-hero-veil { position:absolute; inset:0; background:linear-gradient(100deg, rgba(9,40,47,0.86) 0%, rgba(9,40,47,0.6) 44%, rgba(9,40,47,0.2) 100%), linear-gradient(0deg, rgba(9,40,47,0.55), transparent 42%); }
        .tv-hero-in { position:relative; z-index:1; }
        .tv-crumb { display:flex; align-items:center; gap:9px; font-family:'Inter',sans-serif; font-size:clamp(11px,0.85vw,13px); color:rgba(255,255,255,0.6); margin-bottom:clamp(18px,2vw,26px); flex-wrap:wrap; }
        .tv-crumb a { color:rgba(255,255,255,0.6); text-decoration:none; transition:color .2s ease; }
        .tv-crumb a:hover { color:#fff; }
        .tv-crumb em { color:#fff; font-style:normal; font-weight:600; }
        .tv-h1 { font-family:'Poppins',sans-serif; font-weight:700; font-size:clamp(40px,6.4vw,98px); line-height:1.06; letter-spacing:-0.04em; color:#fff; margin:clamp(16px,2vw,22px) 0 0; padding-bottom:0.04em; }
        .tv-lead-i { font-family:'Inter',sans-serif; font-size:clamp(15px,1.25vw,19px); line-height:1.8; color:rgba(255,255,255,0.78); max-width:56ch; margin:clamp(18px,2vw,26px) 0 0; }
        .tv-cta-row { display:flex; flex-wrap:wrap; gap:13px; margin-top:clamp(26px,3vw,36px); }

        /* BOARDING PASS */
        .tv-pass-sec { background:${SAND}; padding:clamp(60px,7vw,120px) clamp(24px,5vw,72px); }
        .tv-pass-grid { display:grid; grid-template-columns:1fr 1fr; gap:clamp(36px,5vw,80px); align-items:center; }
        .tv-pass-stats { display:flex; gap:clamp(24px,3vw,44px); margin-top:clamp(28px,3.4vw,40px); }
        .tv-pass-stat { display:flex; flex-direction:column; gap:4px; }
        .tv-pass-stat-n { font-family:'Poppins',sans-serif; font-weight:700; font-size:clamp(26px,2.6vw,40px); letter-spacing:-0.04em; color:${TEAL}; line-height:0.9; }
        .tv-pass-stat-l { font-family:'Inter',sans-serif; font-size:clamp(11px,0.9vw,13px); letter-spacing:1px; text-transform:uppercase; color:${MUTED}; }

        .tv-pass { display:flex; background:#fff; border-radius:22px; box-shadow:0 44px 90px -50px rgba(18,49,58,0.5); overflow:hidden; }
        .tv-pass-main { flex:1; padding:clamp(24px,2.6vw,34px); }
        .tv-pass-head { display:flex; align-items:center; justify-content:space-between; margin-bottom:clamp(22px,2.6vw,30px); }
        .tv-pass-brand { display:inline-flex; align-items:center; gap:8px; font-family:'Poppins',sans-serif; font-weight:700; font-size:clamp(13px,1.1vw,16px); letter-spacing:1px; color:${TEAL}; }
        .tv-pass-class { font-family:'Inter',sans-serif; font-size:10px; font-weight:800; letter-spacing:2px; color:${MUTED}; border:1px solid rgba(18,49,58,0.18); border-radius:5px; padding:4px 9px; }
        .tv-pass-route { display:flex; align-items:center; justify-content:space-between; gap:14px; margin-bottom:clamp(22px,2.6vw,30px); }
        .tv-pass-city { display:flex; flex-direction:column; }
        .tv-pass-city-r { text-align:right; }
        .tv-pass-code { font-family:'Poppins',sans-serif; font-weight:700; font-size:clamp(30px,3.6vw,52px); letter-spacing:-0.03em; color:${NAVY}; line-height:0.9; }
        .tv-pass-place { font-family:'Inter',sans-serif; font-size:clamp(11px,0.9vw,13px); color:${MUTED}; margin-top:4px; }
        .tv-pass-plane { flex:1; display:flex; align-items:center; gap:6px; color:${TEAL}; }
        .tv-pass-dash { flex:1; height:2px; background:repeating-linear-gradient(90deg,${TEAL} 0 5px,transparent 5px 10px); opacity:0.5; }
        .tv-pass-info { display:flex; gap:clamp(14px,2vw,26px); border-top:1px dashed rgba(18,49,58,0.2); padding-top:clamp(16px,1.8vw,22px); }
        .tv-pass-info > div { display:flex; flex-direction:column; gap:4px; }
        .tv-pass-k { font-family:'Inter',sans-serif; font-size:9.5px; font-weight:700; letter-spacing:1.2px; text-transform:uppercase; color:${MUTED}; }
        .tv-pass-v { font-family:'Poppins',sans-serif; font-weight:600; font-size:clamp(12px,1vw,14px); color:${NAVY}; }
        .tv-pass-perf { position:relative; width:0; border-left:2px dashed rgba(18,49,58,0.22); }
        .tv-notch { position:absolute; left:-9px; width:18px; height:18px; border-radius:50%; background:${SAND}; }
        .tv-notch-t { top:-9px; } .tv-notch-b { bottom:-9px; }
        .tv-pass-stub { width:clamp(88px,10vw,130px); background:linear-gradient(160deg,${TEAL},${DEEP}); display:flex; flex-direction:column; align-items:center; justify-content:center; gap:6px; padding:clamp(18px,2vw,26px) 12px; }
        .tv-pass-stub-k { font-family:'Inter',sans-serif; font-size:9.5px; font-weight:700; letter-spacing:1.5px; text-transform:uppercase; color:rgba(255,255,255,0.7); }
        .tv-pass-stub-v { font-family:'Poppins',sans-serif; font-weight:700; font-size:clamp(14px,1.2vw,18px); color:#fff; margin-bottom:6px; }
        .tv-pass-barcode { width:70%; height:46px; background:repeating-linear-gradient(90deg,#fff 0 2px,transparent 2px 3px,#fff 3px 4px,transparent 4px 7px); opacity:0.9; border-radius:2px; }

        /* SERVICES */
        .tv-serv { background:#fff; padding:clamp(60px,7vw,120px) clamp(24px,5vw,72px); }
        .tv-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:clamp(14px,1.4vw,20px); }
        .tv-card { position:relative; overflow:hidden; background:linear-gradient(168deg,#ffffff,#f2faf9); border:1px solid rgba(18,49,58,0.1); border-radius:20px; padding:clamp(26px,2.6vw,38px); transition:transform .45s cubic-bezier(0.16,1,0.3,1), border-color .45s ease, box-shadow .45s ease; }
        .tv-card::before { content:''; position:absolute; top:0; left:0; right:0; height:3px; background:${TEAL}; transform:scaleX(0); transform-origin:left; transition:transform .45s cubic-bezier(0.16,1,0.3,1); }
        .tv-card:hover { transform:translateY(-6px); border-color:rgba(21,150,166,0.5); box-shadow:0 40px 80px -50px rgba(18,49,58,0.3); }
        .tv-card:hover::before { transform:scaleX(1); }
        .tv-card-ic { display:inline-flex; align-items:center; justify-content:center; width:52px; height:52px; border-radius:14px; background:rgba(21,150,166,0.12); color:${TEAL}; margin-bottom:clamp(18px,2vw,24px); transition:transform .45s cubic-bezier(0.16,1,0.3,1), background .4s ease, color .4s ease; }
        .tv-card:hover .tv-card-ic { transform:translateY(-3px) rotate(-6deg); background:${TEAL}; color:#fff; }
        .tv-card-t { font-family:'Poppins',sans-serif; font-weight:600; font-size:clamp(18px,1.6vw,24px); letter-spacing:-0.02em; color:${NAVY}; margin:0 0 10px; }
        .tv-card-d { font-family:'Inter',sans-serif; font-size:clamp(13.5px,1vw,15.5px); line-height:1.75; color:${MUTED}; margin:0; }

        /* GALLERY */
        .tv-gal-sec { background:${SAND}; padding:clamp(60px,7vw,120px) clamp(24px,5vw,72px); }
        .tv-gal-head { display:flex; align-items:flex-end; justify-content:space-between; gap:32px; max-width:none; }
        .tv-gal-p { margin:0; max-width:42ch; }
        .tv-gal { display:grid; grid-template-columns:repeat(4,1fr); grid-auto-rows:clamp(150px,17vw,240px); gap:clamp(14px,1.4vw,20px); }
        .tv-gal-item { position:relative; overflow:hidden; border-radius:18px; grid-row:span 1; }
        .tv-gal-tall { grid-row:span 2; }
        .tv-gal-item img { width:100%; height:100%; object-fit:cover; display:block; transition:transform .7s cubic-bezier(0.16,1,0.3,1); }
        .tv-gal-item::after { content:''; position:absolute; inset:0; background:linear-gradient(0deg, rgba(9,40,47,0.6), transparent 52%); }
        .tv-gal-item:hover img { transform:scale(1.06); }
        .tv-gal-name { position:absolute; left:20px; bottom:18px; z-index:1; font-family:'Poppins',sans-serif; font-weight:600; font-size:clamp(15px,1.4vw,20px); letter-spacing:-0.01em; color:#fff; text-shadow:0 2px 12px rgba(0,0,0,0.4); }

        /* STATS BAND */
        .tv-band { position:relative; overflow:hidden; background:${DEEP}; padding:clamp(52px,6vw,92px) clamp(24px,5vw,72px); }
        .tv-band-glow { position:absolute; bottom:-160px; right:8%; width:520px; height:520px; border-radius:50%; background:radial-gradient(circle, rgba(21,150,166,0.4), transparent 62%); pointer-events:none; }
        .tv-band-grid { position:relative; z-index:1; display:grid; grid-template-columns:repeat(4,1fr); gap:clamp(20px,2vw,32px); }
        .tv-band-item { text-align:center; display:flex; flex-direction:column; gap:10px; align-items:center; }
        .tv-band-item + .tv-band-item { border-left:1px solid rgba(255,255,255,0.12); }
        .tv-band-n { font-family:'Poppins',sans-serif; font-weight:700; font-size:clamp(36px,4.2vw,64px); line-height:0.9; letter-spacing:-0.045em; color:#6FD9E6; }
        .tv-band-l { font-family:'Inter',sans-serif; font-size:clamp(11px,0.9vw,14px); color:rgba(255,255,255,0.6); letter-spacing:0.3px; }

        /* CARE */
        .tv-care { background:#fff; padding:clamp(60px,7vw,120px) clamp(24px,5vw,72px); }
        .tv-care-grid { display:grid; grid-template-columns:1fr 1fr; gap:clamp(32px,5vw,72px); align-items:center; }
        .tv-care-media { border-radius:24px; overflow:hidden; aspect-ratio:5/4; box-shadow:0 44px 84px -48px rgba(18,49,58,0.45); }
        .tv-care-media img { width:100%; height:100%; object-fit:cover; display:block; }
        .tv-check { list-style:none; margin:clamp(24px,3vw,34px) 0 0; padding:0; display:flex; flex-direction:column; gap:15px; }
        .tv-check li { display:flex; align-items:center; gap:13px; font-family:'Poppins',sans-serif; font-weight:500; font-size:clamp(15px,1.2vw,18px); color:${NAVY}; }
        .tv-check-ic { display:inline-flex; align-items:center; justify-content:center; width:28px; height:28px; border-radius:8px; background:rgba(21,150,166,0.14); color:${TEAL}; flex-shrink:0; }

        /* CTA */
        .tv-cta { position:relative; overflow:hidden; background:${DEEP}; padding:clamp(72px,10vw,140px) clamp(24px,5vw,72px); text-align:center; }
        .tv-cta-glow { position:absolute; bottom:-140px; right:8%; width:560px; height:560px; border-radius:50%; background:radial-gradient(circle, rgba(21,150,166,0.35), transparent 62%); pointer-events:none; }
        .tv-cta-in { position:relative; z-index:1; max-width:820px; margin:0 auto; }
        .tv-cta-h { font-family:'Poppins',sans-serif; font-weight:700; font-size:clamp(34px,5.6vw,84px); line-height:1.08; letter-spacing:-0.04em; color:#fff; margin:0; padding-bottom:0.04em; }
        .tv-cta-sub { font-family:'Inter',sans-serif; font-size:clamp(14px,1.15vw,17px); line-height:1.8; color:rgba(255,255,255,0.6); max-width:480px; margin:clamp(18px,2vw,26px) auto clamp(28px,3.5vw,40px); }
        .tv-cta-btn { padding:16px 36px; }

        /* responsive */
        @media (max-width:1024px){
          .tv-pass-grid { grid-template-columns:1fr; gap:clamp(36px,6vw,52px); }
          .tv-grid { grid-template-columns:1fr 1fr; }
          .tv-gal-head { flex-direction:column; align-items:flex-start; gap:16px; }
          .tv-care-grid { grid-template-columns:1fr; }
          .tv-care-media { order:-1; }
        }
        @media (max-width:600px){
          .tv-grid { grid-template-columns:1fr; }
          .tv-gal { grid-template-columns:1fr 1fr; grid-auto-rows:clamp(140px,40vw,190px); }
          .tv-band-grid { grid-template-columns:1fr 1fr; gap:30px 20px; }
          .tv-band-item:nth-child(3){ border-left:none; }
        }
        @media (max-width:400px){
          .tv-band-grid { grid-template-columns:1fr; }
          .tv-band-item + .tv-band-item { border-left:none; }
          .tv-pass-stats { flex-wrap:wrap; gap:20px; }
        }
        @media (min-width:1920px){
          .tv-wrap { max-width:1860px; }
          .tv-h1 { font-size:110px; }
          .tv-h2 { font-size:74px; }
          .tv-lead-i,.tv-sec-p { font-size:20px; }
        }
        @media (min-width:2560px){
          .tv-wrap { max-width:2360px; }
          .tv-h1 { font-size:148px; }
          .tv-h2 { font-size:100px; }
          .tv-card-d { font-size:18px; }
          .tv-band-n { font-size:80px; }
        }
        @media (prefers-reduced-motion: reduce){
          .tv-btn,.tv-card,.tv-card-ic,.tv-gal-item img { transition:none; }
        }
      `}</style>
    </div>
  )
}
