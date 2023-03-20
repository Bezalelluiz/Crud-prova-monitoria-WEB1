<?php
    require('conn.php');
    
    $username = $_POST['username'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    
    $conn->query("INSERT INTO users (username, password, email) VALUES ('$username', '$password', '$email')");
    
    header('Access-Control-Allow-Origin: *');
    http_response_code(201, $email);
?>