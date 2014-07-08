<?php
    define('ROOT_PATH', dirname(dirname(__DIR__)));
    // delete
    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        $file = ROOT_PATH.$_POST['datafile'];
        $index = $_POST['index'];

        // TODO 例外処理

        $handle = fopen($file, 'r');
        $event_data = json_decode(fread($handle, filesize($file)));
        fclose($handle);

        unset($event_data[$index]);
        $event_data = array_values($event_data);

        $handle = fopen($file, 'w');
        fwrite($handle, json_encode($event_data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));
        fclose($handle);

        exec('cd ..; ./gitpush');

        header('Location: /scaffold/event/');
        exit;
    }
?>
