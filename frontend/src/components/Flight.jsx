import styles from "./Flight.module.css";
import { getTime, getFullDate } from "../helpers/date";
import FormSubmit from "./FormSubmit";

export default function Flight(props) {
  const { flight, btnReserve = true } = props;
  const { idFlight, detailsArrive, detailsDeparture, detailsPlane, price } =
    flight;

  const percentageOcupation = detailsPlane.availableSeats / detailsPlane.seats;
  let stateOcupation;

  if (percentageOcupation >= 0.8) {
    stateOcupation = "Ocupación baja";
  } else if (percentageOcupation >= 0.4) {
    stateOcupation = "Ocupación media";
  } else {
    stateOcupation = "Ocupación alta";
  }

  const onClick = (e) => {
    e.preventDefault();

    localStorage.setItem("idFlight", idFlight);
    location.assign("http://localhost:5173/registro");
  };

  return (
    <li className={styles.flight} key={idFlight}>
      <div className={styles.flightInformation}>
        <div className={styles.flightAirports}>
          <div className={styles.flightAirport}>
            <p className={styles.flightAirportName}>
              {detailsDeparture.airport}
            </p>
            <p className={styles.flightCountry}>{detailsDeparture.country}</p>
          </div>
          <img src="/arrow.webp" alt="" className={styles.flightArrow} />
          <div className={styles.flightAirport}>
            <p className={styles.flightAirportName}>{detailsArrive.airport}</p>
            <p className={styles.flightCountry}>{detailsArrive.country}</p>
          </div>
        </div>
        <div className={styles.flightDetails}>
          <p className={styles.flightSeats}>{stateOcupation} </p>
          <div className={styles.flightSchedule}>
            <h3 className={styles.flightScheduleTitle}>Fecha de salida</h3>
            <p className={styles.flightTime}>
              {getFullDate(detailsDeparture.date)}
            </p>
            <p className={styles.flightDate}>
              {getTime(detailsDeparture.date)}
            </p>
          </div>
          <div className={styles.flightSchedule}>
            <h3 className={styles.flightScheduleTitle}>Fecha de llegada</h3>
            <p className={styles.flightTime}>
              {getFullDate(detailsArrive.date)}
            </p>
            <p className={styles.flightDate}>{getTime(detailsArrive.date)}</p>
          </div>
          <p className={styles.flightPrice}>${price}</p>
        </div>
      </div>

      {btnReserve && (
        <FormSubmit extraClass={styles.btnSubmit} onClick={onClick}>
          Reservar
        </FormSubmit>
      )}
    </li>
  );
}
