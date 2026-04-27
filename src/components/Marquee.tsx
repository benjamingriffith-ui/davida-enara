const TEXT = 'Item One ✦ Item Two ✦ Item Three ✦ Item Four ✦ Item Five ✦ Item Six ✦ '

const marqueeStyle: React.CSSProperties = {
  display: 'inline-block',
  whiteSpace: 'nowrap',
  animation: 'marquee-scroll 22s linear infinite',
  fontFamily: 'var(--font-ui)',
  fontSize: '10px',
  textTransform: 'uppercase',
  letterSpacing: '0.25em',
  fontWeight: 300,
  color: 'var(--butter)',
}

export default function Marquee() {
  const repeated = TEXT.repeat(6)

  return (
    <div style={{
      background: 'transparent',
      overflow: 'hidden',
      padding: '14px 0',
    }}>
      <style>{`
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
      <div style={{ display: 'flex' }}>
        <span style={marqueeStyle}>{repeated}</span>
        <span style={{ ...marqueeStyle, animationDelay: '-11s' }}>{repeated}</span>
      </div>
    </div>
  )
}
