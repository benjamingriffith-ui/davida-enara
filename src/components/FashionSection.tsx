const cards = [
  { fill: '#C8B89A', label: 'No. 001', offset: 0 },
  { fill: '#BEA882', label: 'No. 002', offset: 32 },
  { fill: '#C2B28E', label: 'No. 003', offset: 0 },
  { fill: '#D4C4A0', label: 'No. 004', offset: 32 },
]

export default function FashionSection() {
  return (
    <section id="fashion" style={{
      background: 'transparent',
      padding: '100px 48px',
      display: 'flex',
      alignItems: 'center',
      gap: '64px',
    }}>
      {/* Left text */}
      <div style={{ flex: '1', maxWidth: '400px' }}>
        <h2 style={{
          fontFamily: 'var(--font-body)',
          fontStyle: 'italic',
          fontSize: '40px',
          fontWeight: 400,
          lineHeight: 1.1,
          color: 'var(--soil)',
          margin: '0 0 24px 0',
        }}>
          Fashion &amp; Wearable Art
        </h2>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '18px',
          fontWeight: 300,
          lineHeight: 1.7,
          color: 'var(--soil)',
          marginBottom: '32px',
        }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
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
          Browse the collection
        </a>
      </div>

      {/* Right grid */}
      <div style={{
        flex: '1',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '12px',
        alignItems: 'start',
      }}>
        {cards.map((card, i) => (
          <div
            key={i}
            style={{
              background: card.fill,
              aspectRatio: '3/4',
              position: 'relative',
              display: 'flex',
              alignItems: 'flex-end',
              padding: '14px',
              marginTop: card.offset,
            }}
          >
            <span style={{
              fontFamily: 'var(--font-ui)',
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              fontWeight: 300,
              color: 'rgba(255,255,255,0.6)',
            }}>
              {card.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
