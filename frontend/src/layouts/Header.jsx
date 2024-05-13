import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <h2>
        <a href="http://localhost:5173/" className={styles.headerLink}>
          Aerolineas YK
        </a>
      </h2>
    </header>
  );
}
