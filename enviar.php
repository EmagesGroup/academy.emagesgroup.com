<?php

// SOLO PERMITIR POST
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(403);
    exit("Acceso no permitido.");
}

// ANTI-SPAM (HONEYPOT)
if (!empty($_POST["website"])) {
    exit("Spam detectado.");
}

// VALIDAR CAMPOS
if (
    empty($_POST["nombre"]) ||
    empty($_POST["email"]) ||
    empty($_POST["telefono"]) ||
    empty($_POST["escuela"])
) {
    http_response_code(400);
    exit("Faltan datos.");
}

// LIMPIAR DATOS
$nombre   = strip_tags(trim($_POST["nombre"]));
$email    = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
$telefono = strip_tags(trim($_POST["telefono"]));
$escuela  = strip_tags(trim($_POST["escuela"]));

// VALIDAR EMAIL
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    exit("Correo inválido.");
}

// CONFIGURACIÓN
$to = "academy@emagesgroup.com";
$subject = "Nueva inscripción - EMAGES Academy";

// MENSAJE
$message = "Nueva inscripción recibida:\n\n";
$message .= "Nombre: $nombre\n";
$message .= "Correo: $email\n";
$message .= "Teléfono: $telefono\n";
$message .= "Escuela: $escuela\n";
$message .= "Fecha: " . date("d/m/Y H:i:s") . "\n";

// CABECERAS
$headers = "From: EMAGES Academy <no-reply@emagesgroup.com>\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// ENVIAR
if (mail($to, $subject, $message, $headers)) {
    echo "OK";
} else {
    http_response_code(500);
    echo "ERROR";
}

?>
