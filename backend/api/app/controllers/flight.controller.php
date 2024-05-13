<?php
require_once "/var/www/api/app/database/FlightModel.php";

class FlightController
{
  public static function getFlights()
  {
    $dateDeparture = Flight::request()->data->dateDeparture;
    $departure = Flight::request()->data->departure;
    $arrive = Flight::request()->data->arrive;
    $passengers = Flight::request()->data->passengers;

    $flights = new FlightModel(1, $dateDeparture, $departure, $arrive, $passengers);
    $data = $flights->getFlights();

    $arr = array();

    foreach ($data as $flight) {
      $json = new stdClass;
      $json->idFlight = $flight["id_Vuelo"];
      $json->price = $flight["precio"];

      $json->detailsPlane = array("idPlane" => $flight["id_Avion"], "seats" => $flight["no_Plazas"], "availableSeats" => $flight["no_Plazas_Dis"]);
      $json->detailsDeparture = array("date" => $flight["fecha_Salida"], "airport" => $flight["Aeropuerto_Salida"], "country" => $flight["pais_salida"]);
      $json->detailsArrive = array("date" => $flight["fecha_Llegada"], "airport" => $flight["aeropuerto_Llegada"], "country" => $flight["pais_llegada"]);

      array_push($arr, $json);
    }

    echo json_encode($arr);
  }

  public static function getFlight(int $id)
  {
    $flight = new FlightModel($id);
    $data  = $flight->get_flight();

    $arr = array();

    foreach ($data as $flight) {
      $json = new stdClass;
      $json->idFlight = $flight["id_Vuelo"];
      $json->price = $flight["precio"];

      $json->detailsPlane = array("idPlane" => $flight["id_Avion"], "seats" => $flight["no_Plazas"], "availableSeats" => $flight["no_Plazas_Dis"]);
      $json->detailsDeparture = array("date" => $flight["fecha_Salida"], "airport" => $flight["Aeropuerto_Salida"], "country" => $flight["pais_salida"]);
      $json->detailsArrive = array("date" => $flight["fecha_Llegada"], "airport" => $flight["aeropuerto_Llegada"], "country" => $flight["pais_llegada"]);

      array_push($arr, $json);
    }

    echo json_encode($json);
  }
}
