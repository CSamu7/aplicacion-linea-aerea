<?php
require_once "/var/www/api/app/database/Reservation.php";

class ReservationController
{
  public static function postReservation()
  {
    $data = Flight::request()->data;

    $reservation = new Reservation($data["idFlight"], $data["idClient"], $data["passengers"]);

    $response = $reservation->create_reservation();

    echo json_encode($response);
  }
}
