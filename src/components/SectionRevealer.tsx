import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

/* ─────────────────────────────────────────────────────────────
   Global section reveal engine
   Auto-assigns a rotating MIX of entrance animations (fade / slide /
   zoom) to every top-level <section> on the current page, so no page
   uses one uniform animation. Sections are hidden the instant they
   mount (via MutationObserver, before paint — no flash) and revealed
   with an IntersectionObserver as they scroll into view (independent
   of Lenis / GSAP). Once revealed, all inline styles are stripped so
   nothing lingers (keeps position:sticky and pinned ScrollTriggers safe).

   Opt a section out with  data-reveal="off"  — used for the few
   sections that own bespoke pinned / scrubbed animations.
   ───────────────────────────────────────────────────────────── */

const VARIANTS: Record<string, string> = {
  fade:    'none',
  up:      'translate3d(0, 46px, 0)',
  down:    'translate3d(0, -42px, 0)',
  left:    'translate3d(-54px, 0, 0)',
  right:   'translate3d(54px, 0, 0)',
  zoom:    'scale(0.9)',
  zoomout: 'scale(1.06)',
}
/* rotated per page so adjacent sections never share an animation */
const ORDER = ['left', 'zoom', 'up', 'right', 'fade', 'zoomout', 'left', 'down', 'right', 'up']

export function SectionRevealer() {
  const { pathname } = useLocation()

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const root = document.getElementById('root')
    if (!root) return

    let idx = 0
    const timers: number[] = []

    const isTopLevel = (s: HTMLElement) => {
      let p = s.parentElement
      while (p && p !== root) {
        if (p.tagName === 'SECTION') return false
        p = p.parentElement
      }
      return true
    }

    const reveal = (el: HTMLElement) => {
      el.style.opacity = '1'
      el.style.transform = 'none'
      const t = window.setTimeout(() => {
        el.style.transition = ''
        el.style.willChange = ''
        el.style.transform = ''
        el.style.opacity = ''
      }, 1150)
      timers.push(t)
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return
          reveal(e.target as HTMLElement)
          io.unobserve(e.target)
        })
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.06 },
    )

    const process = (el: HTMLElement) => {
      const forced = el.dataset.reveal
      if (forced === 'off' || el.dataset.rvDone === '1') return
      if (!isTopLevel(el)) return
      el.dataset.rvDone = '1'
      /* data-reveal="up|down|left|right|zoom|zoomout|fade" overrides the auto mix */
      let variant: string
      if (forced && VARIANTS[forced]) {
        variant = forced
      } else {
        variant = idx === 0 ? 'fade' : ORDER[(idx - 1) % ORDER.length]
        idx++
      }
      el.style.opacity = '0'
      el.style.transform = VARIANTS[variant]
      el.style.willChange = 'opacity, transform'
      el.style.transition = 'opacity .85s cubic-bezier(0.16,1,0.3,1), transform .95s cubic-bezier(0.16,1,0.3,1)'
      io.observe(el)
    }

    /* sections already in the DOM for this route */
    root.querySelectorAll<HTMLElement>('section').forEach(process)

    /* sections that mount later (lazy-loaded pages) — caught before paint */
    const mo = new MutationObserver((muts) => {
      muts.forEach((m) => {
        m.addedNodes.forEach((node) => {
          if (node.nodeType !== 1) return
          const el = node as HTMLElement
          if (el.tagName === 'SECTION') process(el)
          el.querySelectorAll?.<HTMLElement>('section').forEach(process)
        })
      })
    })
    mo.observe(root, { childList: true, subtree: true })

    return () => {
      io.disconnect()
      mo.disconnect()
      timers.forEach((t) => clearTimeout(t))
      /* safety: never leave a section stuck hidden */
      root.querySelectorAll<HTMLElement>('section[data-rv-done="1"]').forEach((el) => {
        el.style.opacity = ''
        el.style.transform = ''
        el.style.transition = ''
        el.style.willChange = ''
        el.removeAttribute('data-rv-done')
      })
    }
  }, [pathname])

  return null
}
