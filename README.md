# TeckJR

Blog de tecnologia reconstruído com **Next.js 14**, design moderno dark-tech, totalmente responsivo.

## Rodar localmente

```bash
npm install
npm run dev
# → http://localhost:3000
```

## Páginas

| Rota           | Conteúdo                              |
|----------------|---------------------------------------|
| `/`            | Home (Bem-vindo)                      |
| `/hardware`    | Links das aulas de hardware           |
| `/software`    | Links das aulas de software           |
| `/promo`       | Promoções Shopee                      |
| `/fornecedor`  | Contatos dos fornecedores             |

## Deploy no GitHub + Vercel

```bash
# 1. Push para o GitHub
git init
git add .
git commit -m "feat: TeckJR modernizado"
git remote add origin https://github.com/SEU_USER/teckjr.git
git push -u origin main

# 2. Acesse vercel.com → New Project → importe o repositório → Deploy ✅
```
