<!DOCTYPE html>
<html lang="ja" ng-app="kbcScaffoldNews">
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
            <li class="active">新しいニュースの追加</li>
        </ul>
    </div>

    <!-- Main Contents -->
    <div class="kbc-main">
        <div class="kbc-container">
            <div class="kbc-sidemenu"></div>
            <div class="kbc-container-inner">

                <h2 class="caption-black headline">ニュースの編集</h2>

                <form name="form" method="POST" action="/scaffold/news/index.php" ng-controller="EditController" ng-init="init()" kbc-form-submit="submit">

                    <input type="hidden" name="index" ng-value="news.index + 1" />

                    <h4>ニュースタイトル</h4>
                    <input type="text" name="title" ng-model="news.title" required />
                    
                    <h4>ニュース更新日</h4>
                    <label>
                        <input type="number" name="year" ng-pattern="/^[0-9]*$/" ng-model="news.date.year" required />
                        年
                    </label>
                    <label>
                        <input type="number" name="month" ng-pattern="/^[0-9]*$/" ng-model="news.date.month" required />
                        月
                    </label>
                    <label>
                        <input type="number" name="day" ng-pattern="/^[0-9]*$/" ng-model="news.date.day" required />
                        日
                    </label>
                    
                    <h4>ニュース内容</h4>
                    <textarea name="description" ng-model="news.description" required></textarea>
                    <h4>サムネイル</h4>
                    <div class="file">
                        画像を選択
                        <input type="file" kbc-file-loader="load" />
                    </div>
                    <input type="hidden" name="image" ng-value="imagePath" />

                    <!-- Preview field -->
                    <div id="news-preview" ng-show="form.$valid" news-preview></div>

                    <input type="submit" value="ニュースを編集" class="btn btn-primary" ng-disabled="form.$invalid" />

                </form>

            </div>
        </div>
    </div>

    <!-- Footer -->
    <div class="kbc-footer"></div>
</div>
</body>
</html>
