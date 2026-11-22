# AGENTS.md

Clone da página inicial do TabNews (lista de conteúdos "Relevantes" / "Recentes"), com dados mockados.

## Stack

- Next.js **16.2.12** (App Router, Turbopack), React 19, JavaScript (sem TypeScript)
- Estilos com CSS Modules + variáveis CSS em `app/globals.css` (tema claro/escuro via `data-theme` no `<html>`)
- Node **22** (`.nvmrc`; Next 16 exige Node >= 20.9)

## Comandos

```bash
nvm use        # garante o Node 22
npm run dev    # desenvolvimento
npm run build  # build de produção
npm start      # servir o build
```

## Estrutura

- `app/layout.js` — layout raiz, header e script que aplica o tema salvo
- `app/page.js` — Relevantes (`/`)
- `app/recentes/page.js` — Recentes (`/recentes`)
- `components/` — `Header`, `NavLinks` (client), `ThemeToggle` (client), `ContentList`
- `lib/contents.js` — camada de dados: `getContents({ strategy })` e `getSponsoredContent()`
- `lib/mock-contents.js` — dados mockados (datas relativas ao momento atual)
- `lib/format.js` — `timeAgo()` e `pluralize()` em pt-BR

## Convenções e decisões

- Os dados vêm **só** de `lib/contents.js`. A integração futura com API deve substituir o corpo dessas funções por `fetch`, sem alterar páginas/componentes.
- Os objetos seguem o formato da API do TabNews: `id`, `title`, `slug`, `owner_username`, `tabcoins`, `children_deep_count`, `published_at`.
- Textos da interface em português (pt-BR). Pluralização no estilo do TabNews: 0 e 1 no singular ("0 comentário").
- Páginas usam `dynamic = "force-dynamic"` para o "há X tempo" ser recalculado a cada requisição.
- Componentes são Server Components por padrão; `"use client"` apenas quando há interação/hook do navegador.
