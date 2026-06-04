import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'

const NAVY  = '#08213C'
const GREEN = '#3CB98C'

const COUNTRIES = [
  { code: 'au', name: 'Australia' },
  { code: 'us', name: 'USA'       },
  { code: 'ca', name: 'Canada'    },
  { code: 'gb', name: 'UK'        },
  { code: 'eu', name: 'Europe'    },
  { code: 'ae', name: 'Dubai'     },
  { code: 'in', name: 'India'     },
  { code: 'cn', name: 'China'     },
  { code: 'sg', name: 'Singapore' },
  { code: 'jp', name: 'Japan'     },
]

const AU_CITIES = [
  'Sydney', 'Melbourne', 'Brisbane', 'Perth',
  'Adelaide', 'Canberra', 'Darwin', 'Hobart',
  'Gold Coast', 'Newcastle',
]

const INTL = [
  { flag: '🇺🇸', name: 'USA'       },
  { flag: '🇨🇦', name: 'Canada'    },
  { flag: '🇬🇧', name: 'UK'        },
  { flag: '🇪🇺', name: 'Europe'    },
  { flag: '🇦🇪', name: 'Dubai'     },
  { flag: '🇮🇳', name: 'India'     },
  { flag: '🇨🇳', name: 'China'     },
  { flag: '🇸🇬', name: 'Singapore' },
  { flag: '🇯🇵', name: 'Japan'     },
]

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

export function Introduction() {
  const track1Ref = useRef<HTMLDivElement>(null)
  const track2Ref = useRef<HTMLDivElement>(null)
  const tween1    = useRef<gsap.core.Tween | null>(null)
  const tween2    = useRef<gsap.core.Tween | null>(null)
  const activeL2  = useRef<HTMLElement | null>(null)

  const clearL2 = () => {
    activeL2.current?.classList.remove('bivry-l2-active')
    activeL2.current = null
  }

  const activateL2 = (i: number) => {
    clearL2()
    const el = track2Ref.current?.children[i] as HTMLElement | undefined
    if (el) { el.classList.add('bivry-l2-active'); activeL2.current = el }
  }

  useEffect(() => {
    // Wait one frame so scrollWidth is stable after first paint
    const initId = requestAnimationFrame(() => {
      if (!track1Ref.current || !track2Ref.current) return

      const half = track1Ref.current.scrollWidth / 2
      if (half <= 0) return

      // GSAP runs on the main thread via RAF. The repeat resets x from -half
      // to 0 atomically within one RAF callback — no compositor timing gap.
      // Since content is duplicated, -half and 0 are visually identical: seamless.
      const cfg: gsap.TweenVars = {
        x: -half,
        duration: half / 40, // ~40 px/s
        ease: 'none',
        repeat: -1,
      }

      tween1.current = gsap.to(track1Ref.current, cfg)
      tween2.current = gsap.to(track2Ref.current, cfg)
    })

    return () => {
      cancelAnimationFrame(initId)
      tween1.current?.kill()
      tween2.current?.kill()
    }
  }, [])

  return (
    <section
      id="about"
      style={{
        background: '#fff',
        padding: 'clamp(96px, 12vw, 160px) clamp(24px, 5vw, 80px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* ── Top grid ── */}
      <div
        className="intro-top"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'clamp(40px, 6vw, 96px)',
          alignItems: 'flex-start',
          marginBottom: 'clamp(64px, 9vw, 112px)',
        }}
      >
        {/* Left — headline */}
        <div>
          <h2 style={{
            fontSize: 'clamp(40px, 5.6vw, 74px)',
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: '-0.045em',
            margin: 0,
          }}>
            {([
              { text: 'Road Freight',   color: NAVY,                 weight: 800, italic: false },
              { text: '& Warehousing,', color: 'rgba(8,33,60,0.22)', weight: 700, italic: true  },
              { text: 'Done Right.',    color: GREEN,                weight: 800, italic: false },
            ] as const).map((line, i) => (
              <div
                key={i}
                style={{ overflow: 'hidden', paddingBottom: '0.06em', marginBottom: '-0.06em' }}
              >
                <motion.span
                  initial={{ y: '105%', opacity: 0 }}
                  whileInView={{ y: '0%', opacity: 1 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.82, delay: i * 0.13, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    display: 'block',
                    color: line.color,
                    fontWeight: line.weight,
                    fontStyle: line.italic ? 'italic' : 'normal',
                  }}
                >
                  {line.text}
                </motion.span>
              </div>
            ))}
          </h2>
        </div>

        {/* Right — paragraph + tags */}
        <div style={{ paddingTop: 'clamp(6px, 1vw, 14px)' }}>
          <motion.p
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.78, delay: 0.18, ease }}
            style={{
              fontSize: 'clamp(15px, 1.3vw, 18px)',
              color: 'rgba(8,33,60,0.52)',
              lineHeight: 1.8,
              margin: '0 0 30px',
            }}
          >
            Reliable transport. Real-time tracking. Tailored logistics for your business.
            BIVRY combines smart operations with real-world reliability to move what
            matters - from dockyard to doorstep, across every state and territory in
            Australia.
          </motion.p>

          <div style={{ display: 'flex', gap: '0', alignItems: 'flex-start' }}>
            {/* Australia */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.65, delay: 0.3, ease }}
              style={{ display: 'flex', gap: '12px', flex: '1', minWidth: 0 }}
            >
              <div style={{
                width: '2px', borderRadius: '2px', flexShrink: 0, alignSelf: 'stretch',
                background: `linear-gradient(to bottom, ${GREEN}, ${GREEN}30)`,
              }} />
              <div style={{ minWidth: 0 }}>
                <div style={{
                  fontSize: '10px', fontWeight: 700, letterSpacing: '2.2px',
                  textTransform: 'uppercase', color: GREEN, marginBottom: '10px',
                }}>
                  Australia
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                  {AU_CITIES.map((city, i) => (
                    <motion.span
                      key={city}
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{ duration: 0.38, delay: 0.38 + i * 0.045, ease }}
                      style={{
                        fontSize: '11px', fontWeight: 500,
                        color: 'rgba(8,33,60,0.52)',
                        padding: '3px 10px',
                        background: 'rgba(8,33,60,0.04)',
                        border: '1px solid rgba(8,33,60,0.07)',
                        borderRadius: '6px',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {city}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Vertical divider */}
            <div style={{
              width: '1px', alignSelf: 'stretch', flexShrink: 0,
              background: 'rgba(8,33,60,0.08)',
              margin: '0 clamp(16px, 2.5vw, 28px)',
            }} />

            {/* International */}
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.65, delay: 0.38, ease }}
              style={{ flex: '1', minWidth: 0 }}
            >
              <div style={{
                fontSize: '10px', fontWeight: 700, letterSpacing: '2.2px',
                textTransform: 'uppercase', color: 'rgba(8,33,60,0.35)',
                marginBottom: '10px',
              }}>
                International
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                {INTL.map((c, i) => (
                  <motion.span
                    key={c.name}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.38, delay: 0.46 + i * 0.05, ease }}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '5px',
                      padding: '3px 10px',
                      fontSize: '11px', fontWeight: 500,
                      color: 'rgba(8,33,60,0.6)',
                      background: 'rgba(8,33,60,0.03)',
                      border: '1px solid rgba(8,33,60,0.08)',
                      borderRadius: '6px',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    <span style={{ fontSize: '13px', lineHeight: 1 }}>{c.flag}</span>
                    {c.name}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Divider ── */}
      <div style={{ borderTop: '1px solid rgba(8,33,60,0.07)', paddingTop: 'clamp(48px, 7vw, 80px)' }}>

        {/* Country flags */}
        <div
          style={{ overflow: 'hidden', position: 'relative', height: '106px', transform: 'translateZ(0)' }}
          onMouseEnter={() => { tween1.current?.pause(); tween2.current?.pause() }}
          onMouseLeave={() => { tween1.current?.play(); tween2.current?.play(); clearL2() }}
        >
          {/* ── Layer 1: greyscale — hover via CSS only, zero React state ── */}
          <div
            ref={track1Ref}
            style={{
              display: 'flex', gap: '40px', width: 'max-content',
              alignItems: 'flex-end', position: 'absolute', top: 32, left: 0,
              willChange: 'transform',
            }}
          >
            {[...COUNTRIES, ...COUNTRIES].map((c, i) => (
              <div key={`g${i}`} className="bivry-flag-item" onMouseEnter={() => activateL2(i)}>
                <div className="bivry-flag-tooltip">{c.name}</div>
                <div className="bivry-flag-img">
                  <img
                    src={`https://flagcdn.com/w160/${c.code}.png`}
                    alt={c.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* ── Layer 2: full colour, masked to centre — purely presentational ── */}
          <div style={{
            position: 'absolute', inset: 0, zIndex: 2,
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, transparent 24%, black 34%, black 66%, transparent 76%, transparent 100%)',
            maskImage:        'linear-gradient(to right, transparent 0%, transparent 24%, black 34%, black 66%, transparent 76%, transparent 100%)',
            pointerEvents: 'none', overflow: 'visible',
          }}>
            <div
              ref={track2Ref}
              style={{
                display: 'flex', gap: '40px', width: 'max-content',
                alignItems: 'flex-end', position: 'absolute', top: 32, left: 0,
                willChange: 'transform',
              }}
            >
              {[...COUNTRIES, ...COUNTRIES].map((c, i) => (
                <div key={`c${i}`} className="bivry-l2-flag" style={{ flexShrink: 0 }}>
                  <div style={{
                    width: '108px', height: '72px', borderRadius: '6px',
                    border: '1.5px solid rgba(8,33,60,0.18)',
                    overflow: 'hidden',
                  }}>
                    <img
                      src={`https://flagcdn.com/w160/${c.code}.png`}
                      alt=""
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Edge fades ── */}
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '64px', zIndex: 3, background: 'linear-gradient(to right, #fff, transparent)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '64px', zIndex: 3, background: 'linear-gradient(to left, #fff, transparent)', pointerEvents: 'none' }} />
        </div>

      </div>

      <style>{`
        .bivry-flag-item {
          position: relative;
          flex-shrink: 0;
          cursor: pointer;
        }
        .bivry-flag-tooltip {
          position: absolute;
          bottom: calc(100% + 7px);
          left: 50%;
          transform: translateX(-50%) translateY(4px);
          background: ${NAVY};
          color: #fff;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          padding: 3px 10px;
          border-radius: 5px;
          white-space: nowrap;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.18s ease, transform 0.2s cubic-bezier(0.16,1,0.3,1);
          z-index: 10;
        }
        .bivry-flag-item:hover .bivry-flag-tooltip {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }
        .bivry-flag-img {
          width: 108px;
          height: 72px;
          border-radius: 6px;
          border: 1.5px solid rgba(8,33,60,0.18);
          overflow: hidden;
          filter: grayscale(1) opacity(0.32);
          transform: scale(1);
          transition: transform 0.38s cubic-bezier(0.16,1,0.3,1), border-color 0.2s;
        }
        .bivry-flag-item:hover .bivry-flag-img {
          transform: scale(1.14);
          border-color: rgba(8,33,60,0.32);
        }
        .bivry-l2-flag > div {
          transition: transform 0.38s cubic-bezier(0.16,1,0.3,1), border-color 0.2s;
        }
        .bivry-l2-flag.bivry-l2-active > div {
          transform: scale(1.14);
          border-color: rgba(8,33,60,0.32);
        }
        @media (max-width: 900px) {
          .intro-top { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
