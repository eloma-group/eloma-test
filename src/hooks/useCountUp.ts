import { useState, useEffect } from 'react'

export function useCountUp(
  target: number,
  duration = 1800,
  decimals = 0
): string {
  const [display, setDisplay] = useState('0')

  useEffect(() => {
    // Start from a random low point (20–45% of target) for organic feel
    const startValue = target * (0.2 + Math.random() * 0.25)
    const startTime = performance.now()

    const tick = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Cubic ease-out - fast start, smooth landing
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = startValue + (target - startValue) * eased

      if (progress < 1) {
        setDisplay(
          decimals > 0
            ? current.toFixed(decimals)
            : String(Math.round(current))
        )
        requestAnimationFrame(tick)
      } else {
        setDisplay(
          decimals > 0
            ? target.toFixed(decimals)
            : String(Math.round(target))
        )
      }
    }

    requestAnimationFrame(tick)
  }, [target, duration, decimals])

  return display
}
