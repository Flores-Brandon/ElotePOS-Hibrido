<?php
// 1. Permitir que cualquiera entre (O puedes poner http://localhost:4200)
header("Access-Control-Allow-Origin: *");

// 2. Permitir los métodos que usaremos (GET para leer, POST/PUT para editar)
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

// 3. Permitir cabeceras especiales (como Content-Type para JSON)
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

// 4. MANEJO DEL "PREFLIGHT" (La pregunta antes de entrar)
// Cuando Angular intenta conectar, primero manda una petición tipo "OPTIONS" para ver si hay permiso.
// Si es OPTIONS, le decimos "Sí, pásale" y matamos el script ahí para que no intente conectarse a la BD.
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}
?>