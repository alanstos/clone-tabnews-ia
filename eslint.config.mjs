import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import prettier from "eslint-config-prettier/flat";

const eslintConfig = defineConfig([
  ...nextVitals,
  // Desliga as regras de formatação do ESLint que conflitam com o Prettier.
  // Deve vir depois das demais configs.
  prettier,
  // Sobrescreve os ignores padrão do eslint-config-next.
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);

export default eslintConfig;
