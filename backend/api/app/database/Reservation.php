<?php
require_once "/var/www/api/app/helpers/connection.php";

class Reservation
{
  public function __construct(readonly int $idFlight, readonly int $idUser, readonly int $passengers)
  {
  }

  public function create_reservation()
  {
    try {
      $db = new Database();
      $connection = $db->connect_to_db();

      $stmt = $connection->prepare("INSERT INTO Reservacion(id_Cliente, id_Vuelo, plazas_compradas) VALUES (?, ?, ?)");
      $stmt->execute([$this->idUser, $this->idFlight, $this->passengers]);
      $result = $stmt->insert_id;
      return $result;
    } catch (\Throwable $th) {
      return $th;
    }
  }
}
