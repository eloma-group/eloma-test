/* ───────────────────────────────────────────────
   EgWorldMap — Stripe-style dotted world map with subtle
   connection arcs from the Australian HQ + glowing markers.
   Built on `dotted-map`; markers are placed with the map's
   own getPin() so they sit exactly on the dots, and the
   overlay shares the generated map's viewBox for 1:1 alignment.
   ─────────────────────────────────────────────── */
import { useMemo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import DottedMap from 'dotted-map'

export type Place = { lat: number; lng: number; label?: string; hub?: boolean }
export type Arc = { from: Place; to: Place }

type Pin = Place & { x: number; y: number }

export function EgWorldMap({
  markers,
  arcs,
  dotColor = 'rgba(19,41,61,0.34)',
  line = '#3CB98C',
}: {
  markers: Place[]
  arcs: Arc[]
  dotColor?: string
  line?: string
}) {
  const reduce = useReducedMotion()

  const { uri, W, H, pins, paths } = useMemo(() => {
    const map = new DottedMap({ height: 100, grid: 'diagonal', projection: { name: 'equirectangular' } })
    const svg = map.getSVG({ radius: 0.26, color: dotColor, shape: 'circle', backgroundColor: 'transparent' })
    const vb = (svg.match(/viewBox="([^"]+)"/) || [])[1] || '0 0 265 100'
    const [, , w, h] = vb.split(' ').map(Number)

    const at = (p: Place): Pin | null => {
      const pin = map.getPin({ lat: p.lat, lng: p.lng })
      return pin ? { ...p, x: pin.x, y: pin.y } : null
    }
    const pins = markers.map(at).filter((p): p is Pin => p !== null)
    const paths = arcs
      .map((a) => {
        const f = at(a.from); const t = at(a.to)
        if (!f || !t) return null
        const dist = Math.hypot(t.x - f.x, t.y - f.y)
        const lift = Math.min(Math.max(dist * 0.2, 5), 26)
        const mx = (f.x + t.x) / 2
        const my = Math.min(f.y, t.y) - lift
        return `M ${f.x} ${f.y} Q ${mx} ${my} ${t.x} ${t.y}`
      })
      .filter((d): d is string => d !== null)

    const uri = `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
    return { uri, W: w, H: h, pins, paths }
  }, [markers, arcs, dotColor])

  return (
    <div className="egw" style={{ aspectRatio: `${W} / ${H}` }}>
      <style>{`
        .egw { position:relative; width:100%; }
        .egw-img {
          position:absolute; inset:0; width:100%; height:100%; object-fit:fill; pointer-events:none; user-select:none;
          -webkit-mask-image:linear-gradient(to bottom, transparent, #000 10%, #000 90%, transparent);
                  mask-image:linear-gradient(to bottom, transparent, #000 10%, #000 90%, transparent);
        }
        .egw-svg { position:absolute; inset:0; width:100%; height:100%; }
        .egw-lbl {
          position:absolute; transform:translate(-50%,-150%); white-space:nowrap; pointer-events:none;
          font-family:'Inter',sans-serif; font-weight:700; letter-spacing:0.3px; font-size:clamp(9px,0.8vw,12px);
          color:#13293D; background:rgba(255,255,255,0.94); border:1px solid rgba(19,41,61,0.1);
          border-radius:6px; padding:4px 8px; box-shadow:0 6px 14px -8px rgba(19,41,61,0.5);
        }
        @media (prefers-reduced-motion: reduce){ .egw-trav{ display:none; } }
      `}</style>

      <img className="egw-img" src={uri} alt="World map of Eloma Group's global operations" decoding="async" />

      <svg className="egw-svg" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" aria-hidden>
        <defs>
          <linearGradient id="egw-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={line} stopOpacity="0" />
            <stop offset="14%" stopColor={line} stopOpacity="0.95" />
            <stop offset="86%" stopColor={line} stopOpacity="0.95" />
            <stop offset="100%" stopColor={line} stopOpacity="0" />
          </linearGradient>
        </defs>

        {paths.map((d, i) => (
          <g key={`arc-${i}`}>
            <motion.path
              d={d} fill="none" stroke="url(#egw-grad)" strokeWidth={0.55} strokeLinecap="round"
              initial={reduce ? false : { pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, delay: 0.15 * i, ease: [0.16, 1, 0.3, 1] }}
            />
            {!reduce && (
              <circle className="egw-trav" r={0.7} fill={line}>
                <animateMotion dur="3.6s" begin={`${i * 0.5}s`} repeatCount="indefinite" path={d} calcMode="spline" keyPoints="0;1" keyTimes="0;1" keySplines="0.4 0 0.2 1" />
                <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.12;0.85;1" dur="3.6s" begin={`${i * 0.5}s`} repeatCount="indefinite" />
              </circle>
            )}
          </g>
        ))}

        {pins.map((p, i) => {
          const r = p.hub ? 1.25 : 0.8
          return (
            <g key={`mk-${i}`}>
              {!reduce && (
                <circle cx={p.x} cy={p.y} r={r} fill={line} opacity={0.5}>
                  <animate attributeName="r" from={r} to={r * 3.4} dur="2.6s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
                  <animate attributeName="opacity" from="0.5" to="0" dur="2.6s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
                </circle>
              )}
              <circle cx={p.x} cy={p.y} r={r} fill={line} />
              {p.hub && <circle cx={p.x} cy={p.y} r={r + 0.9} fill="none" stroke={line} strokeWidth={0.35} opacity={0.7} />}
            </g>
          )
        })}
      </svg>

      {pins.filter((p) => p.label).map((p, i) => (
        <span key={`lb-${i}`} className="egw-lbl" style={{ left: `${(p.x / W) * 100}%`, top: `${(p.y / H) * 100}%` }}>{p.label}</span>
      ))}
    </div>
  )
}
