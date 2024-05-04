import styles from "./Form.module.css";

export default function Form(props) {
  const { children, title, onChange } = props;

  return (
    <form className={styles.form} onChange={onChange}>
      <h3 className={styles.formTitle}>{title}</h3>
      {children}
    </form>
  );
}
