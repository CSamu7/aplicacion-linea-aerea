import styles from "./PersonalInformation.module.css";

export default function PersonalInformation({ props }) {
  const { name, lastname, phoneNumber, address, curp } = props;

  return (
    <div className={styles.personalInformation}>
      <p>
        <span className={styles.personalInformationLabel}>Nombre: </span> {name}
      </p>
      <p>
        <span className={styles.personalInformationLabel}>Apellido: </span>
        {lastname}
      </p>
      <p>
        <span className={styles.personalInformationLabel}>Curp: </span>
        {curp}
      </p>
      <p>
        <span className={styles.personalInformationLabel}>Telefono: </span>
        {phoneNumber}
      </p>
      <p>
        <span className={styles.personalInformationLabel}>Dirección: </span>
        {address}
      </p>
    </div>
  );
}
