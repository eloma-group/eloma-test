import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Header } from '../components/Header/Header'
import { FlyFooter } from '../components/FlyFooter'
import { PageHero, PageCTA, NAVY, GREEN, MUTED, EASE } from '../components/PageKit'

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1100&q=80`

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

  return (
    <div style={{ overflowX: 'hidden', background: '#fff' }}>
      <Header />

      <PageHero
        badge="Insights & Ideas"
        line1="The Eloma"
        line2="journal."
        description="Perspectives from across the group - technology, strategy, logistics, customer experience and the long-term thinking that ties them together."
      />

      {/* ── Featured (airy editorial split) ── */}
      <section style={{ background: '#fff', padding: 'clamp(44px,5.5vw,84px) clamp(24px,5vw,80px) clamp(24px,3vw,40px)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <motion.article className="fb-feat"
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: EASE }}>
            <div className="fb-feat-media">
              <img src={img(feat.img)} alt={feat.title} loading="lazy" decoding="async" />
            </div>
            <div className="fb-feat-body">
              <div className="fb-tag-row">
                <span className="fb-tag fb-tag--feat">Featured</span>
                <span className="fb-tag">{feat.cat}</span>
              </div>
              <h2 className="fb-feat-title">{feat.title}</h2>
              <p className="fb-feat-ex">{feat.excerpt}</p>
              <div className="fb-feat-foot">
                <span className="fb-meta">{feat.date} · {feat.read} read</span>
                <span className="fb-read">Read article <ArrowUpRight size={16} strokeWidth={2.4} /></span>
              </div>
            </div>
          </motion.article>
        </div>
      </section>

      {/* ── Editorial list ── */}
      <section style={{ background: '#fff', padding: 'clamp(28px,3.5vw,52px) clamp(24px,5vw,80px) clamp(64px,8vw,120px)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div className="fb-bar">
            <h3 className="fb-bar-title">All articles</h3>
            <div className="fb-filters">
              {CATS.map(c => (
                <button key={c} onClick={() => setCat(c)} className="fb-filter" data-active={c === cat}>{c}</button>
              ))}
            </div>
          </div>

          <div className="fb-list">
            {rest.map((p, i) => (
              <motion.article key={p.title} className="fb-row"
                initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.55, delay: Math.min(i, 4) * 0.06, ease: EASE }}>
                <div className="fb-row-media">
                  <img src={img(p.img)} alt={p.title} loading="lazy" decoding="async" />
                </div>
                <div className="fb-row-body">
                  <div className="fb-tag-row">
                    <span className="fb-tag">{p.cat}</span>
                    <span className="fb-meta">{p.date} · {p.read} read</span>
                  </div>
                  <h4 className="fb-row-title">{p.title}</h4>
                  <p className="fb-row-ex">{p.excerpt}</p>
                </div>
                <span className="fb-row-arrow" aria-hidden><ArrowUpRight size={20} strokeWidth={2.2} /></span>
              </motion.article>
            ))}
            {rest.length === 0 && (
              <p className="fb-empty">No stories in this category yet — check back soon.</p>
            )}
          </div>
        </div>
      </section>

      <PageCTA line1="Want our latest" line2="thinking?" sub="Subscribe to updates from across the Eloma group." buttonLabel="Get in Touch" />
      <FlyFooter />

      <style>{`
        /* ── Shared tags / meta ── */
        .fb-tag-row { display:flex; align-items:center; gap:12px; flex-wrap:wrap; }
        .fb-tag { font-family:'Inter',sans-serif; font-size:11px; font-weight:700; letter-spacing:1px;
          text-transform:uppercase; color:${NAVY}; background:rgba(19,41,61,0.06); padding:5px 12px; border-radius:99px; }
        .fb-tag--feat { color:#fff; background:${GREEN}; }
        .fb-meta { font-family:'Inter',sans-serif; font-size:12.5px; font-weight:600; color:rgba(26,43,60,0.45); letter-spacing:0.2px; }
        .fb-read { display:inline-flex; align-items:center; gap:7px; font-family:'Poppins',sans-serif; font-weight:600;
          font-size:14px; color:${NAVY}; }
        .fb-read svg { color:${GREEN}; transition:transform 0.4s ${'cubic-bezier(0.16,1,0.3,1)'}; }

        /* ── Featured split ── */
        .fb-feat { display:grid; grid-template-columns:1.2fr 1fr; gap:clamp(28px,4vw,72px); align-items:center; cursor:pointer; }
        .fb-feat-media { overflow:hidden; border-radius:24px; aspect-ratio:16/11; background:#eef3f1; }
        .fb-feat-media img { width:100%; height:100%; object-fit:cover; display:block;
          transition:transform 0.9s ${'cubic-bezier(0.16,1,0.3,1)'}; }
        .fb-feat:hover .fb-feat-media img { transform:scale(1.05); }
        .fb-feat-title { font-family:'Poppins',sans-serif; font-weight:700; letter-spacing:-0.025em; line-height:1.1;
          font-size:clamp(28px,3.4vw,50px); color:${NAVY}; margin:clamp(18px,1.8vw,24px) 0 clamp(14px,1.4vw,18px); text-wrap:balance;
          transition:color 0.3s ease; }
        .fb-feat:hover .fb-feat-title { color:${GREEN}; }
        .fb-feat-ex { font-family:'Inter',sans-serif; font-size:clamp(14px,1.15vw,17px); line-height:1.75; color:${MUTED};
          margin:0 0 clamp(24px,2.4vw,32px); max-width:520px; }
        .fb-feat-foot { display:flex; align-items:center; gap:22px; flex-wrap:wrap; }
        .fb-feat:hover .fb-read svg { transform:translate(3px,-3px); }

        /* ── Filter bar ── */
        .fb-bar { display:flex; align-items:flex-end; justify-content:space-between; gap:24px; flex-wrap:wrap;
          padding-bottom:clamp(18px,2vw,26px); border-bottom:1px solid rgba(26,43,60,0.1); }
        .fb-bar-title { font-family:'Poppins',sans-serif; font-weight:700; font-size:clamp(19px,1.7vw,25px);
          letter-spacing:-0.02em; color:${NAVY}; margin:0; }
        .fb-filters { display:flex; flex-wrap:wrap; gap:6px 20px; }
        .fb-filter { position:relative; background:none; border:none; cursor:pointer; padding:4px 0;
          font-family:'Inter',sans-serif; font-size:13.5px; font-weight:600; color:rgba(26,43,60,0.5);
          transition:color 0.25s ease; }
        .fb-filter:hover { color:${NAVY}; }
        .fb-filter[data-active="true"] { color:${NAVY}; }
        .fb-filter[data-active="true"]::after { content:''; position:absolute; left:0; right:0; bottom:-2px; height:2px;
          background:${GREEN}; border-radius:2px; }

        /* ── List rows ── */
        .fb-list { display:flex; flex-direction:column; }
        .fb-row { display:grid; grid-template-columns:clamp(160px,18vw,240px) 1fr auto; gap:clamp(22px,3vw,56px);
          align-items:center; padding:clamp(24px,3vw,40px) clamp(14px,1.6vw,26px);
          border-bottom:1px solid rgba(26,43,60,0.09); margin:0 calc(-1 * clamp(14px,1.6vw,26px));
          border-radius:18px; cursor:pointer; transition:background 0.35s ease; }
        .fb-row:hover { background:linear-gradient(180deg,#ffffff,#f5faf8); }
        .fb-row-media { overflow:hidden; border-radius:14px; aspect-ratio:4/3; background:#eef3f1; }
        .fb-row-media img { width:100%; height:100%; object-fit:cover; display:block;
          transition:transform 0.8s ${'cubic-bezier(0.16,1,0.3,1)'}; }
        .fb-row:hover .fb-row-media img { transform:scale(1.07); }
        .fb-row-body { min-width:0; }
        .fb-row-title { font-family:'Poppins',sans-serif; font-weight:600; font-size:clamp(19px,1.9vw,29px);
          letter-spacing:-0.02em; line-height:1.2; color:${NAVY}; margin:12px 0 10px; text-wrap:balance;
          transition:color 0.3s ease; }
        .fb-row:hover .fb-row-title { color:${GREEN}; }
        .fb-row-ex { font-family:'Inter',sans-serif; font-size:clamp(13.5px,1vw,15.5px); line-height:1.65; color:${MUTED};
          margin:0; max-width:640px; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }
        .fb-row-arrow { display:flex; align-items:center; justify-content:center; width:52px; height:52px; flex-shrink:0;
          border-radius:50%; color:${NAVY}; border:1px solid rgba(26,43,60,0.16);
          transition:transform 0.4s ${'cubic-bezier(0.16,1,0.3,1)'}, background 0.35s ease, color 0.35s ease, border-color 0.35s ease; }
        .fb-row:hover .fb-row-arrow { background:${GREEN}; color:#fff; border-color:${GREEN}; transform:translate(4px,-4px); }

        .fb-empty { text-align:center; font-family:'Inter',sans-serif; color:${MUTED}; font-size:16px; padding:70px 0; }

        @media (max-width: 860px) {
          .fb-feat { grid-template-columns:1fr; }
          .fb-row { grid-template-columns:130px 1fr; }
          .fb-row-arrow { display:none; }
        }
        @media (max-width: 560px) {
          .fb-row { grid-template-columns:1fr; gap:16px; }
          .fb-row-media { aspect-ratio:16/9; }
          .fb-bar { flex-direction:column; align-items:flex-start; }
        }
      `}</style>
    </div>
  )
}
