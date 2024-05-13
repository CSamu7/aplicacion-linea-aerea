import { useState } from "react";
import FormGroup from "../components/FormGroup";
import styles from "./FormUser.module.css";
import FormError from "./FormError";
import FormGroups from "./FormGroups";

export default function FormUser({ passengers }) {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [curp, setCurp] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  const regexPhoneNumber = /^\d{10,12}$/g;

  const isCurpValid = curp.length !== 18;
  const isPhoneNumberValid = !regexPhoneNumber.test(phoneNumber);
  const isThereEmptyFields =
    name === "" ||
    lastname === "" ||
    curp === "" ||
    phoneNumber === "" ||
    address === "";

  return (
    <div className={styles.formGroupUser}>
      <h3
        className={styles.formSubtitle}
      >{`Datos de pasajero #${passengers}`}</h3>
      <FormGroups>
        <FormGroup
          formName={`name${passengers}`}
          value={name}
          setValue={setName}
          required={true}
        >
          Nombre
        </FormGroup>
        <FormGroup
          formName={`lastname${passengers}`}
          value={lastname}
          setValue={setLastname}
          required={true}
        >
          Apellidos
        </FormGroup>
        <FormGroup
          formName={`curp${passengers}`}
          value={curp}
          setValue={setCurp}
          required={true}
        >
          CURP
        </FormGroup>
        <FormGroup
          formName={`phoneNumber${passengers}`}
          value={phoneNumber}
          setValue={setPhoneNumber}
          type="tel"
          required={true}
        >
          Telefono
        </FormGroup>
        <FormGroup
          formName={`address${passengers}`}
          value={address}
          setValue={setAddress}
          required={true}
        >
          Dirección
        </FormGroup>
      </FormGroups>
      <div className={styles.formErrors}>
        {isCurpValid && <FormError>El CURP no es valido</FormError>}
        {isPhoneNumberValid && <FormError>El telefono no es valido</FormError>}
        {isThereEmptyFields && <FormError>Quedan campos vacios</FormError>}
      </div>
    </div>
  );
}
