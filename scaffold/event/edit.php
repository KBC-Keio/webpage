<!DOCTYPE html>
<html lang="ja" ng-app="kbcScaffoldEvent">
<head>
    <meta charset="UTF-8">
    <title>イベントの編集 | KBC実行委員会</title>
    <meta name="description" content="イベント情報ページの内容を編集するためのページです。" />
    <link rel="shortcut icon" type="image/vnd.microsoft.icon" href="/img/logo/kbc_fabicon.ico" />
    <meta name="keywords" content="慶應義塾,慶応義塾,スタートアップ,ベンチャー,起業,KBC,ビジネスコンテスト,シードアクセラレーター" />
    <meta name="copyright" content="KBC実行委員会" />
    <link rel="stylesheet" type="text/css" href="/lib/bootstrap/css/bootstrap.min.css" />
    <link rel="stylesheet" type="text/css" href="/lib/kbc-bootstrap/css/kbc-bootstrap.css" />
    <link rel="stylesheet" type="text/css" href="/shared/css/form.css" />
    <link rel="stylesheet" type="text/css" href="/shared/css/event.css" />
    <script type="text/javascript" src="/lib/jquery/jquery-1.10.2.min.js"></script>
    <script type="text/javascript" src="/lib/bootstrap/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="/lib/angularjs/angular.min.js"></script>
    <script type="text/javascript" src="/lib/kbc-bootstrap/js/kbc-bootstrap.js"></script>
    <script type="text/javascript" src="/shared/js/event.js"></script>
    <script type="text/javascript" src="/shared/js/kbc-scaffold.js"></script>
    <script type="text/javascript" src="kbc-event-scaffold.js"></script>
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
            <li><a href="/scaffold/event/">Event Scaffold</a></li>
            <li class="active">新しいイベントの追加</li>
        </ul>
    </div>

    <!-- Main Contents -->
    <div class="kbc-main">
        <div class="kbc-container">
            <div class="kbc-sidemenu"></div>
            <div class="kbc-container-inner">

                <h2 class="caption-black headline">イベントの編集</h2>

                <form name="form" method="POST" action="/scaffold/event/index.php" ng-init="init()" ng-controller="EditController" kbc-form-submit="submit">

                    <input type="hidden" name="datafile" ng-value="event.datafile" />
                    <input type="hidden" name="index" ng-value="event.index + 1" />

                    <h4>イベント名</h4>
                    <input type="text" name="name" ng-model="event.name" required />
                    
                    <h4>イベント終了日時</h4>
                    <label>
                        <input type="number" name="year" ng-pattern="/^[0-9]*$/" ng-model="event.timelimit.year" required />
                        年
                    </label>
                    <label>
                        <input type="number" name="month" ng-pattern="/^[0-9]*$/" ng-model="event.timelimit.month" required />
                        月
                    </label>
                    <label>
                        <input type="number" name="day" ng-pattern="/^[0-9]*$/" ng-model="event.timelimit.day" required />
                        日
                    </label>
                    <label>
                        <input type="number" name="hour" ng-pattern="/^[0-9]*$/" ng-model="event.timelimit.hour" required />
                        時
                    </label>
                    <label>
                        <input type="number" name="minute" ng-pattern="/^[0-9]*$/" ng-model="event.timelimit.minute" required />
                        分
                    </label>
                    
                    <h4>イベント紹介文</h4>
                    <textarea name="description" ng-model="event.description" required></textarea>

                    <h4>サムネイル</h4>
                    <div class="file">
                        画像を選択
                        <input type="file" kbc-file-loader="load" />
                    </div>
                    <input type="hidden" name="image" ng-value="imagePath" />

                    <h4>イベント詳細</h4>
                    <table ng-show="event.details.length > 0">
                        <thead>
                            <tr>
                                <th>項目名</th>
                                <th>内容</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr ng-repeat="d in details">
                                <td><input type="text" ng-model="d.title" /></td>
                                <td><input type="text" ng-model="d.content" /></td>
                                <td><button class="btn btn-sm btn-danger" ng-click="deleteDetail($index)">削除</button></td>
                            </tr>
                        </tbody>
                    </table>
                    <input type="hidden" name="details" ng-value="event.details | json" />
                    <input type="button" class="btn btn-sm btn-success" value="項目を追加" ng-click="addDetails()" />

                    <h4>リンクボタン</h4>
                    <div ng-show="event.button">
                        リンク先URL
                        <input name="button_url" type="text" ng-model="event.button.url" />
                    </div>
                    <div ng-show="event.button">
                        リンクテキスト
                        <input name="button_text" type="text" ng-model="event.button.text" />
                    </div>
                    <input type="button" class="btn btn-sm btn-success" ng-value="addLinkText" ng-click="toggleLink()" />

                    <!-- Preview field -->
                    <div id="event-preview" ng-show="form.$valid" event-preview></div>

                    <input type="submit" value="イベントの編集" class="btn btn-primary" ng-disabled="form.$invalid" />

                </form>

            </div>
        </div>
    </div>

    <!-- Footer -->
    <div class="kbc-footer"></div>
</div>
</body>
</html>
