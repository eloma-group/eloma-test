import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { Ship, Monitor, Truck, Plane } from 'lucide-react'
import { takePending } from '../../utils/sectionLink'

/* header/footer slug → index in COMPANIES */
const COMPANY_INDEX: Record<string, number> = {
  digital: 0, imports: 1, foundations: 2, transport: 3, travels: 4,
}

const NAVY  = '#13293D'
const GREEN = '#3CB98C'
const MUTED = 'rgba(26,43,60,0.55)'
const EASE  = [0.16, 1, 0.3, 1] as [number, number, number, number]

type Company = {
  label: string
  id: string                 // Unsplash photo id (large background)
  icon: React.ReactNode      // badge icon
  blurb: string
  pos: { left: string; bottom: string }
  center?: boolean
}

const COMPANIES: Company[] = [
  { label: 'EG Digital', id: 'photo-1498050108023-c5249f4df085', icon: <Monitor size={26} />,
    blurb: 'Web, software and digital marketing — building modern digital experiences and growth engines across every channel.',
    pos: { left: '10%', bottom: '15%' } },
  { label: 'EG Imports', id: 'photo-1494412651409-8963ce7935a7', icon: <Ship size={26} />,
    blurb: 'End-to-end import operations connecting global suppliers with local markets — sourcing, customs and distribution handled with precision.',
    pos: { left: '28%', bottom: '20%' } },
  { label: 'EG Foundations', id: 'photo-1497366811353-6870744d04b2', icon: null,
    blurb: 'The shared services backbone — governance, finance and people across every business.',
    pos: { left: '50%', bottom: '26%' }, center: true },
  { label: 'EG Transport', id: 'photo-1633155565182-16c06ed45ec5', icon: <Truck size={26} />,
    blurb: 'Reliable fleet and logistics — moving goods on time, every time, across the region.',
    pos: { left: '72%', bottom: '20%' } },
  { label: 'EG Travels', id: 'photo-1436491865332-7a61a109cc05', icon: <Plane size={26} />,
    blurb: 'Corporate and leisure travel designed around people — seamless journeys and trusted partners.',
    pos: { left: '90%', bottom: '15%' } },
]

const img = (id: string, w: number) => {
  const host = id.startsWith('premium_photo') ? 'https://plus.unsplash.com' : 'https://images.unsplash.com'
  return `${host}/${id}?auto=format&fit=crop&w=${w}&q=80`
}

export function EgCompanies() {
  const reduce = useReducedMotion()
  const stageRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(2) // Foundations (centre) by default

  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ['start end', 'end start'],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])
  const co = COMPANIES[active]

  // Deep-link from header/footer → activate the clicked company + scroll here
  useEffect(() => {
    const focus = (id: string) => {
      const idx = COMPANY_INDEX[id]
      if (idx == null) return
      setActive(idx)
      requestAnimationFrame(() => {
        const el = stageRef.current
        if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 72, behavior: 'smooth' })
      })
    }
    const pending = takePending('company')
    if (pending) setTimeout(() => focus(pending), 350)
    const handler = (e: Event) => { const id = (e as CustomEvent).detail?.id; if (id) focus(id) }
    window.addEventListener('eg:company', handler)
    return () => window.removeEventListener('eg:company', handler)
  }, [])

  return (
    <section className="eg-co" id="our-companies" aria-label="Our companies">
      <style>{`
        .eg-co { background: #ffffff; padding: clamp(48px, 6vw, 90px) 0 0; overflow: hidden; }

        /* ── top header (on white) ── */
        .eg-co-head { text-align: center; padding: 0 clamp(24px, 5vw, 80px); margin-bottom: 0; }
        .eg-co-eyebrow {
          font-family: 'Poppins', sans-serif; font-weight: 700; text-transform: uppercase;
          font-size: clamp(22px, 2.6vw, 34px); color: ${GREEN}; margin: 0; letter-spacing: 0.04em;
        }
        .eg-co-sub { font-family:'Inter',sans-serif; font-size: clamp(11px,0.9vw,14px); letter-spacing:3px; text-transform:uppercase; color:${MUTED}; margin: 12px 0 0; }
        .eg-co-line {
          position: relative; width: clamp(170px, 18vw, 270px); height: 3px; margin: clamp(14px,1.8vw,20px) auto 0;
          border-radius: 3px;
          background: linear-gradient(90deg, rgba(60,185,140,0) 0%, ${GREEN} 22%, ${GREEN} 78%, rgba(60,185,140,0) 100%);
        }
        .eg-co-line::after {
          content:''; position:absolute; left:50%; top:50%; transform:translate(-50%,-50%);
          width:34px; height:8px; border-radius:8px; background:${GREEN}; box-shadow:0 0 0 3px #fff;
        }

        /* ── stage (image) with the big title fully overlaid ── */
        .eg-co-stage {
          position: relative; width: 100%;
          min-height: clamp(500px, 54vw, 760px);
          background: #11161b; overflow: hidden;
        }
        .eg-co-bg {
          position: absolute; left: 0; top: -10%; width: 100%; height: 120%;
          object-fit: cover; filter: saturate(1.05) brightness(0.95);
          will-change: transform, opacity;
        }
        /* top edge fades into the white section above; blue shade only frames the left, right and top-centre (centre + bottom stay clear); subtle dark base for badge labels */
        .eg-co-stage::after {
          content:''; position:absolute; inset:0; z-index:2;
          background:
            /* white top fade — blends with the white section above */
            linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0.5) 5%, rgba(255,255,255,0) 16%),
            /* blue left edge */
            linear-gradient(90deg, rgba(40,90,150,0.55) 0%, rgba(40,90,150,0) 30%),
            /* blue right edge */
            linear-gradient(270deg, rgba(40,90,150,0.55) 0%, rgba(40,90,150,0) 30%),
            /* blue top-centre glow (fades out before the middle) */
            radial-gradient(ellipse 58% 52% at 50% -6%, rgba(74,144,196,0.55) 0%, rgba(74,144,196,0) 68%),
            /* light dark base for badge-label legibility — no blue */
            linear-gradient(0deg, rgba(12,24,36,0.42) 0%, rgba(12,24,36,0) 26%),
            /* gentle blue wash across the centre, fading out near the bottom */
            linear-gradient(180deg, rgba(74,144,196,0.16) 0%, rgba(74,144,196,0.14) 58%, rgba(74,144,196,0) 90%);
        }

        .eg-co-titles {
          position: absolute; top: clamp(24px, 4vw, 56px); left: 0; right: 0; z-index: 7;
          pointer-events: none; text-align: center; padding: 0 clamp(24px, 5vw, 80px);
        }
        .eg-co-big {
          font-family: 'Poppins', sans-serif; font-weight: 800; text-transform: uppercase;
          font-size: clamp(44px, 8.6vw, 128px); line-height: 0.92; letter-spacing: -0.03em;
          margin: clamp(16px, 2.2vw, 30px) 0 clamp(12px, 1.6vw, 22px);
        }
        .eg-co-big .eg { color: ${GREEN}; }
        .eg-co-big .fo { color: ${NAVY}; display: inline-block; }
        .eg-co-partner {
          font-family: 'Poppins', sans-serif; font-weight: 800; text-transform: uppercase;
          font-size: clamp(20px, 3.4vw, 52px); letter-spacing: 0.04em; margin: clamp(6px,1vw,14px) 0 0;
          color: rgba(255,255,255,0.95); text-shadow: 0 2px 22px rgba(0,0,0,0.5);
        }

        .eg-co-curve { position: absolute; bottom: -1px; left: 0; width: 100%; z-index: 5; pointer-events: none; }
        .eg-co-curve svg { display: block; width: 100%; height: clamp(80px, 11vw, 160px); }

        .eg-co-info {
          position: absolute; z-index: 4; left: clamp(24px, 5vw, 80px);
          bottom: clamp(160px, 19vw, 300px);
          max-width: min(40ch, 30%);
        }
        .eg-co-info-eyebrow {
          display: inline-block; font-family:'Poppins',sans-serif; font-weight:700; text-transform:uppercase;
          font-size: clamp(13px,1.3vw,18px); letter-spacing:1.5px; color:#fff; margin: 0 0 12px;
          padding: 6px 16px; border-radius: 999px; background: rgba(60,185,140,0.92);
          box-shadow: 0 10px 24px -10px rgba(60,185,140,0.8);
        }
        .eg-co-blurb {
          font-family: 'Inter', sans-serif; font-size: clamp(15px, 1.35vw, 21px); line-height: 1.6;
          color: rgba(255,255,255,0.96); font-weight: 500; margin: 0;
          text-shadow: 0 2px 18px rgba(0,0,0,0.6);
        }

        .eg-arc { position: absolute; inset: 0; z-index: 6; }
        /* wrapper owns the centring transform so Framer Motion's animated transform on the
           button doesn't override it (which would shift every badge right by half its width) */
        .eg-badge-pos { position: absolute; transform: translate(-50%, 50%); }
        .eg-badge {
          display: flex; flex-direction: column; align-items: center; gap: 8px; text-align: center;
          width: max-content; background: none; border: none; cursor: pointer; padding: 0;
        }
        .eg-badge-circle {
          width: clamp(60px, 6.8vw, 86px); height: clamp(60px, 6.8vw, 86px); border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          background: #fff; color: ${NAVY};
          box-shadow: 0 16px 34px -12px rgba(19,41,61,0.55);
          border: 3px solid #fff;
          transition: transform 0.3s ${'cubic-bezier(0.16,1,0.3,1)'}, box-shadow 0.3s ease, border-color 0.3s ease, color 0.3s ease;
        }
        .eg-badge:hover .eg-badge-circle { transform: translateY(-4px); }
        .eg-badge.active .eg-badge-circle {
          transform: translateY(-4px) scale(1.08);
          border-color: ${GREEN}; color: ${GREEN};
          box-shadow: 0 20px 40px -12px rgba(60,185,140,0.85);
        }
        .eg-badge.center .eg-badge-circle {
          width: clamp(82px, 9vw, 122px); height: clamp(82px, 9vw, 122px);
          background: #fff; border-color: ${GREEN};
          box-shadow: 0 20px 44px -12px rgba(60,185,140,0.6);
        }
        .eg-badge.center .eg-badge-circle img { width: 64%; height: 64%; object-fit: contain; }
        .eg-badge.center.active .eg-badge-circle { border-color: ${GREEN}; transform: translateY(-4px) scale(1.06); }
        .eg-badge-label {
          font-family: 'Inter', sans-serif; font-size: clamp(11px, 0.95vw, 14px); font-weight: 600; color: #fff;
          text-shadow: 0 1px 10px rgba(0,0,0,0.55); transition: color 0.25s ease;
        }
        .eg-badge.active .eg-badge-label { color: ${GREEN}; font-weight: 700; }
        .eg-badge.center .eg-badge-label { color: ${GREEN}; font-weight: 700; }

        @media (max-width: 767px) {
          .eg-co-titles { position: relative; top: 0; padding-top: clamp(16px,4vw,28px); }
          .eg-co-info { position: relative; left: 0; bottom: 0; max-width: none; padding: clamp(20px,5vw,28px) clamp(24px,5vw,32px) 0; }
          .eg-co-stage::after { background: linear-gradient(180deg, rgba(20,45,75,0.55) 0%, rgba(40,90,150,0.30) 22%, rgba(74,144,196,0) 46%); }
          .eg-arc {
            position: relative; inset: auto; display: flex; flex-wrap: wrap;
            justify-content: center; gap: 22px 26px; padding: clamp(28px,7vw,40px) 24px clamp(40px,9vw,56px);
          }
          .eg-badge-pos { position: static; transform: none; }
          .eg-co-curve { display: none; }
          .eg-co-stage { min-height: 0; }
        }

        /* ── large screens: taller image stage so it isn't a thin band ── */
        @media (min-width: 1920px) {
          .eg-co-stage { min-height: 1060px; }
          .eg-co-big { font-size: 158px; }
          .eg-co-partner { font-size: 62px; }
          .eg-co-blurb { font-size: 24px; }
          .eg-co-info { max-width: min(46ch, 32%); }
          .eg-badge-circle { width: 100px; height: 100px; }
          .eg-badge.center .eg-badge-circle { width: 142px; height: 142px; }
          .eg-badge-label { font-size: 16px; }
        }
        @media (min-width: 2560px) {
          .eg-co-stage { min-height: 1440px; }
          .eg-co-big { font-size: 220px; }
          .eg-co-partner { font-size: 88px; }
          .eg-co-blurb { font-size: 30px; }
          .eg-badge-circle { width: 134px; height: 134px; }
          .eg-badge.center .eg-badge-circle { width: 190px; height: 190px; }
          .eg-badge-label { font-size: 20px; }
          .eg-co-curve svg { height: 220px; }
        }
      `}</style>

      <div className="eg-co-head">
        <p className="eg-co-eyebrow">Our Companies</p>
        <p className="eg-co-sub">One group · Five companies · One vision</p>
        <div className="eg-co-line" aria-hidden />
        <motion.h2
          className="eg-co-big"
          initial={reduce ? false : { opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.85, ease: EASE }}
        >
          <span className="eg">EG&nbsp;</span>
          <AnimatePresence mode="wait">
            <motion.span
              key={active}
              className="fo"
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -14 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              {co.label.replace(/^EG\s+/, '')}
            </motion.span>
          </AnimatePresence>
        </motion.h2>
      </div>

      <div className="eg-co-stage" ref={stageRef}>
        <AnimatePresence initial={false}>
          <motion.img
            key={active}
            className="eg-co-bg"
            src={img(co.id, 1800)}
            alt={co.label}
            decoding="async"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            style={reduce ? undefined : { y: bgY }}
          />
        </AnimatePresence>

        {/* only the call-to-action overlays the image */}
        <motion.div
          className="eg-co-titles"
          initial={reduce ? false : { opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.85, ease: EASE }}
        >
          <p className="eg-co-partner">Partner With Us</p>
        </motion.div>

        <div className="eg-co-info">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              <span className="eg-co-info-eyebrow">{co.label}</span>
              <p className="eg-co-blurb">{co.blurb}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="eg-co-curve" aria-hidden>
          <svg viewBox="0 0 1440 160" preserveAspectRatio="none">
            <path d="M0,160 L0,128 C360,48 1080,48 1440,128 L1440,160 Z" fill="#ffffff" />
          </svg>
        </div>

        <div className="eg-arc">
          {COMPANIES.map((c, i) => (
            <div key={c.label} className="eg-badge-pos" style={c.pos as React.CSSProperties}>
              <motion.button
                type="button"
                className={`eg-badge${c.center ? ' center' : ''}${i === active ? ' active' : ''}`}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                aria-label={`Show ${c.label}`}
                aria-pressed={i === active}
                initial={reduce ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.08 * i, ease: EASE }}
              >
                <div className="eg-badge-circle">
                  {c.center
                    ? <img src="/images/eg-mark.png" alt="EG Foundations" decoding="async" />
                    : c.icon}
                </div>
                <span className="eg-badge-label">{c.label}</span>
              </motion.button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
