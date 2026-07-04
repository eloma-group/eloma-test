import { motion, useReducedMotion } from 'framer-motion'
import { Globe, Share2, Users, TrendingUp } from 'lucide-react'

const LOGO  = '/images/eg-mark.png'
const NAVY  = '#13293D'
const GREEN = '#3CB98C'
const BLUE  = '#2E6FE0'      // official blue
const BLUE2 = '#4C86E6'      // lighter blue shade
const MUTED = 'rgba(19,41,61,0.55)'
const EASE  = [0.16, 1, 0.3, 1] as [number, number, number, number]

type Card = {
  area: 'a' | 'b' | 'c' | 'd'
  no: string; tag: string; icon: React.ReactNode; title: string; body: string; accent: string
}

const CARDS: Card[] = [
  { area: 'a', no: '01', tag: 'Reach',       icon: <Globe size={22} />,      title: 'Global Footprint',
    body: 'Presence across Australia, India, USA, Canada, China, UK, UAE, and Singapore.', accent: BLUE },
  { area: 'b', no: '02', tag: 'Ecosystem',   icon: <Share2 size={22} />,     title: 'Connected Industries',
    body: 'A unified ecosystem serving logistics, technology, security, travel and customer support.', accent: NAVY },
  { area: 'c', no: '03', tag: 'Partnership', icon: <Users size={22} />,      title: 'Collaborative Network',
    body: 'Partnership driven operations that bring businesses closer together.', accent: NAVY },
  { area: 'd', no: '04', tag: 'Future',      icon: <TrendingUp size={22} />, title: 'Responsible Growth',
    body: 'Focused on sustainable, ethical, and future ready business practices.', accent: BLUE2 },
]

export function EgCapabilities() {
  const reduce = useReducedMotion()
  return (
    <section className="eg-gc" aria-label="Global capabilities">
      <style>{`
        .eg-gc {
          position: relative; overflow: hidden;
          background:
            radial-gradient(60% 50% at 50% 38%, rgba(46,111,224,0.06), transparent 64%),
            linear-gradient(180deg, #ffffff 0%, #f5f8fc 100%);
          padding: clamp(56px,8vw,128px) clamp(24px,5vw,80px);
        }
        .eg-gc-inner { position: relative; z-index: 1; max-width: none; margin: 0 auto; }

        /* ── Header ─────────────────────────────────────────── */
        .eg-gc-head { text-align: center; margin-bottom: clamp(44px,6vw,84px); }
        .eg-gc-title {
          font-family: 'Poppins', sans-serif; font-weight: 700; text-transform: uppercase;
          font-size: clamp(26px,3.4vw,46px); color: ${GREEN}; margin: 0; letter-spacing: 0.04em;
        }
        .eg-gc-sub {
          font-family: 'Inter', sans-serif; font-size: clamp(11px,0.9vw,13px);
          letter-spacing: 3px; text-transform: uppercase; color: ${MUTED}; margin: 12px 0 0;
        }
        .eg-gc-rule {
          display: block; width: clamp(150px,18vw,250px); height: 2px; margin: clamp(14px,2vw,22px) auto 0; position: relative;
          background: linear-gradient(90deg, rgba(19,41,61,0) 0%, rgba(19,41,61,0.18) 28%, rgba(19,41,61,0.18) 72%, rgba(19,41,61,0) 100%);
        }
        .eg-gc-rule::after { content:''; position:absolute; left:50%; top:50%; transform:translate(-50%,-50%); width:52px; height:8px; border-radius:6px; background:${GREEN}; }

        /* ── 3D orbital grid ────────────────────────────────── */
        .eg-gc-grid {
          display: grid;
          grid-template-columns: 1fr clamp(240px,24vw,380px) 1fr;
          grid-template-areas: "a center b" "c center d";
          gap: clamp(18px,2.6vw,44px); align-items: center;
          perspective: 1700px; perspective-origin: 50% 42%;
        }

        /* ── 3D Cards ───────────────────────────────────────── */
        .eg-gc-card {
          position: relative; overflow: hidden;
          border-radius: 22px; padding: clamp(20px,2.2vw,32px);
          background: linear-gradient(158deg, rgba(255,255,255,0.94) 0%, rgba(255,255,255,0.70) 100%);
          border: 1px solid rgba(255,255,255,0.9);
          box-shadow:
            0 2px 4px rgba(19,41,61,0.05),
            0 30px 60px -34px rgba(19,41,61,0.34),
            0 60px 90px -60px rgba(19,41,61,0.4),
            inset 0 1px 0 rgba(255,255,255,0.85);
          backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
          transition: box-shadow 0.5s cubic-bezier(0.16,1,0.3,1);
          will-change: transform;
        }
        .eg-gc-card.a { grid-area:a; } .eg-gc-card.b { grid-area:b; }
        .eg-gc-card.c { grid-area:c; } .eg-gc-card.d { grid-area:d; }
        .eg-gc-card:hover {
          box-shadow:
            0 6px 12px rgba(19,41,61,0.08),
            0 50px 90px -38px rgba(19,41,61,0.5),
            0 90px 120px -70px rgba(19,41,61,0.5),
            inset 0 1px 0 rgba(255,255,255,0.95);
        }
        /* glassy diagonal sheen that sweeps as the card tilts */
        .eg-gc-card-sheen {
          position:absolute; inset:0; border-radius:inherit; pointer-events:none;
          background: linear-gradient(125deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 38%);
          opacity:0.7; transition: opacity 0.5s ease;
        }
        .eg-gc-card:hover .eg-gc-card-sheen { opacity:1; }

        /* top accent bar that grows on hover */
        .eg-gc-card::before {
          content:''; position:absolute; left:clamp(24px,2.6vw,38px); top:0; height:3px; width:34px; border-radius:0 0 4px 4px;
          background: var(--accent); transition: width 0.45s cubic-bezier(0.16,1,0.3,1); pointer-events:none; z-index:3;
        }
        .eg-gc-card:hover::before { width: 64px; }
        /* soft corner glow from the accent */
        .eg-gc-card::after {
          content:''; position:absolute; top:-40%; right:-30%; width:60%; height:80%; border-radius:50%;
          background: radial-gradient(circle, color-mix(in srgb, var(--accent) 18%, transparent), transparent 70%);
          opacity:0; transition: opacity 0.45s ease; pointer-events:none;
        }
        .eg-gc-card:hover::after { opacity:1; }

        .eg-gc-no {
          position:absolute; top: clamp(8px,1vw,14px); right: clamp(14px,1.8vw,24px);
          font-family:'Poppins',sans-serif; font-weight:700; font-size:clamp(40px,4.6vw,72px);
          line-height:1; color: rgba(19,41,61,0.05); letter-spacing:-0.04em; pointer-events:none; user-select:none;
        }
        .eg-gc-card-top { position:relative; display:flex; align-items:center; gap:13px; margin-bottom:14px; z-index:2; }
        .eg-gc-ic {
          width:46px; height:46px; border-radius:13px; flex-shrink:0;
          display:flex; align-items:center; justify-content:center;
          background: color-mix(in srgb, var(--accent) 12%, transparent);
          color: var(--accent); box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--accent) 18%, transparent);
          transition: transform 0.5s cubic-bezier(0.16,1,0.3,1);
        }
        .eg-gc-card:hover .eg-gc-ic { transform: translateY(-3px) scale(1.08) rotate(-4deg); }
        .eg-gc-tag {
          font-family:'Inter',sans-serif; font-weight:700; font-size:clamp(10px,0.8vw,12px);
          letter-spacing:2px; text-transform:uppercase; color: var(--accent); margin:0;
        }
        .eg-gc-card-h {
          position:relative; z-index:2; font-family:'Poppins',sans-serif; font-weight:600;
          font-size:clamp(17px,1.55vw,22px); color:${NAVY}; margin:0 0 7px; letter-spacing:-0.01em;
        }
        .eg-gc-card-b {
          position:relative; z-index:2; font-family:'Inter',sans-serif; font-size:clamp(13px,0.98vw,15px);
          line-height:1.62; color:rgba(19,41,61,0.7); margin:0;
        }

        /* ── 3D orbital core ────────────────────────────────── */
        .eg-gc-core { grid-area:center; position:relative; aspect-ratio:1; perspective: 1200px; }
        .eg-gc-glow {
          position:absolute; inset:4%; border-radius:50%; pointer-events:none; z-index:0;
          background: radial-gradient(circle, rgba(60,185,140,0.34), rgba(60,185,140,0) 66%); filter: blur(20px);
        }
        /* the whole 3D group that gently tilts in space */
        .eg-gc-coin {
          position:absolute; inset:0; transform-style:preserve-3d; will-change:transform;
          display:flex; align-items:center; justify-content:center;
          animation: eg-gc-float3d 11s ease-in-out infinite;
        }
        .eg-gc-ring { position:absolute; inset:0; border-radius:50%; pointer-events:none; }
        .eg-gc-ring-1 { border:1.5px dashed rgba(19,41,61,0.18); animation: eg-gc-ring1 50s linear infinite; }
        .eg-gc-ring-3 { inset:16%; border:1px solid rgba(19,41,61,0.10); transform: translateZ(-10px); }
        .eg-gc-ring-2 {
          inset:7%;
          background: conic-gradient(from 0deg,
            rgba(60,185,140,0) 0deg, rgba(60,185,140,0) 200deg,
            rgba(60,185,140,0.7) 318deg, rgba(60,185,140,0) 360deg);
          -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 3px));
                  mask: radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 3px));
          animation: eg-gc-ring2 14s linear infinite;
        }
        .eg-gc-orbit { position:absolute; inset:0; pointer-events:none; animation: eg-gc-orbit 26s linear infinite; }
        .eg-gc-dot { position:absolute; border-radius:50%; }
        .eg-gc-dot.d1 { top:-7px; left:calc(50% - 7px); width:14px; height:14px; background:${GREEN}; box-shadow:0 0 0 6px rgba(60,185,140,0.16), 0 6px 14px rgba(60,185,140,0.5); }
        .eg-gc-dot.d2 { bottom:6%; right:4%; width:10px; height:10px; background:${NAVY}; box-shadow:0 0 0 5px rgba(19,41,61,0.10); }
        .eg-gc-dot.d3 { bottom:9%; left:6%; width:7px; height:7px; background:${GREEN}; box-shadow:0 4px 10px rgba(60,185,140,0.5); }

        .eg-gc-medallion {
          position:relative; width:60%; aspect-ratio:1; border-radius:50%;
          display:flex; align-items:center; justify-content:center; transform-style:preserve-3d;
          transform: translateZ(26px);
          background: linear-gradient(160deg, #ffffff 0%, #eaf4ef 100%);
          box-shadow:
            0 40px 70px -24px rgba(19,41,61,0.6),
            0 18px 30px -16px rgba(19,41,61,0.4),
            inset 0 0 0 1px rgba(255,255,255,0.9),
            inset 0 4px 10px rgba(255,255,255,0.8),
            inset 0 -10px 24px rgba(19,41,61,0.06);
        }
        .eg-gc-medallion::before { content:''; position:absolute; inset:8%; border-radius:50%; border:1px solid rgba(19,41,61,0.08); }
        .eg-gc-medallion::after { content:''; position:absolute; inset:0; border-radius:50%; pointer-events:none;
          background: linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 45%); }
        .eg-gc-logo { position:relative; z-index:2; width:64%; height:auto; display:block; transform: translateY(5.5%) translateZ(34px); filter: drop-shadow(0 14px 20px rgba(19,41,61,0.28)); }
        .eg-gc-spark { position:absolute; top:9%; right:11%; z-index:3; color:${GREEN}; transform: translateZ(54px); filter: drop-shadow(0 3px 8px rgba(60,185,140,0.5)); }

        @keyframes eg-gc-float3d {
          0%,100% { transform: rotateX(11deg) rotateY(-13deg) translateY(0); }
          50%     { transform: rotateX(6deg)  rotateY(13deg)  translateY(-14px); }
        }
        @keyframes eg-gc-ring1 { from { transform: rotate(0); }      to { transform: rotate(360deg); } }
        @keyframes eg-gc-ring2 { from { transform: rotate(0); }      to { transform: rotate(-360deg); } }
        @keyframes eg-gc-orbit { from { transform: translateZ(50px) rotate(0); } to { transform: translateZ(50px) rotate(360deg); } }

        /* ── Responsive ─────────────────────────────────────── */
        /* large screens: bigger, taller 3D stage */
        @media (min-width: 1920px) {
          .eg-gc-grid { grid-template-columns: 1fr clamp(380px,22vw,470px) 1fr; gap: 52px; min-height: 760px; }
          .eg-gc-card { padding: 38px; border-radius: 26px; }
          .eg-gc-card-h { font-size: 25px; }
          .eg-gc-card-b { font-size: 16px; }
          .eg-gc-no { font-size: 86px; }
          .eg-gc-ic { width:54px; height:54px; border-radius:16px; }
        }
        @media (min-width: 2560px) {
          .eg-gc-grid { grid-template-columns: 1fr 580px 1fr; gap: 64px; min-height: 1020px; }
          .eg-gc-card { padding: 52px; border-radius: 30px; }
          .eg-gc-card-h { font-size: 33px; }
          .eg-gc-card-b { font-size: 21px; }
          .eg-gc-no { font-size: 120px; }
          .eg-gc-ic { width:68px; height:68px; border-radius:20px; }
        }
        /* tablet: 2×2 cards, core as a band on top */
        @media (max-width: 1023px) {
          .eg-gc-grid {
            grid-template-columns: 1fr 1fr;
            grid-template-areas: "center center" "a b" "c d";
            gap: clamp(16px,2.6vw,26px);
          }
          .eg-gc-core { max-width: clamp(220px,40vw,320px); margin: 0 auto clamp(8px,2vw,18px); }
        }
        /* phones: single column */
        @media (max-width: 600px) {
          .eg-gc-grid { grid-template-columns: 1fr; grid-template-areas: "center" "a" "b" "c" "d"; }
          .eg-gc-core { max-width: clamp(180px,56vw,240px); }
        }

        @media (prefers-reduced-motion: reduce) {
          .eg-gc-ring-1, .eg-gc-ring-2, .eg-gc-orbit, .eg-gc-coin { animation: none; }
        }
      `}</style>

      <div className="eg-gc-inner">
        <motion.div className="eg-gc-head"
          initial={reduce ? false : { opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true, margin:'-80px' }} transition={{ duration:0.8, ease:EASE }}>
          <h2 className="eg-gc-title">Global Capabilities</h2>
          <p className="eg-gc-sub">One group, many strengths, a single direction</p>
          <span className="eg-gc-rule" aria-hidden />
        </motion.div>

        <div className="eg-gc-grid">
          {CARDS.map((c, i) => (
              <motion.div key={c.title} className={`eg-gc-card ${c.area}`}
                style={{ ['--accent' as string]: c.accent, transformStyle: 'preserve-3d' }}
                initial={reduce ? false : { opacity:0, y:30, z:-60, scale:0.96 }}
                whileInView={reduce ? { opacity:1 } : { opacity:1, y:0, z:0, scale:1 }}
                whileHover={reduce ? undefined : { y:-12, rotateX:7, z:55, scale:1.03 }}
                viewport={{ once:true, margin:'-50px' }}
                transition={{ duration:0.8, delay:0.08*i, ease:EASE }}>
                <span className="eg-gc-card-sheen" aria-hidden />
                <span className="eg-gc-no" aria-hidden>{c.no}</span>
                <div className="eg-gc-card-top">
                  <span className="eg-gc-ic">{c.icon}</span>
                  <p className="eg-gc-tag">{c.tag}</p>
                </div>
                <h3 className="eg-gc-card-h">{c.title}</h3>
                <p className="eg-gc-card-b">{c.body}</p>
              </motion.div>
          ))}

          <motion.div className="eg-gc-core"
            initial={reduce ? false : { opacity:0, scale:0.84 }} whileInView={{ opacity:1, scale:1 }}
            viewport={{ once:true }} transition={{ duration:0.9, ease:EASE }}>
            <span className="eg-gc-glow" aria-hidden />
            <div className="eg-gc-coin" aria-hidden>
              <span className="eg-gc-ring eg-gc-ring-1" />
              <span className="eg-gc-ring eg-gc-ring-2" />
              <span className="eg-gc-ring eg-gc-ring-3" />
              <div className="eg-gc-orbit">
                <span className="eg-gc-dot d1" />
                <span className="eg-gc-dot d2" />
                <span className="eg-gc-dot d3" />
              </div>
              <div className="eg-gc-medallion">
                <img className="eg-gc-logo" src={LOGO} alt="Eloma Group" decoding="async" />
                <svg className="eg-gc-spark" width="28" height="28" viewBox="0 0 24 24" aria-hidden>
                  <path fill="currentColor" d="M12 0c.6 5.7 5.7 10.8 12 12-6.3 1.2-11.4 6.3-12 12-.6-5.7-5.7-10.8-12-12C6.3 10.8 11.4 5.7 12 0Z" />
                </svg>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
