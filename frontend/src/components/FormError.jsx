import styles from "./FormError.module.css";

export default function FormError({ children }) {
  return <p className={styles.formError}>{children}</p>;
}
