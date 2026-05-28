import { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import Link from 'next/link'
import { getContent, trackView } from '../lib/store'

const pages = [
  { href:'/hardware',   label:'Hardware',   icon:'🖥️' },
  { href:'/software',   label:'Software',   icon:'💾' },
  { href:'/promo',      label:'Promo',      icon:'🏷️' },
  { href:'/fornecedor', label:'Fornecedor', icon:'🔗' },
  { href:'/qrcode',     label:'QR Code',    icon:'📱' },
]

export default function Home() {
  const [welcomeImg, setWelcomeImg] = useState(null)
  const [qrUrl, setQrUrl]           = useState(null)

  useEffect(() => {
    trackView('home')
    getContent().then(c => {
      setWelcomeImg(c.welcomeImage)
      setQrUrl(c.qrUrl)
    })
  }, [])

  return (
    <Layout title="TeckJR" desc="Hardware, Software, Promoções e Fornecedores.">
      <section style={{ position:'relative', minHeight:'calc(100vh - 64px)', display:'flex', alignItems:'center', overflow:'hidden' }}>

        {/* BG */}
        <div aria-hidden style={{ position:'absolute', inset:0, pointerEvents:'none' }}>
          <div style={{ position:'absolute', width:500, height:500, right:-80, top:-80,
            borderRadius:'50%', background:'radial-gradient(circle,rgba(0,229,255,0.07) 0%,transparent 70%)', filter:'blur(60px)' }}/>
          <div style={{ position:'absolute', width:350, height:350, left:'35%', bottom:0,
            borderRadius:'50%', background:'radial-gradient(circle,rgba(124,92,191,0.09) 0%,transparent 70%)', filter:'blur(80px)' }}/>
          <div style={{
            position:'absolute', inset:0,
            backgroundImage:'linear-gradient(rgba(255,255,255,0.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.018) 1px,transparent 1px)',
            backgroundSize:'56px 56px',
            WebkitMaskImage:'radial-gradient(ellipse 80% 80% at 50% 50%,black 20%,transparent 100%)',
            maskImage:'radial-gradient(ellipse 80% 80% at 50% 50%,black 20%,transparent 100%)',
          }}/>
        </div>

        <div className="wrap" style={{ position:'relative', zIndex:2, paddingTop:80, paddingBottom:80 }}>

          <div style={{
            display:'inline-flex', alignItems:'center', gap:8,
            fontFamily:'var(--mono)', fontSize:'0.72rem', fontWeight:500,
            letterSpacing:'0.12em', textTransform:'uppercase',
            color:'var(--accent)', padding:'7px 14px',
            border:'1px solid rgba(0,229,255,0.22)', borderRadius:100,
            background:'rgba(0,229,255,0.05)', marginBottom:28,
            animation:'fadeUp .5s ease both',
          }}>
            <span style={{ width:7, height:7, borderRadius:'50%', background:'var(--accent)',
              boxShadow:'0 0 8px var(--accent)', animation:'pulse 2s ease infinite' }}/>
            Blog de Tecnologia
          </div>

          <h1 style={{ fontSize:'clamp(2.6rem,7vw,5rem)', fontWeight:900,
            letterSpacing:'-0.04em', lineHeight:1.0, animation:'fadeUp .5s .08s ease both' }}>
            Bem-vindo ao<br />
            <span style={{ color:'var(--accent)' }}>TeckJR!</span>
          </h1>

          {/* Image + QR side by side */}
          {welcomeImg && (
            <div style={{ display:'flex', gap:16, alignItems:'stretch', marginTop:32, marginBottom:8,
              animation:'fadeUp .5s .16s ease both', flexWrap:'wrap' }}>
              <img src={welcomeImg} alt="Bem Vindos ao TeckJR"
                style={{ borderRadius:'var(--r2)', width:'clamp(220px,45vw,420px)',
                  objectFit:'cover', border:'1px solid var(--border)', flexShrink:0 }} />
              {qrUrl && (
                <a href={qrUrl} target="_blank" rel="noopener noreferrer" style={{
                  display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
                  gap:10, padding:16,
                  background:'var(--surface)', border:'1px solid var(--border)',
                  borderRadius:'var(--r2)', flexShrink:0,
                  width:'clamp(220px,45vw,420px)',
                  transition:'border-color var(--ease)',
                }} className="qr-box">
                  <img src="/qrcode.png" alt="QR Code TeckJR"
                    style={{ width:'100%', maxWidth:380, borderRadius:8, imageRendering:'pixelated' }}/>
                  <span style={{ fontSize:'0.75rem', fontFamily:'var(--mono)', color:'var(--text3)', letterSpacing:'0.06em' }}>
                    teckjr.vercel.app
                  </span>
                </a>
              )}
            </div>
          )}

          <div style={{ display:'flex', gap:10, flexWrap:'wrap', marginTop:32, animation:'fadeUp .5s .24s ease both' }}>
            {pages.map(p => (
              <Link key={p.href} href={p.href} style={{
                display:'inline-flex', alignItems:'center', gap:8,
                padding:'10px 20px',
                background:'var(--surface)', border:'1px solid var(--border)',
                color:'var(--text)', borderRadius:'var(--r)',
                fontWeight:600, fontSize:'0.88rem',
                transition:'border-color var(--ease), background var(--ease), color var(--ease)',
              }} className="hero-btn">
                <span>{p.icon}</span> {p.label}
              </Link>
            ))}
          </div>
        </div>

        <style>{`
          @keyframes fadeUp { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
          @keyframes pulse  { 0%,100%{opacity:1} 50%{opacity:.3} }
          .hero-btn:hover { border-color:rgba(0,229,255,.35) !important; color:var(--accent) !important; background:var(--surface2) !important; }
          .qr-box:hover { border-color:rgba(0,229,255,.4) !important; }
        `}</style>
      </section>
    </Layout>
  )
}
