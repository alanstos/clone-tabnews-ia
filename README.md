# clone-tabnews-ia

Clone da página inicial do [TabNews](https://www.tabnews.com.br) (listas "Relevantes" e "Recentes") feito com Next.js 16 (App Router) e dados mockados.

## Rodando

```bash
nvm use        # Node 22 (.nvmrc)
npm install
npm run dev    # http://localhost:3000
```

| Script                 | O que faz                                                     |
| ---------------------- | ------------------------------------------------------------- |
| `npm run dev`          | Servidor de desenvolvimento                                   |
| `npm run build`        | `lint` + `format:check` + `next build` (falha se houver erro) |
| `npm start`            | Serve o build de produção                                     |
| `npm run lint`         | Verifica o código com ESLint                                  |
| `npm run lint:fix`     | ESLint corrigindo o que for automático                        |
| `npm run format`       | Formata todos os arquivos com Prettier                        |
| `npm run format:check` | Só verifica a formatação (usado no build)                     |

## ESLint + Prettier em um projeto Next.js 16 (passo a passo)

Checklist para repetir em outros projetos. Baseado na doc oficial: [ESLint Plugin](https://nextjs.org/docs/app/api-reference/config/eslint) (também disponível offline em `node_modules/next/dist/docs/01-app/03-api-reference/05-config/03-eslint.md`).

> **Atenção (Next 16):** o comando `next lint` foi removido e o `next build` **não roda mais o ESLint**. Se nada for feito, o build passa mesmo com erros de lint. Por isso o lint precisa ser chamado no script `build`.

### 1. Instalar as dependências

```bash
npm i -D --save-exact eslint eslint-config-next@<mesma versão do next> eslint-config-prettier prettier
```

- `eslint-config-next` — regras do Next.js, React e React Hooks (use a mesma versão do pacote `next`).
- `eslint-config-prettier` — desliga as regras do ESLint que brigam com o Prettier.

### 2. Criar `eslint.config.mjs`

```js
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import prettier from "eslint-config-prettier/flat";

const eslintConfig = defineConfig([
  ...nextVitals,
  prettier, // sempre depois das outras configs
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);

export default eslintConfig;
```

Em projetos TypeScript, adicione `import nextTs from "eslint-config-next/typescript"` e `...nextTs` logo após `...nextVitals`.

### 3. Criar a config do Prettier

`.prettierrc.json` (vazio = padrões do Prettier):

```json
{}
```

`.prettierignore`:

```
.next
out
build
node_modules
package-lock.json
```

### 4. Scripts no `package.json`

```json
"scripts": {
  "build": "npm run lint && npm run format:check && next build",
  "lint": "eslint .",
  "lint:fix": "eslint . --fix",
  "format": "prettier --write .",
  "format:check": "prettier --check ."
}
```

Com `&&`, se o ESLint ou o Prettier encontrarem problema o `next build` nem chega a rodar e o comando sai com erro — o que também barra o deploy (ex.: Vercel roda `npm run build`).

### 5. Ajustar o código existente

```bash
npm run format     # formata tudo de uma vez
npm run lint:fix   # corrige o automático
npm run lint       # o que sobrar precisa ser corrigido à mão
npm run build      # confirma que passa
```

### Dicas

- No VS Code, instale as extensões **ESLint** e **Prettier** para ver os erros e formatar ao salvar.
- Avisos (warnings) do ESLint não quebram o build; para tratá-los como erro, use `eslint . --max-warnings=0`.
