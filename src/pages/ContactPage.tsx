import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, CheckCircle, ChevronDown, AlertCircle } from 'lucide-react'
import emailjs from '@emailjs/browser'
import { Header } from '../components/Header/Header'
import { Footer } from '../components/Footer'

const NAVY  = '#08213C'
const GREEN = '#3CB98C'
const CREAM = '#F3F0EA'
const ease  = [0.16, 1, 0.3, 1] as [number, number, number, number]

const ALL_SERVICES = [
  'Interstate Road Transport', 'Container Movement', 'Regional Deliveries',
  'Same Day Delivery', 'Next Day Delivery', 'Metro Distribution',
  'Taxi Trucks', 'Warehousing - Multi Location', 'Pallet Re-Packaging',
  'International Receiving', 'Contract Logistics',
]

const CTA_AU_CITIES = [
  { name: 'Melbourne', address: '71 Gipps Street, Collingwood, Melbourne, VIC 3066' },
  { name: 'Sydney',    address: '60 Martin Place, Sydney 2000' },
  { name: 'Brisbane',  address: '71 Eagle Street, Brisbane QLD 4000' },
  { name: 'Adelaide',  address: '2-3 Greenhill Road, Wayville, Adelaide 5034' },
  { name: 'Perth',     address: '300 Murray Street, Level 2 East, The Wentworth Building, Perth 6000' },
]

const CTA_INTL = [
  { name: 'US',                    address: '20 F St NW, Washington, DC 20001, USA' },
  { name: 'Canada',                address: 'First Canadian Place, 100 King St W #5600, Toronto, ON M5X 1C9, Canada' },
  { name: 'UK',                    address: '107-111 Fleet St, London EC4A 2AB, United Kingdom' },
  { name: 'United Arab Emirates',  address: 'Level 9 Sheikh Mohammed bin Rashid Blvd, Burj Khalifa, Downtown Dubai, Dubai' },
  { name: 'India',                 address: 'Tower A, Spaze iTech Park, 5th Floor, Sohna - Gurgaon Rd, Gurugram 122018' },
  { name: 'Singapore',             address: '1 Raffles Pl, #19-20 One Raffles Place Tower 2, Singapore 048616' },
  { name: 'China',                 address: '18, 35/F Harbour Rd, Wan Chai, Hong Kong' },
]


/* ─── Social icons ───────────────────────────────────────── */
function IconLinkedIn() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
}
function IconTwitterX() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
}
function IconFacebook() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
}
function IconInstagram() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
}
function IconYouTube() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.4a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#08213C"/></svg>
}
function IconThreads() {
  return (
    <svg width="15" height="15" viewBox="0 0 192 192" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C97.4484 44.7443 97.3355 44.7443 97.222 44.7443C82.2364 44.7443 69.7731 51.1409 62.102 62.7807L75.881 72.2328C81.6116 63.5383 90.6052 61.6848 97.2286 61.6848C97.3051 61.6848 97.3819 61.6848 97.4576 61.6855C105.707 61.7381 111.932 64.1366 115.961 68.814C118.893 72.2193 120.854 76.925 121.825 82.8638C114.511 81.6207 106.601 81.2385 98.145 81.7233C74.3247 83.0954 59.0111 96.9879 60.0396 116.292C60.5615 126.084 65.4397 134.508 73.775 140.011C80.8224 144.663 89.899 146.938 99.3323 146.423C111.79 145.74 121.563 140.987 128.381 132.296C133.559 125.696 136.834 117.143 138.28 106.366C144.217 109.949 148.617 114.664 151.047 120.332C155.179 129.967 155.42 145.8 142.501 158.708C131.182 170.016 117.576 174.908 97.0135 175.059C74.2042 174.89 56.9538 167.575 45.7381 153.317C35.2355 139.966 29.8077 120.682 29.6052 96C29.8077 71.3178 35.2355 52.0336 45.7381 38.6827C56.9538 24.4249 74.2039 17.11 97.0132 16.9405C119.988 17.1113 137.539 24.4614 149.184 38.788C154.894 45.8136 159.199 54.6488 162.037 64.9503L178.184 60.6422C174.744 47.9622 169.331 37.0357 161.965 27.974C147.036 9.60668 125.202 0.195148 97.0695 0H96.9569C68.8816 0.19447 47.2921 9.6418 32.7883 28.0793C19.8819 44.4864 13.2244 67.3157 13.0007 95.9325L13 96L13.0007 96.0675C13.2244 124.684 19.8819 147.514 32.7883 163.921C47.2921 182.358 68.8816 191.806 96.9569 192H97.0695C122.03 191.827 139.624 185.292 154.118 170.811C173.081 151.866 172.51 128.119 166.26 113.541C161.776 103.087 153.227 94.5962 141.537 88.9883ZM98.4405 129.507C88.0005 130.095 77.1544 125.409 76.6196 115.372C76.2232 107.93 81.9158 99.626 99.0812 98.6368C101.047 98.5234 102.976 98.468 104.871 98.468C111.106 98.468 116.939 99.0737 122.242 100.233C120.264 124.935 108.723 128.946 98.4405 129.507Z"/>
    </svg>
  )
}

const SOCIALS = [
  { Icon: IconLinkedIn,  href: 'https://www.linkedin.com/company/egtrans/',   label: 'LinkedIn',  bg: '#0A66C2', color: '#fff' },
  { Icon: IconTwitterX,  href: 'https://x.com/Bivryaustralia',                label: 'Twitter/X', bg: '#000000', color: '#fff' },
  { Icon: IconFacebook,  href: 'https://www.facebook.com/bivry/',             label: 'Facebook',  bg: '#1877F2', color: '#fff' },
  { Icon: IconInstagram, href: 'https://www.instagram.com/bivry_australia/',  label: 'Instagram', bg: 'linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)', color: '#fff' },
  { Icon: IconYouTube,   href: 'https://www.youtube.com/@Bivry-2026',         label: 'YouTube',   bg: '#FF0000', color: '#fff' },
  { Icon: IconThreads,   href: 'https://www.threads.com/@bivry_australia',    label: 'Threads',   bg: '#000000', color: '#fff' },
]

/* ─── Contact Info Panel (left side of form) ────────────── */
const PANEL_SERVICES = [
  'Interstate Road Transport',
  'Container Movement',
  'Taxi Trucks',
  'Trailer Tow Operator',
  'Warehousing - Multi Location',
  'Pallet Re-Packaging',
  'International Receiving',
  'Contract Logistics',
]

function ContactInfoPanel() {
  return (
    <div style={{
      width: '100%', height: '100%', background: NAVY,
      position: 'relative', overflow: 'hidden',
      display: 'flex', flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '36px 44px 36px',
    }}>

      {/* Dot grid */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }} />

      {/* Concentric circles — peek from top-right corner */}
      {[300, 230, 162, 96].map((s, i) => (
        <div key={s} style={{
          position: 'absolute',
          top: -s * 0.52, right: -s * 0.52,
          width: s, height: s, borderRadius: '50%',
          border: `1px solid rgba(60,185,140,${0.07 + i * 0.045})`,
          pointerEvents: 'none',
        }} />
      ))}

      {/* Bottom-left green glow */}
      <div style={{
        position: 'absolute', bottom: -70, left: -70,
        width: 300, height: 300, borderRadius: '50%',
        background: `radial-gradient(circle, ${GREEN}18 0%, transparent 65%)`,
        pointerEvents: 'none',
      }} />


      {/* ── Upper: pill + heading + line + stats ── */}
      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* Pill */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 7,
          border: '1px solid rgba(255,255,255,0.13)', borderRadius: 100,
          padding: '5px 14px', marginBottom: 24,
        }}>
          <div style={{ width: 5, height: 5, borderRadius: '50%', background: GREEN, boxShadow: `0 0 7px ${GREEN}` }} />
          <span style={{ fontSize: 9, fontWeight: 800, color: 'rgba(255,255,255,0.45)', letterSpacing: '2px', textTransform: 'uppercase' }}>
            Contact Information
          </span>
        </div>

        {/* Bold display heading */}
        <div style={{
          fontSize: 'clamp(34px,4vw,58px)', fontWeight: 900, color: '#fff',
          letterSpacing: '-0.045em', lineHeight: 0.88,
          textTransform: 'uppercase', marginBottom: 20,
        }}>
          CONNECT<br />WITH<br /><span style={{ color: GREEN }}>BIVRY.</span>
        </div>

        {/* Green rule */}
        <div style={{ width: 42, height: 2.5, background: GREEN, borderRadius: 2, marginBottom: 18 }} />

        {/* Services list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {PANEL_SERVICES.map((svc, i) => (
            <div key={svc} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '9px 0',
              borderBottom: i < PANEL_SERVICES.length - 1
                ? '1px solid rgba(255,255,255,0.06)' : 'none',
            }}>
              <span style={{ color: GREEN, fontSize: 16, fontWeight: 700, flexShrink: 0 }}>→</span>
              <span style={{
                fontSize: 15, fontWeight: 600,
                color: 'rgba(255,255,255,0.72)',
                letterSpacing: '0.2px', lineHeight: 1,
              }}>{svc}</span>
            </div>
          ))}
        </div>
      </div>

      <div />
    </div>
  )
}

/* ─── Custom Service Dropdown (field 04) ────────────────── */
function ServiceField({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false)
  const wrapRef  = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  /* close on outside click */
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [])

  /* attach non-passive wheel listener so the panel scrolls independently */
  useEffect(() => {
    const el = panelRef.current
    if (!el) return
    const onWheel = (e: WheelEvent) => {
      const atTop    = el.scrollTop === 0 && e.deltaY < 0
      const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight && e.deltaY > 0
      if (!atTop && !atBottom) e.stopPropagation()
    }
    el.addEventListener('wheel', onWheel, { passive: true })
    return () => el.removeEventListener('wheel', onWheel)
  }, [open])

  return (
    <div ref={wrapRef} style={{ position: 'relative' }}>
      {/* Trigger row */}
      <div style={{
        display: 'grid', gridTemplateColumns: '42px 1fr',
        gap: 16, alignItems: 'center',
        borderBottom: `1.5px solid ${open || value ? GREEN : 'rgba(8,33,60,0.1)'}`,
        transition: 'border-color 0.2s ease',
      }}>
        <span style={{
          fontSize: 11, fontWeight: 800, paddingTop: 1,
          color: open ? GREEN : 'rgba(8,33,60,0.28)',
          transition: 'color 0.2s ease',
        }}>04</span>

        <div
          onClick={() => setOpen(o => !o)}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '18px 0', cursor: 'pointer', userSelect: 'none',
          }}
        >
          <span style={{
            fontSize: 'clamp(13px,1.15vw,17px)', fontWeight: 600,
            color: value ? NAVY : 'rgba(8,33,60,0.28)',
            textTransform: 'uppercase', letterSpacing: '0.5px',
          }}>
            {value || 'I Need Service For'}
          </span>
          <ChevronDown
            size={15} strokeWidth={2.2}
            color={open ? GREEN : 'rgba(8,33,60,0.3)'}
            style={{
              flexShrink: 0,
              transition: 'transform 0.22s ease',
              transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            }}
          />
        </div>
      </div>

      {/* Panel — plain div, no framer-motion, so scroll is never intercepted */}
      {open && (
        <div
          ref={panelRef}
          style={{
            position: 'absolute',
            top: '100%', left: 0, right: 0,
            zIndex: 200, marginTop: 6,
            background: '#fff',
            border: '1.5px solid rgba(8,33,60,0.09)',
            borderRadius: 14,
            boxShadow: '0 4px 8px rgba(8,33,60,0.05), 0 20px 48px rgba(8,33,60,0.11)',
            maxHeight: 296,
            overflowY: 'scroll',
            overscrollBehavior: 'contain',
          }}
        >
          {ALL_SERVICES.map((opt, i) => {
            const sel = value === opt
            return (
              <div
                key={opt}
                onClick={() => { onChange(opt); setOpen(false) }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  padding: '13px 20px', cursor: 'pointer',
                  background: sel ? `${GREEN}0d` : 'transparent',
                  borderBottom: i < ALL_SERVICES.length - 1 ? '1px solid rgba(8,33,60,0.05)' : 'none',
                  transition: 'background 0.14s ease',
                }}
                onMouseEnter={e => { if (!sel) (e.currentTarget as HTMLElement).style.background = `${GREEN}08` }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = sel ? `${GREEN}0d` : 'transparent' }}
              >
                <div style={{
                  width: 8, height: 8, borderRadius: '50%', flexShrink: 0,
                  background: sel ? GREEN : 'transparent',
                  border: `1.5px solid ${sel ? GREEN : 'rgba(8,33,60,0.22)'}`,
                  transition: 'all 0.15s ease',
                }} />
                <span style={{
                  fontSize: 13.5, fontWeight: sel ? 700 : 500,
                  color: sel ? GREEN : NAVY,
                  letterSpacing: '0.1px', transition: 'color 0.15s ease',
                }}>{opt}</span>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

/* ─── Numbered underline field ───────────────────────────── */
function NumField({
  num, placeholder, value, onChange, type = 'text',
  tag = 'input' as 'input' | 'textarea',
}: {
  num: number; placeholder: string; value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  type?: string; tag?: 'input' | 'textarea'
}) {
  const [focused, setFocused] = useState(false)
  const shared: React.CSSProperties = {
    border: 'none', outline: 'none', background: 'transparent',
    fontSize: 'clamp(13px,1.15vw,17px)', fontWeight: 600, color: NAVY,
    textTransform: 'uppercase' as const, letterSpacing: '0.5px',
    fontFamily: 'inherit', width: '100%',
  }
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: '42px 1fr',
      gap: 16, alignItems: 'flex-start',
      borderBottom: `1.5px solid ${focused ? GREEN : 'rgba(8,33,60,0.1)'}`,
      padding: '18px 0', transition: 'border-color 0.2s ease',
    }}>
      <span style={{
        fontSize: 11, fontWeight: 800, paddingTop: 1,
        color: focused ? GREEN : 'rgba(8,33,60,0.28)',
        transition: 'color 0.2s ease',
      }}>
        {String(num).padStart(2, '0')}
      </span>
      {tag === 'textarea' ? (
        <textarea
          value={value}
          onChange={onChange as React.ChangeEventHandler<HTMLTextAreaElement>}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          placeholder={placeholder} rows={3}
          style={{ ...shared, resize: 'none' } as React.CSSProperties}
        />
      ) : (
        <input
          type={type} value={value}
          onChange={onChange as React.ChangeEventHandler<HTMLInputElement>}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          placeholder={placeholder}
          style={shared}
        />
      )}
    </div>
  )
}

/* ─── Main Export ────────────────────────────────────────── */
export function ContactPage() {
  const [form, setForm] = useState({ name:'', email:'', company:'', service:'', message:'' })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted]   = useState(false)
  const [sendError, setSendError]   = useState<string | null>(null)

  const set = (key: string) => ({
    value: form[key as keyof typeof form],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm(f => ({ ...f, [key]: e.target.value })),
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name.trim() || !form.email.trim()) return
    setSubmitting(true)
    setSendError(null)

    try {
      console.log('EmailJS sending with:', {
        serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
        templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      })
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID as string,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string,
        {
          from_name:    form.name,
          from_email:   form.email,
          company:      form.company  || 'Not provided',
          service_type: form.service  || 'Not specified',
          message:      form.message  || 'No message',
        },
        { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string }
      )
      setSubmitted(true)
    } catch {
      setSendError('Something went wrong - please try again or email us directly at connect@bivry.com.au')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: CREAM }}>
      <Header />

      {/* ════════════════════════════════
          HERO
         ════════════════════════════════ */}
      <section style={{
        minHeight: '100vh', background: CREAM,
        display: 'flex', flexDirection: 'column',
        justifyContent: 'space-between',
        paddingTop: 64, position: 'relative', overflow: 'hidden',
      }}>
        {/* Centre content */}
        <div style={{
          flex: 1, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          padding: 'clamp(48px,6vw,80px) clamp(24px,5vw,80px)',
          textAlign: 'center',
        }}>
          {/* Pill tag */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              border: '1.5px solid rgba(8,33,60,0.16)', borderRadius: 100,
              padding: '7px 18px', marginBottom: 44,
            }}
          >
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: GREEN, boxShadow: `0 0 8px ${GREEN}` }} />
            <span style={{ fontSize: 11, fontWeight: 800, color: NAVY, letterSpacing: '2.5px', textTransform: 'uppercase' }}>
              Get in Touch
            </span>
          </motion.div>

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.1 }}
            style={{ position: 'relative', marginBottom: 52 }}
          >
            <span style={{
              position: 'absolute',
              left: 'clamp(-44px,-4.5vw,-20px)',
              top: '50%', transform: 'translateY(-50%)',
              fontSize: 'clamp(22px,3.5vw,52px)',
              color: 'rgba(8,33,60,0.18)', fontWeight: 900, lineHeight: 1,
              userSelect: 'none',
            }}>→</span>
            <h1 style={{
              fontSize: 'clamp(52px,11vw,152px)',
              fontWeight: 900, color: NAVY,
              letterSpacing: '-0.046em', lineHeight: 0.9,
              margin: 0, textTransform: 'uppercase',
            }}>
              LET'S TALK<br />
              <span style={{ color: GREEN }}>FREIGHT.</span>
            </h1>
          </motion.div>

          {/* CTA */}
          <motion.a
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.25 }}
            href="#contact-form"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 12,
              background: NAVY, color: '#fff', borderRadius: 100,
              padding: '15px 32px', textDecoration: 'none',
              fontSize: 15, fontWeight: 700, letterSpacing: '0.2px',
              boxShadow: '0 8px 28px rgba(8,33,60,0.18)',
              transition: 'all 0.22s ease',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement
              el.style.background = GREEN
              el.style.boxShadow = `0 8px 28px ${GREEN}55`
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement
              el.style.background = NAVY
              el.style.boxShadow = '0 8px 28px rgba(8,33,60,0.18)'
            }}
          >
            <ArrowRight size={16} strokeWidth={2.5} />
            Talk to Our Team
          </motion.a>
        </div>

        {/* Bottom 4-col info strip */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4,1fr)',
          borderTop: '1px solid rgba(8,33,60,0.09)',
          padding: '28px clamp(24px,5vw,80px)',
          gap: 'clamp(16px,3vw,48px)',
        }} className="hero-bottom-strip">

          {/* Tagline */}
          <div>
            <div style={{ fontSize: 18, color: NAVY, fontWeight: 900, marginBottom: 10 }}>→</div>
            <p style={{ fontSize: 14, color: 'rgba(8,33,60,0.65)', lineHeight: 1.75, margin: 0,
              textTransform: 'uppercase', letterSpacing: '0.3px', fontWeight: 700 }}>
              We connect businesses with reliable freight solutions and are ready to hear from you.
            </p>
          </div>

          {/* Social */}
          <div>
            <div style={{ fontSize: 12, fontWeight: 800, color: 'rgba(8,33,60,0.36)',
              letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 14 }}>SOCIAL</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {SOCIALS.map(({ Icon, href, label, bg, color }) => (
                <a key={label} href={href} aria-label={label} target="_blank" rel="noopener noreferrer" style={{
                  width: 36, height: 36, borderRadius: 9,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: bg, color,
                  textDecoration: 'none',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.transform = 'translateY(-3px) scale(1.1)'
                    el.style.boxShadow = '0 8px 20px rgba(0,0,0,0.25)'
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.transform = 'translateY(0) scale(1)'
                    el.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)'
                  }}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Contacts */}
          <div>
            <div style={{ fontSize: 12, fontWeight: 800, color: 'rgba(8,33,60,0.36)',
              letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 14 }}>CONTACTS</div>
            <div style={{ fontSize: 15, fontWeight: 600, color: NAVY, lineHeight: 2.1 }}>
              1800 054 555<br />connect@bivry.com.au
            </div>
          </div>

          {/* Head Office */}
          <div>
            <div style={{ fontSize: 12, fontWeight: 800, color: 'rgba(8,33,60,0.36)',
              letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 14 }}>HEAD OFFICE</div>
            <a
              href="https://www.google.com/maps/search/?api=1&query=71+Gipps+Street+Collingwood+Melbourne+VIC+3066"
              target="_blank"
              rel="noopener noreferrer"
              className="head-office-link"
              style={{
                display: 'inline-block',
                fontSize: 15, fontWeight: 600, color: NAVY, lineHeight: 2.1,
                textDecoration: 'none',
                borderBottom: '1.5px solid transparent',
                transition: 'color 0.2s ease, border-color 0.2s ease',
              }}
            >
              Melbourne,<br />Victoria, Australia
            </a>
          </div>
        </div>
      </section>


      {/* ════════════════════════════════
          FORM
         ════════════════════════════════ */}
      <section id="contact-form" style={{
        background: '#fff', display: 'flex', alignItems: 'flex-start', minHeight: '100vh',
      }}>
        {/* Left: sticky animation panel */}
        <div style={{
          width: 'clamp(300px,38%,520px)', flexShrink: 0,
          position: 'sticky', top: 0, height: '100vh',
        }} className="form-anim-col">
          <ContactInfoPanel />
        </div>

        {/* Right: form */}
        <div style={{
          flex: 1,
          padding: 'clamp(52px,6vw,88px) clamp(32px,5vw,72px)',
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          minHeight: '100vh',
        }}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
            style={{
              fontSize: 'clamp(40px,7vw,92px)',
              fontWeight: 900, color: NAVY,
              letterSpacing: '-0.045em', lineHeight: 0.88,
              margin: '0 0 48px', textTransform: 'uppercase',
            }}
          >
            HELLO<br />
            <span style={{ color: GREEN }}>BIVRY,</span>
          </motion.h2>

          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease }}
                style={{ display: 'flex', flexDirection: 'column', gap: 18, alignItems: 'flex-start', padding: '32px 0' }}
              >
                <CheckCircle size={52} color={GREEN} strokeWidth={1.5} />
                <h3 style={{ fontSize: 28, fontWeight: 900, color: NAVY, margin: 0, letterSpacing: '-0.03em' }}>
                  Message Sent!
                </h3>
                <p style={{ fontSize: 15, color: 'rgba(8,33,60,0.5)', lineHeight: 1.7, margin: 0, maxWidth: 380 }}>
                  Our team will get back to you within 4 business hours. We look forward to moving freight with you.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setSendError(null); setForm({ name:'',email:'',company:'',service:'',message:'' }) }}
                  style={{
                    marginTop: 8, padding: '13px 30px',
                    background: NAVY, color: '#fff', border: 'none',
                    borderRadius: 100, fontSize: 14, fontWeight: 700, cursor: 'pointer',
                  }}
                >
                  Send Another
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <NumField num={1} placeholder="Name"        {...set('name')}    />
                <NumField num={2} placeholder="Email"       {...set('email')}   type="email" />
                <NumField num={3} placeholder="Company Name"     {...set('company')} />
                <ServiceField value={form.service} onChange={v => setForm(f => ({ ...f, service: v }))} />
                <NumField num={5} placeholder="Write Your Message"     {...set('message')} tag="textarea" />

                <div style={{ marginTop: 44, display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'flex-end' }}>
                  <button
                    type="submit"
                    disabled={submitting}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 12,
                      background: submitting ? `${NAVY}70` : NAVY,
                      color: '#fff', border: 'none', borderRadius: 100,
                      padding: '15px 36px', fontSize: 15, fontWeight: 700,
                      cursor: submitting ? 'not-allowed' : 'pointer',
                      letterSpacing: '0.2px', transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={e => {
                      if (!submitting) {
                        const el = e.currentTarget as HTMLElement
                        el.style.background = GREEN
                        el.style.boxShadow = `0 8px 24px ${GREEN}50`
                      }
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLElement
                      el.style.background = submitting ? `${NAVY}70` : NAVY
                      el.style.boxShadow = 'none'
                    }}
                  >
                    <ArrowRight size={16} strokeWidth={2.5} />
                    {submitting ? 'Sending…' : 'Send Message'}
                  </button>

                  {sendError && (
                    <div style={{
                      display: 'flex', alignItems: 'flex-start', gap: 10,
                      background: '#fff0f0', border: '1.5px solid #fca5a5',
                      borderRadius: 12, padding: '12px 16px',
                      maxWidth: 420, width: '100%',
                    }}>
                      <AlertCircle size={16} strokeWidth={2} color="#dc2626" style={{ flexShrink: 0, marginTop: 1 }} />
                      <span style={{ fontSize: 13, color: '#dc2626', lineHeight: 1.55 }}>{sendError}</span>
                    </div>
                  )}
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </section>


      {/* ════════════════════════════════
          LET'S MOVE CTA
         ════════════════════════════════ */}
      <section style={{
        background: NAVY,
        minHeight: '80vh',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: 'clamp(72px,10vw,140px) clamp(24px,5vw,80px)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }} />
        <div style={{
          position: 'absolute', bottom: -100, right: '8%',
          width: 560, height: 560, borderRadius: '50%',
          background: `radial-gradient(circle, ${GREEN}10 0%, transparent 60%)`,
          pointerEvents: 'none',
        }} />

        <motion.div
          initial={{ opacity: 0, y: 48 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease }}
          style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 1100 }}
        >
          <h2 style={{
            fontSize: 'clamp(80px,16vw,220px)',
            fontWeight: 900, color: '#fff',
            letterSpacing: '-0.05em', lineHeight: 0.86,
            margin: '0 0 64px', textTransform: 'uppercase',
            textAlign: 'center',
          }}>
            LET'S<br />
            <span style={{ color: GREEN }}>MOVE.</span>
          </h2>

          {/* Australia | CTA | International */}
          <div className="cta-tag-row" style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto 1fr',
            gap: 'clamp(20px,3vw,48px)',
            alignItems: 'stretch',
          }}>

            {/* Australia */}
            <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', alignItems: 'flex-start' }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{
                  fontSize: 10, fontWeight: 700, letterSpacing: '2.2px',
                  textTransform: 'uppercase', color: GREEN, marginBottom: 10,
                }}>
                  Australia
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, justifyContent: 'flex-end' }}>
                  {CTA_AU_CITIES.map(({ name, address }) => (
                    <a
                      key={name}
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cta-tag"
                      style={{
                        fontSize: 14, fontWeight: 500,
                        color: 'rgba(255,255,255,0.52)',
                        padding: '5px 13px',
                        background: 'rgba(255,255,255,0.06)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: 6,
                        whiteSpace: 'nowrap',
                        transition: 'all 0.22s ease',
                        cursor: 'pointer',
                        textDecoration: 'none',
                      }}
                    >{name}</a>
                  ))}
                </div>
              </div>
              <div style={{
                width: 2, borderRadius: 2, flexShrink: 0, alignSelf: 'stretch',
                background: `linear-gradient(to bottom, ${GREEN}, ${GREEN}30)`,
              }} />
            </div>

            {/* CTA */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <a href="tel:1800054555" style={{
                display: 'inline-flex', alignItems: 'center', gap: 14,
                border: '2px solid rgba(255,255,255,0.28)', borderRadius: 100,
                padding: '17px 42px', color: '#fff', textDecoration: 'none',
                fontSize: 16, fontWeight: 700, letterSpacing: '0.3px',
                transition: 'all 0.25s ease',
                whiteSpace: 'nowrap',
              }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.background = GREEN
                  el.style.borderColor = GREEN
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.background = 'transparent'
                  el.style.borderColor = 'rgba(255,255,255,0.28)'
                }}
              >
                <ArrowRight size={18} strokeWidth={2.5} />
                Get a Quote - 1800 054 555
              </a>
            </div>

            {/* International */}
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <div style={{
                width: 2, borderRadius: 2, flexShrink: 0, alignSelf: 'stretch',
                background: `linear-gradient(to bottom, ${GREEN}, ${GREEN}30)`,
              }} />
              <div>
                <div style={{
                  fontSize: 10, fontWeight: 700, letterSpacing: '2.2px',
                  textTransform: 'uppercase', color: GREEN, marginBottom: 10,
                }}>
                  International
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                  {CTA_INTL.map(({ name, address }) => (
                    <a
                      key={name}
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cta-tag"
                      style={{
                        fontSize: 14, fontWeight: 500,
                        color: 'rgba(255,255,255,0.5)',
                        padding: '5px 13px',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.09)',
                        borderRadius: 6,
                        whiteSpace: 'nowrap',
                        transition: 'all 0.22s ease',
                        cursor: 'pointer',
                        textDecoration: 'none',
                      }}
                    >{name}</a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <Footer />

      <style>{`
        .head-office-link:hover {
          color: #3CB98C !important;
          border-color: #3CB98C !important;
        }
        .cta-tag:hover {
          color: #fff !important;
          background: rgba(60,185,140,0.18) !important;
          border-color: rgba(60,185,140,0.55) !important;
          transform: translateY(-2px);
          box-shadow: 0 4px 14px rgba(60,185,140,0.25);
        }

input::placeholder, textarea::placeholder {
          text-transform: uppercase;
          color: rgba(8,33,60,0.28);
          font-weight: 500;
          letter-spacing: 0.5px;
        }
        @media (max-width: 900px) {
          .form-anim-col { display: none !important; }
          .cta-tag-row { grid-template-columns: 1fr !important; justify-items: center; text-align: center; }
          .cta-tag-row > div:first-child { flex-direction: column-reverse; align-items: center; }
          .cta-tag-row > div:first-child > div:last-child { display: none; }
          .cta-tag-row > div:last-child > div:first-child { display: none; }
        }
        @media (max-width: 768px) {
          .hero-bottom-strip { grid-template-columns: 1fr 1fr !important; gap: 24px !important; }
        }
        @media (max-width: 420px) {
          .hero-bottom-strip { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
