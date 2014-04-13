<?php
    // delete
    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        $index = $_POST['index'];

        // TODO 例外処理

        $file = $_SERVER['DOCUMENT_ROOT'].'/data/news.json';
        $handle = fopen($file, 'r');
        $news_data = json_decode(fread($handle, filesize($file)));
        fclose($handle);

        unset($news_data['news'][index]);

        $handle = fopen($file, 'w');
        fwrite($handle, json_encode($news_data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));
        fclose($handle);
    }
?>
