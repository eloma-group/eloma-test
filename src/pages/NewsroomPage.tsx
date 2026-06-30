import { motion } from 'framer-motion'
import { ArrowUpRight, Newspaper, Download } from 'lucide-react'
import { Header } from '../components/Header/Header'
import { FlyFooter } from '../components/FlyFooter'
import { PageHero, PageCTA, Eyebrow, NAVY, GREEN, MUTED, EASE } from '../components/PageKit'

const NEWS = [
  { tag: 'Announcement', date: 'Jun 2026', title: 'Eloma Group expands operations across eight global markets', body: 'The group deepens its presence in Australia, India, the USA, Canada, China, the UK, the UAE and Singapore.' },
  { tag: 'Company', date: 'May 2026', title: 'EG Digital launches new technology and growth division', body: 'A dedicated practice for web, software and digital marketing across the group and its partners.' },
  { tag: 'Partnership', date: 'May 2026', title: 'New strategic partnerships strengthen the supply network', body: 'Collaborations that bring businesses closer together across logistics and trade.' },
  { tag: 'Sustainability', date: 'Apr 2026', title: 'Eloma publishes its first responsible-growth commitments', body: 'A clear framework for environmental, social and governance accountability across all five companies.' },
  { tag: 'Company', date: 'Mar 2026', title: 'EG Transport scales regional logistics capacity', body: 'Investment in fleet and routes to keep every shipment moving on time, across the region.' },
]

const PRESS = [
  { t: 'Brand & Logo Pack', s: 'Logos, wordmarks and usage guidelines' },
  { t: 'Company Fact Sheet', s: 'Group overview, figures and structure' },
  { t: 'Media Enquiries', s: 'Contact our communications team' },
]

export function NewsroomPage() {
  const feat = NEWS[0]
  return (
    <div style={{ overflowX: 'hidden', background: '#fff' }}>
      <Header />

      <PageHero
        badge="Newsroom"
        line1="What's new"
        line2="at Eloma."
        description="Announcements, company updates and press from across the group — one place for the Eloma story as it unfolds."
      />

      {/* ── Featured news ── */}
      <section style={{ background: 'linear-gradient(180deg,#ffffff,#f3faf7)', padding: 'clamp(48px,6vw,90px) clamp(24px,5vw,80px)' }}>
        <div style={{ maxWidth: 1760, margin: '0 auto' }}>
          <motion.a href="/contact" className="nw-feat"
            initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: EASE }}>
            <div className="nw-feat-top">
              <span className="nw-tag">{feat.tag}</span>
              <span className="bl-meta">{feat.date}</span>
            </div>
            <h2 className="nw-feat-title">{feat.title}</h2>
            <p className="nw-feat-body">{feat.body}</p>
            <span className="nw-feat-link">Read the announcement <ArrowUpRight size={16} strokeWidth={2.4} /></span>
            <Newspaper className="nw-feat-ghost" size={220} strokeWidth={1} />
          </motion.a>
        </div>
      </section>

      {/* ── News list ── */}
      <section style={{ background: '#fff', padding: 'clamp(48px,6vw,90px) clamp(24px,5vw,80px) clamp(64px,8vw,120px)' }}>
        <div style={{ maxWidth: 1760, margin: '0 auto' }}>
          <div style={{ marginBottom: 'clamp(24px,3vw,40px)' }}><Eyebrow label="Latest updates" /></div>
          <div style={{ borderTop: '1px solid rgba(26,43,60,0.1)' }}>
            {NEWS.slice(1).map((n, i) => (
              <motion.a key={n.title} href="/contact" className="nw-row"
                initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.06, ease: EASE }}>
                <div className="nw-row-meta"><span className="nw-tag sm">{n.tag}</span><span className="bl-meta">{n.date}</span></div>
                <div className="nw-row-main">
                  <h3 className="nw-row-title">{n.title}</h3>
                  <p className="nw-row-body">{n.body}</p>
                </div>
                <span className="nw-row-arrow"><ArrowUpRight size={18} strokeWidth={2.4} /></span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Press kit ── */}
      <section style={{ background: 'linear-gradient(180deg,#ffffff,#f3faf7)', padding: 'clamp(56px,7vw,100px) clamp(24px,5vw,80px)' }}>
        <div style={{ maxWidth: 1760, margin: '0 auto' }}>
          <div style={{ marginBottom: 'clamp(28px,4vw,44px)' }}>
            <Eyebrow label="Press & media" />
            <h2 style={{ fontFamily: "'Poppins',sans-serif", fontSize: 'clamp(28px,4vw,52px)', fontWeight: 700, color: NAVY, letterSpacing: '-0.03em', lineHeight: 1.05, margin: '16px 0 0' }}>
              Media <span style={{ color: GREEN }}>resources.</span>
            </h2>
          </div>
          <div className="nw-press" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
            {PRESS.map((p, i) => (
              <motion.a key={p.t} href="/contact" className="nw-press-card"
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: i * 0.1, ease: EASE }}>
                <span className="nw-press-ic"><Download size={20} /></span>
                <div>
                  <div className="nw-press-t">{p.t}</div>
                  <div className="nw-press-s">{p.s}</div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      <PageCTA line1="Press or media" line2="enquiry?" sub="Reach our communications team and we'll respond quickly." buttonLabel="Contact Us" />
      <FlyFooter />

      <style>{`
        .nw-feat { position:relative; overflow:hidden; display:block; text-decoration:none; background:${NAVY}; border-radius:26px; padding: clamp(32px,4vw,64px); transition: transform 0.5s ${'cubic-bezier(0.16,1,0.3,1)'}, box-shadow 0.5s ease; }
        .nw-feat:hover { transform: translateY(-6px); box-shadow: 0 44px 90px -44px rgba(19,41,61,0.6); }
        .nw-feat-top { display:flex; align-items:center; gap:14px; margin-bottom:22px; position:relative; z-index:1; }
        .nw-feat-title { position:relative; z-index:1; font-family:'Poppins',sans-serif; font-weight:700; font-size:clamp(26px,3.4vw,52px); color:#fff; letter-spacing:-0.025em; line-height:1.1; margin:0 0 18px; max-width:18ch; }
        .nw-feat-body { position:relative; z-index:1; font-family:'Inter',sans-serif; font-size:clamp(14px,1.15vw,17px); color:rgba(255,255,255,0.6); line-height:1.8; margin:0 0 24px; max-width:60ch; }
        .nw-feat-link { position:relative; z-index:1; display:inline-flex; align-items:center; gap:8px; font-family:'Inter',sans-serif; font-size:13px; font-weight:700; letter-spacing:1px; text-transform:uppercase; color:${GREEN}; transition: gap 0.3s ease; }
        .nw-feat:hover .nw-feat-link { gap:14px; }
        .nw-feat-ghost { position:absolute; right:-30px; bottom:-40px; color:rgba(60,185,140,0.12); pointer-events:none; }
        .nw-tag { font-family:'Inter',sans-serif; font-size:10.5px; font-weight:800; letter-spacing:1.5px; text-transform:uppercase; color:${GREEN}; background:rgba(60,185,140,0.14); padding:6px 13px; border-radius:99px; }
        .nw-tag.sm { background:rgba(60,185,140,0.1); }
        .bl-meta { font-family:'Inter',sans-serif; font-size:12.5px; color:rgba(255,255,255,0.45); font-weight:600; }

        .nw-row { display:grid; grid-template-columns: 200px 1fr 40px; gap:24px; align-items:center; text-decoration:none; border-bottom:1px solid rgba(26,43,60,0.1); padding: clamp(22px,2.6vw,32px) clamp(8px,1.2vw,16px); transition: background 0.35s ease, padding-left 0.4s ${'cubic-bezier(0.16,1,0.3,1)'}; }
        .nw-row:hover { background: rgba(60,185,140,0.05); padding-left: clamp(16px,2vw,28px); }
        .nw-row-meta { display:flex; flex-direction:column; gap:8px; align-items:flex-start; }
        .nw-row-meta .bl-meta { color:rgba(26,43,60,0.4); }
        .nw-row-title { font-family:'Poppins',sans-serif; font-weight:600; font-size:clamp(17px,1.5vw,22px); color:${NAVY}; letter-spacing:-0.01em; line-height:1.25; margin:0 0 6px; }
        .nw-row-body { font-family:'Inter',sans-serif; font-size:13.5px; color:${MUTED}; line-height:1.6; margin:0; }
        .nw-row-arrow { display:inline-flex; color:${NAVY}; opacity:0.35; transition: transform 0.4s ${'cubic-bezier(0.16,1,0.3,1)'}, color 0.3s ease, opacity 0.3s ease; }
        .nw-row:hover .nw-row-arrow { color:${GREEN}; opacity:1; transform: translate(3px,-3px); }

        .nw-press-card { display:flex; align-items:center; gap:16px; text-decoration:none; background:linear-gradient(158deg,#ffffff,#f6fbf9); border:1px solid rgba(26,43,60,0.08); border-radius:20px; padding:clamp(22px,2.2vw,30px); transition: transform 0.45s ${'cubic-bezier(0.16,1,0.3,1)'}, box-shadow 0.45s ease, border-color 0.45s ease; }
        .nw-press-card:hover { transform:translateY(-6px); border-color:${GREEN}; box-shadow:0 30px 60px -36px rgba(60,185,140,0.5); }
        .nw-press-ic { display:inline-flex; align-items:center; justify-content:center; width:48px; height:48px; border-radius:13px; background:rgba(60,185,140,0.12); color:${GREEN}; flex-shrink:0; transition: background 0.4s ease, color 0.4s ease, transform 0.4s ease; }
        .nw-press-card:hover .nw-press-ic { background:${GREEN}; color:#fff; transform: translateY(-2px); }
        .nw-press-t { font-family:'Poppins',sans-serif; font-weight:600; font-size:16px; color:${NAVY}; }
        .nw-press-s { font-family:'Inter',sans-serif; font-size:13px; color:${MUTED}; margin-top:3px; }

        @media (max-width: 760px) { .nw-row { grid-template-columns: 1fr 36px !important; } .nw-row-meta { flex-direction:row; align-items:center; gap:12px; } .nw-press { grid-template-columns: 1fr !important; } }
        @media (min-width: 1920px) { .nw-press { max-width: 1900px; } }
      `}</style>
    </div>
  )
}
