<?php
    define('ROOT_PATH', dirname(dirname(__DIR__)));
    // create
    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        $image = $_FILES['image'];
        $dir = $_POST['dir'];
        $name = $_POST['name'];

        // TODO 例外処理

        // TODO サイズ変更

        $res = move_uploaded_file($image['tmp_name'], ROOT_PATH.$dir.$name);

        header('Content-Type: application/json');
        echo json_encode(array('result' => $res, 'path' => $dir.$name));
        exit;
    }
?>
