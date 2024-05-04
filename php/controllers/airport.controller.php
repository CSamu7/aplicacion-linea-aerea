<?php
require_once "/home/samu/aplicacion-linea-aerea/php/models/Airport.php";

class AirportController
{
  public static function getAirport()
  {
    $airports = Airport::get_airports();
    return json_encode($airports);
  }
}
