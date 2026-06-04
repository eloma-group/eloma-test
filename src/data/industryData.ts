import type { LucideIcon } from 'lucide-react'
import {
  Package, Thermometer, Clock, CheckCircle, TrendingUp,
  Star, Zap, RefreshCw, ShoppingBag, Boxes, MapPin,
  Archive, Leaf, Car, Truck, Factory,
  FileText, BarChart3, HardHat, Layers, Globe,
  Lock, FlaskConical, Shield,
} from 'lucide-react'

export interface Challenge {
  Icon: LucideIcon
  title: string
  desc: string
}

export interface Commitment {
  category: string
  statement: string
  body: string
}

export interface IndustryData {
  slug: string
  name: string
  group: 'Consumer' | 'Industrial' | 'Regulated'
  badge: string
  heroLine1: string
  heroLine2: string
  greenLine: 1 | 2
  heroDescription: string
  heroMeta: Array<{ label: string; value: string }>
  overview: {
    eyebrow: string
    heading: string
    body: string
    keyPoints: string[]
  }
  challenges: Challenge[]
  services: string[]
  commitments: Commitment[]
  ctaLine1: string
  ctaLine2: string
}

export const INDUSTRIES: IndustryData[] = [
  {
    slug: 'fmcg',
    name: 'FMCG',
    group: 'Consumer',
    badge: 'Consumer · FMCG',
    heroLine1: 'FMCG',
    heroLine2: 'LOGISTICS.',
    greenLine: 2,
    heroDescription:
      'High-volume, time-critical distribution for fast-moving consumer goods - from warehouse to retail shelf, flawlessly executed.',
    heroMeta: [
      { label: 'Sector', value: 'Consumer Goods' },
      { label: 'Capability', value: 'Multi-Temp · JIT · Retail Compliance' },
      { label: 'Coverage', value: 'Metro · Regional VIC · Interstate' },
      { label: 'Operations', value: '24 / 7 · 365 Days' },
    ],
    overview: {
      eyebrow: 'FMCG Logistics',
      heading: 'KEEPING SHELVES FULL ACROSS AUSTRALIA.',
      body: 'FMCG supply chains demand speed, volume, and precision. Whether you\'re moving ambient grocery, personal care, or temperature-sensitive food lines, every delivery must hit the mark - on time, compliant, and at scale. Bivry\'s multi-depot network and dedicated fleet deliver the consistency your retail accounts demand.',
      keyPoints: [
        'Just-in-time retail replenishment',
        'Multi-temperature zone capability',
        'Retailer compliance & pallet labelling',
        'Peak season surge capacity',
      ],
    },
    challenges: [
      {
        Icon: Package,
        title: 'High-Volume Distribution',
        desc: 'Managing thousands of SKUs across multiple retail accounts simultaneously. Our multi-depot network ensures consistent throughput regardless of order volume or complexity.',
      },
      {
        Icon: Thermometer,
        title: 'Cold Chain Integrity',
        desc: 'Temperature compliance is non-negotiable for food-grade FMCG lines. Refrigerated transport, monitored vehicles, and real-time custody tracking from pick-up to delivery.',
      },
      {
        Icon: Clock,
        title: 'JIT Replenishment',
        desc: 'Retail receiving windows are tight and unforgiving. Precision scheduling with live driver tracking and same-day dispatch keeps you ahead of every window.',
      },
      {
        Icon: CheckCircle,
        title: 'Retail Compliance',
        desc: 'Every major retailer has unique receiving requirements. Our team knows Woolworths, Coles, IGA, and independent channel specs inside-out, reducing rejections to near zero.',
      },
    ],
    services: [
      'Metro Distribution',
      'Same Day Delivery',
      'Next Day Delivery',
      'Warehousing - Multi Location',
      'Pallet Re-Packaging',
      'Regional Deliveries',
    ],
    commitments: [
      { category: 'Timing', statement: 'ON TIME. EVERY WINDOW.', body: 'We schedule around your retailer\'s receiving hours. No re-books, no shorts, no excuses - your window is our deadline.' },
      { category: 'Chain', statement: 'COLD CHAIN INTACT.', body: 'Temperature-controlled from pick-up to shelf. Every run monitored, every deviation flagged before it becomes a problem.' },
      { category: 'Scale', statement: 'SURGE READY.', body: 'Peak season volumes move without advance notice. Our capacity flexes so your retail accounts never run dry.' },
    ],
    ctaLine1: 'MOVE YOUR',
    ctaLine2: 'PRODUCT FASTER.',
  },

  {
    slug: 'fashion-lifestyle',
    name: 'Fashion & Lifestyle',
    group: 'Consumer',
    badge: 'Consumer · Fashion & Lifestyle',
    heroLine1: 'FASHION',
    heroLine2: 'DELIVERED.',
    greenLine: 2,
    heroDescription:
      'Speed-to-shelf, seasonal agility, and damage-free handling - logistics built for fashion\'s unforgiving pace.',
    heroMeta: [
      { label: 'Sector', value: 'Fashion & Lifestyle' },
      { label: 'Capability', value: 'Express · Garment-Safe · Returns' },
      { label: 'Coverage', value: 'CBD · Metro · National' },
      { label: 'Turnaround', value: 'Same Day & Next Day' },
    ],
    overview: {
      eyebrow: 'Fashion Logistics',
      heading: 'SPEED TO RETAIL, SEASON AFTER SEASON.',
      body: 'Fashion logistics demands precision handling, speed-to-shelf, and the flexibility to scale through peak seasons without compromising on presentation. From boutique drops to national retail rollouts, Bivry keeps your product moving at the pace the market demands.',
      keyPoints: [
        'Garment-safe & damage-free handling',
        'Seasonal surge capacity (3× normal volume)',
        'Express CBD & metro delivery',
        'Returns & reverse logistics management',
      ],
    },
    challenges: [
      {
        Icon: TrendingUp,
        title: 'Seasonal Volume Spikes',
        desc: 'Managing 3–4× normal volume during end-of-season sales and new-season launches. Flexible capacity that scales up fast without lead time.',
      },
      {
        Icon: Star,
        title: 'Fragile Merchandise Handling',
        desc: 'High-value garments, accessories, and lifestyle products need specialist care in transit. Zero-damage SLAs backed by trained handlers and the right packaging.',
      },
      {
        Icon: Zap,
        title: 'Speed to Retail',
        desc: 'Out-of-stock means lost sales in fashion. Same-day replenishment capability ensures your retail partners are never left waiting on the floor.',
      },
      {
        Icon: RefreshCw,
        title: 'Returns Management',
        desc: 'Efficient reverse logistics for e-commerce returns and unsold stock. Fast turnaround so your inventory is back in the cycle, not sitting in transit.',
      },
    ],
    services: [
      'Same Day Delivery',
      'Next Day Delivery',
      'Metro Distribution',
      'Pallet Re-Packaging',
      'Warehousing - Multi Location',
    ],
    commitments: [
      { category: 'Handling', statement: 'DAMAGE-FREE. GUARANTEED.', body: 'Every garment, accessory, and lifestyle product handled with brand-level care. From warehouse to retail floor, zero compromise.' },
      { category: 'Speed', statement: 'NEXT-DAY TO RETAIL.', body: 'New season stock hits the floor when the market demands it. Same-day capability for urgent replenishment across metro areas.' },
      { category: 'Agility', statement: 'SEASON-READY.', body: '3× surge capacity, no lead time required. We scale with your peaks, not against them - launch days included.' },
    ],
    ctaLine1: 'GET YOUR',
    ctaLine2: 'STOCK MOVING.',
  },

  {
    slug: 'retail',
    name: 'Retail',
    group: 'Consumer',
    badge: 'Consumer · Retail',
    heroLine1: 'RETAIL',
    heroLine2: 'SUPPLY CHAINS.',
    greenLine: 2,
    heroDescription:
      'Store replenishment, e-commerce fulfillment, and multi-location distribution - retail logistics that never lets your shelves run dry.',
    heroMeta: [
      { label: 'Sector', value: 'Retail' },
      { label: 'Capability', value: 'Store Replenishment · E-Commerce · Multi-Site' },
      { label: 'Coverage', value: 'Metro · Regional · Interstate' },
      { label: 'Delivery', value: 'Same Day & Next Day' },
    ],
    overview: {
      eyebrow: 'Retail Logistics',
      heading: 'NEVER LET YOUR SHELVES RUN DRY.',
      body: 'Retail supply chains live and die by consistency. Whether you operate a single flagship store or a national chain, Bivry\'s distribution network keeps stock flowing reliably across every location - on schedule, every time, with full inventory accuracy.',
      keyPoints: [
        'On-schedule store replenishment',
        'Multi-location & network delivery',
        'E-commerce fulfillment & dispatch',
        'Accurate manifesting & stock reconciliation',
      ],
    },
    challenges: [
      {
        Icon: ShoppingBag,
        title: 'Store Replenishment',
        desc: 'Consistent, on-schedule delivery to multiple store locations across metro and regional areas. No shorts, no delays - the shelf stays full.',
      },
      {
        Icon: Boxes,
        title: 'E-Commerce Fulfillment',
        desc: 'High-speed pick-pack-dispatch for online retail with same-day capability. Your customers don\'t wait - neither should your fulfillment.',
      },
      {
        Icon: MapPin,
        title: 'Multi-Location Management',
        desc: 'Coordinating delivery across store networks with different receiving windows, loading dock constraints, and inventory requirements - all managed seamlessly.',
      },
      {
        Icon: Archive,
        title: 'Inventory Precision',
        desc: 'Accurate manifesting and stock reconciliation at every point of the chain. Prevent shrinkage and discrepancies before they hit your P&L.',
      },
    ],
    services: [
      'Metro Distribution',
      'Same Day Delivery',
      'Next Day Delivery',
      'Regional Deliveries',
      'Warehousing - Multi Location',
      'Pallet Re-Packaging',
    ],
    commitments: [
      { category: 'Consistency', statement: 'SHELVES NEVER EMPTY.', body: 'Reliable, on-schedule replenishment across every location. Your retail floor stays performing - that\'s the only acceptable outcome.' },
      { category: 'Reach', statement: 'EVERY LOCATION.', body: 'Metro, suburban, regional - one partner, one service level across your entire store network. No location left behind.' },
      { category: 'Accuracy', statement: 'ZERO DISCREPANCIES.', body: 'Every item tracked, manifested, and reconciled. What you ordered is exactly what arrives - nothing short, nothing wrong.' },
    ],
    ctaLine1: 'STOCK YOUR',
    ctaLine2: 'STORES FASTER.',
  },

  {
    slug: 'restaurants-food',
    name: 'Restaurants & Food',
    group: 'Consumer',
    badge: 'Consumer · Restaurants & Food',
    heroLine1: 'FRESH',
    heroLine2: 'DELIVERED DAILY.',
    greenLine: 2,
    heroDescription:
      'Temperature-controlled, food-safe daily deliveries to restaurants, cafes, and hospitality venues - on time, every service.',
    heroMeta: [
      { label: 'Sector', value: 'Restaurants & Hospitality' },
      { label: 'Capability', value: 'Cold Chain · Daily Runs · HACCP-Aligned' },
      { label: 'Coverage', value: 'CBD · Metro · Regional' },
      { label: 'Window', value: 'Pre-Service Delivery' },
    ],
    overview: {
      eyebrow: 'Food Service Logistics',
      heading: 'FROM SUPPLIER TO SERVICE, ON TIME.',
      body: 'Restaurant supply chains run on precision timing. A late delivery doesn\'t just cause inconvenience - it closes your kitchen. Bivry delivers fresh produce, dry goods, and temperature-sensitive products within tight pre-service windows, so every cover is set up for success.',
      keyPoints: [
        'Pre-service delivery windows guaranteed',
        'HACCP-aligned handling & transport',
        'Full cold chain traceability',
        'Daily and multi-drop route capability',
      ],
    },
    challenges: [
      {
        Icon: Thermometer,
        title: 'Temperature-Controlled Transport',
        desc: 'Maintaining cold chain from supplier through to restaurant delivery. No breaks in the chain - validated temperature monitoring on every run.',
      },
      {
        Icon: Clock,
        title: 'Daily Delivery Windows',
        desc: 'Restaurants need deliveries before service - and that window is narrow. Our route planning and real-time dispatch ensure zero late arrivals.',
      },
      {
        Icon: Shield,
        title: 'Food Safety Compliance',
        desc: 'HACCP-aligned handling and transport procedures throughout the chain. Documentation for every delivery, audit-ready at all times.',
      },
      {
        Icon: Leaf,
        title: 'Fresh Produce Handling',
        desc: 'Special care for perishables with minimal transit time and zero temperature deviation. Your produce arrives market-fresh, presentation-ready.',
      },
    ],
    services: [
      'Same Day Delivery',
      'Metro Distribution',
      'Regional Deliveries',
      'Next Day Delivery',
      'Warehousing - Multi Location',
    ],
    commitments: [
      { category: 'Timing', statement: 'PRE-SERVICE. ALWAYS.', body: 'We build routes around your kitchen\'s window. Delivery lands before service starts - every single day, without exception.' },
      { category: 'Compliance', statement: 'FOOD-SAFE. FULL STOP.', body: 'HACCP-aligned handling, temperature monitoring, and complete documentation on every run. Audit-ready at all times.' },
      { category: 'Freshness', statement: 'COLD CHAIN. EXACT.', body: 'Temperature maintained precisely throughout - not approximately. Your produce arrives market-fresh because precision is non-negotiable.' },
    ],
    ctaLine1: 'KEEP YOUR',
    ctaLine2: 'KITCHEN RUNNING.',
  },

  {
    slug: 'automotive',
    name: 'Automotive',
    group: 'Industrial',
    badge: 'Industrial · Automotive',
    heroLine1: 'AUTOMOTIVE',
    heroLine2: 'PRECISION.',
    greenLine: 2,
    heroDescription:
      'Just-in-time parts delivery, heavy component transport, and dealer network distribution - logistics built to keep production lines running.',
    heroMeta: [
      { label: 'Sector', value: 'Automotive' },
      { label: 'Capability', value: 'JIT · Heavy Components · Dealer Networks' },
      { label: 'Coverage', value: 'Metro · Interstate · Nationwide' },
      { label: 'Mode', value: 'Road · Container · Tow' },
    ],
    overview: {
      eyebrow: 'Automotive Logistics',
      heading: 'PARTS IN. LINE RUNNING.',
      body: 'The automotive industry operates on zero-tolerance schedules. A missing component stops a production line - and costs thousands per minute. Bivry\'s just-in-time delivery capability, specialist vehicle logistics, and accurate parts distribution keep your operations moving without interruption.',
      keyPoints: [
        'Zero-tolerance JIT delivery schedules',
        'Heavy component & assembly transport',
        'Dealer and workshop network distribution',
        'Specialist tow and taxi truck operations',
      ],
    },
    challenges: [
      {
        Icon: Clock,
        title: 'JIT Manufacturing Support',
        desc: 'Zero-tolerance delivery schedules aligned to production line cycles. Late arrivals aren\'t an option - our dispatch and routing systems ensure precise, on-time delivery every time.',
      },
      {
        Icon: Truck,
        title: 'Heavy Component Transport',
        desc: 'Safe movement of engine components, chassis parts, and large assemblies. Specialist equipment, securing protocols, and trained drivers for every heavy freight movement.',
      },
      {
        Icon: Boxes,
        title: 'Parts Distribution',
        desc: 'High-accuracy pick and delivery across dealer networks and workshop accounts. 100% manifest accuracy means the right part arrives at the right location, every time.',
      },
      {
        Icon: Car,
        title: 'Specialist Vehicle Logistics',
        desc: 'Coordinating tow operators and taxi trucks for automotive-grade movements including vehicle relocations, recovery, and dealer-to-dealer transfers.',
      },
    ],
    services: [
      'Interstate Road Transport',
      'Container Movement',
      'Taxi Trucks',
      'Trailer Tow Operator',
      'Same Day Delivery',
      'Contract Logistics',
    ],
    commitments: [
      { category: 'Precision', statement: 'JIT. NO EXCEPTIONS.', body: 'Zero-tolerance scheduling aligned to your production line cycles. We don\'t run early, we don\'t run late - we run on your schedule.' },
      { category: 'Accuracy', statement: 'RIGHT PART. RIGHT PLACE.', body: 'Manifest accuracy across every dealer and workshop account. The correct component arrives at the correct location, every single time.' },
      { category: 'Coverage', statement: 'NETWORK-WIDE REACH.', body: 'Dealer networks, manufacturing plants, and workshop accounts all covered by a single, accountable freight partner.' },
    ],
    ctaLine1: 'KEEP YOUR',
    ctaLine2: 'LINE MOVING.',
  },

  {
    slug: 'manufacturing',
    name: 'Manufacturing',
    group: 'Industrial',
    badge: 'Industrial · Manufacturing',
    heroLine1: 'MANUFACTURING',
    heroLine2: 'SUPPLY CHAINS.',
    greenLine: 2,
    heroDescription:
      'Inbound raw materials, outbound finished goods, bulk freight, and contract logistics - end-to-end solutions for Australian manufacturers.',
    heroMeta: [
      { label: 'Sector', value: 'Manufacturing' },
      { label: 'Capability', value: 'Inbound · Outbound · Bulk · Contract' },
      { label: 'Coverage', value: 'Metro · Regional · Interstate' },
      { label: 'Mode', value: 'Road · Container · Warehousing' },
    ],
    overview: {
      eyebrow: 'Manufacturing Logistics',
      heading: 'RAW IN. FINISHED OUT. ON TIME.',
      body: 'Manufacturing supply chains require a freight partner who can handle both ends of the equation - reliable inbound raw materials to keep production uninterrupted, and fast outbound distribution to get finished goods into market. Bivry delivers both, backed by contract logistics SLAs aligned to your production schedule.',
      keyPoints: [
        'Reliable inbound raw material freight',
        'Fast finished-goods outbound distribution',
        'Bulk and palletised freight capability',
        'Contracted SLAs aligned to production',
      ],
    },
    challenges: [
      {
        Icon: Package,
        title: 'Inbound Raw Materials',
        desc: 'Reliable, scheduled inbound freight to keep production lines uninterrupted. Missed deliveries mean idle machinery and lost production hours - we don\'t miss.',
      },
      {
        Icon: Factory,
        title: 'Outbound Finished Goods',
        desc: 'Fast, accurate distribution of finished products to distributors, wholesalers, and end customers. Full chain visibility from dispatch to proof of delivery.',
      },
      {
        Icon: BarChart3,
        title: 'Bulk Freight Management',
        desc: 'Handling large, heavy, or palletised loads with appropriate equipment and specialised loading protocols. Maximum payload, zero damage.',
      },
      {
        Icon: FileText,
        title: 'Contract Logistics',
        desc: 'Dedicated, contracted freight solutions with SLAs that align precisely to your production requirements. One partner, one agreement, consistent service.',
      },
    ],
    services: [
      'Interstate Road Transport',
      'Container Movement',
      'Warehousing - Multi Location',
      'Contract Logistics',
      'Pallet Re-Packaging',
      'Regional Deliveries',
    ],
    commitments: [
      { category: 'Inbound', statement: 'RAW MATERIALS. READY.', body: 'Scheduled inbound freight keeps your production lines moving. No idle machinery, no lost production hours - we deliver on the schedule.' },
      { category: 'Outbound', statement: 'FINISHED. FAST.', body: 'From dispatch to delivery - finished goods reach distributors and end customers with minimal transit time and full chain visibility.' },
      { category: 'Commitment', statement: 'SLA-ALIGNED. ALWAYS.', body: 'Contract logistics built around your production schedule. One agreement, consistent performance, zero surprises across every run.' },
    ],
    ctaLine1: 'BUILD FASTER,',
    ctaLine2: 'SHIP SMARTER.',
  },

  {
    slug: 'construction',
    name: 'Construction',
    group: 'Industrial',
    badge: 'Industrial · Construction',
    heroLine1: 'MATERIALS',
    heroLine2: 'ON SITE.',
    greenLine: 2,
    heroDescription:
      'Heavy freight, oversized loads, and time-critical site delivery - logistics that keeps building projects on program.',
    heroMeta: [
      { label: 'Sector', value: 'Construction' },
      { label: 'Capability', value: 'Heavy Freight · Site Delivery · Oversized' },
      { label: 'Coverage', value: 'Metro · Regional VIC · Interstate' },
      { label: 'Mode', value: 'Taxi Trucks · Tow · Container' },
    ],
    overview: {
      eyebrow: 'Construction Logistics',
      heading: 'BUILDING SITES CAN\'T WAIT.',
      body: 'Construction program delays cost money - and late material deliveries are a leading cause. Bivry\'s specialist fleet handles heavy structural materials, oversized loads, and time-sensitive site deliveries with precision scheduling aligned to your construction program milestones.',
      keyPoints: [
        'Heavy & oversized load capability',
        'Site access & restricted-window delivery',
        'Construction program milestone alignment',
        'Multi-stage project logistics support',
      ],
    },
    challenges: [
      {
        Icon: HardHat,
        title: 'Heavy & Oversized Loads',
        desc: 'Specialist transport for structural steel, precast panels, and large building materials. The right equipment, correctly rated, for every heavy freight movement.',
      },
      {
        Icon: MapPin,
        title: 'Site Access Logistics',
        desc: 'Active construction sites have restricted access windows, traffic management, and crane schedules. Our drivers know how to navigate site constraints without delays.',
      },
      {
        Icon: Clock,
        title: 'Time-Critical Scheduling',
        desc: 'Material deliveries aligned to construction program milestones - not a minute late. Real-time dispatch and live ETAs keep your site manager in control.',
      },
      {
        Icon: Layers,
        title: 'Multi-Stage Project Support',
        desc: 'Inbound logistics across multiple project phases from groundwork through to fitout. One consistent freight partner for the full project lifecycle.',
      },
    ],
    services: [
      'Taxi Trucks',
      'Trailer Tow Operator',
      'Container Movement',
      'Interstate Road Transport',
      'Same Day Delivery',
      'Contract Logistics',
    ],
    commitments: [
      { category: 'Programme', statement: 'ON PROGRAMME. ALWAYS.', body: 'Material deliveries aligned to construction milestones - not a minute late. Real-time ETAs keep your site manager in control.' },
      { category: 'Access', statement: 'SITE-SAVVY DELIVERY.', body: 'Active sites, restricted windows, crane schedules - our drivers navigate construction environments without creating delays.' },
      { category: 'Lifecycle', statement: 'START TO FINISH.', body: 'From groundwork through to fitout, one consistent freight partner for every phase of your project. No handovers, no gaps.' },
    ],
    ctaLine1: 'DELIVER YOUR',
    ctaLine2: 'NEXT PROJECT.',
  },

  {
    slug: 'agricultural',
    name: 'Agricultural',
    group: 'Industrial',
    badge: 'Industrial · Agricultural',
    heroLine1: 'HARVEST',
    heroLine2: 'DELIVERED.',
    greenLine: 2,
    heroDescription:
      'Seasonal surge capacity, perishable produce handling, and remote area coverage - freight built for Australian agriculture.',
    heroMeta: [
      { label: 'Sector', value: 'Agricultural' },
      { label: 'Capability', value: 'Seasonal · Cold Chain · Rural Routes' },
      { label: 'Coverage', value: 'Regional VIC · Rural · Interstate' },
      { label: 'Speciality', value: 'Perishables · Export · Bulk' },
    ],
    overview: {
      eyebrow: 'Agricultural Logistics',
      heading: 'FROM PADDOCK TO PLATE, WE\'RE THERE.',
      body: 'Agricultural freight is defined by urgency and seasonality. Harvest windows don\'t wait, and fresh produce has a shelf life measured in hours. Bivry\'s regional network, refrigerated fleet, and export coordination capability give agri producers the logistics partner their operations deserve.',
      keyPoints: [
        'Harvest-season volume surge capability',
        'Refrigerated transport for fresh produce',
        'Export & international coordination',
        'Remote and rural area reach',
      ],
    },
    challenges: [
      {
        Icon: Leaf,
        title: 'Seasonal Volume Spikes',
        desc: 'Handling dramatically increased freight volumes during harvest and peak growing seasons. Flexible capacity that scales with the season - no advance booking required.',
      },
      {
        Icon: Thermometer,
        title: 'Perishable Produce',
        desc: 'Temperature-sensitive transport for fresh produce with zero tolerance for delays or temperature deviation. Your crop arrives market-fresh, at full value.',
      },
      {
        Icon: Globe,
        title: 'Export & International',
        desc: 'Coordinating international receiving and export documentation for agri producers. We handle the logistics so you can focus on growing.',
      },
      {
        Icon: MapPin,
        title: 'Remote Area Coverage',
        desc: 'Reaching regional and rural locations across Victoria and interstate. Our regional network goes where metro-only freight companies won\'t.',
      },
    ],
    services: [
      'Regional Deliveries',
      'Interstate Road Transport',
      'International Receiving',
      'Container Movement',
      'Warehousing - Multi Location',
      'Same Day Delivery',
    ],
    commitments: [
      { category: 'Capacity', statement: 'HARVEST-SURGE READY.', body: 'Dramatically increased volumes handled without notice or surcharge. We scale with the season - because the harvest waits for no one.' },
      { category: 'Freshness', statement: 'MARKET-FRESH DELIVERY.', body: 'Minimal transit time for perishables. Your produce arrives at full market value, presentation-ready, not a day past its best.' },
      { category: 'Reach', statement: 'RURAL. NO PROBLEM.', body: 'Our regional network extends to farm gate. We reach locations where metro-only freight companies turn back.' },
    ],
    ctaLine1: 'MOVE YOUR',
    ctaLine2: 'HARVEST FAST.',
  },

  {
    slug: 'pharma-healthcare',
    name: 'Pharma & Healthcare',
    group: 'Regulated',
    badge: 'Regulated · Pharma & Healthcare',
    heroLine1: 'PHARMA',
    heroLine2: 'GRADE LOGISTICS.',
    greenLine: 2,
    heroDescription:
      'GDP-compliant cold chain, chain of custody documentation, and urgent healthcare delivery - logistics where lives depend on precision.',
    heroMeta: [
      { label: 'Sector', value: 'Pharma & Healthcare' },
      { label: 'Capability', value: 'GDP · Cold Chain · Chain of Custody' },
      { label: 'Coverage', value: 'Metro · Regional · Interstate' },
      { label: 'Priority', value: 'Urgent & Scheduled' },
    ],
    overview: {
      eyebrow: 'Pharma & Healthcare Logistics',
      heading: 'COMPLIANCE ISN\'T OPTIONAL. NEITHER IS SPEED.',
      body: 'Pharmaceutical and healthcare logistics operate under strict regulatory frameworks - and there is zero margin for error. Bivry\'s GDP-aligned processes, validated cold chain transport, and full chain-of-custody documentation meet the standards hospitals, pharmacies, and manufacturers require.',
      keyPoints: [
        'Full GDP (Good Distribution Practice) alignment',
        'Validated temperature-controlled transport',
        'End-to-end chain of custody documentation',
        'Priority dispatch for urgent healthcare needs',
      ],
    },
    challenges: [
      {
        Icon: CheckCircle,
        title: 'GDP Compliance',
        desc: 'Full alignment with Good Distribution Practice guidelines for pharmaceutical freight. Every movement documented, every deviation reported, every chain maintained.',
      },
      {
        Icon: Thermometer,
        title: 'Cold Chain Management',
        desc: 'Validated temperature-controlled transport for biologics and temperature-sensitive pharmaceuticals. Real-time monitoring with automated alerts on deviation.',
      },
      {
        Icon: Lock,
        title: 'Chain of Custody',
        desc: 'End-to-end documentation for controlled and regulated products. Audit-ready proof of delivery and handling records for every movement in the chain.',
      },
      {
        Icon: Zap,
        title: 'Urgent Healthcare Delivery',
        desc: 'Priority dispatch for hospitals, pharmacies, and healthcare providers. When a patient needs it, we move - same-day urgent capability across metro and regional areas.',
      },
    ],
    services: [
      'Same Day Delivery',
      'Next Day Delivery',
      'Metro Distribution',
      'Contract Logistics',
      'Warehousing - Multi Location',
      'Regional Deliveries',
    ],
    commitments: [
      { category: 'Compliance', statement: 'GDP. EVERY MOVE.', body: 'Full Good Distribution Practice alignment on every pharmaceutical movement. Documented, auditable, and compliant - no exceptions.' },
      { category: 'Temperature', statement: 'NEVER DEVIATES.', body: 'Validated cold chain for biologics and temperature-sensitive products. Real-time monitoring with automated alerts on any deviation.' },
      { category: 'Urgency', statement: 'SAME-DAY URGENT.', body: 'When healthcare can\'t wait, neither do we. Priority dispatch across metro and regional areas - every day of the year.' },
    ],
    ctaLine1: 'DELIVER WITH',
    ctaLine2: 'PRECISION.',
  },

  {
    slug: 'chemical',
    name: 'Chemical',
    group: 'Regulated',
    badge: 'Regulated · Chemical',
    heroLine1: 'CHEMICAL',
    heroLine2: 'LOGISTICS.',
    greenLine: 2,
    heroDescription:
      'Licensed dangerous goods transport, full regulatory documentation, and specialist handling - chemical freight done safely and compliantly.',
    heroMeta: [
      { label: 'Sector', value: 'Chemical' },
      { label: 'Capability', value: 'DG Licensed · Class 1–9 · MSDS Compliance' },
      { label: 'Coverage', value: 'Metro · Regional · Interstate' },
      { label: 'Standard', value: 'ADG Code Compliant' },
    ],
    overview: {
      eyebrow: 'Chemical Logistics',
      heading: 'HAZARDOUS GOODS. HANDLED RIGHT.',
      body: 'Transporting chemical products demands licensed operators, specialist equipment, and complete regulatory documentation. Bivry\'s dangerous goods capability covers Class 1–9 materials under the Australian Dangerous Goods Code, with trained drivers, compliant vehicles, and audit-ready paperwork on every movement.',
      keyPoints: [
        'Licensed Class 1–9 dangerous goods transport',
        'ADG Code compliant vehicles & drivers',
        'Complete MSDS & DG documentation',
        'Spill prevention and containment protocols',
      ],
    },
    challenges: [
      {
        Icon: FlaskConical,
        title: 'Dangerous Goods Compliance',
        desc: 'Licensed and certified transport for Class 1–9 dangerous goods across road freight. Every driver holds current DG certification; every vehicle is ADG-compliant.',
      },
      {
        Icon: Shield,
        title: 'Spill Prevention & Containment',
        desc: 'Specialist equipment and emergency procedures for chemical transport safety. Containment systems, bunding, and trained response protocols on every run.',
      },
      {
        Icon: FileText,
        title: 'Regulatory Documentation',
        desc: 'Complete MSDS, dangerous goods declarations, and compliance paperwork for every movement. Audit-ready records maintained at every point in the chain.',
      },
      {
        Icon: Lock,
        title: 'Secure Handling',
        desc: 'Controlled loading, unloading, and interim storage for sensitive and hazardous chemical freight. Restricted access, tamper-evident sealing, and full chain accountability.',
      },
    ],
    services: [
      'Container Movement',
      'Interstate Road Transport',
      'Contract Logistics',
      'Warehousing - Multi Location',
      'Regional Deliveries',
      'International Receiving',
    ],
    commitments: [
      { category: 'Licensing', statement: 'DG CLASS 1–9.', body: 'Licensed and certified for all dangerous goods classifications. Compliant vehicles, certified drivers, correct equipment - on every single run.' },
      { category: 'Safety', statement: 'ZERO INCIDENTS.', body: 'Rigorous handling protocols, spill containment systems, and emergency procedures eliminate incidents before they can occur.' },
      { category: 'Documentation', statement: 'AUDIT-READY.', body: 'Complete MSDS, DG declarations, and compliance paperwork for every movement. Ready for regulatory inspection at any point.' },
    ],
    ctaLine1: 'TRANSPORT',
    ctaLine2: 'WITH CONFIDENCE.',
  },
]
