import { motion, useReducedMotion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const NAVY  = '#13293D'
const GREEN = '#3CB98C'
const MUTED = 'rgba(26,43,60,0.62)'
const EASE  = [0.16, 1, 0.3, 1] as [number, number, number, number]

export function EgHero() {
  const reduce = useReducedMotion()
  const navigate = useNavigate()
  const fade = (d: number) => ({
    initial: reduce ? false : { opacity: 0, y: 26 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: d, duration: 0.9, ease: EASE },
  })

  return (
    <section className="eg-hero" aria-label="Hero">
      <style>{`
        .eg-hero {
          position: relative;
          background:
            radial-gradient(50% 80% at 0% 50%, rgba(74,134,210,0.14) 0%, transparent 48%),
            radial-gradient(50% 80% at 100% 50%, rgba(60,185,140,0.16) 0%, transparent 48%),
            linear-gradient(90deg, rgba(74,134,210,0.07) 0%, #ffffff 30%, #ffffff 70%, rgba(60,185,140,0.08) 100%),
            #ffffff;
          padding: clamp(96px, 12vw, 170px) clamp(24px, 5vw, 80px) clamp(56px, 8vw, 120px);
          overflow-x: hidden;
        }
        .eg-hero-inner {
          max-width: none;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 0.97fr 1.03fr;
          gap: clamp(30px, 4.5vw, 72px);
          align-items: center;
        }
        .eg-hero-h1 {
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
          font-size: clamp(40px, 5.6vw, 78px);
          line-height: 1.04;
          letter-spacing: -0.02em;
          margin: 0;
        }
        .eg-hero-h1 .l1 { color: ${NAVY}; }
        .eg-hero-h1 .l2 { color: ${GREEN}; }
        .eg-hero-rule {
          width: clamp(180px, 26vw, 360px); height: 1px;
          background: linear-gradient(to right, rgba(26,43,60,0.30), transparent);
          margin: clamp(20px, 2.5vw, 30px) 0;
        }
        .eg-hero-p {
          font-family: 'Inter', sans-serif;
          font-size: clamp(14px, 1.15vw, 17px);
          line-height: 1.8; color: ${MUTED};
          max-width: 440px; margin: 0 0 clamp(28px, 3.5vw, 40px);
        }
        .eg-hero-btn {
          position: relative; overflow: hidden;
          display: inline-flex; align-items: center; justify-content: center;
          min-height: 48px;
          padding: 14px clamp(34px, 4vw, 52px);
          border: none; border-radius: 12px;
          background: ${GREEN};
          color: #fff; cursor: pointer;
          font-family: 'Poppins', sans-serif;
          font-size: clamp(15px, 1.1vw, 18px); font-weight: 500;
          box-shadow: 0 14px 30px -12px rgba(60,185,140,0.65);
          transition: transform 0.25s ${'cubic-bezier(0.16,1,0.3,1)'}, box-shadow 0.25s ease, background 0.25s ease;
        }
        .eg-hero-btn span { position: relative; z-index: 1; }
        /* premium light sweep on hover */
        .eg-hero-btn::after {
          content: ''; position: absolute; top: 0; left: -120%; width: 55%; height: 100%;
          background: linear-gradient(110deg, transparent, rgba(255,255,255,0.45), transparent);
          transform: skewX(-18deg); transition: left 0.7s ${'cubic-bezier(0.16,1,0.3,1)'}; pointer-events: none;
        }
        .eg-hero-btn:hover {
          transform: translateY(-2px);
          background: #34ab80;
          box-shadow: 0 20px 38px -12px rgba(60,185,140,0.75);
        }
        .eg-hero-btn:hover::after { left: 135%; }
        .eg-hero-logo {
          display: flex; justify-content: center; align-items: center;
          will-change: transform;
        }
        .eg-hero-video {
          width: 100%; height: auto; display: block;
          object-fit: contain;
          /* soft-fade the edges so motion streaming off-frame dissolves
             instead of a hard "cut" line — strong on left/right, light top/bottom */
          -webkit-mask-image:
            linear-gradient(to right, transparent 0%, #000 9%, #000 91%, transparent 100%),
            linear-gradient(to bottom, transparent 0%, #000 4%, #000 96%, transparent 100%);
          -webkit-mask-composite: source-in;
          mask-image:
            linear-gradient(to right, transparent 0%, #000 9%, #000 91%, transparent 100%),
            linear-gradient(to bottom, transparent 0%, #000 4%, #000 96%, transparent 100%);
          mask-composite: intersect;
          will-change: transform;
        }
        @media (max-width: 860px) {
          .eg-hero-inner { grid-template-columns: 1fr; gap: clamp(40px, 8vw, 56px); }
          .eg-hero-logo { order: -1; }
        }

        /* ── large screens: scale up so the hero doesn't look small ── */
        @media (min-width: 1920px) {
          .eg-hero { padding: 210px 80px 160px; min-height: 88vh; display: flex; align-items: center; }
          .eg-hero-inner { width: 100%; }
          .eg-hero-h1 { font-size: 104px; }
          .eg-hero-rule { width: 420px; margin: 36px 0; }
          .eg-hero-p { font-size: 21px; max-width: 560px; }
          .eg-hero-btn { font-size: 20px; min-height: 58px; padding: 16px 58px; }
          .eg-hero-logo .ehl { width: 560px; }
        }
        @media (min-width: 2560px) {
          .eg-hero { padding: 300px 100px 220px; }
          .eg-hero-h1 { font-size: 146px; }
          .eg-hero-rule { width: 560px; margin: 50px 0; }
          .eg-hero-p { font-size: 28px; max-width: 740px; }
          .eg-hero-btn { font-size: 26px; min-height: 72px; padding: 22px 76px; border-radius: 16px; }
          .eg-hero-logo .ehl { width: 780px; }
        }
      `}</style>

      <div className="eg-hero-inner">
        <div>
          <motion.h1 className="eg-hero-h1" {...fade(0.05)}>
            <span className="l1">Empowering</span><br />
            <span className="l2">Growth with</span><br />
            <span className="l2">Precision &amp; Agility</span>
          </motion.h1>

          <motion.div className="eg-hero-rule" {...fade(0.18)} />

          <motion.p className="eg-hero-p" {...fade(0.26)}>
            Eloma Group transforms and scales businesses with strategy, technology, and execution.
          </motion.p>

          <motion.button
            className="eg-hero-btn"
            onClick={() => navigate('/about')}
            {...fade(0.36)}
          >
            <span>Experience</span>
          </motion.button>
        </div>

        <div className="eg-hero-logo">
          <video
            className="eg-hero-video"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            aria-label="Eloma Group hero animation"
          >
            {/* Transparent VP8 alpha — background + watermark removed */}
            <source src="/images/hero video.webm" type="video/webm" />
            {/* Watermark-free fallback (white bg) for browsers without webm-alpha */}
            <source src="/images/hero-clean.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </section>
  )
}
