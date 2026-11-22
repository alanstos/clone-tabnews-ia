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

export async function getSponsoredContent() {
  return sponsoredContent;
}
