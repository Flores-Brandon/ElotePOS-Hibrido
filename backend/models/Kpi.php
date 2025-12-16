<?php
class Kpi {
    private $conn;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function obtenerEstadisticas() {
        // 1. Datos Locales (SQL Server)
        $sqlLocal = "SELECT COUNT(*) as total, AVG(PrecioVenta) as promedio FROM Productos";
        $stmt = $this->conn->prepare($sqlLocal);
        $stmt->execute();
        $stats = $stmt->fetch(PDO::FETCH_ASSOC);

        // 2. Top Producto
        $sqlTop = "SELECT TOP 1 Nombre, PrecioVenta FROM Productos ORDER BY PrecioVenta DESC";
        $stmtTop = $this->conn->prepare($sqlTop);
        $stmtTop->execute();
        $top = $stmtTop->fetch(PDO::FETCH_ASSOC);

        // 3. Ventas (MySQL vía Linked Server)
        // Ventas Hoy
        $sqlHoy = "SELECT * FROM OPENQUERY(MYSQL_LINK, 'SELECT SUM(TotalVenta) as total_hoy FROM ventas WHERE DATE(FechaHora) = CURDATE()')";
        $stmtHoy = $this->conn->prepare($sqlHoy);
        $stmtHoy->execute();
        $ventasHoy = $stmtHoy->fetch(PDO::FETCH_ASSOC);

        // Gráfica Semanal
        $sqlGraf = "SELECT * FROM OPENQUERY(MYSQL_LINK, 'SELECT DATE(FechaHora) as fecha, SUM(TotalVenta) as total FROM ventas WHERE FechaHora >= DATE_SUB(CURDATE(), INTERVAL 6 DAY) GROUP BY DATE(FechaHora) ORDER BY fecha ASC')";
        $stmtGraf = $this->conn->prepare($sqlGraf);
        $stmtGraf->execute();
        $grafica = $stmtGraf->fetchAll(PDO::FETCH_ASSOC);

        // Empaquetar todo
        return [
            "total_productos" => $stats['total'],
            "precio_promedio" => number_format($stats['promedio'], 2),
            "producto_top"    => $top ? utf8_encode($top['Nombre']) : "N/A",
            "precio_top"      => $top ? $top['PrecioVenta'] : 0,
            "ventas_hoy"      => $ventasHoy && $ventasHoy['total_hoy'] ? $ventasHoy['total_hoy'] : 0,
            "grafica"         => $grafica
        ];
    }
}
?>