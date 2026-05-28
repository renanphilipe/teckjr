import { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { fetchContent, trackView } from '../lib/store'

export default function QRCodePage() {
  const [qrUrl, setQrUrl] = useState(null)
  useEffect(() => {
    fetchContent().then(c => setQrUrl(c.qrUrl))
    trackView('qrcode')
  }, [])

  return (
    <Layout title="QR Code" desc="QR Code do TeckJR">
      <div style={{
        minHeight:'calc(100vh - 64px)',
        display:'flex', flexDirection:'column',
        alignItems:'center', justifyContent:'center',
        padding:'60px 24px',
      }}>
        <div style={{
          display:'inline-flex', alignItems:'center', gap:8,
          fontFamily:'var(--mono)', fontSize:'0.72rem', fontWeight:500,
          letterSpacing:'0.12em', textTransform:'uppercase',
          color:'var(--accent)', padding:'7px 14px',
          border:'1px solid rgba(0,229,255,0.22)', borderRadius:100,
          background:'rgba(0,229,255,0.05)', marginBottom:32,
        }}>📱 QR Code do TeckJR</div>

        <h1 style={{ fontSize:'clamp(1.8rem,4vw,3rem)', fontWeight:900, letterSpacing:'-0.04em', marginBottom:12, textAlign:'center' }}>
          Aponte a câmera
        </h1>
        <p style={{ color:'var(--text2)', marginBottom:48, textAlign:'center', fontFamily:'var(--mono)', fontSize:'0.85rem' }}>
          {qrUrl || 'teckjr.vercel.app'}
        </p>

        <a href={qrUrl || '#'} target="_blank" rel="noopener noreferrer" style={{
          display:'block', padding:24,
          background:'var(--surface)', border:'2px solid var(--border)',
          borderRadius:24, transition:'border-color var(--ease), box-shadow var(--ease)',
        }} className="qr-card">
          <img
            src="/qrcode.png"
            alt="QR Code TeckJR"
            style={{ width:'min(380px, 80vw)', height:'min(380px, 80vw)', imageRendering:'pixelated', borderRadius:8 }}
          />
        </a>

        <p style={{ marginTop:24, color:'var(--text3)', fontSize:'0.8rem', fontFamily:'var(--mono)' }}>
          Clique para acessar o site
        </p>

        <style>{`.qr-card:hover { border-color:var(--accent) !important; box-shadow:0 0 40px rgba(0,229,255,0.15) !important; }`}</style>
      </div>
    </Layout>
  )
}
