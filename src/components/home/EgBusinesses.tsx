import { useState, useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Play, Pause, ArrowRight, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Reveal } from './egScroll'
import { takePending } from '../../utils/sectionLink'

/* header/footer slug → index in BIZ */
const BIZ_INDEX: Record<string, number> = {
  'call-centre': 0, 'imports': 1, 'it-infrastructure': 2, 'supply-chain': 3, 'travel': 4,
}

const NAVY  = '#13293D'
const GREEN = '#3CB98C'
const MUTED = 'rgba(26,43,60,0.55)'
const EASE  = [0.16, 1, 0.3, 1] as [number, number, number, number]

type Biz = { key: string; title: string; desc: string; img: string }

const BIZ: Biz[] = [
  { key: 'Call Center', title: 'Call Center',
    desc: 'A people-first BPO division building relationships, not just answering calls — multi-channel customer experience engineered around trust and growth.',
    img: '/images/call center.png' },
  { key: 'Imports', title: 'Imports',
    desc: 'End-to-end import operations connecting global suppliers with local markets — sourcing, customs, and distribution handled with precision.',
    img: 'https://images.unsplash.com/photo-1565891741441-64926e441838?auto=format&fit=crop&w=900&q=80' },
  { key: 'IT Infrastructure', title: 'IT Infrastructure',
    desc: 'Resilient cloud and on-premise infrastructure — networks, servers, and security built to keep modern businesses always on.',
    img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=80' },
  { key: 'Supply Chain', title: 'Supply Chain',
    desc: 'Intelligent supply chain management that anticipates demand, resolves disruption, and keeps every shipment moving on time.',
    img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=900&q=80' },
  { key: 'Travel', title: 'Travel',
    desc: 'Corporate and leisure travel solutions designed around people — seamless journeys, trusted partners, and on-call support.',
    img: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=900&q=80' },
  { key: 'Virtual Security', title: 'Virtual Security',
    desc: 'Round-the-clock digital and physical security — monitoring, threat response, and protection engineered for peace of mind.',
    img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=900&q=80' },
]

export function EgBusinesses() {
  const reduce = useReducedMotion()
  const navigate = useNavigate()
  const n = BIZ.length
  const [active, setActive] = useState(0)
  const [playing, setPlaying] = useState(true)

  const go = (dir: number) => setActive(a => (a + dir + n) % n)

  // auto-slide
  useEffect(() => {
    if (!playing || reduce) return
    const id = setInterval(() => setActive(a => (a + 1) % n), 3800)
    return () => clearInterval(id)
  }, [playing, reduce, n])

  // Deep-link from header/footer → activate the clicked business + scroll here
  useEffect(() => {
    const focus = (id: string) => {
      const idx = BIZ_INDEX[id]
      if (idx == null) return
      setPlaying(false)          // hold on the chosen card
      setActive(idx)
      requestAnimationFrame(() => {
        const el = document.getElementById('eg-biz-stage')
        if (el) {
          const r = el.getBoundingClientRect()
          // centre the carousel card in the viewport (clear the 64px header)
          const target = r.top + window.scrollY - Math.max(72, (window.innerHeight - r.height) / 2)
          window.scrollTo({ top: target, behavior: 'smooth' })
        }
      })
    }
    const pending = takePending('business')
    if (pending) setTimeout(() => focus(pending), 350)
    const handler = (e: Event) => { const id = (e as CustomEvent).detail?.id; if (id) focus(id) }
    window.addEventListener('eg:business', handler)
    return () => window.removeEventListener('eg:business', handler)
  }, [])

  // coverflow placement for each card relative to the active one
  const slot = (i: number) => {
    let d = i - active
    if (d >  n / 2) d -= n
    if (d < -n / 2) d += n
    const abs = Math.abs(d)
    const visible = abs <= 2
    return {
      d, abs, visible,
      x: `${d * 60}%`,
      scale: abs === 0 ? 1 : abs === 1 ? 0.84 : 0.66,
      opacity: !visible ? 0 : abs === 2 ? 0.5 : 1,
      zIndex: 10 - abs,
    }
  }

  return (
    <section className="eg-biz" id="our-businesses" aria-label="Our businesses">
      <style>{`
        .eg-biz { background: #ffffff; padding: clamp(56px, 8vw, 120px) clamp(24px, 5vw, 80px); overflow: hidden; }
        .eg-biz-inner { max-width: none; margin: 0 auto; }
        .eg-biz-head { text-align: center; margin-bottom: clamp(32px, 4vw, 52px); }
        .eg-biz-title {
          font-family: 'Poppins', sans-serif; font-weight: 700; text-transform: uppercase;
          font-size: clamp(26px, 3.4vw, 44px); color: ${GREEN}; margin: 0; letter-spacing: 0.02em;
        }
        .eg-biz-sub {
          font-family: 'Inter', sans-serif; font-size: clamp(11px, 0.9vw, 13px);
          letter-spacing: 3px; text-transform: uppercase; color: ${MUTED}; margin: 12px 0 0;
        }
        .eg-biz-tabs {
          display: flex; flex-wrap: wrap; justify-content: center; gap: clamp(8px, 1vw, 14px);
          margin-bottom: clamp(36px, 5vw, 56px);
        }
        .eg-tab {
          min-height: 44px; padding: 10px clamp(16px, 1.6vw, 26px);
          border-radius: 999px; border: 1px solid rgba(19,41,61,0.20);
          background: #fff; color: ${NAVY}; cursor: pointer;
          font-family: 'Inter', sans-serif; font-size: clamp(13px, 0.95vw, 15px); font-weight: 500;
          transition: background 0.25s ease, color 0.25s ease, border-color 0.25s ease, transform 0.2s ease;
          white-space: nowrap;
        }
        .eg-tab:hover { border-color: ${GREEN}; transform: translateY(-1px); }
        .eg-tab[data-active="true"] { background: ${GREEN}; color: #fff; border-color: ${GREEN}; box-shadow: 0 10px 22px -10px rgba(60,185,140,0.7); }

        /* ── coverflow carousel ── */
        .eg-biz-stage {
          position: relative; height: clamp(420px, 46vw, 540px);
          margin-bottom: clamp(24px, 3vw, 36px);
        }
        .eg-slot {
          position: absolute; left: 50%; top: 50%;
          width: clamp(280px, 30vw, 400px);
          transform: translate(-50%, -50%);
        }
        .eg-slot-inner { will-change: transform; transform-origin: center center; cursor: pointer; }
        .eg-card {
          border-radius: 22px; overflow: hidden; background: #fff;
          box-shadow: 0 30px 70px -28px rgba(19,41,61,0.40), 0 2px 0 rgba(19,41,61,0.04);
          display: flex; flex-direction: column; position: relative;
          height: clamp(400px, 44vw, 500px);
          transition: box-shadow 0.45s ease, transform 0.5s cubic-bezier(0.16,1,0.3,1);
        }
        .eg-card[data-center="false"] { box-shadow: 0 24px 50px -30px rgba(19,41,61,0.35); }
        .eg-card-imgwrap { width: 100%; flex: 0 0 58%; overflow: hidden; }
        .eg-card-img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.7s cubic-bezier(0.16,1,0.3,1); }
        /* hover affordances on the active (center) card */
        .eg-slot-inner:hover .eg-card[data-center="true"] {
          transform: translateY(-8px);
          box-shadow: 0 46px 92px -30px rgba(19,41,61,0.50), 0 2px 0 rgba(19,41,61,0.04);
        }
        .eg-slot-inner:hover .eg-card[data-center="true"] .eg-card-img { transform: scale(1.07); }
        .eg-card-body { padding: clamp(18px, 1.8vw, 28px) clamp(20px, 2vw, 30px); flex: 1; overflow: hidden; }
        .eg-card-h {
          position: relative;
          font-family: 'Poppins', sans-serif; font-weight: 600; color: ${NAVY};
          font-size: clamp(20px, 2vw, 28px); margin: 0 0 12px;
        }
        .eg-card[data-center="true"] .eg-card-h::after {
          content:''; position:absolute; left:0; bottom:-7px; height:2px; width:0; border-radius:2px;
          background:${GREEN}; transition: width 0.5s cubic-bezier(0.16,1,0.3,1);
        }
        .eg-slot-inner:hover .eg-card[data-center="true"] .eg-card-h::after { width:48px; }
        .eg-card-p { font-family: 'Inter', sans-serif; font-size: clamp(13px, 1vw, 15px); line-height: 1.65; color: ${MUTED}; margin: 0; max-width: 36ch; }
        .eg-card-play {
          position: absolute; right: clamp(18px, 2vw, 26px); bottom: clamp(18px, 2vw, 26px);
          width: 48px; height: 48px; border-radius: 50%; border: none; cursor: pointer;
          background: ${GREEN}; color: #fff; display: flex; align-items: center; justify-content: center;
          box-shadow: 0 12px 26px -8px rgba(60,185,140,0.8); transition: transform 0.25s ease;
        }
        .eg-card-play:hover { transform: scale(1.08); }

        /* ── prev / next controls ── */
        .eg-biz-ctrl { display: flex; justify-content: center; gap: 16px; }
        .eg-arrow {
          width: 52px; height: 52px; border-radius: 50%; cursor: pointer;
          border: 1px solid rgba(19,41,61,0.25); background: #fff; color: ${NAVY};
          display: flex; align-items: center; justify-content: center;
          transition: background 0.25s ease, color 0.25s ease, border-color 0.25s ease, transform 0.2s ease;
        }
        .eg-arrow:hover { background: ${GREEN}; color: #fff; border-color: ${GREEN}; transform: translateY(-2px); }

        @media (max-width: 700px) {
          .eg-slot { width: clamp(240px, 78vw, 360px); }
          .eg-card-p { max-width: none; }
        }

        /* ── large screens: scale the carousel up so cards aren't tiny ── */
        @media (min-width: 1920px) {
          .eg-biz-stage { height: 660px; }
          .eg-slot { width: 600px; }
          .eg-card { height: 620px; }
          .eg-card-h { font-size: 32px; }
          .eg-card-p { font-size: 17px; max-width: 46ch; }
          .eg-tab { font-size: 17px; padding: 12px 30px; }
        }
        @media (min-width: 2560px) {
          .eg-biz-stage { height: 880px; }
          .eg-slot { width: 800px; }
          .eg-card { height: 840px; }
          .eg-card-h { font-size: 42px; }
          .eg-card-p { font-size: 22px; }
          .eg-tab { font-size: 22px; padding: 16px 40px; min-height: 54px; }
          .eg-arrow { width: 66px; height: 66px; }
        }
      `}</style>

      <div className="eg-biz-inner">
        <Reveal className="eg-biz-head" y={26}>
          <h2 className="eg-biz-title">Our Businesses</h2>
          <p className="eg-biz-sub">Four worlds. One universe.</p>
        </Reveal>

        <div className="eg-biz-tabs" role="tablist">
          {BIZ.map((b, i) => (
            <button
              key={b.key}
              className="eg-tab"
              data-active={i === active}
              role="tab"
              aria-selected={i === active}
              onClick={() => setActive(i)}
            >
              {b.title}
            </button>
          ))}
        </div>

        <div className="eg-biz-stage" id="eg-biz-stage">
          {BIZ.map((b, i) => {
            const s = slot(i)
            const isCenter = i === active
            return (
              <motion.div
                key={b.key}
                className="eg-slot"
                style={{ zIndex: s.zIndex, pointerEvents: s.visible ? 'auto' : 'none' }}
                animate={reduce ? { opacity: s.opacity } : { opacity: s.opacity }}
              >
                <motion.div
                  className="eg-slot-inner"
                  animate={reduce ? { opacity: 1 } : { x: s.x, scale: s.scale }}
                  transition={{ duration: 0.6, ease: EASE }}
                  onClick={() => (isCenter ? navigate('/businesses') : setActive(i))}
                  aria-hidden={!s.visible}
                >
                  <div className="eg-card" data-center={isCenter}>
                    <div className="eg-card-imgwrap">
                      <img className="eg-card-img" src={b.img} alt={b.title} loading="lazy" decoding="async" />
                    </div>
                    <div className="eg-card-body">
                      <h3 className="eg-card-h">{b.title}</h3>
                      <p className="eg-card-p">{b.desc}</p>
                    </div>
                    {isCenter && (
                      <button
                        className="eg-card-play"
                        onClick={(e) => { e.stopPropagation(); setPlaying(p => !p) }}
                        aria-label={playing ? 'Pause auto-slide' : 'Play auto-slide'}
                        aria-pressed={playing}
                      >
                        {playing ? <Pause size={18} fill="#fff" /> : <Play size={18} fill="#fff" />}
                      </button>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            )
          })}
        </div>

        <div className="eg-biz-ctrl">
          <button className="eg-arrow" onClick={() => go(-1)} aria-label="Previous business">
            <ArrowLeft size={18} />
          </button>
          <button className="eg-arrow" onClick={() => go(1)} aria-label="Next business">
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  )
}
