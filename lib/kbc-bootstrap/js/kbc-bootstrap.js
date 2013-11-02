/*
 * title       : KBC Bootstrap
 * description : 初期化のためのJavaScriptコード群。全てのHTMLページで読み込みます。基本的に本ファイルの内容は一切書き換えてはいけません。JavaScriptおよびjQuery、Twitter Bootstrapを十分に理解していないメンバーが書き換えた場合には全てのWebページが正しく表示されなくなる恐れがあります。
 * dependency  : jQuery 1.10.2, Twitter Bootstrap 3.0.0
 * version     : 1.0.0
 * date        : 2013年10月30日
 * author      : 第9期実行委員 出水厚輝
 */



/*
 * HTMLの要素読み込み後に即時実行されるメソッド
 */
$(function(){
    $.getJSON("/configuration.json", function(conf){
        kbc.view.initialize(conf);
    });
});



/*
 * window.kbc.util
 * window.kbc.viewやwindow.kbc.controllerで使用する独立したメソッドを定義した名前空間
 */
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

    /*
     * Object::defaultOptsの内、Object::optsで定義されていない要素を定義するメソッド
     */
    ns.applyDefaultOpts = function(opts, defaultOpts){
        if(typeof(opts) != "object"){
            return defaultOpts;
        }
        for(var i in defaultOpts){
            if(typeof(defaultOpts[i]) == "object"){
                opts[i] = ns.applyDefaultOpts(opts[i], defaultOpts[i]);
            } else if(typeof(opts[i]) == "undefined"){
                opts[i] = defaultOpts[i];
            }
        }
        return opts;
    };
}(this, "kbc", "util"));



/*
 * window.kbc.view
 * ページの静的な部分の描画を補助するためのメソッドを定義した名前空間
 */
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

    ns.initialize = function(opts){
        opts = kbc.util.applyDefaultOpts(opts, {
            navbar: {
                elem: ".kbc-navbar",
                opts: {}
            },
            footer: {
                elem: ".kbc-footer",
                opts: {}
            },
            slide: {
                elem: ".kbc-slide",
                opts: {}
            },
            sidemenu: {
                elem: ".kbc-sidemenu",
                headline: "h2.headline,h3.headline"
            }
        });

        navbar($(opts.navbar.elem), opts.navbar.opts);
        footer($(opts.footer.elem), opts.footer.opts);
        slide($(opts.slide.elem), opts.slide.opts);
        sidemenu($(opts.sidemenu.elem), $(opts.sidemenu.headline));
    };

    var navbar = function($elem, opts){
        if(!$elem){
            return;
        }
        opts = kbc.util.applyDefaultOpts(opts, {
            logoUrl: "/index.html",
            logo: undefined,
            sns: undefined,
            nav: undefined
        });
        if(!opts.logo){
            throw new Error("You should set logo source for navbar in configuration.json");
        }

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

        $elem.addClass("kbc-navbar navbar-fixed-top")
             .append($("<div>")
                     .addClass("kbc-container")
                     .append($("<div>")
                             .addClass("kbc-container-inner kbc-brand")
                             .append($("<h1>")
                                     .append($("<a>")
                                             .attr("href", opts.logoUrl)
                                             .append($("<img>")
                                                     .attr("src", opts.logo)))))
                     .append($("<div>")
                             .addClass("kbc-container-inner")
                             .append($snsCell)
                             .append($navCell)));
        $elem.parent().prepend($("<div>").height($(".kbc-navbar").height()));
    };

    var footer = function($elem, opts){
        if(!$elem){
            return;
        }
        opts = kbc.util.applyDefaultOpts(opts, {
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

        $elem.addClass("kbc-footer")
             .append($("<div>")
                     .addClass("kbc-container")
                     .append($("<div>")
                             .addClass("kbc-container-inner"))
                     .append($("<div>")
                             .addClass("kbc-container-inner")
                             .append($navCell)
                             .append($("<div>")
                                     .addClass("kbc-cell")
                                     .append($("<p>")
                                             .append("Copyright &copy; " + opts.year + " KBC Organization Team All Rights Reserced.")))));
    };

    var slide = function($elem, opts){
        if(!$elem){
            return;
        }

        var $indicator = $("<ol>").addClass("carousel-indicators");
        var $inner = $("<div>").addClass("carousel-inner");
        if(opts instanceof Array){
            var i = 0;
            opts.forEach(function(e){
                $indicator.append($("<li>")
                                  .attr("data-target", "#kbc-slide")
                                  .attr("data-slide-to", i));
                $inner.append($("<div>")
                              .addClass("item")
                              .append($("<a>")
                                      .attr("href", e.url)
                                      .append($("<img>")
                                              .attr("src", e.image))));
                i++;
            });
            if(i > 0){
                $($indicator.children()[0]).addClass("active");
                $($inner.children()[0]).addClass("active");
            }
        }

        $elem.addClass("kbc-slide")
             .append($("<div>")
                     .addClass("carousel slide")
                     .attr("id", "kbc-slide")
                     .append($indicator)
                     .append($inner)
                     .append($("<a>")
                             .addClass("carousel-control left")
                             .attr("href", "#kbc-slide")
                             .attr("data-slide", "prev")
                             .append($("<span>")
                                     .addClass("icon-prev")))
                     .append($("<a>")
                             .addClass("carousel-control right")
                             .attr("href", "#kbc-slide")
                             .attr("data-slide", "next")
                             .append($("<span>")
                                     .addClass("icon-next"))))

        $("#kbc-slide").carousel({
            interval: 5000,
            pause: "hover",
            wrap: true
        });
    };

    var sidemenu = function($elem, $headlines){
        if(!($elem || $headlines)){
            return;
        }

        $elem.addClass("kbc-sidemenu")
             .append($("<div>").attr("id", "kbc-sidemenu-space"))
             .append($("<h2>")
                     .addClass("kbc-nav-header")
                     .append("CONTENTS"))
             .append($("<ul>").addClass("kbc-nav-list"));
        for(var i = 0; i < $headlines.length; i++){
            var $headline = $($headlines[i]);
            kbc.controller.appendSidemenu($($headlines[i]));
        }

        var timer = false;
        $(window).scroll(function(){
            if(timer !== false){
                clearTimeout(timer);
            }
            timer = setTimeout(function(){
                $("#kbc-sidemenu-space").animate({
                    height: $(document).scrollTop()
                }, "fast");
            }, 50);
        });
    };

    var makeDateString = function(dateObj){
        var date;
        if(typeof(dateObj) != "object"){
            return;
        }
        date = dateObj.year + "年" + dateObj.month + "月";
        if(dateObj.date){
            date += dateObj.date + "日";
            if(dateObj.day){
                date += "(" + dateObj.day + ")";
            }
        }
        if(dateObj.time){
            date += " " + dateObj.time;
        }
        return date;
    }

    ns.event = function($elem, opts){
        if(!$elem){
            return;
        }
        opts = kbc.util.applyDefaultOpts(opts, {
            name: "(名称未定)",
            image: "/img/event/no_image.png",
            description: "",
            date: undefined,
            site: "(未定)",
            fee: "(未定)",
            deadline: undefined,
            important: false,
            button: {
                url: "/event/index.html",
                text: "イベントの詳細ページへ"
            }
        });

        var date = makeDateString(opts.date);
        var fee;
        switch(typeof(opts.fee)){
            case "number":
                if(opts.fee == 0){
                    fee = "無料";
                } else{
                    fee = opts.fee + "円";
                }
                break;
            case "string":
                fee = opts.fee;
                break;
            default:
                fee = "(未定)";
        }
        var deadline = makeDateString(opts.deadline);

        $elem.addClass("kbc-event")
             .append($("<h2>")
                     .addClass("headline")
                     .append(opts.name))
             .append($("<hr>"))
             .append($("<div>")
                     .addClass("event-contents")
                     .append($("<img>").attr("src", opts.image))
                     .append($("<div>")
                             .addClass("event-inner-contents")
                             .append($("<p>").append(opts.description))
                             .append($("<table>")
                                     .append($("<tr>")
                                             .append($("<td>").append("日時"))
                                             .append($("<td>").append(date)))
                                     .append($("<tr>")
                                             .append($("<td>").append("場所"))
                                             .append($("<td>").append(opts.site)))
                                     .append($("<tr>")
                                             .append($("<td>").append("参加費"))
                                             .append($("<td>").append(fee)))
                                     .append($("<tr>")
                                             .append($("<td>").append("申込期限"))
                                             .append($("<td>").append(deadline))))))
                 .append($("<div>")
                         .addClass("event-btn")
                         .append($("<a>")
                                 .attr("href", opts.button.url)
                                 .addClass("btn btn-info")
                                 .append(opts.button.text)));
        kbc.controller.appendSidemenu($($elem.children(".headline")[0]))
    };
}(this, "kbc", "view"));



/*
 * window.kbc.controller
 * ページの動的な部分を描画するためのメソッドを定義した名前空間
 */
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

    var appended = 0;

    ns.appendSidemenu = function($headline){
        var appendId = "kbc-headline-" + appended++;
        var $navlist = $(".kbc-nav-list");
        var headtext = $headline.attr("title") || $headline.text();
        $headline.attr("id", appendId)
        var $linker = $("<a>").attr("href", "#" + appendId)
                              .append(headtext);
        $linker.click(function(){
            var speed = 300;
            var href= $(this).attr("href");
            var target = $(href == "#" || href == "" ? 'html' : href);
            var position = target.offset().top - 100;
            $("html, body").animate({scrollTop:position}, speed, "swing");
            return false;

        });
        $navlist.append("<hr>")
                .append($("<li>")
                        .append($linker));
    };
}(this, "kbc", "controller"));
