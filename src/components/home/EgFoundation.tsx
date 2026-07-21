import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, ShieldCheck, Users, Leaf, Target } from 'lucide-react'

const NAVY  = '#1A2B3C'
const GREEN = '#3CB98C'
const GRAY  = '#8B939F'
const BLUE  = '#2F6FE0'
const MUTED = 'rgba(26,43,60,0.62)'
const EASE  = [0.16, 1, 0.3, 1] as [number, number, number, number]

const HERO = '/images/foundation.webp'

type Pillar = {
  no: string; icon: React.ReactNode; label: string; body: string
}

const PILLARS: Pillar[] = [
  { no: '01', icon: <ShieldCheck size={24} strokeWidth={1.8} />, label: 'Integrity',      body: 'We do what is right, always.' },
  { no: '02', icon: <Users size={24} strokeWidth={1.8} />,       label: 'Empowerment',    body: 'We uplift individuals and communities.' },
  { no: '03', icon: <Leaf size={24} strokeWidth={1.8} />,        label: 'Sustainability', body: 'We build today for a better tomorrow.' },
  { no: '04', icon: <Target size={24} strokeWidth={1.8} />,      label: 'Opportunity',    body: 'We create pathways to a brighter future.' },
]

export function EgFoundation() {
  const reduce = useReducedMotion()
  const rise = (d = 0) => ({
    initial: reduce ? false : { opacity: 0, y: 26 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-70px' },
    transition: { duration: 0.85, delay: d, ease: EASE },
  })

  return (
    <section className="eg-fd" aria-label="EG Foundation">
      <style>{`
        .eg-fd {
          position: relative; overflow: hidden;
          background:
            radial-gradient(60% 55% at 12% 30%, rgba(60,185,140,0.05), transparent 60%),
            linear-gradient(180deg, #ffffff 0%, #fbfaf8 100%);
          padding: clamp(56px,8vw,132px) 45px;
        }
        .eg-fd-inner { position: relative; z-index: 1; width: 100%; max-width: none; margin: 0 auto; }

        /* ── Top: text + hero image ─────────────────────────── */
        .eg-fd-top {
          display: grid; grid-template-columns: minmax(0,0.8fr) minmax(0,1.2fr);
          gap: clamp(28px,3vw,56px); align-items: center;
        }

        /* ── Left copy column ───────────────────────────────── */
        .eg-fd-eyebrow-wrap { display: flex; align-items: center; gap: 14px; margin: 0 0 clamp(20px,2.4vw,30px); }
        .eg-fd-eyebrow {
          font-family:'Poppins',sans-serif; font-weight:800; font-size: clamp(11px,0.85vw,13px);
          letter-spacing: 2.5px; text-transform: uppercase; color: ${GREEN}; margin: 0;
        }
        .eg-fd-eyebrow-bar { display:block; width: 46px; height: 3px; border-radius: 3px; background: ${GREEN}; }
        .eg-fd-eyebrow-dots { display:flex; gap:5px; }
        .eg-fd-eyebrow-dots i { width:6px; height:6px; border-radius:50%; background: rgba(26,43,60,0.22); }
        .eg-fd-eyebrow-dots i:first-child { background: rgba(26,43,60,0.40); }

        .eg-fd-h {
          font-family:'Poppins',sans-serif; font-weight:800; text-transform:uppercase;
          font-size: clamp(38px,5.4vw,84px); line-height:0.98; letter-spacing:-0.035em;
          color:${NAVY}; margin: 0 0 clamp(22px,2.6vw,34px);
        }
        .eg-fd-h em { font-style: normal; color: ${GRAY}; }

        .eg-fd-lead {
          font-family:'Inter',sans-serif; font-weight:400; font-size: clamp(16px,1.35vw,21px);
          line-height:1.5; color:${NAVY}; margin: 0 0 clamp(14px,1.6vw,20px); max-width: 520px;
        }
        .eg-fd-lead b { font-weight: 700; color: ${GREEN}; }
        .eg-fd-body {
          font-family:'Inter',sans-serif; font-size: clamp(14px,1.05vw,16.5px);
          line-height:1.8; color:${MUTED}; margin: 0 0 clamp(30px,3.4vw,42px); max-width: 500px;
        }

        .eg-fd-story { display:inline-flex; align-items:center; gap:18px; background:none; border:0; cursor:pointer; padding:0; }
        .eg-fd-story-label {
          display:flex; align-items:center; gap: clamp(20px,3vw,44px);
          font-family:'Poppins',sans-serif; font-weight:700; font-size: clamp(12px,0.9vw,14px);
          letter-spacing:2px; text-transform:uppercase; color:${NAVY};
        }
        .eg-fd-story-arrow { color: rgba(26,43,60,0.35); transition: transform 0.4s ${'cubic-bezier(0.16,1,0.3,1)'}, color 0.4s ease; }
        .eg-fd-story:hover .eg-fd-story-arrow { transform: translateX(8px); color:${GREEN}; }

        /* ── Right hero image (melts into the section, no hard edge) ── */
        .eg-fd-media {
          position: relative;
          /* match the asset's 3:2 ratio so the full image shows with no crop;
             the section height grows to fit it */
          aspect-ratio: 1536 / 1024;
          /* bleed toward the right edge */
          width: calc(100% + clamp(24px, 5vw, 90px));
          margin-right: calc(-1 * clamp(24px, 5vw, 90px));
          overflow: hidden;
        }
        .eg-fd-media img {
          position: absolute; inset: 0; width: 100%; height: 100%;
          object-fit: cover; object-position: 50% 50%;
          /* origin at bottom so the subtle zoom never crops the top of the image */
          transform-origin: 50% 100%; will-change: transform;
          /* subtle real-feel float (no edge-revealing tilt, so the blend stays seamless) */
          animation: eg-fd-float 10s ease-in-out infinite;
        }
        /* page-coloured vignette feathers every edge into the background so the
           image reads as part of the page, not a pasted-in rectangle */
        .eg-fd-media::after {
          content:''; position:absolute; inset:-1px; pointer-events:none; z-index:1;
          background: radial-gradient(122% 132% at 53% 50%,
            transparent 46%, rgba(251,250,248,0.5) 68%, #fbfaf8 100%);
        }
        @keyframes eg-fd-float {
          0%,100% { transform: scale(1) translateY(0); }
          50%     { transform: scale(1.025) translateY(0); }
        }

        /* ── Bottom pillars strip ───────────────────────────── */
        .eg-fd-strip {
          position: relative; z-index: 3;
          /* rides gently onto the base of the image, like the reference */
          margin-top: clamp(-44px,-2.4vw,-18px);
          display: grid; grid-template-columns: repeat(4, 1fr);
          padding: 0 clamp(10px,1.2vw,26px);
          background: rgba(255,255,255,0.86);
          border: 1px solid rgba(255,255,255,0.75);
          /* fully rounded pill ends */
          border-radius: clamp(38px,4.5vw,68px);
          box-shadow: 0 44px 74px -34px rgba(19,41,61,0.32), 0 8px 22px -12px rgba(19,41,61,0.16);
          backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
          overflow: hidden;
        }
        .eg-fd-pill {
          position: relative; display:flex; align-items:center; gap: clamp(14px,1.4vw,22px);
          padding: clamp(22px,2.4vw,34px) clamp(18px,1.8vw,30px);
        }
        .eg-fd-pill-no {
          font-family:'Poppins',sans-serif; font-weight:700; font-size: clamp(30px,3vw,46px);
          line-height:1; color: rgba(26,43,60,0.14); letter-spacing:-0.04em; flex-shrink:0;
        }
        .eg-fd-pill-ic {
          width: clamp(48px,4vw,60px); height: clamp(48px,4vw,60px); border-radius:50%; flex-shrink:0;
          display:flex; align-items:center; justify-content:center; color:${BLUE};
          background:#fff; border:1px solid rgba(47,111,224,0.24);
          box-shadow: 0 8px 18px -10px rgba(19,41,61,0.3);
          transition: transform 0.45s ${'cubic-bezier(0.16,1,0.3,1)'};
        }
        /* bigger icon glyph without changing the circle / bar height */
        .eg-fd-pill-ic svg { width: clamp(28px,2.4vw,36px); height: clamp(28px,2.4vw,36px); }
        .eg-fd-pill:hover .eg-fd-pill-ic { transform: translateY(-4px) scale(1.06); }
        .eg-fd-pill-txt { min-width:0; }
        .eg-fd-pill-label {
          font-family:'Poppins',sans-serif; font-weight:700; font-size: clamp(12px,0.95vw,15px);
          letter-spacing:1px; text-transform:uppercase; color:${GREEN}; margin:0 0 4px;
        }
        .eg-fd-pill-body {
          font-family:'Inter',sans-serif; font-size: clamp(12px,0.85vw,14px); line-height:1.4;
          color:${MUTED}; margin:0;
        }

        /* ── Large screens ──────────────────────────────────── */
        @media (min-width: 1920px) {
          .eg-fd-top { gap: 88px; }
          .eg-fd-lead { max-width: 620px; }
          .eg-fd-body { max-width: 600px; }
        }

        /* ── Tablet / stacked ───────────────────────────────── */
        @media (max-width: 1023px) {
          .eg-fd-top { grid-template-columns: 1fr; gap: clamp(28px,4vw,40px); }
          .eg-fd-lead, .eg-fd-body { max-width: none; }
          .eg-fd-strip { grid-template-columns: repeat(2, 1fr); margin-top: clamp(20px,4vw,36px); border-radius: clamp(28px,4vw,44px); }
        }
        /* ── Phones ─────────────────────────────────────────── */
        @media (max-width: 600px) {
          .eg-fd-strip { grid-template-columns: 1fr; }
        }

        @media (prefers-reduced-motion: reduce) {
          .eg-fd-media img { animation: none; }
        }
      `}</style>

      <div className="eg-fd-inner">
        <div className="eg-fd-top">
          {/* Left copy */}
          <div>
            <motion.div className="eg-fd-eyebrow-wrap" {...rise(0)}>
              <span className="eg-fd-eyebrow-bar" aria-hidden />
              <p className="eg-fd-eyebrow">EG Foundation</p>
              <span className="eg-fd-eyebrow-dots" aria-hidden><i /><i /><i /></span>
            </motion.div>

            <motion.h2 className="eg-fd-h" {...rise(0.06)}>
              The Foundation<br />of <em>Everything</em>
            </motion.h2>

            <motion.p className="eg-fd-lead" {...rise(0.12)}>
              At EG Foundation, <b>purpose</b> is our foundation and <b>impact</b> is our promise.
            </motion.p>
            <motion.p className="eg-fd-body" {...rise(0.16)}>
              Rooted in integrity and guided by a long-term vision, we empower communities,
              support education, encourage sustainable growth, and create opportunities that
              transform lives.
            </motion.p>

            <motion.button type="button" className="eg-fd-story" aria-label="Watch our story" {...rise(0.2)}>
              <span className="eg-fd-story-label">
                Watch Our Story
                <ArrowRight className="eg-fd-story-arrow" size={22} strokeWidth={2} />
              </span>
            </motion.button>
          </div>

          {/* Right media */}
          <motion.div className="eg-fd-media"
            initial={reduce ? false : { opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, ease: EASE }}>
            <img src={HERO} alt="EG Foundation - marble pillars framing a golden gateway to a sustainable city" decoding="async" />
          </motion.div>
        </div>

        {/* Bottom pillars */}
        <motion.div className="eg-fd-strip"
          initial={reduce ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.85, ease: EASE }}>
          {PILLARS.map((p) => (
            <div className="eg-fd-pill" key={p.label}>
              <span className="eg-fd-pill-no" aria-hidden>{p.no}</span>
              <span className="eg-fd-pill-ic">{p.icon}</span>
              <div className="eg-fd-pill-txt">
                <p className="eg-fd-pill-label">{p.label}</p>
                <p className="eg-fd-pill-body">{p.body}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
