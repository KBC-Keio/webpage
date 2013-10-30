/*
 * title       : KBC Bootstrap
 * description : 初期化のためのJavaScriptコード群。全てのHTMLページで読み込みます。
 * dependency  : jQuery 1.10.2, Twitter Bootstrap 3.0.0
 * version     : 1.0.0
 * date        : 2013年10月30日
 * author      : 第9期実行委員 出水厚輝
 */

/*
 * HTMLの読み込み完了後に即時実行されるメソッド
 */
$(function(){
    kbc.view.initialize({
        navbar: {
            elem: ".kbc-navbar",
            opts: {
                logoSrc: "img/logo/logo_white.png",
                sns: [
                    '<a href="https://twitter.com/share" class="twitter-share-button" data-url="http://keio-contest.org" data-via="KBC_Keio" data-lang="ja" data-related="KBC_Keio">ツイート</a>'
                ],
                nav: [
                    { url: "index.html", text: "KBC実行委員会について" },
                    { url: "index.html", text: "KBC Business Leverage" },
                    { url: "index.html", text: "スポンサーシップ" },
                    { url: "index.html", text: "活動報告" },
                ]
            }
        },
        footer: {
            elem: ".kbc-footer",
            opts: {
                year: "2013",
                nav: [
                    { url: "index.html", text: "トップページ" },
                    { url: "index.html", text: "お問い合わせ" },
                    { url: "index.html", text: "サイトマップ" },
                ]
            }
        },
        slide: "#main-slide"
    });
});

(function(window, library, namespace, undefined){
"use strict"
    var lib = window[library];
    if(!lib){
        lib = {};
        window[library] = lib;
    }
    var ns = lib[namespace];
    if(!ns){
        ns = {};
        lib[namespace] = ns;
    }

    var applyDefaultOpts = function(opts, defaultOpts){
        if(typeof(opts) != "object"){
            return defaultOpts;
        }
        for(var i in defaultOpts){
            if(typeof(defaultOpts[i]) == "object"){
                opts[i] = applyDefaultOpts(opts[i], defaultOpts[i]);
            } else if(typeof(opts[i]) == "undefined"){
                opts[i] = defaultOpts[i];
            }
        }
        return opts;
    };

    ns.initialize = function(opts){
        opts = applyDefaultOpts(opts, {
            navbar: {
                elem: ".kbc-navbar",
                opts: {}
            },
            footer: {
                elem: ".kbc-footer",
                opts: {}
            },
            slide: false
        });
        console.log(opts);

        navbar($(opts.navbar.elem), (opts.navbar.opts));
        footer($(opts.footer.elem), (opts.footer.opts));
        if(opts.slide){
            slide($(opts.slide));
        }
    };

    var navbar = function($elem, opts){
        opts = applyDefaultOpts(opts, {
            logoUrl: "index.html",
            logoSrc: "You should set logo image source of navbar",
            sns: undefined,
            nav: undefined
        });

        var $snsCell = $("<div>").addClass("kbc-cell");
        if(opts.sns instanceof Array){
            opts.sns.forEach(function(e){
                $snsCell.append($(e));
            });
        }
        var $navCell = $("<div>").addClass("kbc-cell");
        if(opts.nav instanceof Array){
            opts.nav.forEach(function(e){
                $navCell.append($("<a>")
                                .addClass("kbc-nav-btn")
                                .attr("href", e.url)
                                .append(e.text));
            });
        }

        $elem.addClass("kbc-navbar", "navbar-fixed-top")
             .append($("<div>")
                     .addClass("kbc-container")
                     .append($("<div>")
                             .addClass("kbc-container-left")
                             .append($("<h1>")
                                     .append($("<a>")
                                             .attr("href", opts.logoUrl)
                                             .append($("<img>")
                                                     .attr("src", opts.logoSrc)))))
                     .append($("<div>")
                             .addClass("kbc-container-right")
                             .append($snsCell)
                             .append($navCell)));
    };

    var footer = function($elem, opts){
        opts = applyDefaultOpts(opts, {
            year: "2013",
            nav: undefined
        });

        var $navCell = $("<div>").addClass("kbc-cell");
        if(opts.nav instanceof Array){
            opts.nav.forEach(function(e){
                $navCell.append($("<a>")
                                .attr("href", e.url)
                                .append(e.text));
            });
        }

        $elem.addClass("kbc-navbar", "navbar-fixed-top")
             .append($("<div>")
                     .addClass("kbc-container")
                     .append($("<div>")
                             .addClass("kbc-container-left"))
                     .append($("<div>")
                             .addClass("kbc-container-right")
                             .append($navCell)
                             .append($("<div>")
                                     .addClass("kbc-cell")
                                     .append($("<p>")
                                             .append("Copyright &copy " + opts.year + " KBC Organization Team All Rights Reserced.")))));
    };

    var slide = function($elem){
        $elem.carousel({
            interval: 5000,
            pause: "hover",
            wrap: true
        });
        $elem.css("margin-top", $(".kbc-navbar").height());
    };

}(this, "kbc", "view"));
