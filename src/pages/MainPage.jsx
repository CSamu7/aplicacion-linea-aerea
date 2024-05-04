import "./MainPage.css";
import FlightList from "../components/FlightList";
import Form from "../components/Form";
import FormGroup from "../components/FormGroup";
import FormSubmit from "../components/FormSubmit";
import Header from "../layouts/Header";
import { useEffect, useState } from "react";
import FormSelect from "../components/FormSelect";

export default function MainPage() {
  const [flights, setFlights] = useState([]);

  const [departure, setDeparture] = useState(1);
  const [arrive, setArrive] = useState(2);
  const [passengers, setPassengers] = useState("");
  const [dateDeparture, setDateDeparture] = useState("2024-05-03");

  useEffect(() => {
    async function getFlights() {
      const request = await fetch("localhost:"); //Llamar router

      const response = await request.json();

      setFlights(response);
    }
  });

  return (
    <>
      <Header></Header>
      <main className="root">
        <h2 className="titlePage">Reservación de vuelo</h2>
        <Form title="Filtros">
          <FormSelect
            inputName="Salir de"
            formName="departure"
            value={departure}
            setValue={setDeparture}
          ></FormSelect>
          <FormSelect
            inputName="Llegar a"
            formName="arrival"
            value={arrive}
            setValue={setArrive}
          ></FormSelect>
          <FormGroup
            inputName="Pasajeros"
            formName="passengers"
            value={passengers}
            setValue={setPassengers}
          ></FormGroup>
          <FormGroup
            inputName="Fecha de salida"
            formName="date-departure"
            value={dateDeparture}
            setValue={setDateDeparture}
            type="date"
          ></FormGroup>
        </Form>
        <FlightList title="Vuelos disponibles" list={flights}></FlightList>
      </main>
    </>
  );
}
