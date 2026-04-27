import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useAnimation, useInView, type PanInfo } from 'framer-motion'

const PAINTINGS = [
  { title: 'Ooni Luwoo of Ile Ife',                        year: '2021', medium: 'Oil on canvas', file: 'Ooni Luwoo of Ile Ife.png',                        rotate: -4, flyX: -320, flyY: -80  },
  { title: 'Funmilayo Ransome Kuti',                        year: '2021', medium: 'Oil on canvas', file: 'Funmilayo Ransome Kuti.png',                        rotate:  3, flyX:  300, flyY: -60  },
  { title: 'Usman Dan Fodio of the Sokoto Caliphate',       year: '2021', medium: 'Oil on canvas', file: 'Usman Dan Fodio of the Sokoto Caliphate.png',       rotate: -2, flyX: -240, flyY:  140 },
  { title: 'The Ancient Kingdom of Akwa Akpa',              year: '2020', medium: 'Oil on canvas', file: 'The Ancient Kingdom of Akwa Akpa.png',              rotate:  5, flyX:  260, flyY:  120 },
  { title: 'Queen Moremi Ajasoro of Ile Ife',               year: '2020', medium: 'Oil on canvas', file: 'Queen Moremi Ajasoro of Ile Ife.png',               rotate: -3, flyX:   60, flyY:  240 },
]

type Painting = typeof PAINTINGS[0]

const src = (file: string) => `/${encodeURIComponent(file)}`

function ArtCard({
  painting,
  index,
  onExpand,
}: {
  painting: Painting
  index: number
  onExpand: (p: Painting) => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const controls = useAnimation()
  const inView = useInView(ref, { once: true, amount: 0.1 })
  const [isDragging, setIsDragging] = useState(false)
  const wasDragged = useRef(false)
  // grab point relative to card center, for angular momentum
  const grabOffset = useRef({ x: 0, y: 0 })
  // settled rotation after each spring, so we can accumulate spins
  const settledRotation = useRef(painting.rotate)

  useEffect(() => {
    if (!inView) return
    controls.start({
      opacity: 1,
      x: 0,
      y: 0,
      rotate: painting.rotate,
      transition: {
        delay: index * 0.15,
        duration: 0.9,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    }).then(() => {
      settledRotation.current = painting.rotate
    })
  }, [inView, controls, index, painting.rotate])

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
    // 2D cross product in screen coords: positive = clockwise
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
    <motion.div
      ref={ref}
      drag
      dragMomentum
      dragTransition={{ power: 0.15, timeConstant: 220 }}
      animate={controls}
      initial={{ opacity: 0, x: painting.flyX, y: painting.flyY, rotate: painting.rotate - 10 }}
      whileDrag={{ scale: 1.05 }}
      onPointerDown={handlePointerDown}
      onDragStart={() => {
        setIsDragging(true)
        wasDragged.current = true
      }}
      onDragEnd={handleDragEnd}
      onClick={() => {
        if (!wasDragged.current) onExpand(painting)
      }}
      style={{
        width: 260,
        flexShrink: 0,
        cursor: isDragging ? 'grabbing' : 'grab',
        zIndex: isDragging ? 100 : 1,
        position: 'relative',
        userSelect: 'none',
      }}
    >
      {/* Inner wrapper floats independently of drag position */}
      <motion.div
        animate={isDragging ? { y: 0 } : { y: [0, -7, 0] }}
        transition={{ duration: 3.5 + index * 0.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          background: 'url(/canvas-bg.jpg) center / cover',
          padding: '10px 10px 32px',
          boxShadow: isDragging
            ? '0 24px 48px rgba(0,0,0,0.32)'
            : '3px 5px 16px rgba(0,0,0,0.2)',
          transition: 'box-shadow 0.2s ease',
        }}
      >
        {/* Painting image — no cropping, natural aspect ratio */}
        <img
          src={src(painting.file)}
          alt={painting.title}
          draggable={false}
          style={{ width: '100%', height: 'auto', display: 'block' }}
        />

        {/* Caption */}
        <div style={{ paddingTop: '10px' }}>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontStyle: 'italic',
            fontSize: '11.5px',
            fontWeight: 300,
            color: 'var(--soil)',
            margin: 0,
            lineHeight: 1.35,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}>
            {painting.title}
          </p>
          <p style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '10px',
            fontWeight: 300,
            color: 'var(--gold)',
            margin: '3px 0 0',
            letterSpacing: '0.1em',
          }}>
            {painting.year}
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}

const DETAIL_TEXT = (
  <>
    <p style={{
      fontFamily: 'var(--font-body)',
      fontSize: '16px',
      fontWeight: 300,
      lineHeight: 1.85,
      color: 'rgba(42,34,24,0.75)',
      margin: '0 0 18px',
    }}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque varius nulla
      vel tortor tincidunt, eu suscipit nisi varius. Sed euismod nibh a erat suscipit,
      in lacinia lorem auctor. Fusce quis nunc vitae risus condimentum fringilla. Proin
      fermentum augue non magna pharetra, id tempor lorem blandit.
    </p>
    <p style={{
      fontFamily: 'var(--font-body)',
      fontSize: '16px',
      fontWeight: 300,
      lineHeight: 1.85,
      color: 'rgba(42,34,24,0.75)',
      margin: 0,
    }}>
      Curabitur accumsan felis at arcu tristique, in condimentum nisi iaculis. Donec
      suscipit sapien sit amet nibh commodo, nec cursus dui pellentesque. Vestibulum
      faucibus tortor nec justo pretium convallis. Nam dignissim arcu at sagittis posuere.
    </p>
  </>
)

function ExpandedCard({ painting, onClose }: { painting: Painting; onClose: () => void }) {
  // null = not yet known, false = portrait, true = landscape
  const [isLandscape, setIsLandscape] = useState<boolean | null>(null)

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { naturalWidth: w, naturalHeight: h } = e.currentTarget
    setIsLandscape(w > h)
  }

  const closeBtn = (
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
      }}
    >
      ×
    </button>
  )

  const meta = (
    <>
      <p style={{
        fontFamily: 'var(--font-ui)',
        fontSize: '10px',
        textTransform: 'uppercase',
        letterSpacing: '0.22em',
        fontWeight: 300,
        color: 'var(--gold)',
        margin: '0 0 18px',
      }}>
        {painting.year} · {painting.medium}
      </p>
      <h2 style={{
        fontFamily: 'var(--font-display)',
        fontSize: '22px',
        fontWeight: 400,
        lineHeight: 1.25,
        color: 'var(--soil)',
        margin: '0 0 28px',
      }}>
        {painting.title}
      </h2>
      {DETAIL_TEXT}
    </>
  )

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
        background: 'rgba(26,20,12,0.82)',
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
          /* landscape → column (image top, text below)
             portrait  → row   (image left, text right) */
          flexDirection: isLandscape ? 'column' : 'row',
          alignItems: 'flex-start',
          width: '100%',
          maxWidth: isLandscape ? '700px' : '860px',
          maxHeight: '90vh',
          overflow: 'hidden',
          boxShadow: '0 40px 100px rgba(0,0,0,0.5)',
        }}
      >
        {/* ── Image — never cropped ── */}
        {isLandscape ? (
          /* Landscape: full width, natural height */
          <div style={{ width: '100%', background: '#e4ddd0', flexShrink: 0 }}>
            <img
              src={src(painting.file)}
              alt={painting.title}
              onLoad={handleImageLoad}
              style={{ width: '100%', height: 'auto', display: 'block', maxHeight: '55vh', objectFit: 'contain' }}
            />
          </div>
        ) : (
          /* Portrait: fixed-width left panel, image at natural ratio */
          <div style={{
            width: '40%',
            flexShrink: 0,
            background: '#e4ddd0',
            alignSelf: 'stretch',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}>
            <img
              src={src(painting.file)}
              alt={painting.title}
              onLoad={handleImageLoad}
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>
        )}

        {/* ── Details ── */}
        <div style={{
          flex: 1,
          padding: '44px 40px 40px',
          overflowY: 'auto',
          position: 'relative',
          maxHeight: isLandscape ? '40vh' : '90vh',
        }}>
          {closeBtn}
          {meta}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function ArtGrid() {
  const [expanded, setExpanded] = useState<Painting | null>(null)

  // Lock scroll while expanded
  useEffect(() => {
    document.body.style.overflow = expanded ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [expanded])

  return (
    <>
      <section id="art" style={{ background: 'transparent', padding: '220px 48px 280px' }}>


        {/* Card scatter */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '36px',
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}>
          {PAINTINGS.map((painting, i) => (
            <ArtCard
              key={painting.file}
              painting={painting}
              index={i}
              onExpand={setExpanded}
            />
          ))}
        </div>
      </section>

      <AnimatePresence>
        {expanded && (
          <ExpandedCard painting={expanded} onClose={() => setExpanded(null)} />
        )}
      </AnimatePresence>
    </>
  )
}
