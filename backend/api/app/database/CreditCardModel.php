<?php
require_once "/var/www/api/app/helpers/connection.php";

class CreditCardModel
{
  public function __construct(readonly int $idClient, readonly string $name, readonly string $lastname, readonly string $cardType, readonly string $cardNumber, readonly string $cvv, readonly string $expirationDate)
  {
  }

  public function postCreditCard()
  {
    try {
      $db = new Database();
      $connection = $db->connect_to_db();

      $stmt = $connection->prepare("INSERT INTO Tarjeta_Credito(id_Tarjeta_Credito, id_Cliente, nombre, apellido, cvv, fecha_vencimiento) VALUES (?, ?, ?, ?, ?, ?)");
      $stmt->execute([$this->cardNumber, $this->idClient, $this->name, $this->lastname, $this->cvv, $this->expirationDate]);

      return $this->expirationDate;
    } catch (\Throwable $th) {
      return $th;
    }
  }
}
