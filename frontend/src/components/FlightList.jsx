import styles from "./FlightList.module.css";
import Flight from "./Flight.jsx";

export default function FlightList(props) {
  const { title, list } = props;

  const flights = list.map((item) => <Flight flight={item}></Flight>);

  return (
    <section className={styles.flightSection}>
      <h2 className={styles.flightTitle}>{title}</h2>
      <ul className={styles.flightList}>{flights}</ul>
    </section>
  );
}
