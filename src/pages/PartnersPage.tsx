import { motion } from 'framer-motion'
import { Globe2, Network, Handshake, Sprout, Check } from 'lucide-react'
import { Header } from '../components/Header/Header'
import { FlyFooter } from '../components/FlyFooter'
import { PageCTA, NAVY, GREEN, MUTED, EASE } from '../components/PageKit'

type Partner = { name: string; sector: string; logo: string; body: string }

const PARTNERS: Partner[] = [
  { name: 'Microsoft', sector: 'Technology & Cloud', logo: '/partners/microsoft.svg', body: 'As one of the world’s leading technology companies, Microsoft supports businesses through innovative digital solutions, cloud technologies, productivity tools, and enterprise systems. Our association reflects our commitment to embracing technology that drives growth, efficiency, and innovation.' },
  { name: 'Amazon Web Services', sector: 'Cloud & Infrastructure', logo: '/partners/aws.svg', body: 'As the world’s most comprehensive and broadly adopted cloud platform, Amazon Web Services (AWS) powers businesses with secure, scalable infrastructure, advanced computing, storage, and intelligent data solutions. Our association with AWS reflects our commitment to building reliable, future-ready systems that drive transformation at scale.' },
  { name: 'Google Cloud', sector: 'Cloud & Data Platform', logo: '/partners/googlecloud.svg', body: 'Google Cloud delivers secure, intelligent infrastructure trusted by enterprises worldwide - spanning compute, data analytics, and industry-leading AI. Working alongside platforms like Google Cloud keeps our solutions fast, scalable, and ready for what comes next.' },
  { name: 'Oracle', sector: 'Enterprise Software & Database', logo: '/partners/oracle.svg', body: 'Oracle is a global leader in enterprise software, databases, and cloud applications that run mission-critical operations for organizations of every size. Our association with Oracle underpins the reliability and performance our clients depend on.' },
  { name: 'Salesforce', sector: 'CRM & Customer Platform', logo: '/partners/salesforce.svg', body: 'Salesforce is the world’s leading customer relationship platform, helping organizations unify sales, service, and marketing around a single view of the customer. Our alignment with Salesforce reflects a commitment to building lasting, data-driven customer relationships.' },
  { name: 'Shopify', sector: 'Commerce & Retail', logo: '/partners/shopify.svg', body: 'Shopify powers millions of businesses with a flexible commerce platform built for growth - from first sale to global scale. Collaborating with commerce leaders like Shopify strengthens our ability to deliver modern, conversion-ready retail experiences.' },
  { name: 'Zoho', sector: 'Business Software Suite', logo: '/partners/zoho.svg', body: 'Zoho offers a comprehensive suite of cloud business applications spanning sales, finance, operations, and collaboration. Partnering with Zoho lets us deliver integrated, cost-effective tools that help businesses operate smarter from a single ecosystem.' },
  { name: 'Sage', sector: 'Accounting & ERP', logo: '/partners/sage.svg', body: 'Sage is a trusted name in accounting, finance, and ERP software, helping businesses manage cash flow, compliance, and growth with confidence. Our work alongside Sage reinforces our focus on accurate, accountable financial operations.' },
  { name: 'Amazon', sector: 'Global Commerce & Technology', logo: '/partners/amazon.svg', body: 'Amazon is one of the world’s most influential companies, setting the global standard for commerce, logistics, and customer-centric innovation. Aligning with a brand like Amazon reflects our commitment to operational excellence, scale, and a relentless focus on the customer.' },
  { name: 'Tesla', sector: 'Innovation & Engineering', logo: '/partners/tesla.svg', body: 'Known for its innovation and forward-thinking approach, Tesla represents excellence in engineering, sustainability, and technological advancement. Partnerships with globally recognized brands like Tesla reinforce our focus on modern, future-ready business solutions.' },
  { name: 'Isuzu', sector: 'Commercial Transportation', logo: '/partners/isuzu.svg', body: 'A trusted name in commercial transportation, Isuzu is recognized worldwide for reliability, durability, and performance. Through collaborations with industry leaders such as Isuzu, we strengthen our transportation capabilities and support efficient movement across supply chains.' },
]

const BENEFITS = [
  'Deliver reliable and scalable solutions',
  'Improve operational efficiency',
  'Leverage the latest technologies',
  'Expand our capabilities across industries',
  'Create greater value for our customers',
]

const VALUES = [
  { Icon: Globe2, n: '01', t: 'Global Footprint', d: 'Presence across Australia, India, USA, Canada, China, UK, UAE, and Singapore.' },
  { Icon: Network, n: '02', t: 'Connected Industries', d: 'A unified ecosystem serving logistics, technology, security, travel, and customer support.' },
  { Icon: Handshake, n: '03', t: 'Collaborative Network', d: 'Partnership-driven operations that bring businesses closer together.' },
  { Icon: Sprout, n: '04', t: 'Responsible Growth', d: 'Focused on sustainable, ethical, and future-ready business practices.' },
]

export function PartnersPage() {
  const rise = (d = 0) => ({
    initial: { opacity: 0, y: 26 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.7, delay: d, ease: EASE },
  })

  return (
    <div style={{ overflowX: 'hidden', background: '#fff' }}>
      <Header />

      {/* ── 1 · Hero ── */}
      <section className="pt-hero">
        <span className="pt-hero-dots" aria-hidden />
        <span className="pt-hero-glow" aria-hidden />
        <div className="pt-wrap pt-hero-in">
          <div className="pt-hero-top">
            <div className="pt-hero-copy">
              <motion.p className="pt-eyebrow" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }}>
                <span className="pt-eyebrow-dot" />Our Partners
              </motion.p>
              <motion.h1 className="pt-hero-h1" initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: EASE, delay: 0.08 }}>
                Partnerships that drive <span className="g">trust,</span> innovation &amp; growth.
              </motion.h1>
              <motion.p className="pt-hero-lead" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE, delay: 0.18 }}>
                We work with world-leading brands and the Australian Government to deliver secure, reliable solutions across every industry we serve.
              </motion.p>
            </div>

            <motion.div className="pt-hero-asd" initial={{ opacity: 0, y: 24, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.85, ease: EASE, delay: 0.24 }}>
              <span className="pt-hero-asd-accent" aria-hidden />
              <span className="pt-hero-asd-glow" aria-hidden />
              <span className="pt-hero-asd-eyebrow"><span className="pt-hero-asd-dot" />Official Government Partnership</span>
              <img className="pt-hero-asd-logo" src="/partners/asd-lockup-navy.png" alt="Australian Government - Australian Signals Directorate & Australian Cyber Security Centre (ACSC)" loading="lazy" decoding="async" />
              <span className="pt-hero-asd-rule" aria-hidden />
              <p className="pt-hero-asd-cap">
                Working with the <strong>Australian Signals Directorate (ASD)</strong> &amp; Australian Cyber Security Centre (ACSC) - aligned to national-grade security standards.
              </p>
            </motion.div>
          </div>

          <motion.div className="pt-trust" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE, delay: 0.34 }}>
            <span className="pt-trust-lb">Trusted across industries</span>
            <div className="pt-trust-grid">
              {PARTNERS.map(p => (
                <div className="pt-trust-cell" key={p.name}>
                  <img src={p.logo} alt={p.name} loading="lazy" decoding="async" />
                </div>
              ))}
              <div className="pt-trust-cell pt-trust-more">&amp; more</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 1.5 · Featured: Australian Signals Directorate ── */}
      <section className="pt-asd">
        <span className="pt-asd-glow" aria-hidden />
        <div className="pt-wrap pt-asd-in">
          <motion.div className="pt-asd-copy" {...rise()}>
            <p className="pt-eyebrow pt-eyebrow-on-dark"><span className="pt-eyebrow-dot" />Government Partnership</p>
            <h2 className="pt-asd-h2">Now partnered with the <span className="g">Australian Signals Directorate.</span></h2>
            <p className="pt-asd-lead">
              Eloma Group is proud to work alongside the <strong>Australian Government - Australian Signals Directorate (ASD)</strong> and the <strong>Australian Cyber Security Centre (ACSC)</strong>. This partnership reinforces our commitment to national-grade security standards, trusted infrastructure and resilient operations across everything we deliver.
            </p>
            <ul className="pt-asd-points">
              <li><span className="pt-asd-ic"><Check size={15} strokeWidth={3} /></span>Aligned to national cyber security standards</li>
              <li><span className="pt-asd-ic"><Check size={15} strokeWidth={3} /></span>Trusted, government-grade infrastructure</li>
              <li><span className="pt-asd-ic"><Check size={15} strokeWidth={3} /></span>Resilient, security-first operations</li>
            </ul>
          </motion.div>
          <motion.div className="pt-asd-visual" {...rise(0.1)}>
            <img src="/partners/asd-lockup.png" alt="Australian Government - Australian Signals Directorate & Australian Cyber Security Centre (ACSC)" loading="lazy" decoding="async" />
          </motion.div>
        </div>
      </section>

      {/* ── 2 · Partner profiles ── */}
      <section className="pt-list-sec">
        <div className="pt-wrap">
          <motion.div className="pt-list-head" {...rise()}>
            <p className="pt-eyebrow"><span className="pt-eyebrow-dot" />Brands we work with</p>
            <h2 className="pt-h2">Strong partnerships are at the heart of <span className="g">everything we do.</span></h2>
            <p className="pt-list-p">Our partners are more than vendors or collaborators - they are an extension of our commitment to quality, innovation and long-term growth. Together, we work towards creating efficient systems, better customer experiences and sustainable business outcomes.</p>
          </motion.div>

          <div className="pt-grid">
            {PARTNERS.map((p, i) => (
              <motion.article key={p.name} className="pt-card"
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.5, delay: (i % 3) * 0.06, ease: EASE }}>
                <span className="pt-card-accent" aria-hidden />
                <div className="pt-card-logo">
                  <img src={p.logo} alt={p.name} height={40} loading="lazy" decoding="async" />
                </div>
                <div className="pt-card-meta">
                  <h3 className="pt-card-name">{p.name}</h3>
                  <span className="pt-card-sector">{p.sector}</span>
                </div>
                <p className="pt-card-body">{p.body}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3 · Why it matters ── */}
      <section className="pt-why-sec">
        <span className="pt-why-glow" aria-hidden />
        <div className="pt-wrap">
          <div className="pt-why-top">
            <motion.div className="pt-why-l" {...rise()}>
              <p className="pt-eyebrow"><span className="pt-eyebrow-dot" />Why it matters</p>
              <h2 className="pt-h2">Every successful business journey is powered by the <span className="g">right partnerships.</span></h2>
              <p className="pt-why-p">By collaborating with trusted organizations across different industries, we gain access to advanced technology, industry expertise and global best practices that strengthen the services we provide to our clients. These partnerships enable us to:</p>
            </motion.div>
            <motion.ul className="pt-benefits" {...rise(0.08)}>
              {BENEFITS.map(b => (
                <li key={b} className="pt-benefit">
                  <span className="pt-benefit-ic"><Check size={16} strokeWidth={3} /></span>
                  {b}
                </li>
              ))}
            </motion.ul>
          </div>

          <div className="pt-values">
            {VALUES.map((v, i) => (
              <motion.div key={v.t} className="pt-value"
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.55, delay: i * 0.08, ease: EASE }}>
                <div className="pt-value-top">
                  <span className="pt-value-ic"><v.Icon size={20} /></span>
                  <span className="pt-value-n">{v.n}</span>
                </div>
                <h3 className="pt-value-t">{v.t}</h3>
                <p className="pt-value-d">{v.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <PageCTA line1="Let's partner" line2="and grow." sub="Tell us about your business - we'll find the right fit across the group." buttonLabel="Become a Partner" />
      <FlyFooter />

      <style>{`
        .pt-wrap { max-width:1760px; margin:0 auto; }
        .g { color:${GREEN}; }
        .pt-eyebrow { display:inline-flex; align-items:center; gap:10px; margin:0; font-family:'Inter',sans-serif; font-weight:700; font-size:clamp(10px,0.8vw,12px); letter-spacing:2.5px; text-transform:uppercase; color:${GREEN}; }
        .pt-eyebrow-dot { width:7px; height:7px; border-radius:50%; background:${GREEN}; box-shadow:0 0 0 4px rgba(60,185,140,0.16); flex-shrink:0; }
        .pt-h2 { font-family:'Poppins',sans-serif; font-weight:700; font-size:clamp(30px,4.4vw,64px); letter-spacing:-0.035em; line-height:1.04; color:${NAVY}; margin:16px 0 0; }

        /* 1 · Hero */
        .pt-hero { position:relative; overflow:hidden;
          background: radial-gradient(58% 50% at 88% 2%, rgba(60,185,140,0.12), transparent 60%), linear-gradient(180deg,#ffffff 0%,#f3faf7 100%);
          padding: clamp(120px,14vw,200px) clamp(24px,5vw,80px) clamp(56px,7vw,100px); }
        .pt-hero-dots { position:absolute; inset:0; pointer-events:none; opacity:0.5; background-image:radial-gradient(rgba(19,41,61,0.05) 1px, transparent 1px); background-size:26px 26px; -webkit-mask-image:linear-gradient(180deg,#000,transparent 82%); mask-image:linear-gradient(180deg,#000,transparent 82%); }
        .pt-hero-glow { position:absolute; top:-120px; right:-80px; width:480px; height:480px; border-radius:50%; background:radial-gradient(circle, rgba(60,185,140,0.16), transparent 64%); pointer-events:none; }
        .pt-hero-in { position:relative; z-index:1; }
        .pt-hero-top { display:grid; grid-template-columns:1.25fr 0.9fr; gap:clamp(32px,4vw,72px); align-items:center; }
        .pt-hero-copy { max-width:900px; }
        .pt-hero-h1 { font-family:'Poppins',sans-serif; font-weight:700; font-size:clamp(38px,5.2vw,84px); line-height:1.03; letter-spacing:-0.038em; color:${NAVY}; margin:clamp(18px,2.2vw,28px) 0 0; }
        .pt-hero-lead { font-family:'Inter',sans-serif; font-size:clamp(15px,1.25vw,19px); line-height:1.8; color:${MUTED}; max-width:52ch; margin:clamp(20px,2.4vw,28px) 0 0; }

        /* ASD government partnership spotlight (in hero) */
        .pt-hero-asd { position:relative; overflow:hidden; align-self:stretch;
          display:flex; flex-direction:column; justify-content:center;
          background:linear-gradient(180deg,#ffffff 0%,#fbfdfc 100%);
          border:1px solid rgba(26,43,60,0.10); border-radius:24px;
          padding:clamp(30px,3vw,48px);
          box-shadow:0 50px 100px -60px rgba(19,41,61,0.38); }
        .pt-hero-asd-accent { position:absolute; top:0; left:0; right:0; height:3px; background:linear-gradient(90deg, ${GREEN}, rgba(60,185,140,0)); }
        .pt-hero-asd-glow { position:absolute; top:-40%; right:-30%; width:70%; height:150%; border-radius:50%; background:radial-gradient(circle, rgba(60,185,140,0.10), transparent 64%); pointer-events:none; }
        .pt-hero-asd-eyebrow { position:relative; z-index:1; display:inline-flex; align-items:center; gap:9px; font-family:'Inter',sans-serif; font-weight:800; font-size:clamp(10px,0.8vw,12px); letter-spacing:2.2px; text-transform:uppercase; color:${GREEN}; }
        .pt-hero-asd-dot { width:6px; height:6px; border-radius:50%; background:${GREEN}; box-shadow:0 0 0 4px rgba(60,185,140,0.16); }
        .pt-hero-asd-logo { position:relative; z-index:1; height:clamp(96px,9vw,140px); width:auto; max-width:100%; object-fit:contain; object-position:left center; display:block; margin:clamp(22px,2.4vw,32px) 0 clamp(20px,2.2vw,28px); }
        .pt-hero-asd-rule { display:block; height:1px; width:100%; background:rgba(26,43,60,0.10); margin-bottom:clamp(18px,2vw,24px); }
        .pt-hero-asd-cap { position:relative; z-index:1; margin:0; font-family:'Inter',sans-serif; font-size:clamp(13px,1vw,15px); line-height:1.7; color:${MUTED}; }
        .pt-hero-asd-cap strong { color:${NAVY}; font-weight:600; }

        /* trusted-by logo wall */
        .pt-trust { margin-top:clamp(40px,5vw,72px); }
        .pt-trust-lb { display:block; font-family:'Inter',sans-serif; font-size:clamp(10px,0.8vw,12px); font-weight:700; letter-spacing:2.5px; text-transform:uppercase; color:${MUTED}; margin-bottom:clamp(16px,1.8vw,22px); }
        .pt-trust-grid { display:grid; grid-template-columns:repeat(6,1fr); gap:1px; background:rgba(26,43,60,0.1); border:1px solid rgba(26,43,60,0.1); border-radius:22px; overflow:hidden; }
        .pt-trust-cell { background:#fff; display:flex; align-items:center; justify-content:center; padding:clamp(16px,2vw,26px); min-height:clamp(86px,8vw,116px); transition:background 0.4s ease; }
        .pt-trust-cell:hover { background:rgba(60,185,140,0.05); }
        .pt-trust-cell img { height:clamp(30px,3vw,42px); width:auto; max-width:78%; object-fit:contain; filter:grayscale(1) opacity(0.62); transition:filter 0.4s ease, transform 0.4s ${'cubic-bezier(0.16,1,0.3,1)'}; }
        .pt-trust-cell:hover img { filter:none; transform:translateY(-2px); }
        .pt-trust-more { font-family:'Poppins',sans-serif; font-weight:600; font-size:clamp(13px,1.1vw,16px); letter-spacing:-0.01em; color:${GREEN}; }

        /* 1.5 · Featured - Australian Signals Directorate */
        .pt-asd { position:relative; overflow:hidden; background:linear-gradient(135deg,#04264C 0%,#002248 100%); padding:clamp(56px,7vw,110px) clamp(24px,5vw,80px); }
        .pt-asd-glow { position:absolute; top:-140px; right:-100px; width:520px; height:520px; border-radius:50%; background:radial-gradient(circle, rgba(60,185,140,0.22), transparent 62%); pointer-events:none; }
        .pt-asd-in { position:relative; z-index:1; display:grid; grid-template-columns:1.05fr 0.95fr; gap:clamp(36px,5vw,80px); align-items:center; }
        .pt-eyebrow-on-dark { color:#fff; }
        .pt-asd-h2 { font-family:'Poppins',sans-serif; font-weight:700; font-size:clamp(30px,4.2vw,60px); letter-spacing:-0.035em; line-height:1.05; color:#fff; margin:16px 0 0; }
        .pt-asd-lead { font-family:'Inter',sans-serif; font-size:clamp(15px,1.2vw,18px); line-height:1.8; color:rgba(255,255,255,0.7); margin:clamp(20px,2.4vw,28px) 0 0; max-width:58ch; }
        .pt-asd-lead strong { color:#fff; font-weight:600; }
        .pt-asd-points { list-style:none; margin:clamp(22px,2.6vw,30px) 0 0; padding:0; display:flex; flex-direction:column; gap:14px; }
        .pt-asd-points li { display:flex; align-items:center; gap:13px; font-family:'Poppins',sans-serif; font-weight:500; font-size:clamp(14px,1.2vw,17px); letter-spacing:-0.01em; color:rgba(255,255,255,0.92); }
        .pt-asd-ic { display:inline-flex; align-items:center; justify-content:center; width:28px; height:28px; border-radius:8px; background:rgba(60,185,140,0.18); color:${GREEN}; flex-shrink:0; }
        .pt-asd-visual { border-radius:22px; overflow:hidden; border:1px solid rgba(255,255,255,0.14); box-shadow:0 40px 90px -50px rgba(0,0,0,0.7); }
        .pt-asd-visual img { display:block; width:100%; height:auto; }

        /* 2 · Partner profiles */
        .pt-list-sec { background:#fff; padding:clamp(56px,7vw,120px) clamp(24px,5vw,80px); }
        .pt-list-head { max-width:920px; margin-bottom:clamp(34px,4vw,56px); }
        .pt-list-p { font-family:'Inter',sans-serif; font-size:clamp(14px,1.15vw,17px); line-height:1.8; color:${MUTED}; margin:clamp(18px,2vw,26px) 0 0; }
        .pt-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:clamp(16px,1.6vw,22px); }
        .pt-card { position:relative; overflow:hidden; display:flex; flex-direction:column; background:linear-gradient(168deg,#ffffff,#f7fbf9); border:1px solid rgba(26,43,60,0.1); border-radius:22px; padding:clamp(26px,2.6vw,38px); transition:transform 0.45s ${'cubic-bezier(0.16,1,0.3,1)'}, box-shadow 0.45s ease, border-color 0.45s ease; }
        .pt-card-accent { position:absolute; top:0; left:0; right:0; height:3px; background:${GREEN}; transform:scaleX(0); transform-origin:left; transition:transform 0.45s ${'cubic-bezier(0.16,1,0.3,1)'}; }
        .pt-card:hover { transform:translateY(-6px); border-color:rgba(60,185,140,0.5); box-shadow:0 36px 70px -40px rgba(19,41,61,0.3); }
        .pt-card:hover .pt-card-accent { transform:scaleX(1); }
        .pt-card-logo { height:clamp(50px,5vw,64px); display:flex; align-items:center; margin-bottom:clamp(20px,2.2vw,28px); }
        .pt-card-logo img { height:clamp(40px,4vw,52px); width:auto; max-width:100%; object-fit:contain; object-position:left center; }
        .pt-card-meta { display:flex; align-items:baseline; justify-content:space-between; gap:12px; flex-wrap:wrap; margin-bottom:14px; }
        .pt-card-name { font-family:'Poppins',sans-serif; font-weight:600; font-size:clamp(19px,1.7vw,25px); letter-spacing:-0.02em; color:${NAVY}; margin:0; }
        .pt-card-sector { font-family:'Inter',sans-serif; font-size:10.5px; font-weight:800; letter-spacing:1.2px; text-transform:uppercase; color:${GREEN}; }
        .pt-card-body { font-family:'Inter',sans-serif; font-size:clamp(13.5px,1vw,15px); line-height:1.75; color:${MUTED}; margin:0; }

        /* 3 · Why it matters */
        .pt-why-sec { position:relative; overflow:hidden; background:linear-gradient(180deg,#ffffff,#f3faf7); padding:clamp(56px,7vw,120px) clamp(24px,5vw,80px); }
        .pt-why-glow { position:absolute; top:-120px; left:-90px; width:420px; height:420px; border-radius:50%; background:radial-gradient(circle, rgba(60,185,140,0.12), transparent 64%); pointer-events:none; }
        .pt-why-top { position:relative; z-index:1; display:grid; grid-template-columns:1.1fr 0.9fr; gap:clamp(32px,5vw,80px); align-items:center; margin-bottom:clamp(40px,5vw,72px); }
        .pt-why-p { font-family:'Inter',sans-serif; font-size:clamp(14px,1.15vw,17px); line-height:1.8; color:${MUTED}; margin:clamp(18px,2vw,26px) 0 0; max-width:54ch; }
        .pt-benefits { list-style:none; margin:0; padding:0; display:flex; flex-direction:column; border-top:1px solid rgba(26,43,60,0.12); }
        .pt-benefit { display:flex; align-items:center; gap:14px; padding:clamp(16px,1.8vw,22px) 0; border-bottom:1px solid rgba(26,43,60,0.12); font-family:'Poppins',sans-serif; font-weight:500; font-size:clamp(15px,1.3vw,19px); letter-spacing:-0.01em; color:${NAVY}; }
        .pt-benefit-ic { display:inline-flex; align-items:center; justify-content:center; width:30px; height:30px; border-radius:9px; background:rgba(60,185,140,0.12); color:${GREEN}; flex-shrink:0; }

        .pt-values { position:relative; z-index:1; display:grid; grid-template-columns:repeat(4,1fr); gap:clamp(16px,1.8vw,24px); }
        .pt-value { background:#fff; border:1px solid rgba(26,43,60,0.1); border-radius:20px; padding:clamp(24px,2.4vw,34px); transition:transform 0.45s ${'cubic-bezier(0.16,1,0.3,1)'}, box-shadow 0.45s ease, border-color 0.45s ease; }
        .pt-value:hover { transform:translateY(-6px); border-color:rgba(60,185,140,0.5); box-shadow:0 30px 60px -36px rgba(60,185,140,0.45); }
        .pt-value-top { display:flex; align-items:center; justify-content:space-between; margin-bottom:clamp(16px,1.8vw,22px); }
        .pt-value-ic { display:inline-flex; align-items:center; justify-content:center; width:46px; height:46px; border-radius:13px; background:rgba(60,185,140,0.12); color:${GREEN}; transition:transform 0.45s ${'cubic-bezier(0.16,1,0.3,1)'}, background 0.4s ease, color 0.4s ease; }
        .pt-value:hover .pt-value-ic { transform:translateY(-3px) rotate(-5deg); background:${GREEN}; color:#fff; }
        .pt-value-n { font-family:'Poppins',sans-serif; font-weight:700; font-size:clamp(22px,2.2vw,34px); letter-spacing:-0.04em; color:rgba(26,43,60,0.16); }
        .pt-value-t { font-family:'Poppins',sans-serif; font-weight:600; font-size:clamp(17px,1.5vw,22px); letter-spacing:-0.01em; color:${NAVY}; margin:0 0 8px; }
        .pt-value-d { font-family:'Inter',sans-serif; font-size:clamp(13px,1vw,14.5px); line-height:1.7; color:${MUTED}; margin:0; }

        /* ── responsive ── */
        @media (max-width:1024px){
          .pt-grid { grid-template-columns:1fr 1fr; }
          .pt-trust-grid { grid-template-columns:repeat(4,1fr); }
          .pt-why-top { grid-template-columns:1fr; gap:clamp(28px,5vw,40px); align-items:start; }
          .pt-values { grid-template-columns:1fr 1fr; }
          .pt-hero-top { grid-template-columns:1fr; gap:clamp(28px,5vw,44px); align-items:start; }
          .pt-hero-copy { max-width:none; }
          .pt-asd-in { grid-template-columns:1fr; gap:clamp(28px,5vw,44px); }
        }
        @media (max-width:620px){
          .pt-grid { grid-template-columns:1fr; }
          .pt-trust-grid { grid-template-columns:repeat(3,1fr); }
        }
        @media (max-width:420px){
          .pt-trust-grid { grid-template-columns:repeat(2,1fr); }
        }
        @media (max-width:480px){
          .pt-values { grid-template-columns:1fr; }
        }
        @media (min-width:1920px){
          .pt-wrap { max-width:1820px; }
          .pt-hero, .pt-list-sec, .pt-why-sec { padding-left:clamp(48px,3.6vw,70px); padding-right:clamp(48px,3.6vw,70px); }
          .pt-hero-copy { max-width:1080px; }
          .pt-hero-h1 { font-size:100px; }
          .pt-h2 { font-size:72px; }
          .pt-asd-h2 { font-size:68px; }
          .pt-hero-asd-logo { height:158px; }
          .pt-hero-lead { font-size:20px; }
        }
        @media (min-width:2560px){
          .pt-wrap { max-width:2420px; }
          .pt-hero, .pt-list-sec, .pt-why-sec { padding-left:70px; padding-right:70px; }
          .pt-hero { padding-top:clamp(160px,8vw,220px); }
          .pt-hero-copy { max-width:1400px; }
          .pt-hero-h1 { font-size:124px; }
          .pt-h2 { font-size:96px; }
          .pt-asd-h2 { font-size:88px; }
          .pt-hero-asd-logo { height:204px; }
          .pt-hero-lead, .pt-list-p, .pt-why-p { font-size:24px; }
          .pt-card-name { font-size:30px; }
          .pt-card-body { font-size:18px; }
          .pt-value-t { font-size:28px; }
        }
      `}</style>
    </div>
  )
}
