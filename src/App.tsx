import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { SectionRevealer } from './components/SectionRevealer'

const AboutPage = lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })))
const BlogsPage = lazy(() => import('./pages/BlogsPage').then(m => ({ default: m.BlogsPage })))
const NewsroomPage = lazy(() => import('./pages/NewsroomPage').then(m => ({ default: m.NewsroomPage })))
const PartnersPage = lazy(() => import('./pages/PartnersPage').then(m => ({ default: m.PartnersPage })))
const CareersPage = lazy(() => import('./pages/CareersPage').then(m => ({ default: m.CareersPage })))
const SustainabilityPage = lazy(() => import('./pages/SustainabilityPage').then(m => ({ default: m.SustainabilityPage })))
const ContactPage = lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })))
const EgDigitalPage = lazy(() => import('./pages/companies/EgDigitalPage').then(m => ({ default: m.EgDigitalPage })))
const ElomaGroupPage = lazy(() => import('./pages/companies/ElomaGroupPage').then(m => ({ default: m.ElomaGroupPage })))
const EgImportsPage = lazy(() => import('./pages/companies/EgImportsPage').then(m => ({ default: m.EgImportsPage })))
const BivryPage = lazy(() => import('./pages/companies/BivryPage').then(m => ({ default: m.BivryPage })))
const EgTravelsPage = lazy(() => import('./pages/companies/EgTravelsPage').then(m => ({ default: m.EgTravelsPage })))

function App() {
  return (
    <BrowserRouter>
      <SectionRevealer />
      <Suspense fallback={null}>
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
      </Suspense>
    </BrowserRouter>
  )
}

export default App
