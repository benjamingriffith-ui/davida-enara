import { useRef, useState, useEffect, useLayoutEffect } from 'react'

const TEXT_STYLE: React.CSSProperties = {
  fontFamily: 'var(--font-display)',
  fontSize: '32px',
  textTransform: 'uppercase',
  letterSpacing: '0.12em',
  fontWeight: 700,
  lineHeight: 1,
}

function MetalNavLink({ label }: { label: string }) {
  const filterId = `metal-${label.toLowerCase()}`
  const linkRef = useRef<HTMLAnchorElement>(null)
  const glowRef = useRef<HTMLSpanElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!linkRef.current || !glowRef.current) return
    const rect = linkRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    glowRef.current.style.backgroundImage =
      `radial-gradient(circle 22px at ${x}px ${y}px, rgba(255,215,60,1) 0%, rgba(255,180,30,0.35) 60%, transparent 100%)`
  }

  const handleMouseLeave = () => {
    if (glowRef.current) glowRef.current.style.backgroundImage = 'none'
  }

  return (
    <>
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <filter id={filterId} x="-20%" y="-60%" width="140%" height="220%">
          <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" result="warped" />
          <feGaussianBlur in="warped" stdDeviation="1.5" edgeMode="duplicate" result="blurred" />
          <feSpecularLighting in="blurred" lightingColor="#fdfdff" surfaceScale="4.6" specularConstant="1" specularExponent="20" result="specular">
            <fePointLight x="-5" y="60" z="28" />
          </feSpecularLighting>
          <feDiffuseLighting in="blurred" lightingColor="#c3c0d2" surfaceScale="4.5" diffuseConstant="0.4" result="diffuse">
            <feDistantLight azimuth="135" elevation="31" />
          </feDiffuseLighting>
          <feConvolveMatrix in="blurred" order="3" kernelMatrix="0 -1 0 -1 5 -1 0 -1 0" divisor="0.1" bias="0" edgeMode="duplicate" preserveAlpha="true" result="sharpened" />
          <feBlend in="diffuse" in2="specular" mode="soft-light" result="lighting" />
          <feBlend in="warped" in2="lighting" mode="normal" result="lit" />
          <feComposite in="lit" in2="sharpened" operator="in" result="base" />
          <feComposite in="base" in2="SourceGraphic" operator="in" />
        </filter>
      </svg>

      <div style={{ position: 'relative', display: 'inline-block' }}>
        <a
          ref={linkRef}
          href={`#${label.toLowerCase()}`}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            ...TEXT_STYLE,
            color: '#3A3020',
            textDecoration: 'none',
            display: 'inline-block',
            filter: `url(#${filterId})`,
          }}
        >
          {label}
        </a>

        <span
          ref={glowRef}
          aria-hidden="true"
          style={{
            ...TEXT_STYLE,
            position: 'absolute',
            inset: 0,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            mixBlendMode: 'screen',
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          {label}
        </span>
      </div>
    </>
  )
}

const SECTIONS = [
  { id: 'art',     subtitle: 'Painter'  },
  { id: 'poetry',  subtitle: 'Poet'     },
  { id: 'fashion', subtitle: 'Designer' },
  { id: 'about',   subtitle: 'Artist'   },
]

const NAV_LINKS = ['Art', 'Poetry', 'Fashion', 'Shop', 'About']

export default function Navbar() {
  const [suffix, setSuffix] = useState('')
  const [isMobile, setIsMobile] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [enaraLS, setEnaraLS] = useState('0.18em')
  const davidaRef = useRef<HTMLSpanElement>(null)
  const enaraBaseRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const mid = window.innerHeight * 0.8
      let current = ''
      for (const { id, subtitle } of SECTIONS) {
        const el = document.getElementById(id)
        if (!el) continue
        if (el.getBoundingClientRect().top <= mid) current = subtitle
      }
      setSuffix(current)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Compute ENARA letter-spacing so its rendered width matches DAVIDA
  useLayoutEffect(() => {
    const compute = () => {
      if (!davidaRef.current || !enaraBaseRef.current) return
      const davW = davidaRef.current.getBoundingClientRect().width
      const enaW = enaraBaseRef.current.getBoundingClientRect().width
      const lsPx = parseFloat(getComputedStyle(enaraBaseRef.current).letterSpacing)
      if (!enaW || isNaN(lsPx)) return
      setEnaraLS(`${(davW - enaW) / 5 + lsPx}px`)
    }
    document.fonts.ready.then(compute)
    window.addEventListener('resize', compute)
    return () => window.removeEventListener('resize', compute)
  }, [isMobile])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingTop: '28px',
        paddingLeft: isMobile ? '24px' : '48px',
        paddingRight: isMobile ? '24px' : '48px',
      }}>
        {/* Title block */}
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.15 }}>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: isMobile ? '26px' : '42px',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            fontWeight: 700,
            color: 'var(--soil)',
          }}>
            <span ref={davidaRef}>Davida</span>{' '}<span style={{ letterSpacing: enaraLS }}>Enara</span>:
          </span>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: isMobile ? '21px' : '36px',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            fontStyle: 'italic',
            fontWeight: 400,
            color: '#FFF8E8',
            transition: 'opacity 0.4s ease',
            opacity: suffix ? 1 : 0,
            display: 'block',
            minHeight: '1.15em',
          }}>
            {suffix || ' '}
          </span>
        </div>

        {/* Desktop nav links */}
        {!isMobile && (
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            {NAV_LINKS.map((link) => (
              <MetalNavLink key={link} label={link} />
            ))}
          </div>
        )}

        {/* Hidden span to measure ENARA at baseline letter-spacing */}
        <span
          ref={enaraBaseRef}
          aria-hidden="true"
          style={{
            position: 'absolute',
            visibility: 'hidden',
            pointerEvents: 'none',
            userSelect: 'none',
            fontFamily: 'var(--font-display)',
            fontSize: isMobile ? '26px' : '42px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.18em',
            whiteSpace: 'nowrap',
          }}
        >
          Enara
        </span>

        {/* Hamburger button (mobile) */}
        {isMobile && (
          <button
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px 0',
              display: 'flex',
              flexDirection: 'column',
              gap: '5px',
              alignItems: 'flex-end',
              marginTop: '6px',
            }}
          >
            <span style={{
              display: 'block',
              width: '24px',
              height: '1.5px',
              background: 'var(--soil)',
              transition: 'transform 0.3s ease',
              transform: menuOpen ? 'translateY(6.5px) rotate(45deg)' : 'none',
            }} />
            <span style={{
              display: 'block',
              width: '18px',
              height: '1.5px',
              background: 'var(--soil)',
              transition: 'opacity 0.3s ease',
              opacity: menuOpen ? 0 : 1,
            }} />
            <span style={{
              display: 'block',
              width: '24px',
              height: '1.5px',
              background: 'var(--soil)',
              transition: 'transform 0.3s ease',
              transform: menuOpen ? 'translateY(-6.5px) rotate(-45deg)' : 'none',
            }} />
          </button>
        )}
      </nav>

      {/* Mobile full-screen menu overlay */}
      {isMobile && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 40,
            background: 'rgba(245,239,216,0.97)',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '44px',
            transform: menuOpen ? 'translateY(0)' : 'translateY(-100%)',
            transition: 'transform 0.45s cubic-bezier(0.4, 0, 0.2, 1)',
            pointerEvents: menuOpen ? 'auto' : 'none',
          }}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '34px',
                textTransform: 'uppercase',
                letterSpacing: '0.18em',
                fontWeight: 400,
                color: 'var(--soil)',
                textDecoration: 'none',
              }}
            >
              {link}
            </a>
          ))}
        </div>
      )}
    </>
  )
}
