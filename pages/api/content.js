import { createClient } from '@supabase/supabase-js'
import { DEFAULT_CONTENT } from '../../lib/store'

function getSupabase() {
  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_KEY   // server-only (not NEXT_PUBLIC_)
  if (!url || !key) return null
  return createClient(url, key)
}

export default async function handler(req, res) {
  // ── TRACK VIEW ──────────────────────────────────────────────
  if (req.method === 'POST' && req.query.action === 'track') {
    const sb = getSupabase()
    if (!sb) return res.status(200).json({ ok: true })
    const { page } = req.body || {}
    if (!page) return res.status(400).json({ error: 'missing page' })

    const { data: existing } = await sb
      .from('teckjr_views')
      .select('*')
      .eq('page', page)
      .single()

    if (existing) {
      await sb.from('teckjr_views')
        .update({ count: existing.count + 1, last_seen: new Date().toISOString() })
        .eq('page', page)
    } else {
      await sb.from('teckjr_views')
        .insert({ page, count: 1, last_seen: new Date().toISOString() })
    }
    return res.status(200).json({ ok: true })
  }

  // ── GET content ─────────────────────────────────────────────
  if (req.method === 'GET') {
    const sb = getSupabase()
    if (!sb) return res.status(200).json(DEFAULT_CONTENT)

    const { data, error } = await sb
      .from('teckjr_content')
      .select('content')
      .eq('id', 1)
      .single()

    if (error || !data) return res.status(200).json(DEFAULT_CONTENT)
    return res.status(200).json(data.content)
  }

  // ── POST — save content (admin only) ────────────────────────
  if (req.method === 'POST') {
    // Validate admin secret (server-side only env var)
    const secret = req.headers['x-admin-secret']
    if (!secret || secret !== process.env.ADMIN_SECRET) {
      return res.status(401).json({ error: 'Não autorizado' })
    }

    const sb = getSupabase()
    if (!sb) return res.status(503).json({ error: 'Banco de dados não configurado' })

    const { error } = await sb
      .from('teckjr_content')
      .upsert({ id: 1, content: req.body, updated_at: new Date().toISOString() })

    if (error) return res.status(500).json({ error: error.message })
    return res.status(200).json({ ok: true })
  }

  res.status(405).json({ error: 'Método não permitido' })
}
