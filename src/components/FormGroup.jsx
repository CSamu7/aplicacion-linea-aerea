import styles from "./FormGroup.module.css";

export default function FormGroup(props) {
  const { formName, type, inputName, value, setValue } = props;

  const onChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className={styles.formGroup}>
      <label className={styles.formLabel} htmlFor={formName}>
        {inputName}
      </label>
      <input
        type={type}
        className={styles.formInput}
        name={formName}
        id={formName}
        onChange={onChange}
        value={value}
      />
    </div>
  );
}
