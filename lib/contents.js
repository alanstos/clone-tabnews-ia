import { buildMockContents, sponsoredContent } from "./mock-contents";

/**
 * Camada de acesso aos conteúdos.
 * Hoje retorna dados mockados; no futuro, substitua o corpo por uma
 * chamada à API, por exemplo:
 *
 *   const res = await fetch(`${process.env.API_URL}/contents?strategy=${strategy}`);
 *   return res.json();
 *
 * O formato dos objetos segue o da API do TabNews
 * (title, slug, owner_username, tabcoins, children_deep_count, published_at).
 */
export async function getContents({ strategy = "relevant" } = {}) {
  const contents = buildMockContents();

  if (strategy === "new") {
    return [...contents].sort(
      (a, b) => new Date(b.published_at) - new Date(a.published_at),
    );
  }

  return contents;
}

// Conteúdos de um autor (equivale a GET /api/v1/contents/[username]).
export async function getContentsByUser(username) {
  const contents = await getContents({ strategy: "new" });
  return contents.filter((content) => content.owner_username === username);
}

// Um conteúdo específico (equivale a GET /api/v1/contents/[username]/[slug]).
// Retorna null quando não existe.
export async function getContent(username, slug) {
  const contents = buildMockContents();
  return (
    contents.find(
      (content) => content.owner_username === username && content.slug === slug,
    ) ?? null
  );
}

export async function getSponsoredContent() {
  return sponsoredContent;
}
