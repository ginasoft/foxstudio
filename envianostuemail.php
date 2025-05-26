<?php
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["subscribe-news"])) {
    $to = "info@foxstudio.com.ar"; // tu mail destino
    $subject = "Nuevo suscriptor";
    $email = filter_var($_POST["subscribe-news"], FILTER_SANITIZE_EMAIL);
    $message = "Nuevo suscriptor: $email";
    $headers = "From: no-reply@foxstudio.com.ar";

    if (mail($to, $subject, $message, $headers)) {
        echo "Gracias por dejarnos tu e-mail. A la brevedad nos contactaremos para enviarte más información.";
    } else {
        echo "Error al enviar el mensaje.";
    }
}
?>
