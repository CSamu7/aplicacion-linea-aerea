import styles from "./ReservationList.module.css";
import SeatReserved from "./SeatReserved.jsx";

export default function ReservationList(props) {
  const { title, list, children } = props;

  const seats = list.map((seat) => (
    <SeatReserved>{`${seat.fila}${seat.columna}`}</SeatReserved>
  ));

  return (
    <section className={styles.flightSection}>
      <h2 className={styles.flightTitle}>{title}</h2>
      <ul className={styles.flightList}>{seats}</ul>
      {children}
    </section>
  );
}
