<?php
require_once "/var/www/api/app/helpers/connection.php";

class BoardingCardModel
{
  public function __construct(readonly int $idClient, readonly int $idSeat, readonly int $idReservation)
  {
  }

  public function postBoardingCard()
  {
    try {
      $db = new Database();
      $connection = $db->connect_to_db();

      $stmt = $connection->prepare("INSERT INTO Pase_Abordo(id_Reserva, id_Cliente, id_Asiento) VALUES (?, ?, ?);");
      $stmt->execute([$this->idReservation, $this->idClient, $this->idSeat]);
      $result = $stmt->insert_id;
      return $result;
    } catch (\Throwable $th) {
      return $th;
    }
  }
}
