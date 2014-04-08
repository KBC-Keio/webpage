<?php
    // create
    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        $image = $_FILES['image'];
        $name = $_POST['name'];
        $dir = $_POST['dir'];

        $res = move_uploaded_file($image['tmp_name'], $_SERVER['DOCUMENT_ROOT'].$dir.$name);

        header('Content-Type: application/json');
        echo json_encode(array('result' => $res, 'path' => $dir.$name));
        exit;
    }
?>
