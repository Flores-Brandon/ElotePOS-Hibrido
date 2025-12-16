<?php
// Configuración Global
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
require_once 'config/cors.php';

// Router Básico
// La URL será tipo: localhost/backend/index.php?route=kpis

$route = isset($_GET['route']) ? $_GET['route'] : '';

switch ($route) {
    case 'productos':
        require_once 'controllers/ProductoController.php';
        $controller = new ProductoController();
        $controller->index();
        break;

    case 'kpis':
        require_once 'controllers/KpiController.php';
        $controller = new KpiController();
        $controller->index();
        break;

    default:
        http_response_code(404);
        echo json_encode(["mensaje" => "Ruta no encontrada"]);
        break;
}
?>