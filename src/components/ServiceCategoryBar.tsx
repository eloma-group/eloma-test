import { motion } from 'framer-motion'
import { Package, MapPin, Globe, Navigation, Truck, Caravan } from 'lucide-react'

const NAVY  = '#08213C'
const GREEN = '#3CB98C'

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

const ITEMS = [
  { Icon: Package,    label: 'Container Movement'  },
  { Icon: MapPin,     label: 'Metro Distribution'  },
  { Icon: Globe,      label: 'Regional Deliveries' },
  { Icon: Navigation, label: 'Taxi Trucks'         },
  { Icon: Caravan,    label: 'Trailer Tow Operator' },
  { Icon: Truck,      label: 'International'       },
]

export function ServiceCategoryBar() {
  return (
    <div style={{
      background: NAVY,
      display: 'flex', alignItems: 'stretch',
      borderBottom: '1px solid rgba(255,255,255,0.07)',
    }}>
      {ITEMS.map(({ Icon, label }, i) => (
        <motion.div
          key={label}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.07, ease }}
          style={{
            flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: '9px',
            padding: 'clamp(22px,3vw,36px) clamp(14px,1.8vw,28px)',
            borderRight: i < ITEMS.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none',
          }}
        >
          <Icon size={18} color={GREEN} strokeWidth={1.6} />
          <span style={{
            fontSize: 'clamp(13px,1.1vw,15px)', fontWeight: 600,
            color: 'rgba(255,255,255,0.6)', whiteSpace: 'nowrap',
          }}>
            {label}
          </span>
        </motion.div>
      ))}
    </div>
  )
}
