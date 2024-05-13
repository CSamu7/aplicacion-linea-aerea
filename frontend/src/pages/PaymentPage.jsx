import Form from "../components/Form";
import FormGroups from "../components/FormGroups";
import FormGroup from "../components/FormGroup";
import Header from "../layouts/Header";
import FormSelect from "../components/FormSelect";
import FormError from "../components/FormError";
import styles from "./PaymentPage.module.css";
import FormSubmit from "../components/FormSubmit";
import { useState } from "react";

export default function PaymentPage() {
  const CARD_TYPES = ["Visa", "Mastercard"];

  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [cardType, setCardType] = useState(CARD_TYPES[0]);
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [expirationDate, setExpirationDate] = useState("");

  const regexCvv = /^\d{4}$/g;
  const regexCardNumber = /^\d{16}$/g;

  const isCVVCorrect = !regexCvv.test(cvv);
  const isCardNumberCorrect = !regexCardNumber.test(cardNumber);
  const isThereEmptyFields =
    name === "" ||
    lastname === "" ||
    cardType === "" ||
    cardNumber === "" ||
    cvv === "" ||
    expirationDate === "";

  const optionsCard = CARD_TYPES.map((cardType) => (
    <option value={cardType}>{cardType}</option>
  ));

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const clients = JSON.parse(localStorage.getItem("clients"));

      const body = {
        idClient: clients[0],
        name,
        lastname,
        cardType,
        cardNumber,
        cvv,
        expirationDate,
      };

      const request = await fetch("http://localhost:8000/payment", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "content-type": "application/json",
        },
      });
      const response = await request.json();

      location.replace("http://localhost:5173/confirmacion");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header></Header>
      <main className={styles.main}>
        <h2 className="titlePage">Tarjeta</h2>
        <Form title="Pago" onSubmit={onSubmit}>
          <FormGroups>
            <FormGroup value={name} setValue={setName}>
              Nombre
            </FormGroup>
            <FormGroup value={lastname} setValue={setLastname}>
              Apellido
            </FormGroup>
            <FormSelect
              inputName="Tipo de tarjeta"
              value={cardType}
              setValue={setCardType}
              options={optionsCard}
            ></FormSelect>
            <FormGroup value={cardNumber} setValue={setCardNumber}>
              Numero de Tarjeta
            </FormGroup>
            <FormGroup value={cvv} setValue={setCvv}>
              CVV
            </FormGroup>
            <FormGroup
              type="month"
              value={expirationDate}
              setValue={setExpirationDate}
            >
              Fecha de expiración
            </FormGroup>
            <FormSubmit>Confirmar</FormSubmit>
          </FormGroups>
          <div className={styles.formErrors}>
            {isCVVCorrect && (
              <FormError>El CVV debe contener solo 4 digitos</FormError>
            )}
            {isCardNumberCorrect && (
              <FormError>
                El numero de tarjeta debe contener 16 digitos
              </FormError>
            )}
            {isThereEmptyFields && <FormError>Quedan campos vacios</FormError>}
          </div>
        </Form>
      </main>
    </>
  );
}
