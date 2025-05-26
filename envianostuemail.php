<?php
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["subscribe-news"])) {
    $to = "info@foxstudio.com.ar";
    $subject = "Contacto";
    $email = filter_var($_POST["subscribe-news"], FILTER_SANITIZE_EMAIL);
    $message = "Contacto: $email";
    $headers = "From: no-reply@foxstudio.com.ar";

    if (mail($to, $subject, $message, $headers)) {
        header("Location: index.php?email=ok");
    } else {
        header("Location: index.php?email=error");
    }
}
?>
