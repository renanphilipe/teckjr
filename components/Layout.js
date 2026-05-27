import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

const NAV = [
  { href: '/',            label: 'Home' },
  { href: '/hardware',    label: 'Hardware' },
  { href: '/software',    label: 'Software' },
  { href: '/promo',       label: 'Promo' },
  { href: '/fornecedor',  label: 'Fornecedor' },
]

function Navbar() {
  const { pathname } = useRouter()
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
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 99,
      background: solid ? 'rgba(11,11,16,0.94)' : 'transparent',
      backdropFilter: solid ? 'blur(14px)' : 'none',
      borderBottom: solid ? '1px solid var(--border)' : '1px solid transparent',
      transition: 'background var(--ease), border-color var(--ease)',
    }}>
      <div className="wrap" style={{ display:'flex', alignItems:'center', justifyContent:'space-between', height:64 }}>

        {/* Logo */}
        <Link href="/" style={{ fontWeight:800, fontSize:'1.4rem', letterSpacing:'-0.03em', fontFamily:'var(--font)' }}>
          <span style={{ color:'var(--accent)' }}>Teck</span>JR
        </Link>

        {/* Desktop nav */}
        <nav style={{ display:'flex', gap:4, listStyle:'none' }} aria-label="Menu principal">
          {NAV.map(n => (
            <Link key={n.href} href={n.href} style={{
              fontSize:'0.85rem', fontWeight:600, padding:'7px 13px',
              borderRadius:'var(--r)',
              color: pathname === n.href ? 'var(--accent)' : 'var(--text2)',
              background: pathname === n.href ? 'var(--accent-dim)' : 'transparent',
              transition: 'color var(--ease), background var(--ease)',
            }}
            className="nav-link"
            >{n.label}</Link>
          ))}
        </nav>

        {/* Hamburger */}
        <button
          onClick={() => setOpen(o => !o)}
          aria-label="Menu"
          style={{
            display:'none', flexDirection:'column', gap:5,
            background:'none', border:'none', cursor:'pointer', padding:8,
            borderRadius:'var(--r)',
          }}
          className="burger"
        >
          <span className={`bline ${open ? 'b1' : ''}`} />
          <span className={`bline ${open ? 'b2' : ''}`} />
          <span className={`bline ${open ? 'b3' : ''}`} />
        </button>
      </div>

      {/* Mobile drawer */}
      <div className={`drawer ${open ? 'open' : ''}`}>
        {NAV.map(n => (
          <Link key={n.href} href={n.href}
            style={{
              display:'block', padding:'14px 24px',
              fontSize:'1rem', fontWeight:600,
              color: pathname === n.href ? 'var(--accent)' : 'var(--text2)',
              borderBottom:'1px solid var(--border)',
            }}
          >{n.label}</Link>
        ))}
      </div>

      <style>{`
        .nav-link:hover { color: var(--text) !important; background: var(--surface) !important; }
        .bline { display:block; width:22px; height:2px; background:var(--text); border-radius:2px; transition:.3s ease; transform-origin:center; }
        .b1 { transform: translateY(7px) rotate(45deg); }
        .b2 { opacity:0; }
        .b3 { transform: translateY(-7px) rotate(-45deg); }
        .drawer { display:none; flex-direction:column;
          background:rgba(11,11,16,0.97); backdrop-filter:blur(20px);
          border-top:1px solid var(--border);
          max-height:0; overflow:hidden; transition:max-height .35s ease; }
        .drawer.open { max-height:400px; }
        @media(max-width:680px){
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
      <div className="wrap" style={{ padding:'40px 0 24px', display:'flex', flexWrap:'wrap', gap:24, justifyContent:'space-between', alignItems:'flex-start' }}>
        <div>
          <div style={{ fontWeight:800, fontSize:'1.3rem', letterSpacing:'-0.03em', marginBottom:8 }}>
            <span style={{ color:'var(--accent)' }}>Teck</span>JR
          </div>
          <p style={{ fontSize:'0.8rem', color:'var(--text3)', fontFamily:'var(--mono)' }}>Tecnologia que faz sentido.</p>
        </div>
        <nav style={{ display:'flex', gap:20, flexWrap:'wrap' }}>
          {NAV.map(n => (
            <Link key={n.href} href={n.href} style={{ fontSize:'0.85rem', color:'var(--text2)', transition:'color var(--ease)' }}
              className="flink"
            >{n.label}</Link>
          ))}
        </nav>
      </div>
      <div style={{ borderTop:'1px solid var(--border)', padding:'16px 0', textAlign:'center' }}>
        <span style={{ fontSize:'0.75rem', color:'var(--text3)', fontFamily:'var(--mono)' }}>
          © {new Date().getFullYear()} TeckJR
        </span>
      </div>
      <style>{`.flink:hover { color:var(--accent) !important; }`}</style>
    </footer>
  )
}

export default function Layout({ children, title = 'TeckJR', desc = 'Hardware, Software, Promoções e Fornecedores.' }) {
  return (
    <>
      <Head>
        <title>{title === 'TeckJR' ? title : `${title} — TeckJR`}</title>
        <meta name="description" content={desc} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@400;600;700;800&display=swap" rel="stylesheet" />
      </Head>
      <Navbar />
      <main style={{ paddingTop: 64, minHeight: '100vh' }}>{children}</main>
      <Footer />
    </>
  )
}
