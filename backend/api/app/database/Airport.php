<?php

declare(strict_types=1);
require_once "/var/www/api/app/helpers/connection.php";

class Airport
{
  public  static function get_airports(): array
  {
    $db = new Database();
    $connection = $db->connect_to_db();

    $airports = [];
    $stmt = $connection->prepare("SELECT id_Aeropuerto, nombre_Aeropuerto FROM Aeropuerto");
    $stmt->execute();
    $result = $stmt->get_result();

    foreach ($result as $row) {
      array_push($airports, $row);
    }

    return $airports;
  }
}
