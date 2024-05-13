import "./MainPage.css";
import FlightList from "../components/FlightList";
import Form from "../components/Form";
import FormGroup from "../components/FormGroup";
import FormSubmit from "../components/FormSubmit";
import Header from "../layouts/Header";
import { useEffect, useState } from "react";
import FormSelect from "../components/FormSelect";
import FormGroups from "../components/FormGroups";

export default function MainPage() {
  const [flights, setFlights] = useState([]);
  const [airports, setAirports] = useState([]);

  const [departure, setDeparture] = useState(1);
  const [arrive, setArrive] = useState(2);
  const [passengers, setPassengers] = useState(1);
  const [dateDeparture, setDateDeparture] = useState("2024-05-14");

  console.log(flights);

  useEffect(() => {
    async function getAirports() {
      const request = await fetch("http://localhost:8000/airport");

      const response = await request.json();

      setAirports(response);
    }

    getAirports();
  }, []);

  useEffect(() => {
    localStorage.setItem("passengers", passengers);
  }, [passengers]);

  const onSubmit = async (e) => {
    e.preventDefault();

    const request = await fetch("http://localhost:8000/flight", {
      method: "POST",
      body: JSON.stringify({ departure, arrive, passengers, dateDeparture }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const response = await request.json();

    setFlights(response);
  };

  const options = airports.map((airport) => (
    <option value={airport["id_Aeropuerto"]} key={airport["id_Aeropuerto"]}>
      {airport["nombre_Aeropuerto"]}
    </option>
  ));

  return (
    <>
      <Header></Header>
      <main className="root">
        <h2 className="titlePage">Reservación de vuelo</h2>
        <Form title="Filtros" onSubmit={onSubmit}>
          <FormGroups>
            <FormSelect
              inputName="Salir de"
              formName="departure"
              value={departure}
              setValue={setDeparture}
              options={options}
            ></FormSelect>
            <FormSelect
              inputName="Llegar a"
              formName="arrival"
              value={arrive}
              setValue={setArrive}
              options={options}
            ></FormSelect>
            <FormGroup
              formName="passengers"
              value={passengers}
              setValue={setPassengers}
            >
              Pasajeros
            </FormGroup>
            <FormGroup
              formName="date-departure"
              value={dateDeparture}
              setValue={setDateDeparture}
              type="date"
            >
              Fecha de Salida
            </FormGroup>
            <FormSubmit>Buscar</FormSubmit>
          </FormGroups>
        </Form>
        <FlightList title="Vuelos disponibles" list={flights}></FlightList>
      </main>
    </>
  );
}
