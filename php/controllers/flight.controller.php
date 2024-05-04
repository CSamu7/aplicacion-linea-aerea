<?php
require_once "/home/samu/aplicacion-linea-aerea/php/models/Flight.php";

class FlightController
{
  public static function getFlights()
  {


    $flights = new Flight();
    $flights->get_flights();
    return json_encode($flights);
  }
}
