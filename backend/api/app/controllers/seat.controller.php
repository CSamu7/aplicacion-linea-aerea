<?php

require_once "/var/www/api/app/database/SeatModel.php";

class SeatController
{
  public static function getSeats(int $id)
  {
    $seat = new SeatModel($id);
    $data = $seat->getSeats();

    echo json_encode($data);
  }

  public static function changeStateSeat()
  {
  }
}
