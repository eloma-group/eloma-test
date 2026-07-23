import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Header } from '../components/Header/Header'
import { FlyFooter } from '../components/FlyFooter'
import { PageCTA, NAVY, GREEN, MUTED, EASE } from '../components/PageKit'

const img = (id: string, w = 1100) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`

const POSTS = [
  { cat: 'Technology', title: 'Building a digital backbone across a multi-business group', date: 'Jun 2026', read: '6 min', img: 'photo-1498050108023-c5249f4df085', feat: true,
    excerpt: 'Shared infrastructure lets independent companies move faster without losing their edge. A common technology backbone - cloud, data and security - powers every business while keeping each one free to run its own way.' },
  { cat: 'Strategy', title: 'Why we build for the decade, not the quarter', date: 'Jun 2026', read: '4 min', img: 'photo-1486406146926-c627a92ad1ab',
    excerpt: 'Long-term thinking shapes every decision we make. Here is why patient capital, durable systems and steady investment beat chasing short-term wins.' },
  { cat: 'Logistics', title: 'Resilient supply chains in an unpredictable world', date: 'May 2026', read: '5 min', img: 'photo-1586528116311-ad8dd3c8310d',
    excerpt: 'From port to doorstep, disruption is now the norm. The visibility, redundancy and local partnerships that keep goods moving when conditions change overnight.' },
  { cat: 'Customer Experience', title: 'People-first BPO: relationships over transactions', date: 'May 2026', read: '4 min', img: 'photo-1556745757-8d76bdb6984b',
    excerpt: 'Great support is built on people, not scripts. How our teams turn every interaction into a lasting relationship - blending empathy, training and the right technology.' },
  { cat: 'Sustainability', title: 'Responsible growth across eight markets', date: 'Apr 2026', read: '7 min', img: 'photo-1466611653911-95081537e5b7',
    excerpt: 'Growth and responsibility are not a trade-off. How we measure impact, cut waste and hold ourselves to ethical, future-ready practices in every market.' },
  { cat: 'Travel', title: 'Designing corporate travel around people', date: 'Apr 2026', read: '3 min', img: 'photo-1436491865332-7a61a109cc05',
    excerpt: 'Business travel should work for travellers, not against them. We rethink corporate trips around comfort, flexibility and care - so people arrive ready, not drained.' },
  { cat: 'Technology', title: 'Security by design in a connected group', date: 'Mar 2026', read: '6 min', img: 'photo-1550751827-4bd374c3f58b',
    excerpt: 'When companies share a backbone, security cannot be an afterthought. National-grade standards, layered defences and a security-first culture protect the whole group.' },
]

const CATS = ['All', 'Technology', 'Strategy', 'Logistics', 'Customer Experience', 'Sustainability', 'Travel']

export function BlogsPage() {
  const [cat, setCat] = useState('All')
  const feat = POSTS.find(p => p.feat)!
  const rest = POSTS.filter(p => !p.feat).filter(p => cat === 'All' || p.cat === cat)

  const rise = (d = 0) => ({
    initial: { opacity: 0, y: 26 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.7, delay: d, ease: EASE },
  })

  return (
    <div style={{ overflowX: 'hidden', background: '#fff' }}>
      <Header />

      {/* ── MASTHEAD ── */}
      <section className="jr-mast">
        <div className="jr-mast-glow" aria-hidden />
        <div className="jr-mast-in">
          <motion.div className="jr-rule" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }}>
            <span className="jr-rule-brand">The Eloma Journal</span>
            <span className="jr-rule-line" />
            <span className="jr-rule-meta">{POSTS.length} Stories &middot; Vol. 01 &middot; 2026</span>
          </motion.div>
          <motion.p className="jr-kicker" {...rise(0.05)}><i />Insights &amp; Ideas</motion.p>
          <motion.h1 className="jr-mast-h1" {...rise(0.12)}>
            Ideas that move the<br /><span className="g">group forward.</span>
          </motion.h1>
          <motion.p className="jr-mast-sub" {...rise(0.2)}>
            Perspectives from across the group - technology, strategy, logistics, customer experience
            and the long-term thinking that ties them together.
          </motion.p>
        </div>
      </section>

      {/* ── FEATURED COVER (immersive) ── */}
      <section className="jr-feat-sec">
        <motion.article className="jr-feat" {...rise()}>
          <div className="jr-feat-media">
            <img src={img(feat.img, 1600)} alt={feat.title} loading="lazy" decoding="async" />
            <span className="jr-feat-badge"><i />Featured story</span>
          </div>
          <div className="jr-feat-panel">
            <div className="jr-feat-metaline">
              <span className="jr-chip jr-chip--feat">{feat.cat}</span>
              <span className="jr-meta">{feat.date} &middot; {feat.read} read</span>
            </div>
            <h2 className="jr-feat-title">{feat.title}</h2>
            <p className="jr-feat-ex">{feat.excerpt}</p>
            <span className="jr-feat-btn">Read story <ArrowRight size={17} strokeWidth={2.4} /></span>
          </div>
        </motion.article>
      </section>

      {/* ── LATEST / GRID ── */}
      <section className="jr-list-sec">
        <div className="jr-list-in">
          <div className="jr-list-head">
            <div>
              <p className="jr-kicker jr-kicker--dark"><i />The archive</p>
              <h3 className="jr-list-h">Latest stories</h3>
            </div>
            <div className="jr-filters">
              {CATS.map(c => (
                <button key={c} onClick={() => setCat(c)} className="jr-pill" data-active={c === cat}>{c}</button>
              ))}
            </div>
          </div>

          <div className="jr-idx">
            {rest.map((p, i) => (
              <motion.article key={p.title} className="jr-idx-row"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, delay: Math.min(i, 5) * 0.05, ease: EASE }}>
                <span className="jr-idx-no">{String(i + 1).padStart(2, '0')}</span>
                <div className="jr-idx-media">
                  <img src={img(p.img, 700)} alt={p.title} loading="lazy" decoding="async" />
                </div>
                <div className="jr-idx-body">
                  <div className="jr-idx-meta">
                    <span className="jr-chip jr-chip--soft">{p.cat}</span>
                    <span className="jr-meta">{p.date} &middot; {p.read} read</span>
                  </div>
                  <h4 className="jr-idx-title">{p.title}</h4>
                  <p className="jr-idx-ex">{p.excerpt}</p>
                </div>
                <span className="jr-idx-arrow" aria-hidden><ArrowUpRight size={20} strokeWidth={2.2} /></span>
              </motion.article>
            ))}
            {rest.length === 0 && (
              <p className="jr-empty">No stories in this category yet - check back soon.</p>
            )}
          </div>
        </div>
      </section>

      <PageCTA line1="Want our latest" line2="thinking?" sub="Subscribe to updates from across the Eloma group." buttonLabel="Get in Touch" />
      <FlyFooter />

      <style>{`
        /* ═══════ MASTHEAD ═══════ */
        .jr-mast { position:relative; overflow:hidden;
          background:radial-gradient(58% 60% at 82% 0%, rgba(60,185,140,0.12), transparent 60%), linear-gradient(180deg,#ffffff 0%,#f2faf6 100%);
          padding:clamp(132px,15vw,210px) 45px clamp(40px,5vw,64px); }
        .jr-mast-glow { position:absolute; top:-160px; left:-90px; width:520px; height:520px; border-radius:50%;
          background:radial-gradient(circle, rgba(60,185,140,0.14), transparent 64%); pointer-events:none; }
        .jr-mast-in { position:relative; z-index:1; max-width:1000px; margin:0 auto; text-align:center; }
        .jr-rule { display:flex; align-items:center; gap:clamp(14px,2vw,26px); margin-bottom:clamp(30px,4vw,52px); }
        .jr-rule-brand { font-family:'Eloma Sans Heading',sans-serif; font-weight:700; font-size:clamp(13px,1.1vw,16px); letter-spacing:-0.01em; color:${NAVY}; white-space:nowrap; }
        .jr-rule-line { flex:1; height:1px; background:rgba(19,41,61,0.16); }
        .jr-rule-meta { font-family:'Eloma Sans',sans-serif; font-weight:600; font-size:clamp(10.5px,0.85vw,12.5px); letter-spacing:1.4px; text-transform:uppercase; color:rgba(19,41,61,0.42); white-space:nowrap; }
        .jr-kicker { display:inline-flex; align-items:center; gap:10px; margin:0; font-family:'Eloma Sans',sans-serif; font-weight:700; font-size:clamp(10px,0.8vw,12px); letter-spacing:2.6px; text-transform:uppercase; color:${GREEN}; }
        .jr-kicker i { width:7px; height:7px; border-radius:50%; background:${GREEN}; box-shadow:0 0 0 4px rgba(60,185,140,0.16); }
        .jr-kicker--dark { color:${GREEN}; }
        .jr-mast-h1 { font-family:'Eloma Sans Heading',sans-serif; font-weight:700; font-size:clamp(40px,6.8vw,104px); line-height:0.98; letter-spacing:-0.04em; color:${NAVY}; margin:clamp(18px,2.2vw,30px) 0 0; }
        .jr-mast-h1 .g { color:${GREEN}; }
        .jr-mast-sub { font-family:'Eloma Sans',sans-serif; font-size:clamp(15px,1.3vw,20px); line-height:1.8; color:${MUTED}; max-width:660px; margin:clamp(22px,2.6vw,32px) auto 0; }

        /* ═══════ FEATURED COVER ═══════ */
        .jr-feat-sec { background:#fff; padding:clamp(18px,2vw,30px) 45px clamp(48px,6vw,80px); }
        .jr-feat { display:grid; grid-template-columns:1.12fr 0.88fr; align-items:stretch; overflow:hidden; cursor:pointer;
          border:1px solid rgba(26,43,60,0.1); border-radius:28px; background:#fff;
          box-shadow:0 50px 100px -60px rgba(19,41,61,0.42);
          transition:transform 0.5s cubic-bezier(0.16,1,0.3,1), box-shadow 0.5s ease, border-color 0.5s ease; }
        .jr-feat:hover { transform:translateY(-6px); border-color:rgba(60,185,140,0.4); box-shadow:0 62px 110px -55px rgba(19,41,61,0.5); }
        .jr-feat-media { position:relative; overflow:hidden; min-height:clamp(320px,44vh,540px); background:#eef3f1; }
        .jr-feat-media img { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; display:block;
          transition:transform 1.1s cubic-bezier(0.16,1,0.3,1); }
        .jr-feat:hover .jr-feat-media img { transform:scale(1.05); }
        .jr-feat-badge { position:absolute; top:20px; left:20px; display:inline-flex; align-items:center; gap:8px;
          font-family:'Eloma Sans',sans-serif; font-size:11px; font-weight:800; letter-spacing:1.4px; text-transform:uppercase; color:#fff;
          background:rgba(9,22,33,0.55); border:1px solid rgba(255,255,255,0.28); backdrop-filter:blur(8px); padding:8px 15px; border-radius:99px; }
        .jr-feat-badge i { width:7px; height:7px; border-radius:50%; background:${GREEN}; box-shadow:0 0 0 3px rgba(60,185,140,0.3); }
        .jr-feat-panel { display:flex; flex-direction:column; justify-content:center; padding:clamp(28px,3.6vw,60px); background:linear-gradient(180deg,#ffffff,#f5faf8); }
        .jr-feat-metaline { display:flex; align-items:center; gap:14px; flex-wrap:wrap; margin-bottom:clamp(16px,1.8vw,22px); }
        .jr-feat-title { font-family:'Eloma Sans Heading',sans-serif; font-weight:700; font-size:clamp(26px,2.9vw,46px); line-height:1.08; letter-spacing:-0.03em; color:${NAVY}; margin:0 0 clamp(14px,1.5vw,20px); text-wrap:balance; transition:color 0.3s ease; }
        .jr-feat:hover .jr-feat-title { color:${GREEN}; }
        .jr-feat-ex { font-family:'Eloma Sans',sans-serif; font-size:clamp(14px,1.15vw,17px); line-height:1.75; color:${MUTED}; margin:0 0 clamp(26px,2.8vw,34px); max-width:520px; }
        .jr-feat-btn { align-self:flex-start; display:inline-flex; align-items:center; gap:10px; background:${NAVY}; color:#fff; border-radius:14px; padding:14px 26px; font-family:'Eloma Sans Heading',sans-serif; font-weight:500; font-size:15px; box-shadow:0 16px 34px -16px rgba(19,41,61,0.5); transition:transform 0.3s ease, background 0.3s ease, box-shadow 0.3s ease; }
        .jr-feat-btn svg { transition:transform 0.4s cubic-bezier(0.16,1,0.3,1); }
        .jr-feat:hover .jr-feat-btn { background:${GREEN}; transform:translateY(-2px); box-shadow:0 20px 40px -16px rgba(60,185,140,0.6); }
        .jr-feat:hover .jr-feat-btn svg { transform:translateX(4px); }

        /* chips / meta / read */
        .jr-tags { display:flex; align-items:center; gap:10px; flex-wrap:wrap; }
        .jr-chip { font-family:'Eloma Sans',sans-serif; font-size:11px; font-weight:800; letter-spacing:1.4px; text-transform:uppercase; padding:6px 13px; border-radius:99px; }
        .jr-chip--feat { color:#fff; background:${GREEN}; box-shadow:0 12px 26px -12px rgba(60,185,140,0.8); }
        .jr-chip--ghost { color:#fff; background:rgba(255,255,255,0.14); border:1px solid rgba(255,255,255,0.34); backdrop-filter:blur(6px); }
        .jr-meta { font-family:'Eloma Sans',sans-serif; font-size:12.5px; font-weight:600; letter-spacing:0.3px; color:rgba(26,43,60,0.5); }
        .jr-meta--light { color:rgba(255,255,255,0.72); }
        .jr-read { display:inline-flex; align-items:center; gap:8px; font-family:'Eloma Sans Heading',sans-serif; font-weight:600; font-size:14.5px; color:${NAVY}; }
        .jr-read svg { color:${GREEN}; transition:transform 0.4s cubic-bezier(0.16,1,0.3,1); }
        .jr-read--light { color:#fff; }
        .jr-read--light svg { color:#fff; }
        .jr-feat:hover .jr-read svg { transform:translate(4px,-4px); }

        /* ═══════ LATEST GRID ═══════ */
        .jr-list-sec { background:linear-gradient(180deg,#ffffff 0%,#f5faf8 100%); padding:clamp(48px,6vw,96px) 45px clamp(64px,8vw,120px); }
        .jr-list-in { max-width:none; margin:0 auto; }
        .jr-list-head { display:flex; align-items:flex-end; justify-content:space-between; gap:28px; flex-wrap:wrap;
          margin-bottom:clamp(30px,4vw,52px); }
        .jr-list-h { font-family:'Eloma Sans Heading',sans-serif; font-weight:700; font-size:clamp(28px,3.6vw,54px); letter-spacing:-0.03em; color:${NAVY}; margin:14px 0 0; line-height:1; }
        .jr-filters { display:flex; flex-wrap:wrap; gap:8px; }
        .jr-pill { background:#fff; border:1px solid rgba(26,43,60,0.14); border-radius:99px; cursor:pointer;
          padding:9px 17px; font-family:'Eloma Sans',sans-serif; font-size:13px; font-weight:600; color:rgba(26,43,60,0.6);
          transition:transform 0.25s cubic-bezier(0.16,1,0.3,1), background 0.25s ease, border-color 0.25s ease, color 0.25s ease; }
        .jr-pill:hover { transform:translateY(-2px); border-color:${GREEN}; color:${GREEN}; }
        .jr-pill[data-active="true"] { background:${NAVY}; border-color:${NAVY}; color:#fff; }
        .jr-pill[data-active="true"]:hover { color:#fff; transform:translateY(-2px); }

        .jr-chip--soft { color:${NAVY}; background:rgba(19,41,61,0.06); }
        .jr-idx { display:flex; flex-direction:column; border-top:1px solid rgba(26,43,60,0.13); }
        .jr-idx-row { position:relative; display:grid; grid-template-columns:auto clamp(150px,16vw,220px) 1fr auto;
          gap:clamp(20px,2.6vw,44px); align-items:center; padding:clamp(24px,3vw,40px) clamp(8px,1.4vw,20px);
          border-bottom:1px solid rgba(26,43,60,0.13); cursor:pointer;
          transition:background 0.4s ease, padding-left 0.45s cubic-bezier(0.16,1,0.3,1); }
        .jr-idx-row:hover { background:linear-gradient(90deg, rgba(60,185,140,0.06), transparent 72%); padding-left:clamp(18px,2.4vw,40px); }
        .jr-idx-no { font-family:'Eloma Sans Heading',sans-serif; font-weight:700; font-size:clamp(20px,2vw,34px); letter-spacing:-0.02em; color:rgba(26,43,60,0.26); font-variant-numeric:tabular-nums; transition:color 0.35s ease; }
        .jr-idx-row:hover .jr-idx-no { color:${GREEN}; }
        .jr-idx-media { overflow:hidden; border-radius:14px; aspect-ratio:4/3; background:#eef3f1; }
        .jr-idx-media img { width:100%; height:100%; object-fit:cover; display:block; transition:transform 0.8s cubic-bezier(0.16,1,0.3,1); }
        .jr-idx-row:hover .jr-idx-media img { transform:scale(1.07); }
        .jr-idx-body { min-width:0; }
        .jr-idx-meta { display:flex; align-items:center; gap:12px; flex-wrap:wrap; margin-bottom:12px; }
        .jr-idx-title { font-family:'Eloma Sans Heading',sans-serif; font-weight:600; font-size:clamp(20px,2vw,32px); letter-spacing:-0.02em; line-height:1.16; color:${NAVY}; margin:0 0 10px; text-wrap:balance; transition:color 0.3s ease; }
        .jr-idx-row:hover .jr-idx-title { color:${GREEN}; }
        .jr-idx-ex { font-family:'Eloma Sans',sans-serif; font-size:clamp(13.5px,1vw,15.5px); line-height:1.65; color:${MUTED}; margin:0; max-width:680px;
          display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }
        .jr-idx-arrow { display:flex; align-items:center; justify-content:center; width:54px; height:54px; flex-shrink:0; border-radius:50%; color:${NAVY}; border:1px solid rgba(26,43,60,0.18); transition:transform 0.4s cubic-bezier(0.16,1,0.3,1), background 0.35s ease, color 0.35s ease, border-color 0.35s ease; }
        .jr-idx-row:hover .jr-idx-arrow { background:${GREEN}; color:#fff; border-color:${GREEN}; transform:translate(4px,-4px); }

        .jr-empty { grid-column:1/-1; text-align:center; font-family:'Eloma Sans',sans-serif; color:${MUTED}; font-size:16px; padding:70px 0; }

        /* ═══════ responsive ═══════ */
        @media (max-width:980px){
          .jr-list-head { align-items:flex-start; flex-direction:column; }
        }
        @media (max-width:860px){
          .jr-feat { grid-template-columns:1fr; }
          .jr-idx-row { grid-template-columns:auto 130px 1fr; }
          .jr-idx-arrow { display:none; }
        }
        @media (max-width:560px){
          .jr-feat-media { min-height:280px; }
          .jr-idx-row { grid-template-columns:1fr; gap:14px; }
          .jr-idx-no { position:absolute; top:clamp(20px,3vw,32px); right:6px; margin:0; }
          .jr-idx-media { aspect-ratio:16/9; }
        }
        @media (min-width:1920px){
          .jr-mast-in, .jr-list-in { max-width:none; }
          .jr-mast-h1 { font-size:112px; }
        }
      `}</style>
    </div>
  )
}
