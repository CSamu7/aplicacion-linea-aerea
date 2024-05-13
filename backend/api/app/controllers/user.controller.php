<?php
require_once "/var/www/api/app/database/User.php";

class UserController
{
  public static function postUser()
  {
    try {
      $data = Flight::request()->data;
      $idClients = [];

      foreach ($data as $info) {
        $user = new User($info["name"], $info["lastname"], $info["phoneNumber"], $info["curp"], $info["address"]);
        array_push($idClients, $user->post_user());
      }

      echo json_encode($idClients);
    } catch (\Throwable $th) {
      echo json_encode(["msg" => $th]);
    }
  }

  public static function getUser(int $id)
  {
    try {
      $user = User::get_user($id);
      $row = [];

      foreach ($user as $data) {
        $json = new stdClass;
        $json->name = $data["nombre_Cliente"];
        $json->lastname = $data["apellidos_Cliente"];
        $json->curp = $data["curp"];
        $json->phoneNumber = $data["telefono"];
        $json->address = $data["direccion"];

        array_push($row, $json);
      }

      echo json_encode($row);
    } catch (\Throwable $th) {
      echo json_encode(["msg" => $th->getMessage()]);
    }
  }
}
