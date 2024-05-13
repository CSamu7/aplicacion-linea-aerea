<?php

declare(strict_types=1);
require_once "/var/www/api/app/helpers/connection.php";

class User
{
  public function __construct(
    readonly string $name,
    readonly string $lastname,
    readonly string $phoneNumber,
    readonly string $curp,
    readonly string $address,
  ) {
    $this->check_properties();
  }

  private function check_properties()
  {
    $isAPhoneNumber = preg_match("/^\d{10,12}$/", $this->phoneNumber);

    try {
      if (strlen($this->curp) !== 18) {
        throw new Exception("Bad Curp");
      }
      if (!$isAPhoneNumber) {
        throw new Exception("Bad phone number");
      }
    } catch (\Throwable $th) {
      throw new Exception($th->getMessage());
    }
  }

  public function post_user(): int
  {
    try {
      $db = new Database();
      $connection = $db->connect_to_db();

      $stmt = $connection->prepare("INSERT INTO Cliente(nombre_Cliente, apellidos_Cliente, curp, telefono, direccion) VALUES (?, ?, ?, ?, ?)");
      $stmt->execute([$this->name, $this->lastname, $this->curp, $this->phoneNumber, $this->address]);
      $result = $stmt->insert_id;
      return $result;
    } catch (\Throwable $th) {
      return $th;
    }
  }

  public static function get_user(int $id_user): array
  {
    $db = new Database();
    $connection = $db->connect_to_db();
    $rows = [];

    $stmt = $connection->prepare("SELECT * FROM Cliente WHERE id_Cliente = ?");
    $stmt->bind_param("d", $id_user);
    $stmt->execute();
    $result = $stmt->get_result();

    foreach ($result as $user) {
      array_push($rows, $user);
    }

    return $rows;
  }
}
