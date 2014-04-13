<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>ニュースの編集 | KBC実行委員会</title>
    <meta name="description" content="トップページにあるニュースの内容を編集するためのページです。" />
    <link rel="shortcut icon" type="image/vnd.microsoft.icon" href="/img/logo/kbc_fabicon.ico" />
    <meta name="keywords" content="慶應義塾,慶応義塾,スタートアップ,ベンチャー,起業,KBC,ビジネスコンテスト,シードアクセラレーター" />
    <meta name="copyright" content="KBC実行委員会" />
    <link rel="stylesheet" type="text/css" href="/lib/bootstrap/css/bootstrap.min.css" />
    <link rel="stylesheet" type="text/css" href="/lib/kbc-bootstrap/css/kbc-bootstrap.css" />
    <link rel="stylesheet" type="text/css" href="/css/index.css" />
    <link rel="stylesheet" type="text/css" href="/css/scaffold/news/edit.css" />
    <link rel="stylesheet" type="text/css" href="/css/scaffold/form.css" />
    <script type="text/javascript" src="/lib/jquery/jquery-1.10.2.min.js"></script>
    <script type="text/javascript" src="/lib/bootstrap/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="/lib/kbc-bootstrap/js/kbc-bootstrap.js"></script>
    <script type="text/javascript" src="/js/news.js"></script>
    <script type="text/javascript" src="/js/scaffold/news/edit.js"></script>
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
            <li class="active">ニュースの編集</li>
        </ul>
    </div>

    <!-- Main Contents -->
    <div class="kbc-main">
        <div class="kbc-container">
            <div class="kbc-sidemenu"></div>
            <div class="kbc-container-inner">

                <h2 class="caption-black headline">ニュースの編集</h2>

                <form method="POST" action="/scaffold/news/index.php">
                    <h4>ニュースタイトル</h4>
                    <input type="text" name="title" id="title" />

                    <h4>ニュース更新日</h4>
                    <label><input type="number" name="year" />年</label>
                    <label><input type="number" name="month" />月</label>
                    <label><input type="number" name="day" />日</label>

                    <h4>ニュース内容</h4>
                    <textarea name="content"></textarea>

                    <h4>サムネイル</h4>
                    <div class="file">
                        <span>ファイルを選択</span>
                        <input type="file" />
                    </div>
                    <label id="file-name">
                        アップロード時のファイル名
                        <input type="text" />
                        <input type="hidden" name="image-path" />
                    </label>

                    <input type="button" value="プレビュー" class="btn btn-success" />
                    <div id="news-preview" class="hide"></div>
                    <input type="submit" value="新しいニュースの追加" class="btn btn-primary hide" />
                </form>

            </div>
        </div>
    </div>

    <!-- Footer -->
    <div class="kbc-footer"></div>
</div>
</body>
</html>
