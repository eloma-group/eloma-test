import { Shield, Globe, MapPin, Server, User, Lock } from 'lucide-react'
import type { ReactNode } from 'react'

/* ───────────────────────────────────────────────
   EgGlobeScene — fully hand-built CSS/SVG 3D scene
   (no source image). A rotating dotted earth floats
   above a static futuristic podium, ringed by orbit
   ellipses and floating glass icon badges.
   ─────────────────────────────────────────────── */

const ICE   = '#eef3f8'
const STEEL = '#cfdcec'
const BLUE  = '#274e8c'
const BLUEM = '#3a6fbf'
const CYAN  = '#3bb6ff'
const GREEN = '#3CB98C'
const NAVY  = '#16335f'

type Badge = { icon: ReactNode; left: string; top: string; d: number }
// 3 left + 3 right, curved around the globe's surface (middle icon sits furthest out)
const BADGES: Badge[] = [
  { icon: <Shield size="42%" />, left: '5.5%',  top: '5.9%',  d: 0.0 },
  { icon: <MapPin size="42%" />, left: '0.5%',  top: '26.5%', d: 0.6 },
  { icon: <Server size="42%" />, left: '5.5%',  top: '47.1%', d: 1.2 },
  { icon: <Globe  size="42%" />, left: '81.5%', top: '5.9%',  d: 0.3 },
  { icon: <User   size="42%" />, left: '86.5%', top: '26.5%', d: 0.9 },
  { icon: <Lock   size="42%" />, left: '81.5%', top: '47.1%', d: 1.5 },
]

/* orbit definitions (viewBox -50..50, centred on the globe) */
type Orbit = { rx: number; ry: number; rot: number; stroke: string; sw: number; sat: string; satR: number; dur: number }
// each ellipse's major-axis tips land on a diagonal pair of the 6 (curved) icons
const ORBITS: Orbit[] = [
  { rx: 43.2, ry: 11, rot:  28.5, stroke: 'rgba(58,111,191,0.55)', sw: 0.5, sat: CYAN,  satR: 1.4, dur: 13 }, // top-left ↔ bottom-right
  { rx: 43,   ry: 8,  rot:   0,   stroke: 'rgba(58,111,191,0.34)', sw: 0.5, sat: BLUE,  satR: 1.2, dur: 19 }, // mid-left ↔ mid-right
  { rx: 43.2, ry: 11, rot: -28.5, stroke: 'rgba(60,185,140,0.55)', sw: 0.5, sat: GREEN, satR: 1.1, dur: 10 }, // bottom-left ↔ top-right
]
function ellipsePath(rx: number, ry: number): string {
  return `M ${-rx},0 a ${rx},${ry} 0 1,0 ${2 * rx},0 a ${rx},${ry} 0 1,0 ${-2 * rx},0`
}
function OrbitRings() {
  return (
    <>
      {ORBITS.map((o, i) => {
        const d = ellipsePath(o.rx, o.ry)
        return (
          <g key={i} transform={`rotate(${o.rot})`}>
            <path d={d} fill="none" stroke={o.stroke} strokeWidth={o.sw} />
            <circle r={o.satR} fill={o.sat}>
              <animateMotion dur={`${o.dur}s`} repeatCount="indefinite" path={d} />
            </circle>
          </g>
        )
      })}
    </>
  )
}

/* build a stacked solid box-shadow to fake an extruded cylinder side */
function extrude(depth: number, color: string, shadow = true): string {
  const parts: string[] = []
  for (let i = 1; i <= depth; i++) parts.push(`0 ${i}px 0 ${color}`)
  if (shadow) parts.push(`0 ${depth + 10}px 26px rgba(22,51,95,0.30)`)
  return parts.join(', ')
}

export function EgGlobeScene() {
  return (
    <div className="egs" role="img" aria-label="Globally connected network — rotating 3D globe over a futuristic platform">
      <style>{`
        .egs { position: relative; width: 100%; max-width: clamp(320px, 42vw, 560px);
               margin: 0 auto; aspect-ratio: 1 / 1; }

        /* faint background grid */
        .egs-grid {
          position: absolute; inset: 4% 0 18%; z-index: 0; pointer-events: none; opacity: 0.5;
          background-image:
            linear-gradient(rgba(39,78,140,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(39,78,140,0.06) 1px, transparent 1px);
          background-size: 7% 7%;
          -webkit-mask-image: radial-gradient(circle at 50% 40%, #000 30%, transparent 72%);
                  mask-image: radial-gradient(circle at 50% 40%, #000 30%, transparent 72%);
        }

        /* ── orbit rings (wrap around the globe: back half behind, front half in front) ── */
        .egs-orbits {
          position: absolute; left: 50%; top: 33%; width: 100%; aspect-ratio: 1;
          transform: translate(-50%, -50%); pointer-events: none;
        }
        .egs-orbits.back  { z-index: 2; clip-path: inset(0 0 50% 0); }   /* top half = behind globe */
        .egs-orbits.front { z-index: 4; clip-path: inset(50% 0 0 0); }   /* bottom half = in front */
        .egs-orbits svg { width: 100%; height: 100%; overflow: visible; }

        /* ── globe (rotation only, no vertical float) ── */
        .egs-globe-pos {
          position: absolute; left: 50%; top: 33%; width: 58%; aspect-ratio: 1;
          transform: translate(-50%, -50%); z-index: 3;
        }
        .egs-globe {
          position: relative; width: 100%; height: 100%; border-radius: 50%;
          overflow: hidden;
          background: radial-gradient(circle at 38% 30%, #ffffff 0%, ${ICE} 62%, ${STEEL} 100%);
          box-shadow: 0 26px 50px -18px rgba(22,51,95,0.45), 0 0 0 1px rgba(120,150,190,0.18);
        }
        .egs-globe-tex {
          position: absolute; top: 0; left: 0; height: 100%; width: 200%;
          background-image: url('/images/eg-dots-world.png');
          background-size: 50% 100%; background-repeat: repeat-x;
          opacity: 0.92; animation: egs-spin 22s linear infinite; will-change: transform;
        }
        @keyframes egs-spin { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .egs-globe-shade {
          position: absolute; inset: 0; border-radius: 50%;
          background:
            radial-gradient(circle at 34% 26%, rgba(255,255,255,0.78) 0%, rgba(255,255,255,0) 42%),
            radial-gradient(circle at 50% 50%, rgba(255,255,255,0) 58%, rgba(225,233,244,0.55) 82%, rgba(207,220,236,0.85) 100%);
          box-shadow: inset -16px -20px 44px rgba(40,70,120,0.22), inset 16px 16px 36px rgba(255,255,255,0.6);
        }

        /* ── projection beams from globe to base ── */
        .egs-beams {
          position: absolute; left: 50%; top: 56%; width: 30%; height: 16%;
          transform: translateX(-50%); z-index: 2; pointer-events: none;
          background: repeating-linear-gradient(90deg,
            rgba(59,182,255,0.0) 0 6%, rgba(59,182,255,0.45) 6.5% 7%, rgba(59,182,255,0.0) 7.5% 13%);
          -webkit-mask-image: linear-gradient(180deg, transparent, #000 40%, #000 70%, transparent);
                  mask-image: linear-gradient(180deg, transparent, #000 40%, #000 70%, transparent);
          opacity: 0.7;
        }

        /* ── podium base (static) ── */
        .egs-base {
          position: absolute; left: 50%; bottom: 5%; width: 84%;
          transform: translateX(-50%); z-index: 5;
          aspect-ratio: 100 / 42;
        }
        .egs-tier {
          position: absolute; left: 50%; transform: translateX(-50%);
          border-radius: 50%; aspect-ratio: 100 / 27;
        }
        .egs-shadow {
          position: absolute; left: 50%; bottom: -3%; transform: translateX(-50%);
          width: 104%; aspect-ratio: 100 / 22; border-radius: 50%;
          background: radial-gradient(closest-side, rgba(22,51,95,0.30), rgba(22,51,95,0) 72%);
          filter: blur(5px);
        }
        .egs-rim {
          position: absolute; left: 50%; transform: translateX(-50%);
          border-radius: 50%; aspect-ratio: 100 / 27; border-style: solid; border-width: 1.5px;
        }
        .egs-fx {
          position: absolute; left: 50%; transform: translateX(-50%);
          border-radius: 50%; aspect-ratio: 100 / 27;
        }
        /* glowing center target */
        .egs-core {
          position: absolute; left: 50%; bottom: 44%; transform: translateX(-50%);
          width: 38%; aspect-ratio: 100 / 28; border-radius: 50%;
          background:
            radial-gradient(closest-side, rgba(255,255,255,0.95), rgba(110,205,255,0.85) 24%, rgba(59,182,255,0.0) 70%),
            repeating-radial-gradient(closest-side, ${CYAN} 0 7%, rgba(59,182,255,0.12) 7% 14%);
          box-shadow: 0 0 24px 6px rgba(59,182,255,0.55), 0 0 56px 18px rgba(59,182,255,0.25);
          filter: saturate(1.1);
        }
        .egs-core::after {
          content: ''; position: absolute; inset: 28% 36%;
          border-radius: 50%; background: #ffffff;
          box-shadow: 0 0 16px 6px rgba(255,255,255,0.9);
        }

        /* ── icon badges ── */
        @keyframes egs-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8%); } }
        .egs-badge {
          position: absolute; width: 13%; aspect-ratio: 3 / 4; z-index: 6;
          display: flex; flex-direction: column; align-items: center;
          animation: egs-float 6s ease-in-out infinite; will-change: transform;
        }
        .egs-badge-card {
          width: 100%; aspect-ratio: 1; border-radius: 26%;
          display: flex; align-items: center; justify-content: center;
          color: ${BLUE};
          background: linear-gradient(160deg, rgba(255,255,255,0.96), rgba(232,240,250,0.82));
          border: 1px solid rgba(120,150,190,0.4);
          box-shadow: 0 12px 24px -10px rgba(22,51,95,0.45), inset 0 1px 2px rgba(255,255,255,0.9);
          backdrop-filter: blur(2px);
        }
        .egs-badge-stand {
          width: 64%; aspect-ratio: 100 / 26; margin-top: 8%; border-radius: 50%;
          background: linear-gradient(180deg, ${STEEL}, ${BLUEM});
          box-shadow: 0 2px 0 ${NAVY}, 0 5px 10px rgba(22,51,95,0.4);
        }
        .egs-badge-line {
          width: 1px; flex: 1; min-height: 10px; margin-top: 6%;
          background: repeating-linear-gradient(180deg, rgba(39,78,140,0.5) 0 3px, transparent 3px 7px);
        }

        @media (prefers-reduced-motion: reduce) {
          .egs-globe-tex, .egs-globe, .egs-orbits, .egs-badge { animation: none; }
        }
      `}</style>

      <div className="egs-grid" aria-hidden />

      {/* orbit rings — back half (behind the globe) */}
      <div className="egs-orbits back" aria-hidden>
        <svg viewBox="-50 -50 100 100"><OrbitRings /></svg>
      </div>

      {/* globe */}
      <div className="egs-globe-pos">
        <div className="egs-globe">
          <div className="egs-globe-tex" aria-hidden />
          <div className="egs-globe-shade" aria-hidden />
        </div>
      </div>

      {/* orbit rings — front half (in front of the globe) */}
      <div className="egs-orbits front" aria-hidden>
        <svg viewBox="-50 -50 100 100"><OrbitRings /></svg>
      </div>

      <div className="egs-beams" aria-hidden />

      {/* podium — layered futuristic platform */}
      <div className="egs-base" aria-hidden>
        {/* ground shadow */}
        <div className="egs-shadow" />

        {/* 1 · outer white base ring (deep) */}
        <div className="egs-tier" style={{
          width: '100%', bottom: '0%',
          background: `linear-gradient(180deg, #ffffff, ${ICE})`,
          boxShadow: extrude(15, '#b4c4d8'),
        }} />
        {/* cyan dash ring around the outer rim */}
        <div className="egs-fx" style={{
          width: '93%', bottom: '7%',
          background: `repeating-conic-gradient(${CYAN} 0deg 3deg, rgba(59,182,255,0) 3deg 9deg)`,
          WebkitMaskImage: 'radial-gradient(closest-side, transparent 82%, #000 84%, #000 94%, transparent 96%)',
          maskImage: 'radial-gradient(closest-side, transparent 82%, #000 84%, #000 94%, transparent 96%)',
          opacity: 0.9,
        }} />

        {/* 2 · blue side band */}
        <div className="egs-tier" style={{
          width: '86%', bottom: '10%',
          background: `linear-gradient(180deg, ${BLUEM}, ${BLUE})`,
          boxShadow: extrude(13, NAVY),
        }} />
        {/* green accent rim on the blue band */}
        <div className="egs-rim" style={{ width: '82%', bottom: '18%', borderColor: GREEN }} />
        {/* blue segmented blocks ring */}
        <div className="egs-fx" style={{
          width: '80%', bottom: '19%',
          background: `repeating-conic-gradient(${NAVY} 0deg 7deg, rgba(22,51,95,0) 7deg 15deg)`,
          WebkitMaskImage: 'radial-gradient(closest-side, transparent 74%, #000 76%, #000 96%, transparent 98%)',
          maskImage: 'radial-gradient(closest-side, transparent 74%, #000 76%, #000 96%, transparent 98%)',
          opacity: 0.55,
        }} />

        {/* 3 · white step */}
        <div className="egs-tier" style={{
          width: '68%', bottom: '22%',
          background: `linear-gradient(180deg, #ffffff, ${ICE})`,
          boxShadow: extrude(11, '#c8d6e6'),
        }} />
        {/* green thin rim */}
        <div className="egs-rim" style={{ width: '60%', bottom: '31%', borderColor: GREEN, opacity: 0.9 }} />

        {/* 4 · inner blue rim */}
        <div className="egs-tier" style={{
          width: '52%', bottom: '34%',
          background: `linear-gradient(180deg, ${BLUEM}, ${BLUE})`,
          boxShadow: extrude(8, NAVY),
        }} />
        {/* 5 · innermost white lip */}
        <div className="egs-tier" style={{
          width: '42%', bottom: '41%',
          background: `linear-gradient(180deg, #ffffff, ${ICE})`,
          boxShadow: extrude(4, '#cdd9e8'),
        }} />

        {/* glowing center target */}
        <div className="egs-core" />
      </div>

      {/* floating icon badges */}
      {BADGES.map((b, i) => (
        <div key={i} className="egs-badge" style={{ left: b.left, top: b.top, animationDelay: `${b.d}s` }}>
          <div className="egs-badge-card">{b.icon}</div>
          <div className="egs-badge-stand" />
          <div className="egs-badge-line" />
        </div>
      ))}
    </div>
  )
}
