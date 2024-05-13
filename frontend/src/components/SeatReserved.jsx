import styles from "./SeatReserved.module.css";

export default function SeatReserved({ children }) {
  return <p className={styles.seatReserved}>{children}</p>;
}
