<?php
require_once $_SERVER["DOCUMENT_ROOT"] . "/vendor/autoload.php";
require_once $_SERVER["DOCUMENT_ROOT"] . "/controllers/airport.controller.php";

header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");;

$dispatcher = FastRoute\simpleDispatcher(function (FastRoute\RouteCollector $r) {
  $r->addRoute("GET", "/airport", AirportController::getAirport());
  $r->addRoute("GET", "/flight", FlightController::getFlights() )
});

$httpMethod = $_SERVER['REQUEST_METHOD'];
$uri = $_SERVER['REQUEST_URI'];

// Strip query string (?foo=bar) and decode URI
if (false !== $pos = strpos($uri, '?')) {
  $uri = substr($uri, 0, $pos);
}
$uri = rawurldecode($uri);

$routeInfo = $dispatcher->dispatch($httpMethod, $uri);
switch ($routeInfo[0]) {
  case FastRoute\Dispatcher::NOT_FOUND:
    echo "Not found";
    break;
  case FastRoute\Dispatcher::METHOD_NOT_ALLOWED:
    $allowedMethods = $routeInfo[1];
    // ... 405 Method Not Allowed
    break;
  case FastRoute\Dispatcher::FOUND:
    $handler = $routeInfo[1];
    $vars = $routeInfo[2];


    echo $handler;
    break;
}
