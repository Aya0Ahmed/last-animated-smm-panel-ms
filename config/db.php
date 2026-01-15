<?php
$host = "localhost";
$user = "u516935426_aya";
$pass = "Aya@2026";
$db   = "u516935426_smmpanel";

$conn = mysqli_connect($host, $user, $pass, $db);

if (!$conn) {
  die("Database Connection Failed");
}
?>
