import { getSupabase } from '../../lib/supabase'

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end()
  try {
    const sb = getSupabase()
    const { data, error } = await sb.from('teckjr_views').select('*')
    if (error) return res.status(200).json({})
    const result = {}
    let total = 0, lastSeen = null
    for (const row of (data || [])) {
      result[row.page] = row.count
      total += row.count
      if (!lastSeen || row.last_seen > lastSeen) lastSeen = row.last_seen
    }
    result.__total = total
    result.__last  = lastSeen
    return res.status(200).json(result)
  } catch {
    return res.status(200).json({})
  }
}
