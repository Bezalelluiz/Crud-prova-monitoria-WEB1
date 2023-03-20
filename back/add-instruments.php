<?php
    require('conn.php');
    
    $name = $_POST['name'];
    $model = $_POST['model'];
    $price = $_POST['price'];
    $user_id = $_POST['user_id'];
    
    var_dump($user_id);
    $conn->query("INSERT INTO instruments (name, model, price, user_id) VALUES ('$name', '$model', '$price', '$user_id')");
    
    header('Access-Control-Allow-Origin: *');
    http_response_code(201);
?>