import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

const ADMIN_USER = 'marciocavjr'
const ADMIN_PASS = 'marciocavjr@2026'

export function AuthProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(false)
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    try {
      const s = localStorage.getItem('teckjr_admin')
      if (s === 'true') setIsAdmin(true)
    } catch {}
    setChecked(true)
  }, [])

  function login(user, pass) {
    if (user === ADMIN_USER && pass === ADMIN_PASS) {
      setIsAdmin(true)
      localStorage.setItem('teckjr_admin', 'true')
      // record login
      const logs = JSON.parse(localStorage.getItem('teckjr_logins') || '[]')
      logs.unshift({ at: new Date().toISOString() })
      localStorage.setItem('teckjr_logins', JSON.stringify(logs.slice(0, 50)))
      return true
    }
    return false
  }

  function logout() {
    setIsAdmin(false)
    localStorage.removeItem('teckjr_admin')
  }

  return (
    <AuthContext.Provider value={{ isAdmin, login, logout, checked }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() { return useContext(AuthContext) }
