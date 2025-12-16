<?php
require_once __DIR__ . '/../config/Database.php';
require_once __DIR__ . '/../models/Kpi.php';

class KpiController {
    public function index() {
        $database = new Database();
        $db = $database->getConnection();

        $kpiModel = new Kpi($db);
        $datos = $kpiModel->obtenerEstadisticas();

        // Separar lógica de la gráfica para el JSON final
        $fechas = [];
        $totales = [];
        foreach($datos['grafica'] as $g) {
            $fechas[] = $g['fecha'];
            $totales[] = $g['total'];
        }
        unset($datos['grafica']); // Quitamos el array crudo
        
        $datos['grafica_fechas'] = $fechas;
        $datos['grafica_totales'] = $totales;

        echo json_encode($datos);
    }
}
?>