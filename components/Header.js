import Link from "next/link";
import NavLinks from "./NavLinks";
import ThemeToggle from "./ThemeToggle";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <Link href="/" className={styles.logo} aria-label="Página inicial">
          <svg width="32" height="32" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            <path d="M1.75 1A1.75 1.75 0 0 0 0 2.75v10.5C0 14.216.784 15 1.75 15h12.5A1.75 1.75 0 0 0 16 13.25v-8.5A1.75 1.75 0 0 0 14.25 3H7.5a.25.25 0 0 1-.2-.1l-.9-1.2C6.07 1.26 5.55 1 5 1H1.75Zm0 1.5H5a.25.25 0 0 1 .2.1l.9 1.2c.33.44.85.7 1.4.7h6.75a.25.25 0 0 1 .25.25v8.5a.25.25 0 0 1-.25.25H1.75a.25.25 0 0 1-.25-.25V2.75a.25.25 0 0 1 .25-.25Z" />
          </svg>
          <span className={styles.brand}>TabNews</span>
        </Link>
        <NavLinks />
      </div>

      <div className={styles.right}>
        <label className={styles.search}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            <path d="M10.68 11.74a6 6 0 0 1-7.92-8.98 6 6 0 0 1 8.98 7.92l3.04 3.04a.75.75 0 1 1-1.06 1.06ZM11.5 7a4.5 4.5 0 1 0-9 0 4.5 4.5 0 0 0 9 0Z" />
          </svg>
          <input type="search" placeholder="Pesquisar" aria-label="Pesquisar" />
        </label>
        <ThemeToggle />
        <Link href="#" className={styles.action}>Login</Link>
        <Link href="#" className={styles.action}>Cadastrar</Link>
      </div>
    </header>
  );
}
