import Layout from '../components/Layout'
import Link from 'next/link'
export default function NotFound() {
  return (
    <Layout title="404 — TeckJR">
      <div style={{ minHeight:'calc(100vh - 64px)', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', textAlign:'center', padding:'48px 24px' }}>
        <div style={{ fontSize:'clamp(5rem,18vw,10rem)', fontWeight:900, letterSpacing:'-0.06em', lineHeight:1, color:'transparent', WebkitTextStroke:'2px #26263a', fontFamily:'DM Mono,monospace', marginBottom:16 }}>404</div>
        <h1 style={{ fontSize:'1.4rem', fontWeight:700, marginBottom:10 }}>Página não encontrada</h1>
        <p style={{ color:'#8888a8', marginBottom:32 }}>Este endereço não existe ou foi movido.</p>
        <Link href="/" style={{ padding:'11px 24px', background:'#17171e', border:'1px solid #26263a', borderRadius:10, fontWeight:600, fontSize:'0.9rem', transition:'border-color .2s' }} className="back-btn">← Voltar ao início</Link>
        <style>{`.back-btn:hover{border-color:var(--accent)!important;color:var(--accent)!important}`}</style>
      </div>
    </Layout>
  )
}
