/*
 * title       : KBC Bootstrap Configuration
 * description : KBC Bootstrapのための構成ファイル。全てのHTMLページで読み込みます。このファイルは必要に応じて書き換えるべきですが、JavaScriptおよびjQueryを十分に理解している、あるいは書き換え方を引き継がれているメンバーのみがこの書き換えを行ってください。
 * dependency  : jQuery 1.10.2, Twitter Bootstrap 3.0.0, KBC Bootstrap 1.0.0
 * version     : 1.0.0
 * date        : 2013年10月31日
 * author      : 第9期実行委員 出水厚輝
 */
var configuration = {
    navbar: {
        elem: ".kbc-navbar",
        opts: {
            logoSrc: "/img/logo/logo_white.png",
            sns: [
                '<a href="https://twitter.com/share" class="twitter-share-button" data-url="http://keio-contest.org" data-via="KBC_Keio" data-lang="ja" data-related="KBC_Keio">ツイート</a>'
            ],
            nav: [
                { url: "/about.html", text: "KBC実行委員会とは" },
                { url: "/event/index.html", text: "イベント情報" },
                { url: "/sponsorship.html", text: "スポンサーシップ" },
            ]
        }
    },
    footer: {
        elem: ".kbc-footer",
        opts: {
            year: "2013",
            nav: [
                { url: "/index.html", text: "トップページ" },
                { url: "/index.html", text: "お問い合わせ" },
                { url: "/index.html", text: "サイトマップ" },
            ]
        }
    },
    slide: "#main-slide",
    sidemenu: {
        elem: ".kbc-sidemenu",
        headline: "h2.headline,h3.headline"
    }
}

$(function(){
    kbc.view.initialize(configuration);
});
