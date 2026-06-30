import { motion, useReducedMotion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number]
const MARK = '/images/eg-mark.png'

/**
 * Animated Eloma "EG" brand mark for the hero — single official logo.
 * Entrance + gentle float + a soft light "sheen" sweep clipped to the logo
 * silhouette. Transform/opacity only → compositor-safe (120fps).
 */
export function EgHeroLogo() {
  const reduce = useReducedMotion()

  return (
    <motion.div
      className="ehl"
      initial={reduce ? false : { opacity: 0, scale: 0.92, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 0.15, duration: 1.0, ease: EASE }}
      aria-label="Eloma Group"
      role="img"
    >
      <style>{`
        .ehl {
          position: relative;
          width: clamp(220px, 32vw, 440px);
          aspect-ratio: 1 / 1;
          filter: drop-shadow(0 30px 60px rgba(19,41,61,0.20));
        }
        .ehl-float {
          position: absolute; inset: 0;
          transform: scale(1.3);
          will-change: transform;
          animation: ehl-float 5.5s ease-in-out infinite;
        }
        @keyframes ehl-float {
          0%, 100% { transform: scale(1.3) translateY(0); }
          50%      { transform: scale(1.3) translateY(-12px); }
        }
        .ehl-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: contain; }

        /* Light sweep, clipped to the logo silhouette via its alpha mask */
        .ehl-sheen-wrap {
          position: absolute; inset: 0; overflow: hidden; pointer-events: none;
          -webkit-mask-image: url(${MARK}); mask-image: url(${MARK});
          -webkit-mask-size: contain; mask-size: contain;
          -webkit-mask-repeat: no-repeat; mask-repeat: no-repeat;
          -webkit-mask-position: center; mask-position: center;
        }
        .ehl-sheen {
          position: absolute; top: -25%; bottom: -25%; left: -60%; width: 45%;
          background: linear-gradient(110deg, transparent 0%, rgba(255,255,255,0.45) 50%, transparent 100%);
          transform: translateX(0) rotate(8deg);
          will-change: transform;
          animation: ehl-sheen 6s ease-in-out infinite;
        }
        @keyframes ehl-sheen {
          0%   { transform: translateX(0) rotate(8deg); }
          16%  { transform: translateX(400%) rotate(8deg); }
          100% { transform: translateX(400%) rotate(8deg); }
        }

        @media (prefers-reduced-motion: reduce) {
          .ehl-float, .ehl-sheen { animation: none; }
        }
      `}</style>

      <div className="ehl-float">
        <img className="ehl-img" src={MARK} alt="" decoding="async" />
        <div className="ehl-sheen-wrap" aria-hidden><div className="ehl-sheen" /></div>
      </div>
    </motion.div>
  )
}
