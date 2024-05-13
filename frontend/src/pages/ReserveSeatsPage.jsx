import { useEffect, useState } from "react";
import Header from "../layouts/Header";
import styles from "./ReserveSeatsPage.module.css";
import SeatForm from "../components/SeatForm";

export default function ReserveSeatsPage() {
  const [seats, setSeats] = useState([]);

  useEffect(() => {
    const fetchSeats = async () => {
      const idFlight = localStorage.getItem("idFlight");
      const request = await fetch(
        `http://localhost:8000/flight/${idFlight}/seat`
      );

      const response = await request.json();

      setSeats(response);
    };

    fetchSeats();
  }, []);

  return (
    <>
      <Header></Header>
      <main className={styles.main}>
        {seats.length !== 0 && <SeatForm seats={seats}></SeatForm>}{" "}
      </main>
    </>
  );
}
