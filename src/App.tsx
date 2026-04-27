import { useEffect } from 'react'
import './index.css'
import Navbar from './components/Navbar'
import ArtGrid from './components/ArtGrid'
import FashionSection from './components/FashionSection'
import WritingSection from './components/WritingSection'
import AboutSection from './components/AboutSection'
import Footer from './components/Footer'

export default function App() {
  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const pct = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0
      document.documentElement.style.backgroundPositionY = `${pct}%`
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <div className="grain" />
      <Navbar />
      <ArtGrid />
      <WritingSection />
      <FashionSection />
      <AboutSection />
      <Footer />
    </>
  )
}
