import { Header }        from '../components/Header/Header'
import { FlyFooter }     from '../components/FlyFooter'
import { EgHeroHierarchy } from '../components/home/EgHeroHierarchy'
import { EgConnected }    from '../components/home/EgConnected'
import { EgBusinesses }   from '../components/home/EgBusinesses'
import { EgCompanies }    from '../components/home/EgCompanies'
import { EgLife }         from '../components/home/EgLife'
import { EgAbout }        from '../components/home/EgAbout'
import { EgWhyExist }     from '../components/home/EgWhyExist'
import { EgFoundation }   from '../components/home/EgFoundation'

export function HomePage() {
  return (
    <div style={{ overflowX: 'clip' }}>
      <Header />
      {/* reserves the fixed header's height so the hero (and its bg video)
          starts below the header instead of overlapping it */}
      <div className="eg-header-spacer" aria-hidden />
      <style>{`
        .eg-header-spacer { height: 52px; }
        @media (min-width: 1920px) { .eg-header-spacer { height: 64px; } }
        @media (min-width: 2560px) { .eg-header-spacer { height: 76px; } }
      `}</style>
      <main>
        <EgHeroHierarchy />
        <EgConnected />
        <EgFoundation />
        <EgBusinesses />
        <EgCompanies />
        <EgLife />
        <EgAbout />
        <EgWhyExist />
      </main>
      <FlyFooter />
    </div>
  )
}
