import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

const GREEN = '#3CB98C'
const FILL_DURATION = 1.9

export function SplashScreen() {
  const [visible,   setVisible]   = useState(true)
  const [startFill, setStartFill] = useState(false)

  useEffect(() => {
    // Begin fill shortly after logo settles
    const t1 = setTimeout(() => setStartFill(true), 700)
    // Dismiss once fill is done + small pause
    const t2 = setTimeout(() => setVisible(false), 700 + FILL_DURATION * 1000 + 380)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.55, ease: 'easeInOut' } }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '28px' }}
          >
            {/* Logo */}
            <img
              src="/images/BIVRY Logo-Blue.jpg"
              alt="BIVRY"
              style={{
                width: 'clamp(260px, 36vw, 460px)',
                height: 'auto',
              }}
            />

            {/* Loading bar row — offset right to sit under the BIVRY text, not the bird */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.45 }}
              style={{ display: 'flex', alignItems: 'center', gap: '14px', paddingLeft: 'clamp(72px, 10vw, 130px)' }}
            >
              {/* Left line grows outward */}
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={startFill ? { width: 36, opacity: 0.55 } : {}}
                transition={{ duration: FILL_DURATION, ease: 'easeInOut' }}
                style={{ height: '1px', background: GREEN, flexShrink: 0 }}
              />

              {/* Text: muted ghost + colour-fill sweeping left→right */}
              <div style={{ position: 'relative', display: 'inline-block' }}>
                {/* Ghost (unfilled) */}
                <span style={{
                  fontSize: 'clamp(12px, 1.3vw, 16px)',
                  color: 'rgba(8,33,60,0.15)',
                  fontStyle: 'italic',
                  letterSpacing: '0.4px',
                  fontWeight: 400,
                  whiteSpace: 'nowrap',
                  display: 'block',
                  userSelect: 'none',
                }}>
                  From Dockyard to Doorstep delivery
                </span>

                {/* Filled layer — clip sweeps from left to right */}
                <motion.span
                  initial={{ clipPath: 'inset(0 100% 0 0)' }}
                  animate={startFill ? { clipPath: 'inset(0 0% 0 0)' } : {}}
                  transition={{ duration: FILL_DURATION, ease: 'easeInOut' }}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    fontSize: 'clamp(12px, 1.3vw, 16px)',
                    color: 'rgba(8,33,60,0.65)',
                    fontStyle: 'italic',
                    letterSpacing: '0.4px',
                    fontWeight: 400,
                    whiteSpace: 'nowrap',
                  }}
                >
                  From Dockyard to Doorstep delivery
                </motion.span>
              </div>

              {/* Right line grows outward */}
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={startFill ? { width: 36, opacity: 0.55 } : {}}
                transition={{ duration: FILL_DURATION, ease: 'easeInOut' }}
                style={{ height: '1px', background: GREEN, flexShrink: 0 }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
