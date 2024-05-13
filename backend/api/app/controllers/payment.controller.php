<?php
require_once "/var/www/api/app/database/CreditCardModel.php";

class PaymentController
{
  public static function postPayment()
  {
    $data = Flight::request()->data;
    $date = DateTime::createFromFormat("Y-m", $data["expirationDate"]);

    $creditCard = new CreditCardModel($data["idClient"], $data["name"], $data["lastname"], $data["cardType"], $data["cardNumber"], $data["cvv"], $date->format("Y-m-d"));

    $receivedData = $creditCard->postCreditCard();

    echo json_encode($receivedData);
  }
}
