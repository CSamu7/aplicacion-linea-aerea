import { useEffect, useState } from "react";
import styles from "./FormSelect.module.css";

export default function FormSelect(props) {
  //Llamada a PHP
  const { formName, inputName, value, setValue } = props;
  const [airports, setAirports] = useState([]);

  useEffect(() => {
    async function getAirports() {
      const request = await fetch("http://localhost:8000/airport");

      const response = await request.json();

      console.log(response);

      setAirports(response);
    }

    getAirports();
  }, []);

  const onChange = (e) => setValue(e.target.value);

  const options = airports.map((airport) => (
    <option value={airport["id_Aeropuerto"]} key={airport["id_Aeropuerto"]}>
      {airport["nombre_Aeropuerto"]}
    </option>
  ));

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
