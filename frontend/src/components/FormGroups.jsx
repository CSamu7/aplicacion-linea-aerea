import styles from "./FormGroups.module.css";

export default function FormGroups({ children }) {
  return <div className={styles.formGroups}>{children}</div>;
}
