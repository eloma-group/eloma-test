import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { HardHat, X } from 'lucide-react'

const NAVY  = '#13293D'
const GREEN = '#3CB98C'
const MUTED = 'rgba(26,43,60,0.6)'
const EASE  = [0.16, 1, 0.3, 1] as [number, number, number, number]

/* Shows on every page load/refresh of the homepage. */
export function ConstructionNotice() {
  const reduce = useReducedMotion()
  const [open, setOpen] = useState(true)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="cn-backdrop"
          role="dialog" aria-modal="true" aria-labelledby="cn-title" aria-describedby="cn-desc"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: EASE }}
          onClick={() => setOpen(false)}
        >
          <motion.div
            className="cn-card"
            onClick={(e) => e.stopPropagation()}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            <span className="cn-glow" aria-hidden />
            <button className="cn-close" onClick={() => setOpen(false)} aria-label="Dismiss notice"><X size={18} /></button>

            <span className="cn-ic"><HardHat size={26} strokeWidth={2} /></span>
            <p className="cn-eyebrow">Heads up</p>
            <h2 id="cn-title" className="cn-title">This website is still <span className="cn-g">under construction.</span></h2>
            <p id="cn-desc" className="cn-desc">
              We're actively building things out - some pages may not be fully responsive or complete just yet. Thanks for your patience.
            </p>
            <button className="cn-btn" onClick={() => setOpen(false)} autoFocus><span>Got it</span></button>
          </motion.div>

          <style>{`
            .cn-backdrop {
              position: fixed; inset: 0; z-index: 100;
              display: flex; align-items: center; justify-content: center;
              padding: clamp(20px, 5vw, 48px);
              background: rgba(8,20,33,0.5); backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px);
            }
            .cn-card {
              position: relative; overflow: hidden;
              width: 100%; max-width: 440px;
              background: linear-gradient(160deg, #ffffff 0%, #f5faf8 100%);
              border: 1px solid rgba(26,43,60,0.1); border-radius: 24px;
              padding: clamp(28px, 4vw, 40px);
              box-shadow: 0 40px 90px -40px rgba(19,41,61,0.55), 0 2px 6px rgba(19,41,61,0.06);
              text-align: left; will-change: transform, opacity;
            }
            .cn-glow { position: absolute; top: -60px; right: -50px; width: 220px; height: 220px; border-radius: 50%;
              background: radial-gradient(circle, rgba(60,185,140,0.22), transparent 65%); pointer-events: none; }
            .cn-close {
              position: absolute; top: 16px; right: 16px; z-index: 2;
              display: inline-flex; align-items: center; justify-content: center;
              width: 36px; height: 36px; border-radius: 10px; cursor: pointer;
              background: rgba(26,43,60,0.05); border: none; color: ${NAVY};
              transition: background 0.2s ease, color 0.2s ease;
            }
            .cn-close:hover { background: ${NAVY}; color: #fff; }
            .cn-ic {
              position: relative; display: inline-flex; align-items: center; justify-content: center;
              width: 56px; height: 56px; border-radius: 16px; margin-bottom: 20px;
              background: rgba(60,185,140,0.12); color: ${GREEN};
              box-shadow: inset 0 0 0 1px rgba(60,185,140,0.22);
            }
            .cn-eyebrow { position: relative; margin: 0 0 10px; font-family: 'Inter', sans-serif; font-weight: 800;
              font-size: 11px; letter-spacing: 2.5px; text-transform: uppercase; color: ${GREEN}; }
            .cn-title { position: relative; margin: 0 0 14px; font-family: 'Poppins', sans-serif; font-weight: 700;
              font-size: clamp(22px, 3vw, 28px); line-height: 1.18; letter-spacing: -0.02em; color: ${NAVY}; }
            .cn-g { color: ${GREEN}; }
            .cn-desc { position: relative; margin: 0 0 26px; font-family: 'Inter', sans-serif;
              font-size: clamp(13.5px, 1.1vw, 15px); line-height: 1.7; color: ${MUTED}; }
            .cn-btn {
              position: relative; overflow: hidden; display: inline-flex; align-items: center; justify-content: center;
              width: 100%; min-height: 48px; padding: 13px 28px; border: none; border-radius: 12px; cursor: pointer;
              background: ${GREEN}; color: #fff; font-family: 'Poppins', sans-serif; font-size: 15px; font-weight: 500;
              box-shadow: 0 14px 30px -12px rgba(60,185,140,0.65);
              transition: transform 0.25s ${'cubic-bezier(0.16,1,0.3,1)'}, background 0.25s ease;
            }
            .cn-btn span { position: relative; z-index: 1; }
            .cn-btn::after { content:''; position:absolute; top:0; left:-120%; width:55%; height:100%;
              background: linear-gradient(110deg, transparent, rgba(255,255,255,0.45), transparent); transform: skewX(-18deg);
              transition: left 0.7s cubic-bezier(0.16,1,0.3,1); }
            .cn-btn:hover { transform: translateY(-2px); background: #34ab80; }
            .cn-btn:hover::after { left: 135%; }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
