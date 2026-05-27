export function Section({ title }) {
  return (
    <h2 style={{
      fontSize:'0.7rem', fontWeight:700, fontFamily:'var(--mono)',
      letterSpacing:'0.12em', textTransform:'uppercase',
      color:'var(--text3)', marginTop:40, marginBottom:16,
      paddingBottom:10, borderBottom:'1px solid var(--border)',
    }}>{title}</h2>
  )
}

export function ResourceGroup({ name, links }) {
  // links: array of { label?, href }
  return (
    <div style={{
      background:'var(--surface)', border:'1px solid var(--border)',
      borderRadius:'var(--r2)', padding:'18px 22px', marginBottom:10,
      display:'flex', alignItems:'center', justifyContent:'space-between',
      gap:16, flexWrap:'wrap',
      transition:'border-color var(--ease)',
    }}
    className="res-row"
    >
      <span style={{ fontWeight:600, fontSize:'0.95rem', color:'var(--text)', flex:1 }}>{name}</span>
      <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
        {links.map((l, i) => (
          <a key={i} href={l.href} target="_blank" rel="noopener noreferrer"
            style={{
              display:'inline-flex', alignItems:'center', gap:6,
              fontSize:'0.8rem', fontWeight:700, fontFamily:'var(--mono)',
              color:'var(--accent)', padding:'6px 14px',
              border:'1px solid rgba(0,229,255,0.22)', borderRadius:8,
              background:'rgba(0,229,255,0.04)',
              transition:'background var(--ease), border-color var(--ease)',
              whiteSpace:'nowrap',
            }}
            className="ext-link"
          >
            {l.label || 'Link'}
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
              <path d="M1.5 9.5L9.5 1.5M9.5 1.5H3.5M9.5 1.5V7.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        ))}
      </div>
      <style>{`
        .res-row:hover { border-color: rgba(0,229,255,.18) !important; }
        .ext-link:hover { background:rgba(0,229,255,.1) !important; border-color:rgba(0,229,255,.5) !important; }
      `}</style>
    </div>
  )
}

export function ContactCard({ name, phone, category }) {
  const whatsapp = phone ? `https://wa.me/55${phone.replace(/\D/g,'')}` : null
  return (
    <div style={{
      background:'var(--surface)', border:'1px solid var(--border)',
      borderRadius:'var(--r2)', padding:'16px 20px', marginBottom:8,
      display:'flex', alignItems:'center', justifyContent:'space-between', gap:12, flexWrap:'wrap',
      transition:'border-color var(--ease)',
    }} className="res-row">
      <div>
        {category && <div style={{ fontSize:'0.65rem', fontFamily:'var(--mono)', fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--text3)', marginBottom:3 }}>{category}</div>}
        <div style={{ fontWeight:700, fontSize:'1rem', color:'var(--text)' }}>{name}</div>
        <div style={{ fontFamily:'var(--mono)', fontSize:'0.82rem', color:'var(--text2)', marginTop:2 }}>{phone || '—'}</div>
      </div>
      {whatsapp && (
        <a href={whatsapp} target="_blank" rel="noopener noreferrer"
          style={{
            display:'inline-flex', alignItems:'center', gap:6,
            fontSize:'0.78rem', fontWeight:700, fontFamily:'var(--mono)',
            color:'#25D366', padding:'6px 14px',
            border:'1px solid rgba(37,211,102,0.25)', borderRadius:8,
            background:'rgba(37,211,102,0.05)',
            transition:'background var(--ease)',
          }}
          className="wa-link"
        >
          WhatsApp ↗
        </a>
      )}
      <style>{`.wa-link:hover { background:rgba(37,211,102,.12) !important; }`}</style>
    </div>
  )
}

export function PageHero({ icon, title, desc, color='var(--accent)' }) {
  return (
    <section style={{
      padding:'56px 0 40px',
      borderBottom:'1px solid var(--border)',
      background:`linear-gradient(180deg, ${color}08 0%, transparent 100%)`,
    }}>
      <div className="wrap">
        <div style={{ display:'flex', alignItems:'center', gap:20, flexWrap:'wrap' }}>
          <span style={{ fontSize:'3rem', lineHeight:1, filter:`drop-shadow(0 0 18px ${color})` }}>{icon}</span>
          <div>
            <h1 style={{ fontSize:'clamp(1.9rem, 5vw, 2.8rem)', fontWeight:800, letterSpacing:'-0.04em', lineHeight:1 }}>{title}</h1>
            <p style={{ fontSize:'0.95rem', color:'var(--text2)', marginTop:8, maxWidth:480 }}>{desc}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
