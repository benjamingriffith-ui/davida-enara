export default function AboutStrip() {
  return (
    <section id="about" style={{
      background: 'transparent',
      padding: '100px 48px',
      display: 'flex',
      alignItems: 'center',
      gap: '64px',
    }}>
      {/* Photo placeholder */}
      <div style={{
        flexShrink: 0,
        width: '340px',
        height: '400px',
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(212,196,160,0.2)',
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
          color: 'rgba(245,239,216,0.3)',
        }}>
          your image here
        </span>
      </div>

      {/* Text */}
      <div style={{ maxWidth: '480px' }}>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '40px',
          fontWeight: 400,
          lineHeight: 1.05,
          color: 'var(--butter)',
          margin: '0 0 28px 0',
        }}>
          About [Name]
        </h2>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '18px',
          fontWeight: 300,
          lineHeight: 1.75,
          color: 'rgba(245,239,216,0.8)',
          marginBottom: '32px',
        }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
          ad minim veniam, quis nostrud exercitation ullamco laboris.
        </p>
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
          Read more
        </a>
      </div>
    </section>
  )
}
