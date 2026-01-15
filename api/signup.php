<?php
include("../config/db.php");

$data = json_decode(file_get_contents("php://input"), true);

$name = $data['name'];
$email = $data['email'];
$password = password_hash($data['password'], PASSWORD_DEFAULT);

// تأكيد إن الإيميل مش متسجل قبل كده
$check = mysqli_prepare($conn, "SELECT id FROM users WHERE email = ?");
mysqli_stmt_bind_param($check, "s", $email);
mysqli_stmt_execute($check);
mysqli_stmt_store_result($check);

if (mysqli_stmt_num_rows($check) > 0) {
  echo json_encode(["success" => false, "message" => "Email already exists"]);
  exit;
}

// تسجيل المستخدم
$stmt = mysqli_prepare(
  $conn,
  "INSERT INTO users (name, email, password) VALUES (?, ?, ?)"
);
mysqli_stmt_bind_param($stmt, "sss", $name, $email, $password);
mysqli_stmt_execute($stmt);

echo json_encode([
  "success" => true,
  "user_id" => mysqli_insert_id($conn)
]);;
?>