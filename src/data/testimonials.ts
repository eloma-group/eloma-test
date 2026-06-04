export interface Testimonial {
  id:       number
  quote:    string
  author:   string
  role:     string
  company:  string
  location: string
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: 'BIVRY transformed our supply chain overnight. Their interstate freight runs 96% on-time with full GPS visibility. We push 400+ weekly deliveries - they have never let us down.',
    author: 'James Hartley',
    role: 'Supply Chain Manager',
    company: 'Hartley Food Co.',
    location: 'Melbourne, VIC',
  },
  {
    id: 2,
    quote: 'We moved our entire warehousing to BIVRY\'s Melbourne facility. Real-time WMS reporting and daily cycle audits gave us complete inventory confidence. Stock discrepancies dropped to near zero.',
    author: 'Sarah Mitchell',
    role: 'Operations Director',
    company: 'Mitchell Retail Group',
    location: 'Sydney, NSW',
  },
  {
    id: 3,
    quote: 'Same-day delivery across metro Sydney used to be our biggest pain point. BIVRY solved it in week one - professional crews, always reachable, never miss a pharmacy deadline.',
    author: 'David Nguyen',
    role: 'Logistics Coordinator',
    company: 'Nguyen Pharma Distributors',
    location: 'Sydney, NSW',
  },
  {
    id: 4,
    quote: 'High-value electronics need serious security. BIVRY\'s GPS geofencing and 360° camera monitoring give us complete peace of mind on every shipment. Zero incidents in 18 months.',
    author: 'Emma Clarke',
    role: 'Head of Supply Chain',
    company: 'Clarke Tech Solutions',
    location: 'Brisbane, QLD',
  },
  {
    id: 5,
    quote: 'BIVRY covers our Perth-to-regional WA routes without fail. Their tracking portal keeps our site managers informed without chasing calls. Exactly what a building supplier needs.',
    author: 'Michael Torres',
    role: 'Fleet Coordinator',
    company: 'Torres Building Supplies',
    location: 'Perth, WA',
  },
  {
    id: 6,
    quote: 'The transition from our old 3PL was completely seamless. BIVRY handled the entire migration and our order fulfilment accuracy jumped from 94% to 99.1% within the first quarter.',
    author: 'Amanda Foster',
    role: 'Warehouse Manager',
    company: 'Foster FMCG Group',
    location: 'Adelaide, SA',
  },
  {
    id: 7,
    quote: 'Temperature-sensitive freight across Victoria is no small thing. BIVRY\'s cold chain solution, real-time monitoring, and proactive communication make them our most trusted partner.',
    author: 'Ryan O\'Brien',
    role: 'CEO',
    company: 'O\'Brien Cold Chain',
    location: 'Melbourne, VIC',
  },
  {
    id: 8,
    quote: 'We run tight manufacturing schedules. BIVRY\'s on-time performance and advance notification system means our production line never stops waiting for components. Outstanding reliability.',
    author: 'Lisa Chen',
    role: 'Procurement Manager',
    company: 'Chen Manufacturing',
    location: 'Gold Coast, QLD',
  },
  {
    id: 9,
    quote: 'BIVRY handles our bulk agricultural freight from Hobart to the mainland. Competitive rates, reliable scheduling, and a dedicated account manager who actually picks up the phone.',
    author: 'Tom Walsh',
    role: 'Operations Manager',
    company: 'Walsh Agricultural',
    location: 'Hobart, TAS',
  },
]
