import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { useAuth } from '../context/AuthContext'
import { getContent, saveContent, resetContent, getViews, getLogins, DEFAULT_CONTENT } from '../lib/store'

/* ─── helpers ─────────────────────────── */
function uid() { return Math.random().toString(36).slice(2,9) }
function fmt(iso) {
  if (!iso) return '—'
  return new Date(iso).toLocaleString('pt-BR')
}

/* ─── small UI atoms ──────────────────── */
const card = { background:'#17171e', border:'1px solid #26263a', borderRadius:14, padding:'20px 24px' }
const inp  = { width:'100%', padding:'9px 13px', background:'#111118', border:'1px solid #26263a',
               borderRadius:8, color:'#eaeaf2', fontSize:'0.9rem', fontFamily:'Outfit,sans-serif', outline:'none' }
const btn  = (col='#00e5ff', text='#0b0b10') => ({
  padding:'8px 16px', background:col, color:text, border:'none',
  borderRadius:8, fontWeight:700, fontSize:'0.82rem',
  fontFamily:'Outfit,sans-serif', cursor:'pointer',
})
const ghost = { padding:'7px 14px', background:'transparent', color:'#8888a8',
                border:'1px solid #26263a', borderRadius:8, fontWeight:600,
                fontSize:'0.82rem', fontFamily:'Outfit,sans-serif', cursor:'pointer' }

/* ─── Stat card ────────────────────────── */
function Stat({ label, value, sub, color='#00e5ff' }) {
  return (
    <div style={{ ...card, display:'flex', flexDirection:'column', gap:6 }}>
      <div style={{ fontSize:'0.7rem', fontFamily:'DM Mono,monospace', letterSpacing:'0.1em', textTransform:'uppercase', color:'#44445a' }}>{label}</div>
      <div style={{ fontSize:'2rem', fontWeight:900, color, letterSpacing:'-0.03em', lineHeight:1 }}>{value}</div>
      {sub && <div style={{ fontSize:'0.75rem', color:'#44445a', fontFamily:'DM Mono,monospace' }}>{sub}</div>}
    </div>
  )
}

/* ─── Link editor row ──────────────────── */
function LinkRow({ link, onChange, onRemove }) {
  return (
    <div style={{ display:'flex', gap:8, marginBottom:6, flexWrap:'wrap' }}>
      <input value={link.label} onChange={e=>onChange({...link,label:e.target.value})}
        placeholder="Rótulo (ex: Link 1)" style={{ ...inp, width:130, flexShrink:0 }} />
      <input value={link.href} onChange={e=>onChange({...link,href:e.target.value})}
        placeholder="https://..." style={{ ...inp, flex:1, minWidth:180 }} />
      <button onClick={onRemove} style={{ ...btn('#ff4d6d'), padding:'8px 12px', flexShrink:0 }}>✕</button>
    </div>
  )
}

/* ─── Group editor ─────────────────────── */
function GroupEditor({ group, onChange, onRemove }) {
  const [open, setOpen] = useState(false)
  function updateLink(i, lnk) {
    const links = group.links.map((l,j)=>j===i?lnk:l)
    onChange({...group, links})
  }
  function addLink() { onChange({...group, links:[...group.links,{label:'Link',href:''}]}) }
  function removeLink(i) { onChange({...group, links:group.links.filter((_,j)=>j!==i)}) }

  return (
    <div style={{ background:'#111118', border:'1px solid #26263a', borderRadius:10, marginBottom:8, overflow:'hidden' }}>
      <div style={{ display:'flex', alignItems:'center', gap:10, padding:'10px 14px', cursor:'pointer' }} onClick={()=>setOpen(o=>!o)}>
        <span style={{ color:'#44445a', fontSize:'0.75rem' }}>{open?'▼':'▶'}</span>
        <input value={group.name} onChange={e=>{e.stopPropagation();onChange({...group,name:e.target.value})}}
          onClick={e=>e.stopPropagation()}
          style={{ ...inp, background:'transparent', border:'none', padding:'2px 0', fontWeight:600, flex:1 }} />
        <button onClick={e=>{e.stopPropagation();onRemove()}} style={{ ...btn('#ff4d6d','#fff'), padding:'5px 10px', fontSize:'0.75rem' }}>Remover</button>
      </div>
      {open && (
        <div style={{ padding:'0 14px 14px' }}>
          {group.links.map((l,i)=>(
            <LinkRow key={i} link={l} onChange={lnk=>updateLink(i,lnk)} onRemove={()=>removeLink(i)} />
          ))}
          <button onClick={addLink} style={{ ...ghost, fontSize:'0.78rem', marginTop:4 }}>+ Adicionar link</button>
        </div>
      )}
    </div>
  )
}

/* ─── Section editor ───────────────────── */
function SectionEditor({ section, onChange, onRemove }) {
  const [open, setOpen] = useState(false)
  function updateGroup(i, g) { onChange({...section, groups:section.groups.map((x,j)=>j===i?g:x)}) }
  function addGroup() { onChange({...section, groups:[...section.groups,{id:uid(), name:'Novo item', links:[{label:'Link',href:''}]}]}) }
  function removeGroup(i) { onChange({...section, groups:section.groups.filter((_,j)=>j!==i)}) }

  return (
    <div style={{ ...card, marginBottom:12 }}>
      <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom: open ? 16 : 0 }}>
        <button onClick={()=>setOpen(o=>!o)} style={{ ...ghost, padding:'5px 10px', fontSize:'0.75rem' }}>{open?'▲ Fechar':'▼ Expandir'}</button>
        <input value={section.title} onChange={e=>onChange({...section,title:e.target.value})}
          style={{ ...inp, fontWeight:700, fontSize:'0.95rem', flex:1 }} placeholder="Nome da categoria" />
        <button onClick={onRemove} style={{ ...btn('#ff4d6d','#fff'), padding:'7px 12px' }}>Remover categoria</button>
      </div>
      {open && (
        <div>
          {section.groups.map((g,i)=>(
            <GroupEditor key={g.id} group={g} onChange={gr=>updateGroup(i,gr)} onRemove={()=>removeGroup(i)} />
          ))}
          <button onClick={addGroup} style={{ ...btn('#26263a','#eaeaf2'), marginTop:8 }}>+ Novo item</button>
        </div>
      )}
    </div>
  )
}

/* ─── Page editor ──────────────────────── */
function PageEditor({ pageKey, page, onChange }) {
  function updateSection(i, s) { onChange({...page, sections:page.sections.map((x,j)=>j===i?s:x)}) }
  function addSection() {
    onChange({...page, sections:[...page.sections,{id:uid(), title:'Nova Categoria', groups:[]}]})
  }
  function removeSection(i) { onChange({...page, sections:page.sections.filter((_,j)=>j!==i)}) }

  return (
    <div>
      <div style={{ display:'flex', gap:10, marginBottom:20, flexWrap:'wrap' }}>
        <div style={{ flex:1 }}>
          <label style={{ fontSize:'0.7rem', fontFamily:'DM Mono,monospace', color:'#44445a', display:'block', marginBottom:5, textTransform:'uppercase', letterSpacing:'0.08em' }}>Ícone</label>
          <input value={page.icon} onChange={e=>onChange({...page,icon:e.target.value})}
            style={{ ...inp, width:80 }} />
        </div>
        <div style={{ flex:3 }}>
          <label style={{ fontSize:'0.7rem', fontFamily:'DM Mono,monospace', color:'#44445a', display:'block', marginBottom:5, textTransform:'uppercase', letterSpacing:'0.08em' }}>Descrição da página</label>
          <input value={page.desc} onChange={e=>onChange({...page,desc:e.target.value})}
            style={inp} />
        </div>
      </div>

      {page.sections.map((s,i)=>(
        <SectionEditor key={s.id} section={s}
          onChange={sec=>updateSection(i,sec)}
          onRemove={()=>removeSection(i)} />
      ))}

      <button onClick={addSection} style={{ ...btn('#7c5cbf'), marginTop:8 }}>+ Nova categoria</button>
    </div>
  )
}

/* ─── MAIN DASHBOARD ───────────────────── */
export default function Admin() {
  const { isAdmin, logout, checked } = useAuth()
  const router = useRouter()
  const [tab, setTab]         = useState('dashboard')
  const [content, setContent] = useState(null)
  const [views, setViews]     = useState({})
  const [logins, setLogins]   = useState([])
  const [saved, setSaved]     = useState(false)
  const [editPage, setEditPage] = useState('hardware')

  useEffect(() => {
    if (checked && !isAdmin) router.replace('/login')
  }, [isAdmin, checked])

  useEffect(() => {
    if (!isAdmin) return
    setContent(getContent())
    setViews(getViews())
    setLogins(getLogins())
  }, [isAdmin])

  function save() {
    saveContent(content)
    setSaved(true)
    setTimeout(()=>setSaved(false), 2000)
  }

  function doReset() {
    if (!confirm('Restaurar todo o conteúdo para o padrão original? Esta ação não pode ser desfeita.')) return
    resetContent()
    setContent(getContent())
  }

  function updatePage(key, page) {
    setContent(c => ({ ...c, pages: { ...c.pages, [key]: page } }))
  }

  if (!checked || !isAdmin || !content) {
    return (
      <>
        <Head><title>Admin — TeckJR</title>
          <link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Outfit:wght@400;500;600;700;800;900&display=swap" rel="stylesheet"/>
        </Head>
        <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'#0b0b10', color:'#44445a', fontFamily:'Outfit,sans-serif' }}>
          Carregando...
        </div>
      </>
    )
  }

  const totalViews = views.__total || 0
  const pageLabels = { hardware:'Hardware', software:'Software', promo:'Promo', fornecedor:'Fornecedor', home:'Home', qrcode:'QR Code' }

  const TAB = { fontSize:'0.85rem', fontWeight:600, padding:'9px 18px', borderRadius:8, border:'none', cursor:'pointer', fontFamily:'Outfit,sans-serif', transition:'background .2s, color .2s' }

  return (
    <>
      <Head>
        <title>Dashboard Admin — TeckJR</title>
        <meta name="viewport" content="width=device-width,initial-scale=1"/>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml"/>
        <link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Outfit:wght@400;500;600;700;800;900&display=swap" rel="stylesheet"/>
      </Head>

      <div style={{ minHeight:'100vh', background:'#0b0b10', color:'#eaeaf2', fontFamily:'Outfit,sans-serif' }}>

        {/* Top bar */}
        <div style={{ position:'sticky', top:0, zIndex:50, background:'rgba(11,11,16,0.95)', backdropFilter:'blur(14px)',
          borderBottom:'1px solid #26263a', padding:'0 24px', display:'flex', alignItems:'center', justifyContent:'space-between', height:60 }}>
          <div style={{ display:'flex', alignItems:'center', gap:16 }}>
            <span style={{ fontWeight:900, fontSize:'1.2rem', letterSpacing:'-0.03em' }}>
              <span style={{ color:'#00e5ff' }}>Teck</span>JR
              <span style={{ fontSize:'0.7rem', fontFamily:'DM Mono,monospace', color:'#44445a', marginLeft:8, letterSpacing:'0.1em', textTransform:'uppercase' }}>Admin</span>
            </span>
          </div>
          <div style={{ display:'flex', gap:8, alignItems:'center' }}>
            <span style={{ fontSize:'0.78rem', color:'#44445a', fontFamily:'DM Mono,monospace' }}>marciocavjr</span>
            <button onClick={()=>router.push('/')} style={{ ...ghost, padding:'6px 12px', fontSize:'0.78rem' }}>← Site</button>
            <button onClick={logout} style={{ ...btn('#ff4d6d','#fff'), padding:'6px 14px' }}>Sair</button>
          </div>
        </div>

        <div style={{ maxWidth:1100, margin:'0 auto', padding:'32px 24px' }}>

          {/* Tabs */}
          <div style={{ display:'flex', gap:6, marginBottom:32, flexWrap:'wrap' }}>
            {[['dashboard','📊 Dashboard'],['conteudo','✏️ Conteúdo'],['imagens','🖼️ Imagens & QR'],['logins','🔐 Acessos']].map(([key,label])=>(
              <button key={key} onClick={()=>setTab(key)} style={{
                ...TAB,
                background: tab===key ? '#00e5ff' : '#17171e',
                color: tab===key ? '#0b0b10' : '#8888a8',
                border: tab===key ? 'none' : '1px solid #26263a',
              }}>{label}</button>
            ))}
          </div>

          {/* ── DASHBOARD ── */}
          {tab==='dashboard' && (
            <div>
              <h1 style={{ fontSize:'1.8rem', fontWeight:900, letterSpacing:'-0.03em', marginBottom:6 }}>Bem-vindo, Marcio 👋</h1>
              <p style={{ color:'#8888a8', marginBottom:32, fontFamily:'DM Mono,monospace', fontSize:'0.82rem' }}>
                Último acesso: {fmt(logins[0]?.at)}
              </p>

              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))', gap:12, marginBottom:32 }}>
                <Stat label="Total de visualizações" value={totalViews} color="#00e5ff"/>
                <Stat label="Páginas no site" value={Object.keys(content.pages).length + 2} color="#7c5cbf"/>
                <Stat label="Seções de conteúdo" value={Object.values(content.pages).reduce((a,p)=>a+(p.sections?.length||0),0)} color="#ffd166"/>
                <Stat label="Links cadastrados"
                  value={Object.values(content.pages).reduce((a,p)=>a+(p.sections||[]).reduce((b,s)=>b+(s.groups||[]).reduce((c,g)=>c+(g.links||[]).length,0),0),0)}
                  color="#06d6a0"/>
                <Stat label="Logins registrados" value={logins.length} color="#ff4d6d"/>
                <Stat label="Última visita" value={views.__last ? fmt(views.__last).split(',')[1]?.trim() || '—' : '—'} color="#ff9f43" sub={views.__last ? fmt(views.__last).split(',')[0] : ''}/>
              </div>

              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
                <div style={card}>
                  <h3 style={{ fontWeight:700, marginBottom:16, fontSize:'0.95rem' }}>Visualizações por página</h3>
                  {Object.entries(pageLabels).map(([k,l])=>{
                    const v = views[k]||0; const max = Math.max(...Object.entries(pageLabels).map(([k2])=>views[k2]||0),1)
                    return (
                      <div key={k} style={{ marginBottom:10 }}>
                        <div style={{ display:'flex', justifyContent:'space-between', marginBottom:3 }}>
                          <span style={{ fontSize:'0.82rem', color:'#8888a8', fontFamily:'DM Mono,monospace' }}>{l}</span>
                          <span style={{ fontSize:'0.82rem', fontWeight:700, color:'#00e5ff' }}>{v}</span>
                        </div>
                        <div style={{ height:4, background:'#26263a', borderRadius:3 }}>
                          <div style={{ height:4, width:`${(v/max)*100}%`, background:'#00e5ff', borderRadius:3, transition:'width .5s ease' }}/>
                        </div>
                      </div>
                    )
                  })}
                </div>

                <div style={card}>
                  <h3 style={{ fontWeight:700, marginBottom:16, fontSize:'0.95rem' }}>Ações rápidas</h3>
                  <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                    <button onClick={()=>setTab('conteudo')} style={{ ...btn('#7c5cbf'), textAlign:'left', padding:'11px 16px' }}>✏️ Editar conteúdo das páginas</button>
                    <button onClick={()=>setTab('imagens')} style={{ ...btn('#00e5ff'), textAlign:'left', padding:'11px 16px' }}>🖼️ Atualizar imagem & QR Code</button>
                    <button onClick={()=>setTab('logins')} style={{ ...btn('#26263a','#eaeaf2'), textAlign:'left', padding:'11px 16px' }}>🔐 Ver histórico de acessos</button>
                    <button onClick={()=>router.push('/')} style={{ ...ghost, textAlign:'left', padding:'11px 16px' }}>← Voltar ao site</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── CONTEÚDO ── */}
          {tab==='conteudo' && (
            <div>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:12, marginBottom:28 }}>
                <h2 style={{ fontSize:'1.5rem', fontWeight:900, letterSpacing:'-0.03em' }}>Editar Conteúdo</h2>
                <div style={{ display:'flex', gap:8 }}>
                  <button onClick={doReset} style={{ ...ghost }}>Restaurar padrão</button>
                  <button onClick={save} style={{ ...btn(saved?'#06d6a0':'#00e5ff') }}>
                    {saved ? '✓ Salvo!' : 'Salvar alterações'}
                  </button>
                </div>
              </div>

              {/* Page tabs */}
              <div style={{ display:'flex', gap:6, marginBottom:24, flexWrap:'wrap' }}>
                {Object.entries(pageLabels).filter(([k])=>content.pages[k]).map(([k,l])=>(
                  <button key={k} onClick={()=>setEditPage(k)} style={{
                    ...TAB,
                    background: editPage===k ? '#17171e' : 'transparent',
                    color: editPage===k ? '#eaeaf2' : '#8888a8',
                    border: editPage===k ? '1px solid #00e5ff' : '1px solid #26263a',
                  }}>{l}</button>
                ))}
              </div>

              {content.pages[editPage] && (
                <PageEditor
                  key={editPage}
                  pageKey={editPage}
                  page={content.pages[editPage]}
                  onChange={p=>updatePage(editPage,p)}
                />
              )}

              <div style={{ marginTop:24, paddingTop:24, borderTop:'1px solid #26263a', display:'flex', gap:8 }}>
                <button onClick={doReset} style={{ ...ghost }}>Restaurar padrão</button>
                <button onClick={save} style={{ ...btn(saved?'#06d6a0':'#00e5ff') }}>
                  {saved ? '✓ Salvo!' : 'Salvar alterações'}
                </button>
              </div>
            </div>
          )}

          {/* ── IMAGENS & QR ── */}
          {tab==='imagens' && (
            <div>
              <h2 style={{ fontSize:'1.5rem', fontWeight:900, letterSpacing:'-0.03em', marginBottom:24 }}>Imagens & QR Code</h2>

              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20 }}>
                {/* Welcome image */}
                <div style={card}>
                  <h3 style={{ fontWeight:700, marginBottom:4 }}>Imagem de Boas-vindas</h3>
                  <p style={{ fontSize:'0.8rem', color:'#44445a', fontFamily:'DM Mono,monospace', marginBottom:16 }}>URL da imagem exibida na Home</p>
                  <input value={content.welcomeImage} onChange={e=>setContent(c=>({...c,welcomeImage:e.target.value}))}
                    style={{ ...inp, marginBottom:12 }} placeholder="https://..." />
                  {content.welcomeImage && (
                    <img src={content.welcomeImage} alt="preview" style={{ width:'100%', borderRadius:10, border:'1px solid #26263a', marginBottom:12 }}/>
                  )}
                  <button onClick={save} style={{ ...btn(saved?'#06d6a0':'#00e5ff') }}>{saved?'✓ Salvo!':'Salvar'}</button>
                </div>

                {/* QR URL */}
                <div style={card}>
                  <h3 style={{ fontWeight:700, marginBottom:4 }}>URL do QR Code</h3>
                  <p style={{ fontSize:'0.8rem', color:'#44445a', fontFamily:'DM Mono,monospace', marginBottom:16 }}>Link para onde o QR Code aponta</p>
                  <input value={content.qrUrl} onChange={e=>setContent(c=>({...c,qrUrl:e.target.value}))}
                    style={{ ...inp, marginBottom:12 }} placeholder="https://..." />
                  <div style={{ background:'#111118', borderRadius:10, padding:16, marginBottom:12, display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <img src="/qrcode.png" alt="QR Code" style={{ width:180, imageRendering:'pixelated', borderRadius:8 }}/>
                  </div>
                  <p style={{ fontSize:'0.72rem', color:'#44445a', fontFamily:'DM Mono,monospace', marginBottom:12 }}>
                    Para atualizar o QR Code com outra URL, substitua o arquivo <code style={{color:'#00e5ff'}}>public/qrcode.png</code> no projeto.
                  </p>
                  <button onClick={save} style={{ ...btn(saved?'#06d6a0':'#00e5ff') }}>{saved?'✓ Salvo!':'Salvar URL'}</button>
                </div>
              </div>
            </div>
          )}

          {/* ── LOGINS ── */}
          {tab==='logins' && (
            <div>
              <h2 style={{ fontSize:'1.5rem', fontWeight:900, letterSpacing:'-0.03em', marginBottom:8 }}>Histórico de Acessos</h2>
              <p style={{ color:'#44445a', fontFamily:'DM Mono,monospace', fontSize:'0.8rem', marginBottom:24 }}>
                Últimos {logins.length} logins registrados neste navegador
              </p>

              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))', gap:12, marginBottom:28 }}>
                <Stat label="Total de logins" value={logins.length} color="#ffd166"/>
                <Stat label="Visualizações totais" value={totalViews} color="#00e5ff"/>
                <Stat label="Última visita ao site" value={views.__last ? fmt(views.__last).split(' ')[1]||'—':'—'} sub={views.__last ? fmt(views.__last).split(' ')[0]||'':'—'} color="#7c5cbf"/>
              </div>

              <div style={card}>
                <h3 style={{ fontWeight:700, marginBottom:16, fontSize:'0.9rem' }}>Log de logins</h3>
                {logins.length === 0
                  ? <p style={{ color:'#44445a', fontFamily:'DM Mono,monospace', fontSize:'0.82rem' }}>Nenhum login registrado ainda.</p>
                  : logins.map((l,i)=>(
                    <div key={i} style={{ display:'flex', alignItems:'center', gap:12, padding:'9px 0', borderBottom:'1px solid #26263a' }}>
                      <span style={{ fontSize:'0.7rem', fontFamily:'DM Mono,monospace', color:'#44445a', width:20, textAlign:'right' }}>{i+1}</span>
                      <span style={{ fontSize:'0.82rem', fontFamily:'DM Mono,monospace', color: i===0?'#00e5ff':'#8888a8' }}>
                        {fmt(l.at)} {i===0 && <span style={{ color:'#06d6a0', marginLeft:8 }}>← atual</span>}
                      </span>
                    </div>
                  ))
                }
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  )
}
