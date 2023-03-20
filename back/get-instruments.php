<?php

    require 'conn.php';

    $userId = $_GET['user_id'];

    $result = $conn->query("SELECT * FROM instruments WHERE user_id = $userId");
    $data = $result->fetchAll(PDO::FETCH_ASSOC);

    header('Access-Control-Allow-Origin: *');
    
    echo json_encode($data);
