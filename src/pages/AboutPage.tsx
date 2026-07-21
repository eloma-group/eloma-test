import { type CSSProperties } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Timer, Layers3, Wrench, Handshake, Laptop, Ship, Truck, Plane, Building2 } from 'lucide-react'
import { Header } from '../components/Header/Header'
import { FlyFooter } from '../components/FlyFooter'
import { PageCTA, NAVY, GREEN, MUTED, EASE } from '../components/PageKit'

/* small meta chips under the hero headline */
const TAGS = ['Australian owned', 'Multi-sector', 'Long-term capital', 'Operator-led']

/* the disciplines the group operates — an expanding image-panel gallery */
const DISCIPLINES = [
  { name: 'Technology & Digital', tag: 'EG Digital', img: 'photo-1518770660439-4636190af475',
    desc: 'Modern software, cloud and IT infrastructure — engineered for growth and built to scale.' },
  { name: 'Global Trade & Imports', tag: 'EG Imports', img: 'photo-1494412574643-ff11b0a5c1c3',
    desc: 'Cross-border sourcing and trade, delivered with precision, speed and hard-earned trust.' },
  { name: 'Transport & Logistics', tag: 'BIVRY', img: 'photo-1601584115197-04ecc0da31d7',
    desc: 'Road freight and logistics that arrive on time, every time — visibility end to end.' },
  { name: 'Travel & Mobility', tag: 'EG Travels', img: 'photo-1436491865332-7a61a109cc05',
    desc: 'Corporate and leisure journeys designed entirely around the people who take them.' },
  { name: 'Group & Shared Services', tag: 'Eloma Group', img: 'photo-1497366216548-37526070297c',
    desc: 'The capital, systems and governance backbone that sits beneath every company.' },
]

/* small line-icon per discipline for the diamond feature rows */
const DISC_ICONS = [Laptop, Ship, Truck, Plane, Building2]

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

/* condensed milestones — the group's story as a timeline */
const JOURNEY = [
  { year: '2013', title: 'The idea took shape', desc: 'Working alongside global organisations exposed how logistics inefficiencies were choking business growth — sparking the idea for smarter, more dependable solutions.' },
  { year: '2014', title: 'Global exposure & learning', desc: 'Fast-paced international operations showed how speed, coordination and reliability keep businesses moving — and where service gaps hurt the customer.' },
  { year: '2016', title: 'Deep dive into supply chain', desc: 'Deeper expertise in how freight movement shapes the wider supply chain, and the need to pair efficiency with operational precision.' },
  { year: '2018', title: 'Understanding ground realities', desc: 'Hands-on in the Australian market — delivery delays, poor visibility and inconsistent standards proved the need for a truly accountable freight partner.' },
  { year: '2020', title: 'The entrepreneurial spark', desc: 'The vision crystallised: a logistics business built on trust, consistency and customer-first operations.' },
  { year: '2025', title: 'Eloma Group was born', desc: 'Eloma Group launches — laying the foundation for an ecosystem driven by innovation, excellence and sustainable growth.' },
  { year: '2025', title: 'EG Trans launched', desc: 'The group’s logistics arm goes live — reliable, responsive road-freight solutions built to deliver at scale.' },
  { year: '2026', title: 'Growth with purpose', desc: 'Joining the UN Global Compact and signing the Women’s Empowerment Principles — growth defined by ethics, inclusion and lasting impact.' },
]

/* accent colour per milestone — a bright, distinct palette echoing the
   reference slide (numbered circles joined by a colour-segmented rail) */
const TL_COLORS = ['#2C5480', '#33A9DE', '#E39A2B', '#D0443B', '#7BA83F', '#2FA79F', '#C0552D', '#5B6BB5']

export function AboutPage() {
  const reduce = useReducedMotion() ?? false

  const rise = (d = 0) => ({
    initial: reduce ? false : { opacity: 0, y: 26 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.8, delay: d, ease: EASE },
  })

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

      {/* ── 2 · Our Journey (animated timeline) ── */}
      <section className="oj">
        <div className="oj-in">
          <div className="oj-head">
            <motion.p className="oj-eyebrow" {...rise()}><span className="oj-dot" />Our Journey</motion.p>
            <motion.h2 className="oj-h" {...rise(0.06)}>From an idea to an ecosystem.</motion.h2>
            <motion.p className="oj-sub" {...rise(0.12)}>
              A decade of learning, building and momentum — the milestones that shaped Eloma Group.
            </motion.p>
          </div>

          <div className="tl2-track" style={{ ['--n' as string]: JOURNEY.length } as CSSProperties}>
            {JOURNEY.map((m, i) => {
              const up = i % 2 === 0
              return (
                <motion.div
                  key={m.year + m.title}
                  className="tl2-item"
                  style={{ '--c': TL_COLORS[i % TL_COLORS.length] } as CSSProperties}
                  initial={reduce ? false : { opacity: 0, y: up ? -20 : 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.55, ease: EASE, delay: i * 0.06 }}
                >
                  <span className="tl2-seg" aria-hidden />
                  <div className={`tl2-callout ${up ? 'up' : 'down'}`}>
                    {up && <span className="tl2-year">{m.year}</span>}
                    <div className="tl2-box">
                      <h3 className="tl2-title">{m.title}</h3>
                      <span className="tl2-uline" aria-hidden />
                      <p className="tl2-desc">{m.desc}</p>
                    </div>
                    {!up && <span className="tl2-year">{m.year}</span>}
                  </div>
                  <span className={`tl2-conn ${up ? 'up' : 'down'}`} aria-hidden />
                  <div className="tl2-circle">{String(i + 1).padStart(2, '0')}</div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

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

      {/* ── 4 · What we operate — diamond mosaic + feature list ── */}
      <section className="ab2-cap-sec">
        <div className="ab2-cap-wrap">
          <div className="ben">
            <motion.div
              className="ben-visual"
              initial={reduce ? false : { opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.85, ease: EASE }}
              aria-hidden
            >
              <div className="ph">
                <span className="ph-accent" aria-hidden />
                <span className="ph-dots" aria-hidden />
                <div className="ph-main"><img src="/images/operate-office.webp" alt="" loading="lazy" decoding="async" /></div>
                <div className="ph-sub"><img src="/images/eg-imports.webp" alt="" loading="lazy" decoding="async" /></div>
                <div className="ph-badge">
                  <b>05</b>
                  <span>Operating<br />companies</span>
                </div>
              </div>
            </motion.div>

            <div className="ben-content">
              <motion.p className="ab2-kicker" {...rise()}><span>02</span> What we operate</motion.p>
              <motion.h2 className="ab2-cap-title" {...rise(0.05)}>A portfolio built on <span className="g">focus.</span></motion.h2>
              <motion.p className="ab2-cap-sub" {...rise(0.1)}>
                Five specialist companies, one operating standard — each with the backbone to grow and the freedom to lead.
              </motion.p>

              <ul className="ben-list">
                {DISCIPLINES.map((d, i) => {
                  const Icon = DISC_ICONS[i % DISC_ICONS.length]
                  return (
                    <motion.li
                      key={d.name}
                      className="ben-row"
                      initial={reduce ? false : { opacity: 0, x: 24 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{ duration: 0.55, delay: i * 0.07, ease: EASE }}
                    >
                      <span className="ben-ico" aria-hidden><Icon size={22} strokeWidth={1.8} /></span>
                      <div className="ben-rt">
                        <h3>{d.name}</h3>
                        <p>{d.desc}</p>
                      </div>
                    </motion.li>
                  )
                })}
              </ul>
            </div>
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
          padding: clamp(120px,15vw,210px) 45px clamp(50px,7vw,90px); }
        .ab2-hero-ghost { position:absolute; right:-2vw; bottom:-4vw; z-index:0; pointer-events:none;
          font-family:'Poppins',sans-serif; font-weight:800; font-size:clamp(140px,26vw,420px); line-height:0.8; letter-spacing:-0.05em;
          color:transparent; -webkit-text-stroke:1.5px rgba(19,41,61,0.06); user-select:none; }
        .ab2-hero-in { position:relative; z-index:1; max-width:none; margin:0 auto; }
        .ab2-hero-h1 { margin:clamp(20px,2.4vw,32px) 0 0; font-family:'Poppins',sans-serif; font-weight:700; font-size:clamp(52px,10vw,168px); line-height:0.92; letter-spacing:-0.045em; color:${NAVY}; }
        .ab2-line { display:block; }
        .ab2-hero-lead { font-family:'Inter',sans-serif; font-size:clamp(16px,1.35vw,21px); color:${MUTED}; line-height:1.8; margin:clamp(26px,3vw,40px) 0 clamp(24px,3vw,34px); max-width:58ch; }
        .ab2-tags { list-style:none; display:flex; flex-wrap:wrap; gap:10px; margin:0; padding:0; }
        .ab2-tags li { font-family:'Inter',sans-serif; font-weight:600; font-size:clamp(12px,0.95vw,14px); color:${NAVY};
          padding:9px 18px; border:1px solid rgba(19,41,61,0.14); border-radius:99px; background:rgba(255,255,255,0.6); }


        /* ── 2 · Our Journey (horizontal numbered timeline) ── */
        .oj { position:relative; overflow:hidden;
          background:#ffffff;
          padding:clamp(64px,9vw,140px) 45px clamp(72px,10vw,150px); }
        .oj-in { position:relative; z-index:1; max-width:none; margin:0 auto; }
        .oj-head { text-align:center; max-width:720px; margin:0 auto clamp(30px,4vw,54px); }
        .oj-eyebrow { display:inline-flex; align-items:center; gap:10px; margin:0; font-family:'Inter',sans-serif; font-weight:700; font-size:clamp(10px,0.8vw,12px); letter-spacing:2.6px; text-transform:uppercase; color:${GREEN}; }
        .oj-eyebrow .oj-dot { width:7px; height:7px; border-radius:50%; background:${GREEN}; box-shadow:0 0 0 4px rgba(60,185,140,0.16); }
        .oj-h { font-family:'Poppins',sans-serif; font-weight:700; font-size:clamp(30px,4.4vw,62px); line-height:1.06; letter-spacing:-0.03em; color:${NAVY}; margin:clamp(14px,1.8vw,22px) 0 0; }
        .oj-sub { font-family:'Inter',sans-serif; font-size:clamp(15px,1.2vw,18px); line-height:1.8; color:${MUTED}; margin:clamp(16px,2vw,22px) 0 0; }

        /* horizontal numbered timeline — circles on a colour-segmented rail,
           callouts alternating above / below (exactly like the reference slide) */
        .tl2-track { position:relative; display:grid; grid-template-columns:repeat(var(--n), 1fr); margin-top:clamp(26px,3.4vw,52px); }
        .tl2-item { position:relative; min-height:calc(var(--zone) * 2 + var(--cs)); --cs:clamp(62px,5.4vw,90px); --zone:clamp(150px,17vw,215px); }

        /* the coloured rail segment sitting behind each circle */
        .tl2-seg { position:absolute; top:50%; left:-1px; right:-1px; height:4px; transform:translateY(-50%); background:var(--c); z-index:0; border-radius:2px; }

        /* number circle — soft radial fill, white gap + thin colour ring */
        .tl2-circle { position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); z-index:3;
          width:var(--cs); aspect-ratio:1; border-radius:50%; display:grid; place-items:center;
          background:radial-gradient(circle at 36% 30%, rgba(255,255,255,0.42), rgba(255,255,255,0) 48%), var(--c);
          box-shadow:0 0 0 5px #fff, 0 0 0 7px var(--c), 0 12px 24px -10px rgba(19,41,61,0.5);
          color:#fff; font-family:'Poppins',sans-serif; font-weight:700; font-size:clamp(18px,1.6vw,26px); letter-spacing:0.03em; }

        /* vertical connector from the circle to its callout, with an end dot */
        .tl2-conn { position:absolute; left:50%; transform:translateX(-50%); width:2px; height:clamp(24px,2.6vw,34px); background:var(--c); z-index:1; }
        .tl2-conn.up { bottom:calc(50% + var(--cs) / 2); }
        .tl2-conn.down { top:calc(50% + var(--cs) / 2); }
        .tl2-conn::after { content:''; position:absolute; left:50%; transform:translateX(-50%); width:9px; height:9px; border-radius:50%; background:var(--c); }
        .tl2-conn.up::after { top:-4px; }
        .tl2-conn.down::after { bottom:-4px; }

        /* callout block */
        .tl2-callout { position:absolute; left:50%; transform:translateX(-50%); z-index:2;
          width:clamp(150px,15.5vw,214px); display:flex; flex-direction:column; align-items:flex-start; text-align:left; }
        .tl2-callout.up { bottom:calc(50% + var(--cs) / 2 + clamp(24px,2.6vw,34px)); }
        .tl2-callout.down { top:calc(50% + var(--cs) / 2 + clamp(24px,2.6vw,34px)); }
        .tl2-year { font-family:'Poppins',sans-serif; font-weight:800; font-size:clamp(20px,2vw,30px); line-height:1; letter-spacing:-0.01em; color:${NAVY}; }
        .tl2-callout.up .tl2-year { margin:0 0 clamp(8px,1vw,12px); }
        .tl2-callout.down .tl2-year { margin:clamp(8px,1vw,12px) 0 0; }
        .tl2-title { font-family:'Poppins',sans-serif; font-weight:700; font-size:clamp(14px,1.15vw,17px); line-height:1.2; letter-spacing:-0.01em; color:${NAVY}; margin:0; }
        .tl2-uline { display:block; width:clamp(40px,3.4vw,52px); height:3px; border-radius:2px; background:var(--c); margin:clamp(6px,0.7vw,9px) 0 clamp(7px,0.8vw,10px); }
        .tl2-desc { font-family:'Inter',sans-serif; font-size:clamp(11px,0.85vw,13px); line-height:1.55; color:${MUTED}; margin:0; }

        /* ≤1024px — collapse the horizontal rail into a clean vertical timeline */
        @media (max-width:1024px){
          .tl2-track { display:flex; flex-direction:column; gap:clamp(20px,3vw,30px); margin-top:clamp(20px,4vw,32px); }
          .tl2-item { min-height:0; display:grid; grid-template-columns:var(--cs) 1fr; align-items:center; column-gap:clamp(16px,4vw,26px); }
          .tl2-item::before { content:''; position:absolute; left:calc(var(--cs) / 2); top:50%; height:calc(100% + clamp(20px,3vw,30px)); width:2px; transform:translateX(-50%); background:var(--c); opacity:0.4; z-index:0; }
          .tl2-item:last-child::before { display:none; }
          .tl2-seg, .tl2-conn { display:none; }
          .tl2-circle { position:relative; top:auto; left:auto; transform:none; }
          .tl2-callout, .tl2-callout.up, .tl2-callout.down { position:static; transform:none; inset:auto; width:auto; }
          .tl2-callout.up .tl2-year, .tl2-callout.down .tl2-year { margin:0 0 6px; }
          .tl2-callout.down { flex-direction:column; }
          .tl2-callout.down .tl2-year { order:-1; margin:0 0 6px; }
        }

        /* ── 3 · Thesis ── */
        .ab2-thesis { background:linear-gradient(180deg,#ffffff,#f3faf7); padding:clamp(64px,9vw,150px) 45px; }
        .ab2-thesis-in { max-width:none; margin:0 auto; display:grid; grid-template-columns:1.05fr 0.95fr; gap:clamp(36px,6vw,110px); align-items:start; }
        .ab2-thesis-stick { position:sticky; top:110px; }
        .ab2-thesis-h { font-family:'Poppins',sans-serif; font-weight:700; font-size:clamp(30px,3.9vw,58px); line-height:1.1; letter-spacing:-0.03em; color:${NAVY}; margin:clamp(18px,2vw,26px) 0 0; max-width:16ch; }
        .ab2-thesis-body { display:flex; flex-direction:column; gap:clamp(22px,2.6vw,34px); padding-top:clamp(6px,1vw,18px); }
        .ab2-thesis-body p { font-family:'Inter',sans-serif; font-size:clamp(16px,1.3vw,20px); line-height:1.85; color:${MUTED}; margin:0; }
        .ab2-thesis-body p:first-child { color:${NAVY}; font-weight:500; }

        /* ── 4 · What we operate — diamond mosaic + feature list ── */
        .ab2-cap-sec { position:relative; overflow:hidden; background:#fff; padding:clamp(64px,8vw,130px) 45px; }
        /* subtle green diamond corner accents */
        .ab2-cap-sec::before { content:''; position:absolute; top:clamp(24px,3vw,54px); right:clamp(24px,3vw,54px);
          width:clamp(26px,3vw,44px); aspect-ratio:1; transform:rotate(45deg); border:3px solid ${GREEN}; opacity:0.5; z-index:0; }
        .ab2-cap-sec::after { content:''; position:absolute; bottom:clamp(24px,3vw,54px); left:clamp(24px,3vw,54px);
          width:clamp(20px,2.4vw,34px); aspect-ratio:1; transform:rotate(45deg); background:linear-gradient(135deg,${GREEN},#2f9d75); opacity:0.5; z-index:0; }
        .ab2-cap-wrap { position:relative; z-index:1; max-width:none; margin:0 auto; }
        .ab2-cap-title { font-family:'Poppins',sans-serif; font-weight:700; font-size:clamp(30px,4.2vw,58px); line-height:1.06; letter-spacing:-0.03em; color:${NAVY}; margin:16px 0 0; }
        .ab2-cap-sub { font-family:'Inter',sans-serif; font-size:clamp(15px,1.2vw,18px); line-height:1.7; color:${MUTED}; margin:clamp(14px,1.6vw,20px) 0 0; max-width:64ch; }

        .ben { display:grid; grid-template-columns:1fr 1.05fr; gap:clamp(30px,5vw,90px); align-items:center; }

        /* left — clean overlapping image composition with a green accent + badge */
        .ben-visual { position:relative; display:flex; justify-content:center; }
        .ph { position:relative; width:100%; max-width:720px; aspect-ratio:1 / 1.12; margin:0 auto; }
        .ph-accent { position:absolute; top:-3%; right:-2%; width:64%; height:58%; border-radius:26px; z-index:0;
          background:linear-gradient(150deg, ${GREEN}, #2f9d75); box-shadow:0 30px 60px -40px rgba(47,157,117,0.75); }
        .ph-dots { position:absolute; bottom:5%; left:-5%; width:clamp(84px,10vw,128px); height:clamp(84px,10vw,128px); z-index:0; opacity:0.5;
          background-image:radial-gradient(${GREEN} 2px, transparent 2px); background-size:16px 16px; }
        .ph-main { position:absolute; top:7%; left:0; width:80%; height:76%; border-radius:24px; overflow:hidden; z-index:1;
          box-shadow:0 46px 82px -44px rgba(19,41,61,0.6); }
        .ph-main img { width:100%; height:100%; object-fit:cover; display:block; }
        .ph-sub { position:absolute; right:1%; bottom:1%; width:47%; height:42%; border-radius:20px; overflow:hidden; z-index:2;
          border:6px solid #fff; box-shadow:0 30px 52px -28px rgba(19,41,61,0.55); animation:ph-float 6.5s ease-in-out infinite; }
        .ph-sub img { width:100%; height:100%; object-fit:cover; display:block; }
        .ph-badge { position:absolute; left:-5%; bottom:22%; z-index:3; display:flex; align-items:center; gap:12px;
          background:#fff; border-radius:16px; padding:clamp(11px,1.1vw,15px) clamp(15px,1.5vw,22px);
          box-shadow:0 26px 46px -22px rgba(19,41,61,0.5); animation:ph-float 6.5s ease-in-out infinite 1.6s; }
        .ph-badge b { font-family:'Poppins',sans-serif; font-weight:800; font-size:clamp(26px,3vw,40px); line-height:1; color:${GREEN}; }
        .ph-badge span { font-family:'Inter',sans-serif; font-weight:700; font-size:clamp(10px,0.78vw,12px); letter-spacing:1px; text-transform:uppercase; line-height:1.3; color:${NAVY}; }
        @keyframes ph-float { 0%,100%{ transform:translateY(0); } 50%{ transform:translateY(-9px); } }
        @media (prefers-reduced-motion: reduce){ .ph-sub, .ph-badge { animation:none; } }

        /* right — heading + feature rows with diamond icon badges */
        .ben-content { min-width:0; }
        .ben-list { list-style:none; margin:clamp(22px,3vw,40px) 0 0; padding:0; display:flex; flex-direction:column; gap:clamp(16px,2vw,26px); }
        .ben-row { display:flex; gap:clamp(15px,1.6vw,24px); align-items:flex-start; }
        .ben-ico { flex:none; width:clamp(46px,4vw,58px); aspect-ratio:1; display:grid; place-items:center; color:#fff;
          background:linear-gradient(150deg,#2E7D46,#1F6B3A); clip-path:polygon(50% 0,100% 50%,50% 100%,0 50%);
          box-shadow:0 12px 22px -12px rgba(31,107,58,0.85); transition:transform .5s cubic-bezier(0.16,1,0.3,1); }
        .ben-row:hover .ben-ico { transform:rotate(90deg); }
        .ben-rt { min-width:0; padding-top:clamp(2px,0.4vw,6px); }
        .ben-rt h3 { font-family:'Poppins',sans-serif; font-weight:700; font-size:clamp(16px,1.5vw,22px); letter-spacing:-0.01em; line-height:1.2; color:${NAVY}; margin:0 0 6px; }
        .ben-rt p { font-family:'Inter',sans-serif; font-size:clamp(13px,1.05vw,16px); line-height:1.6; color:${MUTED}; margin:0; max-width:64ch; }

        @media (prefers-reduced-motion: reduce){ .ben-ico { transition:none; } }

        /* ── 5 · Numbers ── */
        .ab2-nums-sec { background:linear-gradient(180deg,#ffffff,#f3faf7); padding:clamp(56px,7vw,120px) 45px; }
        .ab2-nums-in { max-width:none; margin:0 auto; }
        .ab2-nums { display:grid; grid-template-columns:repeat(4,1fr); margin-top:clamp(28px,3.4vw,46px); border-top:1px solid rgba(19,41,61,0.14); }
        .ab2-num { padding:clamp(26px,3vw,50px) clamp(14px,1.6vw,28px) clamp(8px,1.4vw,16px) 0; }
        .ab2-num + .ab2-num { padding-left:clamp(18px,2vw,34px); border-left:1px solid rgba(19,41,61,0.1); }
        .ab2-num-n { display:block; font-family:'Poppins',sans-serif; font-weight:700; font-size:clamp(56px,8vw,140px); line-height:0.82; letter-spacing:-0.05em; color:${NAVY};
          background:linear-gradient(160deg, ${NAVY} 30%, ${GREEN}); -webkit-background-clip:text; background-clip:text; -webkit-text-fill-color:transparent; }
        .ab2-num-l { display:block; font-family:'Inter',sans-serif; font-weight:700; font-size:clamp(11px,0.9vw,13.5px); letter-spacing:1.6px; text-transform:uppercase; color:${MUTED}; margin-top:clamp(16px,1.8vw,26px); }

        /* ── 6 · Principles (dark) ── */
        .ab2-prin { position:relative; overflow:hidden; background:${NAVY}; padding:clamp(64px,8vw,130px) 45px; }
        .ab2-prin::before { content:''; position:absolute; inset:0; pointer-events:none; background-image:radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px); background-size:28px 28px; }
        .ab2-prin-glow { position:absolute; top:-140px; left:-80px; width:480px; height:480px; border-radius:50%; background:radial-gradient(circle, rgba(60,185,140,0.18), transparent 64%); pointer-events:none; }
        .ab2-prin-in { position:relative; z-index:1; max-width:none; margin:0 auto; }
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
        .ab2-quote-sec { position:relative; overflow:hidden; background:radial-gradient(60% 80% at 50% 0%, rgba(60,185,140,0.12), transparent 62%), linear-gradient(180deg,#ffffff,#f3faf7); padding:clamp(72px,10vw,150px) 45px; }
        .ab2-quote-sec::before { content:''; position:absolute; inset:0; pointer-events:none; background-image:radial-gradient(rgba(19,41,61,0.05) 1px, transparent 1px); background-size:30px 30px; }
        .ab2-quote { position:relative; z-index:1; max-width:1100px; margin:0 auto; font-family:'Poppins',sans-serif; font-weight:600; font-size:clamp(28px,4.2vw,66px); line-height:1.24; letter-spacing:-0.03em; color:${NAVY}; text-align:center; }
        .ab2-quote-mark { display:block; font-size:1.6em; line-height:0.5; color:${GREEN}; opacity:0.55; }
        .ab2-quote-by { font-family:'Inter',sans-serif; font-weight:700; font-size:clamp(11px,0.9vw,13px); letter-spacing:2px; text-transform:uppercase; color:${MUTED}; margin-top:clamp(26px,3vw,40px); }

        /* ── responsive ── */
        @media (max-width:900px){
          .ab2-thesis-in { grid-template-columns:1fr; gap:clamp(28px,6vw,44px); }
          .ab2-thesis-stick { position:static; }
          /* diamond mosaic → stack above the feature list */
          .ben { grid-template-columns:1fr; gap:clamp(36px,7vw,56px); }
          .ben-visual { order:-1; }
          .ph { max-width:500px; }
          .ab2-prin-grid { grid-template-columns:1fr; }
        }
        @media (max-width:600px){
          .ab2-nums { grid-template-columns:1fr 1fr; }
          .ab2-num:nth-child(3), .ab2-num:nth-child(4){ border-top:1px solid rgba(19,41,61,0.1); }
          .ab2-num:nth-child(3){ border-left:none; padding-left:0; }
        }
        @media (min-width:1920px){
          .ab2-hero-in, .ab2-thesis-in, .ab2-cap-wrap, .ab2-nums-in, .ab2-prin-in { max-width:none; }
        }
      `}</style>
    </div>
  )
}
