import { motion } from 'framer-motion'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' as const } },
}

export default function Hero() {
  return (
    <section style={{
      minHeight: '100vh',
      background: 'transparent',
      display: 'flex',
      alignItems: 'center',
      padding: '0 48px',
      gap: '48px',
    }}>
      {/* Left column */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        style={{ flex: '1', paddingTop: '80px' }}
      >
        <motion.p variants={item} style={{
          fontFamily: 'var(--font-ui)',
          fontSize: '11px',
          textTransform: 'uppercase',
          letterSpacing: '0.2em',
          fontWeight: 300,
          color: 'var(--gold)',
          marginBottom: '24px',
        }}>
          Your tagline here
        </motion.p>

        <motion.h1 variants={item} style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(52px, 7vw, 88px)',
          fontWeight: 400,
          lineHeight: 1.0,
          margin: '0 0 32px 0',
          color: 'var(--soil)',
        }}>
          Your headline{' '}
          <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>goes</em>
          {' '}here.
        </motion.h1>

        <motion.div variants={item} style={{
          borderLeft: '1px solid var(--gold)',
          paddingLeft: '20px',
          maxWidth: '380px',
        }}>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontStyle: 'italic',
            fontSize: '18px',
            fontWeight: 300,
            lineHeight: 1.6,
            color: 'var(--soil)',
          }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Sed do eiusmod tempor incididunt ut labore et dolore.
          </p>
        </motion.div>
      </motion.div>

      {/* Right column — collage */}
      <div style={{
        flex: '1',
        position: 'relative',
        height: '520px',
        paddingTop: '80px',
      }}>
        {/* Sticky note */}
        <div style={{
          position: 'absolute',
          top: '88px',
          left: '12%',
          zIndex: 10,
          background: 'var(--note-bg)',
          border: '1px solid var(--border)',
          padding: '6px 12px',
          fontFamily: 'var(--font-ui)',
          fontSize: '11px',
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
          fontWeight: 300,
          color: 'var(--gold)',
          transform: 'rotate(-1.2deg)',
        }}>
          new work, spring 2025 ✦
        </div>

        {/* Large image placeholder */}
        <div style={{
          position: 'absolute',
          top: '0',
          left: '0',
          width: '72%',
          height: '460px',
          background: '#C8B89A',
          display: 'flex',
          alignItems: 'flex-end',
          padding: '14px',
        }}>
          <span style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            fontWeight: 300,
            color: 'rgba(255,255,255,0.6)',
          }}>
            your image here
          </span>
        </div>

        {/* Smaller overlapping card */}
        <div style={{
          position: 'absolute',
          bottom: '0',
          right: '0',
          width: '48%',
          height: '260px',
          background: 'var(--parchment)',
          border: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="var(--metal)" strokeWidth="1.2">
            <polygon points="16,2 19.5,12 30,12 21.5,18.5 24.5,29 16,23 7.5,29 10.5,18.5 2,12 12.5,12" />
          </svg>
        </div>
      </div>
    </section>
  )
}
