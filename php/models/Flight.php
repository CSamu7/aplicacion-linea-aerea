<?php

declare(strict_types=1);
require_once $_SERVER["DOCUMENT_ROOT"] . "../config/connection.php";

class Flight
{
  public function __construct(
    private int $idFlight = 1,
    private string $dateDeparture = "25/04/2024",
    private int $airportDeparture = 1,
    private int $airportArrive = 2,
    private int $passengers = 4
  ) {
  }

  public function get_flights(): array
  {
    $rows = [];
    $db = new Database();
    $connection = $db->connect_to_db();
    $query =  "   SELECT V.id_Vuelo, V.id_Avion, V.fecha_Salida, V.fecha_Salida, V.id_aeropuerto_Salida, V.id_aeropuerto_Llegada, A1.nombre_Aeropuerto AS aeropuerto_Llegada, A2.nombre_Aeropuerto AS Aeropuerto_Salida, (AV.no_Plazas - COALESCE(R.plazas_compradas, 0)) AS plazas_disponibles
    FROM
    Vuelo AS V
    INNER JOIN Aeropuerto AS A1 ON V.id_aeropuerto_Llegada = A1.id_Aeropuerto
    INNER JOIN Aeropuerto AS A2 ON V.id_aeropuerto_Salida = A2.id_Aeropuerto
    INNER JOIN Avion AS AV ON V.id_Vuelo = AV.id_Avion 
    LEFT JOIN (SELECT SUM(plazas_compradas) as plazas_compradas, id_Vuelo FROM Reservacion GROUP BY id_Vuelo) R ON V.id_Vuelo = R.id_Vuelo
    WHERE DATE(V.fecha_Salida) = ?
    AND V.id_aeropuerto_Llegada = ?
    AND V.id_aeropuerto_Salida = ?
    HAVING plazas_disponibles > ?
    ORDER BY fecha_salida ASC;";

    $stmt = $connection->prepare($query);

    $stmt->bind_param("sddd", $this->dateDeparture, $this->airportArrive, $this->airportDeparture, $this->passengers);
    $stmt->execute();
    $result = $stmt->get_result();

    foreach ($result as $row) {
      array_push($rows, $row);
    }

    return $rows;
  }

  public function get_flight(): array
  {
    $db = new Database();
    $connection = $db->connect_to_db();
    $rows = [];

    $stmt = $connection->prepare("SELECT V.id_Vuelo, V.id_Avion, V.fecha_Salida, V.fecha_Salida, V.id_aeropuerto_Salida, V.id_aeropuerto_Llegada, A1.nombre_Aeropuerto AS aeropuerto_Llegada, A2.nombre_Aeropuerto AS Aeropuerto_Salida
    FROM
    Vuelo AS V
    INNER JOIN Aeropuerto AS A1 ON V.id_aeropuerto_Llegada = A1.id_Aeropuerto
    INNER JOIN Aeropuerto AS A2 ON V.id_aeropuerto_Salida = A2.id_Aeropuerto
    WHERE id_Vuelo = ?;");
    $stmt->bind_param("d", $this->idFlight);
    $stmt->execute();
    $result = $stmt->get_result();

    foreach ($result as $row) {
      array_push($rows, $row);
    }

    return $rows;
  }
}
