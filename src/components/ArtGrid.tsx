import { motion } from 'framer-motion'

const cellVariant = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const fills = ['#C8B89A', '#BEA882', '#D4C4A0', '#C2B28E', '#DDD0B4']

export default function ArtGrid() {
  return (
    <section id="art" style={{ background: 'transparent', padding: '80px 48px' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        marginBottom: '36px',
      }}>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '36px',
          fontWeight: 400,
          margin: 0,
          color: 'var(--soil)',
        }}>
          Visual <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Art</em>
        </h2>
        <a href="#" style={{
          fontFamily: 'var(--font-ui)',
          fontSize: '11px',
          textTransform: 'uppercase',
          letterSpacing: '0.18em',
          fontWeight: 300,
          color: 'var(--gold)',
          textDecoration: 'none',
          borderBottom: '1px solid var(--gold)',
          paddingBottom: '1px',
        }}>
          View all works
        </a>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        style={{
          display: 'grid',
          gridTemplateColumns: '1.4fr 1fr 1fr',
          gridTemplateRows: '300px 200px',
          gap: '8px',
        }}
      >
        {/* Tall cell spanning 2 rows */}
        <motion.div variants={cellVariant} style={{
          gridRow: '1 / 3',
          background: fills[0],
          position: 'relative',
          display: 'flex',
          alignItems: 'flex-end',
          padding: '14px',
        }}>
          <span style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            fontWeight: 300,
            color: 'rgba(255,255,255,0.6)',
          }}>your image here</span>
        </motion.div>

        {[fills[1], fills[2], fills[3]].map((fill, i) => (
          <motion.div key={i} variants={cellVariant} style={{
            background: fill,
            position: 'relative',
            display: 'flex',
            alignItems: 'flex-end',
            padding: '14px',
          }}>
            <span style={{
              fontFamily: 'var(--font-ui)',
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              fontWeight: 300,
              color: 'rgba(255,255,255,0.6)',
            }}>your image here</span>
          </motion.div>
        ))}

        {/* Bottom-left small cell with caption */}
        <motion.div variants={cellVariant} style={{
          background: fills[4],
          position: 'relative',
          display: 'flex',
          alignItems: 'flex-end',
          padding: '14px',
        }}>
          <em style={{
            fontFamily: 'var(--font-body)',
            fontStyle: 'italic',
            fontSize: '13px',
            fontWeight: 300,
            color: 'rgba(255,255,255,0.75)',
          }}>
            untitled study, 2024
          </em>
        </motion.div>
      </motion.div>
    </section>
  )
}
