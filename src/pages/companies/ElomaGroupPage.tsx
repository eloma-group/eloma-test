import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useMotionValue, useSpring } from 'framer-motion'
import type { ReactNode, MouseEvent as ReactMouseEvent, CSSProperties } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight, Landmark, Wallet, Users, Compass, Server, ShieldCheck, Hourglass, BadgeCheck, Zap, Sprout, Laptop, Ship, Truck, Plane } from 'lucide-react'
import { useNavigate, Link } from 'react-router-dom'
import { Header } from '../../components/Header/Header'
import { FlyFooter } from '../../components/FlyFooter'

gsap.registerPlugin(ScrollTrigger)

/* ═══════════════════════════════════════════════════
   ELOMA GROUP - "Feature Split" (light institutional)
   Bricolage Grotesque on brand navy + green. Rich body:
   shared-services grid, illustrated holdings index and
   principle cards (no numbered steps).
   ═══════════════════════════════════════════════════ */

const INK   = '#0C1C2A'
const GREEN = '#3CB98C'
const MUTED = 'rgba(12,28,42,0.56)'
const PAPER = '#F3F5F4'
const EASE  = [0.16, 1, 0.3, 1] as [number, number, number, number]

const img = (id: string, w: number) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`

const SERVICES = [
  { Icon: Landmark, t: 'Governance', d: 'Board oversight, values and controls that every company inherits from day one.' },
  { Icon: Wallet, t: 'Finance & Treasury', d: 'Central capital allocation, funding and the financial discipline that funds growth.' },
  { Icon: Users, t: 'People & Culture', d: 'Leadership, hiring and a shared culture that travels across every business.' },
  { Icon: Compass, t: 'Strategy & M&A', d: 'Where the group goes next - new ventures, partnerships and acquisitions.' },
  { Icon: Server, t: 'Shared Technology', d: 'Common platforms, data and security that keep every company fast and safe.' },
  { Icon: ShieldCheck, t: 'Risk & Compliance', d: 'Legal, risk and compliance that protect the reputation of the whole group.' },
]

const HOLDINGS = [
  { name: 'EG Digital Australia', sector: 'Technology & Marketing', to: '/companies/eg-digital' },
  { name: 'EG Imports', sector: 'Global Trade & Sourcing', to: '/companies/eg-imports' },
  { name: 'EG Transport — BIVRY', sector: 'Transport & Logistics', to: '/companies/bivry' },
  { name: 'EG Travels', sector: 'Corporate & Leisure Travel', to: '/companies/eg-travels' },
]

/* org-chart: a lucide mark + horizontal centre (%) per company (4 equal columns) */
const KID_ICONS = [Laptop, Ship, Truck, Plane]
const CHILD_X = [12.5, 37.5, 62.5, 87.5]

/* cursor-tracked 3D tilt wrapper (framer-motion) — falls back to a plain box when motion is reduced */
function TiltNode({ children, className, reduce }: { children: ReactNode; className: string; reduce: boolean }) {
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const cfg = { stiffness: 170, damping: 15, mass: 0.4 }
  const rotX = useSpring(rx, cfg)
  const rotY = useSpring(ry, cfg)
  if (reduce) return <div className={className}>{children}</div>
  const onMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 18)
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 18)
  }
  const reset = () => { rx.set(0); ry.set(0) }
  return (
    <motion.div className={className} onMouseMove={onMove} onMouseLeave={reset}
      style={{ rotateX: rotX, rotateY: rotY, transformPerspective: 800, transformStyle: 'preserve-3d' }}>
      {children}
    </motion.div>
  )
}

const PRINCIPLES = [
  { Icon: Hourglass, t: 'Own for the long term', d: 'We are owners, not traders. Every decision is made with decades in mind - protecting reputation, people and capital.' },
  { Icon: BadgeCheck, t: 'Set one high standard', d: 'Clear governance, values and controls that every company inherits from day one, wherever they operate.' },
  { Icon: Zap, t: 'Enable the specialists', d: 'Central finance, people and technology free each company to focus entirely on its customers.' },
  { Icon: Sprout, t: 'Grow responsibly', d: 'Disciplined capital allocation and ethical, sustainable practice guide where the group goes next.' },
]

export function ElomaGroupPage() {
  const reduce = useReducedMotion()
  const nav = useNavigate()
  useEffect(() => { window.scrollTo(0, 0) }, [])

  /* ── Holdings · org-chart tree · active child (hover) + GSAP scroll reveal & connector draw ── */
  const [active, setActive] = useState(-1)
  const portRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (reduce) return
    const root = portRef.current
    if (!root) return

    const lenis = (window as unknown as { __lenis?: { on: (e: string, cb: () => void) => void; off: (e: string, cb: () => void) => void } }).__lenis
    const onScroll = () => ScrollTrigger.update()
    lenis?.on('scroll', onScroll)

    const ctx = gsap.context(() => {
      /* masked line-reveal for the heading + lead */
      gsap.from(root.querySelectorAll('.eg-tree-anim'), {
        yPercent: 118, opacity: 0, duration: 0.95, ease: 'power4.out', stagger: 0.1,
        scrollTrigger: { trigger: root, start: 'top 80%' },
      })

      /* the chart assembles top-down: parent drops in, connectors DRAW, child nodes pop */
      const tl = gsap.timeline({ scrollTrigger: { trigger: root.querySelector('.eg-tree-chart'), start: 'top 78%' } })
      tl.from('.eg-tree-parent', { y: 26, autoAlpha: 0, duration: 0.6, ease: 'power3.out' })
        .from('.eg-wire-stem', { scaleY: 0, duration: 0.28, ease: 'none' }, '-=0.1')
        .from('.eg-wire-bus', { scaleX: 0, duration: 0.5, ease: 'power1.inOut' })
        .from('.eg-wire-drop', { scaleY: 0, duration: 0.3, ease: 'none', stagger: 0.1 }, '-=0.08')
        .from('.eg-tree-kid', { y: 30, autoAlpha: 0, duration: 0.6, ease: 'power3.out', stagger: 0.1 }, '-=0.25')
    }, root)

    ScrollTrigger.refresh()

    return () => {
      lenis?.off('scroll', onScroll)
      ctx.revert()
    }
  }, [reduce])

  const rise = (d = 0) => reduce ? {} : ({
    initial: { opacity: 0, y: 28 }, whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' }, transition: { duration: 0.85, delay: d, ease: EASE },
  })

  return (
    <div className="eg" style={{ overflowX: 'hidden', background: '#fff' }}>
      <Header />

      {/* ── HERO (feature split) ── */}
      <section className="eg-hero">
        <div className="eg-wrap eg-hero-in">
          <div className="eg-hero-copy">
            <motion.nav className="eg-crumb" initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
              <Link to="/">Eloma Group</Link><span>/</span><span>Companies</span><span>/</span><em>Eloma Group</em>
            </motion.nav>
            <motion.p className="eg-eyebrow" initial={reduce ? false : { opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.05, ease: EASE }}>
              <span className="eg-eyebrow-line" />The parent company
            </motion.p>
            <motion.h1 className="eg-h1" initial={reduce ? false : { opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1, ease: EASE }}>
              The backbone<br />behind every<br /><span className="eg-hl">business.</span>
            </motion.h1>
            <motion.p className="eg-lead" initial={reduce ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: EASE }}>
              Eloma Group is the holding and shared-services company that binds our businesses together -
              the governance, capital discipline and central expertise that let each company focus on what it does best.
            </motion.p>
            <motion.div className="eg-cta-row" initial={reduce ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.28, ease: EASE }}>
              <button className="eg-btn eg-btn-p" onClick={() => nav('/contact#contact-form')}><span>Get in touch</span><ArrowUpRight size={17} strokeWidth={2.2} /></button>
              <button className="eg-btn eg-btn-g" onClick={() => nav('/about')}>About us</button>
            </motion.div>
          </div>

          <motion.div className="eg-hero-media" initial={reduce ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.22, ease: EASE }}>
            <img src="/images/eg-parent-office.webp" alt="Eloma Group headquarters" decoding="async" />
            <div className="eg-hero-plate">
              <span className="eg-hero-plate-mark">EG</span>
              <div>
                <span className="eg-hero-plate-est">Established in Australia</span>
                <span className="eg-hero-plate-txt">Multi-industry holding group</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SHARED SERVICES ── */}
      <section className="eg-svc">
        <div className="eg-wrap">
          <motion.div className="eg-svc-head" {...rise()}>
            <div>
              <p className="eg-eyebrow"><span className="eg-eyebrow-line" />The backbone</p>
              <h2 className="eg-h2">One shared engine behind every company.</h2>
            </div>
            <p className="eg-svc-lead">From finance and legal to people, technology and strategy, our central teams run as a single backbone - protecting the group and holding every company to one high standard.</p>
          </motion.div>
          <div className="eg-svc-grid">
            {SERVICES.map((s, i) => (
              <motion.article key={s.t} className="eg-svc-card"
                initial={reduce ? false : { opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.5, delay: (i % 3) * 0.07, ease: EASE }}>
                <span className="eg-svc-ic"><s.Icon size={22} strokeWidth={1.8} /></span>
                <h3 className="eg-svc-t">{s.t}</h3>
                <p className="eg-svc-d">{s.d}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOLDINGS (org-chart hierarchy tree) ── */}
      <section className="eg-tree" ref={portRef} data-reveal="off">
        <div className="eg-wrap">
          <div className="eg-tree-head">
            <p className="eg-eyebrow"><span className="eg-eyebrow-line" />The holdings</p>
            <h2 className="eg-h2 eg-tree-title">
              <span className="eg-tree-line"><span className="eg-tree-anim">How the group</span></span>
              <span className="eg-tree-line"><span className="eg-tree-anim">is structured.</span></span>
            </h2>
            <p className="eg-tree-lead eg-tree-anim">Eloma Group is the parent and holding company. Four specialist businesses sit beneath it — each running on the group's shared capital, governance and expertise.</p>
          </div>

          <div className="eg-tree-chart">
            {/* parent / holding company */}
            <div className="eg-tree-parent">
              <TiltNode className="eg-parent-card" reduce={!!reduce}>
                <span className="eg-parent-ic"><img src="/apple-touch-icon.png" alt="Eloma Group logo" decoding="async" /></span>
                <span className="eg-parent-txt">
                  <span className="eg-parent-kicker">Parent &amp; Holding Company</span>
                  <span className="eg-parent-name">Eloma Group</span>
                </span>
              </TiltNode>
            </div>

            {/* connectors — drawn by GSAP on scroll, active drop lights green */}
            <div className="eg-tree-wire">
              <span className="eg-wire-stem" />
              <span className="eg-wire-bus" />
              {CHILD_X.map((x, i) => (
                <span key={i} className={`eg-wire-drop${i === active ? ' is-active' : ''}`} style={{ left: `${x}%` }} />
              ))}
              {/* one glow splits into 4 points that fan out to each subsidiary */}
              {CHILD_X.map((x, i) => (
                <span key={`spark-${i}`} className="eg-wire-spark" style={{ ['--tx']: `${x}%` } as CSSProperties} />
              ))}
            </div>

            {/* subsidiaries */}
            <div className="eg-tree-kids">
              {HOLDINGS.map((c, i) => {
                const Icon = KID_ICONS[i]
                return (
                  <div
                    key={c.name}
                    className="eg-tree-kid"
                    onMouseEnter={() => setActive(i)}
                    onMouseLeave={() => setActive(-1)}
                  >
                    <Link to={c.to} className="eg-kid-link" onFocus={() => setActive(i)} onBlur={() => setActive(-1)} aria-label={`${c.name} — ${c.sector}`}>
                      <TiltNode className={`eg-kid-node${i === active ? ' is-active' : ''}`} reduce={!!reduce}>
                        <span className="eg-kid-ic"><Icon size={26} strokeWidth={1.7} /></span>
                        <span className="eg-kid-card">
                          <span className="eg-kid-name">{c.name}</span>
                          <span className="eg-kid-sector">{c.sector}</span>
                          <span className="eg-kid-tag">Group company <ArrowUpRight size={13} strokeWidth={2.4} /></span>
                        </span>
                      </TiltNode>
                    </Link>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── PRINCIPLES (cards, no numbers) ── */}
      <section className="eg-prin">
        <div className="eg-wrap eg-prin-grid">
          <motion.div className="eg-prin-intro" {...rise()}>
            <p className="eg-eyebrow"><span className="eg-eyebrow-line" />How we operate</p>
            <h2 className="eg-h2">The principles that guide the group.</h2>
            <p className="eg-p">We are stewards of businesses, people and capital - and we hold ourselves to a standard that outlasts any single quarter.</p>
          </motion.div>
          <div className="eg-prin-cards">
            {PRINCIPLES.map((p, i) => (
              <motion.div key={p.t} className="eg-prin-card"
                initial={reduce ? false : { opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.5, delay: (i % 2) * 0.08, ease: EASE }}>
                <span className="eg-prin-ic"><p.Icon size={20} strokeWidth={1.9} /></span>
                <h3 className="eg-prin-t">{p.t}</h3>
                <p className="eg-prin-d">{p.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NUMBERS BAND (light) ── */}
      <section className="eg-band">
        <div className="eg-wrap eg-band-grid">
          {[{ n: '5', l: 'Companies in the group' }, { n: '8', l: 'Countries of operation' }, { n: '15+', l: 'Years combined heritage' }, { n: '1', l: 'Culture, one standard' }].map((s, i) => (
            <motion.div key={s.l} className="eg-band-item" initial={reduce ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}>
              <span className="eg-band-n">{s.n}</span>
              <span className="eg-band-l">{s.l}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── STEWARDSHIP ── */}
      <section className="eg-stew">
        <div className="eg-wrap eg-stew-grid">
          <motion.div className="eg-stew-media" {...rise()}>
            <img src={img('photo-1521791136064-7986c2920216', 1100)} alt="Eloma Group leadership" decoding="async" loading="lazy" />
          </motion.div>
          <motion.div className="eg-stew-copy" {...rise(0.1)}>
            <span className="eg-stew-mark">“</span>
            <p className="eg-stew-txt">We build enterprises meant to outlast us - disciplined in how we operate, bold in where we invest, and unwavering in the standard we hold.</p>
            <div className="eg-stew-by">
              <span className="eg-stew-name">Eloma Group</span>
              <span className="eg-stew-role">Holding &amp; Shared Services</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA (light) ── */}
      <section className="eg-cta">
        <div className="eg-wrap eg-cta-in">
          <motion.div className="eg-cta-copy" {...rise()}>
            <p className="eg-eyebrow"><span className="eg-eyebrow-line" />Join us</p>
            <h2 className="eg-cta-h">Partner with the group.</h2>
          </motion.div>
          <motion.div className="eg-cta-act" {...rise(0.08)}>
            <p className="eg-cta-sub">Whether you are a business, a partner or a talent - there is a place for you here.</p>
            <button className="eg-btn eg-btn-p" onClick={() => nav('/contact#contact-form')}><span>Get in touch</span><ArrowUpRight size={18} strokeWidth={2.2} /></button>
          </motion.div>
        </div>
      </section>

      <FlyFooter />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,600;12..96,700&display=swap');
        .eg-wrap { max-width: none; margin: 0 auto; }
        .eg-hl { color:${GREEN}; }
        .eg-eyebrow { display:inline-flex; align-items:center; gap:14px; margin:0; font-family:'Eloma Sans',sans-serif; font-weight:700; font-size:clamp(10px,0.82vw,12.5px); letter-spacing:2.5px; text-transform:uppercase; color:${GREEN}; }
        .eg-eyebrow-line { width:32px; height:1.5px; background:${GREEN}; flex-shrink:0; }
        .eg-h1 { font-family:'Eloma Sans Heading',sans-serif; font-weight:700; font-size:clamp(44px,6.6vw,104px); line-height:0.98; letter-spacing:-0.03em; color:${INK}; margin:clamp(20px,2.4vw,30px) 0 0; }
        .eg-h2 { font-family:'Eloma Sans Heading',sans-serif; font-weight:700; font-size:clamp(29px,4vw,58px); line-height:1.04; letter-spacing:-0.025em; color:${INK}; margin:16px 0 0; }
        .eg-p { font-family:'Eloma Sans',sans-serif; font-size:clamp(15px,1.2vw,18px); line-height:1.85; color:${MUTED}; margin:clamp(18px,2vw,26px) 0 0; max-width:60ch; }

        .eg-btn { display:inline-flex; align-items:center; gap:9px; cursor:pointer; font-family:'Eloma Sans',sans-serif; font-weight:600; font-size:clamp(14px,1vw,16px); border-radius:10px; padding:15px 28px; border:none; text-decoration:none; transition:transform .3s cubic-bezier(0.16,1,0.3,1), background .3s ease, color .3s ease, border-color .3s ease, box-shadow .3s ease; }
        .eg-btn-p { background:${INK}; color:#fff; box-shadow:0 18px 40px -18px rgba(12,28,42,0.6); }
        .eg-btn-p:hover { transform:translateY(-2px); background:${GREEN}; color:${INK}; box-shadow:0 22px 46px -18px rgba(60,185,140,0.6); }
        .eg-btn-g { background:transparent; color:${INK}; border:1.5px solid rgba(12,28,42,0.2); }
        .eg-btn-g:hover { transform:translateY(-2px); border-color:${GREEN}; color:${GREEN}; }

        /* HERO */
        .eg-hero { position:relative; background:linear-gradient(180deg,#ffffff 0%,${PAPER} 100%); padding:clamp(120px,13vw,185px) 45px clamp(60px,7vw,110px); }
        .eg-hero-in { display:grid; grid-template-columns:1.08fr 0.92fr; gap:clamp(36px,5vw,80px); align-items:center; }
        .eg-crumb { display:flex; align-items:center; gap:9px; font-family:'Eloma Sans',sans-serif; font-size:clamp(11px,0.85vw,13px); color:${MUTED}; margin-bottom:clamp(20px,2.4vw,30px); flex-wrap:wrap; }
        .eg-crumb a { color:${MUTED}; text-decoration:none; transition:color .2s ease; }
        .eg-crumb a:hover { color:${GREEN}; }
        .eg-crumb em { color:${INK}; font-style:normal; font-weight:600; }
        .eg-lead { font-family:'Eloma Sans',sans-serif; font-size:clamp(15px,1.25vw,19px); line-height:1.85; color:${MUTED}; max-width:52ch; margin:clamp(22px,2.6vw,32px) 0 0; }
        .eg-cta-row { display:flex; flex-wrap:wrap; gap:14px; margin-top:clamp(28px,3.2vw,40px); }
        .eg-hero-media { position:relative; }
        .eg-hero-media > img { width:100%; aspect-ratio:4/5; object-fit:cover; display:block; border-radius:16px; box-shadow:0 50px 90px -50px rgba(12,28,42,0.5); }
        .eg-hero-plate { position:absolute; left:clamp(-4px,-0.6vw,-4px); bottom:clamp(20px,2.4vw,32px); display:flex; align-items:center; gap:13px; background:#fff; border:1px solid rgba(12,28,42,0.08); border-radius:12px; padding:13px 18px; box-shadow:0 24px 50px -30px rgba(12,28,42,0.5); }
        .eg-hero-plate-mark { display:inline-flex; align-items:center; justify-content:center; width:44px; height:44px; border:1.5px solid ${GREEN}; border-radius:10px; font-family:'Eloma Sans Heading',sans-serif; font-weight:700; font-size:18px; color:${GREEN}; letter-spacing:-0.02em; flex-shrink:0; }
        .eg-hero-plate-est { display:block; font-family:'Eloma Sans Heading',sans-serif; font-weight:600; font-size:clamp(14px,1.2vw,17px); color:${INK}; letter-spacing:-0.01em; }
        .eg-hero-plate-txt { display:block; font-family:'Eloma Sans',sans-serif; font-size:clamp(11px,0.9vw,13px); color:${MUTED}; margin-top:2px; }

        /* SHARED SERVICES */
        .eg-svc { background:#fff; padding:clamp(64px,8vw,130px) 45px; }
        .eg-svc-head { display:grid; grid-template-columns:1.1fr 0.9fr; gap:clamp(24px,4vw,64px); align-items:end; margin-bottom:clamp(38px,4.5vw,64px); }
        .eg-svc-lead { font-family:'Eloma Sans',sans-serif; font-size:clamp(14px,1.1vw,17px); line-height:1.8; color:${MUTED}; margin:0; }
        .eg-svc-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:clamp(14px,1.4vw,20px); }
        .eg-svc-card { background:${PAPER}; border:1px solid rgba(12,28,42,0.07); border-radius:18px; padding:clamp(26px,2.6vw,38px); transition:transform .45s cubic-bezier(0.16,1,0.3,1), background .4s ease, box-shadow .45s ease; }
        .eg-svc-card:hover { transform:translateY(-6px); background:#fff; box-shadow:0 40px 80px -50px rgba(12,28,42,0.3); }
        .eg-svc-ic { display:inline-flex; align-items:center; justify-content:center; width:52px; height:52px; border-radius:14px; background:rgba(60,185,140,0.12); color:${GREEN}; margin-bottom:clamp(18px,2vw,26px); transition:transform .45s cubic-bezier(0.16,1,0.3,1), background .4s ease, color .4s ease; }
        .eg-svc-card:hover .eg-svc-ic { transform:translateY(-3px); background:${GREEN}; color:#fff; }
        .eg-svc-t { font-family:'Eloma Sans Heading',sans-serif; font-weight:600; font-size:clamp(19px,1.7vw,25px); letter-spacing:-0.02em; color:${INK}; margin:0 0 10px; }
        .eg-svc-d { font-family:'Eloma Sans',sans-serif; font-size:clamp(13.5px,1vw,15.5px); line-height:1.75; color:${MUTED}; margin:0; }

        /* HOLDINGS — org-chart hierarchy tree (light stage) */
        .eg-tree { position:relative; background:linear-gradient(180deg,#ffffff 0%,${PAPER} 100%); padding:clamp(64px,8vw,128px) 45px; overflow:hidden; }
        .eg-tree::before { content:''; position:absolute; inset:-8%; background:radial-gradient(70% 50% at 78% 4%, rgba(60,185,140,0.12), transparent 55%); pointer-events:none; animation:egTreeDrift 15s ease-in-out infinite alternate; }
        @keyframes egTreeDrift { from{ transform:translate(0,0) scale(1); } to{ transform:translate(-5%,3%) scale(1.06); } }
        .eg-tree .eg-wrap { position:relative; }
        .eg-tree-head { text-align:center; max-width:760px; margin:0 auto clamp(30px,4vw,52px); }
        .eg-tree-head .eg-eyebrow { justify-content:center; }
        .eg-tree-title { color:${INK}; }
        .eg-tree-line { display:block; overflow:hidden; padding-bottom:0.04em; }
        .eg-tree-anim { display:block; }
        .eg-tree-lead { font-family:'Eloma Sans',sans-serif; font-size:clamp(14px,1.15vw,17px); line-height:1.8; color:${MUTED}; margin:clamp(16px,1.8vw,22px) auto 0; max-width:62ch; }

        .eg-tree-chart { max-width:none; margin:0 auto; }

        /* parent / holding company box */
        .eg-tree-parent { display:flex; justify-content:center; }
        .eg-parent-card { position:relative; display:inline-flex; align-items:center; gap:clamp(14px,1.6vw,20px); background:${INK}; border-radius:16px;
          padding:clamp(18px,1.9vw,26px) clamp(24px,2.8vw,40px); box-shadow:0 34px 60px -32px rgba(12,28,42,0.6); transform-style:preserve-3d; will-change:transform; }
        .eg-parent-card::before { content:''; position:absolute; inset:0; border-radius:16px; z-index:-1; pointer-events:none; animation:egParentGlow 4.8s ease-in-out infinite; }
        @keyframes egParentGlow { 0%{ box-shadow:0 0 46px 0 rgba(60,185,140,0.5); } 22%,100%{ box-shadow:0 0 24px -6px rgba(60,185,140,0.16); } }
        .eg-parent-ic { position:relative; display:inline-flex; align-items:center; justify-content:center; width:clamp(48px,4.4vw,62px); height:clamp(48px,4.4vw,62px);
          border-radius:13px; background:#fff; overflow:hidden; transform:translateZ(42px); box-shadow:0 8px 20px -10px rgba(0,0,0,0.5); }
        .eg-parent-ic img { width:100%; height:100%; object-fit:cover; display:block; }
        .eg-parent-ic::after { content:''; position:absolute; inset:0; border-radius:13px; border:1px solid rgba(60,185,140,0.6); animation:egParentPing 4.8s ease-out infinite; }
        @keyframes egParentPing { 0%{ transform:scale(1); opacity:0.75; } 11%{ transform:scale(1.5); opacity:0; } 100%{ transform:scale(1.5); opacity:0; } }
        .eg-parent-txt { display:flex; flex-direction:column; transform:translateZ(24px); }
        .eg-parent-kicker { font-family:'Eloma Sans',sans-serif; font-weight:700; font-size:clamp(9px,0.8vw,11.5px); letter-spacing:2px; text-transform:uppercase; color:${GREEN}; }
        .eg-parent-name { font-family:'Eloma Sans Heading',sans-serif; font-weight:700; font-size:clamp(23px,2.5vw,36px); letter-spacing:-0.025em; color:#fff; line-height:1.05; margin-top:3px; }

        /* connectors — faint base line + a green energy pulse that flows parent → bus → subsidiaries */
        .eg-tree-wire { position:relative; height:clamp(66px,7vw,104px); margin:clamp(2px,0.5vw,6px) 0; }
        .eg-wire-stem, .eg-wire-bus, .eg-wire-drop { position:absolute; background:rgba(12,28,42,0.2); overflow:visible; }
        .eg-wire-stem { left:50%; top:0; width:2px; height:42%; transform:translateX(-50%); transform-origin:top center; }
        .eg-wire-bus { top:42%; left:12.5%; width:75%; height:2px; transform-origin:center; }
        .eg-wire-drop { top:42%; width:2px; height:58%; transform:translateX(-50%); transform-origin:top center; transition:background .35s ease, box-shadow .35s ease; }
        .eg-wire-drop.is-active { background:${GREEN}; box-shadow:0 0 10px rgba(60,185,140,0.6); }
        /* one shared 4.8s cycle: a glow leaves the parent, splits into 4 points at the junction,
           each fans out to its column, then runs down to its subsidiary */
        .eg-wire-stem::after { content:''; position:absolute; left:50%; transform:translateX(-50%); width:4px; height:34%; border-radius:4px;
          background:${GREEN}; box-shadow:0 0 11px 2px rgba(60,185,140,0.85); animation:egFlowStem 4.8s linear infinite; }
        @keyframes egFlowStem { 0%{ top:-36%; opacity:0; } 3%{ opacity:1; } 26%{ top:100%; opacity:1; } 29%,100%{ top:100%; opacity:0; } }
        .eg-wire-spark { position:absolute; top:42%; left:50%; width:7px; height:7px; margin:-3.5px 0 0 -3.5px; border-radius:50%;
          background:${GREEN}; box-shadow:0 0 12px 3px rgba(60,185,140,0.9); opacity:0; animation:egSplit 4.8s ease-in-out infinite; }
        @keyframes egSplit {
          0%,25% { left:50%; top:42%; opacity:0; }
          28% { left:50%; top:42%; opacity:1; }
          45% { left:var(--tx); top:42%; opacity:1; }
          93% { left:var(--tx); top:100%; opacity:1; }
          98%,100% { left:var(--tx); top:100%; opacity:0; }
        }

        /* subsidiary nodes */
        .eg-tree-kids { display:grid; grid-template-columns:repeat(4,1fr); gap:clamp(16px,2vw,40px); }
        .eg-tree-kid { display:flex; justify-content:center; }
        .eg-kid-link { display:block; width:100%; max-width:340px; text-decoration:none; }
        .eg-kid-node { display:flex; flex-direction:column; align-items:center; text-align:center; transform-style:preserve-3d; will-change:transform; }
        .eg-kid-ic { position:relative; z-index:2; display:inline-flex; align-items:center; justify-content:center; width:clamp(58px,6vw,76px); height:clamp(58px,6vw,76px);
          border-radius:50%; background:#fff; border:3px solid ${INK}; color:${INK}; transform:translateZ(48px);
          box-shadow:0 16px 30px -16px rgba(12,28,42,0.4); transition:border-color .4s ease, color .4s ease, background .4s ease, box-shadow .4s ease; }
        .eg-kid-node.is-active .eg-kid-ic { border-color:${GREEN}; color:${GREEN}; background:rgba(60,185,140,0.08);
          box-shadow:0 0 0 5px rgba(60,185,140,0.14), 0 20px 40px -18px rgba(60,185,140,0.45); }
        /* the circle "receives" the wave: a glow flash + an expanding ping ring */
        .eg-kid-ic::before { content:''; position:absolute; inset:0; border-radius:50%; opacity:0; box-shadow:0 0 22px 4px rgba(60,185,140,0.7); animation:egKidFlash 4.8s ease-out infinite; pointer-events:none; }
        .eg-kid-ic::after { content:''; position:absolute; inset:-2px; border-radius:50%; border:2px solid ${GREEN}; opacity:0; animation:egKidPing 4.8s ease-out infinite; pointer-events:none; }
        @keyframes egKidFlash { 0%,90%{ opacity:0; } 94%{ opacity:1; } 99%,100%{ opacity:0; } }
        @keyframes egKidPing { 0%,90%{ transform:scale(1); opacity:0; } 93%{ transform:scale(1); opacity:0.9; } 100%{ transform:scale(1.55); opacity:0; } }
        .eg-kid-card { position:relative; z-index:1; width:100%; margin-top:clamp(12px,1.4vw,18px); background:#fff; border:1px solid rgba(12,28,42,0.1);
          border-radius:16px; padding:clamp(16px,1.7vw,24px) clamp(12px,1.4vw,20px); box-shadow:0 22px 44px -30px rgba(12,28,42,0.3);
          transform:translateZ(20px); transition:border-color .4s ease, box-shadow .4s ease; display:flex; flex-direction:column; align-items:center; gap:5px;
          animation:egCardFloat 5.5s ease-in-out infinite; }
        .eg-tree-kid:nth-child(2) .eg-kid-card { animation-delay:.7s; }
        .eg-tree-kid:nth-child(3) .eg-kid-card { animation-delay:1.4s; }
        .eg-tree-kid:nth-child(4) .eg-kid-card { animation-delay:2.1s; }
        @keyframes egCardFloat { 0%,100%{ transform:translateZ(20px) translateY(0); } 50%{ transform:translateZ(20px) translateY(-7px); } }
        .eg-kid-node.is-active .eg-kid-card { border-color:rgba(60,185,140,0.5); box-shadow:0 34px 64px -34px rgba(12,28,42,0.42); }
        .eg-kid-name { font-family:'Eloma Sans Heading',sans-serif; font-weight:700; font-size:clamp(16px,1.5vw,21px); letter-spacing:-0.015em; color:${INK}; line-height:1.1; }
        .eg-kid-sector { font-family:'Eloma Sans',sans-serif; font-size:clamp(12px,0.95vw,14px); line-height:1.4; color:${MUTED}; }
        .eg-kid-tag { display:inline-flex; align-items:center; gap:5px; margin-top:5px; font-family:'Eloma Sans',sans-serif; font-weight:600;
          font-size:clamp(10px,0.82vw,12px); letter-spacing:0.3px; color:${GREEN}; opacity:0; transform:translateY(4px); transition:opacity .35s ease, transform .35s ease; }
        .eg-kid-node.is-active .eg-kid-tag { opacity:1; transform:translateY(0); }

        /* PRINCIPLES */
        .eg-prin { background:#fff; padding:clamp(60px,7vw,120px) 45px; }
        .eg-prin-grid { display:grid; grid-template-columns:0.85fr 1.15fr; gap:clamp(32px,5vw,80px); align-items:start; }
        .eg-prin-intro { position:sticky; top:100px; }
        .eg-prin-cards { display:grid; grid-template-columns:1fr 1fr; gap:clamp(14px,1.6vw,22px); }
        .eg-prin-card { border:1px solid rgba(12,28,42,0.1); border-radius:18px; padding:clamp(26px,2.6vw,38px); transition:transform .45s cubic-bezier(0.16,1,0.3,1), border-color .4s ease, box-shadow .45s ease; }
        .eg-prin-card:hover { transform:translateY(-6px); border-color:rgba(60,185,140,0.5); box-shadow:0 40px 80px -50px rgba(12,28,42,0.3); }
        .eg-prin-ic { display:inline-flex; align-items:center; justify-content:center; width:48px; height:48px; border-radius:13px; background:rgba(60,185,140,0.12); color:${GREEN}; margin-bottom:clamp(16px,1.8vw,22px); }
        .eg-prin-t { font-family:'Eloma Sans Heading',sans-serif; font-weight:600; font-size:clamp(19px,1.7vw,26px); letter-spacing:-0.02em; color:${INK}; margin:0 0 10px; }
        .eg-prin-d { font-family:'Eloma Sans',sans-serif; font-size:clamp(13.5px,1vw,15.5px); line-height:1.75; color:${MUTED}; margin:0; }

        /* NUMBERS BAND (light) */
        .eg-band { background:${PAPER}; padding:clamp(48px,5.5vw,88px) 45px; }
        .eg-band-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:clamp(20px,2vw,32px); }
        .eg-band-item { display:flex; flex-direction:column; gap:8px; }
        .eg-band-item + .eg-band-item { padding-left:clamp(20px,2vw,32px); border-left:1px solid rgba(12,28,42,0.14); }
        .eg-band-n { font-family:'Eloma Sans Heading',sans-serif; font-weight:700; font-size:clamp(40px,5vw,78px); line-height:0.9; color:${INK}; letter-spacing:-0.03em; }
        .eg-band-n::first-letter { color:${GREEN}; }
        .eg-band-l { font-family:'Eloma Sans',sans-serif; font-size:clamp(11px,0.9vw,14px); color:${MUTED}; letter-spacing:0.4px; }

        /* STEWARDSHIP */
        .eg-stew { background:#fff; padding:clamp(60px,7vw,120px) 45px; }
        .eg-stew-grid { display:grid; grid-template-columns:0.9fr 1.1fr; gap:clamp(32px,5vw,72px); align-items:center; }
        .eg-stew-media { border-radius:14px; overflow:hidden; aspect-ratio:1/1; box-shadow:0 44px 84px -48px rgba(12,28,42,0.45); }
        .eg-stew-media img { width:100%; height:100%; object-fit:cover; display:block; }
        .eg-stew-mark { display:block; font-family:'Eloma Sans Heading',sans-serif; font-weight:700; font-size:clamp(70px,8vw,140px); line-height:0.6; color:${GREEN}; }
        .eg-stew-txt { font-family:'Eloma Sans Heading',sans-serif; font-weight:500; font-size:clamp(23px,3vw,46px); line-height:1.22; letter-spacing:-0.02em; color:${INK}; margin:clamp(10px,1.4vw,20px) 0 0; }
        .eg-stew-by { margin-top:clamp(24px,3vw,36px); }
        .eg-stew-name { display:block; font-family:'Eloma Sans',sans-serif; font-weight:700; font-size:clamp(15px,1.2vw,18px); color:${INK}; }
        .eg-stew-role { display:block; font-family:'Eloma Sans',sans-serif; font-size:clamp(12px,1vw,14px); letter-spacing:1.5px; text-transform:uppercase; color:${GREEN}; margin-top:5px; }

        /* CTA (light, full-width closing band) */
        .eg-cta { position:relative; background:${PAPER}; border-top:1px solid rgba(12,28,42,0.1); padding:clamp(64px,8vw,128px) 45px; }
        .eg-cta::before { content:''; position:absolute; top:-1px; left:15px; width:60px; height:3px; background:${GREEN}; }
        .eg-cta-in { display:grid; grid-template-columns:1.15fr 0.85fr; gap:clamp(28px,4vw,72px); align-items:end; }
        .eg-cta-h { font-family:'Eloma Sans Heading',sans-serif; font-weight:700; font-size:clamp(34px,4.6vw,72px); line-height:1.0; letter-spacing:-0.03em; color:${INK}; margin:16px 0 0; }
        .eg-cta-act { display:flex; flex-direction:column; align-items:flex-start; gap:clamp(20px,2.4vw,28px); padding-bottom:6px; }
        .eg-cta-sub { font-family:'Eloma Sans',sans-serif; font-size:clamp(14px,1.15vw,17px); line-height:1.75; color:${MUTED}; margin:0; max-width:42ch; }

        /* responsive */
        @media (max-width:1024px){
          .eg-hero-in { grid-template-columns:1fr; gap:clamp(40px,7vw,56px); }
          .eg-hero-media { max-width:520px; }
          .eg-svc-head { grid-template-columns:1fr; gap:clamp(16px,3vw,24px); align-items:start; }
          .eg-svc-grid { grid-template-columns:1fr 1fr; }
          .eg-prin-grid { grid-template-columns:1fr; gap:clamp(28px,5vw,44px); }
          .eg-prin-intro { position:static; }
          .eg-stew-grid { grid-template-columns:1fr; }
          .eg-stew-media { order:-1; max-width:520px; }
          .eg-cta-in { grid-template-columns:1fr; align-items:start; gap:clamp(24px,5vw,36px); }
        }
        /* holdings tree → stack the subsidiaries into a single vertical chain */
        @media (max-width:860px){
          .eg-tree-wire { display:none; }
          .eg-tree-kids { grid-template-columns:1fr; gap:clamp(26px,6vw,38px); max-width:400px; margin:0 auto; position:relative; padding-top:clamp(24px,6vw,34px); }
          .eg-tree-kids::before { content:''; position:absolute; top:0; left:50%; transform:translateX(-50%); width:2px; height:100%; background:rgba(12,28,42,0.16); }
          .eg-kid-tag { opacity:1; transform:none; }
        }
        @media (max-width:640px){
          .eg-svc-grid { grid-template-columns:1fr; }
          .eg-prin-cards { grid-template-columns:1fr; }
          .eg-band-grid { grid-template-columns:1fr 1fr; gap:32px 20px; }
          .eg-band-item:nth-child(3){ border-left:none; padding-left:0; }
          .eg-parent-card { flex-direction:column; text-align:center; gap:12px; }
        }
        @media (max-width:400px){
          .eg-band-grid { grid-template-columns:1fr; }
          .eg-band-item + .eg-band-item { border-left:none; padding-left:0; }
        }
        @media (min-width:1920px){
          .eg-wrap { max-width:none; }
          .eg-h1 { font-size:118px; }
          .eg-h2 { font-size:66px; }
          .eg-lead,.eg-p { font-size:20px; }
        }
        @media (min-width:2560px){
          .eg-wrap { max-width:none; }
          .eg-h1 { font-size:152px; }
          .eg-h2 { font-size:92px; }
          .eg-stew-txt { font-size:58px; }
          .eg-parent-name { font-size:44px; }
          .eg-kid-name { font-size:26px; }
        }
        @media (prefers-reduced-motion: reduce){
          .eg-btn,.eg-svc-card,.eg-svc-ic,.eg-prin-card,.eg-kid-ic,.eg-kid-card,.eg-kid-tag,.eg-wire-drop { transition:none; }
          .eg-tree::before,.eg-parent-card::before,.eg-parent-ic::after,.eg-kid-card,
          .eg-kid-ic::before,.eg-kid-ic::after,
          .eg-wire-stem::after,.eg-wire-spark { animation:none; }
          .eg-wire-spark { display:none; }
          .eg-kid-card { transform:translateZ(20px); }
        }
      `}</style>
    </div>
  )
}
