<?php

require_once "/var/www/api/app/helpers/connection.php";

class SeatModel
{
  public function __construct(readonly int $idAvion)
  {
  }

  public function getSeats()
  {
    $db = new Database();
    $connection = $db->connect_to_db();
    $rows = [];

    $stmt = $connection->prepare("SELECT id_Asiento, clase, columna, fila FROM Asiento WHERE id_Avion = ?");
    $stmt->execute([$this->idAvion]);
    $result = $stmt->get_result();

    foreach ($result as $seat) {
      array_push($rows, $seat);
    }

    return $rows;
  }

  public function updateSeat()
  {
  }
}
