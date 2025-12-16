<?php
require_once __DIR__ . '/../config/Database.php';
require_once __DIR__ . '/../models/Producto.php';

class ProductoController {
    public function index() {
        $database = new Database();
        $db = $database->getConnection();

        $productoModel = new Producto($db);
        $datos = $productoModel->obtenerTodos();

        // Limpieza de caracteres (UTF-8)
        $dataLimpia = [];
        foreach($datos as $row) {
            $dataLimpia[] = array_map('utf8_encode', $row);
        }

        echo json_encode($dataLimpia);
    }
}
?>