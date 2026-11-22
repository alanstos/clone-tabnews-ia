import Link from "next/link";
import { pluralize, timeAgo } from "@/lib/format";
import styles from "./ContentList.module.css";

function Meta({ children }) {
  return <div className={styles.meta}>{children}</div>;
}

// Linha de informações de um conteúdo; usada na lista e na página do post.
export function ContentMeta({ content }) {
  return (
    <Meta>
      <span>{pluralize(content.tabcoins, "tabcoin", "tabcoins")}</span>
      <span aria-hidden="true">·</span>
      <span>{pluralize(content.children_deep_count, "comentário", "comentários")}</span>
      <span aria-hidden="true">·</span>
      <Link href={`/${content.owner_username}`} prefetch={false} className={styles.metaLink}>
        {content.owner_username}
      </Link>
      <span aria-hidden="true">·</span>
      <time dateTime={content.published_at} title={new Date(content.published_at).toLocaleString("pt-BR")}>
        {timeAgo(content.published_at)}
      </time>
    </Meta>
  );
}

export default function ContentList({ contents, sponsored, heading }) {
  return (
    <section className={styles.wrapper}>
      {heading && <h1 className={styles.heading}>{heading}</h1>}
      {sponsored && (
        <article className={styles.sponsored}>
          <Link href="#" className={styles.sponsoredTitle}>
            {sponsored.title}
          </Link>
          <Meta>Contribuindo com {sponsored.owner_username}</Meta>
        </article>
      )}

      <ol className={styles.list}>
        {contents.map((content) => (
          <li key={content.id} className={styles.item}>
            {/* Sem prefetch: as páginas são dinâmicas e a lista tem dezenas de
                links; pré-carregar todos geraria ~40 renderizações no servidor
                a cada visita. A página é buscada só no clique. */}
            <Link href={`/${content.owner_username}/${content.slug}`} prefetch={false} className={styles.title}>
              {content.title}
            </Link>
            <ContentMeta content={content} />
          </li>
        ))}
      </ol>
    </section>
  );
}
