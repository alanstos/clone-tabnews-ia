import { Suspense } from "react";
import { getTotalPublishedContents, TABNEWS_URL } from "@/lib/tabnews";
import styles from "./Footer.module.css";

async function TotalContents() {
  const total = await getTotalPublishedContents();

  if (total === null) {
    return (
      <span>Não foi possível carregar o total de conteúdos do TabNews.</span>
    );
  }

  return (
    <span>
      <strong>{total.toLocaleString("pt-BR")}</strong> conteúdos publicados no
      TabNews
    </span>
  );
}

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <Suspense fallback={<span>Carregando total de conteúdos…</span>}>
          <TotalContents />
        </Suspense>
        <a
          href={TABNEWS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          Visitar o TabNews oficial ↗
        </a>
      </div>
    </footer>
  );
}
