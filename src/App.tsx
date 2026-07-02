import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { AboutPage } from './pages/AboutPage'
import { BlogsPage } from './pages/BlogsPage'
import { NewsroomPage } from './pages/NewsroomPage'
import { PartnersPage } from './pages/PartnersPage'
import { CareersPage } from './pages/CareersPage'
import { SustainabilityPage } from './pages/SustainabilityPage'
import { ContactPage } from './pages/ContactPage'
import { EgDigitalPage } from './pages/companies/EgDigitalPage'
import { ElomaGroupPage } from './pages/companies/ElomaGroupPage'
import { EgImportsPage } from './pages/companies/EgImportsPage'
import { BivryPage } from './pages/companies/BivryPage'
import { EgTravelsPage } from './pages/companies/EgTravelsPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/blog" element={<BlogsPage />} />
        <Route path="/newsroom" element={<NewsroomPage />} />
        <Route path="/partners" element={<PartnersPage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/sustainability" element={<SustainabilityPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/companies/eg-digital" element={<EgDigitalPage />} />
        <Route path="/companies/eloma-group" element={<ElomaGroupPage />} />
        <Route path="/companies/eg-imports" element={<EgImportsPage />} />
        <Route path="/companies/bivry" element={<BivryPage />} />
        <Route path="/companies/eg-travels" element={<EgTravelsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
