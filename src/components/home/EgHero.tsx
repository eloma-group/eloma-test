import { motion, useReducedMotion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const GREEN = '#3CB98C'
const EASE  = [0.16, 1, 0.3, 1] as [number, number, number, number]

export function EgHero() {
  const reduce = useReducedMotion() ?? false
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
          position: relative; overflow: hidden;
          min-height: 100svh;
          display: flex; align-items: center;
          padding: clamp(120px, 15vh, 220px) clamp(20px, 3.5vw, 56px) clamp(72px, 12vh, 150px);
        }
        /* full-bleed background video */
        .eg-hero-bg {
          position: absolute; inset: 0; width: 100%; height: 100%;
          object-fit: cover; object-position: center;
          z-index: 0; pointer-events: none;
        }
        /* legibility scrim - darkest on the left where the copy sits, with a
           soft top (under the header) and bottom (into the next section) fade */
        .eg-hero-scrim {
          position: absolute; inset: 0; z-index: 1; pointer-events: none;
          background:
            linear-gradient(90deg, rgba(7,15,25,0.86) 0%, rgba(7,15,25,0.60) 36%, rgba(7,15,25,0.16) 66%, rgba(7,15,25,0.34) 100%),
            linear-gradient(180deg, rgba(7,15,25,0.55) 0%, rgba(7,15,25,0) 26%, rgba(7,15,25,0) 58%, rgba(7,15,25,0.62) 100%);
        }
        .eg-hero-inner {
          position: relative; z-index: 2;
          width: 100%; max-width: 1760px; margin: 0; margin-right: auto;
        }
        .eg-hero-eyebrow {
          display: inline-flex; align-items: center; gap: 12px;
          font-family: 'Inter', sans-serif; font-weight: 800; text-transform: uppercase;
          font-size: clamp(10px, 0.85vw, 13px); letter-spacing: 2.6px;
          color: rgba(255,255,255,0.82); margin: 0 0 clamp(18px, 2.4vw, 30px);
        }
        .eg-hero-eyebrow::before { content: ''; width: clamp(26px, 4vw, 54px); height: 1px;
          background: linear-gradient(90deg, ${GREEN}, transparent); }
        .eg-hero-h1 {
          font-family: 'Poppins', sans-serif; font-weight: 600;
          font-size: clamp(40px, 6vw, 90px); line-height: 1.03; letter-spacing: -0.02em;
          margin: 0; color: #fff; text-shadow: 0 2px 40px rgba(0,0,0,0.45);
        }
        .eg-hero-h1 .l1 { color: #ffffff; }
        .eg-hero-h1 .l2 { color: rgba(255,255,255,0.66); }
        .eg-hero-rule {
          width: clamp(180px, 26vw, 380px); height: 1px;
          background: linear-gradient(to right, rgba(255,255,255,0.55), transparent);
          margin: clamp(22px, 2.6vw, 34px) 0;
        }
        .eg-hero-p {
          font-family: 'Inter', sans-serif;
          font-size: clamp(15px, 1.4vw, 19px); line-height: 1.8;
          color: rgba(255,255,255,0.82); max-width: 480px; margin: 0 0 clamp(30px, 3.6vw, 44px);
          text-shadow: 0 2px 20px rgba(0,0,0,0.4);
        }
        .eg-hero-btn {
          position: relative; overflow: hidden;
          display: inline-flex; align-items: center; justify-content: center;
          min-height: 48px; padding: 14px clamp(34px, 4vw, 52px);
          border: none; border-radius: 12px; background: ${GREEN};
          color: #fff; cursor: pointer;
          font-family: 'Poppins', sans-serif; font-size: clamp(15px, 1.1vw, 18px); font-weight: 500;
          box-shadow: 0 18px 40px -14px rgba(60,185,140,0.7);
          transition: transform 0.25s ${'cubic-bezier(0.16,1,0.3,1)'}, box-shadow 0.25s ease, background 0.25s ease;
        }
        .eg-hero-btn span { position: relative; z-index: 1; }
        .eg-hero-btn::after {
          content: ''; position: absolute; top: 0; left: -120%; width: 55%; height: 100%;
          background: linear-gradient(110deg, transparent, rgba(255,255,255,0.45), transparent);
          transform: skewX(-18deg); transition: left 0.7s ${'cubic-bezier(0.16,1,0.3,1)'}; pointer-events: none;
        }
        .eg-hero-btn:hover { transform: translateY(-2px); background: #34ab80;
          box-shadow: 0 24px 48px -14px rgba(60,185,140,0.8); }
        .eg-hero-btn:hover::after { left: 135%; }

        /* scroll cue */
        .eg-hero-cue {
          position: absolute; left: 50%; bottom: clamp(20px, 3vh, 40px); transform: translateX(-50%);
          z-index: 2; display: flex; flex-direction: column; align-items: center; gap: 8px;
          font-family: 'Inter', sans-serif; font-size: 10px; letter-spacing: 2.5px; text-transform: uppercase;
          color: rgba(255,255,255,0.6); pointer-events: none;
        }
        .eg-hero-cue i { width: 1px; height: 42px; background: linear-gradient(rgba(255,255,255,0.7), transparent);
          transform-origin: top; animation: eg-hero-cue 2.2s ${'cubic-bezier(0.16,1,0.3,1)'} infinite; }
        @keyframes eg-hero-cue { 0% { transform: scaleY(0); opacity: 0; } 40% { opacity: 1; } 100% { transform: scaleY(1); opacity: 0; } }

        @media (max-width: 860px) {
          .eg-hero { min-height: 88svh; padding-top: clamp(120px, 20vh, 200px); }
          .eg-hero-p { max-width: 100%; }
          .eg-hero-scrim { background:
            linear-gradient(180deg, rgba(7,15,25,0.6) 0%, rgba(7,15,25,0.25) 30%, rgba(7,15,25,0.3) 60%, rgba(7,15,25,0.75) 100%); }
        }
        @media (min-width: 1920px) {
          .eg-hero-rule { width: 440px; margin: 40px 0; }
          .eg-hero-p { max-width: 620px; }
          .eg-hero-btn { font-size: 20px; min-height: 58px; padding: 16px 58px; }
        }
        @media (min-width: 2560px) {
          .eg-hero-rule { width: 600px; margin: 56px 0; }
          .eg-hero-p { max-width: 820px; }
          .eg-hero-btn { font-size: 26px; min-height: 72px; padding: 22px 76px; border-radius: 16px; }
        }
        @media (prefers-reduced-motion: reduce) { .eg-hero-cue i { animation: none; } }
      `}</style>

      {reduce ? (
        <img className="eg-hero-bg" src="/images/hero-poster.jpg" alt="" aria-hidden decoding="async" />
      ) : (
        <video
          className="eg-hero-bg"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/images/hero-poster.jpg"
          disablePictureInPicture
          aria-hidden
        >
          <source src="/images/hero video.mp4" type="video/mp4" />
        </video>
      )}
      <span className="eg-hero-scrim" aria-hidden />

      <div className="eg-hero-inner">
        <motion.p className="eg-hero-eyebrow" {...fade(0.02)}>Eloma Group</motion.p>

        <motion.h1 className="eg-hero-h1" {...fade(0.05)}>
          <span className="l1">Empowering</span><br />
          <span className="l2">Growth with</span><br />
          <span className="l2">Precision &amp; Agility</span>
        </motion.h1>

        <motion.div className="eg-hero-rule" {...fade(0.18)} />

        <motion.p className="eg-hero-p" {...fade(0.26)}>
          Eloma Group transforms and scales businesses with strategy, technology, and execution.
        </motion.p>

        <motion.button className="eg-hero-btn" onClick={() => navigate('/about')} {...fade(0.36)}>
          <span>Experience</span>
        </motion.button>
      </div>

      <span className="eg-hero-cue" aria-hidden>
        <span>Scroll</span>
        <i />
      </span>
    </section>
  )
}
