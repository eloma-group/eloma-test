import type { NavColumn } from '../../data/navItems'

const NAVY  = '#08213C'
const GREEN = '#3CB98C'

interface DropdownMenuProps {
  columns: NavColumn[]
  isOpen: boolean
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}

export function DropdownMenu({ columns, isOpen, onMouseEnter, onMouseLeave }: DropdownMenuProps) {
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        position: 'fixed',
        top: '64px',
        left: 0,
        right: 0,
        background: '#ffffff',
        borderBottom: '1px solid #D0DDE8',
        boxShadow: '0 16px 48px rgba(8,33,60,0.08)',
        opacity: isOpen ? 1 : 0,
        pointerEvents: isOpen ? 'auto' : 'none',
        transform: isOpen ? 'translateY(0px)' : 'translateY(-10px)',
        transition: isOpen
          ? 'opacity 0.42s cubic-bezier(0.16, 1, 0.3, 1), transform 0.42s cubic-bezier(0.16, 1, 0.3, 1)'
          : 'opacity 0.28s cubic-bezier(0.4, 0, 1, 1), transform 0.28s cubic-bezier(0.4, 0, 1, 1)',
        zIndex: 48,
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '52px 24px 60px',
          display: 'flex',
          gap: '80px',
        }}
      >
        {columns.map((col, colIdx) => (
          <div
            key={col.heading}
            style={{
              minWidth: '160px',
              opacity: isOpen ? 1 : 0,
              transform: isOpen ? 'translateY(0)' : 'translateY(6px)',
              transition: isOpen
                ? `opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1) ${0.06 + colIdx * 0.05}s, transform 0.45s cubic-bezier(0.16, 1, 0.3, 1) ${0.06 + colIdx * 0.05}s`
                : 'opacity 0.18s ease, transform 0.18s ease',
            }}
          >
            {/* Column heading */}
            <p
              style={{
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: GREEN,
                marginBottom: '22px',
              }}
            >
              {col.heading}
            </p>

            {/* Links */}
            <ul style={{ listStyle: 'none' }}>
              {col.items.map((item, itemIdx) => (
                <li
                  key={item.label}
                  style={{
                    marginBottom: '16px',
                    opacity: isOpen ? 1 : 0,
                    transform: isOpen ? 'translateY(0)' : 'translateY(4px)',
                    transition: isOpen
                      ? `opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1) ${0.10 + colIdx * 0.05 + itemIdx * 0.03}s, transform 0.45s cubic-bezier(0.16, 1, 0.3, 1) ${0.10 + colIdx * 0.05 + itemIdx * 0.03}s`
                      : 'opacity 0.15s ease, transform 0.15s ease',
                  }}
                >
                  <a
                    href={item.href}
                    onClick={item.serviceId ? (e) => {
                      e.preventDefault()
                      if (window.location.pathname !== '/') {
                        sessionStorage.setItem('pendingService', item.serviceId!)
                        window.location.href = '/'
                      } else {
                        window.dispatchEvent(new CustomEvent('bivry:service', { detail: { serviceId: item.serviceId } }))
                      }
                    } : undefined}
                    style={{
                      fontSize: '15px',
                      fontWeight: 400,
                      color: NAVY,
                      transition: 'color 0.18s ease',
                      display: 'inline-block',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => {
                      ;(e.currentTarget as HTMLElement).style.color = GREEN
                    }}
                    onMouseLeave={(e) => {
                      ;(e.currentTarget as HTMLElement).style.color = NAVY
                    }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
