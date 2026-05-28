export function Section({ title }) {
  return (
    <h2 style={{
      fontSize:'0.7rem', fontWeight:600, fontFamily:'var(--mono)',
      letterSpacing:'0.14em', textTransform:'uppercase',
      color:'var(--text3)', marginTop:40, marginBottom:14,
      paddingBottom:10, borderBottom:'1px solid var(--border)',
    }}>{title}</h2>
  )
}

export function ResourceGroup({ name, links, phone }) {
  const isWa = links && links.length === 1 && links[0].href && links[0].href.includes('wa.me')
  return (
    <div style={{
      background:'var(--surface)', border:'1px solid var(--border)',
      borderRadius:'var(--r2)', padding:'15px 20px', marginBottom:8,
      display:'flex', alignItems:'center', justifyContent:'space-between',
      gap:12, flexWrap:'wrap',
      transition:'border-color var(--ease)',
    }} className="res-row">
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ fontWeight:600, fontSize:'0.95rem', color:'var(--text)' }}>{name}</div>
        {phone && <div style={{ fontSize:'0.78rem', fontFamily:'var(--mono)', color:'var(--text3)', marginTop:2 }}>{phone}</div>}
      </div>
      <div style={{ display:'flex', gap:7, flexWrap:'wrap', flexShrink:0 }}>
        {(links||[]).map((l, i) => {
          const isWaLink = l.href && l.href.includes('wa.me')
          return (
            <a key={i} href={l.href} target="_blank" rel="noopener noreferrer"
              style={{
                display:'inline-flex', alignItems:'center', gap:5,
                fontSize:'0.78rem', fontWeight:600, fontFamily:'var(--mono)',
                color: isWaLink ? '#25D366' : 'var(--accent)',
                padding:'6px 13px',
                border:`1px solid ${isWaLink ? 'rgba(37,211,102,0.25)' : 'rgba(0,229,255,0.22)'}`,
                borderRadius:8,
                background: isWaLink ? 'rgba(37,211,102,0.05)' : 'rgba(0,229,255,0.04)',
                transition:'background var(--ease), border-color var(--ease)',
                whiteSpace:'nowrap',
              }}
              className={isWaLink ? 'wa-lnk' : 'ext-lnk'}
            >
              {isWaLink ? '↗ ' : ''}{l.label || 'Link'}
              {!isWaLink && <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M1 9L9 1M9 1H3.5M9 1V6.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>}
            </a>
          )
        })}
      </div>
      <style>{`
        .res-row:hover { border-color: rgba(0,229,255,.2) !important; }
        .ext-lnk:hover { background:rgba(0,229,255,.1) !important; border-color:rgba(0,229,255,.5) !important; }
        .wa-lnk:hover  { background:rgba(37,211,102,.12) !important; }
      `}</style>
    </div>
  )
}

export function PageHero({ icon, title, desc, color='var(--accent)' }) {
  return (
    <section style={{
      padding:'56px 0 40px',
      borderBottom:'1px solid var(--border)',
      background:`linear-gradient(180deg,color-mix(in srgb,${color} 6%,transparent) 0%,transparent 100%)`,
    }}>
      <div className="wrap">
        <div style={{ display:'flex', alignItems:'center', gap:20, flexWrap:'wrap' }}>
          <span style={{ fontSize:'3rem', lineHeight:1, filter:`drop-shadow(0 0 18px ${color})` }}>{icon}</span>
          <div>
            <h1 style={{ fontSize:'clamp(1.9rem,5vw,2.8rem)', fontWeight:800, letterSpacing:'-0.04em', lineHeight:1.05 }}>{title}</h1>
            <p style={{ fontSize:'0.95rem', color:'var(--text2)', marginTop:8, maxWidth:480 }}>{desc}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
