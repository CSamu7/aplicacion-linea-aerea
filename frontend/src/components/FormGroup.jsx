import styles from "./FormGroup.module.css";

export default function FormGroup(props) {
  const { formName, type, children, value, setValue, required } = props;

  const onChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className={styles.formGroup}>
      <label className={styles.formLabel} htmlFor={formName}>
        {children}
      </label>
      <input
        type={type}
        className={styles.formInput}
        name={formName}
        id={formName}
        onChange={onChange}
        value={value}
        required={required}
      />
    </div>
  );
}
