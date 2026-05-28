import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'

const NAV = [
  { href: '/',            label: 'Home' },
  { href: '/hardware',    label: 'Hardware' },
  { href: '/software',    label: 'Software' },
  { href: '/promo',       label: 'Promo' },
  { href: '/fornecedor',  label: 'Fornecedor' },
  { href: '/qrcode',      label: 'QR Code' },
]

function Navbar() {
  const { pathname } = useRouter()
  const { isAdmin, logout } = useAuth()
  const [open, setOpen] = useState(false)
  const [solid, setSolid] = useState(false)

  useEffect(() => {
    const fn = () => setSolid(window.scrollY > 10)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  return (
    <header style={{
      position:'fixed', top:0, left:0, right:0, zIndex:99,
      background: solid ? 'rgba(11,11,16,0.95)' : 'transparent',
      backdropFilter: solid ? 'blur(16px)' : 'none',
      borderBottom: solid ? '1px solid var(--border)' : '1px solid transparent',
      transition:'background var(--ease), border-color var(--ease)',
    }}>
      <div className="wrap" style={{ display:'flex', alignItems:'center', justifyContent:'space-between', height:64 }}>

        <Link href="/" style={{ fontWeight:800, fontSize:'1.45rem', letterSpacing:'-0.03em', fontFamily:'var(--font)', lineHeight:1 }}>
          <span style={{ color:'var(--accent)' }}>Teck</span>JR
        </Link>

        <nav style={{ display:'flex', gap:2, alignItems:'center' }} aria-label="Menu principal">
          {NAV.map(n => (
            <Link key={n.href} href={n.href} style={{
              fontSize:'0.85rem', fontWeight:600, padding:'7px 13px',
              borderRadius:'var(--r)',
              color: pathname === n.href ? 'var(--accent)' : 'var(--text2)',
              background: pathname === n.href ? 'var(--accent-dim)' : 'transparent',
              transition:'color var(--ease), background var(--ease)',
            }} className="nav-lnk">{n.label}</Link>
          ))}
          {isAdmin
            ? <>
                <Link href="/admin" style={{
                  fontSize:'0.8rem', fontWeight:700, padding:'6px 13px',
                  borderRadius:'var(--r)', color:'var(--yellow)',
                  background:'rgba(255,209,102,0.08)', border:'1px solid rgba(255,209,102,0.2)',
                  marginLeft:4,
                }} className="admin-lnk">Dashboard</Link>
                <button onClick={logout} style={{
                  fontSize:'0.8rem', fontWeight:600, padding:'6px 12px',
                  borderRadius:'var(--r)', color:'var(--text3)',
                  background:'none', border:'1px solid var(--border)',
                  cursor:'pointer', marginLeft:4,
                }} className="out-btn">Sair</button>
              </>
            : <Link href="/login" style={{
                fontSize:'0.8rem', fontWeight:600, padding:'6px 13px',
                borderRadius:'var(--r)', color:'var(--text2)',
                border:'1px solid var(--border)',
                marginLeft:8, transition:'color var(--ease), border-color var(--ease)',
              }} className="login-lnk">Login</Link>
          }
        </nav>

        <button onClick={() => setOpen(o => !o)} aria-label="Menu"
          style={{ display:'none', flexDirection:'column', gap:5,
            background:'none', border:'none', cursor:'pointer', padding:8, borderRadius:'var(--r)' }}
          className="burger">
          <span className={`bln ${open?'b1':''}`}/><span className={`bln ${open?'b2':''}`}/><span className={`bln ${open?'b3':''}`}/>
        </button>
      </div>

      <div className={`drawer ${open?'open':''}`}>
        {NAV.map(n => (
          <Link key={n.href} href={n.href} style={{
            display:'block', padding:'13px 24px',
            fontSize:'1rem', fontWeight:600,
            color: pathname === n.href ? 'var(--accent)' : 'var(--text2)',
            borderBottom:'1px solid var(--border)',
          }}>{n.label}</Link>
        ))}
        {isAdmin
          ? <>
              <Link href="/admin" style={{ display:'block', padding:'13px 24px', fontSize:'1rem', fontWeight:700, color:'var(--yellow)', borderBottom:'1px solid var(--border)' }}>Dashboard</Link>
              <button onClick={logout} style={{ display:'block', width:'100%', textAlign:'left', padding:'13px 24px', fontSize:'1rem', fontWeight:600, color:'var(--text3)', background:'none', border:'none', borderBottom:'1px solid var(--border)', cursor:'pointer', fontFamily:'var(--font)' }}>Sair</button>
            </>
          : <Link href="/login" style={{ display:'block', padding:'13px 24px', fontSize:'1rem', fontWeight:600, color:'var(--text2)', borderBottom:'1px solid var(--border)' }}>Login</Link>
        }
      </div>

      <style>{`
        .nav-lnk:hover { color:var(--text) !important; background:var(--surface) !important; }
        .admin-lnk:hover { background:rgba(255,209,102,0.15) !important; }
        .login-lnk:hover { color:var(--accent) !important; border-color:var(--accent) !important; }
        .out-btn:hover { color:var(--text) !important; border-color:var(--border2) !important; }
        .bln { display:block; width:22px; height:2px; background:var(--text); border-radius:2px; transition:.28s ease; transform-origin:center; }
        .b1 { transform:translateY(7px) rotate(45deg); }
        .b2 { opacity:0; }
        .b3 { transform:translateY(-7px) rotate(-45deg); }
        .drawer { display:none; flex-direction:column;
          background:rgba(11,11,16,0.98); backdrop-filter:blur(20px);
          border-top:1px solid var(--border); max-height:0; overflow:hidden; transition:max-height .35s ease; }
        .drawer.open { max-height:600px; }
        @media(max-width:820px){
          .burger { display:flex !important; }
          nav[aria-label] { display:none !important; }
          .drawer { display:flex !important; }
        }
      `}</style>
    </header>
  )
}

function Footer() {
  return (
    <footer style={{ background:'var(--bg2)', borderTop:'1px solid var(--border)', marginTop:80 }}>
      <div className="wrap" style={{ padding:'36px 0 20px', display:'flex', flexWrap:'wrap', gap:24, justifyContent:'space-between', alignItems:'flex-start' }}>
        <div>
          <div style={{ fontWeight:800, fontSize:'1.3rem', letterSpacing:'-0.03em', marginBottom:6 }}>
            <span style={{ color:'var(--accent)' }}>Teck</span>JR
          </div>
          <p style={{ fontSize:'0.78rem', color:'var(--text3)', fontFamily:'var(--mono)' }}>Tecnologia que faz sentido.</p>
        </div>
        <nav style={{ display:'flex', gap:16, flexWrap:'wrap', alignItems:'center' }}>
          {NAV.map(n => (
            <Link key={n.href} href={n.href} style={{ fontSize:'0.85rem', color:'var(--text2)', transition:'color var(--ease)' }} className="flink">{n.label}</Link>
          ))}
        </nav>
      </div>
      <div style={{ borderTop:'1px solid var(--border)', padding:'14px 0', textAlign:'center' }}>
        <span style={{ fontSize:'0.74rem', color:'var(--text3)', fontFamily:'var(--mono)' }}>
          © {new Date().getFullYear()} TeckJR — Todos os direitos reservados a Marcio Cavalcante Júnior (MarcioCavJR)
        </span>
      </div>
      <style>{`.flink:hover { color:var(--accent) !important; }`}</style>
    </footer>
  )
}

export default function Layout({ children, title='TeckJR', desc='Hardware, Software, Promoções e Fornecedores.' }) {
  return (
    <>
      <Head>
        <title>{title === 'TeckJR' ? title : `${title} — TeckJR`}</title>
        <meta name="description" content={desc} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Outfit:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </Head>
      <Navbar />
      <main style={{ paddingTop:64, minHeight:'100vh' }}>{children}</main>
      <Footer />
    </>
  )
}
