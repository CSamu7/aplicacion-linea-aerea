import FormSubmit from "../components/FormSubmit";
import Header from "../layouts/Header";
import styles from "./RegisterUser.module.css";
import FormUser from "../components/FormUser";
import Form from "../components/Form";

export default function RegisterUserPage() {
  const passengers = Number(localStorage.getItem("passengers"));
  const formClients = [];

  for (let index = 1; index <= passengers; index++) {
    formClients.push(<FormUser passengers={index}></FormUser>);
  }

  const cleanData = (form) => {
    const users = [];

    for (const pair of [...form]) {
      const keyNumber = pair[0].charAt(pair[0].length - 1);
      const cleanKey = pair[0].slice(0, pair[0].length - 1);

      if (!users[keyNumber - 1]) {
        users[keyNumber - 1] = {};
        users[keyNumber - 1][cleanKey] = pair[1];
      } else {
        users[keyNumber - 1][cleanKey] = pair[1];
      }
    }

    return users;
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const form = new FormData(e.target);
      const body = cleanData(form);

      const request = await fetch("http://localhost:8000/user", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const response = await request.json();

      const bodyResponse = JSON.stringify({
        idFlight: Number(localStorage.getItem("idFlight")),
        idClient: response[0],
        passengers: Number(localStorage.getItem("passengers")),
      });

      const sendReservation = await fetch("http://localhost:8000/reservation", {
        method: "POST",
        body: bodyResponse,
        headers: {
          "Content-Type": "application/json",
        },
      });

      const responseReservation = await sendReservation.json();

      localStorage.setItem("reservation", JSON.stringify(responseReservation));
      localStorage.setItem("clients", JSON.stringify(response));
      location.replace("http://localhost:5173/asientos");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header></Header>
      <main className={styles.mainRegisterUser}>
        <h2 className="titlePage">Registro de pasajeros</h2>
        <div className={styles.listRegisterUser}>
          <Form title="Datos de pasajeros" onSubmit={onSubmit}>
            {formClients}
            <FormSubmit extraClass={styles.formSubmit}>Enviar</FormSubmit>
          </Form>
        </div>
      </main>
    </>
  );
}
