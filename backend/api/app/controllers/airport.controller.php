<?php
require_once "/var/www/api/app/database/Airport.php";

class AirportController
{
  public static function getAirports()
  {
    $airports = Airport::get_airports();

    echo json_encode($airports);
  }
}
