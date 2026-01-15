<?php
include("../config/db.php");

$data = json_decode(file_get_contents("php://input"), true);

$email = $data['email'];
$password = $data['password'];

$stmt = mysqli_prepare(
  $conn,
  "SELECT id, password FROM users WHERE email = ?"
);
mysqli_stmt_bind_param($stmt, "s", $email);
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);

if ($user = mysqli_fetch_assoc($result)) {
  if (password_verify($password, $user['password'])) {
    echo json_encode([
      "success" => true,
      "user_id" => $user['id']
    ]);
  } else {
    echo json_encode(["success" => false, "message" => "Wrong password"]);
  }
} else {
  echo json_encode(["success" => false, "message" => "User not found"]);
}
mysqli_stmt_close($stmt);
mysqli_close($conn);    