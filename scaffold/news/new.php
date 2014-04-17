<!DOCTYPE html>
<html lang="ja" ng-app="ScaffoldNews">
<head>
    <meta charset="UTF-8">
    <title>新しいニュースの追加 | KBC実行委員会</title>
    <meta name="description" content="トップページにあるニュースの内容を編集するためのページです。" />
    <link rel="shortcut icon" type="image/vnd.microsoft.icon" href="/img/logo/kbc_fabicon.ico" />
    <meta name="keywords" content="慶應義塾,慶応義塾,スタートアップ,ベンチャー,起業,KBC,ビジネスコンテスト,シードアクセラレーター" />
    <meta name="copyright" content="KBC実行委員会" />
    <link rel="stylesheet" type="text/css" href="/lib/bootstrap/css/bootstrap.min.css" />
    <link rel="stylesheet" type="text/css" href="/lib/kbc-bootstrap/css/kbc-bootstrap.css" />
    <link rel="stylesheet" type="text/css" href="/css/index.css" />
    <link rel="stylesheet" type="text/css" href="/css/scaffold/form.css" />
    <link rel="stylesheet" type="text/css" href="/css/scaffold/news/new.css" />
    <script type="text/javascript" src="/lib/jquery/jquery-1.10.2.min.js"></script>
    <script type="text/javascript" src="/lib/bootstrap/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="/lib/angularjs/angular.min.js"></script>
    <script type="text/javascript" src="/lib/angular-file-upload/angular-file-upload.min.js"></script>
    <script type="text/javascript" src="/lib/kbc-bootstrap/js/kbc-bootstrap.js"></script>
    <script type="text/javascript" src="/js/news.js"></script>
    <script type="text/javascript" src="/js/scaffold/news/new.js"></script>
    <script type="text/javascript">
        $(function(){
            kbc.scaffoldNewsNew.initialize();
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
            <li><a href="/scaffold/news/">News Scaffold</a></li>
            <li class="active">新しいニュースの追加</li>
        </ul>
    </div>

    <!-- Main Contents -->
    <div class="kbc-main">
        <div class="kbc-container">
            <div class="kbc-sidemenu"></div>
            <div class="kbc-container-inner">

                <h2 class="caption-black headline">新しいニュースの追加</h2>

                <form method="POST" action="/scaffold/news/index.php" name="form"
                    ng-controller="FormController">

                    <?php include __DIR__.'/_form.php' ?>
                    <input type="hidden" name="index" value="0" />

                    <h4>サムネイル</h4>
                    <div class="file">
                        <span>{{ imageName }}</span>
                        <input type="file" ng-file-select="onFileSelect($files)" />
                    </div>
                    <label id="file-name" ng-show="uploaded">
                        アップロード時のファイル名
                        <input type="text" ng-model="uploadName" />
                        <input type="hidden" name="image" />
                    </label>

                    <!-- Preview field -->
                    <div id="news-preview" ng-show="form.$valid">
                        {{ news | preview }}
                    </div>

                    <input type="submit" value="新しいニュースの追加" class="btn btn-primary"
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
