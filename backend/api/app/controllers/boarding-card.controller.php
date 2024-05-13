<?php
require_once "/var/www/api/app/database/BoardingCardModel.php";

class BoardingCardController
{
  public static function postBoardingCard()
  {
    $data = Flight::request()->data;

    $boardingCard = new BoardingCardModel($data["idClient"], $data["idSeat"], $data["idReservation"], $data["idPlane"]);
    $result = $boardingCard->postBoardingCard();

    echo json_encode($result);
  }
}
