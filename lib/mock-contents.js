const HOUR = 60 * 60 * 1000;
const MINUTE = 60 * 1000;
const DAY = 24 * HOUR;

export const sponsoredContent = {
  id: "sponsored-1",
  title: "Pegue meu livro grátis, só hoje! 22/11/2026",
  owner_username: "JoaoAutorDeLivros",
  slug: "pegue-meu-livro-gratis",
};

// Gera datas relativas ao momento da chamada para simular o "há X tempo".
export function buildMockContents(now = Date.now()) {
  return [
    { title: "Por quê usar CoffeeScript e TOON economiza seus tokens?", tabcoins: 5, children_deep_count: 1, owner_username: "devcuriosa", ago: 20 * HOUR },
    { title: "O ID do pedido mudou sozinho? JSON, números grandes e o limite de 2^53", tabcoins: 3, children_deep_count: 0, owner_username: "bitsperdidos", ago: 1 * HOUR },
    { title: "Como construí uma enciclopédia visual em grafo (1.318 entidades, 12.146 afirmações) sem banco de dados tradicional", tabcoins: 1, children_deep_count: 0, owner_username: "grafomaniaco", ago: 28 * MINUTE },
    { title: "Minha identidade, sua urgência e o dinheiro dos outros: mais um golpe de engenharia social", tabcoins: 1, children_deep_count: 0, owner_username: "seguranca_br", ago: 2 * HOUR },
    { title: "Pitch: Criei um servidor open source para a equipe toda usar o mesmo assistente de IA com a mesma configuração", tabcoins: 1, children_deep_count: 0, owner_username: "opensourcer", ago: 2 * HOUR },
    { title: "Coloquei a revisão de código com IA pra rodar num LLM local de graça. Funcionou, mas ele não encontrou o bug que o modelo na nuvem pegou nas três rodadas", tabcoins: 1, children_deep_count: 0, owner_username: "revisor42", ago: 3 * HOUR },
    { title: "Burnout em tech: o que eu vejo no consultório e o que ajuda de verdade", tabcoins: 11, children_deep_count: 6, owner_username: "drpsicotech", ago: 2 * DAY },
    { title: "\"O que eu acredito sobre o futuro do desenvolvimento de software\"", tabcoins: 10, children_deep_count: 11, owner_username: "futurista", ago: 2 * DAY },
    { title: "Migrei um monolito para microsserviços e me arrependi: lições aprendidas", tabcoins: 24, children_deep_count: 18, owner_username: "arquiteta_ana", ago: 3 * DAY },
    { title: "Guia prático de índices no PostgreSQL para quem nunca entendeu EXPLAIN", tabcoins: 17, children_deep_count: 4, owner_username: "dbazinho", ago: 1 * DAY },
    { title: "Fiz meu primeiro freela e cobrei barato demais. Como precificar?", tabcoins: 9, children_deep_count: 22, owner_username: "freelancer_iniciante", ago: 5 * HOUR },
    { title: "Por que seu useEffect está rodando duas vezes (e por que isso é bom)", tabcoins: 7, children_deep_count: 3, owner_username: "reactando", ago: 8 * HOUR },
    { title: "Show-off: um emulador de terminal escrito do zero em Rust", tabcoins: 6, children_deep_count: 2, owner_username: "rustaceo", ago: 12 * HOUR },
    { title: "Testes de integração com banco real vs. mocks: minha experiência após 2 anos", tabcoins: 4, children_deep_count: 5, owner_username: "testadora", ago: 1 * DAY },
    { title: "Como estruturei meus estudos para sair do zero até a primeira vaga", tabcoins: 2, children_deep_count: 1, owner_username: "juninho_dev", ago: 40 * MINUTE },
  ].map(({ ago, ...item }, index) => ({
    id: `mock-${index + 1}`,
    slug: `conteudo-${index + 1}`,
    published_at: new Date(now - ago).toISOString(),
    body: `Este é um conteúdo de exemplo (mockado) para o post "${item.title}".\n\nQuando a página for ligada à API, o texto real do post aparecerá aqui.`,
    ...item,
  }));
}
