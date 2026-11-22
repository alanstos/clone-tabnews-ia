"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Header.module.css";

const LINKS = [
  { href: "/", label: "Relevantes" },
  { href: "/recentes", label: "Recentes" },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className={styles.nav}>
      {LINKS.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className={pathname === href ? `${styles.navLink} ${styles.active}` : styles.navLink}
          aria-current={pathname === href ? "page" : undefined}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}
