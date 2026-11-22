const TABNEWS_URL = "https://www.tabnews.com.br";

/**
 * Total de conteúdos (publicações, sem contar comentários) do TabNews original.
 * A API pública informa o total no cabeçalho `x-pagination-total-rows`,
 * então pedimos só 1 item. Sem cache: o valor é lido a cada acesso.
 * Retorna `null` se a API falhar ou demorar, para não derrubar a página.
 */
export async function getTotalPublishedContents() {
  try {
    const response = await fetch(
      `${TABNEWS_URL}/api/v1/contents?page=1&per_page=1&strategy=new`,
      { cache: "no-store", signal: AbortSignal.timeout(5000) },
    );

    if (!response.ok) return null;

    const total = Number(response.headers.get("x-pagination-total-rows"));
    return Number.isFinite(total) ? total : null;
  } catch {
    return null;
  }
}

export { TABNEWS_URL };
