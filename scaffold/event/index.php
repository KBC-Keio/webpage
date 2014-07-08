<?php
    define('ROOT_PATH', dirname(dirname(__DIR__)));
    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        $file = ROOT_PATH.$_POST['datafile'];
        $index = intval($_POST['index']);
        $name = $_POST['name'];
        $image = $_POST['image'];
        $description = $_POST['description'];
        $year = intval($_POST['year']);
        $month = intval($_POST['month']);
        $day = intval($_POST['day']);
        $hour = intval($_POST['hour']);
        $minute = intval($_POST['minute']);
        $details = json_decode($_POST['details']);
        $button_url = $_POST['button_url'];
        $button_text = $_POST['button_text'];

        // TODO 例外処理

        $handle = fopen($file, 'r');
        $event_data = json_decode(fread($handle, filesize($file)));
        fclose($handle);

        $new = array(
            'name' => $name,
            'image' => $image,
            'description' => $description,
            'timelimit' => array(
                'year' => $year,
                'month' => $month,
                'day' => $day,
                'hour' => $hour,
                'minute' => $minute
            )
        );
        if(count($details) > 0){
            $new = array_merge($new, array(
                'details' => $details
            ));
        }
        if(!empty($button_url)){
            $new = array_merge($new, array(
                'button' => array(
                    'url' => $button_url,
                    'text' => $button_text
                )));
        }

        if($index){
            // update
            $event_data[$index - 1] = $new;
        } else{
            // create
            array_unshift($event_data, $new);
        }

        $handle = fopen($file, 'w');
        fwrite($handle, json_encode($event_data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));
        fclose($handle);

        exec('cd ..; ./gitpush');

        header('Location: /scaffold/event/');
        exit;
    }
?>
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>Event Scaffold | KBC実行委員会</title>
    <meta name="description" content="イベント情報ページの内容を編集するためのページです。" />
    <link rel="shortcut icon" type="image/vnd.microsoft.icon" href="/img/logo/kbc_fabicon.ico" />
    <meta name="keywords" content="慶應義塾,慶応義塾,スタートアップ,ベンチャー,起業,KBC,ビジネスコンテスト,シードアクセラレーター" />
    <meta name="copyright" content="KBC実行委員会" />
    <link rel="stylesheet" type="text/css" href="/lib/bootstrap/css/bootstrap.min.css" />
    <link rel="stylesheet" type="text/css" href="/lib/kbc-bootstrap/css/kbc-bootstrap.css" />
    <link rel="stylesheet" type="text/css" href="/shared/css/event.css" />
    <link rel="stylesheet" type="text/css" href="index.css" />
    <script type="text/javascript" src="/lib/jquery/jquery-1.10.2.min.js"></script>
    <script type="text/javascript" src="/lib/bootstrap/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="/lib/kbc-bootstrap/js/kbc-bootstrap.js"></script>
    <script type="text/javascript" src="/shared/js/event.js"></script>
    <script type="text/javascript" src="index.js"></script>
    <script type="text/javascript">
        $(function(){
            kbc.view.setCallback(function(config){
                kbc.scaffoldEventIndex.initialize($('#events-edit-field'), '/data/event-' + config.generation + '.json');
            });
        });
    </script>
</head>
<body>
<div class="kbc-body">
    <!-- Navigation bar -->
    <div class="kbc-navbar"></div>

    <!-- Bread crumb -->
    <div class="kbc-breadcrumb">
        <ul class="breadcrumb">
            <li><a href="/">ホーム</a></li>
            <li><a href="/scaffold/">SCAFFOLD</a></li>
            <li class="active">Event Scaffold</li>
        </ul>
    </div>

    <!-- Main Contents -->
    <div class="kbc-main">
        <div class="kbc-container">
            <div class="kbc-sidemenu"></div>
            <div class="kbc-container-inner">

                <h2 class="caption-black headline">Event Scaffold</h2>
                <p>このページではイベント情報ページのイベントカードを更新することができます。</p>

                <div class="center-align">
                    <a href="new.php" class="btn btn-primary">新しいイベントを追加する</a>
                </div>

                <h3 class="caption-black headline">イベントの編集・削除</h3>
                <div id="events-edit-field"></div>

            </div>
        </div>
    </div>

    <!-- Footer -->
    <div class="kbc-footer"></div>
</div>
</body>
</html>
