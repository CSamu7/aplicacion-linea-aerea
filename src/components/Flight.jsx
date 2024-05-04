export default function Flight(props) {
  const { airportArrive, airportDeparture, dateDeparture, passengers, price } =
    props;

  return (
    <li>
      <div>
        <p>{airportDeparture}</p>
        <img src="" alt="" />
        <p>{airportArrive}</p>
      </div>
      <div>
        <p>{dateDeparture}</p>
      </div>
    </li>
  );
}
