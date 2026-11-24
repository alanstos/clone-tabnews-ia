# AGENTS.md

Clone da página inicial do TabNews (lista de conteúdos "Relevantes" / "Recentes"), com dados mockados.

## Stack

- Next.js **16.2.12** (App Router, Turbopack), React 19, JavaScript (sem TypeScript)
- Estilos com CSS Modules + variáveis CSS em `app/globals.css` (tema claro/escuro via `data-theme` no `<html>`)
- Node **22** (`.nvmrc`; Next 16 exige Node >= 20.9)
- ESLint 9 (flat config, `eslint-config-next/core-web-vitals`) + Prettier 3 — detalhes em "Lint e formatação"

## Comandos

```bash
nvm use        # garante o Node 22
npm run dev    # desenvolvimento
npm run build  # build de produção
npm start      # servir o build
npm run lint          # ESLint (só verifica)
npm run lint:fix      # ESLint corrigindo o que for automático
npm run format        # Prettier formata todos os arquivos
npm run format:check  # Prettier só verifica
```

`npm run build` roda `lint` e `format:check` antes do `next build` e **falha** se houver erro de ESLint ou arquivo fora do padrão do Prettier. Antes de concluir uma alteração, rode `npm run format` e `npm run lint`.

## Estrutura

- `app/layout.js` — layout raiz, header e script que aplica o tema salvo
- `app/page.js` — Relevantes (`/`)
- `app/recentes/page.js` — Recentes (`/recentes`)
- `app/[username]/page.js` — conteúdos de um autor (`/devcuriosa`); 404 se não houver
- `app/[username]/[slug]/page.js` — página de um conteúdo (`/devcuriosa/conteudo-1`); 404 se não existir
- `app/icon.svg` — favicon
- `components/` — `Header`, `NavLinks` (client), `ThemeToggle` (client), `ContentList`, `Footer`, `ConfettiOnLoad` (client, `react-confetti`)
- `lib/contents.js` — camada de dados: `getContents({ strategy })`, `getContentsByUser(username)`, `getContent(username, slug)` e `getSponsoredContent()`
- `lib/mock-contents.js` — dados mockados (datas relativas ao momento atual)
- `lib/tabnews.js` — `getTotalPublishedContents()`: lê da API pública do TabNews real o total de publicações (cabeçalho `x-pagination-total-rows`)
- `eslint.config.mjs` — config do ESLint (flat config)
- `.prettierrc.json` / `.prettierignore` — config do Prettier (padrões) e arquivos ignorados
- `next.config.js` — liga o log de `fetch` do servidor no terminal do `npm run dev` (`logging.fetches.fullUrl`)
- `lib/format.js` — `timeAgo()` e `pluralize()` em pt-BR

## Convenções e decisões

- Os dados vêm **só** de `lib/contents.js`. A integração futura com API deve substituir o corpo dessas funções por `fetch`, sem alterar páginas/componentes.
- Os objetos seguem o formato da API do TabNews: `id`, `title`, `slug`, `owner_username`, `tabcoins`, `children_deep_count`, `published_at`.
- Textos da interface em português (pt-BR). Pluralização no estilo do TabNews: 0 e 1 no singular ("0 comentário").
- Páginas usam `dynamic = "force-dynamic"` para o "há X tempo" ser recalculado a cada requisição.
- Componentes são Server Components por padrão; `"use client"` apenas quando há interação/hook do navegador.
- O rodapé é o **único** ponto que consulta a API real do TabNews (`cache: "no-store"`, a cada acesso, timeout de 5 s). Se ela falhar, mostra uma mensagem em vez de quebrar a página. Fica dentro de `<Suspense>` para não atrasar a lista.
- O confete (`react-confetti`) dispara uma vez no carregamento da página e é removido ao terminar.
- Links de posts e autores na lista usam `prefetch={false}`: as páginas são dinâmicas e pré-carregar dezenas delas sobrecarrega o servidor a cada visita.

## Lint e formatação

Segue a doc do Next.js 16 (`node_modules/next/dist/docs/01-app/03-api-reference/05-config/03-eslint.md`):

- No Next 16 o `next lint` foi **removido** e o `next build` **não roda mais o lint**. Por isso o script `build` chama `npm run lint && npm run format:check` explicitamente.
- `eslint.config.mjs` usa `eslint-config-next/core-web-vitals` (regras de Next, React e React Hooks) e, por último, `eslint-config-prettier/flat`, que desliga as regras do ESLint que conflitam com o Prettier. O ESLint cuida de qualidade; o Prettier, de formatação.
- Prettier com as opções padrão (`.prettierrc.json` vazio). `.prettierignore` exclui saídas de build, `package-lock.json` e as pastas de ferramentas de IA (`.agents`, `.claude`).
- Versões fixadas (`--save-exact`); `eslint-config-next` deve ter a **mesma versão** do `next`.
- Regra de destaque: `react-hooks/set-state-in-effect` proíbe `setState` síncrono no corpo de um `useEffect` (só em callbacks de eventos/assinaturas).
