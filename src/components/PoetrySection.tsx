import { motion } from 'framer-motion'

const lines = [
  'Lorem ipsum dolor sit amet,',
  'consectetur adipiscing elit —',
  'sed do eiusmod tempor,',
  'incididunt ut labore,',
  'et dolore magna aliqua,',
  'ut enim ad minim.',
]

const lineVariant = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' as const } },
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

export default function PoetrySection() {
  return (
    <section id="poetry" style={{
      background: 'transparent',
      padding: '100px 48px',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      {/* Ghost text */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        fontFamily: 'var(--font-display)',
        fontSize: '180px',
        fontWeight: 400,
        color: 'rgba(245,239,216,0.03)',
        whiteSpace: 'nowrap',
        userSelect: 'none',
        pointerEvents: 'none',
      }}>
        verse
      </div>

      <div style={{ position: 'relative', maxWidth: '640px', textAlign: 'center' }}>
        <p style={{
          fontFamily: 'var(--font-ui)',
          fontSize: '11px',
          textTransform: 'uppercase',
          letterSpacing: '0.2em',
          fontWeight: 300,
          color: 'var(--gold)',
          marginBottom: '40px',
        }}>
          Poetry
        </p>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {lines.map((line, i) => (
            <motion.p
              key={i}
              variants={lineVariant}
              style={{
                fontFamily: 'var(--font-body)',
                fontStyle: 'italic',
                fontSize: '26px',
                fontWeight: 300,
                color: 'var(--butter)',
                lineHeight: 1.8,
                margin: 0,
              }}
            >
              {line}
            </motion.p>
          ))}
        </motion.div>

        <p style={{
          fontFamily: 'var(--font-body)',
          fontStyle: 'italic',
          fontSize: '14px',
          fontWeight: 300,
          color: 'var(--gold)',
          marginTop: '36px',
        }}>
          — Source title, year
        </p>
      </div>
    </section>
  )
}
