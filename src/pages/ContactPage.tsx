import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ArrowRight, ArrowUpRight, CheckCircle, ChevronDown, Phone, Mail, MapPin, Clock } from 'lucide-react'
import { Header } from '../components/Header/Header'
import { FlyFooter } from '../components/FlyFooter'
import { NAVY, GREEN, MUTED, EASE } from '../components/PageKit'

const SERVICES = [
  'Digital & Technology', 'Imports & Trade', 'Transport & Logistics',
  'Travel Solutions', 'Call Center / BPO', 'IT Infrastructure',
  'Supply Chain', 'Partnerships', 'General Enquiry',
]

const MAPS = (q: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`

const OFFICES = [
  { city: 'India', tag: 'Operations', addr: 'Gurugram, Haryana, India' },
  { city: 'United States', tag: 'Operations', addr: 'Washington, DC, USA' },
  { city: 'United Kingdom', tag: 'Operations', addr: 'London, United Kingdom' },
  { city: 'UAE', tag: 'Operations', addr: 'Downtown Dubai, Dubai' },
  { city: 'Singapore', tag: 'Operations', addr: 'One Raffles Place, Singapore' },
]

const HEAD = { city: 'Melbourne', tag: 'Head Office', addr: '71 Gipps Street, Collingwood, Melbourne, VIC 3066, Australia' }

const LINES = [
  { Icon: Phone, t: '1800 054 555', s: 'Mon–Fri · 9–6 AEST', href: 'tel:1800054555' },
  { Icon: Mail, t: 'connect@elomagroup.com.au', s: 'Reply within 1 business day', href: 'mailto:connect@elomagroup.com.au' },
  { Icon: MapPin, t: '71 Gipps Street, Collingwood', s: 'Melbourne, VIC 3066', href: MAPS('71 Gipps Street Collingwood Melbourne VIC 3066') },
]

function Kicker({ no, label, light }: { no: string; label: string; light?: boolean }) {
  return (
    <div className={`ctx-kicker${light ? ' lt' : ''}`}>
      <span className="ctx-kicker-no">{no}</span>
      <span className="ctx-kicker-rule" />
      <span className="ctx-kicker-lb">{label}</span>
    </div>
  )
}

/* ── Custom service dropdown ── */
function ServiceField({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const h = (e: MouseEvent) => { if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false) }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])
  return (
    <div ref={wrapRef} className="ctx-field" style={{ position: 'relative' }}>
      <label className="ctx-label" htmlFor="ctx-service">Area of interest</label>
      <button type="button" id="ctx-service" className={`ctx-select${open || value ? ' active' : ''}`} aria-haspopup="listbox" aria-expanded={open} onClick={() => setOpen(o => !o)}>
        <span style={{ color: value ? NAVY : 'rgba(26,43,60,0.4)' }}>{value || 'What can we help with?'}</span>
        <ChevronDown size={16} color={open ? GREEN : 'rgba(26,43,60,0.4)'} style={{ transition: 'transform 0.22s ease', transform: open ? 'rotate(180deg)' : 'rotate(0)' }} />
      </button>
      {open && (
        <div className="ctx-menu" role="listbox">
          {SERVICES.map(opt => {
            const sel = value === opt
            return (
              <div key={opt} role="option" aria-selected={sel} onClick={() => { onChange(opt); setOpen(false) }} className="ct-opt"
                style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', cursor: 'pointer', borderRadius: 9, background: sel ? 'rgba(60,185,140,0.1)' : 'transparent' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', flexShrink: 0, background: sel ? GREEN : 'transparent', border: `1.5px solid ${sel ? GREEN : 'rgba(26,43,60,0.25)'}` }} />
                <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, fontWeight: sel ? 700 : 500, color: sel ? GREEN : NAVY }}>{opt}</span>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

function Field({ id, label, placeholder, value, onChange, type = 'text', tag = 'input' as 'input' | 'textarea' }: {
  id: string; label: string; placeholder: string; value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  type?: string; tag?: 'input' | 'textarea'
}) {
  const [focused, setFocused] = useState(false)
  const shared: React.CSSProperties = { border: 'none', outline: 'none', background: 'transparent', fontFamily: "'Inter',sans-serif", fontSize: 'clamp(15px,1.1vw,17px)', fontWeight: 500, color: NAVY, width: '100%' }
  return (
    <div className={`ctx-field${focused ? ' focus' : ''}`}>
      <label className="ctx-label" htmlFor={id}>{label}</label>
      {tag === 'textarea' ? (
        <textarea id={id} value={value} onChange={onChange as React.ChangeEventHandler<HTMLTextAreaElement>} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} placeholder={placeholder} rows={3} style={{ ...shared, resize: 'none' }} />
      ) : (
        <input id={id} type={type} value={value} onChange={onChange as React.ChangeEventHandler<HTMLInputElement>} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} placeholder={placeholder} style={shared} />
      )}
    </div>
  )
}

export function ContactPage() {
  const reduce = useReducedMotion()
  const [form, setForm] = useState({ name: '', email: '', company: '', service: '', message: '' })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const set = (key: keyof typeof form) => ({
    value: form[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm(f => ({ ...f, [key]: e.target.value })),
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name.trim() || !form.email.trim()) return
    setSubmitting(true)
    setTimeout(() => { setSubmitting(false); setSubmitted(true) }, 700)
  }

  const rise = (d = 0) => ({
    initial: reduce ? false : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.7, delay: d, ease: EASE },
  })

  return (
    <div style={{ overflowX: 'clip', background: '#fff' }}>
      <Header />

      {/* ── 1 · Editorial hero ── */}
      <section className="ctx-hero">
        <span className="ctx-hero-mark" aria-hidden>✦</span>
        <div className="ctx-hero-in">
          <div className="ctx-hero-main">
            <motion.p className="ctx-eyebrow" initial={reduce ? false : { opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }}>
              <span className="ctx-eyebrow-dot" />Get in touch
            </motion.p>
            <motion.h1 className="ctx-hero-h1" initial={reduce ? false : { opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: EASE, delay: 0.08 }}>
              Let's start a<br /><span className="g">conversation.</span>
            </motion.h1>
          </div>
          <motion.aside className="ctx-hero-side" initial={reduce ? false : { opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}>
            <p className="ctx-hero-lead">
              Whether you're a partner, client or future teammate — tell us what you need and our team responds within one business day.
            </p>
            <div className="ctx-hero-lines">
              {LINES.map((l) => (
                <a className="ctx-hero-line" key={l.t} href={l.href} target={l.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
                  <span className="ctx-hero-line-ic"><l.Icon size={16} /></span>
                  <span className="ctx-hero-line-tx">
                    <span className="ctx-hero-line-t">{l.t}</span>
                    <span className="ctx-hero-line-s">{l.s}</span>
                  </span>
                  <ArrowUpRight size={15} className="ctx-hero-line-go" />
                </a>
              ))}
            </div>
          </motion.aside>
        </div>
      </section>

      {/* ── 2 · Form + info panel ── */}
      <section className="ctx-form-sec">
        <motion.div className="ctx-panel" {...rise()}>
          {/* info rail */}
          <aside className="ctx-aside">
            <span className="ctx-aside-glow" aria-hidden />
            <div className="ctx-aside-in">
              <Kicker no="/ 01" label="Direct lines" light />
              <h2 className="ctx-aside-h">Reach the <span className="g">right team.</span></h2>
              <p className="ctx-aside-p">One group, five companies, eight markets. Tell us what you need and we'll route you to the team that can help.</p>
              <div className="ctx-aside-lines">
                {LINES.map((c, i) => (
                  <a key={i} href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="ctx-aside-line">
                    <span className="ctx-aside-line-ic"><c.Icon size={17} /></span>
                    <span>
                      <span className="ctx-aside-line-t">{c.t}</span>
                      <span className="ctx-aside-line-s">{c.s}</span>
                    </span>
                  </a>
                ))}
              </div>
              <div className="ctx-aside-foot"><Clock size={13} /> Avg. response · within 1 business day</div>
            </div>
          </aside>

          {/* form */}
          <div className="ctx-form">
            <Kicker no="/ 02" label="Send a message" />
            <h2 className="ctx-form-h">Say <span className="g">hello.</span></h2>
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div key="ok" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4, ease: EASE }} className="ctx-ok">
                  <CheckCircle size={52} color={GREEN} strokeWidth={1.5} />
                  <h3 className="ctx-ok-h">Message ready!</h3>
                  <p className="ctx-ok-p">Thanks, {form.name || 'there'} — your details are captured. Our team will be in touch shortly.</p>
                  <button className="pk-cta-btn" onClick={() => { setSubmitted(false); setForm({ name: '', email: '', company: '', service: '', message: '' }) }}><span>Send another</span></button>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={handleSubmit} initial={{ opacity: 1 }} exit={{ opacity: 0 }} className="ctx-fields">
                  <Field id="ctx-name" label="Name" placeholder="Jane Doe" {...set('name')} />
                  <Field id="ctx-email" label="Email address" placeholder="jane@company.com" type="email" {...set('email')} />
                  <Field id="ctx-company" label="Company (optional)" placeholder="Company name" {...set('company')} />
                  <ServiceField value={form.service} onChange={v => setForm(f => ({ ...f, service: v }))} />
                  <Field id="ctx-message" label="Message" placeholder="Tell us a little more…" tag="textarea" {...set('message')} />
                  <div style={{ marginTop: 'clamp(28px,3vw,40px)' }}>
                    <button type="submit" disabled={submitting} className="pk-cta-btn" style={{ opacity: submitting ? 0.7 : 1, cursor: submitting ? 'not-allowed' : 'pointer' }}>
                      <span>{submitting ? 'Sending…' : 'Send message'}</span>
                      <ArrowRight size={17} strokeWidth={2.4} />
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </section>

      {/* ── 3 · Where we are ── */}
      <section className="ctx-off-sec">
        <div className="ctx-off-in">
          <motion.div className="ctx-off-head" {...rise()}>
            <Kicker no="/ 03" label="Where we are" />
            <h2 className="ctx-off-h2">Eight markets, <span className="g">one group.</span></h2>
          </motion.div>

          {/* featured head office */}
          <motion.a className="ctx-feat" href={MAPS(HEAD.addr)} target="_blank" rel="noopener noreferrer" {...rise(0.05)}>
            <span className="ctx-feat-glow" aria-hidden />
            <MapPin className="ctx-feat-ghost" size={150} strokeWidth={1} aria-hidden />
            <div className="ctx-feat-l">
              <span className="ctx-feat-tag">{HEAD.tag}</span>
              <h3 className="ctx-feat-city">{HEAD.city}</h3>
              <p className="ctx-feat-addr">{HEAD.addr}</p>
            </div>
            <span className="ctx-feat-link">View on map <ArrowUpRight size={16} strokeWidth={2.4} /></span>
          </motion.a>

          {/* other offices */}
          <div className="ctx-off">
            {OFFICES.map((o, i) => (
              <motion.a key={o.city} href={MAPS(o.addr)} target="_blank" rel="noopener noreferrer" className="ctx-off-card"
                initial={reduce ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: (i % 3) * 0.07, ease: EASE }}>
                <div className="ctx-off-tag">{o.tag}</div>
                <div className="ctx-off-city">{o.city}</div>
                <p className="ctx-off-addr">{o.addr}</p>
                <span className="ctx-off-link">View on map <ArrowRight size={13} strokeWidth={2.4} /></span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      <FlyFooter />

      <style>{`
        .g { color:${GREEN}; }
        .ctx-eyebrow { display:inline-flex; align-items:center; gap:10px; margin:0; font-family:'Inter',sans-serif; font-weight:700; font-size:clamp(10px,0.8vw,12px); letter-spacing:2.5px; text-transform:uppercase; color:${GREEN}; }
        .ctx-eyebrow-dot { width:7px; height:7px; border-radius:50%; background:${GREEN}; box-shadow:0 0 0 4px rgba(60,185,140,0.16); }
        .ctx-kicker { display:flex; align-items:center; gap:12px; }
        .ctx-kicker-no { font-family:'Poppins',sans-serif; font-weight:700; font-size:13px; color:${GREEN}; letter-spacing:1px; }
        .ctx-kicker-rule { width:clamp(24px,3vw,44px); height:1px; background:rgba(26,43,60,0.22); }
        .ctx-kicker-lb { font-family:'Inter',sans-serif; font-weight:700; font-size:clamp(10px,0.8vw,12px); letter-spacing:2.5px; text-transform:uppercase; color:${MUTED}; }
        .ctx-kicker.lt .ctx-kicker-rule { background:rgba(255,255,255,0.22); }
        .ctx-kicker.lt .ctx-kicker-lb { color:rgba(255,255,255,0.55); }
        .ctx-kicker.lt .ctx-kicker-no { color:${GREEN}; }

        /* ── 1 · Hero ── */
        .ctx-hero { position:relative; overflow:hidden;
          background: radial-gradient(70% 60% at 92% 6%, rgba(60,185,140,0.12), transparent 58%), linear-gradient(180deg,#ffffff,#f3faf7);
          padding: clamp(104px,12vw,170px) clamp(24px,5vw,80px) clamp(48px,6vw,84px); }
        .ctx-hero-mark { position:absolute; right:2vw; top:30%; font-family:'Poppins',sans-serif; font-weight:800; font-size:clamp(180px,26vw,420px); line-height:0.7; color:rgba(60,185,140,0.05); pointer-events:none; user-select:none; }
        .ctx-hero-in { position:relative; z-index:1; max-width:1760px; margin:0 auto; display:grid; grid-template-columns:1.3fr 0.7fr; gap:clamp(32px,5vw,90px); align-items:end; }
        .ctx-hero-h1 { font-family:'Poppins',sans-serif; font-weight:700; font-size:clamp(44px,7.6vw,116px); line-height:1.0; letter-spacing:-0.04em; color:${NAVY}; margin:clamp(18px,2.4vw,30px) 0 0; }
        .ctx-hero-side { border-top:2px solid ${NAVY}; padding-top:clamp(18px,2vw,26px); }
        .ctx-hero-lead { font-family:'Inter',sans-serif; font-size:clamp(14px,1.1vw,17px); color:${MUTED}; line-height:1.85; margin:0 0 clamp(20px,2.4vw,28px); }
        .ctx-hero-lines { display:flex; flex-direction:column; }
        .ctx-hero-line { display:flex; align-items:center; gap:14px; text-decoration:none; padding:clamp(12px,1.4vw,16px) 0; border-top:1px solid rgba(26,43,60,0.12); transition:padding-left 0.35s cubic-bezier(0.16,1,0.3,1); }
        .ctx-hero-line:hover { padding-left:8px; }
        .ctx-hero-line-ic { display:inline-flex; align-items:center; justify-content:center; width:38px; height:38px; border-radius:11px; background:rgba(60,185,140,0.12); color:${GREEN}; flex-shrink:0; transition:background 0.3s ease, color 0.3s ease; }
        .ctx-hero-line:hover .ctx-hero-line-ic { background:${GREEN}; color:#fff; }
        .ctx-hero-line-tx { display:flex; flex-direction:column; gap:2px; flex:1; min-width:0; }
        .ctx-hero-line-t { font-family:'Poppins',sans-serif; font-weight:600; font-size:clamp(14px,1.05vw,16px); color:${NAVY}; letter-spacing:-0.01em; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
        .ctx-hero-line-s { font-family:'Inter',sans-serif; font-size:12px; color:${MUTED}; }
        .ctx-hero-line-go { color:rgba(26,43,60,0.3); transition:transform 0.35s ease, color 0.3s ease; }
        .ctx-hero-line:hover .ctx-hero-line-go { color:${GREEN}; transform:translate(2px,-2px); }

        /* ── 2 · Form panel ── */
        .ctx-form-sec { background:#fff; padding: clamp(36px,5vw,80px) clamp(24px,5vw,80px) clamp(56px,7vw,110px); }
        .ctx-panel { max-width:1500px; margin:0 auto; display:grid; grid-template-columns:0.82fr 1.18fr; border-radius:28px; overflow:hidden; border:1px solid rgba(26,43,60,0.1); box-shadow:0 50px 100px -50px rgba(19,41,61,0.4); background:#fff; }
        .ctx-aside { position:relative; overflow:hidden; background:linear-gradient(165deg, ${NAVY} 0%, #1b3a52 100%); padding:clamp(36px,4vw,60px); }
        .ctx-aside::before { content:''; position:absolute; inset:0; pointer-events:none; background-image:radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px); background-size:24px 24px; }
        .ctx-aside-glow { position:absolute; bottom:-90px; left:-80px; width:320px; height:320px; border-radius:50%; background:radial-gradient(circle, rgba(60,185,140,0.2), transparent 64%); pointer-events:none; }
        .ctx-aside-in { position:relative; z-index:1; }
        .ctx-aside-h { font-family:'Poppins',sans-serif; font-weight:700; font-size:clamp(26px,2.8vw,40px); color:#fff; letter-spacing:-0.02em; line-height:1.1; margin:18px 0 16px; }
        .ctx-aside-p { font-family:'Inter',sans-serif; font-size:14.5px; color:rgba(255,255,255,0.55); line-height:1.8; margin:0 0 clamp(24px,3vw,34px); }
        .ctx-aside-lines { display:flex; flex-direction:column; border-top:1px solid rgba(255,255,255,0.1); }
        .ctx-aside-line { display:flex; align-items:flex-start; gap:14px; text-decoration:none; padding:16px 0; border-bottom:1px solid rgba(255,255,255,0.1); transition:padding-left 0.35s cubic-bezier(0.16,1,0.3,1); }
        .ctx-aside-line:hover { padding-left:6px; }
        .ctx-aside-line-ic { color:${GREEN}; margin-top:1px; flex-shrink:0; }
        .ctx-aside-line-t { display:block; font-family:'Inter',sans-serif; font-size:14.5px; font-weight:600; color:#fff; }
        .ctx-aside-line-s { display:block; font-family:'Inter',sans-serif; font-size:12.5px; color:rgba(255,255,255,0.42); margin-top:3px; }
        .ctx-aside-foot { display:inline-flex; align-items:center; gap:8px; margin-top:clamp(22px,2.6vw,30px); font-family:'Inter',sans-serif; font-size:12px; font-weight:600; letter-spacing:0.5px; color:rgba(255,255,255,0.5); }
        .ctx-aside-foot svg { color:${GREEN}; }

        .ctx-form { padding:clamp(36px,4.4vw,68px); display:flex; flex-direction:column; }
        .ctx-form-h { font-family:'Poppins',sans-serif; font-weight:700; font-size:clamp(30px,4vw,52px); color:${NAVY}; letter-spacing:-0.03em; line-height:1.1; padding-bottom:0.06em; margin:16px 0 clamp(20px,2.4vw,30px); }
        .ctx-fields { display:flex; flex-direction:column; }
        .ctx-field { border-bottom:1.5px solid rgba(26,43,60,0.14); padding:14px 0; transition:border-color 0.25s ease; }
        .ctx-field.focus, .ctx-field:focus-within { border-color:${GREEN}; }
        .ctx-label { display:block; font-family:'Inter',sans-serif; font-size:11px; font-weight:700; letter-spacing:1.5px; text-transform:uppercase; color:${MUTED}; margin-bottom:8px; }
        .ctx-field.focus .ctx-label, .ctx-field:focus-within .ctx-label { color:${GREEN}; }
        .ctx-select { width:100%; display:flex; align-items:center; justify-content:space-between; gap:12px; background:transparent; border:none; padding:0; cursor:pointer; font-family:'Inter',sans-serif; font-size:clamp(15px,1.1vw,17px); font-weight:500; }
        .ctx-menu { position:absolute; top:100%; left:0; right:0; z-index:50; margin-top:8px; background:#fff; border:1px solid rgba(26,43,60,0.1); border-radius:14px; box-shadow:0 24px 50px -16px rgba(19,41,61,0.22); max-height:280px; overflow-y:auto; padding:6px; }
        .ct-opt:hover { background:rgba(60,185,140,0.07) !important; }
        input::placeholder, textarea::placeholder { color:rgba(26,43,60,0.32); font-weight:500; }

        .ctx-ok { display:flex; flex-direction:column; gap:16px; align-items:flex-start; padding:24px 0; }
        .ctx-ok-h { font-family:'Poppins',sans-serif; font-size:26px; font-weight:700; color:${NAVY}; margin:0; letter-spacing:-0.02em; }
        .ctx-ok-p { font-family:'Inter',sans-serif; font-size:15px; color:${MUTED}; line-height:1.7; margin:0; max-width:380px; }

        .pk-cta-btn { position:relative; overflow:hidden; display:inline-flex; align-items:center; gap:10px; background:${GREEN}; color:#fff; border:none; border-radius:14px; padding:15px 36px; font-family:'Poppins',sans-serif; font-size:16px; font-weight:500; box-shadow:0 16px 34px -14px rgba(60,185,140,0.75); transition:transform 0.25s cubic-bezier(0.16,1,0.3,1), background 0.25s ease, box-shadow 0.25s ease; cursor:pointer; }
        .pk-cta-btn span { position:relative; z-index:1; }
        .pk-cta-btn::after { content:''; position:absolute; top:0; left:-120%; width:55%; height:100%; background:linear-gradient(110deg, transparent, rgba(255,255,255,0.45), transparent); transform:skewX(-18deg); transition:left 0.7s cubic-bezier(0.16,1,0.3,1); }
        .pk-cta-btn:hover { transform:translateY(-2px); background:#34ab80; }
        .pk-cta-btn:hover::after { left:135%; }

        /* ── 3 · Offices ── */
        .ctx-off-sec { background:linear-gradient(180deg,#ffffff,#f3faf7); padding:clamp(56px,7vw,120px) clamp(24px,5vw,80px); }
        .ctx-off-in { max-width:1760px; margin:0 auto; }
        .ctx-off-head { margin-bottom:clamp(28px,3.4vw,44px); }
        .ctx-off-h2 { font-family:'Poppins',sans-serif; font-size:clamp(30px,4.2vw,58px); font-weight:700; color:${NAVY}; letter-spacing:-0.03em; line-height:1.08; margin:16px 0 0; }

        .ctx-feat { position:relative; overflow:hidden; display:flex; align-items:flex-end; justify-content:space-between; gap:24px; flex-wrap:wrap; text-decoration:none; border-radius:26px; margin-bottom:16px; padding:clamp(30px,3.6vw,56px); background:linear-gradient(158deg, ${NAVY} 0%, #1b3a52 100%); box-shadow:0 40px 80px -44px rgba(19,41,61,0.5); transition:transform 0.5s cubic-bezier(0.16,1,0.3,1), box-shadow 0.5s ease; }
        .ctx-feat:hover { transform:translateY(-6px); box-shadow:0 54px 100px -48px rgba(19,41,61,0.6); }
        .ctx-feat-glow { position:absolute; top:-40%; right:-10%; width:50%; height:120%; border-radius:50%; background:radial-gradient(circle, rgba(60,185,140,0.26), transparent 62%); pointer-events:none; }
        .ctx-feat-ghost { position:absolute; right:clamp(20px,4vw,60px); bottom:-30px; color:rgba(60,185,140,0.14); pointer-events:none; }
        .ctx-feat-l { position:relative; z-index:1; }
        .ctx-feat-tag { font-family:'Inter',sans-serif; font-size:10.5px; font-weight:800; letter-spacing:2px; text-transform:uppercase; color:${GREEN}; }
        .ctx-feat-city { font-family:'Poppins',sans-serif; font-weight:700; font-size:clamp(34px,5vw,72px); color:#fff; letter-spacing:-0.03em; line-height:1; margin:12px 0 14px; }
        .ctx-feat-addr { font-family:'Inter',sans-serif; font-size:clamp(14px,1.1vw,16px); color:rgba(255,255,255,0.6); line-height:1.7; margin:0; max-width:40ch; }
        .ctx-feat-link { position:relative; z-index:1; display:inline-flex; align-items:center; gap:8px; font-family:'Inter',sans-serif; font-size:12px; font-weight:700; letter-spacing:1.5px; text-transform:uppercase; color:${GREEN}; transition:gap 0.3s ease; }
        .ctx-feat:hover .ctx-feat-link { gap:14px; }

        .ctx-off { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; }
        .ctx-off-card { display:flex; flex-direction:column; text-decoration:none; position:relative; overflow:hidden; background:linear-gradient(158deg,#ffffff,#f6fbf9); border:1px solid rgba(26,43,60,0.08); border-radius:22px; padding:clamp(26px,2.6vw,36px); transition:transform 0.45s cubic-bezier(0.16,1,0.3,1), box-shadow 0.45s ease, border-color 0.45s ease; }
        .ctx-off-card::after { content:''; position:absolute; top:-30%; right:-25%; width:55%; height:75%; border-radius:50%; background:radial-gradient(circle, rgba(60,185,140,0.14), transparent 70%); opacity:0; transition:opacity 0.45s ease; pointer-events:none; }
        .ctx-off-card:hover { transform:translateY(-8px); border-color:${GREEN}; box-shadow:0 34px 64px -34px rgba(60,185,140,0.5); }
        .ctx-off-card:hover::after { opacity:1; }
        .ctx-off-tag { font-family:'Inter',sans-serif; font-size:10px; font-weight:800; letter-spacing:2px; text-transform:uppercase; color:${GREEN}; }
        .ctx-off-city { font-family:'Poppins',sans-serif; font-weight:600; font-size:clamp(20px,1.9vw,26px); color:${NAVY}; margin:10px 0 10px; letter-spacing:-0.01em; }
        .ctx-off-addr { font-family:'Inter',sans-serif; font-size:13.5px; color:${MUTED}; line-height:1.6; margin:0 0 18px; flex:1; }
        .ctx-off-link { display:inline-flex; align-items:center; gap:7px; font-family:'Inter',sans-serif; font-size:12px; font-weight:700; letter-spacing:1px; text-transform:uppercase; color:${NAVY}; transition:gap 0.3s ease, color 0.3s ease; }
        .ctx-off-card:hover .ctx-off-link { color:${GREEN}; gap:12px; }

        /* ── responsive ── */
        @media (max-width:980px){
          .ctx-hero-in { grid-template-columns:1fr; align-items:start; gap:clamp(28px,5vw,40px); }
          .ctx-panel { grid-template-columns:1fr; }
          .ctx-off { grid-template-columns:1fr 1fr; }
        }
        @media (max-width:600px){
          .ctx-off { grid-template-columns:1fr; }
        }
        @media (min-width:1920px){
          .ctx-hero-in, .ctx-off-in { max-width:1900px; } .ctx-panel { max-width:1640px; }
          .ctx-hero { padding:clamp(124px,9.5vw,176px) clamp(40px,5vw,90px) clamp(110px,9vw,190px); }
          .ctx-hero-h1 { font-size:140px; }
          .ctx-hero-lead { font-size:19px; }
          .ctx-hero-line-t { font-size:18px; }
          .ctx-off-h2 { font-size:72px; }
          .ctx-feat-city { font-size:88px; }
          .ctx-aside-h { font-size:48px; }
          .ctx-form-h { font-size:62px; }
          .ctx-off-city { font-size:30px; }
        }
        @media (min-width:2560px){
          .ctx-hero-in, .ctx-off-in { max-width:2400px; } .ctx-panel { max-width:2000px; }
          .ctx-hero { padding:clamp(170px,8.5vw,228px) clamp(60px,5vw,120px) clamp(150px,9vw,250px); }
          .ctx-hero-h1 { font-size:194px; }
          .ctx-hero-mark { font-size:560px; }
          .ctx-hero-lead { font-size:24px; }
          .ctx-hero-line-t { font-size:22px; }
          .ctx-hero-line-s { font-size:15px; }
          .ctx-off-h2 { font-size:92px; }
          .ctx-feat-city { font-size:112px; }
          .ctx-feat-addr { font-size:21px; }
          .ctx-aside-h { font-size:60px; }
          .ctx-aside-p { font-size:18px; }
          .ctx-form-h { font-size:78px; }
          .ctx-off-city { font-size:36px; }
          .ctx-off-addr { font-size:16px; }
        }
      `}</style>
    </div>
  )
}
