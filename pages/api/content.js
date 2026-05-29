import { getSupabase } from '../../lib/supabase'
import { DEFAULT_CONTENT } from '../../lib/store'

// v5 — secret hardcoded server-side, not in client bundle
const ADMIN_SECRET = 'marciocavjr@2026'

export default async function handler(req, res) {

  // ── TRACK VIEW (POST ?action=track) ─────────────────────────
  if (req.method === 'POST' && req.query.action === 'track') {
    const sb = getSupabase()
    const { page } = req.body || {}
    if (!page) return res.status(400).json({ error: 'missing page' })
    try {
      const { data: existing } = await sb
        .from('teckjr_views').select('*').eq('page', page).single()
      if (existing) {
        await sb.from('teckjr_views')
          .update({ count: existing.count + 1, last_seen: new Date().toISOString() })
          .eq('page', page)
      } else {
        await sb.from('teckjr_views')
          .insert({ page, count: 1, last_seen: new Date().toISOString() })
      }
    } catch {}
    return res.status(200).json({ ok: true })
  }

  // ── GET content ──────────────────────────────────────────────
  if (req.method === 'GET') {
    try {
      const sb = getSupabase()
      const { data, error } = await sb
        .from('teckjr_content').select('content').eq('id', 1).single()
      if (error || !data) return res.status(200).json(DEFAULT_CONTENT)
      return res.status(200).json(data.content)
    } catch {
      return res.status(200).json(DEFAULT_CONTENT)
    }
  }

  // ── POST — save content (admin only) ────────────────────────
  if (req.method === 'POST') {
    const secret = req.headers['x-admin-secret']
    if (secret !== ADMIN_SECRET) {
      return res.status(401).json({ error: 'Não autorizado' })
    }
    try {
      const sb = getSupabase()
      const { error } = await sb
        .from('teckjr_content')
        .upsert({ id: 1, content: req.body, updated_at: new Date().toISOString() })
      if (error) return res.status(500).json({ error: error.message })
      return res.status(200).json({ ok: true })
    } catch(e) {
      return res.status(500).json({ error: e.message })
    }
  }

  res.status(405).end()
}
