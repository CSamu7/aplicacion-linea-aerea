import { useState } from "react";
import Form from "./Form";
import FormGroups from "./FormGroups";
import FormSubmit from "./FormSubmit";
import FormSelect from "./FormSelect";
import ReservationList from "./ReservationList";
import styles from "./SeatForm.module.css";

export default function SeatForm({ seats }) {
  const getRowsAndColumns = (seats) => {
    let index = 0;
    let counter = 1;

    return seats.reduce((acc, current) => {
      if (acc[index] === undefined) {
        acc[index] = { fila: current.fila, total: counter };
        return acc;
      }

      if (acc[index].fila !== current.fila) {
        counter = 1;
        index++;
        acc[index] = { fila: current.fila, total: counter };
        return acc;
      } else {
        counter++;
        acc[index].total = counter;
      }

      return acc;
    }, []);
  };

  const [choosedSeats, setChoosedSeats] = useState([]);
  const [row, setRow] = useState("A");
  const [column, setColum] = useState(1);
  const passengers = Number(localStorage.getItem("passengers"));

  const rows = getRowsAndColumns(seats);
  const columns = Array(
    rows.find((rowItem) => rowItem.fila === row).total
  ).fill(0);

  const optionsRow = rows.map((row, index) => (
    <option value={row.fila} key={index}>
      {row.fila}
    </option>
  ));

  const optionsColum = columns.map((column, index) => {
    return (
      <option value={index} key={index}>
        {index}
      </option>
    );
  });

  const onClick = (e) => {
    if (choosedSeats.length >= passengers) {
      throw new Error("No es posible agregar mas asientos");
    }

    const find = seats.find(
      (seat) => seat.columna === Number(column) && seat.fila === row
    );

    setChoosedSeats([...choosedSeats, { ...find }]);
  };

  const onSubmit = () => {
    localStorage.setItem("seats", JSON.stringify(choosedSeats));
    location.replace("http://localhost:5173/pago");
  };

  return (
    <>
      <Form title="Asientos Disponibles">
        <FormGroups>
          <FormSelect
            inputName="Fila"
            formName="row"
            value={row}
            setValue={setRow}
            options={optionsRow}
          ></FormSelect>
          <FormSelect
            inputName="Columna"
            formName="column"
            options={optionsColum}
            setValue={setColum}
            value={column}
          ></FormSelect>
          <input
            type="button"
            value="Agregar"
            onClick={onClick}
            className={styles.btnAdd}
          />
        </FormGroups>
      </Form>
      <ReservationList list={choosedSeats} title="Asientos Reservados">
        <FormSubmit onClick={onSubmit}>Reservar</FormSubmit>
      </ReservationList>
    </>
  );
}
