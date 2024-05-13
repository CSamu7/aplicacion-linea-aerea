<?php

declare(strict_types=1);
require_once "/var/www/api/app/helpers/connection.php";

class FlightModel
{
  public function __construct(
    private int $idFlight = 1,
    private string $dateDeparture = "2024-05-01",
    private int $airportDeparture = 1,
    private int $airportArrive = 2,
    private int $passengers = 4
  ) {
  }

  public function getFlights(): array
  {
    $rows = [];
    $db = new Database();
    $connection = $db->connect_to_db();
    $query =  "SELECT V.id_Vuelo, V.id_Avion, V.fecha_Salida, V.fecha_Llegada, V.precio,
    A1.nombre_Aeropuerto AS aeropuerto_Llegada, A2.nombre_Aeropuerto AS Aeropuerto_Salida, AV.no_Plazas , 
    AV.no_Plazas_Dis, CONCAT(A1.localidad, ', ' ,A1.pais) AS pais_llegada, CONCAT(A2.localidad, ', ' , A2.pais) AS pais_salida
    FROM
    Vuelo AS V
    INNER JOIN Aeropuerto AS A1 ON V.id_aeropuerto_Llegada = A1.id_Aeropuerto
    INNER JOIN Aeropuerto AS A2 ON V.id_aeropuerto_Salida = A2.id_Aeropuerto
    INNER JOIN Avion AS AV ON V.id_Avion = AV.id_Avion     
    WHERE DATE(V.fecha_Salida) = ?
    AND V.id_aeropuerto_Llegada = ?
    AND V.id_aeropuerto_Salida = ?
    HAVING AV.no_Plazas_Dis > ?
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

    $query = "SELECT V.id_Vuelo, V.id_Avion, V.fecha_Salida, V.fecha_Llegada, V.precio,
    A1.nombre_Aeropuerto AS aeropuerto_Llegada, A2.nombre_Aeropuerto AS Aeropuerto_Salida, AV.no_Plazas , 
    AV.no_Plazas_Dis, CONCAT(A1.localidad, ', ' ,A1.pais) AS pais_llegada, CONCAT(A2.localidad, ', ' , A2.pais) AS pais_salida
    FROM
    Vuelo AS V
    INNER JOIN Aeropuerto AS A1 ON V.id_aeropuerto_Llegada = A1.id_Aeropuerto
    INNER JOIN Aeropuerto AS A2 ON V.id_aeropuerto_Salida = A2.id_Aeropuerto
    INNER JOIN Avion AS AV ON V.id_Avion = AV.id_Avion  
    WHERE V.id_Vuelo = ?";

    $stmt = $connection->prepare($query);
    $stmt->bind_param("d", $this->idFlight);
    $stmt->execute();
    $result = $stmt->get_result();

    foreach ($result as $row) {
      array_push($rows, $row);
    }

    return $rows;
  }
}
