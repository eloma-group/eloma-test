import { Header }        from '../components/Header/Header'
import { FlyFooter }     from '../components/FlyFooter'
import { ConstructionNotice } from '../components/ConstructionNotice'
import { EgHero }         from '../components/home/EgHero'
import { EgConnected }    from '../components/home/EgConnected'
import { EgBusinesses }   from '../components/home/EgBusinesses'
import { EgCompanies }    from '../components/home/EgCompanies'
import { EgAbout }        from '../components/home/EgAbout'
import { EgWhyExist }     from '../components/home/EgWhyExist'
import { EgCapabilities } from '../components/home/EgCapabilities'

export function HomePage() {
  return (
    <div style={{ overflowX: 'hidden' }}>
      <ConstructionNotice />
      <Header />
      <main>
        <EgHero />
        <EgConnected />
        <EgBusinesses />
        <EgCompanies />
        <EgAbout />
        <EgWhyExist />
        <EgCapabilities />
      </main>
      <FlyFooter />
    </div>
  )
}
