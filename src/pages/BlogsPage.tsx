import { motion } from 'framer-motion'
import { ArrowRight, Cpu, Package, GitMerge, Building2, Truck, Leaf, Anchor, Share2 } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Header } from '../components/Header/Header'
import { Footer } from '../components/Footer'
import { InnerHero, PageCTA, NAVY, GREEN, CREAM, ease } from '../components/InnerHero'

const FEATURED = {
  category: 'Technology',
  date: 'May 2025',
  readTime: '6 min',
  title: 'How Technology Is Transforming Road Freight in Australia',
  excerpt: 'From AI-powered route optimisation to real-time carbon tracking, the freight industry is undergoing a quiet technological revolution. Forward-thinking logistics managers who understand these tools - and how to leverage them - will hold a decisive competitive edge heading into 2026 and beyond.',
  tags: ['Technology', 'Innovation', 'Road Freight'],
}

const POSTS = [
  {
    category: 'Technology',
    date: 'May 2025',
    readTime: '5 min',
    title: 'AI-Powered Dispatch: How Smart Freight Management Is Cutting Costs',
    excerpt: 'Machine learning dispatch engines are no longer science fiction - leading Australian carriers are deploying them at scale. AI-optimised routing, dynamic load matching, and predictive ETAs are reducing fuel costs by up to 18% while improving on-time delivery performance across national freight networks.',
    tags: ['AI', 'Dispatch', 'Cost Reduction'],
  },
  {
    category: 'Logistics',
    date: 'Apr 2025',
    readTime: '5 min',
    title: "Why Same-Day Delivery Is No Longer a Luxury - It's the New Baseline",
    excerpt: "Consumer expectations have been permanently reset. Same-day and next-day delivery windows - once a competitive differentiator - are now the minimum expectation for a growing share of Australian buyers. We break down which industries feel this pressure most and how to build last-mile infrastructure that delivers on the promise without destroying margin.",
    tags: ['Same-Day', 'Last Mile', 'Consumer Trends'],
  },
  {
    category: 'Supply Chain',
    date: 'Apr 2025',
    readTime: '7 min',
    title: 'Building Resilient Supply Chains: Hard Lessons from Recent Disruptions',
    excerpt: 'The supply chain shocks of the past three years exposed structural fragilities many businesses had been ignoring for decades. Single-source suppliers, just-in-time inventory with zero buffer, and over-reliance on single transport modes left companies stranded when disruption struck. Here are the structural changes actually working for Australian logistics teams.',
    tags: ['Resilience', 'Inventory', 'Risk Management'],
  },
  {
    category: 'Warehousing',
    date: 'Mar 2025',
    readTime: '6 min',
    title: 'The Case for Multi-Location Warehousing in a National Market',
    excerpt: "Centralised warehousing works - until your customers are distributed and SLAs demand next-day delivery across every state. We break down the economics of distributed fulfilment, the exact volume and geographic thresholds that trigger the business case, and how to structure a national warehousing network without doubling your overhead.",
    tags: ['Multi-Site', 'Distribution', '3PL'],
  },
  {
    category: 'Transportation',
    date: 'Mar 2025',
    readTime: '8 min',
    title: 'Interstate Freight: Everything Growing Businesses Need to Know',
    excerpt: "Moving freight between states for the first time is full of surprises - cubic weight calculations that differ from dead weight, carrier access restrictions on certain B-double routes, transit time variability around public holidays, and consignment documentation that doesn't always match what arrives. This is the complete guide for businesses stepping up to interstate freight programs.",
    tags: ['Interstate', 'Carrier Selection', 'Transit'],
  },
  {
    category: 'Sustainability',
    date: 'Feb 2025',
    readTime: '6 min',
    title: "Decarbonising Road Freight: What's Actually Achievable Right Now",
    excerpt: "Scope 3 emissions reporting is becoming a legal reality for many Australian businesses, placing freight squarely in the sustainability spotlight. Meaningful emissions reductions in road freight don't require waiting for full EV fleet rollout. Route consolidation, load optimisation, and smarter carrier selection deliver measurable impact today - here's the practical roadmap.",
    tags: ['Emissions', 'Carbon', 'Green Logistics'],
  },
  {
    category: 'Distribution',
    date: 'Jan 2025',
    readTime: '7 min',
    title: 'Freight Infrastructure for High-Growth E-Commerce: A Practical Playbook',
    excerpt: "Scaling from hundreds to tens of thousands of monthly orders exposes every inefficiency in your logistics stack. Manual carrier bookings, single-provider dependency, and spreadsheet tracking break down fast under growth pressure. This playbook covers carrier mix, WMS integration, 3PL handoff, and SLA governance - the decisions that let you scale without falling over.",
    tags: ['3PL', 'Scaling', 'Fulfilment'],
  },
  {
    category: 'Logistics',
    date: 'Dec 2024',
    readTime: '4 min',
    title: 'How Real-Time Tracking Is Transforming Shipper–Client Relationships',
    excerpt: "When clients can see exactly where their freight is at any moment, the conversation shifts from 'Where's my shipment?' to 'What's next?' Live tracking portals have fundamentally changed client expectations - and carriers that don't offer them are quietly losing accounts to those that do.",
    tags: ['Tracking', 'Client Experience', 'Visibility'],
  },
  {
    category: 'Supply Chain',
    date: 'Dec 2024',
    readTime: '6 min',
    title: 'When Is the Right Time to Move from Spot to Contract Logistics?',
    excerpt: "Spot freight is flexible - but at volume, it's inconsistent and significantly more expensive. We walk through the signals that indicate a business is ready for a managed logistics partnership, and the questions every operations manager should ask before signing a contract logistics agreement.",
    tags: ['Contract', 'Managed Logistics', 'Cost'],
  },
]

const CATEGORIES = ['All', 'Logistics', 'Warehousing', 'Distribution', 'Transportation', 'Ports', 'Technology', 'Sustainability', 'Supply Chain']

const CAT_COLORS: Record<string, string> = {
  Logistics:      GREEN,
  Warehousing:    '#9B59B6',
  Distribution:   '#F5A623',
  Transportation: NAVY,
  Ports:          '#0284C7',
  Technology:     '#5B8DEF',
  Sustainability: '#27AE60',
  'Supply Chain': '#E67E22',
}

const TOPIC_CARDS: { category: string; color: string; Icon: LucideIcon; count: number; desc: string }[] = [
  { category: 'Logistics',       color: GREEN,      Icon: Package,   count: 11, desc: 'End-to-end freight solutions, carrier management, and the operational excellence powering reliable delivery networks.' },
  { category: 'Warehousing',     color: '#9B59B6',  Icon: Building2, count: 8,  desc: 'Multi-location fulfilment, inventory management, and structuring 3PL partnerships that scale with your business.' },
  { category: 'Distribution',    color: '#F5A623',  Icon: Share2,    count: 9,  desc: 'Last-mile delivery, distribution network design, and the infrastructure behind fast, reliable order fulfilment.' },
  { category: 'Transportation',  color: NAVY,       Icon: Truck,     count: 14, desc: 'Road, air, and sea freight - carrier selection, load optimisation, and transit planning at national scale.' },
  { category: 'Ports',           color: '#0284C7',  Icon: Anchor,    count: 6,  desc: 'Port logistics, stevedoring, customs clearance, and the complexities of import and export freight movements.' },
  { category: 'Technology',      color: '#5B8DEF',  Icon: Cpu,       count: 12, desc: 'AI dispatch, fleet telematics, real-time tracking, and digital tools reshaping Australian logistics.' },
  { category: 'Sustainability',  color: '#27AE60',  Icon: Leaf,      count: 7,  desc: 'Carbon reduction, Scope 3 reporting, and green logistics strategies that are achievable right now.' },
  { category: 'Supply Chain',    color: '#E67E22',  Icon: GitMerge,  count: 10, desc: 'Resilience, dual-sourcing, and building supply chains that survive disruption and deliver consistency under pressure.' },
]

export function BlogsPage() {
  return (
    <div style={{ background: CREAM, overflowX: 'hidden' }}>
      <Header />
      <main>
        <InnerHero
          badge="Insights"
          line1="INDUSTRY"
          line2="BLOG."
          description="Expert perspectives on freight, logistics, supply chain, and technology - from the people who move Australia's goods every day."
        />

        {/* ── FEATURED POST ───────────────────────────────────────────── */}
        <section style={{ background: NAVY, padding: 'clamp(64px,9vw,120px) clamp(24px,5vw,80px)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.025) 1px, transparent 1px)', backgroundSize: '28px 28px', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', top: -100, right: -100, width: 600, height: 600, borderRadius: '50%', background: `radial-gradient(circle, ${GREEN}0D 0%, transparent 60%)`, pointerEvents: 'none' }} />

          <div style={{ maxWidth: 1760, margin: '0 auto', position: 'relative', zIndex: 1 }} className="featured-inner">
            {/* Eyebrow */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 40 }}>
              <div style={{ width: 28, height: 2, background: GREEN, borderRadius: 2 }} />
              <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.32)' }}>Featured Post</span>
              <div style={{ width: 28, height: 2, background: 'rgba(255,255,255,0.08)', borderRadius: 2 }} />
            </div>

            {/* Editorial card */}
            <motion.div
              initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.9, ease }}
              style={{ borderRadius: 24, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', display: 'grid', gridTemplateColumns: '1fr 380px' }}
              className="featured-card"
            >
              {/* LEFT — cream content panel */}
              <div style={{ background: CREAM, padding: 'clamp(40px,4vw,64px)', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
                {/* Faint watermark number */}
                <div style={{ position: 'absolute', top: -20, right: -12, fontSize: 'clamp(80px,14vw,200px)', fontWeight: 900, color: 'rgba(8,33,60,0.04)', letterSpacing: '-0.05em', lineHeight: 1, pointerEvents: 'none', userSelect: 'none' }}>01</div>

                {/* Meta row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32, flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
                  <span style={{ fontSize: 10, fontWeight: 800, color: '#fff', background: CAT_COLORS[FEATURED.category] || GREEN, borderRadius: 100, padding: '5px 14px', letterSpacing: '1.5px', textTransform: 'uppercase' }}>{FEATURED.category}</span>
                  <span style={{ fontSize: 12, color: 'rgba(8,33,60,0.38)', fontWeight: 600 }}>{FEATURED.date}</span>
                  <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'rgba(8,33,60,0.2)', flexShrink: 0 }} />
                  <span style={{ fontSize: 12, color: 'rgba(8,33,60,0.38)', fontWeight: 600 }}>{FEATURED.readTime} read</span>
                </div>

                {/* Headline */}
                <h2 style={{ fontSize: 'clamp(32px,4.5vw,72px)', fontWeight: 900, color: NAVY, letterSpacing: '-0.04em', lineHeight: 0.95, margin: '0 0 28px', textTransform: 'uppercase', position: 'relative', zIndex: 1 }}>
                  {FEATURED.title.split(' ').slice(0, -3).join(' ')}{' '}
                  <span style={{ color: GREEN }}>{FEATURED.title.split(' ').slice(-3).join(' ')}</span>
                </h2>

                {/* Accent divider */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
                  <div style={{ width: 44, height: 3, background: GREEN, borderRadius: 2, flexShrink: 0 }} />
                  <div style={{ flex: 1, height: 1, background: 'rgba(8,33,60,0.08)' }} />
                </div>

                {/* Excerpt */}
                <p style={{ fontSize: 'clamp(14px,1.15vw,17px)', color: 'rgba(8,33,60,0.55)', lineHeight: 1.88, margin: '0 0 32px', flex: 1, position: 'relative', zIndex: 1 }}>{FEATURED.excerpt}</p>

                {/* Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 36 }}>
                  {FEATURED.tags.map(tag => (
                    <span key={tag} style={{ fontSize: 11, fontWeight: 700, color: NAVY, background: 'rgba(8,33,60,0.06)', borderRadius: 100, padding: '6px 14px', border: '1px solid rgba(8,33,60,0.1)' }}>{tag}</span>
                  ))}
                </div>

                {/* CTA */}
                <div>
                  <a href="#blog-posts" style={{
                    display: 'inline-flex', alignItems: 'center', gap: 10,
                    background: NAVY, color: '#fff', borderRadius: 100,
                    padding: '14px 30px', fontSize: 14, fontWeight: 700,
                    textDecoration: 'none', transition: 'all 0.22s ease',
                    minHeight: 44,
                  }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = GREEN }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = NAVY }}
                  >
                    <ArrowRight size={14} strokeWidth={2.5} /> Read Article
                  </a>
                </div>
              </div>

              {/* RIGHT — dark visual panel */}
              <div style={{ background: '#061828', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 'clamp(32px,3vw,48px)' }}>
                {/* Diagonal stripe texture */}
                <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(135deg, rgba(255,255,255,0.015) 0px, rgba(255,255,255,0.015) 1px, transparent 1px, transparent 32px)', pointerEvents: 'none' }} />
                {/* Bottom-right green glow */}
                <div style={{ position: 'absolute', bottom: -80, right: -80, width: 320, height: 320, borderRadius: '50%', background: `radial-gradient(circle, ${GREEN}22 0%, transparent 65%)`, pointerEvents: 'none' }} />
                {/* Left green border */}
                <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: `linear-gradient(to bottom, ${GREEN}, ${GREEN}00)` }} />

                {/* Article index */}
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', marginBottom: 8 }}>Article Index</div>
                  <div style={{ fontSize: 'clamp(56px,8vw,100px)', fontWeight: 900, color: 'rgba(255,255,255,0.06)', letterSpacing: '-0.05em', lineHeight: 1 }}>01</div>
                </div>

                {/* Topics */}
                <div style={{ position: 'relative', zIndex: 1, padding: '24px 0', borderTop: '1px solid rgba(255,255,255,0.07)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                  <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', marginBottom: 12 }}>Topics Covered</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                    {FEATURED.tags.map(tag => (
                      <span key={tag} style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.45)', background: 'rgba(255,255,255,0.06)', borderRadius: 100, padding: '5px 12px', border: '1px solid rgba(255,255,255,0.09)' }}>{tag}</span>
                    ))}
                  </div>
                </div>

                {/* Stats grid */}
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    {([
                      { label: 'Read Time', value: FEATURED.readTime },
                      { label: 'Category',  value: FEATURED.category },
                      { label: 'Published', value: FEATURED.date },
                      { label: 'Author',    value: 'BIVRY Team' },
                    ] as { label: string; value: string }[]).map(item => (
                      <div key={item.label}>
                        <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', marginBottom: 4 }}>{item.label}</div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.55)' }}>{item.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── BLOG GRID ────────────────────────────────────────────────── */}
        <section id="blog-posts" style={{ background: '#fff', padding: 'clamp(72px,10vw,120px) clamp(24px,5vw,80px)' }}>
          <div style={{ maxWidth: 1760, margin: '0 auto' }} className="posts-inner">
            {/* Category pills */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 64 }}>
              {CATEGORIES.map((c, i) => (
                <button key={c} style={{
                  padding: '12px 18px', borderRadius: 100, fontSize: 13, fontWeight: 600,
                  color: i === 0 ? '#fff' : NAVY,
                  background: i === 0 ? NAVY : 'transparent',
                  border: '1.5px solid', borderColor: i === 0 ? NAVY : 'rgba(8,33,60,0.12)',
                  cursor: 'pointer', transition: 'all 0.18s ease', minHeight: 44,
                }}
                  onMouseEnter={e => { if (i !== 0) { const el = e.currentTarget as HTMLElement; el.style.borderColor = NAVY; el.style.background = CREAM } }}
                  onMouseLeave={e => { if (i !== 0) { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(8,33,60,0.12)'; el.style.background = 'transparent' } }}
                >{c}</button>
              ))}
            </div>

            {/* Post grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }} className="blog-grid">
              {POSTS.map((post, i) => (
                <motion.article key={post.title}
                  initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.07, ease }}
                  style={{ background: CREAM, borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(8,33,60,0.06)', display: 'flex', flexDirection: 'column', cursor: 'pointer' }}
                  whileHover={{ y: -4, boxShadow: '0 16px 48px rgba(8,33,60,0.1)' }}
                >
                  <div style={{ height: 3, background: CAT_COLORS[post.category] || GREEN }} />
                  <div style={{ padding: 'clamp(22px,2.5vw,32px)', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18, flexWrap: 'wrap' }}>
                      <span style={{ fontSize: 10, fontWeight: 800, color: CAT_COLORS[post.category] || GREEN, textTransform: 'uppercase', letterSpacing: '1.5px' }}>{post.category}</span>
                      <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'rgba(8,33,60,0.2)', flexShrink: 0 }} />
                      <span style={{ fontSize: 11, color: 'rgba(8,33,60,0.38)', fontWeight: 600 }}>{post.date}</span>
                      <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'rgba(8,33,60,0.2)', flexShrink: 0 }} />
                      <span style={{ fontSize: 11, color: 'rgba(8,33,60,0.38)', fontWeight: 600 }}>{post.readTime} read</span>
                    </div>
                    <h3 style={{ fontSize: 'clamp(24px,2vw,28px)', fontWeight: 900, color: NAVY, margin: '0 0 12px', letterSpacing: '-0.03em', lineHeight: 1.2, textTransform: 'uppercase', flex: 1 }}>{post.title}</h3>
                    <p style={{ fontSize: 'clamp(13px,1vw,14px)', color: 'rgba(8,33,60,0.5)', lineHeight: 1.75, margin: '0 0 24px' }}>{post.excerpt.slice(0, 130)}…</p>
                    <a href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 13, fontWeight: 700, color: NAVY, textDecoration: 'none', transition: 'color 0.18s ease', minHeight: 44 }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = GREEN }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = NAVY }}
                    >
                      <ArrowRight size={13} strokeWidth={2.5} /> Read More
                    </a>
                  </div>
                </motion.article>
              ))}
            </div>

          </div>
        </section>

        {/* ── EXPLORE BY TOPIC ─────────────────────────────────────────── */}
        <section style={{ background: CREAM, padding: 'clamp(64px,8vw,100px) clamp(24px,5vw,80px)' }}>
          <div style={{ maxWidth: 1760, margin: '0 auto' }} className="topics-inner">
            {/* Header row */}
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 32, marginBottom: 'clamp(40px,5vw,64px)', flexWrap: 'wrap' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 16 }}>
                  <div style={{ width: 3, height: 14, background: GREEN, borderRadius: 2 }} />
                  <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(8,33,60,0.38)' }}>Browse</span>
                </div>
                <h2 style={{ fontSize: 'clamp(52px,5vw,72px)', fontWeight: 900, color: NAVY, letterSpacing: '-0.04em', lineHeight: 0.95, margin: 0, textTransform: 'uppercase' }}>
                  EXPLORE <span style={{ color: GREEN }}>BY TOPIC.</span>
                </h2>
              </div>
              <p style={{ fontSize: 'clamp(14px,1.1vw,16px)', color: 'rgba(8,33,60,0.5)', lineHeight: 1.75, maxWidth: 380, margin: 0 }}>
                Eight categories covering every dimension of modern freight - from ports to sustainability.
              </p>
            </div>

            {/* Topic cards grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }} className="topics-grid">
              {TOPIC_CARDS.map((topic, i) => (
                <motion.a key={topic.category} href="#blog-posts"
                  initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.07, ease }}
                  style={{ background: '#fff', borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(8,33,60,0.07)', textDecoration: 'none', display: 'flex', flexDirection: 'column', cursor: 'pointer' }}
                  whileHover={{ y: -5, boxShadow: '0 20px 56px rgba(8,33,60,0.1)' }}
                >
                  <div style={{ height: 4, background: topic.color, flexShrink: 0 }} />
                  <div style={{ padding: 'clamp(24px,2.5vw,32px)', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    {/* Icon bubble */}
                    <div style={{ width: 46, height: 46, borderRadius: 13, background: `${topic.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, flexShrink: 0 }}>
                      <topic.Icon size={20} strokeWidth={2} color={topic.color} />
                    </div>
                    {/* Article count */}
                    <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', color: topic.color, marginBottom: 8 }}>{topic.count} Articles</div>
                    {/* Category name */}
                    <h3 style={{ fontSize: 'clamp(24px,2vw,30px)', fontWeight: 900, color: NAVY, margin: '0 0 10px', letterSpacing: '-0.03em', textTransform: 'uppercase', lineHeight: 1.1, flex: 1 }}>{topic.category}</h3>
                    {/* Description */}
                    <p style={{ fontSize: 'clamp(12px,0.9vw,13px)', color: 'rgba(8,33,60,0.45)', lineHeight: 1.65, margin: '0 0 20px' }}>{topic.desc}</p>
                    {/* Browse link */}
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 800, color: topic.color, letterSpacing: '0.3px' }}>
                      <ArrowRight size={12} strokeWidth={2.5} /> Browse
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        <PageCTA line1="SHIP WITH" line2="CONFIDENCE." buttonLabel="Get a Quote" />
      </main>
      <Footer />
      <style>{`
        @media (max-width: 1200px) {
          .topics-grid { grid-template-columns: repeat(3,1fr) !important; }
        }
        @media (max-width: 1100px) {
          .blog-grid { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media (max-width: 900px) {
          .featured-card { grid-template-columns: 1fr !important; }
          .featured-card-visual { display: none !important; }
          .topics-grid { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media (max-width: 800px) {
          .blog-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 540px) {
          .topics-grid { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 1920px) {
          .featured-inner, .posts-inner, .topics-inner { max-width: 1900px !important; }
        }
        @media (min-width: 2560px) {
          .featured-inner, .posts-inner, .topics-inner { max-width: 2400px !important; }
        }
      `}</style>
    </div>
  )
}
