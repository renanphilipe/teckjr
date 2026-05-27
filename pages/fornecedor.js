import Layout from '../components/Layout'
import { PageHero, Section, ContactCard } from '../components/ui'

export default function Fornecedor() {
  return (
    <Layout title="Fornecedores" desc="Contatos dos fornecedores — TeckJR">
      <PageHero
        icon="🔗"
        title="Fornecedor"
        desc="Contatos dos fornecedores de peças e serviços."
        color="var(--yellow)"
      />

      <div className="wrap" style={{ paddingTop:48, paddingBottom:80 }}>

        <Section title="Contatos dos fornecedores" />

        <ContactCard name="Bigcell"        phone="996178483" />
        <ContactCard name="Atacadãocell"   phone="982723134" />
        <ContactCard name="Romilsoncell"   phone="996888880" />
        <ContactCard name="Papaléguas"     phone="986416147" />
        <ContactCard name="Zion / Seventec" phone="992968630" />
        <ContactCard name="Inoox"          phone="989577102" />
        <ContactCard name="Paulistacell"   phone="30103312" />

        <div style={{
          background:'var(--surface)', border:'1px solid var(--border)',
          borderRadius:'var(--r2)', padding:'16px 20px', marginBottom:8,
          transition:'border-color var(--ease)',
        }} className="res-row">
          <div style={{ fontWeight:700, fontSize:'1rem', color:'var(--text)', marginBottom:6 }}>Mega Cell</div>
          <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
            <a href="https://wa.me/5581985103689" target="_blank" rel="noopener noreferrer"
              style={{ fontFamily:'var(--mono)', fontSize:'0.82rem', color:'#25D366',
                padding:'5px 12px', border:'1px solid rgba(37,211,102,.25)', borderRadius:8,
                background:'rgba(37,211,102,.05)' }}
              className="wa-link">
              WhatsApp: 81-98510-3689 ↗
            </a>
            <span style={{ fontFamily:'var(--mono)', fontSize:'0.82rem', color:'var(--text2)',
              padding:'5px 12px', border:'1px solid var(--border)', borderRadius:8 }}>
              Tel: 81-3224-2778
            </span>
          </div>
          <style>{`.wa-link:hover{background:rgba(37,211,102,.12)!important} .res-row:hover{border-color:rgba(0,229,255,.18)!important}`}</style>
        </div>

        <div style={{
          background:'var(--surface)', border:'1px solid var(--border)',
          borderRadius:'var(--r2)', padding:'16px 20px', marginBottom:8,
        }} className="res-row">
          <div style={{ fontWeight:700, fontSize:'1rem', color:'var(--text)', marginBottom:6 }}>Multi Peças</div>
          <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
            <a href="https://wa.me/5581988616979" target="_blank" rel="noopener noreferrer"
              style={{ fontFamily:'var(--mono)', fontSize:'0.82rem', color:'#25D366',
                padding:'5px 12px', border:'1px solid rgba(37,211,102,.25)', borderRadius:8,
                background:'rgba(37,211,102,.05)' }}
              className="wa-link">
              WhatsApp: 81-98861-6979 ↗
            </a>
            <span style={{ fontFamily:'var(--mono)', fontSize:'0.82rem', color:'var(--text2)',
              padding:'5px 12px', border:'1px solid var(--border)', borderRadius:8 }}>
              Tel: 81-3788-1068
            </span>
          </div>
        </div>

        <Section title="Recuperação de tela" />

        <ContactCard name="Redphone"         phone="81983549503" />
        <ContactCard name="Rodrigo Seventec" phone="81986220055" />

        <Section title="Desbloqueio" />

        <ContactCard name="Rennere" phone="988333242" />

      </div>
    </Layout>
  )
}
