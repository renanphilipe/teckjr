import Layout from '../components/Layout'
import Link from 'next/link'

const pages = [
  { href: '/hardware',   label: 'Hardware',    icon: '🖥️', desc: 'Aulas e materiais de hardware' },
  { href: '/software',   label: 'Software',    icon: '💾', desc: 'Materiais, ferramentas e aulas' },
  { href: '/promo',      label: 'Promo',       icon: '🏷️', desc: 'Promoções Shopee para montagem' },
  { href: '/fornecedor', label: 'Fornecedor',  icon: '🔗', desc: 'Contatos de fornecedores' },
]

export default function Home() {
  return (
    <Layout title="TeckJR" desc="Hardware, Software, Promoções e Fornecedores.">

      {/* HERO */}
      <section style={{ position:'relative', minHeight:'calc(100vh - 64px)', display:'flex', alignItems:'center', overflow:'hidden' }}>

        {/* BG glows */}
        <div aria-hidden style={{ position:'absolute', inset:0, pointerEvents:'none' }}>
          <div style={{ position:'absolute', width:500, height:500, right:-80, top:-80,
            borderRadius:'50%', background:'radial-gradient(circle, rgba(0,229,255,0.07) 0%, transparent 70%)', filter:'blur(60px)' }} />
          <div style={{ position:'absolute', width:350, height:350, left:'35%', bottom:0,
            borderRadius:'50%', background:'radial-gradient(circle, rgba(124,92,191,0.09) 0%, transparent 70%)', filter:'blur(80px)' }} />
          {/* grid */}
          <div style={{
            position:'absolute', inset:0,
            backgroundImage:'linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)',
            backgroundSize:'56px 56px',
            WebkitMaskImage:'radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%)',
            maskImage:'radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%)',
          }} />
        </div>

        <div className="wrap" style={{ position:'relative', zIndex:2, paddingTop:80, paddingBottom:80 }}>

          {/* Badge */}
          <div style={{
            display:'inline-flex', alignItems:'center', gap:8,
            fontFamily:'var(--mono)', fontSize:'0.72rem', fontWeight:700,
            letterSpacing:'0.12em', textTransform:'uppercase',
            color:'var(--accent)', padding:'7px 14px',
            border:'1px solid rgba(0,229,255,0.22)', borderRadius:100,
            background:'rgba(0,229,255,0.05)', marginBottom:28,
            animation:'fadeUp .5s ease both',
          }}>
            <span style={{ width:7, height:7, borderRadius:'50%', background:'var(--accent)',
              boxShadow:'0 0 8px var(--accent)', animation:'pulse 2s ease infinite' }} />
            Blog de Tecnologia
          </div>

          {/* Title */}
          <h1 style={{
            fontSize:'clamp(2.6rem, 7vw, 5rem)', fontWeight:800,
            letterSpacing:'-0.045em', lineHeight:1.0,
            animation:'fadeUp .5s .08s ease both',
          }}>
            Bem-vindo ao<br />
            <span style={{ color:'var(--accent)' }}>TeckJR!</span>
          </h1>

          {/* Welcome image */}
          <div style={{ marginTop:32, marginBottom:8, animation:'fadeUp .5s .16s ease both' }}>
            <img
              src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgKo60pNyouIJLJ69CWLPEZvysJJVevniWgDXQMcX-dfOSlpW-yS9pALd7syrSemtId04junoXJ11hmixl79Tdno7CPdaWFo6SuZlW0g5AXBGqP1Gmsvfht5dEARbkBUK9JA0dWkDYRo7V9LhYKy86_j4uYpvHmDorDhkKXnuN6d3dV_k51fL_HdQF-Fh0/s1350/Bem%20Vindos.png"
              alt="Bem Vindos ao TeckJR"
              style={{ borderRadius:'var(--r2)', maxWidth:480, width:'100%', border:'1px solid var(--border)' }}
            />
          </div>

          {/* Nav buttons */}
          <div style={{
            display:'flex', gap:12, flexWrap:'wrap', marginTop:36,
            animation:'fadeUp .5s .24s ease both',
          }}>
            {pages.map(p => (
              <Link key={p.href} href={p.href} style={{
                display:'inline-flex', alignItems:'center', gap:8,
                padding:'11px 22px',
                background:'var(--surface)', border:'1px solid var(--border)',
                color:'var(--text)', borderRadius:'var(--r)',
                fontWeight:600, fontSize:'0.9rem',
                transition:'border-color var(--ease), background var(--ease), color var(--ease)',
              }} className="hero-btn">
                <span>{p.icon}</span> {p.label}
              </Link>
            ))}
          </div>
        </div>

        <style>{`
          @keyframes fadeUp { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } }
          @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.3} }
          .hero-btn:hover { border-color:rgba(0,229,255,.35) !important; color:var(--accent) !important; background:var(--surface2) !important; }
        `}</style>
      </section>

    </Layout>
  )
}
