# TeckJR — Guia de Deploy

Site construído com **Next.js 14** + **Supabase** como banco de dados.  
Alterações feitas no admin em **qualquer dispositivo** ficam disponíveis para todos os visitantes instantaneamente.

---

## Como funciona a persistência

```
Admin salva → POST /api/content → Supabase → GET /api/content → Todos os visitantes
```

Sem Supabase configurado, o site funciona normalmente com o conteúdo padrão (somente leitura).

---

## Passo a passo completo

### 1. Criar o projeto no Supabase (gratuito)

1. Acesse **[supabase.com](https://supabase.com)** → **Start for free**
2. Crie um novo projeto (escolha a região **South America (São Paulo)**)
3. Aguarde o projeto iniciar (~1 min)

### 2. Criar as tabelas no Supabase

No painel do Supabase, clique em **SQL Editor** → **New query** e cole:

```sql
-- Tabela de conteúdo do site (1 linha, sempre id=1)
create table if not exists teckjr_content (
  id          integer primary key default 1,
  content     jsonb not null,
  updated_at  timestamptz default now()
);

-- Garante que só existe 1 linha
create unique index if not exists teckjr_content_one_row on teckjr_content ((id = 1));

-- Tabela de visualizações por página
create table if not exists teckjr_views (
  page       text primary key,
  count      integer default 0,
  last_seen  timestamptz default now()
);
```

Clique em **Run**.

### 3. Pegar as chaves do Supabase

No painel do projeto:  
**Settings → API**

Copie:
- **Project URL** → `SUPABASE_URL`
- **service_role** (secret) → `SUPABASE_SERVICE_KEY`  
  ⚠️ Use a `service_role`, **não** a `anon` — ela permite escrita no banco

### 4. Subir no GitHub

```bash
cd teckjr
git init
git add .
git commit -m "feat: TeckJR com Supabase"
git remote add origin https://github.com/SEU_USER/teckjr.git
git push -u origin main
```

### 5. Deploy na Vercel

1. Acesse **[vercel.com](https://vercel.com)** → **Add New Project**
2. Importe o repositório do GitHub
3. Em **Environment Variables**, adicione as 3 variáveis:

| Nome | Valor |
|------|-------|
| `SUPABASE_URL` | `https://XXXX.supabase.co` |
| `SUPABASE_SERVICE_KEY` | `eyJhbGciOi...` (service_role) |
| `ADMIN_SECRET` | Uma senha forte qualquer, ex: `teckjr@2026!` |

4. Clique em **Deploy** ✅

### 6. Pronto!

- Site público: `https://teckjr.vercel.app`
- Admin: `https://teckjr.vercel.app/login`
  - Usuário: `marciocavjr`
  - Senha: `marciocavjr@2026`

---

## Fluxo de edição

1. Acesse `/login` de qualquer dispositivo
2. Edite no Dashboard → **Salvar e Publicar**
3. Em ~1 segundo, todos os visitantes veem as mudanças

---

## Desenvolvimento local

```bash
# Copie o .env.example e preencha com suas chaves
cp .env.example .env.local

npm install
npm run dev
# → http://localhost:3000
```

---

## Estrutura

```
pages/
  api/
    content.js    ← GET (lê Supabase) / POST (salva, requer ADMIN_SECRET)
    views.js      ← GET contagem de visualizações
  index.js        ← Home
  hardware.js     ← Carrega conteúdo da API
  software.js
  promo.js
  fornecedor.js
  qrcode.js
  login.js
  admin.js        ← Dashboard (protegido)

lib/
  store.js        ← getContent() / saveContent() — abstração da API

context/
  AuthContext.js  ← Login/logout (estado no browser)
```
