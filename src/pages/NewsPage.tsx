import { motion } from 'framer-motion'
import { ArrowRight, Clock } from 'lucide-react'
import { Header } from '../components/Header/Header'
import { Footer } from '../components/Footer'
import { InnerHero, PageCTA, NAVY, GREEN, CREAM, ease } from '../components/InnerHero'

const NEWS = [
  {
    type: 'Company News',
    date: 'Jun 2025',
    readTime: '3 min',
    title: 'BIVRY Expands Fleet With Next-Gen Low-Emission Vehicles',
    excerpt: 'As part of our ongoing sustainability commitment, BIVRY has added a new batch of Euro 6-compliant and hybrid vehicles to our national fleet - meaningfully reducing average emissions per consignment across all major interstate routes.',
    highlight: true,
  },
  {
    type: 'Partnership',
    date: 'May 2025',
    readTime: '2 min',
    title: 'BIVRY and Allied Express Deepen National Coverage Agreement',
    excerpt: "A new network-sharing arrangement with Allied Express extends BIVRY's regional and remote delivery reach to additional postcode zones across Queensland and Western Australia.",
  },
  {
    type: 'Award',
    date: 'Apr 2025',
    readTime: '2 min',
    title: 'BIVRY Named Among Top Australian Freight Providers for 2025',
    excerpt: "Logistics Australia recognised BIVRY among Australia's top emerging freight brands, citing client satisfaction scores, on-time delivery performance, and technology investment.",
  },
  {
    type: 'Service Launch',
    date: 'Apr 2025',
    readTime: '3 min',
    title: 'New Perth Depot Opens to Serve Western Australia Clients',
    excerpt: "Our latest national depot officially opened in Perth's Kewdale logistics precinct, enabling same-day metro delivery and fast next-day delivery to key regional centres.",
  },
  {
    type: 'Technology',
    date: 'Mar 2025',
    readTime: '4 min',
    title: 'BIVRY Portal v3.0 Launched With Live ETA and Carbon Dashboard',
    excerpt: 'Our redesigned customer portal introduces real-time estimated arrival windows, digital proof-of-delivery history, and a new carbon emissions dashboard for Scope 3 reporting.',
  },
  {
    type: 'Company News',
    date: 'Mar 2025',
    readTime: '2 min',
    title: 'BIVRY Joins the Australian Logistics Council',
    excerpt: 'BIVRY has become a member of the Australian Logistics Council (ALC), contributing to national policy discussions on freight infrastructure and road safety standards.',
  },
  {
    type: 'Service Launch',
    date: 'Feb 2025',
    readTime: '3 min',
    title: 'Contract Logistics Service Launches for Enterprise Clients',
    excerpt: "BIVRY's dedicated contract logistics offering is now available for enterprise clients requiring managed freight and warehousing under a customised service-level agreement.",
  },
  {
    type: 'Partnership',
    date: 'Jan 2025',
    readTime: '2 min',
    title: 'BIVRY Partners With Customs House for International Receiving',
    excerpt: 'A new integration with our customs broker partners streamlines international receiving, with automated documentation handoffs reducing clearance time for regular importers.',
  },
  {
    type: 'Community',
    date: 'Jan 2025',
    readTime: '2 min',
    title: 'BIVRY Sponsors Melbourne Logistics & Supply Chain Conference',
    excerpt: "Presenting sponsor of MLS&C 2025, connecting with Australia's logistics community and sharing insights on the future of last-mile delivery.",
  },
  {
    type: 'Technology',
    date: 'Dec 2024',
    readTime: '3 min',
    title: 'API Integration Released for Shopify and WooCommerce Stores',
    excerpt: 'E-commerce merchants can now connect their online stores directly to BIVRY for automated booking, real-time rates, and branded tracking - no manual data entry required.',
  },
]

const TYPE_COLORS: Record<string, string> = {
  'Company News':   NAVY,
  'Partnership':    GREEN,
  'Award':          '#F5A623',
  'Service Launch': '#9B59B6',
  'Technology':     '#5B8DEF',
  'Community':      '#27AE60',
}

const PRESS_STATS = [
  { label: 'Press Releases',  value: 'On Request'            },
  { label: 'Media Mentions',  value: 'Industry Publications' },
  { label: 'Industry Awards', value: 'Top Emerging Brand'    },
  { label: 'Media Kit',       value: 'Available Now'         },
]

export function NewsPage() {
  return (
    <div style={{ background: CREAM, overflowX: 'hidden' }}>
      <Header />
      <main>
        <InnerHero
          badge="Updates"
          line1="LATEST"
          line2="NEWS."
          description="Stay up to date with BIVRY's latest announcements, partnerships, service launches, and industry news."
          meta={[
            { label: 'Latest Update', value: 'Jun 2025'                },
            { label: 'Categories',    value: 'Company, Tech, Partners' },
            { label: 'Cadence',       value: 'Regular Updates'         },
            { label: 'Press',         value: 'connect@bivry.com.au'      },
          ]}
        />

        {/* ── FEATURED ANNOUNCEMENT ─────────────────────────────────── */}
        <section style={{ background: NAVY, padding: 'clamp(64px,9vw,120px) clamp(24px,5vw,80px)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.025) 1px, transparent 1px)', backgroundSize: '28px 28px', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', top: -100, right: -100, width: 600, height: 600, borderRadius: '50%', background: `radial-gradient(circle, ${GREEN}0D 0%, transparent 60%)`, pointerEvents: 'none' }} />

          <div style={{ maxWidth: 1760, margin: '0 auto', position: 'relative', zIndex: 1 }} className="news-featured-inner">
            {/* Eyebrow */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 40 }}>
              <div style={{ width: 28, height: 2, background: GREEN, borderRadius: 2 }} />
              <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.32)' }}>Latest Announcement</span>
              <div style={{ width: 28, height: 2, background: 'rgba(255,255,255,0.08)', borderRadius: 2 }} />
            </div>

            {/* Editorial card */}
            <motion.div
              initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.9, ease }}
              style={{ borderRadius: 24, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', display: 'grid', gridTemplateColumns: '1fr 360px' }}
              className="news-featured-card"
            >
              {/* LEFT — cream panel */}
              <div style={{ background: CREAM, padding: 'clamp(40px,4vw,64px)', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: -20, right: -12, fontSize: 'clamp(80px,14vw,200px)', fontWeight: 900, color: 'rgba(8,33,60,0.04)', letterSpacing: '-0.05em', lineHeight: 1, pointerEvents: 'none', userSelect: 'none' }}>01</div>

                {/* Meta */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32, flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
                  <span style={{ fontSize: 10, fontWeight: 800, color: '#fff', background: TYPE_COLORS[NEWS[0].type] || NAVY, borderRadius: 100, padding: '5px 14px', letterSpacing: '1.5px', textTransform: 'uppercase' }}>{NEWS[0].type}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: 'rgba(8,33,60,0.38)', fontWeight: 600 }}>
                    <Clock size={11} color="rgba(8,33,60,0.35)" /> {NEWS[0].date}
                  </span>
                  <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'rgba(8,33,60,0.2)', flexShrink: 0 }} />
                  <span style={{ fontSize: 12, color: 'rgba(8,33,60,0.38)', fontWeight: 600 }}>{NEWS[0].readTime} read</span>
                </div>

                {/* Headline */}
                <h2 style={{ fontSize: 'clamp(32px,4.5vw,72px)', fontWeight: 900, color: NAVY, letterSpacing: '-0.04em', lineHeight: 0.95, margin: '0 0 28px', textTransform: 'uppercase', position: 'relative', zIndex: 1 }}>
                  {NEWS[0].title.split(' ').slice(0, -3).join(' ')}{' '}
                  <span style={{ color: GREEN }}>{NEWS[0].title.split(' ').slice(-3).join(' ')}</span>
                </h2>

                {/* Accent divider */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
                  <div style={{ width: 44, height: 3, background: GREEN, borderRadius: 2, flexShrink: 0 }} />
                  <div style={{ flex: 1, height: 1, background: 'rgba(8,33,60,0.08)' }} />
                </div>

                {/* Excerpt */}
                <p style={{ fontSize: 'clamp(14px,1.15vw,17px)', color: 'rgba(8,33,60,0.55)', lineHeight: 1.88, margin: '0 0 40px', flex: 1, position: 'relative', zIndex: 1 }}>{NEWS[0].excerpt}</p>

                {/* CTA */}
                <div>
                  <a href="/" style={{
                    display: 'inline-flex', alignItems: 'center', gap: 10,
                    background: NAVY, color: '#fff', borderRadius: 100,
                    padding: '14px 30px', fontSize: 14, fontWeight: 700,
                    textDecoration: 'none', transition: 'all 0.22s ease', minHeight: 44,
                  }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = GREEN }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = NAVY }}
                  >
                    <ArrowRight size={14} strokeWidth={2.5} /> Read Full Story
                  </a>
                </div>
              </div>

              {/* RIGHT — dark panel */}
              <div style={{ background: '#061828', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 'clamp(32px,3vw,48px)' }}>
                <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(135deg, rgba(255,255,255,0.015) 0px, rgba(255,255,255,0.015) 1px, transparent 1px, transparent 32px)', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', bottom: -80, right: -80, width: 280, height: 280, borderRadius: '50%', background: `radial-gradient(circle, ${GREEN}22 0%, transparent 65%)`, pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: `linear-gradient(to bottom, ${GREEN}, ${GREEN}00)` }} />

                {/* Index */}
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', marginBottom: 8 }}>Announcement No.</div>
                  <div style={{ fontSize: 'clamp(56px,8vw,100px)', fontWeight: 900, color: 'rgba(255,255,255,0.06)', letterSpacing: '-0.05em', lineHeight: 1 }}>01</div>
                </div>

                <div style={{ height: 1, background: 'rgba(255,255,255,0.07)', position: 'relative', zIndex: 1 }} />

                {/* Stats */}
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    {([
                      { label: 'Read Time', value: NEWS[0].readTime },
                      { label: 'Category',  value: NEWS[0].type     },
                      { label: 'Published', value: NEWS[0].date     },
                      { label: 'Author',    value: 'BIVRY Team'     },
                    ] as { label: string; value: string }[]).map(item => (
                      <div key={item.label}>
                        <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', marginBottom: 4 }}>{item.label}</div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.55)' }}>{item.value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Live indicator */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 9, position: 'relative', zIndex: 1 }}>
                  <div style={{ width: 7, height: 7, borderRadius: '50%', background: GREEN, boxShadow: `0 0 8px ${GREEN}80` }} />
                  <span style={{ fontSize: 12, fontWeight: 700, color: GREEN, letterSpacing: '0.3px' }}>Latest Update</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── NEWS FEED ─────────────────────────────────────────────── */}
        <section style={{ background: '#fff', padding: 'clamp(72px,10vw,120px) clamp(24px,5vw,80px)' }}>
          <div style={{ maxWidth: 1760, margin: '0 auto' }} className="news-list-inner">
            {/* Section header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 'clamp(40px,5vw,64px)', flexWrap: 'wrap', gap: 24 }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 16 }}>
                  <div style={{ width: 3, height: 14, background: GREEN, borderRadius: 2 }} />
                  <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(8,33,60,0.38)' }}>All Stories</span>
                </div>
                <h2 style={{ fontSize: 'clamp(52px,6vw,92px)', fontWeight: 900, color: NAVY, letterSpacing: '-0.04em', lineHeight: 0.92, margin: 0, textTransform: 'uppercase' }}>
                  COMPANY<br /><span style={{ color: GREEN }}>UPDATES.</span>
                </h2>
              </div>

              {/* Filter pills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {(['All', ...Object.keys(TYPE_COLORS)] as string[]).map((type, i) => (
                  <button key={type} style={{
                    padding: '10px 16px', borderRadius: 100, fontSize: 12, fontWeight: 700,
                    color: i === 0 ? '#fff' : NAVY,
                    background: i === 0 ? NAVY : 'transparent',
                    border: '1.5px solid', borderColor: i === 0 ? NAVY : 'rgba(8,33,60,0.12)',
                    cursor: 'pointer', transition: 'all 0.18s ease', minHeight: 40,
                  }}
                    onMouseEnter={e => {
                      if (i !== 0) {
                        const el = e.currentTarget as HTMLElement
                        el.style.background = TYPE_COLORS[type] || NAVY
                        el.style.color = '#fff'
                        el.style.borderColor = TYPE_COLORS[type] || NAVY
                      }
                    }}
                    onMouseLeave={e => {
                      if (i !== 0) {
                        const el = e.currentTarget as HTMLElement
                        el.style.background = 'transparent'
                        el.style.color = NAVY
                        el.style.borderColor = 'rgba(8,33,60,0.12)'
                      }
                    }}
                  >{type}</button>
                ))}
              </div>
            </div>

            {/* Rows */}
            <div>
              {NEWS.slice(1).map((item, i) => (
                <motion.article key={item.title}
                  initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.05, ease }}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'clamp(140px,18vw,220px) 1fr auto',
                    gap: 'clamp(20px,3vw,48px)',
                    padding: 'clamp(24px,3vw,36px) 0',
                    borderBottom: '1px solid rgba(8,33,60,0.06)',
                    alignItems: 'center',
                    cursor: 'pointer',
                  }}
                  className="news-row"
                >
                  {/* Left: type badge + meta */}
                  <div>
                    <span style={{
                      fontSize: 10, fontWeight: 800, letterSpacing: '1.5px', textTransform: 'uppercase',
                      color: TYPE_COLORS[item.type] || GREEN,
                      background: `${TYPE_COLORS[item.type] || GREEN}18`,
                      borderRadius: 100, padding: '4px 11px',
                      display: 'inline-block', marginBottom: 10,
                    }}>{item.type}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5, flexWrap: 'wrap' }}>
                      <Clock size={11} color="rgba(8,33,60,0.3)" />
                      <span style={{ fontSize: 12, color: 'rgba(8,33,60,0.38)', fontWeight: 600 }}>{item.date}</span>
                      <span style={{ fontSize: 12, color: 'rgba(8,33,60,0.2)' }}>·</span>
                      <span style={{ fontSize: 12, color: 'rgba(8,33,60,0.38)', fontWeight: 600 }}>{item.readTime} read</span>
                    </div>
                  </div>

                  {/* Center: title + excerpt */}
                  <div>
                    <h3 style={{ fontSize: 'clamp(24px,2vw,28px)', fontWeight: 900, color: NAVY, margin: '0 0 8px', letterSpacing: '-0.03em', lineHeight: 1.2, textTransform: 'uppercase' }}>{item.title}</h3>
                    <p style={{ fontSize: 'clamp(13px,1vw,14px)', color: 'rgba(8,33,60,0.45)', lineHeight: 1.72, margin: 0 }}>{item.excerpt.slice(0, 130)}…</p>
                  </div>

                  {/* Right: arrow */}
                  <a href="/" style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    width: 44, height: 44, borderRadius: '50%', flexShrink: 0,
                    border: '1.5px solid rgba(8,33,60,0.12)',
                    color: NAVY, transition: 'all 0.2s ease', textDecoration: 'none',
                  }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = NAVY; el.style.color = '#fff'; el.style.borderColor = NAVY }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'transparent'; el.style.color = NAVY; el.style.borderColor = 'rgba(8,33,60,0.12)' }}
                  >
                    <ArrowRight size={16} strokeWidth={2.2} />
                  </a>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* ── PRESS & MEDIA ─────────────────────────────────────────── */}
        <section style={{ background: NAVY, padding: 'clamp(64px,8vw,100px) clamp(24px,5vw,80px)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.025) 1px, transparent 1px)', backgroundSize: '28px 28px', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', top: -80, left: -80, width: 440, height: 440, borderRadius: '50%', background: `radial-gradient(circle, ${GREEN}0E 0%, transparent 60%)`, pointerEvents: 'none' }} />

          <div style={{ maxWidth: 1760, margin: '0 auto', position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(40px,5vw,80px)', alignItems: 'center' }} className="press-grid">
            {/* Left */}
            <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 20 }}>
                <div style={{ width: 3, height: 14, background: GREEN, borderRadius: 2 }} />
                <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.32)' }}>Media</span>
              </div>
              <h2 style={{ fontSize: 'clamp(52px,6vw,92px)', fontWeight: 900, color: '#fff', letterSpacing: '-0.04em', lineHeight: 0.92, margin: '0 0 24px', textTransform: 'uppercase' }}>
                PRESS &<br /><span style={{ color: GREEN }}>MEDIA.</span>
              </h2>
              <p style={{ fontSize: 'clamp(14px,1.15vw,17px)', color: 'rgba(255,255,255,0.45)', lineHeight: 1.85, margin: '0 0 36px', maxWidth: 480 }}>
                For press enquiries, interview requests, or media kit access, please contact our communications team directly.
              </p>
              <a href="mailto:media@bivry.com.au" style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                background: GREEN, color: '#fff', borderRadius: 100,
                padding: '14px 30px', fontSize: 14, fontWeight: 700,
                textDecoration: 'none', transition: 'all 0.22s ease', minHeight: 44,
              }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = '#fff'; el.style.color = NAVY }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = GREEN; el.style.color = '#fff' }}
              >
                <ArrowRight size={14} strokeWidth={2.5} /> connect@bivry.com.au
              </a>
            </motion.div>

            {/* Right: stat cards */}
            <motion.div
              initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7, ease, delay: 0.1 }}
              style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}
              className="press-mini-grid"
            >
              {PRESS_STATS.map((item, i) => (
                <div key={item.label} style={{
                  padding: 'clamp(20px,2vw,28px)', borderRadius: 16,
                  background: i === 0 ? GREEN : 'rgba(255,255,255,0.05)',
                  border: `1px solid ${i === 0 ? 'transparent' : 'rgba(255,255,255,0.08)'}`,
                }}>
                  <div style={{ fontSize: 'clamp(14px,1.1vw,17px)', fontWeight: 800, color: i === 0 ? '#fff' : 'rgba(255,255,255,0.7)', marginBottom: 6, letterSpacing: '-0.01em', lineHeight: 1.2 }}>{item.value}</div>
                  <div style={{ fontSize: 11, fontWeight: 800, color: i === 0 ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '1.5px' }}>{item.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        <PageCTA line1="BE PART OF" line2="THE STORY." buttonLabel="Talk to Our Team" />
      </main>
      <Footer />
      <style>{`
        @media (max-width: 900px) {
          .news-featured-card { grid-template-columns: 1fr !important; }
          .press-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 760px) {
          .news-row { grid-template-columns: 1fr !important; }
          .news-row > a { display: none !important; }
        }
        @media (max-width: 480px) {
          .press-mini-grid { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 1920px) {
          .news-featured-inner, .news-list-inner { max-width: 1900px !important; }
        }
        @media (min-width: 2560px) {
          .news-featured-inner, .news-list-inner { max-width: 2400px !important; }
        }
      `}</style>
    </div>
  )
}
