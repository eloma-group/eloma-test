import { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight, FileText, Download, Users, Mail } from 'lucide-react'
import { Header } from '../components/Header/Header'
import { FlyFooter } from '../components/FlyFooter'
import { PageCTA, NAVY, GREEN, MUTED, EASE } from '../components/PageKit'

gsap.registerPlugin(ScrollTrigger)

type Item = { tag: string; date: string; read: string; title: string; body: string }

const NEWS: Item[] = [
  { tag: 'Announcement', date: 'Jun 2026', read: '4 min', title: 'Eloma Group expands operations across eight global markets', body: 'The group deepens its presence in Australia, India, the USA, Canada, China, the UK, the UAE and Singapore.' },
  { tag: 'Company', date: 'May 2026', read: '3 min', title: 'EG Digital launches a new technology and growth division', body: 'A dedicated practice for web, software and digital marketing across the group and its partners.' },
  { tag: 'Partnership', date: 'May 2026', read: '2 min', title: 'New strategic partnerships strengthen the supply network', body: 'Collaborations that bring businesses closer together across logistics and trade.' },
  { tag: 'Sustainability', date: 'Apr 2026', read: '5 min', title: 'Eloma publishes its first responsible-growth commitments', body: 'A clear framework for environmental, social and governance accountability across all five companies.' },
  { tag: 'Company', date: 'Mar 2026', read: '3 min', title: 'Bivry scales regional logistics capacity', body: 'Investment in fleet and routes to keep every shipment moving on time, across the region.' },
  { tag: 'Announcement', date: 'Feb 2026', read: '2 min', title: 'Eloma Travel opens a new corporate booking platform', body: 'A single dashboard for managed business travel across the group and its partner network.' },
  { tag: 'Partnership', date: 'Jan 2026', read: '3 min', title: 'Group BPO division signs a multi-year service agreement', body: 'A long-term mandate to run customer support and back-office operations for a global client.' },
]

const CATS = ['All', 'Announcement', 'Company', 'Partnership', 'Sustainability']

/* downloadable press-kit assets — sheets in the "press folder" */
const KIT = [
  { Icon: Download, tab: 'ZIP', t: 'Brand & Logo Pack', s: 'Logos, wordmarks, colour palette and clear-space guidelines.', size: '24 MB' },
  { Icon: FileText, tab: 'PDF', t: 'Company Fact Sheet', s: 'Group overview, key figures and structure.', size: '1.8 MB' },
  { Icon: Users, tab: 'ZIP', t: 'Leadership Bios & Photos', s: 'Executive profiles and hi-res headshots.', size: '42 MB' },
]

export function NewsroomPage() {
  const [cat, setCat] = useState('All')

  const feat = NEWS[0]
  // keep the original index so numbering stays stable while filtering
  const rest = useMemo(() => NEWS.slice(1).map((n, i) => ({ ...n, no: i + 2 })), [])
  const list = useMemo(() => (cat === 'All' ? rest : rest.filter(n => n.tag === cat)), [cat, rest])

  const rise = (d = 0) => ({
    initial: { opacity: 0, y: 26 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.7, delay: d, ease: EASE },
  })

  /* ── Press Folder · GSAP scroll-driven "fan open" reveal ──
     the sheets start stacked at the centre and fan out into a neat row as
     the section scrolls into view (scrubbed), synced to the Lenis scroll */
  const pressRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const root = pressRef.current
    if (!root) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = (window as unknown as { __lenis?: { on: (e: string, cb: () => void) => void; off: (e: string, cb: () => void) => void } }).__lenis
    const onScroll = () => ScrollTrigger.update()
    lenis?.on('scroll', onScroll)

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      /* desktop / tablet — collapse into a fanned stack, then open on scroll */
      mm.add('(min-width: 760px)', () => {
        const cards = gsap.utils.toArray<HTMLElement>('.pk-card')
        const n = cards.length
        if (!n) return
        const mid = (n - 1) / 2
        const step = n > 1 ? cards[1].offsetLeft - cards[0].offsetLeft : 0

        const tl = gsap.timeline({
          scrollTrigger: { trigger: root, start: 'top 82%', end: 'top 34%', scrub: 0.6 },
        })
        cards.forEach((card, i) => {
          const off = i - mid
          tl.fromTo(card,
            { x: -off * step, y: 44 - Math.abs(off) * 7, rotation: off * 6, scale: 0.9, transformOrigin: '50% 135%' },
            { x: 0, y: 0, rotation: 0, scale: 1, ease: 'power3.out' },
            0)
        })
      })

      /* mobile — simple staggered fade-up (no fan) */
      mm.add('(max-width: 759px)', () => {
        gsap.from('.pk-card', {
          autoAlpha: 0, y: 34, duration: 0.6, ease: 'power3.out', stagger: 0.08,
          scrollTrigger: { trigger: root, start: 'top 84%' },
        })
      })
    }, root)

    ScrollTrigger.refresh()
    return () => {
      lenis?.off('scroll', onScroll)
      ctx.revert()
    }
  }, [])

  return (
    <div style={{ overflowX: 'hidden', background: '#fff' }}>
      <Header />

      {/* ── 1 · Editorial masthead ── */}
      <header className="nw-hero">
        <span className="nw-hero-dots" aria-hidden />
        <span className="nw-hero-glow" aria-hidden />
        <div className="nw-wrap nw-hero-in">
          <div className="nw-mast">
            <span className="nw-mast-brand">The Eloma Dispatch</span>
            <span className="nw-mast-rule" />
            <span className="nw-mono nw-mast-meta">News · Press · Announcements</span>
          </div>

          <div className="nw-hero-grid">
            <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, ease: EASE }}>
              <p className="nw-eyebrow"><span className="nw-eyebrow-dot" />Newsroom - press &amp; updates</p>
              <h1 className="nw-hero-h1">Stories from<br />the <span className="g">Eloma group.</span></h1>
            </motion.div>
            <motion.div className="nw-hero-side" initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}>
              <p className="nw-hero-lead">Announcements, company updates and press from across the group - one place for the Eloma story as it unfolds, market by market.</p>
              <div className="nw-hero-stats">
                {[['08', 'Markets'], ['05', 'Companies'], ['07', 'Updates']].map(([n, l]) => (
                  <div className="nw-hero-stat" key={l}>
                    <span className="nw-hero-stat-n">{n}</span>
                    <span className="nw-hero-stat-l">{l}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </header>

      {/* ── 2 · Lead story ── */}
      <section className="nw-lead-sec">
        <div className="nw-wrap">
          <motion.div className="nw-sec-head" {...rise()}>
            <p className="nw-eyebrow dk"><span className="nw-eyebrow-dot" />Lead story</p>
            <span className="nw-mono nw-count">01 / {String(NEWS.length).padStart(2, '0')}</span>
          </motion.div>

          <motion.div className="nw-lead" {...rise(0.05)}>
            <span className="nw-lead-no" aria-hidden>01</span>
            <div className="nw-lead-l">
              <div className="nw-lead-meta">
                <span className="nw-chip">{feat.tag}</span>
                <span className="nw-mono">{feat.date}</span>
                <span className="nw-dotsep" />
                <span className="nw-mono">{feat.read} read</span>
              </div>
              <h2 className="nw-lead-title">{feat.title}</h2>
            </div>
            <div className="nw-lead-r">
              <p className="nw-lead-body">{feat.body}</p>
              <span className="nw-lead-link">Read the announcement <ArrowUpRight size={17} strokeWidth={2.4} /></span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 3 · Index + filter ── */}
      <section className="nw-list-sec">
        <div className="nw-wrap">
          <div className="nw-list-head">
            <motion.h2 className="nw-list-h" {...rise()}>The index.</motion.h2>
            <motion.div className="nw-filter" {...rise(0.05)} role="tablist" aria-label="Filter updates by category">
              {CATS.map(c => (
                <button key={c} role="tab" aria-selected={cat === c} className={`nw-pill${cat === c ? ' on' : ''}`} onClick={() => setCat(c)}>{c}</button>
              ))}
            </motion.div>
          </div>

          <div className="nw-grid">
            {list.map((n, i) => (
              <motion.div key={n.title} className="nw-card"
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.5, delay: (i % 2) * 0.06, ease: EASE }}>
                <span className="nw-card-accent" aria-hidden />
                <div className="nw-card-top">
                  <span className="nw-mono nw-card-no">{String(n.no).padStart(2, '0')}</span>
                  <span className="nw-chip sm">{n.tag}</span>
                </div>
                <h3 className="nw-card-title">{n.title}</h3>
                <p className="nw-card-body">{n.body}</p>
                <div className="nw-card-foot">
                  <span className="nw-mono">{n.date} · {n.read} read</span>
                  <span className="nw-card-arrow"><ArrowUpRight size={17} strokeWidth={2.4} /></span>
                </div>
              </motion.div>
            ))}
          </div>
          {list.length === 0 && <p className="nw-empty">No updates in this category yet - check back soon.</p>}
        </div>
      </section>

      {/* ── 4 · Press & media — "The Press Folder" (GSAP fan-out) ── */}
      <section className="pk" ref={pressRef} data-reveal="off">
        <span className="pk-glow" aria-hidden />
        <div className="nw-wrap">
          <div className="pk-head">
            <div className="pk-head-l">
              <p className="nw-eyebrow"><span className="nw-eyebrow-dot" />Press &amp; media</p>
              <h2 className="pk-h">The press <span className="g">folder.</span></h2>
            </div>
            <p className="pk-lead">
              Everything you need to tell the Eloma story accurately — brand assets, figures and leadership.
            </p>
          </div>

          <div className="pk-deck">
            {KIT.map((k, i) => (
              <article key={k.t} className="pk-card">
                <div className="pk-card-in">
                  <span className="pk-ghost" aria-hidden>{String(i + 1).padStart(2, '0')}</span>
                  <span className="pk-tab">{k.tab}</span>
                  <span className="pk-ic"><k.Icon size={20} strokeWidth={1.8} /></span>
                  <div className="pk-card-body">
                    <h3 className="pk-t">{k.t}</h3>
                    <p className="pk-s">{k.s}</p>
                  </div>
                  <button type="button" className="pk-dl">
                    <span className="pk-dl-bar" aria-hidden />
                    <span className="pk-dl-tx">Download</span>
                    <span className="pk-dl-meta">{k.size}</span>
                    <Download size={15} strokeWidth={2.4} />
                  </button>
                </div>
              </article>
            ))}

            {/* contact sheet — green */}
            <article className="pk-card pk-card-contact">
              <div className="pk-card-in">
                <span className="pk-ghost" aria-hidden>04</span>
                <span className="pk-tab dark">ASK</span>
                <span className="pk-ic light"><Mail size={20} strokeWidth={1.9} /></span>
                <div className="pk-card-body">
                  <h3 className="pk-t light">Media enquiries</h3>
                  <p className="pk-s light">Interviews, figures or anything not listed here — talk to our comms team.</p>
                </div>
                <a className="pk-dl solid" href="mailto:press@elomagroup.com">
                  <span className="pk-dl-tx">Email us</span>
                  <ArrowUpRight size={15} strokeWidth={2.4} />
                </a>
              </div>
            </article>
          </div>
        </div>
      </section>

      <PageCTA line1="Press or media" line2="enquiry?" sub="Reach our communications team and we'll respond quickly." buttonLabel="Contact Us" />
      <FlyFooter />

      <style>{`
        .nw-wrap { max-width:none; margin:0 auto; }
        .g { color:${GREEN}; }
        .nw-mono { font-family:'Eloma Sans',sans-serif; font-weight:600; font-size:clamp(11px,0.82vw,13px); letter-spacing:1.5px; text-transform:uppercase; color:${MUTED}; }
        .nw-eyebrow { display:inline-flex; align-items:center; gap:10px; margin:0; font-family:'Eloma Sans',sans-serif; font-weight:700; font-size:clamp(10px,0.8vw,12px); letter-spacing:2.5px; text-transform:uppercase; color:${GREEN}; }
        .nw-eyebrow-dot { width:7px; height:7px; border-radius:50%; background:${GREEN}; box-shadow:0 0 0 4px rgba(60,185,140,0.16); flex-shrink:0; }
        .nw-chip { font-family:'Eloma Sans',sans-serif; font-size:10.5px; font-weight:800; letter-spacing:1.5px; text-transform:uppercase; color:${GREEN}; background:rgba(60,185,140,0.12); padding:6px 13px; border-radius:99px; white-space:nowrap; }
        .nw-chip.sm { padding:5px 11px; font-size:10px; }
        .nw-dotsep { width:4px; height:4px; border-radius:50%; background:rgba(26,43,60,0.25); }

        /* 1 · Masthead */
        .nw-hero { position:relative; overflow:hidden;
          background: radial-gradient(60% 50% at 88% 4%, rgba(60,185,140,0.12), transparent 60%), linear-gradient(180deg,#ffffff 0%,#f3faf7 100%);
          padding: clamp(112px,13vw,180px) 45px clamp(20px,3vw,40px); }
        .nw-hero-dots { position:absolute; inset:0; pointer-events:none; opacity:0.5;
          background-image:radial-gradient(rgba(19,41,61,0.05) 1px, transparent 1px); background-size:26px 26px; -webkit-mask-image:linear-gradient(180deg,#000,transparent 80%); mask-image:linear-gradient(180deg,#000,transparent 80%); }
        .nw-hero-glow { position:absolute; top:-120px; right:-80px; width:480px; height:480px; border-radius:50%; background:radial-gradient(circle, rgba(60,185,140,0.16), transparent 64%); pointer-events:none; }
        .nw-hero-in { position:relative; z-index:1; }
        .nw-mast { display:flex; align-items:center; gap:clamp(14px,2vw,26px); padding-bottom:clamp(28px,3.4vw,46px); border-bottom:2px solid ${NAVY}; }
        .nw-mast-brand { font-family:'Eloma Sans Heading',sans-serif; font-weight:700; font-size:clamp(15px,1.5vw,22px); letter-spacing:-0.01em; color:${NAVY}; white-space:nowrap; }
        .nw-mast-rule { flex:1; height:1px; background:rgba(26,43,60,0.18); }
        .nw-mast-meta { white-space:nowrap; }
        .nw-hero-grid { display:grid; grid-template-columns:1.45fr 0.55fr; gap:clamp(28px,5vw,80px); align-items:end; padding:clamp(34px,4.4vw,68px) 0 clamp(40px,5vw,76px); }
        .nw-hero-h1 { font-family:'Eloma Sans Heading',sans-serif; font-weight:700; font-size:clamp(46px,8vw,128px); line-height:0.98; letter-spacing:-0.04em; color:${NAVY}; margin:clamp(16px,2vw,26px) 0 0; }
        .nw-hero-side { border-top:1px solid rgba(26,43,60,0.16); padding-top:clamp(18px,2vw,24px); }
        .nw-hero-lead { font-family:'Eloma Sans',sans-serif; font-size:clamp(14px,1.05vw,16px); line-height:1.8; color:${MUTED}; margin:0 0 clamp(22px,2.6vw,30px); }
        .nw-hero-stats { display:flex; gap:clamp(20px,2.4vw,34px); }
        .nw-hero-stat { display:flex; flex-direction:column; }
        .nw-hero-stat-n { font-family:'Eloma Sans Heading',sans-serif; font-weight:700; font-size:clamp(26px,2.8vw,42px); letter-spacing:-0.03em; color:${NAVY}; line-height:1; }
        .nw-hero-stat-l { font-family:'Eloma Sans',sans-serif; font-size:11px; font-weight:600; letter-spacing:1px; text-transform:uppercase; color:${MUTED}; margin-top:6px; }

        .nw-sec-head { display:flex; align-items:center; justify-content:space-between; gap:16px; }
        .nw-eyebrow.dk { color:${GREEN}; }
        .nw-count { color:rgba(26,43,60,0.4); }

        /* 2 · Lead */
        .nw-lead-sec { background:#fff; padding:clamp(48px,6vw,96px) 45px clamp(40px,5vw,72px); }
        .nw-lead { position:relative; overflow:hidden; display:grid; grid-template-columns:1.15fr 0.85fr; gap:clamp(28px,4vw,64px); margin-top:clamp(24px,3vw,40px); padding:clamp(30px,3.6vw,56px) 0 clamp(34px,4vw,60px); text-decoration:none; border-top:2px solid ${NAVY}; border-bottom:1px solid rgba(26,43,60,0.12); }
        .nw-lead-no { position:absolute; right:-6px; bottom:-48px; font-family:'Eloma Sans Heading',sans-serif; font-weight:700; font-size:clamp(150px,22vw,320px); line-height:0.7; color:rgba(60,185,140,0.07); pointer-events:none; user-select:none; z-index:0; }
        .nw-lead-l, .nw-lead-r { position:relative; z-index:1; }
        .nw-lead-meta { display:flex; align-items:center; gap:14px; flex-wrap:wrap; margin-bottom:clamp(18px,2vw,26px); }
        .nw-lead-title { font-family:'Eloma Sans Heading',sans-serif; font-weight:700; font-size:clamp(30px,4.4vw,72px); line-height:1.02; letter-spacing:-0.035em; color:${NAVY}; margin:0; }
        .nw-lead-r { display:flex; flex-direction:column; justify-content:flex-end; }
        .nw-lead-body { font-family:'Eloma Sans',sans-serif; font-size:clamp(15px,1.2vw,18px); line-height:1.8; color:${MUTED}; margin:0 0 clamp(22px,2.6vw,32px); }
        .nw-lead-link { display:inline-flex; align-items:center; gap:9px; font-family:'Eloma Sans',sans-serif; font-size:13px; font-weight:700; letter-spacing:1.5px; text-transform:uppercase; color:${GREEN}; transition:gap 0.3s ease; }
        .nw-lead:hover .nw-lead-link { gap:15px; }
        .nw-lead:hover .nw-lead-title { color:#0f2030; }

        /* 3 · Index */
        .nw-list-sec { background:linear-gradient(180deg,#ffffff,#f3faf7); padding:clamp(48px,6vw,90px) 45px clamp(64px,8vw,120px); }
        .nw-list-head { display:flex; align-items:flex-end; justify-content:space-between; gap:24px; flex-wrap:wrap; margin-bottom:clamp(28px,3.4vw,46px); }
        .nw-list-h { font-family:'Eloma Sans Heading',sans-serif; font-weight:700; font-size:clamp(34px,5vw,76px); letter-spacing:-0.035em; color:${NAVY}; margin:0; line-height:1; }
        .nw-filter { display:flex; flex-wrap:wrap; gap:9px; }
        .nw-pill { font-family:'Eloma Sans',sans-serif; font-size:13px; font-weight:600; color:${NAVY}; background:#fff; border:1px solid rgba(26,43,60,0.14); border-radius:99px; padding:11px 20px; min-height:44px; cursor:pointer; transition:transform 0.25s ${'cubic-bezier(0.16,1,0.3,1)'}, background 0.25s ease, border-color 0.25s ease, color 0.25s ease; }
        .nw-pill:hover { transform:translateY(-2px); border-color:${GREEN}; color:${GREEN}; }
        .nw-pill.on { background:${NAVY}; border-color:${NAVY}; color:#fff; }
        .nw-pill.on:hover { color:#fff; }

        .nw-grid { display:grid; grid-template-columns:1fr 1fr; gap:clamp(16px,1.6vw,22px); }
        .nw-card { position:relative; overflow:hidden; display:flex; flex-direction:column; text-decoration:none; background:#fff; border:1px solid rgba(26,43,60,0.1); border-radius:20px; padding:clamp(26px,2.8vw,40px); transition:transform 0.45s ${'cubic-bezier(0.16,1,0.3,1)'}, box-shadow 0.45s ease, border-color 0.45s ease; }
        .nw-card-accent { position:absolute; top:0; left:0; right:0; height:3px; background:${GREEN}; transform:scaleX(0); transform-origin:left; transition:transform 0.45s ${'cubic-bezier(0.16,1,0.3,1)'}; }
        .nw-card:hover { transform:translateY(-6px); border-color:rgba(60,185,140,0.5); box-shadow:0 36px 70px -40px rgba(19,41,61,0.32); }
        .nw-card:hover .nw-card-accent { transform:scaleX(1); }
        .nw-card-top { display:flex; align-items:center; justify-content:space-between; gap:12px; margin-bottom:clamp(16px,1.8vw,22px); }
        .nw-card-no { color:rgba(26,43,60,0.32); font-size:13px; }
        .nw-card-title { font-family:'Eloma Sans Heading',sans-serif; font-weight:600; font-size:clamp(19px,1.8vw,28px); line-height:1.18; letter-spacing:-0.02em; color:${NAVY}; margin:0 0 12px; }
        .nw-card-body { font-family:'Eloma Sans',sans-serif; font-size:clamp(13.5px,1vw,15px); line-height:1.7; color:${MUTED}; margin:0 0 clamp(22px,2.4vw,30px); flex:1; }
        .nw-card-foot { display:flex; align-items:center; justify-content:space-between; gap:12px; padding-top:clamp(16px,1.8vw,20px); border-top:1px solid rgba(26,43,60,0.1); }
        .nw-card-arrow { display:inline-flex; align-items:center; justify-content:center; width:38px; height:38px; border-radius:11px; background:rgba(60,185,140,0.1); color:${GREEN}; transition:transform 0.4s ${'cubic-bezier(0.16,1,0.3,1)'}, background 0.3s ease, color 0.3s ease; }
        .nw-card:hover .nw-card-arrow { background:${GREEN}; color:#fff; transform:translate(2px,-2px); }
        .nw-empty { font-family:'Eloma Sans',sans-serif; font-size:15px; color:${MUTED}; text-align:center; padding:48px 0; }

        /* 4 · Press & media — "The Press Folder" (navy, GSAP fan-out) */
        .pk { position:relative; overflow:hidden; background:${NAVY}; padding:clamp(60px,8vw,120px) 45px clamp(70px,9vw,130px); }
        .pk::before { content:''; position:absolute; inset:0; pointer-events:none; z-index:0;
          background-image:radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px); background-size:30px 30px; }
        .pk-glow { position:absolute; top:-140px; left:-100px; width:520px; height:520px; border-radius:50%;
          background:radial-gradient(circle, rgba(60,185,140,0.18), transparent 64%); pointer-events:none; z-index:0; }
        .pk .nw-wrap { position:relative; z-index:1; }

        .pk-head { display:flex; justify-content:space-between; align-items:flex-end; gap:clamp(20px,4vw,64px);
          flex-wrap:wrap; margin-bottom:clamp(34px,4.6vw,72px); }
        .pk-h { font-family:'Eloma Sans Heading',sans-serif; font-weight:700; font-size:clamp(34px,4.6vw,68px); letter-spacing:-0.035em; line-height:1.0; color:#fff; margin:clamp(12px,1.6vw,20px) 0 0; }
        .pk-lead { font-family:'Eloma Sans',sans-serif; font-size:clamp(14px,1.05vw,16.5px); line-height:1.8; color:rgba(255,255,255,0.6); margin:0; max-width:44ch; }

        /* the fanned deck of sheets */
        .pk-deck { display:flex; flex-wrap:nowrap; justify-content:center; align-items:stretch; gap:clamp(16px,2vw,30px); }
        .pk-card { flex:0 0 auto; width:clamp(200px,19vw,244px); will-change:transform; }
        .pk-card:hover { z-index:5; }
        .pk-card-in { position:relative; overflow:hidden; height:100%; min-height:clamp(292px,30vw,368px);
          display:flex; flex-direction:column; padding:clamp(20px,1.7vw,28px); border-radius:20px; background:#fff;
          box-shadow:0 34px 66px -40px rgba(0,0,0,0.75);
          transition:transform .5s cubic-bezier(0.16,1,0.3,1), box-shadow .5s ease; }
        .pk-card-in::after { content:''; position:absolute; inset:0; border-radius:20px; pointer-events:none; border:1.5px solid transparent; transition:border-color .4s ease; }
        .pk-card:hover .pk-card-in { transform:translateY(-14px); box-shadow:0 54px 90px -42px rgba(0,0,0,0.85); }
        .pk-card:hover .pk-card-in::after { border-color:rgba(60,185,140,0.6); }

        .pk-ghost { position:absolute; top:clamp(14px,1.5vw,20px); right:clamp(14px,1.5vw,20px); z-index:0; pointer-events:none; user-select:none;
          font-family:'Eloma Sans Heading',sans-serif; font-weight:800; font-size:clamp(58px,6.4vw,92px); line-height:0.7; letter-spacing:-0.05em; color:rgba(19,41,61,0.07); }

        /* folder tab (format label) */
        .pk-tab { position:relative; z-index:1; align-self:flex-start; font-family:'Eloma Sans',sans-serif; font-weight:800; font-size:10.5px; letter-spacing:1.6px; text-transform:uppercase;
          color:${GREEN}; background:rgba(60,185,140,0.12); padding:5px 11px; border-radius:7px; }
        .pk-tab.dark { color:#fff; background:rgba(255,255,255,0.22); }

        .pk-ic { position:relative; z-index:1; display:inline-flex; align-items:center; justify-content:center; width:clamp(44px,3.6vw,52px); aspect-ratio:1; margin-top:clamp(16px,1.8vw,24px);
          border-radius:13px; background:rgba(60,185,140,0.12); color:${GREEN};
          transition:transform .5s cubic-bezier(0.16,1,0.3,1), background .35s ease, color .35s ease; }
        .pk-card:hover .pk-ic { background:${GREEN}; color:#fff; transform:translateY(-2px) rotate(-6deg); }
        .pk-ic.light { background:rgba(255,255,255,0.2); color:#fff; }
        .pk-card-contact:hover .pk-ic.light { background:#fff; color:${GREEN}; }

        .pk-card-body { position:relative; z-index:1; margin-top:auto; padding-top:clamp(20px,2vw,28px); }
        .pk-t { font-family:'Eloma Sans Heading',sans-serif; font-weight:700; font-size:clamp(17px,1.35vw,20px); line-height:1.22; letter-spacing:-0.02em; color:${NAVY}; margin:0; }
        .pk-s { font-family:'Eloma Sans',sans-serif; font-size:clamp(12.5px,0.92vw,13.5px); line-height:1.6; color:${MUTED}; margin:8px 0 0; }
        .pk-t.light { color:#fff; }
        .pk-s.light { color:rgba(255,255,255,0.85); }

        /* download button — green bar fills on hover */
        .pk-dl { position:relative; overflow:hidden; z-index:1; align-self:stretch; margin-top:clamp(16px,1.8vw,22px); cursor:pointer;
          display:inline-flex; align-items:center; gap:9px; padding:11px 15px; border-radius:11px;
          border:1px solid rgba(19,41,61,0.16); background:transparent; color:${NAVY}; text-decoration:none;
          font-family:'Eloma Sans',sans-serif; font-weight:700; font-size:12.5px; letter-spacing:0.3px;
          transition:color .35s ease, border-color .35s ease; }
        .pk-dl-tx, .pk-dl-meta, .pk-dl svg { position:relative; z-index:1; }
        .pk-dl-meta { margin-left:auto; font-weight:600; font-size:11px; letter-spacing:0.5px; color:rgba(19,41,61,0.45); transition:color .35s ease; }
        .pk-dl svg { transition:transform .4s cubic-bezier(0.16,1,0.3,1); }
        .pk-dl-bar { position:absolute; inset:0; z-index:0; background:${GREEN}; transform:scaleX(0); transform-origin:left center; transition:transform .45s cubic-bezier(0.16,1,0.3,1); }
        .pk-card:hover .pk-dl { color:#fff; border-color:${GREEN}; }
        .pk-card:hover .pk-dl .pk-dl-meta { color:rgba(255,255,255,0.85); }
        .pk-card:hover .pk-dl-bar { transform:scaleX(1); }
        .pk-card:hover .pk-dl svg { transform:translateY(2px); }

        /* contact sheet — green */
        .pk-card-contact .pk-card-in { background:linear-gradient(155deg, ${GREEN}, #2f9d75); box-shadow:0 34px 70px -42px rgba(60,185,140,0.9); }
        .pk-card-contact .pk-ghost { color:rgba(255,255,255,0.12); }
        .pk-card-contact .pk-dl.solid { border-color:transparent; background:${NAVY}; color:#fff; justify-content:center; }
        .pk-card-contact:hover .pk-dl.solid svg { transform:translate(3px,-3px); }

        /* ── responsive ── */
        @media (max-width:900px){
          .nw-hero-grid { grid-template-columns:1fr; align-items:start; gap:clamp(24px,5vw,36px); }
          .nw-hero-side { border-top:none; padding-top:0; }
          .nw-lead { grid-template-columns:1fr; gap:clamp(20px,4vw,32px); }
          .nw-lead-r { justify-content:flex-start; }
          /* deck → responsive grid of sheets */
          .pk-deck { flex-wrap:wrap; }
          .pk-card { width:clamp(220px,42vw,300px); }
        }
        @media (max-width:680px){
          .nw-grid { grid-template-columns:1fr; }
          .nw-mast-brand { font-size:14px; }
          .nw-mast-meta { display:none; }
          .nw-mast-rule { flex:1; }
          .pk-deck { flex-direction:column; align-items:stretch; gap:14px; }
          .pk-card { width:100%; }
          .pk-card-in { min-height:0; }
        }
        @media (min-width:1920px){
          .nw-wrap { max-width:none; }
          .nw-hero-h1 { font-size:140px; }
          .nw-lead-title { font-size:80px; }
          .nw-list-h { font-size:88px; }
          .pk-h { font-size:72px; }
          .nw-hero-lead, .pk-lead { font-size:18px; }
        }
        @media (min-width:2560px){
          .nw-wrap { max-width:none; }
          .nw-hero { padding-top:clamp(150px,8vw,210px); }
          .nw-hero-h1 { font-size:190px; }
          .nw-lead-title { font-size:104px; }
          .nw-lead-no { font-size:440px; }
          .nw-list-h { font-size:112px; }
          .pk-h { font-size:92px; }
          .nw-hero-lead, .pk-lead, .nw-lead-body { font-size:22px; }
          .nw-card-title { font-size:34px; }
          .pk-t { font-size:24px; }
        }
      `}</style>
    </div>
  )
}
