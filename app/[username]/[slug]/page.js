import { notFound } from "next/navigation";
import { ContentMeta } from "@/components/ContentList";
import { getContent } from "@/lib/contents";
import styles from "./page.module.css";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { username, slug } = await params;
  const content = await getContent(username, slug);
  return {
    title: content ? `${content.title} · TabNews` : "Não encontrado · TabNews",
  };
}

export default async function ContentPage({ params }) {
  const { username, slug } = await params;
  const content = await getContent(username, slug);

  if (!content) notFound();

  return (
    <article className={styles.article}>
      <ContentMeta content={content} />
      <h1 className={styles.title}>{content.title}</h1>
      {content.body.split("\n\n").map((paragraph, index) => (
        <p key={index} className={styles.paragraph}>
          {paragraph}
        </p>
      ))}
    </article>
  );
}
