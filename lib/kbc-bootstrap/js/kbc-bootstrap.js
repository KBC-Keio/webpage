/*
 * title       : KBC Bootstrap
 * description : 初期化のためのJavaScriptコード群。全てのHTMLページで読み込みます。基本的に本ファイルの内容は一切書き換えてはいけません。JavaScriptおよびjQuery、Twitter Bootstrapを十分に理解していないメンバーが書き換えた場合には全てのWebページが正しく表示されなくなる恐れがあります。
 * dependency  : jQuery 1.10.2, Twitter Bootstrap 3.0.0
 * version     : 1.0.0
 * date        : 2013年10月30日
 * author      : 第9期実行委員 出水厚輝
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
            slide: ".kbc-slide",
            sidemenu: {
                elem: ".kbc-sidemenu",
                headline: "h2.headline,h3.headline"
            }
        });

        navbar($(opts.navbar.elem), (opts.navbar.opts));
        footer($(opts.footer.elem), (opts.footer.opts));
        slide($(opts.slide));
        sidemenu($(opts.sidemenu.elem), $(opts.sidemenu.headline));
    };

    var navbar = function($elem, opts){
        if(!$elem){
            return;
        }
        opts = applyDefaultOpts(opts, {
            logoUrl: "/index.html",
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

        $elem.addClass("kbc-navbar")
             .addClass("navbar-fixed-top")
             .append($("<div>")
                     .addClass("kbc-container")
                     .append($("<div>")
                             .addClass("kbc-container-inner")
                             .addClass("kbc-brand")
                             .append($("<h1>")
                                     .append($("<a>")
                                             .attr("href", opts.logoUrl)
                                             .append($("<img>")
                                                     .attr("src", opts.logoSrc)))))
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

    var slide = function($elem){
        if(!$elem){
            return;
        }
        $elem.carousel({
            interval: 5000,
            pause: "hover",
            wrap: true
        });
    };

    var sidemenu = function($elem, $headlines){
        if(!($elem || $headlines)){
            return;
        }
        var $navlist = $("<ul>").addClass("kbc-nav-list");
        for(var i = 0; i < $headlines.length; i++){
            var $headline = $($headlines[i]);
            var headtext = $headline.attr("title") || $headline.text();
            $headline.attr("id", "kbc-headline" + i)
            $navlist.append($("<li>")
                            .append($("<a>")
                                    .attr("href", "#kbc-headline" + i)
                                    .append(headtext)))
                    .append("<hr>");
        }
        $elem.addClass("kbc-sidemenu")
             .append($("<div>").attr("id", "kbc-sidemenu-space"))
             .append($("<h2>")
                     .addClass("kbc-nav-header")
                     .append("CONTENTS"))
             .append($navlist);

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

}(this, "kbc", "view"));
