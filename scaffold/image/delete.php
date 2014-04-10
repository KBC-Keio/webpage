<?php
    // delete
    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        $dir = $_POST['dir'];
        $name = $_POST['name'];

        // TODO 例外処理

        $res = unlink($dir.$name);

        header('Content-Type: application/json');
        echo json_encode(array('result' => $res));
        exit;
    }
?>
