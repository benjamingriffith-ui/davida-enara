export default function Footer() {
  return (
    <footer style={{
      background: 'transparent',
      borderTop: '1px solid var(--border)',
      padding: '56px 48px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '20px',
    }}>
      {/* Star icon */}
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="var(--gold)" strokeWidth="1.2">
        <polygon points="16,2 19.5,12 30,12 21.5,18.5 24.5,29 16,23 7.5,29 10.5,18.5 2,12 12.5,12" />
      </svg>

      <span style={{
        fontFamily: 'var(--font-display)',
        fontSize: '13px',
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        fontWeight: 400,
        color: 'var(--gold)',
      }}>
        Davida Enara
      </span>

      <nav style={{ display: 'flex', gap: '24px' }}>
        {['Art', 'Fashion', 'Poetry', 'Shop', 'About', 'Instagram'].map((link) => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              fontWeight: 300,
              color: 'var(--soil)',
              textDecoration: 'none',
            }}
          >
            {link}
          </a>
        ))}
      </nav>

      <p style={{
        fontFamily: 'var(--font-ui)',
        fontSize: '11px',
        fontWeight: 300,
        letterSpacing: '0.08em',
        color: 'var(--metal)',
        margin: 0,
      }}>
        © 2025 Davida Enara. All rights reserved.
      </p>
    </footer>
  )
}
