import { useState } from 'react'
import { motion } from 'framer-motion'
import { Header } from '../components/Header/Header'
import { FlyFooter } from '../components/FlyFooter'
import { PageHero, PageCTA, Eyebrow, NAVY, GREEN, MUTED, EASE } from '../components/PageKit'

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=80`

const POSTS = [
  { cat: 'Technology', title: 'Building a digital backbone across a multi-business group', date: 'Jun 2026', read: '6 min', img: 'photo-1498050108023-c5249f4df085', feat: true,
    excerpt: 'Shared infrastructure lets independent companies move faster without losing their edge. We look at how a common technology backbone - cloud, data and security - powers every business in the group while keeping each one free to run its own way.' },
  { cat: 'Strategy', title: 'Why we build for the decade, not the quarter', date: 'Jun 2026', read: '4 min', img: 'photo-1486406146926-c627a92ad1ab',
    excerpt: 'Long-term thinking shapes every decision we make. Here is why patient capital, durable systems and steady investment beat chasing short-term wins - and how that mindset compounds across our companies.' },
  { cat: 'Logistics', title: 'Resilient supply chains in an unpredictable world', date: 'May 2026', read: '5 min', img: 'photo-1586528116311-ad8dd3c8310d',
    excerpt: 'From port to doorstep, disruption is now the norm. We break down the visibility, redundancy and local partnerships that keep goods moving when routes, demand and conditions change overnight.' },
  { cat: 'Customer Experience', title: 'People-first BPO: relationships over transactions', date: 'May 2026', read: '4 min', img: 'photo-1556745757-8d76bdb6984b',
    excerpt: 'Great support is built on people, not scripts. A closer look at how our teams turn every interaction into a lasting relationship - blending empathy, training and the right technology at scale.' },
  { cat: 'Sustainability', title: 'Responsible growth across eight markets', date: 'Apr 2026', read: '7 min', img: 'photo-1466611653911-95081537e5b7',
    excerpt: 'Growth and responsibility are not a trade-off. We share how we measure impact, cut waste and hold ourselves to ethical, future-ready practices across every market we operate in.' },
  { cat: 'Travel', title: 'Designing corporate travel around people', date: 'Apr 2026', read: '3 min', img: 'photo-1436491865332-7a61a109cc05',
    excerpt: 'Business travel should work for travellers, not against them. We rethink corporate trips around comfort, flexibility and care - so people arrive ready, not drained.' },
  { cat: 'Technology', title: 'Security by design in a connected group', date: 'Mar 2026', read: '6 min', img: 'photo-1550751827-4bd374c3f58b',
    excerpt: 'When companies share a backbone, security cannot be an afterthought. We explain how national-grade standards, layered defences and a security-first culture protect the whole group.' },
]

const CATS = ['All', 'Technology', 'Strategy', 'Logistics', 'Customer Experience', 'Sustainability', 'Travel']

export function BlogsPage() {
  const [cat, setCat] = useState('All')
  const feat = POSTS.find(p => p.feat)!
  const rest = POSTS.filter(p => !p.feat).filter(p => cat === 'All' || p.cat === cat)

  return (
    <div style={{ overflowX: 'hidden', background: '#fff' }}>
      <Header />

      <PageHero
        badge="Insights & Ideas"
        line1="The Eloma"
        line2="journal."
        description="Perspectives from across the group - technology, strategy, logistics, customer experience and the long-term thinking that ties them together."
      />

      {/* ── Featured ── */}
      <section style={{ background: 'linear-gradient(180deg,#ffffff,#f3faf7)', padding: 'clamp(48px,6vw,90px) clamp(24px,5vw,80px)' }}>
        <div style={{ maxWidth: 1760, margin: '0 auto' }}>
          <motion.div className="bl-feat"
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: EASE }}>
            <div className="bl-feat-img"><img src={img(feat.img)} alt={feat.title} loading="lazy" decoding="async" /></div>
            <div className="bl-feat-body">
              <Eyebrow label={`Featured · ${feat.cat}`} />
              <h2 className="bl-feat-title">{feat.title}</h2>
              <p className="bl-feat-ex">{feat.excerpt}</p>
              <div className="bl-meta">{feat.date} · {feat.read} read</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Grid ── */}
      <section style={{ background: '#fff', padding: 'clamp(48px,6vw,90px) clamp(24px,5vw,80px) clamp(64px,8vw,120px)' }}>
        <div style={{ maxWidth: 1760, margin: '0 auto' }}>
          <div className="bl-cats">
            {CATS.map(c => (
              <button key={c} onClick={() => setCat(c)} className="bl-chip" data-active={c === cat}>{c}</button>
            ))}
          </div>
          <div className="bl-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20, marginTop: 36 }}>
            {rest.map((p, i) => (
              <motion.div key={p.title} className="bl-card"
                initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.55, delay: (i % 3) * 0.08, ease: EASE }}>
                <div className="bl-card-img"><img src={img(p.img)} alt={p.title} loading="lazy" decoding="async" /><span className="bl-card-cat">{p.cat}</span></div>
                <div className="bl-card-body">
                  <h3 className="bl-card-title">{p.title}</h3>
                  <p className="bl-card-ex">{p.excerpt}</p>
                  <div className="bl-card-foot"><span className="bl-meta">{p.date} · {p.read} read</span></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <PageCTA line1="Want our latest" line2="thinking?" sub="Subscribe to updates from across the Eloma group." buttonLabel="Get in Touch" />
      <FlyFooter />

      <style>{`
        .bl-feat { display:grid; grid-template-columns: 1.1fr 1fr; gap:0; text-decoration:none; border:1px solid rgba(26,43,60,0.08); border-radius:26px; overflow:hidden; background:#fff; transition: box-shadow 0.5s ease, transform 0.5s ${'cubic-bezier(0.16,1,0.3,1)'}; }
        .bl-feat:hover { transform: translateY(-6px); box-shadow:0 40px 80px -44px rgba(19,41,61,0.4); }
        .bl-feat-img { overflow:hidden; min-height:320px; }
        .bl-feat-img img { width:100%; height:100%; object-fit:cover; display:block; transition: transform 0.7s ${'cubic-bezier(0.16,1,0.3,1)'}; }
        .bl-feat:hover .bl-feat-img img { transform: scale(1.06); }
        .bl-feat-body { padding: clamp(28px,3.4vw,56px); display:flex; flex-direction:column; justify-content:center; }
        .bl-feat-title { font-family:'Poppins',sans-serif; font-weight:700; font-size:clamp(24px,2.8vw,40px); color:${NAVY}; letter-spacing:-0.02em; line-height:1.12; margin:16px 0 16px; }
        .bl-feat-ex { font-family:'Inter',sans-serif; font-size:clamp(14px,1.1vw,16px); color:${MUTED}; line-height:1.75; margin:0 0 20px; }
        .bl-meta { font-family:'Inter',sans-serif; font-size:12.5px; color:rgba(26,43,60,0.4); font-weight:600; letter-spacing:0.3px; }

        .bl-cats { display:flex; flex-wrap:wrap; gap:10px; }
        .bl-chip { font-family:'Inter',sans-serif; font-size:13.5px; font-weight:600; color:${NAVY}; cursor:pointer; padding:9px 18px; border-radius:99px; border:1px solid rgba(26,43,60,0.16); background:#fff; transition: all 0.25s ease; }
        .bl-chip:hover { border-color:${GREEN}; transform:translateY(-1px); }
        .bl-chip[data-active="true"] { background:${GREEN}; color:#fff; border-color:${GREEN}; box-shadow:0 10px 22px -10px rgba(60,185,140,0.7); }

        .bl-card { display:flex; flex-direction:column; text-decoration:none; border:1px solid rgba(26,43,60,0.08); border-radius:22px; overflow:hidden; background:#fff; transition: transform 0.45s ${'cubic-bezier(0.16,1,0.3,1)'}, box-shadow 0.45s ease, border-color 0.45s ease; }
        .bl-card:hover { transform:translateY(-8px); border-color:${GREEN}; box-shadow:0 34px 64px -36px rgba(19,41,61,0.4); }
        .bl-card-img { position:relative; overflow:hidden; aspect-ratio: 16/10; }
        .bl-card-img img { width:100%; height:100%; object-fit:cover; display:block; transition: transform 0.7s ${'cubic-bezier(0.16,1,0.3,1)'}; }
        .bl-card:hover .bl-card-img img { transform: scale(1.08); }
        .bl-card-cat { position:absolute; top:12px; left:12px; font-family:'Inter',sans-serif; font-size:10.5px; font-weight:800; letter-spacing:1px; text-transform:uppercase; color:#fff; background:rgba(19,41,61,0.7); backdrop-filter:blur(4px); padding:6px 12px; border-radius:99px; }
        .bl-card-body { padding: clamp(20px,2vw,28px); display:flex; flex-direction:column; flex:1; }
        .bl-card-title { font-family:'Poppins',sans-serif; font-weight:600; font-size:clamp(17px,1.4vw,20px); color:${NAVY}; letter-spacing:-0.01em; line-height:1.3; margin:0 0 12px; }
        .bl-card-ex { font-family:'Inter',sans-serif; font-size:clamp(13.5px,1vw,15px); color:${MUTED}; line-height:1.7; margin:0 0 18px; }
        .bl-card-foot { display:flex; align-items:center; justify-content:space-between; margin-top:auto; }

        @media (max-width: 900px) { .bl-feat { grid-template-columns: 1fr !important; } .bl-feat-img { min-height:240px; } .bl-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 600px) { .bl-grid { grid-template-columns: 1fr !important; } }
        @media (min-width: 1920px) { .bl-grid { max-width: 1900px; } }
      `}</style>
    </div>
  )
}
