<?php
    define('ROOT_PATH', dirname(dirname(__DIR__)));
    // create
    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        $title = $_POST['title'];
        $year = intval($_POST['year']);
        $month = intval($_POST['month']);
        $day = intval($_POST['day']);
        $description = $_POST['description'];
        $image = $_POST['image'];

        // TODO 例外処理

        $file = ROOT_PATH.'/data/news.json';

        $handle = fopen($file, 'r');
        $news_data = json_decode(fread($handle, filesize($file)));
        fclose($handle);

        array_unshift($news_data->news, array(
            'title' => $title,
            'date' => array(
                'year' => $year,
                'month' => $month,
                'day' => $day
            ),
            'image' => $image,
            'description' => $description
        ));
        $handle = fopen($file, 'w');
        fwrite($handle, json_encode($news_data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));
        fclose($handle);

        var_dump(exec('cd ..; ./gitpush'));

        header('Location: /scaffold/news/');
        exit;
    }
?>
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>News Scaffold | KBC実行委員会</title>
    <meta name="description" content="トップページにあるニュースの内容を編集するためのページです。" />
    <link rel="shortcut icon" type="image/vnd.microsoft.icon" href="/img/logo/kbc_fabicon.ico" />
    <meta name="keywords" content="慶應義塾,慶応義塾,スタートアップ,ベンチャー,起業,KBC,ビジネスコンテスト,シードアクセラレーター" />
    <meta name="copyright" content="KBC実行委員会" />
    <link rel="stylesheet" type="text/css" href="/lib/bootstrap/css/bootstrap.min.css" />
    <link rel="stylesheet" type="text/css" href="/lib/kbc-bootstrap/css/kbc-bootstrap.css" />
    <link rel="stylesheet" type="text/css" href="/css/index.css" />
    <link rel="stylesheet" type="text/css" href="/css/scaffold/news/index.css" />
    <script type="text/javascript" src="/lib/jquery/jquery-1.10.2.min.js"></script>
    <script type="text/javascript" src="/lib/bootstrap/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="/lib/kbc-bootstrap/js/kbc-bootstrap.js"></script>
    <script type="text/javascript" src="/js/news.js"></script>
    <script type="text/javascript" src="/js/scaffold/news/index.js"></script>
    <script type="text/javascript">
        $(function(){
            $.getJSON('/data/news.json', function(config){
                kbc.scaffoldNewsIndex.initialize($('#news-edit-table'), config.news);
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
            <li class="active">News Scaffold</li>
        </ul>
    </div>

    <!-- Main Contents -->
    <div class="kbc-main">
        <div class="kbc-container">
            <div class="kbc-sidemenu"></div>
            <div class="kbc-container-inner">

                <h2 class="caption-black headline">News Scaffold</h2>
                <p>このページではトップページ下部のニュース一覧を更新することができます。</p>

                <div class="center-align">
                    <a href="new.php" class="btn btn-primary">新しいニュースを追加する</a>
                </div>

                <h3 class="caption-black headline">ニュースの編集・削除</h3>
                <table id="news-edit-table"></table>

            </div>
        </div>
    </div>

    <!-- Footer -->
    <div class="kbc-footer"></div>
</div>
</body>
</html>
