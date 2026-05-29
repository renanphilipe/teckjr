// ─────────────────────────────────────────────────────────────
//  TeckJR Content Store
//  Reads from  : GET  /api/content  (Supabase)
//  Writes to   : POST /api/content  (Supabase, admin only)
//  Local cache : localStorage (so pages load instantly on repeat visits)
// ─────────────────────────────────────────────────────────────

const CACHE_KEY = 'teckjr_content_cache'

// ── Default content (fallback when API is unavailable) ────────
export const DEFAULT_CONTENT = {
  welcomeImage: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgKo60pNyouIJLJ69CWLPEZvysJJVevniWgDXQMcX-dfOSlpW-yS9pALd7syrSemtId04junoXJ11hmixl79Tdno7CPdaWFo6SuZlW0g5AXBGqP1Gmsvfht5dEARbkBUK9JA0dWkDYRo7V9LhYKy86_j4uYpvHmDorDhkKXnuN6d3dV_k51fL_HdQF-Fh0/s1350/Bem%20Vindos.png',
  qrUrl: 'https://teckjr.vercel.app/',
  pages: {
    hardware: {
      title: 'Hardware', icon: '🖥️', desc: 'Links das aulas e materiais de estudo sobre hardware.', color: 'var(--accent)',
      sections: [
        { id:'s1', title:'Links das aulas', groups:[
          {id:'g1',  name:'Montando sua Bancada',                    links:[{label:'Link',   href:'https://docs.google.com/presentation/d/1s9GqSGNHGLCrK91YaBRS6qN-Bd27RFYiBrBWaGN7EHU/edit?usp=sharing'}]},
          {id:'g2',  name:'Vendo o celular',                         links:[{label:'Link',   href:'https://drive.google.com/file/d/196nQorRYw2hkAW9SpiWiXNODEdTM4p-T/view?usp=sharing'}]},
          {id:'g3',  name:'Especificações dos dispositivos',         links:[{label:'Link',   href:'https://drive.google.com/drive/folders/1inWQAHJzs3AbLOO4JIgcCcj4I1Sad_AA?usp=sharing'}]},
          {id:'g4',  name:'Processamento e memória',                 links:[{label:'Link',   href:'https://drive.google.com/drive/folders/1Mqag12zYUBglTQCabyzomQzYO_7J_Gln?usp=sharing'}]},
          {id:'g5',  name:'Tensão e Corrente - Volt e Ampere',       links:[{label:'Link',   href:'https://docs.google.com/presentation/d/1dybXi7qLZghlO38yU6NHHjJjjdrAthW0wFqAmthEChI/edit?usp=sharing'}]},
          {id:'g6',  name:'Bateria',                                  links:[{label:'Link',   href:'https://drive.google.com/file/d/1qu_etXvBD6_wg5pHzO4W77CO8a3pjsbR/view?usp=sharing'}]},
          {id:'g7',  name:'Multimetro',                               links:[{label:'Link',   href:'https://drive.google.com/drive/u/1/folders/1PRn-ZTLdyFujh5aivV5Mc7QjrhE3Z5BY'}]},
          {id:'g8',  name:'Fonte de bancada',                         links:[{label:'Link',   href:'https://docs.google.com/document/d/1EaBREwP0zsjblVMD8z5kyeLCSyRKy17k8-sDG4womp0/edit?usp=sharing'}]},
          {id:'g9',  name:'Voltimetro e amperimetro USB',             links:[{label:'Link',   href:'https://docs.google.com/document/d/1fKo9FSiZAY4pDKUSnLjyyhY36CnVBYsPayF6yVG9C6A/edit?usp=sharing'}]},
          {id:'g10', name:'Componentes',                              links:[{label:'Link 1', href:'https://drive.google.com/drive/folders/1e05ao-UtJpuXAIp015fGY7QU7VBNufg9?usp=sharing'},{label:'Link 2',href:'https://drive.google.com/file/d/1KBzUBZwNeCI0alIqfiui8NQe36FRxrlW/view?usp=sharing'}]},
          {id:'g11', name:'Circuito Integrado',                       links:[{label:'Link 1', href:'https://docs.google.com/presentation/d/1ur4UvMJf248BdGzP4yuiCF-VsNc5jkytwe4DvXd6Vr4/edit?usp=sharing'},{label:'Link 2',href:'https://docs.google.com/document/d/1sfJm-u1tubJgKcbSRlEgmOnPmy03aYfpi9l78mj3uc4/edit?usp=sharing'}]},
          {id:'g12', name:'Tipos de displays',                        links:[{label:'Link',   href:'https://docs.google.com/presentation/d/1SXrz9m5TwobLQdq7KVmXGrc39HeFK7iASpt_gMXHn6A/edit?usp=sharing'}]},
        ]},
        { id:'s2', title:'Vídeos e canais de YouTube', groups:[
          {id:'g13', name:'GCFAprendeLivre — Hardware e software',                      links:[{label:'Link',   href:'https://www.youtube.com/watch?v=G0lMlqWuPJI'}]},
          {id:'g14', name:'Manual do mundo — Volt, Ampere e Watts / Multimetro',        links:[{label:'Link 1', href:'https://www.youtube.com/watch?v=JtttnL28m3Q&t=31s'},{label:'Link 2',href:'https://www.youtube.com/watch?v=1WIWrmc-rBk&t=4s'}]},
          {id:'g15', name:'Nice cell — Curso de manual de serviço',                     links:[{label:'Link',   href:'https://www.youtube.com/watch?v=RUpbOXMBtew&list=PLMHQm7nrbmqAnPYC1l3iz0FtUPGRsbbIJ'}]},
          {id:'g16', name:'MobalTech — Diferenças display de LCD e LED',                links:[{label:'Link',   href:'https://www.youtube.com/watch?v=MxOMgO5p7e8&t=200s'}]},
          {id:'g17', name:'Canaltech — Diferença de Oled e Amoled',                     links:[{label:'Link',   href:'https://www.youtube.com/watch?v=H3rjmvPZg9Y&t=1s'}]},
          {id:'g18', name:'Edy CompCel — Como trocar só o vidro do display',            links:[{label:'Link',   href:'https://www.youtube.com/watch?v=RigPRgg64r4'}]},
          {id:'g19', name:'Edy CompCel — Como trocar só a pelicula polarizadora',       links:[{label:'Link',   href:'https://www.youtube.com/watch?v=jvzcq81yExM'}]},
        ]},
      ],
    },
    software: {
      title: 'Software', icon: '💾', desc: 'Materiais, ferramentas e aulas sobre software.', color: 'var(--purple)',
      sections: [
        { id:'sw1', title:'Materiais', groups:[
          {id:'sw_g1', name:'Evolução das redes móveis',                            links:[{label:'Link',href:'https://docs.google.com/document/d/1sJx6gaycHBKRUU2icHTYGXaI9PI6rD3orm9RnQzIG2E/edit?usp=sharing'}]},
          {id:'sw_g2', name:'Sistemas Operacionais',                                links:[{label:'Link',href:'https://docs.google.com/presentation/d/1XNXARxqoIlMB6AkH4jbCyGTuiumuJIKdHbqeu5NYISw/edit?usp=sharing'}]},
          {id:'sw_g3', name:'Básico de Windows para software',                      links:[{label:'Link',href:'https://docs.google.com/document/d/1nxGIBWHBJf48VcgHPTV7LZ8-I2xi-TN58H1t7yilQxw/edit?usp=sharing'}]},
          {id:'sw_g4', name:'Empreendedorismo e documentos para assistência técnica',links:[{label:'Link',href:'https://docs.google.com/document/d/15zD-Wm0DLiKq8n4S5McdI5nySidOlZIz_jwfkuCkoBo/edit?usp=sharing'}]},
          {id:'sw_g5', name:'Modelo de recibo de compra de celular usado',          links:[{label:'Link',href:'https://docs.google.com/document/d/1xbHPpzXcf-K7MpSyEiJ7lei1b6AyPrbbqKDCH0ISNOQ/edit?usp=sharing'}]},
          {id:'sw_g6', name:'Ordem de serviço',                                     links:[{label:'Link',href:'https://docs.google.com/document/d/1PHngT3xSXQWFK7RBHhz2Hs-O9ZVYHejA/edit?usp=sharing&ouid=105572245658331748401&rtpof=true&sd=true'}]},
          {id:'sw_g7', name:'Padronização 5s',                                      links:[{label:'Link',href:'https://docs.google.com/presentation/d/1HxAyhjMsWhjS8EBEt_Ch4iUNbc5p5yzkEVebpcaJTrw/edit?usp=sharing'}]},
          {id:'sw_g8', name:'Hard reset e atualização de software',                 links:[{label:'Link 1',href:'https://drive.google.com/drive/folders/1zDe3w9ZEVl5NTzaqav0STbT1W8avjHPP?usp=sharing'},{label:'Link 2',href:'https://docs.google.com/presentation/d/1RsvcFJWWlXzada-OKIAEJwSgMiI3Y8Am_ivl-VDPSMU/edit?usp=sharing'}]},
        ]},
        { id:'sw2', title:'Samsung — Odin', groups:[
          {id:'sw_g9',  name:'Material da aula',    links:[{label:'Link',href:'https://docs.google.com/presentation/d/17CZYk-Ce_4pO9E_l3o69z4BiNSE2s7l2Sfls3UMSa4w/edit?usp=sharing'}]},
          {id:'sw_g10', name:'Driver USB (Samsung)',links:[{label:'Link',href:'https://developer.samsung.com/android-usb-driver'}]},
          {id:'sw_g11', name:'Odin',                links:[{label:'Link',href:'https://www.stockrom.net/2016/12/programas-para-flash-instalacao-de.html'}]},
          {id:'sw_g12', name:'ROMs (Samsung)',       links:[{label:'Link',href:'https://www.stockrom.net/samsung'}]},
        ]},
        { id:'sw3', title:'Motorola', groups:[
          {id:'sw_g13', name:'Motorola — Software Fix', links:[{label:'Link',href:'https://pt-br.support.motorola.com/app/answers/detail/a_id/165308'}]},
        ]},
        { id:'sw4', title:'iPhone', groups:[
          {id:'sw_g14', name:'iPhone — iTunes',  links:[{label:'Loja Microsoft',href:'https://www.apple.com/br/itunes/'},{label:'Instalador',href:'https://support.apple.com/pt-br/106379'}]},
          {id:'sw_g15', name:'iPhone — 3Utools', links:[{label:'Link',href:'https://3utools.info/download/'}]},
        ]},
        { id:'sw5', title:'Outros', groups:[
          {id:'sw_g16', name:'App desbloqueio Samsung', links:[{label:'Link',href:'https://drive.google.com/file/d/1_eb2rFc8yiPmzBljJaMZ3sRR6OSnVmtV/view?usp=sharing'}]},
        ]},
        { id:'sw6', title:'Vídeos e canais indicados no YouTube', groups:[
          {id:'sw_g17', name:'GCFAprendeLivre — Hardware e software',                    links:[{label:'Link',   href:'https://www.youtube.com/watch?v=G0lMlqWuPJI'}]},
          {id:'sw_g18', name:'Lesics português — Como funciona o seu celular?',          links:[{label:'Link',   href:'https://www.youtube.com/watch?v=7kBTz_ANgsk'}]},
          {id:'sw_g19', name:'Canal do raposo — Desbloqueio',                            links:[{label:'Link',   href:'https://www.youtube.com/@RaposoInfocellJH'}]},
          {id:'sw_g20', name:'Willians Celulares — Binary Samsung / Atualização via ODIN',links:[{label:'Link 1',href:'https://www.youtube.com/watch?v=tTqGqeGDDq8'},{label:'Link 2',href:'https://www.youtube.com/watch?v=O2cZzrhTrag'}]},
          {id:'sw_g21', name:'Willians Celulares — Modo recovery iPhone do 8 ao 16',     links:[{label:'Link',   href:'https://www.youtube.com/watch?v=AbJYuj5n2RA&t=124s'}]},
          {id:'sw_g22', name:'Telecélula Academy — Modo recovery iPhone 7',              links:[{label:'Link',   href:'https://www.youtube.com/watch?v=MlkR5zYsWaA'}]},
        ]},
      ],
    },
    promo: {
      title: 'Promoções Shopee', icon: '🏷️', desc: 'Se algum link não estiver funcionando, mande mensagem no WhatsApp: 81-99696-9395', color: 'var(--red)',
      sections: [
        { id:'pr1', title:'Ferramentas', groups:[
          {id:'pr_g1', name:'Jogo de chave — Simples',      links:[{label:'Link',href:'https://s.shopee.com.br/BJl8w3TFa'}]},
          {id:'pr_g2', name:'Jogo de chave — Completo',     links:[{label:'Link',href:'https://s.shopee.com.br/5py7tRRj2Z'}]},
          {id:'pr_g3', name:'Manta',                        links:[{label:'Link',href:'https://s.shopee.com.br/LdBLQBamc'}]},
          {id:'pr_g4', name:'Espátula — Abertura',          links:[{label:'Link',href:'https://s.shopee.com.br/AKQXGgM6a3'}]},
          {id:'pr_g5', name:'Espátula — Display e traseira',links:[{label:'Link',href:'https://s.shopee.com.br/5L1rJY3mBn'}]},
          {id:'pr_g6', name:'Pinça',                        links:[{label:'Link',href:'https://s.shopee.com.br/8AM2gsgxWL'}]},
        ]},
        { id:'pr2', title:'Teste Elétrico', groups:[
          {id:'pr_g7',  name:'USB Tester — Voltímetro e Amperímetro USB', links:[{label:'Link',href:'https://s.shopee.com.br/2VhfwZrSEj'}]},
          {id:'pr_g8',  name:'Multimetro Hikari',                          links:[{label:'Link',href:'https://s.shopee.com.br/9pUGgCYYCf'}]},
          {id:'pr_g9',  name:'Fonte de bancada — 15V 2A',                  links:[{label:'Link',href:'https://s.shopee.com.br/9pUGgNLrG2'}]},
          {id:'pr_g10', name:'Fonte de bancada — 30V 5A',                  links:[{label:'Link',href:'https://s.shopee.com.br/AKQXHLN8sO'}]},
        ]},
        { id:'pr3', title:'Equipamentos de Bancada', groups:[
          {id:'pr_g11', name:'Separadora de display',             links:[{label:'Link',href:'https://s.shopee.com.br/6KuOW2AD4E'}]},
          {id:'pr_g12', name:'Suporte de separação de tela',      links:[{label:'Link',href:'https://s.shopee.com.br/7ATVVe9y28'}]},
          {id:'pr_g13', name:'Dispenser álcool isopropílico',     links:[{label:'Link',href:'https://s.shopee.com.br/5fehiyrFuP'}]},
          {id:'pr_g14', name:'Removedora de cola — Micro retífica',links:[{label:'Link',href:'https://s.shopee.com.br/9AEZtTGJhQ'}]},
          {id:'pr_g15', name:'Microscópio digital',                links:[{label:'Link',href:'https://s.shopee.com.br/1g8YxqNEMW'}]},
        ]},
        { id:'pr4', title:'Solda', groups:[
          {id:'pr_g16', name:'Estação de solda — Ya-xun', links:[{label:'Link',href:'https://s.shopee.com.br/gG1m5kSyh'}]},
          {id:'pr_g17', name:'Suporte de placa',           links:[{label:'Link',href:'https://s.shopee.com.br/5VLHXpG0SS'}]},
          {id:'pr_g18', name:'Solda — Pequena',            links:[{label:'Link',href:'https://s.shopee.com.br/5py7vrB89V'}]},
          {id:'pr_g19', name:'Solda — Grande',             links:[{label:'Link',href:'https://s.shopee.com.br/BJlBUVUWH'}]},
          {id:'pr_g20', name:'Pasta de solda',             links:[{label:'Link',href:'https://s.shopee.com.br/1LViZfzRJy'}]},
          {id:'pr_g21', name:'Pasta de solda (2)',          links:[{label:'Link',href:'https://s.shopee.com.br/8fIJJDjehq'}]},
        ]},
        { id:'pr5', title:'Adesivos e Organização', groups:[
          {id:'pr_g22', name:'Fita Kapton e térmica',                    links:[{label:'Link',href:'https://s.shopee.com.br/3VaD9lkVvM'}]},
          {id:'pr_g23', name:'Fita dupla face',                          links:[{label:'Link',href:'https://s.shopee.com.br/50P0wfWlhG'}]},
          {id:'pr_g24', name:'Kit cola preta e transparente',            links:[{label:'Link',href:'https://s.shopee.com.br/gG1mkPVLP'}]},
          {id:'pr_g25', name:'Organizador de bancada',                   links:[{label:'Link',href:'https://s.shopee.com.br/AA776HjTA2'}]},
          {id:'pr_g26', name:'Suporte de celulares para organizar bancada',links:[{label:'Link',href:'https://s.shopee.com.br/5L1rLQf3ym'}]},
        ]},
        { id:'pr6', title:'Iluminação', groups:[
          {id:'pr_g27', name:'Luminária com lupa',  links:[{label:'Link',href:'https://s.shopee.com.br/7pjCKBEJ7H'}]},
          {id:'pr_g28', name:'Luminária sem lupa',  links:[{label:'Link',href:'https://s.shopee.com.br/8fIJJmqxxJ'}]},
        ]},
      ],
    },
    fornecedor: {
      title: 'Fornecedor', icon: '🔗', desc: 'Contatos dos fornecedores de peças e serviços.', color: 'var(--yellow)',
      sections: [
        { id:'fo1', title:'Contatos dos fornecedores', groups:[
          {id:'fo_g1', name:'Bigcell',          phone:'996178483',  links:[{label:'WhatsApp',href:'https://wa.me/5581996178483'}]},
          {id:'fo_g2', name:'Atacadãocell',     phone:'982723134',  links:[{label:'WhatsApp',href:'https://wa.me/5581982723134'}]},
          {id:'fo_g3', name:'Romilsoncell',     phone:'996888880',  links:[{label:'WhatsApp',href:'https://wa.me/5581996888880'}]},
          {id:'fo_g4', name:'Papaléguas',       phone:'986416147',  links:[{label:'WhatsApp',href:'https://wa.me/5581986416147'}]},
          {id:'fo_g5', name:'Zion / Seventec',  phone:'992968630',  links:[{label:'WhatsApp',href:'https://wa.me/5581992968630'}]},
          {id:'fo_g6', name:'Inoox',            phone:'989577102',  links:[{label:'WhatsApp',href:'https://wa.me/5581989577102'}]},
          {id:'fo_g7', name:'Paulistacell',     phone:'30103312',   links:[{label:'WhatsApp',href:'https://wa.me/558130103312'}]},
          {id:'fo_g8', name:'Mega Cell',                            links:[{label:'WhatsApp: 81-98510-3689',href:'https://wa.me/5581985103689'},{label:'Tel: 81-3224-2778',href:'tel:8132242778'}]},
          {id:'fo_g9', name:'Multi Peças',                          links:[{label:'WhatsApp: 81-98861-6979',href:'https://wa.me/5581988616979'},{label:'Tel: 81-3788-1068',href:'tel:8137881068'}]},
        ]},
        { id:'fo2', title:'Recuperação de tela', groups:[
          {id:'fo_g10', name:'Redphone',          phone:'81983549503', links:[{label:'WhatsApp',href:'https://wa.me/5581983549503'}]},
          {id:'fo_g11', name:'Rodrigo Seventec',  phone:'81986220055', links:[{label:'WhatsApp',href:'https://wa.me/5581986220055'}]},
        ]},
        { id:'fo3', title:'Desbloqueio', groups:[
          {id:'fo_g12', name:'Rennere', phone:'988333242', links:[{label:'WhatsApp',href:'https://wa.me/5581988333242'}]},
        ]},
      ],
    },
  },
}

// ── Helpers ───────────────────────────────────────────────────

function localGet() {
  try { const r = localStorage.getItem(CACHE_KEY); return r ? JSON.parse(r) : null } catch { return null }
}
function localSet(data) {
  try { localStorage.setItem(CACHE_KEY, JSON.stringify(data)) } catch {}
}

// ── Public API ────────────────────────────────────────────────

/**
 * Fetch content: tries API first, falls back to local cache, then defaults.
 * Also updates local cache after a successful API fetch.
 */
export async function getContent() {
  // 1. Serve from cache instantly (non-blocking)
  // 2. Fetch fresh from API in background and update
  try {
    const res = await fetch('/api/content', { cache: 'no-store' })
    if (res.ok) {
      const data = await res.json()
      localSet(data)
      return data
    }
  } catch {}
  // fallback: local cache or defaults
  return localGet() || DEFAULT_CONTENT
}

/**
 * Save content to API (admin only).
 * Admin secret matches api/content.js (hardcoded, no env vars on Vercel free plan).
 */
export async function saveContent(data) {
  const res = await fetch('/api/content', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-admin-secret': 'marciocavjr@2026',
    },
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error || `HTTP ${res.status}`)
  }
  localSet(data)    // update local cache immediately
  return true
}

export async function resetContent() {
  return saveContent(DEFAULT_CONTENT)
}

// Fire-and-forget page view tracking
export function trackView(page) {
  if (typeof window === 'undefined') return
  fetch('/api/content?action=track', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ page }),
  }).catch(() => {})
}

// Fetch view counts for dashboard
export async function fetchViews() {
  try {
    const res = await fetch('/api/views')
    return res.ok ? res.json() : {}
  } catch { return {} }
}

// Login history (local-only — irrelevant to replicate across users)
export function getLogins() {
  if (typeof window === 'undefined') return []
  try { return JSON.parse(localStorage.getItem('teckjr_logins') || '[]') } catch { return [] }
}
