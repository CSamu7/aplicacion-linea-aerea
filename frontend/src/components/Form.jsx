import styles from "./Form.module.css";

export default function Form(props) {
  const { children, title, onSubmit } = props;

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <h3 className={styles.formTitle}>{title}</h3>
      {children}
    </form>
  );
}
