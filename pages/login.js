import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { login, isAdmin, checked } = useAuth()
  const router = useRouter()
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [err, setErr]   = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (checked && isAdmin) router.replace('/admin')
  }, [isAdmin, checked])

  function handle(e) {
    e.preventDefault()
    setLoading(true)
    setErr('')
    setTimeout(() => {
      const ok = login(user.trim(), pass)
      if (ok) router.push('/admin')
      else { setErr('Usuário ou senha incorretos.'); setLoading(false) }
    }, 400)
  }

  const inp = {
    width:'100%', padding:'12px 16px',
    background:'var(--surface)', border:'1px solid var(--border)',
    borderRadius:'var(--r)', color:'var(--text)',
    fontSize:'1rem', fontFamily:'var(--font)',
    outline:'none', transition:'border-color var(--ease)',
  }

  return (
    <Layout title="Login" desc="Área admin TeckJR">
      <div style={{ minHeight:'calc(100vh - 64px)', display:'flex', alignItems:'center', justifyContent:'center', padding:'40px 24px' }}>
        <div style={{ width:'100%', maxWidth:380 }}>

          <div style={{ textAlign:'center', marginBottom:32 }}>
            <div style={{ fontWeight:900, fontSize:'1.8rem', letterSpacing:'-0.03em', marginBottom:6 }}>
              <span style={{ color:'var(--accent)' }}>Teck</span>JR
            </div>
            <p style={{ color:'var(--text2)', fontFamily:'var(--mono)', fontSize:'0.8rem' }}>Área administrativa</p>
          </div>

          <form onSubmit={handle} style={{ display:'flex', flexDirection:'column', gap:14 }}>
            <div>
              <label style={{ display:'block', fontSize:'0.78rem', fontFamily:'var(--mono)', color:'var(--text3)', marginBottom:6, letterSpacing:'0.06em', textTransform:'uppercase' }}>Usuário</label>
              <input value={user} onChange={e=>setUser(e.target.value)} placeholder="marciocavjr"
                style={inp} className="inp" autoComplete="username" required />
            </div>
            <div>
              <label style={{ display:'block', fontSize:'0.78rem', fontFamily:'var(--mono)', color:'var(--text3)', marginBottom:6, letterSpacing:'0.06em', textTransform:'uppercase' }}>Senha</label>
              <input type="password" value={pass} onChange={e=>setPass(e.target.value)} placeholder="••••••••••••"
                style={inp} className="inp" autoComplete="current-password" required />
            </div>

            {err && <p style={{ color:'var(--red)', fontSize:'0.85rem', fontFamily:'var(--mono)', textAlign:'center' }}>{err}</p>}

            <button type="submit" disabled={loading} style={{
              padding:'13px', background:'var(--accent)', color:'var(--bg)',
              border:'none', borderRadius:'var(--r)', fontWeight:800,
              fontSize:'0.95rem', fontFamily:'var(--font)', cursor:'pointer',
              marginTop:4, opacity: loading ? 0.7 : 1, transition:'opacity var(--ease)',
            }}>
              {loading ? 'Entrando…' : 'Entrar'}
            </button>
          </form>

          <style>{`.inp:focus { border-color:var(--accent) !important; outline:none; }`}</style>
        </div>
      </div>
    </Layout>
  )
}
