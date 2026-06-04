import { useNavigate } from 'react-router-dom'
import { Phone, Mail, MapPin } from 'lucide-react'
import { navItems } from '../data/navItems'

const BLUE  = '#08213C'
const GREEN = '#3CB98C'

/* ── Inline brand SVGs (lucide removed brand icons) ── */
function IconLinkedIn() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
    </svg>
  )
}
function IconTwitterX() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  )
}
function IconFacebook() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  )
}
function IconInstagram() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  )
}
function IconYouTube() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.4a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill={BLUE}/>
    </svg>
  )
}
function IconThreads() {
  return (
    <svg width="15" height="15" viewBox="0 0 192 192" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C97.4484 44.7443 97.3355 44.7443 97.222 44.7443C82.2364 44.7443 69.7731 51.1409 62.102 62.7807L75.881 72.2328C81.6116 63.5383 90.6052 61.6848 97.2286 61.6848C97.3051 61.6848 97.3819 61.6848 97.4576 61.6855C105.707 61.7381 111.932 64.1366 115.961 68.814C118.893 72.2193 120.854 76.925 121.825 82.8638C114.511 81.6207 106.601 81.2385 98.145 81.7233C74.3247 83.0954 59.0111 96.9879 60.0396 116.292C60.5615 126.084 65.4397 134.508 73.775 140.011C80.8224 144.663 89.899 146.938 99.3323 146.423C111.79 145.74 121.563 140.987 128.381 132.296C133.559 125.696 136.834 117.143 138.28 106.366C144.217 109.949 148.617 114.664 151.047 120.332C155.179 129.967 155.42 145.8 142.501 158.708C131.182 170.016 117.576 174.908 97.0135 175.059C74.2042 174.89 56.9538 167.575 45.7381 153.317C35.2355 139.966 29.8077 120.682 29.6052 96C29.8077 71.3178 35.2355 52.0336 45.7381 38.6827C56.9538 24.4249 74.2039 17.11 97.0132 16.9405C119.988 17.1113 137.539 24.4614 149.184 38.788C154.894 45.8136 159.199 54.6488 162.037 64.9503L178.184 60.6422C174.744 47.9622 169.331 37.0357 161.965 27.974C147.036 9.60668 125.202 0.195148 97.0695 0H96.9569C68.8816 0.19447 47.2921 9.6418 32.7883 28.0793C19.8819 44.4864 13.2244 67.3157 13.0007 95.9325L13 96L13.0007 96.0675C13.2244 124.684 19.8819 147.514 32.7883 163.921C47.2921 182.358 68.8816 191.806 96.9569 192H97.0695C122.03 191.827 139.624 185.292 154.118 170.811C173.081 151.866 172.51 128.119 166.26 113.541C161.776 103.087 153.227 94.5962 141.537 88.9883ZM98.4405 129.507C88.0005 130.095 77.1544 125.409 76.6196 115.372C76.2232 107.93 81.9158 99.626 99.0812 98.6368C101.047 98.5234 102.976 98.468 104.871 98.468C111.106 98.468 116.939 99.0737 122.242 100.233C120.264 124.935 108.723 128.946 98.4405 129.507Z"/>
    </svg>
  )
}

const socials = [
  { Icon: IconLinkedIn,  href: 'https://www.linkedin.com/company/egtrans/',    label: 'LinkedIn',  bg: '#0A66C2', color: '#fff' },
  { Icon: IconTwitterX,  href: 'https://x.com/Bivryaustralia',                 label: 'Twitter/X', bg: '#000000', color: '#fff' },
  { Icon: IconFacebook,  href: 'https://www.facebook.com/bivry/',              label: 'Facebook',  bg: '#1877F2', color: '#fff' },
  { Icon: IconInstagram, href: 'https://www.instagram.com/bivry_australia/',   label: 'Instagram', bg: 'linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)', color: '#fff' },
  { Icon: IconYouTube,   href: 'https://www.youtube.com/@Bivry-2026',          label: 'YouTube',   bg: '#FF0000', color: '#fff' },
  { Icon: IconThreads,   href: 'https://www.threads.com/@bivry_australia',     label: 'Threads',   bg: '#000000', color: '#fff' },
]

function SectionHeading({ label }: { label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 20 }}>
      <div style={{ width: 3, height: 14, background: GREEN, borderRadius: 2, flexShrink: 0 }} />
      <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1.8px', textTransform: 'uppercase', color: '#fff' }}>
        {label}
      </span>
    </div>
  )
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', transition: 'all 0.18s ease', display: 'block', textDecoration: 'none' }}
      onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.color = '#fff'; el.style.paddingLeft = '5px' }}
      onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.color = 'rgba(255,255,255,0.5)'; el.style.paddingLeft = '0' }}
    >
      {children}
    </a>
  )
}

export function Footer() {
  const navigate = useNavigate()

  const openService = (serviceId: string) => {
    if (window.location.pathname !== '/') {
      sessionStorage.setItem('pendingService', serviceId)
      navigate('/')
    } else {
      window.dispatchEvent(new CustomEvent('bivry:service', { detail: { serviceId } }))
    }
  }

  /* Flatten all items from each nav section */
  const allServices   = navItems.find(n => n.label === 'Services')?.columns?.flatMap(c => c.items) ?? []
  const allIndustries = navItems.find(n => n.label === 'Industries')?.columns?.flatMap(c => c.items) ?? []
  const whyUsItems    = navItems.find(n => n.label === 'Why Us')?.columns?.flatMap(c => c.items) ?? []

  return (
    <footer id="contact" style={{ background: BLUE, position: 'relative', overflow: 'hidden' }}>

      {/* Subtle inner glow top-center */}
      <div style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: '60%', height: '320px',
        background: `radial-gradient(ellipse at top, ${GREEN}0C 0%, transparent 65%)`,
        pointerEvents: 'none', zIndex: 0,
      }} />

      {/* Green top accent line */}
      <div style={{ height: 2, background: `linear-gradient(90deg, transparent, ${GREEN}, transparent)` }} />

      {/* ── Main grid ── */}
      <div style={{ padding: 'clamp(56px,7vw,96px) clamp(24px,5vw,80px) 0', position: 'relative', zIndex: 1 }}>
        <div
          className="footer-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1.8fr 1.1fr 1fr 1fr 1fr',
            gap: 'clamp(28px,3.5vw,52px)',
            paddingBottom: 'clamp(52px,6vw,88px)',
            alignItems: 'start',
          }}
        >

          {/* ── Brand column ── */}
          <div>
            <a href="#" style={{ display: 'inline-block', lineHeight: 0, marginBottom: 20 }}>
              <img src="/images/BIVRY Logo-white.png" alt="BIVRY" style={{ height: 42, width: 'auto' }} />
            </a>

            <p style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.42)', lineHeight: 1.9, maxWidth: 270, marginBottom: 28 }}>
              Premium road freight, warehousing and distribution across Australia.
              Reliable. Trackable. Trusted.
            </p>

            {/* Contact details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
              <a href="tel:1800054555" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontSize: 13.5, color: 'rgba(255,255,255,0.55)', transition: 'color 0.16s ease', textDecoration: 'none' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = GREEN }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.55)' }}
              >
                <Phone size={14} strokeWidth={1.5} style={{ flexShrink: 0, color: GREEN }} />
                1800 054 555
              </a>
              <a href="mailto:connect@bivry.com.au" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontSize: 13.5, color: 'rgba(255,255,255,0.55)', transition: 'color 0.16s ease', textDecoration: 'none' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = GREEN }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.55)' }}
              >
                <Mail size={14} strokeWidth={1.5} style={{ flexShrink: 0, color: GREEN }} />
                connect@bivry.com.au
              </a>

              {/* Highlighted location */}
              <a
                href="https://www.google.com/maps/search/?api=1&query=71+Gipps+Street+Collingwood+Melbourne+VIC+3066"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-info-box footer-location-link"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 10,
                  background: 'rgba(60,185,140,0.12)',
                  border: '1px solid rgba(60,185,140,0.25)',
                  borderRadius: 8, padding: '8px 12px',
                  textDecoration: 'none',
                  transition: 'background 0.2s ease, border-color 0.2s ease',
                }}
              >
                <MapPin size={14} strokeWidth={1.5} style={{ flexShrink: 0, color: GREEN }} />
                <span style={{ fontSize: 13, color: '#fff', fontWeight: 500, transition: 'color 0.2s ease' }}>
                  71 Gipps Street, Collingwood,<br />Melbourne, VIC 3066, Australia
                </span>
              </a>

              {/* Highlighted ABN */}
              <div className="footer-info-box" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 8, padding: '11px 14px',
              }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: GREEN, letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                  ABN
                </span>
                <div style={{ width: 1, height: 12, background: 'rgba(255,255,255,0.2)' }} />
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', fontWeight: 500, letterSpacing: '0.5px' }}>
                  12 693 138 733
                </span>
              </div>

              {/* Company name */}
              <div className="footer-info-box" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.10)',
                borderRadius: 8, padding: '11px 14px',
              }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: GREEN, letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                  Co.
                </span>
                <div style={{ width: 1, height: 12, background: 'rgba(255,255,255,0.2)' }} />
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', fontWeight: 500 }}>
                  EG Transport Pty Ltd (Unit of Eloma Group)
                </span>
              </div>

            
            </div>

            {/* Colorful social icons */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {socials.map(({ Icon, href, label, bg, color }) => (
                <a key={label} href={href} aria-label={label} target="_blank" rel="noopener noreferrer" style={{
                  width: 38, height: 38, borderRadius: 9,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: bg, color,
                  textDecoration: 'none',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
                }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(-3px) scale(1.08)'; el.style.boxShadow = '0 8px 20px rgba(0,0,0,0.35)' }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(0) scale(1)'; el.style.boxShadow = '0 2px 8px rgba(0,0,0,0.25)' }}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* ── Services ── */}
          <div>
            <SectionHeading label="Services" />
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 13 }}>
              {allServices.map(item => (
                <li key={item.label}>
                  {item.serviceId ? (
                    <a
                      href={item.href}
                      onClick={e => { e.preventDefault(); openService(item.serviceId!) }}
                      style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', transition: 'all 0.18s ease', display: 'block', textDecoration: 'none', cursor: 'pointer' }}
                      onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.color = '#fff'; el.style.paddingLeft = '5px' }}
                      onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.color = 'rgba(255,255,255,0.5)'; el.style.paddingLeft = '0' }}
                    >
                      {item.label}
                    </a>
                  ) : (
                    <FooterLink href={item.href}>{item.label}</FooterLink>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* ── Industries — all 10 ── */}
          <div>
            <SectionHeading label="Industries" />
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 13 }}>
              {allIndustries.map(item => (
                <li key={item.label}>
                  <FooterLink href={item.href}>{item.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Why Us ── */}
          <div>
            <SectionHeading label="Why Us" />
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 13 }}>
              {whyUsItems.map(item => (
                <li key={item.label}>
                  <FooterLink href={item.href}>{item.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Quick Links ── */}
          <div>
            <SectionHeading label="Quick Links" />
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 13 }}>
              {[
                { label: 'About Us',       href: '/about'        },
                { label: 'Careers',        href: '/careers'      },
                { label: 'Case Studies',   href: '/case-studies' },
                { label: 'Blog',           href: '/blog'         },
                { label: 'Latest News',    href: '/news'         },
                { label: 'FAQ',            href: '/faq'          },
                { label: 'Contact',        href: '/contact'      },
                { label: 'Customer Login', href: '#'             },
                { label: 'Track Shipment', href: '#'             },
              ].map(item => (
                <li key={item.label}>
                  <FooterLink href={item.href}>{item.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Divider ── */}
        <div style={{ height: 1, background: 'rgba(255,255,255,0.08)', position: 'relative' }}>
          <div style={{
            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
            width: 8, height: 8, borderRadius: '50%',
            background: GREEN, boxShadow: `0 0 10px ${GREEN}70`,
          }} />
        </div>

        {/* ── Bottom bar ── */}
        <div style={{
          padding: 'clamp(18px,2.5vw,28px) 0 clamp(22px,3vw,32px)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: 14,
        }}>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.28)', margin: 0 }}>
            © 2026 BIVRY Pty Ltd. All rights reserved.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(10px,2vw,24px)', flexWrap: 'wrap' }}>
            {['Privacy Policy', 'Terms of Use', 'Cookie Policy'].map(link => (
              <a key={link} href="/" style={{ fontSize: 12, color: 'rgba(255,255,255,0.28)', transition: 'color 0.15s ease', textDecoration: 'none' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = GREEN }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.28)' }}
              >
                {link}
              </a>
            ))}
            <span style={{ color: 'rgba(255,255,255,0.12)', fontSize: 12 }}>|</span>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.28)' }}>
              Developed by <a href="https://egdigital.com.au/" target="_blank" rel="noopener noreferrer" style={{ color: GREEN, fontWeight: 600, textDecoration: 'none' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.textDecoration = 'underline' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.textDecoration = 'none' }}
              >EG Digital</a>
            </span>
          </div>
        </div>
      </div>

      <style>{`
        a { text-decoration: none; }
        @media (max-width: 1024px) { .footer-grid { grid-template-columns: 1.5fr 1fr 1fr !important; } }
        @media (max-width: 640px)  { .footer-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 420px)  { .footer-grid { grid-template-columns: 1fr !important; } }

        .footer-info-box {
          transition: transform 0.24s cubic-bezier(0.34,1.56,0.64,1), border-color 0.22s ease, background 0.22s ease, box-shadow 0.22s ease;
          cursor: default;
        }
        .footer-location-link { cursor: pointer; }
        .footer-info-box:hover {
          transform: translateY(-4px);
          border-color: rgba(60,185,140,0.65) !important;
          background: rgba(60,185,140,0.18) !important;
          box-shadow: 0 10px 28px rgba(60,185,140,0.18);
        }
      `}</style>
    </footer>
  )
}
