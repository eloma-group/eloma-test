// import { SplashScreen } from '../components/SplashScreen'
import { Header } from '../components/Header/Header'
import { GlobalPresence } from '../components/GlobalPresence'
import { Hero3Section } from '../components/Hero3Section'
// import { Hero4Section } from '../components/Hero4Section'
import { OurBusinesses } from '../components/OurBusinesses'
import { OurCompanies } from '../components/OurCompanies'
// import { Testimonials } from '../components/Testimonials'
import { FooterCTA } from '../components/FooterCTA'
import { Footer } from '../components/Footer'

export function HomePage() {
  return (
    <>
      {/* <SplashScreen /> */}
      <Header />
      <main>
        <Hero3Section />
        {/* <Hero4Section /> */}
        <OurBusinesses />
        <OurCompanies />
        {/* <Testimonials /> */}
        <GlobalPresence />
      </main>
      <FooterCTA />
      <Footer />
    </>
  )
}
