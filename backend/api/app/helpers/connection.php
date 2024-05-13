<?php

declare(strict_types=1);
session_start();

class Database
{
  private $hostname = 'localhost';
  private $username = 'samu';
  private $password = 'Rootuser12$';
  private $database = "Aerolinea";

  public function connect_to_db(): mysqli
  {
    return mysqli_connect($this->hostname, $this->username, $this->password, $this->database);
  }
}
