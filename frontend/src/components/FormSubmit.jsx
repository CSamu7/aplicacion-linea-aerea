import styles from "./FormSubmit.module.css";

export default function FormSubmit(props) {
  const { extraClass, children, onClick } = props;

  return (
    <input
      type="submit"
      value={children}
      className={`${styles.formSubmit} ${extraClass}`}
      onClick={onClick}
    />
  );
}
