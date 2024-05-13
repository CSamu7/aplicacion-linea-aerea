<?php
require_once "/var/www/api/app/controllers/airport.controller.php";
require_once "/var/www/api/app/controllers/flight.controller.php";
require_once "/var/www/api/app/controllers/user.controller.php";
require_once "/var/www/api/app/controllers/seat.controller.php";
require_once "/var/www/api/app/controllers/reservation.controller.php";
require_once "/var/www/api/app/controllers/payment.controller.php";
require_once "/var/www/api/app/controllers/boarding-card.controller.php";
require_once "/var/www/api/app/middleware/cors.php";

require "/var/www/api/vendor/autoload.php";
Flight::path(__DIR__ . '/../app/controllers/');

Flight::group("", function () {
  Flight::route("GET /airport", ['AirportController', 'getAirports']);

  Flight::route("OPTIONS|POST /flight", ['FlightController', 'getFlights']);
  Flight::route("GET /flight/@id", ['FlightController', 'getFlight']);

  Flight::route("GET /user/@id", ['UserController', 'getUser']);
  Flight::route("OPTIONS|POST /user", ['UserController', 'postUser']);

  Flight::route("GET /flight/@id/seat", ['SeatController', 'getSeats']);

  Flight::route("OPTIONS|POST /payment", ['PaymentController', 'postPayment']);

  Flight::route("OPTIONS|POST /reservation", ["ReservationController", "postReservation"]);

  Flight::route("OPTIONS|POST /boardingCard", ['BoardingCardController', 'postBoardingCard']);
}, [new CorsMiddleware()]);

Flight::start();
