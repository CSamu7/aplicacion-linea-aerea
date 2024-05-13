import { useRef, useState } from "react";
import Flight from "../components/Flight";
import FormSubmit from "../components/FormSubmit";
import Header from "../layouts/Header";
import { useEffect } from "react";
import SeatReserved from "../components/SeatReserved";
import styles from "./ConfirmPage.module.css";
import PersonalInformation from "../components/PersonalInformation";

export default function ConfirmPage() {
  const [dataClient, setDataClient] = useState([]);
  const [flight, setFlight] = useState({});
  const hasFetchedData = useRef(false);

  useEffect(() => {
    const getClients = async () => {
      const clients = JSON.parse(localStorage.getItem("clients"));

      await clients.forEach(async (client) => {
        const request = await fetch(`http://localhost:8000/user/${client}`);
        const response = await request.json();

        setDataClient((state) => [...state, response[0]]);
      });
    };

    const getFlight = async () => {
      const idFlight = Number(localStorage.getItem("idFlight"));

      const request = await fetch(`http://localhost:8000/flight/${idFlight}`);
      const response = await request.json();

      setFlight({ ...response });
    };

    const fetchBoth = async () => {
      await getClients();
      await getFlight();
    };

    if (hasFetchedData.current === false) {
      fetchBoth();
      hasFetchedData.current = true;
    }
  }, []);

  const clients = Object.entries(dataClient).map((item) => (
    <PersonalInformation props={item[1]}></PersonalInformation>
  ));

  const seatsData = JSON.parse(localStorage.getItem("seats"));

  const seats = seatsData.map((seat) => {
    return <SeatReserved>{`${seat.fila}${seat.columna}`}</SeatReserved>;
  });

  const createBoardingCard = async () => {
    const clients = JSON.parse(localStorage.getItem("clients"));

    clients.forEach(async (client, index) => {
      const body = JSON.stringify({
        idClient: client,
        idPlane: flight["detailsPlane"]["idPlane"],
        idReservation: Number(localStorage.getItem("reservation")),
        idSeat: seatsData[index]["id_Asiento"],
      });

      const request = await fetch("http://localhost:8000/boardingCard", {
        method: "POST",
        body,
        headers: {
          "content-type": "application/json",
        },
      });

      const response = await request.json();

      console.log(response);
    });
  };

  return (
    <>
      <Header></Header>
      <main className={styles.main}>
        {!(Object.keys(flight).length === 0) && (
          <Flight flight={flight} btnReserve={false}></Flight>
        )}
        <div className={styles.userInformation}>
          <h2 className={styles.userInformationTitle}>
            Datos de los pasajeros
          </h2>
          <div className={styles.userInformationBox}>{clients}</div>
        </div>
        <div className={styles.userInformation}>
          <h2 className={styles.userInformationTitle}>Asientos Reservados</h2>
          <div className={styles.userInformationBox}>{seats}</div>
        </div>
        <FormSubmit onClick={createBoardingCard}>
          Confirmar reservación
        </FormSubmit>
      </main>
    </>
  );
}
