import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Star, Users, Leaf, Heart, TrendingUp, Handshake, HeartHandshake } from 'lucide-react'

const NAVY  = '#1A2B3C'
const GOLD  = '#B0894A'
const MUTED = 'rgba(26,43,60,0.62)'
const EASE  = [0.16, 1, 0.3, 1] as [number, number, number, number]

type Tab = { icon: React.ReactNode; label: string }
const TABS: Tab[] = [
  { icon: <Star size={24} strokeWidth={1.7} />,  label: 'Purpose' },
  { icon: <Users size={24} strokeWidth={1.7} />, label: 'People' },
  { icon: <Leaf size={24} strokeWidth={1.7} />,  label: 'Growth' },
  { icon: <Heart size={24} strokeWidth={1.7} />, label: 'Wellness' },
]

type Card = {
  area: 'a' | 'b' | 'c' | 'd'
  icon: React.ReactNode; title: string; body: string; img: string; alt: string
}

const IMG = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=70`

const CARDS: Card[] = [
  { area: 'a', icon: <Users size={22} strokeWidth={1.8} />, title: 'People First',
    body: 'We value, respect and empower every individual.',
    img: IMG('photo-1600880292203-757bb62b4baf'), alt: 'Two colleagues collaborating at a laptop' },
  { area: 'b', icon: <TrendingUp size={22} strokeWidth={1.8} />, title: 'Grow Together',
    body: 'We support learning, growth and new opportunities.',
    img: IMG('photo-1531482615713-2afd69097998'), alt: 'Professional sketching ideas on a glass board' },
  { area: 'c', icon: <Handshake size={22} strokeWidth={1.8} />, title: 'Stronger Together',
    body: 'Collaboration and trust drive everything we achieve.',
    img: IMG('photo-1522071820081-009f0129c71c'), alt: 'A team working together around a laptop' },
  { area: 'd', icon: <HeartHandshake size={22} strokeWidth={1.8} />, title: 'Wellness Matters',
    body: 'We care about your well-being and work-life balance.',
    img: IMG('photo-1497366754035-f200968a6e72'), alt: 'A calm, modern office lounge with plants' },
]

export function EgLife() {
  const reduce = useReducedMotion()
  const navigate = useNavigate()
  const [active, setActive] = useState(0)

  const rise = (d = 0) => ({
    initial: reduce ? false : { opacity: 0, y: 26 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-70px' },
    transition: { duration: 0.85, delay: d, ease: EASE },
  })

  return (
    <section className="eg-life" aria-label="Life at Eloma Group">
      <style>{`
        .eg-life {
          position: relative; overflow: hidden;
          background:
            radial-gradient(58% 52% at 14% 26%, rgba(176,137,74,0.06), transparent 60%),
            linear-gradient(180deg, #f6f3ec 0%, #f2eee5 100%);
          padding: clamp(56px,8vw,132px) 45px;
        }
        .eg-life-inner {
          position: relative; z-index: 1; width: 100%; margin: 0 auto;
          display: grid; grid-template-columns: minmax(0,0.92fr) minmax(0,1.28fr);
          gap: clamp(30px,3.4vw,64px); align-items: center;
        }

        /* ── Left copy ──────────────────────────────────────── */
        .eg-life-eyebrow { font-family:'Poppins',sans-serif; font-weight:700; letter-spacing:2.5px;
          text-transform:uppercase; font-size:clamp(11px,0.85vw,13px); color:${GOLD}; margin:0; }
        .eg-life-rule {
          display:block; position:relative; width: clamp(180px,20vw,250px); height:1px;
          background: rgba(176,137,74,0.4); margin: clamp(12px,1.4vw,16px) 0 clamp(24px,3vw,36px);
        }
        .eg-life-rule::before {
          content:''; position:absolute; left:0; top:50%; width:9px; height:9px;
          transform: translate(-1px,-50%) rotate(45deg); background:${GOLD};
        }
        .eg-life-h {
          font-family:'Poppins',sans-serif; font-weight:800; text-transform:none;
          font-size: clamp(38px,5vw,76px); line-height:1.0; letter-spacing:-0.03em;
          color:${NAVY}; margin: 0 0 clamp(20px,2.4vw,32px);
        }
        .eg-life-h span { display:block; color:${GOLD}; }
        .eg-life-body {
          font-family:'Inter',sans-serif; font-size:clamp(14px,1.05vw,17px); line-height:1.8;
          color:${MUTED}; margin: 0 0 clamp(26px,3vw,40px); max-width: 470px;
        }
        .eg-life-btn {
          display:inline-flex; align-items:center; gap:14px; cursor:pointer;
          font-family:'Poppins',sans-serif; font-weight:700; letter-spacing:1.5px;
          text-transform:uppercase; font-size:clamp(12px,0.9vw,13px); color:${GOLD};
          background:none; border:1.5px solid rgba(176,137,74,0.55); border-radius:8px;
          padding: clamp(14px,1.4vw,18px) clamp(22px,2vw,30px);
          transition: background .4s ease, color .4s ease, border-color .4s ease, box-shadow .4s ease;
        }
        .eg-life-btn svg { transition: transform .4s cubic-bezier(0.16,1,0.3,1); }
        .eg-life-btn:hover {
          background:${GOLD}; color:#fff; border-color:${GOLD};
          box-shadow: 0 16px 30px -12px rgba(176,137,74,0.55);
        }
        .eg-life-btn:hover svg { transform: translateX(6px); }

        /* ── Tabs ───────────────────────────────────────────── */
        .eg-life-tabs {
          margin-top: clamp(30px,3.4vw,48px); display:flex; max-width:580px;
          background: rgba(255,255,255,0.55); border:1px solid rgba(26,43,60,0.06);
          border-radius: 20px; padding:6px;
          box-shadow: 0 20px 40px -30px rgba(19,41,61,0.3);
        }
        .eg-life-tab {
          flex:1; position:relative; display:flex; flex-direction:column; align-items:center;
          gap:9px; padding: clamp(14px,1.4vw,20px) 6px; background:none; border:0; cursor:pointer;
          color:${MUTED}; transition: color .3s ease; font-family:'Poppins',sans-serif;
        }
        .eg-life-tab svg { transition: transform .35s cubic-bezier(0.16,1,0.3,1); }
        .eg-life-tab-label { font-size:clamp(12px,0.9vw,14px); font-weight:600; letter-spacing:0.2px; }
        .eg-life-tab:hover { color:${GOLD}; }
        .eg-life-tab:hover svg { transform: translateY(-3px); }
        .eg-life-tab.on { color:${GOLD}; }
        .eg-life-tab::after {
          content:''; position:absolute; bottom:3px; left:50%; transform:translateX(-50%) scaleX(0);
          width:26px; height:2px; border-radius:2px; background:${GOLD};
          transition: transform .35s cubic-bezier(0.16,1,0.3,1);
        }
        .eg-life-tab:hover::after, .eg-life-tab.on::after { transform:translateX(-50%) scaleX(1); }

        /* ── Right bento cards ──────────────────────────────── */
        .eg-life-cards {
          display:grid; grid-template-columns:1fr 1fr;
          grid-template-areas: "a a" "b c" "d d"; gap: clamp(10px,1vw,16px);
        }
        .eg-life-card {
          position:relative; overflow:hidden; display:flex; flex-direction:column;
          justify-content:space-between; border-radius: clamp(14px,1.4vw,22px);
          min-height: clamp(190px,19vw,280px);
          box-shadow: 0 26px 50px -32px rgba(19,41,61,0.4);
        }
        .eg-life-card.a { grid-area:a; }
        .eg-life-card.b { grid-area:b; min-height: clamp(210px,23vw,330px); }
        .eg-life-card.c { grid-area:c; min-height: clamp(210px,23vw,330px); }
        .eg-life-card.d { grid-area:d; }
        .eg-life-card img {
          position:absolute; inset:0; width:100%; height:100%; object-fit:cover;
          transition: transform .8s cubic-bezier(0.16,1,0.3,1); will-change:transform;
        }
        .eg-life-card::after {
          content:''; position:absolute; inset:0; pointer-events:none;
          background: linear-gradient(180deg, rgba(18,28,38,0.12) 0%, rgba(18,28,38,0.32) 44%, rgba(12,20,28,0.82) 100%);
        }
        .eg-life-card:hover img { transform: scale(1.07); }
        .eg-life-badge {
          position:relative; z-index:2; margin: clamp(16px,1.6vw,24px) 0 0 clamp(16px,1.6vw,24px);
          width: clamp(44px,3.6vw,56px); height: clamp(44px,3.6vw,56px); border-radius:50%;
          display:flex; align-items:center; justify-content:center; color:${GOLD};
          background: rgba(255,255,255,0.94);
          box-shadow: 0 10px 22px -10px rgba(0,0,0,0.5);
          transition: transform .4s cubic-bezier(0.16,1,0.3,1);
        }
        .eg-life-card:hover .eg-life-badge { transform: translateY(-3px) scale(1.05); }
        .eg-life-text { position:relative; z-index:2; padding: clamp(16px,1.8vw,26px); }
        .eg-life-card-h {
          font-family:'Poppins',sans-serif; font-weight:700; font-size:clamp(17px,1.5vw,24px);
          color:#fff; margin:0 0 6px; letter-spacing:-0.01em;
        }
        .eg-life-card-p {
          font-family:'Inter',sans-serif; font-size:clamp(12.5px,0.95vw,15px); line-height:1.5;
          color:rgba(255,255,255,0.86); margin:0; max-width:300px;
        }

        .eg-life-dots { display:flex; gap:8px; justify-content:center; margin-top: clamp(16px,1.6vw,22px); }
        .eg-life-dots i { width:8px; height:8px; border-radius:50%; background:rgba(26,43,60,0.18); }
        .eg-life-dots i.on { width:22px; border-radius:5px; background:${GOLD}; }

        /* ── Large screens ──────────────────────────────────── */
        @media (min-width:1920px) {
          .eg-life-inner { gap: 84px; }
          .eg-life-body { max-width:560px; }
        }

        /* ── Tablet / stacked ───────────────────────────────── */
        @media (max-width:1023px) {
          .eg-life-inner { grid-template-columns:1fr; gap: clamp(34px,5vw,48px); }
          .eg-life-body { max-width:none; }
          .eg-life-tabs { max-width:none; }
        }
        /* ── Phones ─────────────────────────────────────────── */
        @media (max-width:600px) {
          .eg-life-cards { grid-template-columns:1fr; grid-template-areas:"a" "b" "c" "d"; }
          .eg-life-card, .eg-life-card.b, .eg-life-card.c { min-height: clamp(200px,52vw,260px); }
          .eg-life-tab-label { font-size:12px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .eg-life-card img { transition:none; }
        }
      `}</style>

      <div className="eg-life-inner">
        {/* Left copy */}
        <div className="eg-life-copy">
          <motion.div {...rise(0)}>
            <p className="eg-life-eyebrow">Life at Eloma Group</p>
            <span className="eg-life-rule" aria-hidden />
          </motion.div>

          <motion.h2 className="eg-life-h" {...rise(0.06)}>
            Where People Thrive.<span>Every Day.</span>
          </motion.h2>

          <motion.p className="eg-life-body" {...rise(0.12)}>
            At Eloma Group, we believe our people are our greatest strength. We foster a culture of
            respect, collaboration, and continuous growth where every individual is empowered to do
            their best and create a lasting impact.
          </motion.p>

          <motion.button type="button" className="eg-life-btn" {...rise(0.16)}
            onClick={() => navigate('/careers')}>
            Explore Careers
            <ArrowRight size={18} strokeWidth={2.2} />
          </motion.button>

          <motion.div className="eg-life-tabs" role="tablist" aria-label="Culture pillars" {...rise(0.2)}>
            {TABS.map((t, i) => (
              <button key={t.label} type="button" role="tab" aria-selected={active === i}
                className={`eg-life-tab${active === i ? ' on' : ''}`} onClick={() => setActive(i)}>
                {t.icon}
                <span className="eg-life-tab-label">{t.label}</span>
              </button>
            ))}
          </motion.div>
        </div>

        {/* Right cards */}
        <motion.div className="eg-life-right"
          initial={reduce ? false : { opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, ease: EASE }}>
          <div className="eg-life-cards">
            {CARDS.map((c) => (
              <article key={c.title} className={`eg-life-card ${c.area}`}>
                <img src={c.img} alt={c.alt} loading="lazy" decoding="async" />
                <span className="eg-life-badge">{c.icon}</span>
                <div className="eg-life-text">
                  <h3 className="eg-life-card-h">{c.title}</h3>
                  <p className="eg-life-card-p">{c.body}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="eg-life-dots" aria-hidden>
            <i className="on" /><i /><i />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
