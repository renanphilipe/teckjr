import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { useAuth } from '../context/AuthContext'
import { getContent, saveContent, resetContent, fetchViews, getLogins, DEFAULT_CONTENT } from '../lib/store'

function uid() { return Math.random().toString(36).slice(2,9) }
function fmt(iso) { if (!iso) return '—'; return new Date(iso).toLocaleString('pt-BR') }

/* ── Design tokens (self-contained, no Layout) ─────────────── */
const C = { bg:'#0b0b10', bg2:'#101015', surf:'#17171e', surf2:'#111118', border:'#26263a', accent:'#00e5ff', purple:'#7c5cbf', red:'#ff4d6d', yellow:'#ffd166', green:'#06d6a0', text:'#eaeaf2', text2:'#8888a8', text3:'#44445a' }
const card  = { background:C.surf, border:`1px solid ${C.border}`, borderRadius:14, padding:'20px 24px' }
const inp   = { width:'100%', padding:'9px 13px', background:C.surf2, border:`1px solid ${C.border}`, borderRadius:8, color:C.text, fontSize:'0.9rem', fontFamily:'Outfit,sans-serif', outline:'none' }
const Btn   = ({ onClick, color=C.accent, text=C.bg, children, disabled, style={} }) => (
  <button onClick={onClick} disabled={disabled} style={{ padding:'8px 16px', background:color, color:text, border:'none', borderRadius:8, fontWeight:700, fontSize:'0.82rem', fontFamily:'Outfit,sans-serif', cursor:disabled?'not-allowed':'pointer', opacity:disabled?.6:1, ...style }}>{children}</button>
)
const Ghost = ({ onClick, children, style={} }) => (
  <button onClick={onClick} style={{ padding:'7px 14px', background:'transparent', color:C.text2, border:`1px solid ${C.border}`, borderRadius:8, fontWeight:600, fontSize:'0.82rem', fontFamily:'Outfit,sans-serif', cursor:'pointer', ...style }}>{children}</button>
)
const Label = ({ children }) => (
  <div style={{ fontSize:'0.68rem', fontFamily:'DM Mono,monospace', letterSpacing:'0.1em', textTransform:'uppercase', color:C.text3, marginBottom:5 }}>{children}</div>
)

/* ── Stat ────────────────────────────────────────────────────── */
function Stat({ label, value, sub, color=C.accent }) {
  return (
    <div style={card}>
      <Label>{label}</Label>
      <div style={{ fontSize:'2rem', fontWeight:900, color, letterSpacing:'-0.03em', lineHeight:1 }}>{value}</div>
      {sub && <div style={{ fontSize:'0.72rem', color:C.text3, fontFamily:'DM Mono,monospace', marginTop:4 }}>{sub}</div>}
    </div>
  )
}

/* ── Link row ─────────────────────────────────────────────────── */
function LinkRow({ link, onChange, onRemove }) {
  return (
    <div style={{ display:'flex', gap:8, marginBottom:6, flexWrap:'wrap' }}>
      <input value={link.label} onChange={e=>onChange({...link,label:e.target.value})}
        placeholder="Rótulo" style={{ ...inp, width:120, flexShrink:0 }} className="adm-inp" />
      <input value={link.href} onChange={e=>onChange({...link,href:e.target.value})}
        placeholder="https://..." style={{ ...inp, flex:1, minWidth:160 }} className="adm-inp" />
      <Btn onClick={onRemove} color={C.red} text="#fff" style={{ padding:'8px 12px', flexShrink:0 }}>✕</Btn>
    </div>
  )
}

/* ── Group editor ────────────────────────────────────────────── */
function GroupEditor({ group, onChange, onRemove }) {
  const [open, setOpen] = useState(false)
  const upLink = (i, l) => onChange({...group, links:group.links.map((x,j)=>j===i?l:x)})
  const addLink = () => onChange({...group, links:[...group.links,{label:'Link',href:''}]})
  const rmLink  = i  => onChange({...group, links:group.links.filter((_,j)=>j!==i)})
  return (
    <div style={{ background:C.surf2, border:`1px solid ${C.border}`, borderRadius:10, marginBottom:8, overflow:'hidden' }}>
      <div style={{ display:'flex', alignItems:'center', gap:10, padding:'10px 14px', cursor:'pointer' }} onClick={()=>setOpen(o=>!o)}>
        <span style={{ color:C.text3, fontSize:'0.72rem', flexShrink:0 }}>{open?'▼':'▶'}</span>
        <input value={group.name} onChange={e=>{e.stopPropagation();onChange({...group,name:e.target.value})}}
          onClick={e=>e.stopPropagation()}
          style={{ ...inp, background:'transparent', border:'none', padding:'2px 0', fontWeight:600, flex:1 }} className="adm-inp" />
        <Btn onClick={e=>{e.stopPropagation();onRemove()}} color={C.red} text="#fff" style={{ padding:'5px 10px', fontSize:'0.72rem', flexShrink:0 }}>Remover</Btn>
      </div>
      {open && (
        <div style={{ padding:'0 14px 14px' }}>
          {group.links.map((l,i)=>(
            <LinkRow key={i} link={l} onChange={lnk=>upLink(i,lnk)} onRemove={()=>rmLink(i)} />
          ))}
          <Ghost onClick={addLink} style={{ fontSize:'0.75rem', marginTop:4 }}>+ Adicionar link</Ghost>
        </div>
      )}
    </div>
  )
}

/* ── Section editor ──────────────────────────────────────────── */
function SectionEditor({ section, onChange, onRemove }) {
  const [open, setOpen] = useState(false)
  const upGroup  = (i,g) => onChange({...section, groups:section.groups.map((x,j)=>j===i?g:x)})
  const addGroup = ()    => onChange({...section, groups:[...section.groups,{id:uid(),name:'Novo item',links:[{label:'Link',href:''}]}]})
  const rmGroup  = i     => onChange({...section, groups:section.groups.filter((_,j)=>j!==i)})
  return (
    <div style={{ ...card, marginBottom:10 }}>
      <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:open?14:0 }}>
        <Ghost onClick={()=>setOpen(o=>!o)} style={{ padding:'5px 10px', fontSize:'0.72rem', flexShrink:0 }}>{open?'▲':'▼'}</Ghost>
        <input value={section.title} onChange={e=>onChange({...section,title:e.target.value})}
          style={{ ...inp, fontWeight:700, fontSize:'0.95rem', flex:1 }} placeholder="Nome da categoria" className="adm-inp" />
        <Btn onClick={onRemove} color={C.red} text="#fff" style={{ padding:'7px 12px', flexShrink:0 }}>Remover</Btn>
      </div>
      {open && (
        <>
          {section.groups.map((g,i)=>(
            <GroupEditor key={g.id} group={g} onChange={gr=>upGroup(i,gr)} onRemove={()=>rmGroup(i)} />
          ))}
          <Btn onClick={addGroup} color={C.border} text={C.text} style={{ marginTop:8 }}>+ Novo item</Btn>
        </>
      )}
    </div>
  )
}

/* ── Page editor ──────────────────────────────────────────────── */
function PageEditor({ page, onChange }) {
  const upSection = (i,s) => onChange({...page, sections:page.sections.map((x,j)=>j===i?s:x)})
  const addSection = ()   => onChange({...page, sections:[...page.sections,{id:uid(),title:'Nova Categoria',groups:[]}]})
  const rmSection  = i    => onChange({...page, sections:page.sections.filter((_,j)=>j!==i)})
  return (
    <div>
      <div style={{ display:'flex', gap:12, marginBottom:20, flexWrap:'wrap' }}>
        <div>
          <Label>Ícone</Label>
          <input value={page.icon} onChange={e=>onChange({...page,icon:e.target.value})} style={{ ...inp, width:72 }} className="adm-inp"/>
        </div>
        <div style={{ flex:1 }}>
          <Label>Descrição</Label>
          <input value={page.desc} onChange={e=>onChange({...page,desc:e.target.value})} style={inp} className="adm-inp"/>
        </div>
      </div>
      {page.sections.map((s,i)=>(
        <SectionEditor key={s.id} section={s} onChange={sec=>upSection(i,sec)} onRemove={()=>rmSection(i)} />
      ))}
      <Btn onClick={addSection} color={C.purple} style={{ marginTop:8 }}>+ Nova categoria</Btn>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════
   MAIN DASHBOARD
══════════════════════════════════════════════════════════════ */
export default function Admin() {
  const { isAdmin, logout, checked } = useAuth()
  const router = useRouter()

  const [tab, setTab]         = useState('dashboard')
  const [content, setContent] = useState(null)
  const [views, setViews]     = useState({})
  const [logins, setLogins]   = useState([])
  const [editPage, setEditPage] = useState('hardware')
  const [saveState, setSaveState] = useState('idle')  // idle | saving | ok | error
  const [saveMsg, setSaveMsg]     = useState('')

  useEffect(() => {
    if (checked && !isAdmin) router.replace('/login')
  }, [isAdmin, checked])

  useEffect(() => {
    if (!isAdmin) return
    getContent().then(setContent)
    fetchViews().then(setViews)
    setLogins(getLogins())
  }, [isAdmin])

  async function save() {
    setSaveState('saving')
    setSaveMsg('')
    try {
      await saveContent(content)
      setSaveState('ok')
      setSaveMsg('Salvo e publicado! ✓')
      setTimeout(()=>{ setSaveState('idle'); setSaveMsg('') }, 3000)
    } catch(e) {
      setSaveState('error')
      setSaveMsg(e.message || 'Erro ao salvar')
      setTimeout(()=>{ setSaveState('idle'); setSaveMsg('') }, 5000)
    }
  }

  async function doReset() {
    if (!confirm('Restaurar todo o conteúdo para o padrão original? Esta ação não pode ser desfeita.')) return
    setSaveState('saving')
    try {
      await resetContent()
      const fresh = await getContent()
      setContent(fresh)
      setSaveState('ok')
      setSaveMsg('Conteúdo restaurado! ✓')
      setTimeout(()=>{ setSaveState('idle'); setSaveMsg('') }, 3000)
    } catch(e) {
      setSaveState('error')
      setSaveMsg(e.message)
      setTimeout(()=>{ setSaveState('idle'); setSaveMsg('') }, 5000)
    }
  }

  function updatePage(key, page) {
    setContent(c => ({ ...c, pages: { ...c.pages, [key]: page } }))
  }

  /* save button style */
  const saveBtnColor = saveState==='ok' ? C.green : saveState==='error' ? C.red : C.accent
  const saveBtnLabel = saveState==='saving' ? 'Salvando…' : saveState==='ok' ? '✓ Salvo!' : saveState==='error' ? 'Erro!' : 'Salvar e Publicar'

  if (!checked || !isAdmin || !content) {
    return (
      <>
        <Head>
          <title>Admin — TeckJR</title>
          <link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Outfit:wght@400;600;700;800;900&display=swap" rel="stylesheet"/>
        </Head>
        <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:C.bg, color:C.text3, fontFamily:'Outfit,sans-serif' }}>
          Carregando…
        </div>
      </>
    )
  }

  const PAGE_LABELS = { hardware:'Hardware', software:'Software', promo:'Promo', fornecedor:'Fornecedor', home:'Home', qrcode:'QR Code' }
  const TAB_STYLE = (key) => ({
    fontSize:'0.85rem', fontWeight:600, padding:'9px 18px', borderRadius:8, border:'none',
    cursor:'pointer', fontFamily:'Outfit,sans-serif',
    background: tab===key ? C.accent : C.surf,
    color:       tab===key ? C.bg    : C.text2,
    outline:     tab===key ? 'none'  : `1px solid ${C.border}`,
  })

  return (
    <>
      <Head>
        <title>Dashboard — TeckJR Admin</title>
        <meta name="viewport" content="width=device-width,initial-scale=1"/>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml"/>
        <link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Outfit:wght@400;600;700;800;900&display=swap" rel="stylesheet"/>
      </Head>
      <div style={{ minHeight:'100vh', background:C.bg, color:C.text, fontFamily:'Outfit,sans-serif' }}>

        {/* ── Top bar ── */}
        <div style={{ position:'sticky', top:0, zIndex:50, background:'rgba(11,11,16,0.96)', backdropFilter:'blur(16px)',
          borderBottom:`1px solid ${C.border}`, padding:'0 24px', display:'flex', alignItems:'center', justifyContent:'space-between', height:58 }}>
          <span style={{ fontWeight:900, fontSize:'1.15rem', letterSpacing:'-0.03em' }}>
            <span style={{ color:C.accent }}>Teck</span>JR
            <span style={{ fontSize:'0.65rem', fontFamily:'DM Mono,monospace', color:C.text3, marginLeft:8, letterSpacing:'0.1em', textTransform:'uppercase' }}>Admin</span>
          </span>
          <div style={{ display:'flex', gap:8, alignItems:'center' }}>
            <span style={{ fontSize:'0.75rem', color:C.text3, fontFamily:'DM Mono,monospace' }}>marciocavjr</span>
            <Ghost onClick={()=>router.push('/')} style={{ padding:'5px 12px', fontSize:'0.75rem' }}>← Site</Ghost>
            <Btn onClick={logout} color={C.red} text="#fff" style={{ padding:'6px 14px' }}>Sair</Btn>
          </div>
        </div>

        <div style={{ maxWidth:1100, margin:'0 auto', padding:'28px 24px' }}>

          {/* ── Tabs ── */}
          <div style={{ display:'flex', gap:6, marginBottom:28, flexWrap:'wrap' }}>
            {[['dashboard','📊 Dashboard'],['conteudo','✏️ Conteúdo'],['imagens','🖼️ Imagens & QR'],['logins','🔐 Acessos']].map(([k,l])=>(
              <button key={k} onClick={()=>setTab(k)} style={TAB_STYLE(k)}>{l}</button>
            ))}
          </div>

          {/* ════════ DASHBOARD ════════ */}
          {tab==='dashboard' && (
            <div>
              <h1 style={{ fontSize:'1.75rem', fontWeight:900, letterSpacing:'-0.03em', marginBottom:4 }}>Bem-vindo, Marcio 👋</h1>
              <p style={{ color:C.text2, marginBottom:28, fontFamily:'DM Mono,monospace', fontSize:'0.8rem' }}>
                Último login: {fmt(logins[0]?.at)}
              </p>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(190px,1fr))', gap:12, marginBottom:28 }}>
                <Stat label="Visualizações totais" value={views.__total||0} color={C.accent}/>
                <Stat label="Páginas" value={Object.keys(content.pages).length+2} color={C.purple}/>
                <Stat label="Categorias" value={Object.values(content.pages).reduce((a,p)=>a+(p.sections?.length||0),0)} color={C.yellow}/>
                <Stat label="Links cadastrados" value={Object.values(content.pages).reduce((a,p)=>a+(p.sections||[]).reduce((b,s)=>b+(s.groups||[]).reduce((c,g)=>c+(g.links||[]).length,0),0),0)} color={C.green}/>
                <Stat label="Logins registrados" value={logins.length} color={C.red}/>
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
                <div style={card}>
                  <h3 style={{ fontWeight:700, marginBottom:16, fontSize:'0.9rem' }}>Visualizações por página</h3>
                  {Object.entries(PAGE_LABELS).map(([k,l])=>{
                    const v=views[k]||0; const max=Math.max(1,...Object.keys(PAGE_LABELS).map(k2=>views[k2]||0))
                    return (
                      <div key={k} style={{ marginBottom:10 }}>
                        <div style={{ display:'flex', justifyContent:'space-between', marginBottom:3 }}>
                          <span style={{ fontSize:'0.8rem', color:C.text2, fontFamily:'DM Mono,monospace' }}>{l}</span>
                          <span style={{ fontSize:'0.8rem', fontWeight:700, color:C.accent }}>{v}</span>
                        </div>
                        <div style={{ height:4, background:C.border, borderRadius:3 }}>
                          <div style={{ height:4, width:`${(v/max)*100}%`, background:C.accent, borderRadius:3, transition:'width .6s ease' }}/>
                        </div>
                      </div>
                    )
                  })}
                </div>
                <div style={card}>
                  <h3 style={{ fontWeight:700, marginBottom:16, fontSize:'0.9rem' }}>Ações rápidas</h3>
                  <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                    <Btn onClick={()=>setTab('conteudo')} color={C.purple} style={{ padding:'11px 16px', textAlign:'left' }}>✏️ Editar conteúdo</Btn>
                    <Btn onClick={()=>setTab('imagens')} color={C.accent} style={{ padding:'11px 16px', textAlign:'left' }}>🖼️ Imagem & QR Code</Btn>
                    <Btn onClick={()=>setTab('logins')} color={C.surf2} text={C.text} style={{ padding:'11px 16px', textAlign:'left', border:`1px solid ${C.border}` }}>🔐 Histórico de acessos</Btn>
                    <Ghost onClick={()=>router.push('/')} style={{ padding:'11px 16px', textAlign:'left' }}>← Voltar ao site</Ghost>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ════════ CONTEÚDO ════════ */}
          {tab==='conteudo' && (
            <div>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:12, marginBottom:12 }}>
                <h2 style={{ fontSize:'1.4rem', fontWeight:900, letterSpacing:'-0.03em' }}>Editar Conteúdo</h2>
                <div style={{ display:'flex', gap:8, alignItems:'center' }}>
                  <Ghost onClick={doReset}>Restaurar padrão</Ghost>
                  <Btn onClick={save} color={saveBtnColor} disabled={saveState==='saving'}>{saveBtnLabel}</Btn>
                </div>
              </div>

              {/* Info banner */}
              <div style={{ background:'rgba(0,229,255,0.06)', border:`1px solid rgba(0,229,255,0.2)`, borderRadius:10, padding:'12px 16px', marginBottom:20, fontSize:'0.82rem', color:C.text2, fontFamily:'DM Mono,monospace' }}>
                💡 Após salvar, as alterações ficam disponíveis imediatamente para todos os visitantes do site.
              </div>

              {saveMsg && (
                <div style={{ background: saveState==='error' ? 'rgba(255,77,109,0.1)' : 'rgba(6,214,160,0.1)',
                  border:`1px solid ${saveState==='error' ? C.red : C.green}`, borderRadius:10, padding:'10px 16px',
                  marginBottom:16, fontSize:'0.85rem', color: saveState==='error' ? C.red : C.green, fontFamily:'DM Mono,monospace' }}>
                  {saveMsg}
                </div>
              )}

              {/* Page sub-tabs */}
              <div style={{ display:'flex', gap:6, marginBottom:20, flexWrap:'wrap' }}>
                {Object.entries(PAGE_LABELS).filter(([k])=>content.pages[k]).map(([k,l])=>(
                  <button key={k} onClick={()=>setEditPage(k)} style={{
                    fontSize:'0.82rem', fontWeight:600, padding:'7px 14px', borderRadius:8, border:'none',
                    cursor:'pointer', fontFamily:'Outfit,sans-serif',
                    background: editPage===k ? C.surf : 'transparent',
                    color:       editPage===k ? C.text : C.text2,
                    outline:     editPage===k ? `1px solid ${C.accent}` : `1px solid ${C.border}`,
                  }}>{l}</button>
                ))}
              </div>

              {content.pages[editPage] && (
                <PageEditor
                  key={editPage}
                  page={content.pages[editPage]}
                  onChange={p=>updatePage(editPage,p)}
                />
              )}

              <div style={{ marginTop:20, paddingTop:20, borderTop:`1px solid ${C.border}`, display:'flex', gap:8 }}>
                <Ghost onClick={doReset}>Restaurar padrão</Ghost>
                <Btn onClick={save} color={saveBtnColor} disabled={saveState==='saving'}>{saveBtnLabel}</Btn>
              </div>
            </div>
          )}

          {/* ════════ IMAGENS & QR ════════ */}
          {tab==='imagens' && (
            <div>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:12, marginBottom:20 }}>
                <h2 style={{ fontSize:'1.4rem', fontWeight:900, letterSpacing:'-0.03em' }}>Imagens & QR Code</h2>
                <Btn onClick={save} color={saveBtnColor} disabled={saveState==='saving'}>{saveBtnLabel}</Btn>
              </div>
              {saveMsg && (
                <div style={{ background: saveState==='error' ? 'rgba(255,77,109,0.1)' : 'rgba(6,214,160,0.1)',
                  border:`1px solid ${saveState==='error' ? C.red : C.green}`, borderRadius:10, padding:'10px 16px',
                  marginBottom:16, fontSize:'0.85rem', color: saveState==='error' ? C.red : C.green, fontFamily:'DM Mono,monospace' }}>
                  {saveMsg}
                </div>
              )}
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(320px,1fr))', gap:20 }}>
                <div style={card}>
                  <h3 style={{ fontWeight:700, marginBottom:4 }}>Imagem de Boas-vindas</h3>
                  <p style={{ fontSize:'0.78rem', color:C.text3, fontFamily:'DM Mono,monospace', marginBottom:14 }}>URL da imagem exibida na Home ao lado do QR Code</p>
                  <Label>URL da imagem</Label>
                  <input value={content.welcomeImage} onChange={e=>setContent(c=>({...c,welcomeImage:e.target.value}))}
                    style={{ ...inp, marginBottom:14 }} placeholder="https://..." className="adm-inp"/>
                  {content.welcomeImage && (
                    <img src={content.welcomeImage} alt="preview" style={{ width:'100%', borderRadius:10, border:`1px solid ${C.border}` }}/>
                  )}
                </div>
                <div style={card}>
                  <h3 style={{ fontWeight:700, marginBottom:4 }}>URL do QR Code</h3>
                  <p style={{ fontSize:'0.78rem', color:C.text3, fontFamily:'DM Mono,monospace', marginBottom:14 }}>Link para onde o QR Code na Home aponta</p>
                  <Label>URL de destino</Label>
                  <input value={content.qrUrl} onChange={e=>setContent(c=>({...c,qrUrl:e.target.value}))}
                    style={{ ...inp, marginBottom:14 }} placeholder="https://..." className="adm-inp"/>
                  <div style={{ background:C.surf2, borderRadius:10, padding:16, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:10 }}>
                    <img src="/qrcode.png" alt="QR Code" style={{ width:160, imageRendering:'pixelated', borderRadius:8 }}/>
                  </div>
                  <p style={{ fontSize:'0.7rem', color:C.text3, fontFamily:'DM Mono,monospace' }}>
                    Para alterar a imagem do QR Code, substitua o arquivo <code style={{color:C.accent}}>public/qrcode.png</code> no projeto e faça um novo deploy.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ════════ ACESSOS ════════ */}
          {tab==='logins' && (
            <div>
              <h2 style={{ fontSize:'1.4rem', fontWeight:900, letterSpacing:'-0.03em', marginBottom:6 }}>Histórico de Acessos</h2>
              <p style={{ color:C.text3, fontFamily:'DM Mono,monospace', fontSize:'0.78rem', marginBottom:24 }}>Visualizações vêm do banco de dados. Logins são registrados neste navegador.</p>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(190px,1fr))', gap:12, marginBottom:24 }}>
                <Stat label="Logins registrados" value={logins.length} color={C.yellow}/>
                <Stat label="Visualizações totais" value={views.__total||0} color={C.accent}/>
                <Stat label="Última visita" value={views.__last ? fmt(views.__last).split(',')[0]||'—':'—'} sub={views.__last ? fmt(views.__last).split(',')[1]?.trim()||'—':''} color={C.purple}/>
              </div>
              <div style={card}>
                <h3 style={{ fontWeight:700, marginBottom:16, fontSize:'0.9rem' }}>Log de logins (este navegador)</h3>
                {logins.length === 0
                  ? <p style={{ color:C.text3, fontFamily:'DM Mono,monospace', fontSize:'0.8rem' }}>Nenhum login ainda.</p>
                  : logins.map((l,i)=>(
                    <div key={i} style={{ display:'flex', alignItems:'center', gap:12, padding:'9px 0', borderBottom:`1px solid ${C.border}` }}>
                      <span style={{ fontSize:'0.68rem', fontFamily:'DM Mono,monospace', color:C.text3, width:22, textAlign:'right', flexShrink:0 }}>{i+1}</span>
                      <span style={{ fontSize:'0.82rem', fontFamily:'DM Mono,monospace', color: i===0 ? C.accent : C.text2 }}>
                        {fmt(l.at)}{i===0 && <span style={{ color:C.green, marginLeft:10 }}>← atual</span>}
                      </span>
                    </div>
                  ))
                }
              </div>
            </div>
          )}
        </div>
      </div>
      <style>{`.adm-inp:focus { border-color:${C.accent} !important; outline:none; }`}</style>
    </>
  )
}
