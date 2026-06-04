export interface NavItem {
  label: string
  href: string
  serviceId?: string
}

export interface NavColumn {
  heading: string
  items: NavItem[]
}

export interface NavGroup {
  label: string
  href?: string
  columns?: NavColumn[]
}

export const navItems: NavGroup[] = [
  {
    label: 'Services',
    columns: [
      {
        heading: 'Road Freight',
        items: [
          { label: 'Interstate Road Transport', href: '#services', serviceId: 'interstate'   },
          { label: 'Container Movement',        href: '#services', serviceId: 'container'    },
          { label: 'Taxi Trucks',               href: '#services', serviceId: 'taxi'         },
          { label: 'Trailer Tow Operator',       href: '#services', serviceId: 'tow'          },
        ],
      },
      {
        heading: 'Delivery',
        items: [
          { label: 'Same Day Delivery',  href: '#services', serviceId: 'sameday'  },
          { label: 'Next Day Delivery',  href: '#services', serviceId: 'nextday'  },
          { label: 'Metro Distribution', href: '#services', serviceId: 'metro'    },
          { label: 'Regional Deliveries', href: '#services', serviceId: 'regional' },
        ],
      },
      {
        heading: 'Specialist',
        items: [
          { label: 'Warehousing - Multi Location', href: '#services', serviceId: 'warehousing'   },
          { label: 'Pallet Re-Packaging',          href: '#services', serviceId: 'pallet'        },
          { label: 'International Receiving',      href: '#services', serviceId: 'international' },
          { label: 'Contract Logistics',           href: '#services', serviceId: 'contract'      },
        ],
      },
    ],
  },
  {
    label: 'Why Us',
    columns: [
      {
        heading: 'Company',
        items: [
          { label: 'About Us',           href: '/about'    },
          { label: 'Values',             href: '/values'   },
          { label: 'Networks & Partners', href: '/networks' },
          { label: 'FAQ',                href: '/faq'      },
        ],
      },
      {
        heading: 'Resources',
        items: [
          { label: 'Case Studies', href: '/case-studies' },
          { label: 'Blogs',        href: '/blog'         },
          { label: 'Latest News',  href: '/news'         },
        ],
      },
    ],
  },
  {
    label: 'Industries',
    columns: [
      {
        heading: 'Consumer',
        items: [
          { label: 'FMCG', href: '/industries/fmcg' },
          { label: 'Fashion & Lifestyle', href: '/industries/fashion-lifestyle' },
          { label: 'Retail', href: '/industries/retail' },
          { label: 'Restaurants & Food', href: '/industries/restaurants-food' },
        ],
      },
      {
        heading: 'Industrial',
        items: [
          { label: 'Automotive', href: '/industries/automotive' },
          { label: 'Manufacturing', href: '/industries/manufacturing' },
          { label: 'Construction', href: '/industries/construction' },
          { label: 'Agricultural', href: '/industries/agricultural' },
        ],
      },
      {
        heading: 'Regulated',
        items: [
          { label: 'Pharma & Healthcare', href: '/industries/pharma-healthcare' },
          { label: 'Chemical', href: '/industries/chemical' },
        ],
      },
    ],
  },
  { label: 'Career',  href: '/careers'  },
  { label: 'Contact', href: '/contact'  },
]

export const loginItems: NavItem[] = [
  { label: 'Customer Login',  href: '#' },
  { label: 'Vendor Login',    href: '#' },
  { label: 'Employee Login',  href: '#' },
]
