import { useState } from "react";
import styles from "./FormSelect.module.css";

export default function FormSelect(props) {
  //Llamada a PHP
  const { formName, inputName, value, setValue, options } = props;

  const onChange = (e) => setValue(e.target.value);

  return (
    <div className={styles.formGroup}>
      <label className={styles.formLabel} htmlFor={formName}>
        {inputName}
      </label>
      <select
        name={formName}
        id={formName}
        className={styles.formSelect}
        onChange={onChange}
        value={value}
      >
        {options}
      </select>
    </div>
  );
}
