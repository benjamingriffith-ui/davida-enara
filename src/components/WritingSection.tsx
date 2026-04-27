import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useAnimation, useInView, type PanInfo } from 'framer-motion'
import { bus40 } from '../content/bus40'

const src = (file: string) => `/${encodeURIComponent(file)}`

function WritingExpanded({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        background: 'var(--butter)',
        overflowY: 'auto',
      }}
    >
      {/* Close button — fixed so it stays visible while scrolling */}
      <button
        onClick={onClose}
        aria-label="Close"
        style={{
          position: 'fixed',
          top: '28px',
          right: '40px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontFamily: 'var(--font-ui)',
          fontSize: '11px',
          textTransform: 'uppercase',
          letterSpacing: '0.18em',
          fontWeight: 300,
          color: 'var(--soil)',
          opacity: 0.5,
          padding: '4px 0',
          zIndex: 201,
        }}
      >
        ← Back
      </button>

      {/* Centered reading column */}
      <div style={{
        maxWidth: '660px',
        margin: '0 auto',
        padding: '100px 40px 120px',
      }}>
        {/* Cover image */}
        <img
          src={src(bus40.coverImage)}
          alt={bus40.title}
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
            marginBottom: '48px',
          }}
        />

        {/* Date */}
        <p style={{
          fontFamily: 'var(--font-ui)',
          fontSize: '10px',
          textTransform: 'uppercase',
          letterSpacing: '0.22em',
          fontWeight: 300,
          color: 'var(--gold)',
          margin: '0 0 16px',
        }}>
          {bus40.date}
        </p>

        {/* Title */}
        <h1 style={{
          fontFamily: 'var(--font-script)',
          fontSize: '38px',
          fontWeight: 400,
          lineHeight: 1.2,
          color: 'var(--soil)',
          margin: '0 0 8px',
        }}>
          {bus40.title}
        </h1>

        {/* Subtitle */}
        <p style={{
          fontFamily: 'var(--font-body)',
          fontStyle: 'italic',
          fontSize: '17px',
          fontWeight: 300,
          color: 'var(--gold)',
          margin: '0 0 48px',
        }}>
          {bus40.subtitle}
        </p>

        {/* Intro prose */}
        {bus40.intro.map((para, i) => (
          <p key={i} style={{
            fontFamily: 'var(--font-body)',
            fontSize: '17px',
            fontWeight: 300,
            lineHeight: 1.9,
            color: 'rgba(42,34,24,0.85)',
            margin: '0 0 22px',
          }}>
            {para}
          </p>
        ))}

        {/* Divider */}
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '16px',
          textAlign: 'center',
          color: 'var(--gold)',
          margin: '44px 0',
          letterSpacing: '0.4em',
        }}>
          * * *
        </p>

        {/* Poem */}
        <div style={{ margin: '0 0 44px' }}>
          {bus40.poem.map((stanza, si) => (
            <div key={si} style={{ marginBottom: '28px' }}>
              {stanza.map((line, li) => (
                <p key={li} style={{
                  fontFamily: 'var(--font-body)',
                  fontStyle: 'italic',
                  fontSize: '17px',
                  fontWeight: 300,
                  lineHeight: 1.8,
                  color: 'rgba(42,34,24,0.88)',
                  margin: 0,
                }}>
                  {line}
                </p>
              ))}
            </div>
          ))}
        </div>

        {/* Divider */}
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '16px',
          textAlign: 'center',
          color: 'var(--gold)',
          margin: '0 0 44px',
          letterSpacing: '0.4em',
        }}>
          * * *
        </p>

        {/* Outro */}
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '17px',
          fontWeight: 300,
          lineHeight: 1.9,
          color: 'rgba(42,34,24,0.85)',
          margin: '0 0 40px',
        }}>
          {bus40.outro}
        </p>

        {/* Author */}
        <p style={{
          fontFamily: 'var(--font-script)',
          fontSize: '22px',
          fontWeight: 400,
          color: 'var(--gold)',
          margin: 0,
        }}>
          {bus40.author}
        </p>
      </div>
    </motion.div>
  )
}

export default function WritingSection() {
  const ref = useRef<HTMLDivElement>(null)
  const controls = useAnimation()
  const inView = useInView(ref, { once: true, amount: 0.1 })
  const [isDragging, setIsDragging] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const wasDragged = useRef(false)
  const grabOffset = useRef({ x: 0, y: 0 })
  const settledRotation = useRef(4)

  useEffect(() => {
    if (!inView) return
    controls.start({
      opacity: 1,
      x: 0,
      y: 0,
      rotate: 4,
      transition: { duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] },
    }).then(() => {
      settledRotation.current = 4
    })
  }, [inView, controls])

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    grabOffset.current = {
      x: e.clientX - (rect.left + rect.width  / 2),
      y: e.clientY - (rect.top  + rect.height / 2),
    }
  }

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    setIsDragging(false)
    setTimeout(() => { wasDragged.current = false }, 80)

    const { x: rx, y: ry } = grabOffset.current
    const { x: vx, y: vy } = info.velocity
    const torque = rx * vy - ry * vx
    const delta = Math.max(-22, Math.min(22, torque * 0.00018))
    const target = settledRotation.current + delta

    controls.start({
      rotate: target,
      transition: { type: 'spring', stiffness: 90, damping: 18 },
    }).then(() => {
      settledRotation.current = target
    })
  }

  return (
    <>
      {/* Right-of-center placement */}
      <section id="poetry" style={{
        background: 'transparent',
        padding: '220px 48px 300px',
        display: 'flex',
        justifyContent: 'flex-end',
        paddingRight: 'calc(48px + 8%)',
      }}>
        <motion.div
          ref={ref}
          drag
          dragMomentum
          dragTransition={{ power: 0.15, timeConstant: 220 }}
          animate={controls}
          initial={{ opacity: 0, x: 280, y: 60, rotate: 10 }}
          whileDrag={{ scale: 1.04 }}
          onPointerDown={handlePointerDown}
          onDragStart={() => { setIsDragging(true); wasDragged.current = true }}
          onDragEnd={handleDragEnd}
          onClick={() => { if (!wasDragged.current) setExpanded(true) }}
          style={{
            width: 280,
            cursor: isDragging ? 'grabbing' : 'pointer',
            zIndex: isDragging ? 100 : 1,
            userSelect: 'none',
            flexShrink: 0,
          }}
        >
          <motion.div
            animate={isDragging ? { y: 0 } : { y: [0, -7, 0] }}
            transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              background: 'url(/parchment-bg.jpg) center / cover',
              padding: '10px 10px 24px',
              boxShadow: isDragging
                ? '0 24px 48px rgba(0,0,0,0.32)'
                : '3px 5px 16px rgba(0,0,0,0.2)',
              transition: 'box-shadow 0.2s ease',
            }}
          >
            {/* Cover image */}
            <img
              src={src(bus40.coverImage)}
              alt={bus40.title}
              draggable={false}
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />

            {/* Title in La Belle Aurore */}
            <p style={{
              fontFamily: 'var(--font-script)',
              fontSize: '20px',
              color: 'var(--soil)',
              margin: '14px 4px 8px',
              lineHeight: 1.2,
            }}>
              {bus40.title}
            </p>

            {/* Preview text */}
            <p style={{
              fontFamily: 'var(--font-body)',
              fontStyle: 'italic',
              fontSize: '12px',
              fontWeight: 300,
              lineHeight: 1.6,
              color: 'rgba(42,34,24,0.6)',
              margin: '0 4px',
            }}>
              {bus40.preview}
            </p>
          </motion.div>
        </motion.div>
      </section>

      <AnimatePresence>
        {expanded && <WritingExpanded onClose={() => setExpanded(false)} />}
      </AnimatePresence>
    </>
  )
}
