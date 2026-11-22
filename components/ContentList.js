import Link from "next/link";
import { pluralize, timeAgo } from "@/lib/format";
import styles from "./ContentList.module.css";

function Meta({ children }) {
  return <div className={styles.meta}>{children}</div>;
}

export default function ContentList({ contents, sponsored }) {
  return (
    <section className={styles.wrapper}>
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
            <Link href={`/${content.owner_username}/${content.slug}`} className={styles.title}>
              {content.title}
            </Link>
            <Meta>
              <span>{pluralize(content.tabcoins, "tabcoin", "tabcoins")}</span>
              <span aria-hidden="true">·</span>
              <span>{pluralize(content.children_deep_count, "comentário", "comentários")}</span>
              <span aria-hidden="true">·</span>
              <Link href={`/${content.owner_username}`} className={styles.metaLink}>
                {content.owner_username}
              </Link>
              <span aria-hidden="true">·</span>
              <time dateTime={content.published_at} title={new Date(content.published_at).toLocaleString("pt-BR")}>
                {timeAgo(content.published_at)}
              </time>
            </Meta>
          </li>
        ))}
      </ol>
    </section>
  );
}
