import { createClient } from '@supabase/supabase-js'

// Anon key is intentionally public — safe to bundle in client code.
// Write operations are protected by Supabase Row Level Security (RLS)
// and by the server-side ADMIN_SECRET check in the API route.
const SUPABASE_URL = 'https://xppwogqqrigeizoltlyv.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhwcHdvZ3FxcmlnZWl6b2x0bHl2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk5OTI5ODksImV4cCI6MjA5NTU2ODk4OX0.Lz0IT5NLsfmt47r-cc_iTtOcS9LPPPe1HHuesO_Gjhg'

let _client = null
export function getSupabase() {
  if (!_client) _client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  return _client
}
