<?php
class Database {
    // Recuerda cambiar esto por la IP cuando pases a Linux
    private $serverName = "BRANDONFLORES\\SQLEXPRESS"; 
    private $database = "proyeectoSQLSERVER"; 
    private $username = "brandonf"; 
    private $password = "TU_CONTRASEÑA_AQUI"; 
    public $conn;

    public function getConnection() {
        $this->conn = null;
        try {
            $dsn = "sqlsrv:Server=" . $this->serverName . ";Database=" . $this->database . ";TrustServerCertificate=true";
            $this->conn = new PDO($dsn, $this->username, $this->password);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch(PDOException $e) {
            echo "Error de conexión: " . $e->getMessage();
        }
        return $this->conn;
    }
}
?>