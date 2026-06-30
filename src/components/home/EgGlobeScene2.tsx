/* ───────────────────────────────────────────────
   EgGlobeScene2 — refined hand-built CSS/SVG 3D scene.
   A rotating dotted earth floats above a deep, glossy,
   multi-layer futuristic podium with a glowing radar core.
   Ringed only by tilted orbit ellipses + 3D satellite
   spheres (no icon badges, no flat middle ring).
   Brand palette only — blues + green, no yellow.
   ─────────────────────────────────────────────── */

const ICE   = '#eef3f8'
const STEEL = '#cfdcec'
const BLUE  = '#274e8c'
const BLUEM = '#3a6fbf'
const CYAN  = '#3bb6ff'
const GREEN = '#3CB98C'
const NAVY  = '#16335f'

type SatKey = 'cyan' | 'green' | 'blue'
const SAT: Record<SatKey, string> = {
  cyan:  'rgba(59,182,255,0.45)',
  green: 'rgba(60,185,140,0.45)',
  blue:  'rgba(58,111,191,0.45)',
}
/* tilted orbit rings only — no flat horizontal middle ring */
type Orbit = { rx: number; ry: number; rot: number; stroke: string; satKey: SatKey; satR: number; dur: number }
const ORBITS: Orbit[] = [
  { rx: 47, ry: 13,  rot:  32, stroke: 'rgba(58,111,191,0.55)', satKey: 'cyan',  satR: 1.7, dur: 14 },
  { rx: 47, ry: 13,  rot: -32, stroke: 'rgba(60,185,140,0.55)', satKey: 'green', satR: 1.6, dur: 12 },
  { rx: 46, ry: 7.5, rot:  -7, stroke: 'rgba(58,111,191,0.32)', satKey: 'blue',  satR: 1.4, dur: 20 },
]
function ellipsePath(rx: number, ry: number): string {
  return `M ${-rx},0 a ${rx},${ry} 0 1,0 ${2 * rx},0 a ${rx},${ry} 0 1,0 ${-2 * rx},0`
}
function OrbitDefs({ idp }: { idp: string }) {
  const grad = (id: string, a: string, b: string, c: string) => (
    <radialGradient id={`${idp}-${id}`} cx="35%" cy="30%" r="75%">
      <stop offset="0%" stopColor={a} /><stop offset="48%" stopColor={b} /><stop offset="100%" stopColor={c} />
    </radialGradient>
  )
  return (
    <defs>
      {grad('cyan',  '#dbf2ff', CYAN,  '#1b5e9e')}
      {grad('green', '#d8f7ec', GREEN, '#1f7a5b')}
      {grad('blue',  '#d2e2f8', BLUEM, '#1d3f78')}
    </defs>
  )
}
function OrbitRings({ idp }: { idp: string }) {
  return (
    <>
      <OrbitDefs idp={idp} />
      {ORBITS.map((o, i) => {
        const d = ellipsePath(o.rx, o.ry); const r = o.satR
        return (
          <g key={i} transform={`rotate(${o.rot})`}>
            <path d={d} fill="none" stroke={o.stroke} strokeWidth={0.5} />
            <g>
              <circle r={r * 1.5} fill={SAT[o.satKey]} opacity={0.26} />
              <circle r={r} fill={`url(#${idp}-${o.satKey})`} stroke="rgba(255,255,255,0.5)" strokeWidth={0.12} />
              <circle r={r * 0.34} cx={-r * 0.32} cy={-r * 0.36} fill="rgba(255,255,255,0.92)" />
              <animateMotion dur={`${o.dur}s`} repeatCount="indefinite" path={d} />
            </g>
          </g>
        )
      })}
    </>
  )
}

/* extruded cylinder side via stacked solid box-shadow */
function extrude(depth: number, color: string, shadow = true): string {
  const parts: string[] = []
  for (let i = 1; i <= depth; i++) parts.push(`0 ${i}px 0 ${color}`)
  if (shadow) parts.push(`0 ${depth + 10}px 26px rgba(22,51,95,0.30)`)
  return parts.join(', ')
}
const whiteTop = `radial-gradient(70% 130% at 32% -16%, #ffffff 0%, rgba(255,255,255,0) 56%), linear-gradient(180deg, #ffffff, ${ICE})`
const blueTop  = `radial-gradient(66% 130% at 30% -18%, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 52%), linear-gradient(180deg, ${BLUEM}, ${BLUE})`

export function EgGlobeScene2() {
  return (
    <div className="egp" role="img" aria-label="Globally connected network — rotating 3D globe over a futuristic platform">
      <style>{`
        .egp { position: relative; width: 100%; max-width: clamp(320px, 42vw, 560px); margin: 0 auto; aspect-ratio: 1 / 1; }
        /* large screens: scale the globe scene up so it isn't small */
        @media (min-width: 1920px) { .egp { max-width: 720px; } }
        @media (min-width: 2560px) { .egp { max-width: 920px; } }

        .egp-grid {
          position: absolute; inset: 4% 0 18%; z-index: 0; pointer-events: none; opacity: 0.5;
          background-image:
            linear-gradient(rgba(39,78,140,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(39,78,140,0.06) 1px, transparent 1px);
          background-size: 7% 7%;
          -webkit-mask-image: radial-gradient(circle at 50% 36%, #000 30%, transparent 72%);
                  mask-image: radial-gradient(circle at 50% 36%, #000 30%, transparent 72%);
        }

        /* tilted orbit rings — back half behind globe, front half in front */
        .egp-orbits { position: absolute; left: 50%; top: 30%; width: 112%; aspect-ratio: 1; transform: translate(-50%, -50%); pointer-events: none; }
        .egp-orbits.back  { z-index: 2; clip-path: inset(0 0 50% 0); }
        .egp-orbits.front { z-index: 4; clip-path: inset(50% 0 0 0); }
        .egp-orbits svg { width: 100%; height: 100%; overflow: visible; }

        .egp-halo {
          position: absolute; left: 50%; top: 30%; width: 88%; aspect-ratio: 1;
          transform: translate(-50%, -50%); z-index: 1; pointer-events: none; border-radius: 50%;
          background: radial-gradient(circle, rgba(59,182,255,0.16) 0%, rgba(60,185,140,0.07) 40%, transparent 64%);
        }

        /* ── globe (slightly larger, gentle bob + rotating texture) ── */
        .egp-globe-pos {
          position: absolute; left: 50%; top: 30%; width: 64%; aspect-ratio: 1;
          transform: translate(-50%, -50%); z-index: 3;
          animation: egp-bob 7s ease-in-out infinite; will-change: transform;
        }
        @keyframes egp-bob { 0%,100% { transform: translate(-50%, -50%); } 50% { transform: translate(-50%, calc(-50% - 2.4%)); } }
        .egp-globe {
          position: relative; width: 100%; height: 100%; border-radius: 50%; overflow: hidden;
          background: radial-gradient(circle at 38% 30%, #ffffff 0%, ${ICE} 62%, ${STEEL} 100%);
          box-shadow:
            0 30px 58px -18px rgba(22,51,95,0.5),
            0 0 46px rgba(59,182,255,0.22),
            0 0 0 1px rgba(120,150,190,0.18);
        }
        .egp-globe-tex {
          position: absolute; top: 0; left: 0; height: 100%; width: 200%;
          background-image: url('/images/eg-dots-world.png');
          background-size: 50% 100%; background-repeat: repeat-x;
          opacity: 0.96; filter: contrast(1.06) saturate(1.05);
          animation: egp-spin 24s linear infinite; will-change: transform;
          -webkit-mask-image: radial-gradient(circle at 50% 50%, #000 70%, rgba(0,0,0,0.35) 90%, transparent 100%);
                  mask-image: radial-gradient(circle at 50% 50%, #000 70%, rgba(0,0,0,0.35) 90%, transparent 100%);
        }
        @keyframes egp-spin { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .egp-globe-shade {
          position: absolute; inset: 0; border-radius: 50%;
          background:
            radial-gradient(circle at 30% 22%, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0) 22%),
            radial-gradient(circle at 35% 27%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 46%),
            radial-gradient(circle at 70% 78%, rgba(34,62,110,0.40) 0%, rgba(34,62,110,0) 52%),
            radial-gradient(circle at 50% 50%, rgba(255,255,255,0) 56%, rgba(213,225,240,0.6) 80%, rgba(192,209,230,0.95) 100%);
          box-shadow: inset -20px -24px 52px rgba(28,55,100,0.32), inset 14px 14px 34px rgba(255,255,255,0.62);
        }
        /* fresnel atmosphere — brighter at the rim */
        .egp-atmo {
          position: absolute; left: 50%; top: 30%; width: 70%; aspect-ratio: 1;
          transform: translate(-50%, -50%); z-index: 3; border-radius: 50%; pointer-events: none;
          background: radial-gradient(circle, transparent 64%, rgba(59,182,255,0.16) 84%, rgba(59,182,255,0.04) 93%, transparent 100%);
        }
        .egp-atmo::before {
          content:''; position:absolute; inset:4%; border-radius:50%;
          box-shadow: 0 0 0 1px rgba(120,200,255,0.45), inset 0 0 14px 1px rgba(180,225,255,0.30);
        }

        .egp-beams {
          position: absolute; left: 50%; top: 56%; width: 28%; height: 15%;
          transform: translateX(-50%); z-index: 2; pointer-events: none;
          background: repeating-linear-gradient(90deg,
            rgba(59,182,255,0.0) 0 6%, rgba(59,182,255,0.5) 6.5% 7%, rgba(59,182,255,0.0) 7.5% 13%);
          -webkit-mask-image: linear-gradient(180deg, transparent, #000 40%, #000 70%, transparent);
                  mask-image: linear-gradient(180deg, transparent, #000 40%, #000 70%, transparent);
          opacity: 0.6;
        }

        /* ── deep glossy podium (slightly smaller) ── */
        .egp-base { position: absolute; left: 50%; bottom: 4%; width: 84%; transform: translateX(-50%); z-index: 5; aspect-ratio: 100 / 50; }
        .egp-tier { position: absolute; left: 50%; transform: translateX(-50%); border-radius: 50%; aspect-ratio: 100 / 27; }
        .egp-rim  { position: absolute; left: 50%; transform: translateX(-50%); border-radius: 50%; aspect-ratio: 100 / 27; border-style: solid; border-width: 1.5px; }
        .egp-fx   { position: absolute; left: 50%; transform: translateX(-50%); border-radius: 50%; aspect-ratio: 100 / 27; }
        .egp-shadow {
          position: absolute; left: 50%; bottom: -3%; transform: translateX(-50%);
          width: 106%; aspect-ratio: 100 / 22; border-radius: 50%;
          background: radial-gradient(closest-side, rgba(22,51,95,0.34), rgba(22,51,95,0) 72%); filter: blur(6px);
        }

        .egp-core {
          position: absolute; left: 50%; bottom: 46%; transform: translateX(-50%);
          width: 40%; aspect-ratio: 100 / 28; border-radius: 50%;
          background:
            radial-gradient(closest-side, rgba(255,255,255,0.96), rgba(120,210,255,0.9) 18%, rgba(59,182,255,0.0) 70%),
            repeating-radial-gradient(closest-side, ${CYAN} 0 5%, rgba(59,182,255,0.08) 5% 11%);
          box-shadow: 0 0 28px 8px rgba(59,182,255,0.55), 0 0 66px 22px rgba(59,182,255,0.22);
          filter: saturate(1.14);
        }
        .egp-core::after { content: ''; position: absolute; inset: 32% 40%; border-radius: 50%; background: #ffffff; box-shadow: 0 0 18px 7px rgba(255,255,255,0.92); }
        .egp-ripple {
          position: absolute; left: 50%; bottom: 45%; transform: translateX(-50%) scale(0.4);
          width: 44%; aspect-ratio: 100 / 28; border-radius: 50%;
          border: 1.5px solid rgba(59,182,255,0.55); animation: egp-ripple 4.2s ease-out infinite; pointer-events: none;
        }
        .egp-ripple.b { animation-delay: 1.4s; } .egp-ripple.c { animation-delay: 2.8s; }
        @keyframes egp-ripple { 0% { transform: translateX(-50%) scale(0.32); opacity: 0.85; } 100% { transform: translateX(-50%) scale(1.3); opacity: 0; } }

        @media (prefers-reduced-motion: reduce) { .egp-globe-tex, .egp-globe-pos, .egp-orbits, .egp-ripple { animation: none; } }
      `}</style>

      <div className="egp-grid" aria-hidden />
      <div className="egp-halo" aria-hidden />

      <div className="egp-orbits back" aria-hidden><svg viewBox="-50 -50 100 100"><OrbitRings idp="b" /></svg></div>

      <div className="egp-globe-pos">
        <div className="egp-globe">
          <div className="egp-globe-tex" aria-hidden />
          <div className="egp-globe-shade" aria-hidden />
        </div>
      </div>
      <div className="egp-atmo" aria-hidden />

      <div className="egp-orbits front" aria-hidden><svg viewBox="-50 -50 100 100"><OrbitRings idp="f" /></svg></div>

      <div className="egp-beams" aria-hidden />

      <div className="egp-base" aria-hidden>
        <div className="egp-shadow" />

        <div className="egp-tier" style={{ width: '100%', bottom: '0%', background: whiteTop, boxShadow: extrude(17, '#b4c4d8') }} />
        <div className="egp-fx" style={{ width: '94%', bottom: '6%',
          background: `repeating-conic-gradient(${CYAN} 0deg 2.4deg, rgba(59,182,255,0) 2.4deg 7.5deg)`,
          WebkitMaskImage: 'radial-gradient(closest-side, transparent 84%, #000 86%, #000 95%, transparent 97%)',
          maskImage: 'radial-gradient(closest-side, transparent 84%, #000 86%, #000 95%, transparent 97%)', opacity: 0.85 }} />

        <div className="egp-tier" style={{ width: '90%', bottom: '8%', background: blueTop, boxShadow: extrude(15, NAVY) }} />
        <div className="egp-rim" style={{ width: '90%', bottom: '8%', borderColor: 'rgba(59,182,255,0.85)', boxShadow: '0 0 14px rgba(59,182,255,0.6)' }} />

        <div className="egp-tier" style={{ width: '80%', bottom: '15%', background: whiteTop, boxShadow: extrude(13, '#c5d3e4') }} />
        <div className="egp-rim" style={{ width: '80%', bottom: '15%', borderColor: GREEN, opacity: 0.9 }} />
        <div className="egp-fx" style={{ width: '78%', bottom: '16.5%',
          background: `repeating-conic-gradient(${NAVY} 0deg 5.5deg, rgba(22,51,95,0) 5.5deg 13deg)`,
          WebkitMaskImage: 'radial-gradient(closest-side, transparent 80%, #000 82%, #000 96%, transparent 98%)',
          maskImage: 'radial-gradient(closest-side, transparent 80%, #000 82%, #000 96%, transparent 98%)', opacity: 0.5 }} />

        <div className="egp-tier" style={{ width: '68%', bottom: '23%', background: blueTop, boxShadow: extrude(11, NAVY) }} />
        <div className="egp-rim" style={{ width: '68%', bottom: '23%', borderColor: 'rgba(59,182,255,0.75)', boxShadow: '0 0 12px rgba(59,182,255,0.5)' }} />

        <div className="egp-tier" style={{ width: '57%', bottom: '31%', background: whiteTop, boxShadow: extrude(8, '#cdd9e8') }} />
        <div className="egp-rim" style={{ width: '57%', bottom: '31%', borderColor: GREEN, opacity: 0.85 }} />

        <div className="egp-tier" style={{ width: '47%', bottom: '38%', background: blueTop, boxShadow: extrude(5, NAVY) }} />
        <div className="egp-rim" style={{ width: '47%', bottom: '38%', borderColor: 'rgba(59,182,255,0.6)', boxShadow: '0 0 10px rgba(59,182,255,0.45)' }} />

        <div className="egp-tier" style={{ width: '40%', bottom: '44%', background: whiteTop, boxShadow: extrude(3, '#d2dded') }} />

        <div className="egp-ripple" />
        <div className="egp-ripple b" />
        <div className="egp-ripple c" />
        <div className="egp-core" />
      </div>
    </div>
  )
}
