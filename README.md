# TeckJR — Guia de Deploy

Site construído com **Next.js 14** + **Supabase** (já configurado no código).

---

## Como funciona

```
Admin salva → POST /api/content → Supabase → GET /api/content → Todos os visitantes veem na hora
```

---

## Passo a passo

### 1. Criar as tabelas no Supabase

Acesse o painel do Supabase → **Table Editor** → crie as tabelas manualmente:

**Tabela `teckjr_content`:**
- `id` — int8, primary key, default: `1`
- `content` — jsonb, not null
- `updated_at` — timestamptz, default: `now()`

**Tabela `teckjr_views`:**
- `page` — text, primary key
- `count` — int8, default: `0`
- `last_seen` — timestamptz, default: `now()`

### 2. Configurar RLS (Row Level Security)

Para cada tabela, vá em **Authentication → Policies** e:
- Habilite **RLS**
- Adicione uma policy **"Enable read access for all users"** (SELECT para `anon`)
- Adicione uma policy **"Enable insert/update for all users"** (INSERT, UPDATE para `anon`)

> Isso é seguro porque as operações de escrita do admin passam pela API route server-side (`/api/content`), que valida a senha antes de gravar.

### 3. Subir no GitHub + Vercel

```bash
git init
git add .
git commit -m "feat: TeckJR"
git remote add origin https://github.com/SEU_USER/teckjr.git
git push -u origin main
```

Na Vercel: **Add New Project** → importe o repo → **Deploy** ✅

Não precisa configurar nenhuma variável de ambiente.

---

## Acesso admin

- URL: `https://teckjr.vercel.app/login`
- Usuário: `marciocavjr`
- Senha: `marciocavjr@2026`

---

## Dev local

```bash
npm install
npm run dev   # → http://localhost:3000
```
