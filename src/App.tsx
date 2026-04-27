import { useEffect } from 'react'
import './index.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import ArtGrid from './components/ArtGrid'
import PoetrySection from './components/PoetrySection'
import FashionSection from './components/FashionSection'
import HandwrittenNote from './components/HandwrittenNote'
import AboutStrip from './components/AboutStrip'
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
      <Hero />
      <Marquee />
      <ArtGrid />
      <PoetrySection />
      <FashionSection />
      <HandwrittenNote />
      <AboutStrip />
      <Footer />
    </>
  )
}
