import { useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Timer, Layers3, Wrench, Handshake } from 'lucide-react'
import { Header } from '../components/Header/Header'
import { FlyFooter } from '../components/FlyFooter'
import { PageCTA, NAVY, GREEN, MUTED, EASE } from '../components/PageKit'

const img = (id: string, w: number) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`

/* small meta chips under the hero headline */
const TAGS = ['Australian owned', 'Multi-sector', 'Long-term capital', 'Operator-led']

/* looping marquee words */
const MARQUEE = ['Technology', 'Trade', 'Logistics', 'Travel', 'Customer Experience', 'Security']

/* signature hover-reveal list — the disciplines the group operates */
const DISCIPLINES = [
  { name: 'Technology & Digital', tag: 'EG Digital', img: 'photo-1518770660439-4636190af475' },
  { name: 'Global Trade & Imports', tag: 'EG Imports', img: 'photo-1494412574643-ff11b0a5c1c3' },
  { name: 'Transport & Logistics', tag: 'BIVRY', img: 'photo-1601584115197-04ecc0da31d7' },
  { name: 'Travel & Mobility', tag: 'EG Travels', img: 'photo-1436491865332-7a61a109cc05' },
  { name: 'Group & Shared Services', tag: 'Eloma Group', img: 'photo-1497366216548-37526070297c' },
]

const NUMBERS = [
  { n: '05', l: 'Operating companies' },
  { n: '08', l: 'Global markets' },
  { n: '04', l: 'Core sectors' },
  { n: '01', l: 'Shared vision' },
]

const PRINCIPLES = [
  { Icon: Timer, t: 'Long horizons', d: 'We back businesses on a decade view — releasing them from the pressure of the next quarter so they can build the right thing.' },
  { Icon: Layers3, t: 'Shared foundations', d: 'One backbone of capital, systems and governance sits beneath every company, so each starts stronger than it could alone.' },
  { Icon: Wrench, t: 'Operator mindset', d: 'We found and run, not just fund. Hands on the wheel, accountable for outcomes, close to the work.' },
  { Icon: Handshake, t: 'Earned trust', d: 'Partnerships that compound. We keep our word, show up over years, and let the relationships do the talking.' },
]

export function AboutPage() {
  const reduce = useReducedMotion() ?? false
  const listRef = useRef<HTMLDivElement>(null)
  const floatRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState<number | null>(null)

  const rise = (d = 0) => ({
    initial: reduce ? false : { opacity: 0, y: 26 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.8, delay: d, ease: EASE },
  })

  // cursor-following floating preview for the disciplines list
  const onMove = (e: React.MouseEvent) => {
    const box = listRef.current, el = floatRef.current
    if (!box || !el) return
    const r = box.getBoundingClientRect()
    el.style.transform = `translate(${e.clientX - r.left}px, ${e.clientY - r.top}px)`
  }

  return (
    <div style={{ overflowX: 'clip', background: '#fff' }}>
      <Header />

      {/* ── 1 · Editorial hero ── */}
      <section className="ab2-hero">
        <span className="ab2-hero-ghost" aria-hidden>ELOMA</span>
        <div className="ab2-hero-in">
          <motion.p className="ab2-eyebrow" initial={reduce ? false : { opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }}>
            <span className="ab2-eyebrow-dot" />About — Eloma Group
          </motion.p>

          <h1 className="ab2-hero-h1">
            <motion.span className="ab2-line" initial={reduce ? false : { opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: EASE, delay: 0.06 }}>
              Built to last.
            </motion.span>
            <motion.span className="ab2-line" initial={reduce ? false : { opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: EASE, delay: 0.16 }}>
              Backed to <span className="g">scale.</span>
            </motion.span>
          </h1>

          <motion.p className="ab2-hero-lead" initial={reduce ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE, delay: 0.26 }}>
            Eloma Group is an Australian holding company that founds, funds and operates businesses across
            digital, trade, logistics and travel — giving each the backbone to grow and the freedom to lead.
          </motion.p>

          <motion.ul className="ab2-tags" initial={reduce ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE, delay: 0.34 }}>
            {TAGS.map((t) => <li key={t}>{t}</li>)}
          </motion.ul>
        </div>
      </section>

      {/* ── 2 · Marquee strip ── */}
      <div className="ab2-marq" aria-hidden>
        <div className={`ab2-marq-track${reduce ? ' still' : ''}`}>
          {[0, 1].map((dup) => (
            <div className="ab2-marq-set" key={dup}>
              {MARQUEE.map((w) => (
                <span className="ab2-marq-item" key={w + dup}>{w}<i /></span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── 3 · Thesis — sticky heading + scrolling copy ── */}
      <section className="ab2-thesis">
        <div className="ab2-thesis-in">
          <div className="ab2-thesis-stick">
            <p className="ab2-kicker"><span>01</span> The thesis</p>
            <motion.h2 className="ab2-thesis-h" {...rise()}>
              Good businesses <span className="g">compound</span> when they share strong foundations.
            </motion.h2>
          </div>
          <div className="ab2-thesis-body">
            <motion.p {...rise(0.05)}>
              A company on its own spends years rebuilding what others already have — the systems, the capital
              discipline, the governance, the talent. We remove that tax.
            </motion.p>
            <motion.p {...rise(0.1)}>
              Under one roof, each Eloma business inherits a shared backbone and keeps full ownership of its
              craft. Independent where it matters, connected where it counts.
            </motion.p>
            <motion.p {...rise(0.15)}>
              The result is a portfolio that moves faster together than any of its parts could alone — patient
              with time, precise with capital, and built to still be standing decades from now.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ── 4 · Disciplines — cursor-reveal list ── */}
      <section className="ab2-disc-sec">
        <div className="ab2-disc-wrap">
          <motion.div className="ab2-disc-head" {...rise()}>
            <p className="ab2-kicker"><span>02</span> What we operate</p>
            <h2 className="ab2-disc-title">A portfolio built on <span className="g">focus.</span></h2>
          </motion.div>

          <div
            className="ab2-disc"
            ref={listRef}
            onMouseMove={reduce ? undefined : onMove}
            onMouseLeave={() => setActive(null)}
          >
            {!reduce && (
              <div className="ab2-disc-float" ref={floatRef} aria-hidden>
                {DISCIPLINES.map((d, i) => (
                  <img key={d.name} src={img(d.img, 720)} alt="" loading="lazy" decoding="async" className={active === i ? 'on' : ''} />
                ))}
              </div>
            )}
            {DISCIPLINES.map((d, i) => (
              <motion.div
                key={d.name}
                className={`ab2-disc-row${active === i ? ' on' : ''}`}
                onMouseEnter={() => setActive(i)}
                initial={reduce ? false : { opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: i * 0.05, ease: EASE }}
              >
                <span className="ab2-disc-no">0{i + 1}</span>
                <span className="ab2-disc-name">{d.name}</span>
                <span className="ab2-disc-tag">{d.tag}</span>
                <ArrowUpRight className="ab2-disc-arr" size={22} strokeWidth={2} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5 · Numbers band ── */}
      <section className="ab2-nums-sec">
        <div className="ab2-nums-in">
          <motion.p className="ab2-kicker light" {...rise()}><span>03</span> At scale</motion.p>
          <div className="ab2-nums">
            {NUMBERS.map((f, i) => (
              <motion.div key={f.l} className="ab2-num"
                initial={reduce ? false : { opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.08, ease: EASE }}>
                <span className="ab2-num-n">{f.n}</span>
                <span className="ab2-num-l">{f.l}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6 · Principles — dark ── */}
      <section className="ab2-prin">
        <span className="ab2-prin-glow" aria-hidden />
        <div className="ab2-prin-in">
          <motion.div className="ab2-prin-head" {...rise()}>
            <p className="ab2-kicker onnavy"><span>04</span> How we operate</p>
            <h2 className="ab2-prin-title">Four things we <span className="g">never trade away.</span></h2>
          </motion.div>
          <div className="ab2-prin-grid">
            {PRINCIPLES.map((p, i) => (
              <motion.div key={p.t} className="ab2-prin-card"
                initial={reduce ? false : { opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.6, delay: i * 0.07, ease: EASE }}>
                <span className="ab2-prin-ic"><p.Icon size={22} strokeWidth={1.7} /></span>
                <span className="ab2-prin-no">0{i + 1}</span>
                <h3 className="ab2-prin-t">{p.t}</h3>
                <p className="ab2-prin-d">{p.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7 · Pull quote ── */}
      <section className="ab2-quote-sec">
        <motion.blockquote className="ab2-quote" initial={reduce ? false : { opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.9, ease: EASE }}>
          <span className="ab2-quote-mark" aria-hidden>“</span>
          The best companies aren’t rushed into being. They’re <span className="g">grown with patience</span> — and given room to become something that endures.
          <footer className="ab2-quote-by">Eloma Group — founding principle</footer>
        </motion.blockquote>
      </section>

      <PageCTA line1="Ready to grow with" line2="a group that stays?" sub="Partner with a house of companies engineered for the long term." buttonLabel="Start a conversation" />
      <FlyFooter />

      <style>{`
        .g { color:${GREEN}; }
        .ab2-eyebrow { display:inline-flex; align-items:center; gap:10px; margin:0; font-family:'Inter',sans-serif; font-weight:700; font-size:clamp(10px,0.8vw,12px); letter-spacing:2.5px; text-transform:uppercase; color:${GREEN}; }
        .ab2-eyebrow-dot { width:7px; height:7px; border-radius:50%; background:${GREEN}; box-shadow:0 0 0 4px rgba(60,185,140,0.16); }
        .ab2-kicker { display:flex; align-items:center; gap:12px; margin:0; font-family:'Inter',sans-serif; font-weight:700; font-size:clamp(10px,0.8vw,12px); letter-spacing:2.5px; text-transform:uppercase; color:${MUTED}; }
        .ab2-kicker span { color:${GREEN}; font-variant-numeric:tabular-nums; }
        .ab2-kicker.onnavy { color:rgba(255,255,255,0.5); }
        .ab2-kicker.light span, .ab2-kicker.onnavy span { color:${GREEN}; }

        /* ── 1 · Hero ── */
        .ab2-hero { position:relative; overflow:hidden;
          background: radial-gradient(70% 60% at 88% 4%, rgba(60,185,140,0.12), transparent 60%), linear-gradient(180deg,#ffffff,#f3faf7);
          padding: clamp(120px,15vw,210px) clamp(24px,5vw,80px) clamp(50px,7vw,90px); }
        .ab2-hero-ghost { position:absolute; right:-2vw; bottom:-4vw; z-index:0; pointer-events:none;
          font-family:'Poppins',sans-serif; font-weight:800; font-size:clamp(140px,26vw,420px); line-height:0.8; letter-spacing:-0.05em;
          color:transparent; -webkit-text-stroke:1.5px rgba(19,41,61,0.06); user-select:none; }
        .ab2-hero-in { position:relative; z-index:1; max-width:1500px; margin:0 auto; }
        .ab2-hero-h1 { margin:clamp(20px,2.4vw,32px) 0 0; font-family:'Poppins',sans-serif; font-weight:700; font-size:clamp(52px,10vw,168px); line-height:0.92; letter-spacing:-0.045em; color:${NAVY}; }
        .ab2-line { display:block; }
        .ab2-hero-lead { font-family:'Inter',sans-serif; font-size:clamp(16px,1.35vw,21px); color:${MUTED}; line-height:1.8; margin:clamp(26px,3vw,40px) 0 clamp(24px,3vw,34px); max-width:58ch; }
        .ab2-tags { list-style:none; display:flex; flex-wrap:wrap; gap:10px; margin:0; padding:0; }
        .ab2-tags li { font-family:'Inter',sans-serif; font-weight:600; font-size:clamp(12px,0.95vw,14px); color:${NAVY};
          padding:9px 18px; border:1px solid rgba(19,41,61,0.14); border-radius:99px; background:rgba(255,255,255,0.6); }

        /* ── 2 · Marquee ── */
        .ab2-marq { overflow:hidden; border-top:1px solid rgba(19,41,61,0.1); border-bottom:1px solid rgba(19,41,61,0.1); background:#fff; padding:clamp(18px,2vw,26px) 0; }
        .ab2-marq-track { display:flex; width:max-content; animation:ab2-marq 26s linear infinite; }
        .ab2-marq-track.still { animation:none; }
        .ab2-marq-set { display:flex; }
        .ab2-marq-item { display:inline-flex; align-items:center; gap:clamp(24px,3vw,52px); padding:0 clamp(24px,3vw,52px);
          font-family:'Poppins',sans-serif; font-weight:700; text-transform:uppercase; letter-spacing:-0.02em;
          font-size:clamp(20px,2.6vw,40px); color:${NAVY}; white-space:nowrap; }
        .ab2-marq-item i { width:8px; height:8px; border-radius:50%; background:${GREEN}; }
        @keyframes ab2-marq { to { transform:translateX(-50%); } }

        /* ── 3 · Thesis ── */
        .ab2-thesis { background:linear-gradient(180deg,#ffffff,#f3faf7); padding:clamp(64px,9vw,150px) clamp(24px,5vw,80px); }
        .ab2-thesis-in { max-width:1500px; margin:0 auto; display:grid; grid-template-columns:1.05fr 0.95fr; gap:clamp(36px,6vw,110px); align-items:start; }
        .ab2-thesis-stick { position:sticky; top:110px; }
        .ab2-thesis-h { font-family:'Poppins',sans-serif; font-weight:700; font-size:clamp(30px,3.9vw,58px); line-height:1.1; letter-spacing:-0.03em; color:${NAVY}; margin:clamp(18px,2vw,26px) 0 0; max-width:16ch; }
        .ab2-thesis-body { display:flex; flex-direction:column; gap:clamp(22px,2.6vw,34px); padding-top:clamp(6px,1vw,18px); }
        .ab2-thesis-body p { font-family:'Inter',sans-serif; font-size:clamp(16px,1.3vw,20px); line-height:1.85; color:${MUTED}; margin:0; }
        .ab2-thesis-body p:first-child { color:${NAVY}; font-weight:500; }

        /* ── 4 · Disciplines ── */
        .ab2-disc-sec { background:#fff; padding:clamp(64px,8vw,130px) clamp(24px,5vw,80px); }
        .ab2-disc-wrap { max-width:1500px; margin:0 auto; }
        .ab2-disc-head { margin-bottom:clamp(30px,4vw,54px); }
        .ab2-disc-title { font-family:'Poppins',sans-serif; font-weight:700; font-size:clamp(30px,4.2vw,58px); line-height:1.06; letter-spacing:-0.03em; color:${NAVY}; margin:16px 0 0; }
        .ab2-disc { position:relative; border-top:1px solid rgba(19,41,61,0.14); }
        .ab2-disc-float { position:absolute; top:0; left:0; width:0; height:0; z-index:4; pointer-events:none; will-change:transform; }
        .ab2-disc-float img { position:absolute; width:clamp(240px,24vw,360px); aspect-ratio:4/3; object-fit:cover; border-radius:16px;
          transform:translate(-50%,-50%) scale(0.86); opacity:0; box-shadow:0 40px 80px -34px rgba(19,41,61,0.6);
          transition:opacity .35s ease, transform .55s cubic-bezier(0.16,1,0.3,1); }
        .ab2-disc-float img.on { opacity:1; transform:translate(-50%,-50%) scale(1) rotate(-2.5deg); }
        .ab2-disc-row { position:relative; display:grid; grid-template-columns:64px 1fr auto 40px; align-items:center; gap:clamp(14px,2vw,32px);
          padding:clamp(22px,3vw,40px) clamp(6px,1vw,18px); border-bottom:1px solid rgba(19,41,61,0.14); cursor:default;
          transition:padding-left .5s cubic-bezier(0.16,1,0.3,1), background .4s ease; }
        .ab2-disc-row.on { padding-left:clamp(16px,2vw,34px); background:linear-gradient(90deg, rgba(60,185,140,0.05), transparent 70%); }
        .ab2-disc-no { font-family:'Inter',sans-serif; font-weight:700; font-size:13px; letter-spacing:1px; color:${GREEN}; font-variant-numeric:tabular-nums; }
        .ab2-disc-name { font-family:'Poppins',sans-serif; font-weight:700; font-size:clamp(24px,3.4vw,54px); letter-spacing:-0.03em; line-height:1; color:${NAVY}; transition:color .35s ease, transform .5s cubic-bezier(0.16,1,0.3,1); }
        .ab2-disc-row.on .ab2-disc-name { color:${GREEN}; }
        .ab2-disc-tag { font-family:'Inter',sans-serif; font-weight:700; font-size:clamp(11px,0.85vw,13px); letter-spacing:2px; text-transform:uppercase; color:${MUTED}; white-space:nowrap; }
        .ab2-disc-arr { color:${NAVY}; opacity:0.25; transition:opacity .35s ease, transform .5s cubic-bezier(0.16,1,0.3,1); }
        .ab2-disc-row.on .ab2-disc-arr { opacity:1; color:${GREEN}; transform:translate(4px,-4px); }

        /* ── 5 · Numbers ── */
        .ab2-nums-sec { background:linear-gradient(180deg,#ffffff,#f3faf7); padding:clamp(56px,7vw,120px) clamp(24px,5vw,80px); }
        .ab2-nums-in { max-width:1500px; margin:0 auto; }
        .ab2-nums { display:grid; grid-template-columns:repeat(4,1fr); margin-top:clamp(28px,3.4vw,46px); border-top:1px solid rgba(19,41,61,0.14); }
        .ab2-num { padding:clamp(26px,3vw,50px) clamp(14px,1.6vw,28px) clamp(8px,1.4vw,16px) 0; }
        .ab2-num + .ab2-num { padding-left:clamp(18px,2vw,34px); border-left:1px solid rgba(19,41,61,0.1); }
        .ab2-num-n { display:block; font-family:'Poppins',sans-serif; font-weight:700; font-size:clamp(56px,8vw,140px); line-height:0.82; letter-spacing:-0.05em; color:${NAVY};
          background:linear-gradient(160deg, ${NAVY} 30%, ${GREEN}); -webkit-background-clip:text; background-clip:text; -webkit-text-fill-color:transparent; }
        .ab2-num-l { display:block; font-family:'Inter',sans-serif; font-weight:700; font-size:clamp(11px,0.9vw,13.5px); letter-spacing:1.6px; text-transform:uppercase; color:${MUTED}; margin-top:clamp(16px,1.8vw,26px); }

        /* ── 6 · Principles (dark) ── */
        .ab2-prin { position:relative; overflow:hidden; background:${NAVY}; padding:clamp(64px,8vw,130px) clamp(24px,5vw,80px); }
        .ab2-prin::before { content:''; position:absolute; inset:0; pointer-events:none; background-image:radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px); background-size:28px 28px; }
        .ab2-prin-glow { position:absolute; top:-140px; left:-80px; width:480px; height:480px; border-radius:50%; background:radial-gradient(circle, rgba(60,185,140,0.18), transparent 64%); pointer-events:none; }
        .ab2-prin-in { position:relative; z-index:1; max-width:1500px; margin:0 auto; }
        .ab2-prin-head { margin-bottom:clamp(34px,4.4vw,60px); }
        .ab2-prin-title { font-family:'Poppins',sans-serif; font-weight:700; font-size:clamp(30px,4.2vw,58px); line-height:1.08; letter-spacing:-0.03em; color:#fff; margin:16px 0 0; }
        .ab2-prin-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:clamp(16px,1.6vw,24px); }
        .ab2-prin-card { position:relative; padding:clamp(26px,3vw,44px); border-radius:22px; border:1px solid rgba(255,255,255,0.1);
          background:linear-gradient(160deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02));
          transition:transform .5s cubic-bezier(0.16,1,0.3,1), border-color .4s ease, background .4s ease; }
        .ab2-prin-card:hover { transform:translateY(-6px); border-color:rgba(60,185,140,0.5); background:linear-gradient(160deg, rgba(60,185,140,0.12), rgba(255,255,255,0.02)); }
        .ab2-prin-ic { display:inline-flex; align-items:center; justify-content:center; width:52px; height:52px; border-radius:14px; background:rgba(60,185,140,0.16); color:${GREEN}; margin-bottom:clamp(18px,2vw,26px); }
        .ab2-prin-no { position:absolute; top:clamp(26px,3vw,44px); right:clamp(26px,3vw,44px); font-family:'Poppins',sans-serif; font-weight:800; font-size:15px; color:rgba(255,255,255,0.25); font-variant-numeric:tabular-nums; }
        .ab2-prin-t { font-family:'Poppins',sans-serif; font-weight:700; font-size:clamp(20px,2vw,28px); letter-spacing:-0.02em; color:#fff; margin:0 0 clamp(10px,1.2vw,15px); }
        .ab2-prin-d { font-family:'Inter',sans-serif; font-size:clamp(14px,1.05vw,16.5px); line-height:1.75; color:rgba(255,255,255,0.62); margin:0; }

        /* ── 7 · Quote ── */
        .ab2-quote-sec { position:relative; overflow:hidden; background:radial-gradient(60% 80% at 50% 0%, rgba(60,185,140,0.12), transparent 62%), linear-gradient(180deg,#ffffff,#f3faf7); padding:clamp(72px,10vw,150px) clamp(24px,6vw,120px); }
        .ab2-quote-sec::before { content:''; position:absolute; inset:0; pointer-events:none; background-image:radial-gradient(rgba(19,41,61,0.05) 1px, transparent 1px); background-size:30px 30px; }
        .ab2-quote { position:relative; z-index:1; max-width:1100px; margin:0 auto; font-family:'Poppins',sans-serif; font-weight:600; font-size:clamp(28px,4.2vw,66px); line-height:1.24; letter-spacing:-0.03em; color:${NAVY}; text-align:center; }
        .ab2-quote-mark { display:block; font-size:1.6em; line-height:0.5; color:${GREEN}; opacity:0.55; }
        .ab2-quote-by { font-family:'Inter',sans-serif; font-weight:700; font-size:clamp(11px,0.9vw,13px); letter-spacing:2px; text-transform:uppercase; color:${MUTED}; margin-top:clamp(26px,3vw,40px); }

        /* ── responsive ── */
        @media (max-width:900px){
          .ab2-thesis-in { grid-template-columns:1fr; gap:clamp(28px,6vw,44px); }
          .ab2-thesis-stick { position:static; }
          .ab2-disc-float { display:none; }
          .ab2-disc-row { grid-template-columns:44px 1fr auto; }
          .ab2-disc-arr { display:none; }
          .ab2-prin-grid { grid-template-columns:1fr; }
        }
        @media (max-width:600px){
          .ab2-nums { grid-template-columns:1fr 1fr; }
          .ab2-num:nth-child(3), .ab2-num:nth-child(4){ border-top:1px solid rgba(19,41,61,0.1); }
          .ab2-num:nth-child(3){ border-left:none; padding-left:0; }
          .ab2-disc-tag { display:none; }
        }
        @media (min-width:1920px){
          .ab2-hero-in, .ab2-thesis-in, .ab2-disc-wrap, .ab2-nums-in, .ab2-prin-in { max-width:1780px; }
        }
        @media (prefers-reduced-motion:reduce){
          .ab2-marq-track { animation:none; }
        }
      `}</style>
    </div>
  )
}
