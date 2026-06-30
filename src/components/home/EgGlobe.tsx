/* ───────────────────────────────────────────────
   EgGlobe — premium WebGL globe (cobe v2).  [SAVED / not currently used]
   A real 3D earth, drag-to-rotate + auto-spin, with
   brand-green city markers and connection arcs from
   the Australian HQ to every operating market.
   cobe v2 has no internal loop: createGlobe() returns
   { update, destroy } and we drive `phi` via rAF.

   This design is kept for reference. The live "Connected
   Globally" section currently uses the stacked variants
   in EgConnected.tsx instead.
   ─────────────────────────────────────────────── */
import { useEffect, useRef, useState } from 'react'
import createGlobe from 'cobe'
import type { Marker } from 'cobe'

const MARKER: [number, number, number] = [0.2, 0.6, 0.66]   // blue-green mix
const STEEL: [number, number, number] = [0.9, 0.94, 1.0]    // white / light-blue land dots
const GLOW: [number, number, number]  = [0.88, 0.94, 1.0]

/* Australian HQ + the operating markets (matches "8 global markets") */
const SYDNEY: [number, number] = [-33.87, 151.21]
const CITIES: [number, number][] = [
  [19.07, 72.87],    // Mumbai, India
  [43.65, -79.38],   // Toronto, Canada
  [31.23, 121.47],   // Shanghai, China
  [51.51, -0.13],    // London, UK
  [25.20, 55.27],    // Dubai, UAE
  [1.35, 103.82],    // Singapore
  [40.71, -74.01],   // New York, USA
]

const MARKERS: Marker[] = [
  { location: SYDNEY, size: 0.085 },
  ...CITIES.map((location): Marker => ({ location, size: 0.045 })),
]

export function EgGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointerInteracting = useRef<number | null>(null)
  const pointerMovement = useRef(0)
  const [dragging, setDragging] = useState(false)
  const [hint, setHint] = useState(true)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let size = Math.max(canvas.offsetWidth, 200)
    let phi = 4.4 // bias the opening frame toward the Asia-Pacific hemisphere
    let smooth = 0
    let raf = 0

    const globe = createGlobe(canvas, {
      devicePixelRatio: dpr,
      width: size,
      height: size,
      phi,
      theta: 0.26,
      dark: 0,
      diffuse: 1.1,
      mapSamples: 19000,
      mapBrightness: 5.6,
      mapBaseBrightness: 0.09,
      baseColor: STEEL,
      markerColor: MARKER,
      glowColor: GLOW,
      markerElevation: 0,
      opacity: 0.96,
      markers: MARKERS,
    })

    const render = () => {
      if (pointerInteracting.current === null && !reduce) phi += 0.0032
      smooth += (pointerMovement.current - smooth) * 0.12
      globe.update({ phi: phi + smooth })
      raf = requestAnimationFrame(render)
    }
    raf = requestAnimationFrame(render)

    const onResize = () => {
      size = Math.max(canvas.offsetWidth, 200)
      globe.update({ width: size, height: size })
    }
    window.addEventListener('resize', onResize)
    requestAnimationFrame(() => { canvas.style.opacity = '1' })

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      globe.destroy()
    }
  }, [])

  const onDown = (clientX: number) => {
    pointerInteracting.current = clientX - pointerMovement.current
    setDragging(true)
    setHint(false)
  }
  const onMove = (clientX: number) => {
    if (pointerInteracting.current === null) return
    pointerMovement.current = (clientX - pointerInteracting.current) / 130
  }
  const onUp = () => {
    pointerInteracting.current = null
    setDragging(false)
  }

  return (
    <div className="egg-stage">
      <style>{`
        .egg-stage { position: relative; width: 100%; max-width: clamp(320px, 44vw, 580px); margin: 0 auto; aspect-ratio: 1 / 1; }
        @media (min-width: 1920px) { .egg-stage { max-width: 700px; } }
        @media (min-width: 2560px) { .egg-stage { max-width: 880px; } }
        .egg-glow {
          position: absolute; left: 50%; top: 47%; width: 96%; aspect-ratio: 1;
          transform: translate(-50%, -50%); z-index: 0; pointer-events: none; border-radius: 50%;
          background: radial-gradient(circle, rgba(60,185,140,0.16) 0%, rgba(59,130,200,0.10) 38%, transparent 66%);
          filter: blur(2px);
        }
        .egg-ring {
          position: absolute; left: 50%; top: 47%; width: 92%; aspect-ratio: 1;
          transform: translate(-50%, -50%); z-index: 1; pointer-events: none; border-radius: 50%;
          border: 1px solid rgba(26,43,60,0.10); box-shadow: inset 0 0 60px rgba(26,43,60,0.04);
        }
        .egg-ring::after { content: ''; position: absolute; inset: 7%; border-radius: 50%; border: 1px dashed rgba(60,185,140,0.22); }
        .egg-canvas {
          position: relative; z-index: 2; width: 100%; height: 100%; aspect-ratio: 1 / 1;
          opacity: 0; transition: opacity 1s ease; cursor: grab; touch-action: pan-y; contain: layout paint size;
        }
        .egg-canvas.is-drag { cursor: grabbing; }
        .egg-shadow {
          position: absolute; left: 50%; bottom: 2%; width: 62%; aspect-ratio: 100 / 16;
          transform: translateX(-50%); z-index: 1; pointer-events: none; border-radius: 50%;
          background: radial-gradient(closest-side, rgba(26,43,60,0.22), transparent 72%); filter: blur(5px);
        }
        .egg-chip {
          position: absolute; z-index: 3; display: inline-flex; align-items: center; gap: 8px;
          padding: 7px 13px; border-radius: 999px; pointer-events: none;
          background: rgba(255,255,255,0.72); border: 1px solid rgba(26,43,60,0.08);
          box-shadow: 0 10px 26px -14px rgba(19,41,61,0.5); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
          font-family: 'Inter', sans-serif; font-weight: 700; letter-spacing: 0.5px;
          font-size: clamp(10px, 0.8vw, 12px); color: #13293D; white-space: nowrap;
        }
        .egg-chip.live { top: 6%; left: 4%; }
        .egg-chip.markets { bottom: 9%; right: 2%; }
        .egg-chip .dot { width: 7px; height: 7px; border-radius: 50%; background: #3CB98C; box-shadow: 0 0 0 0 rgba(60,185,140,0.5); animation: egg-pulse 2.4s ease-in-out infinite; }
        @keyframes egg-pulse { 0%,100% { box-shadow: 0 0 0 0 rgba(60,185,140,0.5); } 50% { box-shadow: 0 0 0 6px rgba(60,185,140,0); } }
        .egg-chip .mono { font-family: 'Poppins', sans-serif; font-weight: 700; color: #3CB98C; }
        .egg-hint {
          position: absolute; left: 50%; bottom: -2%; transform: translateX(-50%); z-index: 3;
          font-family: 'Inter', sans-serif; font-size: clamp(10px, 0.82vw, 12px); letter-spacing: 1.5px;
          text-transform: uppercase; color: rgba(26,43,60,0.42); pointer-events: none; transition: opacity 0.5s ease;
        }
        @media (prefers-reduced-motion: reduce) { .egg-chip .dot { animation: none; } }
      `}</style>

      <div className="egg-glow" aria-hidden />
      <div className="egg-ring" aria-hidden />
      <div className="egg-shadow" aria-hidden />

      <span className="egg-chip live" aria-hidden><i className="dot" />LIVE NETWORK</span>
      <span className="egg-chip markets" aria-hidden><span className="mono">8</span>&nbsp;GLOBAL MARKETS</span>

      <canvas
        ref={canvasRef}
        className={`egg-canvas${dragging ? ' is-drag' : ''}`}
        role="img"
        aria-label="Interactive 3D globe showing Eloma Group's operations connected from Australia across eight global markets"
        onPointerDown={(e) => { e.currentTarget.setPointerCapture(e.pointerId); onDown(e.clientX) }}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        onPointerMove={(e) => onMove(e.clientX)}
      />

      <span className="egg-hint" aria-hidden style={{ opacity: hint ? 1 : 0 }}>Drag to rotate</span>
    </div>
  )
}
