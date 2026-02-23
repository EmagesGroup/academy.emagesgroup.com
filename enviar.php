<?php
if($_POST){

    $to = "academy@emagesgroup.com";
    $subject = "Nueva inscripción - EMAGES Academy";

    $nombre = htmlspecialchars($_POST['nombre']);
    $email = htmlspecialchars($_POST['email']);
    $telefono = htmlspecialchars($_POST['telefono']);
    $escuela = htmlspecialchars($_POST['escuela']);
    $mensajeExtra = htmlspecialchars($_POST['mensaje']);

    $message = "Has recibido una nueva inscripción:\n\n";
    $message .= "Nombre: $nombre\n";
    $message .= "Correo: $email\n";
    $message .= "Teléfono: $telefono\n";
    $message .= "Escuela: $escuela\n";
    $message .= "Mensaje adicional: $mensajeExtra\n";

    $headers = "From: no-reply@emagesgroup.com\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    if(mail($to, $subject, $message, $headers)){
        echo "<h2 style='font-family:Arial;text-align:center;margin-top:80px;color:#F57C00;'>¡Inscripción enviada correctamente!</h2>
              <p style='text-align:center;'>Te contactaremos pronto.</p>";
    } else {
        echo "<h2 style='font-family:Arial;text-align:center;margin-top:80px;color:red;'>Error al enviar. Intenta nuevamente.</h2>";
    }
}
?>
