# 🏆 Awards Ballot

Vote nos indicados do **Oscar**, **Grammy** e **Golden Globes**, escolha um vencedor por
categoria e baixe o seu bolão preenchido em PNG.

[![Acessar Projeto](https://img.shields.io/badge/Acessar%20Projeto-Vercel-black?style=for-the-badge&logo=vercel)](https://awards-ballot-seven.vercel.app)

Next.js 15 · React 19 · Tailwind v4 · Framer Motion · Supabase



## Rodando

```bash
npm install
npm run dev
```

Abra `http://localhost:3000`. Sem nenhuma configuração o site já funciona com os
indicados de `src/data`.

## Banco de dados (opcional)

Para cadastrar os indicados pelo painel em vez de editar o código:

1. Crie um projeto no [Supabase](https://supabase.com) e rode
   [`supabase/schema.sql`](supabase/schema.sql) no SQL Editor.
2. Copie `.env.example` para `.env.local` e preencha `SUPABASE_URL`,
   `SUPABASE_SERVICE_ROLE_KEY` e `ADMIN_PASSWORD`.
3. Reinicie o servidor, acesse `/admin` e salve.

---

<sub>Coded by Eduarda Saleth, Julia Mattos e João Franco</sub>
