import { Header }        from '../components/Header/Header'
import { FlyFooter }     from '../components/FlyFooter'
import { AsdPartnershipStrip } from '../components/AsdPartnershipStrip'
import { ConstructionNotice } from '../components/ConstructionNotice'
import { EgHero }         from '../components/home/EgHero'
import { EgConnected }    from '../components/home/EgConnected'
import { EgBusinesses }   from '../components/home/EgBusinesses'
import { EgCompanies }    from '../components/home/EgCompanies'
import { EgLife }         from '../components/home/EgLife'
import { EgAbout }        from '../components/home/EgAbout'
import { EgWhyExist }     from '../components/home/EgWhyExist'
import { EgCapabilities } from '../components/home/EgCapabilities'
import { EgFoundation }   from '../components/home/EgFoundation'

export function HomePage() {
  return (
    <div style={{ overflowX: 'clip' }}>
      <ConstructionNotice />
      <Header />
      <main>
        <EgHero />
        <EgConnected />
        <EgBusinesses />
        <EgCompanies />
        <EgLife />
        <EgAbout />
        <EgWhyExist />
        <EgCapabilities />
        <EgFoundation />
      </main>
      <AsdPartnershipStrip />
      <FlyFooter />
    </div>
  )
}
