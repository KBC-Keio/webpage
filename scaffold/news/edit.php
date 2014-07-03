<!DOCTYPE html>
<html lang="ja" ng-app="ScaffoldNews">
<head>
    <meta charset="UTF-8">
    <title>ニュースの編集 | KBC実行委員会</title>
    <meta name="description" content="トップページにあるニュースの内容を編集するためのページです。" />
    <link rel="shortcut icon" type="image/vnd.microsoft.icon" href="/img/logo/kbc_fabicon.ico" />
    <meta name="keywords" content="慶應義塾,慶応義塾,スタートアップ,ベンチャー,起業,KBC,ビジネスコンテスト,シードアクセラレーター" />
    <meta name="copyright" content="KBC実行委員会" />
    <link rel="stylesheet" type="text/css" href="/lib/bootstrap/css/bootstrap.min.css" />
    <link rel="stylesheet" type="text/css" href="/lib/kbc-bootstrap/css/kbc-bootstrap.css" />
    <link rel="stylesheet" type="text/css" href="/shared/css/form.css" />
    <link rel="stylesheet" type="text/css" href="edit.css" />
    <script type="text/javascript" src="/lib/jquery/jquery-1.10.2.min.js"></script>
    <script type="text/javascript" src="/lib/bootstrap/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="/lib/angularjs/angular.min.js"></script>
    <script type="text/javascript" src="/lib/kbc-bootstrap/js/kbc-bootstrap.js"></script>
    <script type="text/javascript" src="/shared/js/news.js"></script>
    <script type="text/javascript" src="/shared/js/kbc-scaffold.js"></script>
    <script type="text/javascript" src="kbc-news-scaffold.js"></script>
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
            <li><a href="/scaffold/news/">News Scaffold</a></li>
            <li class="active">ニュースの編集</li>
        </ul>
    </div>

    <!-- Main Contents -->
    <div class="kbc-main">
        <div class="kbc-container">
            <div class="kbc-sidemenu"></div>
            <div class="kbc-container-inner">

                <h2 class="caption-black headline">ニュースの編集</h2>

                <form method="POST" action="{{ '/scaffold/news/index.php#?index=' + index }}" name="form"
                    ng-controller="FormController">

                    <input type="hidden" name="index" ng-value="index + 1" />
                    <?php include __DIR__.'/_form.php' ?>

                    <input type="hidden" name="image" ng-value="news.image" />
                    <p>※ 現在のバージョンではサムネイルを変更することはできません。</p>
                    <!-- Preview field -->
                    <div id="news-preview" ng-show="form.$valid">
                        {{ news | preview }}
                    </div>

                    <input type="submit" value="ニュースを編集" class="btn btn-primary"
                        ng-disabled="form.$invalid" />

                </form>

            </div>
        </div>
    </div>

    <!-- Footer -->
    <div class="kbc-footer"></div>
</div>
</body>
</html>
