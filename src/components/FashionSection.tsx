import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useAnimation, useInView, type PanInfo } from 'framer-motion'

const BAGS = ['/bag1.png', '/bag2.png', '/bag3.png', '/bag4.png']

// Cycles through bag images like a gif
function BagGif({ fps = 6 }: { fps?: number }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setFrame(f => (f + 1) % BAGS.length), 1000 / fps)
    return () => clearInterval(id)
  }, [fps])
  return (
    <img
      src={BAGS[frame]}
      alt="Bag preview"
      style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
    />
  )
}

function PurchaseModal({ onClose }: { onClose: () => void }) {
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
          flexDirection: 'row',
          width: '100%',
          maxWidth: '780px',
          maxHeight: '88vh',
          overflow: 'hidden',
          boxShadow: '0 40px 100px rgba(0,0,0,0.5)',
        }}
      >
        {/* Animated bag preview */}
        <div style={{
          width: '45%',
          flexShrink: 0,
          background: '#e4ddd0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          boxSizing: 'border-box',
        }}>
          <BagGif fps={3} />
        </div>

        {/* Purchase details */}
        <div style={{
          flex: 1,
          padding: '44px 40px 40px',
          overflowY: 'auto',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
          {/* Close */}
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

          <div>
            <p style={{
              fontFamily: 'var(--font-ui)',
              fontSize: '10px',
              textTransform: 'uppercase',
              letterSpacing: '0.22em',
              fontWeight: 300,
              color: 'var(--gold)',
              margin: '0 0 16px',
            }}>
              Wearable Art · Limited Edition
            </p>

            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '26px',
              fontWeight: 400,
              lineHeight: 1.2,
              color: 'var(--soil)',
              margin: '0 0 8px',
            }}>
              The [Bag Name] Tote
            </h2>

            <p style={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontSize: '20px',
              fontWeight: 400,
              color: 'var(--gold)',
              margin: '0 0 28px',
            }}>
              $[Price]
            </p>

            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '15px',
              fontWeight: 300,
              lineHeight: 1.85,
              color: 'rgba(42,34,24,0.72)',
              margin: '0 0 16px',
            }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque varius
              nulla vel tortor tincidunt, eu suscipit nisi varius. Sed euismod nibh a
              erat suscipit, in lacinia lorem auctor.
            </p>

            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '15px',
              fontWeight: 300,
              lineHeight: 1.85,
              color: 'rgba(42,34,24,0.72)',
              margin: '0 0 32px',
            }}>
              Hand-dyed natural canvas · Adjustable strap · Interior zip pocket ·
              Ships within 2–3 weeks.
            </p>

            {/* Size / option selector placeholder */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '32px' }}>
              {['Indigo'].map((color) => (
                <button
                  key={color}
                  style={{
                    fontFamily: 'var(--font-ui)',
                    fontSize: '10px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.14em',
                    fontWeight: 300,
                    color: 'var(--soil)',
                    background: 'none',
                    border: '1px solid rgba(42,34,24,0.25)',
                    padding: '7px 14px',
                    cursor: 'pointer',
                  }}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Buy button */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <button
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '11px',
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                fontWeight: 300,
                color: 'var(--note-bg)',
                background: 'var(--soil)',
                border: 'none',
                padding: '16px 24px',
                cursor: 'pointer',
                width: '100%',
              }}
            >
              Add to Cart
            </button>
            <button
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '11px',
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                fontWeight: 300,
                color: 'var(--soil)',
                background: 'none',
                border: '1px solid rgba(42,34,24,0.3)',
                padding: '14px 24px',
                cursor: 'pointer',
                width: '100%',
              }}
            >
              Buy Now
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

function DraggableBag({ imgIndex, setImgIndex, onPurchase }: {
  imgIndex: number
  setImgIndex: (i: number) => void
  onPurchase: () => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const controls = useAnimation()
  const inView = useInView(ref, { once: true, amount: 0.2 })
  const [isDragging, setIsDragging] = useState(false)
  const wasDragged = useRef(false)
  const grabOffset = useRef({ x: 0, y: 0 })
  const settledRotation = useRef(-3)

  useEffect(() => {
    if (!inView) return
    controls.start({
      opacity: 1,
      x: 0,
      y: 0,
      rotate: -3,
      transition: { duration: 1.0, ease: [0.25, 0.46, 0.45, 0.94] },
    }).then(() => {
      settledRotation.current = -3
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

  const handleClick = () => {
    if (wasDragged.current) return
    if (imgIndex < 3) {
      setImgIndex(imgIndex + 1)
    } else {
      onPurchase()
    }
  }

  return (
    <motion.div
      ref={ref}
      drag
      dragMomentum
      dragTransition={{ power: 0.15, timeConstant: 220 }}
      animate={controls}
      initial={{ opacity: 0, x: -260, y: -60, rotate: -12 }}
      whileDrag={{ scale: 1.04 }}
      onPointerDown={handlePointerDown}
      onDragStart={() => { setIsDragging(true); wasDragged.current = true }}
      onDragEnd={handleDragEnd}
      onClick={handleClick}
      style={{
        width: 320,
        flexShrink: 0,
        cursor: isDragging ? 'grabbing' : 'pointer',
        zIndex: isDragging ? 100 : 1,
        userSelect: 'none',
      }}
    >
      {/* Floating inner wrapper */}
      <motion.div
        animate={isDragging ? { y: 0 } : { y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          background: 'transparent',
          padding: '0',
          boxShadow: 'none',
          position: 'relative',
        }}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={imgIndex}
            src={BAGS[imgIndex]}
            alt={`Bag view ${imgIndex + 1}`}
            draggable={false}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 1 }}
            transition={{ duration: 0 }}
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </AnimatePresence>

      </motion.div>
    </motion.div>
  )
}

export default function FashionSection() {
  const [purchaseOpen, setPurchaseOpen] = useState(false)
  const [bagIndex, setBagIndex] = useState(0)

  const handleClose = () => {
    setPurchaseOpen(false)
    setBagIndex(0)
  }

  return (
    <>
      {/* Left-of-center placement */}
      <section id="fashion" style={{
        background: 'transparent',
        padding: '220px 48px 300px',
        paddingLeft: 'calc(48px + 8%)',
      }}>
        <DraggableBag
          imgIndex={bagIndex}
          setImgIndex={setBagIndex}
          onPurchase={() => setPurchaseOpen(true)}
        />
      </section>

      <AnimatePresence>
        {purchaseOpen && (
          <PurchaseModal onClose={handleClose} />
        )}
      </AnimatePresence>
    </>
  )
}
