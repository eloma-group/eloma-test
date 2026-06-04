export interface Service {
  id: string
  number: string
  preLabel: string
  name: string
  title: string
  description: string
  imageUrl: string
  imageAlt: string
}

export const services: Service[] = [
  {
    id: 'interstate',
    number: '01',
    preLabel: 'INTERSTATE',
    name: 'Interstate Road Transport',
    title: 'Road Freight That Never Stops.',
    description:
      'Reliable long-haul linehaul connecting all major Australian states. Predictable ETAs, live GPS tracking, and a dedicated fleet - so your supply chain keeps moving without compromise.',
    imageUrl: '/images/service1.jpg',
    imageAlt: 'BIVRY long-haul freight truck on open Australian highway',
  },
  {
    id: 'warehousing',
    number: '02',
    preLabel: 'WAREHOUSING',
    name: 'Warehousing - Multi Location',
    title: 'Storage Built Around Your Business.',
    description:
      'Multi-location, climate-controlled facilities with short and long-term options. Cross-dock, consolidation, cycle audits, and live WMS reporting - full inventory visibility at every stage.',
    imageUrl: '/images/service2.jpg',
    imageAlt: 'BIVRY multi-location warehousing facility',
  },
  {
    id: 'container',
    number: '03',
    preLabel: 'CONTAINER MOVEMENT',
    name: 'Container Movement - Port to Customer',
    title: 'Port to Door, Without the Delays.',
    description:
      'Seamless container movement from major Australian ports directly to your customer or facility. Full visibility from wharf to delivery with real-time tracking and customs coordination.',
    imageUrl: '/images/service3.jpg',
    imageAlt: 'BIVRY container movement port to customer',
  },
  {
    id: 'pallet',
    number: '04',
    preLabel: 'PALLET SERVICES',
    name: 'Pallet Re-Packaging',
    title: 'Repackaged. Relabelled. Ready.',
    description:
      'Expert pallet re-packaging and relabelling services to meet your retailer or distributor requirements. Efficient turnaround times with quality checks at every step.',
    imageUrl: '/images/service4.jpg',
    imageAlt: 'BIVRY pallet re-packaging service',
  },
  {
    id: 'metro',
    number: '05',
    preLabel: 'METRO',
    name: 'Metro Distribution',
    title: 'City-Wide Delivery, On Schedule.',
    description:
      'Fast and reliable freight distribution across metro areas. Flexible scheduling, 24/7 availability, and dedicated crews ensure your products reach every metro destination on time.',
    imageUrl: '/images/service5.jpg',
    imageAlt: 'BIVRY metro distribution delivery',
  },
  {
    id: 'international',
    number: '06',
    preLabel: 'INTERNATIONAL',
    name: 'International Receiving',
    title: 'Global Freight, Local Expertise.',
    description:
      'Comprehensive international freight receiving services. We handle customs clearance coordination, bonded warehousing, and distribution - bridging your global supply chain to Australian soil.',
    imageUrl: '/images/service6.jpg',
    imageAlt: 'BIVRY international receiving and customs',
  },
  {
    id: 'regional',
    number: '07',
    preLabel: 'REGIONAL',
    name: 'Regional Deliveries',
    title: 'Reach Every Corner of Australia.',
    description:
      'Flexible schedules and dedicated linehaul routes across regional corridors. Hourly or weekly pricing, complete visibility tracking - reliable freight coverage where it matters most.',
    imageUrl: '/images/service7.jpg',
    imageAlt: 'BIVRY regional deliveries across Australia',
  },
  {
    id: 'taxi',
    number: '08',
    preLabel: 'TAXI TRUCKS',
    name: 'Taxi Trucks',
    title: 'On-Demand, On Your Terms.',
    description:
      'Immediate on-demand truck hire for urgent or unscheduled freight. Available across metro and key regional hubs - a responsive solution when your freight needs can\'t wait.',
    imageUrl: '/images/service8.jpg',
    imageAlt: 'BIVRY taxi truck on-demand service',
  },
  {
    id: 'tow',
    number: '09',
    preLabel: 'TRAILER TOW OPERATOR',
    name: 'Trailer Tow Operator',
    title: 'Moving Trailers with Precision & Reliability',
    description:
      "Bivry's Trailer Tow Operator Service ensures the safe and efficient movement of trailers across Australia. From ports and warehouses to distribution centres, we keep your logistics moving with reliability, precision, and on-time delivery.",
    imageUrl: '/images/service9.jpg',
    imageAlt: 'BIVRY tow operator commercial vehicle recovery',
  },
  {
    id: 'contract',
    number: '10',
    preLabel: 'CONTRACT',
    name: 'Contract Logistics',
    title: 'A Logistics Partner, Not Just a Provider.',
    description:
      'End-to-end contract logistics solutions tailored to your operation - dedicated fleet, warehousing, and distribution under one managed agreement. Scalable, reliable, and built around your KPIs.',
    imageUrl: '/images/service10.jpg',
    imageAlt: 'BIVRY contract logistics managed service',
  },
  {
    id: 'sameday',
    number: '11',
    preLabel: 'SAME DAY',
    name: 'Same Day Delivery',
    title: 'Urgent Deliveries, Done Right.',
    description:
      'Express crews handle time-critical consignments between major cities with real-time monitoring and secure arrival guarantees - because some freight simply cannot wait.',
    imageUrl: '/images/service11.jpg',
    imageAlt: 'BIVRY same day express delivery',
  },
  {
    id: 'nextday',
    number: '12',
    preLabel: 'NEXT DAY',
    name: 'Next Day Delivery',
    title: 'Overnight. Every Time.',
    description:
      'Guaranteed next-day delivery connecting metro and key regional hubs. Full tracking, time-definite windows, and a network built to deliver before your customers even open their doors.',
    imageUrl: '/images/service12.jpg',
    imageAlt: 'BIVRY next day overnight delivery',
  },
]
