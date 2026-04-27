import { motion } from 'framer-motion'

const noteLines = [
  'Lorem ipsum dolor sit amet,',
  'consectetur adipiscing elit —',
  'sed do eiusmod tempor,',
  'incididunt ut labore.',
]

export default function HandwrittenNote() {
  return (
    <section style={{
      background: 'transparent',
      padding: '100px 48px',
      display: 'flex',
      justifyContent: 'center',
    }}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{
          background: 'var(--note-bg)',
          border: '1px solid var(--border)',
          boxShadow: '2px 3px 0 var(--border)',
          transform: 'rotate(-0.8deg)',
          padding: '48px 56px 40px',
          maxWidth: '520px',
          width: '100%',
          position: 'relative',
          backgroundImage: 'repeating-linear-gradient(transparent, transparent 31px, var(--border) 31px, var(--border) 32px)',
        }}
      >
        <div style={{ paddingTop: '8px' }}>
          {noteLines.map((line, i) => (
            <p
              key={i}
              style={{
                fontFamily: 'var(--font-body)',
                fontStyle: 'italic',
                fontSize: '20px',
                fontWeight: 300,
                lineHeight: '32px',
                color: 'var(--soil)',
                margin: 0,
              }}
            >
              {line}
            </p>
          ))}
        </div>

        <p style={{
          fontFamily: 'var(--font-display)',
          fontStyle: 'italic',
          fontSize: '16px',
          fontWeight: 400,
          color: 'var(--gold)',
          textAlign: 'right',
          marginTop: '32px',
          lineHeight: '32px',
        }}>
          — D.E.
        </p>
      </motion.div>
    </section>
  )
}
