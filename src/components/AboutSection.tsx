import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useAnimation, useInView, type PanInfo } from 'framer-motion'

const BIO = [
  `Born in Lagos, Nigeria, moving to Singapore at age 14 and subsequently to the United States, Davida grew increasingly appreciative of and curious about the myriad rhythms of being, aspects of human nature, perspectives and simply, stories that colour life.`,
  `For as long as she can remember, visual and literary art, in tandem, have always been her core means of expression. As a child, she spent much of her time writing and illustrating comic books, or bringing everyday objects to life with imaginative plots. However, she gradually lost touch with visual art over the years, until she reunited with it in 2020. Like many of us, she picked up a new hobby in quarantine - hers being digital painting, and she has since been captivated by the medium, mixing it with traditional techniques.`,
  `Her art explores topics across faith in Jesus, culture, Nigerian history and human nature among others. Her distinctive painting style, primarily mixed medium, experiments with texture, scale, colour and landscape to produce whimsical images that nudge the observer to reconsider, re-imagine and most simply, regard. The tone of her writing ranges from serious to witty to humorous or some combination of these, always aimed at attending to the full gamut of human sensibilities. She enjoys infusing storytelling with thoughtful and child-like wonder.`,
  `Aside from her work in the arts, Davida has a passion for education as a means of international development, catalysed by her experiences attending high school across three continents. She has worked as an Academic Impact intern at the United Nations and holds an MSc in Education Policy from the University of Pennsylvania.`,
  `Convinced that nothing is ordinary, she hopes that her art and storytelling will sharpen viewers' attention to the splendour of life and illustrate how paying attention to life's fullness can render the world considerably bigger, yet all the more within our reach.`,
  `Davida currently lives and works in New York City.`,
]

const BIO_CONTENT = (
  <>
    <p style={{
      fontFamily: 'var(--font-ui)',
      fontSize: '10px',
      textTransform: 'uppercase',
      letterSpacing: '0.22em',
      fontWeight: 300,
      color: 'var(--gold)',
      margin: '0 0 14px',
    }}>
      About the Artist
    </p>
    <h2 style={{
      fontFamily: 'var(--font-display)',
      fontSize: '26px',
      fontWeight: 400,
      lineHeight: 1.2,
      color: 'var(--soil)',
      margin: '0 0 28px',
    }}>
      Davida Enara
    </h2>
    {BIO.map((para, i) => (
      <p key={i} style={{
        fontFamily: 'var(--font-body)',
        fontSize: '15px',
        fontWeight: 300,
        lineHeight: 1.85,
        color: 'rgba(42,34,24,0.72)',
        margin: i < BIO.length - 1 ? '0 0 16px' : '0',
      }}>
        {para}
      </p>
    ))}
  </>
)

function AboutModal({ onClose }: { onClose: () => void }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('keydown', handleKey)
    window.addEventListener('resize', handleResize)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKey)
      window.removeEventListener('resize', handleResize)
      document.body.style.overflow = ''
    }
  }, [onClose])

  if (isMobile) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 200,
          background: 'var(--note-bg)',
          overflowY: 'auto',
        }}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: 'fixed',
            top: '20px',
            right: '24px',
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
            zIndex: 201,
          }}
        >
          ← Back
        </button>
        <div style={{ background: '#e4ddd0' }}>
          <img
            src="/about-profile-placeholder.png"
            alt="Davida Enara"
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </div>
        <div style={{ padding: '36px 28px 60px' }}>
          {BIO_CONTENT}
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        background: 'rgba(26,20,12,0.85)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.88, y: 32 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94] }}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'var(--note-bg)',
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          maxWidth: '600px',
          maxHeight: '88vh',
          overflow: 'hidden',
          boxShadow: '0 40px 100px rgba(0,0,0,0.5)',
          position: 'relative',
        }}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: 'absolute',
            top: '14px',
            right: '16px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '22px',
            color: 'var(--soil)',
            opacity: 0.4,
            lineHeight: 1,
            padding: '4px 6px',
            zIndex: 1,
          }}
        >
          ×
        </button>
        <div style={{ overflowY: 'auto' }}>
          <div style={{ background: '#e4ddd0' }}>
            <img
              src="/about-profile-placeholder.png"
              alt="Davida Enara"
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>
          <div style={{ padding: '40px 40px 44px' }}>
            {BIO_CONTENT}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null)
  const controls = useAnimation()
  const inView = useInView(ref, { once: true, amount: 0.2 })
  const [isDragging, setIsDragging] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const wasDragged = useRef(false)
  const grabOffset = useRef({ x: 0, y: 0 })
  const settledRotation = useRef(3)

  useEffect(() => {
    if (!inView) return
    controls.start({
      opacity: 1,
      x: 0,
      y: 0,
      rotate: 3,
      transition: { duration: 1.0, ease: [0.25, 0.46, 0.45, 0.94] },
    }).then(() => {
      settledRotation.current = 3
    })
  }, [inView, controls])

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    grabOffset.current = {
      x: e.clientX - (rect.left + rect.width / 2),
      y: e.clientY - (rect.top + rect.height / 2),
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
      <section id="about" style={{
        background: 'transparent',
        padding: '220px 48px 300px',
        display: 'flex',
        justifyContent: 'center',
        overflow: 'hidden',
      }}>
        <motion.div
          ref={ref}
          drag
          dragMomentum
          dragTransition={{ power: 0.15, timeConstant: 220 }}
          animate={controls}
          initial={{ opacity: 0, x: -100, y: 80, rotate: -4 }}
          onPointerDown={handlePointerDown}
          onDragStart={() => { setIsDragging(true); wasDragged.current = true }}
          onDragEnd={handleDragEnd}
          onClick={() => { if (!wasDragged.current) setModalOpen(true) }}
          style={{
            width: 280,
            cursor: isDragging ? 'grabbing' : 'pointer',
            zIndex: isDragging ? 100 : 1,
            userSelect: 'none',
            flexShrink: 0,
          }}
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <img
              src="/about-thumbnail.png"
              alt="About Davida Enara"
              draggable={false}
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </motion.div>
        </motion.div>
      </section>

      <AnimatePresence>
        {modalOpen && <AboutModal onClose={() => setModalOpen(false)} />}
      </AnimatePresence>
    </>
  )
}
