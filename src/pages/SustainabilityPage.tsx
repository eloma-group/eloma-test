import {
  Wind, Truck, Recycle, Waves, Leaf, ArrowUpRight,
  CircleDot, FileText, ShieldCheck, Gauge, Users,
} from 'lucide-react'
import { Header } from '../components/Header/Header'
import { FlyFooter } from '../components/FlyFooter'
import { PageCTA, NAVY, GREEN, MUTED } from '../components/PageKit'
import { Reveal, CountUp } from '../components/home/egScroll'

const img = (id: string, w: number) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`

const HERO_STATS = [
  { n: '2040', l: 'Net-zero commitment' },
  { n: '100%', l: 'Renewable energy goal' },
  { n: '−30%', l: 'Emissions by 2030' },
]

const FOCUS = [
  { Icon: Wind, label: 'Energy', title: 'Power without the carbon.',
    text: 'Solar and certified green electricity across our sites, with on-site generation wherever the roof and grid allow.',
    imgId: 'photo-1466611653911-95081537e5b7', alt: 'Wind turbines at dusk' },
  { Icon: Truck, label: 'Transport', title: 'Miles that weigh less.',
    text: 'Consolidated shipments, optimised routing and low-emission vehicles cut the carbon behind every delivery.',
    imgId: 'photo-1601584115197-04ecc0da31d7', src: '/images/eg-transport-green.jpg', alt: 'BIVRY road transport truck on an Australian highway' },
  { Icon: Recycle, label: 'Materials', title: 'Designed to circle back.',
    text: 'Packaging rethought, recovery built in and recycled inputs first — so materials keep working past their first life.',
    imgId: 'photo-1509391366360-2e959784a276', alt: 'Solar panels under a clear sky' },
  { Icon: Waves, label: 'Nature', title: 'Giving the land its due.',
    text: 'Reforestation, ecosystem protection near our sites and water conserved through harvesting and efficient design.',
    imgId: 'photo-1518495973542-4542c06a5843', alt: 'Sunlight through a forest canopy' },
]

const NUMBERS = [
  { to: 100, suffix: '%', l: 'Renewable energy goal' },
  { to: 30, suffix: '%', l: 'Emissions cut by 2030' },
  { to: 5, suffix: '', l: 'Companies aligned' },
  { to: 8, suffix: '', l: 'Markets covered' },
]

const ROAD = [
  { yr: '2025', t: 'Baseline & disclose', x: 'A full measured footprint across Scope 1, 2 and 3 — published, not estimated.' },
  { yr: '2030', t: 'Halve what we can', x: 'Renewable power live across major sites; the fleet well into its low-emission shift.' },
  { yr: '2035', t: 'Circular by default', x: 'Near-zero operational waste and responsible sourcing across every supplier.' },
  { yr: '2040', t: 'Net zero', x: 'Residual emissions balanced by verified, high-integrity nature-based removals.' },
]

const REPORTS = [
  { Icon: FileText, title: 'Annual Sustainability Report', meta: '2024 — soon' },
  { Icon: Gauge, title: 'Carbon Footprint Disclosure', meta: 'In progress' },
  { Icon: ShieldCheck, title: 'ESG & Governance Statement', meta: 'Yearly' },
  { Icon: Users, title: 'Community Impact Update', meta: 'Quarterly' },
]

export function SustainabilityPage() {
  return (
    <div style={{ overflowX: 'hidden', background: '#fff' }}>
      <Header />

      {/* ── 1 · Hero — full-bleed image ── */}
      <section className="sx-hero">
        <img className="sx-hero-bg" src="/images/env-hero.jpg" alt="" aria-hidden decoding="async" />
        <span className="sx-hero-veil" aria-hidden />
        <div className="sx-wrap sx-hero-in">
          <Reveal as="span" className="sx-eyebrow lt"><span className="sx-eyebrow-dot" />Environmental Responsibility</Reveal>
          <Reveal className="sx-hero-h1" delay={0.06}>
            <h1>Growth the <span className="g">planet can afford.</span></h1>
          </Reveal>
          <Reveal className="sx-hero-lead" delay={0.12}>
            <p>
              Every gain at Eloma Group is weighed against what it costs the environment — across the power we use,
              the goods we move, the materials we choose and the natural systems we depend on.
            </p>
          </Reveal>
          <Reveal className="sx-hero-stats" delay={0.18}>
            {HERO_STATS.map((s) => (
              <div className="sx-hstat" key={s.l}>
                <span className="sx-hstat-n">{s.n}</span>
                <span className="sx-hstat-l">{s.l}</span>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── 2 · Focus areas — clean card grid ── */}
      <section className="sx-sec sx-mint">
        <div className="sx-wrap">
          <Reveal className="sx-head">
            <p className="sx-kicker"><span>01</span> Where we focus</p>
            <h2 className="sx-h2">Four fronts, <span className="g">worked in parallel.</span></h2>
            <p className="sx-sub">Real programs running across the group today — each one measured, reviewed and improved so our commitments show up in practice.</p>
          </Reveal>

          <div className="sx-cards">
            {FOCUS.map((f, i) => (
              <Reveal as="div" className="sx-card" key={f.label} delay={i * 0.06} y={30}>
                <div className="sx-card-media">
                  <img src={f.src ?? img(f.imgId, 800)} alt={f.alt} decoding="async" loading="lazy" />
                </div>
                <div className="sx-card-body">
                  <span className="sx-card-ic"><f.Icon size={20} strokeWidth={1.8} /></span>
                  <span className="sx-card-label">{f.label}</span>
                  <h3 className="sx-card-t">{f.title}</h3>
                  <p className="sx-card-x">{f.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3 · Measured impact — navy band ── */}
      <section className="sx-nums">
        <div className="sx-wrap">
          <Reveal className="sx-head sx-head-center">
            <p className="sx-kicker onnavy"><span>02</span> Measured impact</p>
            <h2 className="sx-h2 onnavy">On the road to <span className="g">net zero by 2040.</span></h2>
          </Reveal>
          <div className="sx-nums-grid">
            {NUMBERS.map((f) => (
              <div className="sx-num" key={f.l}>
                <CountUp className="sx-num-n" to={f.to} suffix={f.suffix} />
                <span className="sx-num-l">{f.l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4 · Roadmap ── */}
      <section className="sx-sec">
        <div className="sx-wrap">
          <Reveal className="sx-head">
            <p className="sx-kicker"><span>03</span> The path to net zero</p>
            <h2 className="sx-h2">A timeline we can <span className="g">be held to.</span></h2>
          </Reveal>

          <div className="sx-road">
            {ROAD.map((s, i) => (
              <Reveal as="div" className="sx-road-node" key={s.yr} delay={i * 0.06} y={28}>
                <span className="sx-road-dot" aria-hidden><CircleDot size={15} strokeWidth={2.4} /></span>
                <span className="sx-road-yr">{s.yr}</span>
                <h3 className="sx-road-t">{s.t}</h3>
                <p className="sx-road-x">{s.x}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5 · Open reporting ── */}
      <section className="sx-sec sx-mint">
        <div className="sx-wrap">
          <Reveal className="sx-head">
            <p className="sx-kicker"><span>04</span> Open reporting</p>
            <h2 className="sx-h2">Everything, <span className="g">on the record.</span></h2>
          </Reveal>

          <div className="sx-rep">
            {REPORTS.map((r, i) => (
              <Reveal as="div" key={r.title} delay={i * 0.05} y={20}>
                <a className="sx-rep-item">
                  <span className="sx-rep-ic"><r.Icon size={20} strokeWidth={1.7} /></span>
                  <span className="sx-rep-t">{r.title}</span>
                  <span className="sx-rep-meta">{r.meta}</span>
                  <ArrowUpRight className="sx-rep-arr" size={18} strokeWidth={2.2} />
                </a>
              </Reveal>
            ))}
          </div>

          <p className="sx-note">
            <Leaf size={15} strokeWidth={2.2} style={{ color: GREEN, flexShrink: 0 }} />
            Documents are published as they’re finalised — reach out to our team for the latest figures.
          </p>
        </div>
      </section>

      <PageCTA line1="Partner with a group" line2="that leaves less behind." sub="From clean power to circular materials, impact is designed into how every Eloma company operates." buttonLabel="Talk to our team" />
      <FlyFooter />

      <style>{`
        .g { color:${GREEN}; }
        .sx-wrap { max-width:1280px; margin:0 auto; padding:0 clamp(24px,5vw,64px); }
        @media (min-width:1920px){ .sx-wrap { max-width:1480px; } }

        .sx-eyebrow { display:inline-flex; align-items:center; gap:10px; font-family:'Inter',sans-serif; font-weight:700; font-size:clamp(10px,0.8vw,12px); letter-spacing:2.5px; text-transform:uppercase; color:${GREEN}; }
        .sx-eyebrow.lt { color:#bff0dc; }
        .sx-eyebrow-dot { width:7px; height:7px; border-radius:50%; background:${GREEN}; box-shadow:0 0 0 4px rgba(60,185,140,0.16); }
        .sx-kicker { display:flex; align-items:center; gap:12px; margin:0; font-family:'Inter',sans-serif; font-weight:700; font-size:clamp(10px,0.8vw,12px); letter-spacing:2.5px; text-transform:uppercase; color:${MUTED}; }
        .sx-kicker span { color:${GREEN}; font-variant-numeric:tabular-nums; }
        .sx-kicker.onnavy { color:rgba(255,255,255,0.5); }
        .sx-head-center .sx-kicker { justify-content:center; }

        .sx-h2 { font-family:'Poppins',sans-serif; font-weight:700; font-size:clamp(28px,4vw,54px); color:${NAVY}; letter-spacing:-0.03em; line-height:1.06; margin:16px 0 0; }
        .sx-h2.onnavy { color:#fff; }
        .sx-sub { font-family:'Inter',sans-serif; font-size:clamp(15px,1.15vw,18px); line-height:1.75; color:${MUTED}; margin:18px 0 0; max-width:60ch; }
        .sx-head { margin-bottom:clamp(38px,5vw,60px); }
        .sx-head-center { text-align:center; }
        .sx-head-center .sx-h2 { margin-left:auto; margin-right:auto; max-width:20ch; }

        /* section shells */
        .sx-sec { padding:clamp(64px,8vw,120px) 0; }
        .sx-mint { background:linear-gradient(180deg,#ffffff,#f3faf7); }

        /* 1 · Hero — full-bleed image */
        .sx-hero { position:relative; overflow:hidden; min-height:clamp(560px,84vh,880px); display:flex; align-items:flex-end;
          padding:clamp(120px,14vw,200px) 0 clamp(48px,6vw,84px); }
        .sx-hero-bg { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; transform:scale(1.05); animation:sxzoom 18s ease-in-out infinite alternate; }
        @keyframes sxzoom { to { transform:scale(1.13); } }
        .sx-hero-veil { position:absolute; inset:0; background:linear-gradient(180deg, rgba(8,26,18,0.5) 0%, rgba(8,26,18,0.28) 42%, rgba(6,20,14,0.92) 100%); }
        .sx-hero-in { position:relative; z-index:2; text-align:left; }
        .sx-hero-h1 h1 { font-family:'Poppins',sans-serif; font-weight:700; font-size:clamp(42px,7vw,110px); line-height:0.98; letter-spacing:-0.04em; color:#fff; margin:clamp(18px,2.2vw,28px) 0 0; max-width:15ch; text-shadow:0 20px 50px rgba(0,0,0,0.4); }
        .sx-hero-lead p { font-family:'Inter',sans-serif; font-size:clamp(15px,1.25vw,19px); line-height:1.82; color:rgba(255,255,255,0.85); margin:clamp(20px,2.4vw,30px) 0 0; max-width:62ch; }
        .sx-hero-stats { display:flex; flex-wrap:wrap; gap:clamp(12px,1.4vw,18px); margin-top:clamp(30px,3.6vw,44px); }
        .sx-hstat { padding:clamp(14px,1.6vw,22px) clamp(20px,2vw,30px); border-radius:16px; background:rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.2); backdrop-filter:blur(12px); }
        .sx-hstat-n { display:block; font-family:'Poppins',sans-serif; font-weight:700; font-size:clamp(24px,2.8vw,44px); line-height:1; letter-spacing:-0.03em; color:#fff; }
        .sx-hstat-l { display:block; font-family:'Inter',sans-serif; font-size:clamp(11px,0.85vw,13px); color:rgba(255,255,255,0.75); margin-top:8px; }

        /* 2 · Focus cards */
        .sx-cards { display:grid; grid-template-columns:repeat(4,1fr); gap:clamp(16px,1.8vw,24px); align-items:stretch; }
        .sx-card { display:flex; flex-direction:column; background:#fff; border:1px solid rgba(19,41,61,0.08); border-radius:22px; overflow:hidden;
          transition:transform 0.45s cubic-bezier(0.16,1,0.3,1), box-shadow 0.45s ease, border-color 0.45s ease; }
        .sx-card:hover { transform:translateY(-6px); border-color:${GREEN}; box-shadow:0 34px 64px -40px rgba(60,185,140,0.5); }
        .sx-card-media { aspect-ratio:4/3; overflow:hidden; }
        .sx-card-media img { width:100%; height:100%; object-fit:cover; display:block; transition:transform 0.7s cubic-bezier(0.16,1,0.3,1); }
        .sx-card:hover .sx-card-media img { transform:scale(1.06); }
        .sx-card-body { display:flex; flex-direction:column; flex:1; padding:clamp(20px,1.8vw,28px); text-align:left; }
        .sx-card-ic { display:inline-flex; align-items:center; justify-content:center; width:46px; height:46px; border-radius:13px; background:rgba(60,185,140,0.1); color:${GREEN}; margin-bottom:16px; }
        .sx-card-label { font-family:'Inter',sans-serif; font-weight:800; font-size:11px; letter-spacing:2px; text-transform:uppercase; color:${GREEN}; margin-bottom:10px; }
        .sx-card-t { font-family:'Poppins',sans-serif; font-weight:700; font-size:clamp(18px,1.5vw,22px); letter-spacing:-0.02em; line-height:1.14; color:${NAVY}; margin:0 0 10px; }
        .sx-card-x { font-family:'Inter',sans-serif; font-size:14px; line-height:1.66; color:${MUTED}; margin:0; }

        /* 3 · Numbers (navy) */
        .sx-nums { position:relative; overflow:hidden; background:${NAVY}; padding:clamp(60px,8vw,120px) 0; }
        .sx-nums::before { content:''; position:absolute; inset:0; pointer-events:none; background-image:radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px); background-size:28px 28px; }
        .sx-nums-grid { position:relative; z-index:1; display:grid; grid-template-columns:repeat(4,1fr); gap:clamp(16px,2vw,32px); margin-top:clamp(30px,3.6vw,48px); }
        .sx-num { text-align:center; padding:0 clamp(8px,1vw,16px); }
        .sx-num + .sx-num { border-left:1px solid rgba(255,255,255,0.12); }
        .sx-num-n { display:block; font-family:'Poppins',sans-serif; font-weight:700; font-size:clamp(40px,5.2vw,88px); line-height:0.9; letter-spacing:-0.04em;
          background:linear-gradient(160deg,#fff 34%,${GREEN}); -webkit-background-clip:text; background-clip:text; -webkit-text-fill-color:transparent; }
        .sx-num-l { display:block; font-family:'Inter',sans-serif; font-weight:700; font-size:clamp(11px,0.9vw,13px); letter-spacing:1.2px; text-transform:uppercase; color:rgba(255,255,255,0.6); margin-top:clamp(14px,1.6vw,22px); }

        /* 4 · Roadmap */
        .sx-road { position:relative; display:grid; grid-template-columns:repeat(4,1fr); gap:clamp(20px,2.4vw,36px); }
        .sx-road::before { content:''; position:absolute; top:7px; left:0; right:0; height:2px; background:rgba(19,41,61,0.12); }
        .sx-road-node { position:relative; padding-top:clamp(28px,3vw,42px); text-align:left; }
        .sx-road-dot { position:absolute; top:-1px; left:0; display:inline-flex; align-items:center; justify-content:center; width:16px; height:16px; border-radius:50%; background:#fff; color:${GREEN}; }
        .sx-road-yr { display:block; font-family:'Poppins',sans-serif; font-weight:800; font-size:clamp(24px,2.6vw,38px); letter-spacing:-0.03em; color:${NAVY}; }
        .sx-road-t { font-family:'Poppins',sans-serif; font-weight:600; font-size:clamp(16px,1.4vw,21px); color:${GREEN}; letter-spacing:-0.01em; margin:clamp(8px,1vw,12px) 0 8px; }
        .sx-road-x { font-family:'Inter',sans-serif; font-size:clamp(13.5px,1vw,15.5px); line-height:1.66; color:${MUTED}; margin:0; }

        /* 5 · Reports */
        .sx-rep { border-top:1px solid rgba(19,41,61,0.14); }
        .sx-rep-item { display:grid; grid-template-columns:44px 1fr auto 30px; align-items:center; gap:clamp(14px,1.8vw,24px);
          padding:clamp(18px,2.2vw,28px) clamp(4px,1vw,12px); border-bottom:1px solid rgba(19,41,61,0.14); cursor:pointer; text-decoration:none;
          transition:padding-left 0.45s cubic-bezier(0.16,1,0.3,1), background 0.4s ease; }
        .sx-rep-item:hover { padding-left:clamp(12px,1.6vw,22px); background:linear-gradient(90deg, rgba(60,185,140,0.06), transparent 70%); }
        .sx-rep-ic { display:inline-flex; align-items:center; justify-content:center; width:44px; height:44px; border-radius:12px; background:rgba(60,185,140,0.1); color:${GREEN}; transition:background 0.4s ease, color 0.4s ease; }
        .sx-rep-item:hover .sx-rep-ic { background:${GREEN}; color:#fff; }
        .sx-rep-t { font-family:'Poppins',sans-serif; font-weight:600; font-size:clamp(16px,1.5vw,24px); letter-spacing:-0.02em; color:${NAVY}; }
        .sx-rep-meta { font-family:'Inter',sans-serif; font-weight:700; font-size:11px; letter-spacing:1px; text-transform:uppercase; color:${MUTED}; white-space:nowrap; }
        .sx-rep-arr { color:rgba(19,41,61,0.3); transition:color 0.4s ease, transform 0.45s cubic-bezier(0.16,1,0.3,1); }
        .sx-rep-item:hover .sx-rep-arr { color:${GREEN}; transform:translate(4px,-4px); }
        .sx-note { display:flex; align-items:center; gap:10px; justify-content:center; margin:clamp(30px,4vw,48px) auto 0; max-width:600px; text-align:center; font-family:'Inter',sans-serif; font-size:13.5px; line-height:1.6; color:${MUTED}; }

        /* responsive */
        @media (max-width:1023px){
          .sx-cards { grid-template-columns:1fr 1fr; }
          .sx-road { grid-template-columns:1fr 1fr; row-gap:clamp(28px,5vw,40px); }
          .sx-road::before { display:none; }
          .sx-road-node { padding-top:0; padding-left:30px; }
          .sx-road-dot { top:2px; }
        }
        @media (max-width:600px){
          .sx-cards { grid-template-columns:1fr; max-width:460px; margin:0 auto; }
          .sx-nums-grid { grid-template-columns:1fr 1fr; row-gap:clamp(28px,6vw,40px); }
          .sx-num:nth-child(3){ border-left:none; }
          .sx-num:nth-child(n+3){ border-top:1px solid rgba(255,255,255,0.12); padding-top:clamp(24px,6vw,32px); }
          .sx-road { grid-template-columns:1fr; }
          .sx-rep-item { grid-template-columns:44px 1fr auto; }
          .sx-rep-arr { display:none; }
        }
      `}</style>
    </div>
  )
}
