export interface NavItem {
  label: string
  href: string
  companyId?: string
  businessId?: string
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
    label: 'About Us',
    columns: [
      {
        heading: 'About Us',
        items: [
          { label: 'About Us',  href: '/about'     },
          { label: 'Blog',      href: '/blog'       },
          { label: 'Newsroom',  href: '/newsroom'   },
          { label: 'Partners',  href: '/partners'   },
        ],
      },
    ],
  },
  {
    label: 'Our Businesses',
    columns: [
      {
        heading: 'Business',
        items: [
          { label: 'Call Centre',       href: '/#our-businesses', businessId: 'call-centre'       },
          { label: 'Imports',           href: '/#our-businesses', businessId: 'imports'           },
          { label: 'IT Infrastructure', href: '/#our-businesses', businessId: 'it-infrastructure' },
          { label: 'Supply Chain',      href: '/#our-businesses', businessId: 'supply-chain'      },
          { label: 'Travel',            href: '/#our-businesses', businessId: 'travel'            },
        ],
      },
      {
        heading: 'Companies',
        items: [
          { label: 'Eloma Group',          href: '/companies/eloma-group' },
          { label: 'EG Digital Australia', href: '/companies/eg-digital'  },
          { label: 'EG Imports',           href: '/companies/eg-imports' },
          { label: 'EG Transport - BIVRY', href: '/companies/bivry'      },
          { label: 'EG Travels',           href: '/companies/eg-travels' },
        ],
      },
    ],
  },
  {
    label: 'Sustainability',
    columns: [
      {
        heading: 'Sustainability',
        items: [
          { label: 'Environmental Responsibility', href: '/sustainability' },
          { label: 'Sustainability Initiatives',   href: '/sustainability' },
          { label: 'Reports & Updates',            href: '/sustainability' },
        ],
      },
    ],
  },
  { label: 'Careers',    href: '/careers' },
  { label: 'Contact Us', href: '/contact' },
]

export const loginItems: NavItem[] = [
  { label: 'Customer Login',  href: '#' },
  { label: 'Vendor Login',    href: '#' },
  { label: 'Employee Login',  href: '#' },
]
