/*
 * title       : KBC Bootstrap
 * description : 初期化のためのJavaScriptコード群。全てのHTMLページで読み込みます。基本的に本ファイルの内容は一切書き換えてはいけません。JavaScriptおよびjQuery、Twitter Bootstrapを十分に理解していないメンバーが書き換えた場合には全てのWebページが正しく表示されなくなる恐れがあります。
 * dependency  : jQuery 1.10.2, Twitter Bootstrap 3.1.1
 * version     : 1.1.0
 * date        : 2014年4月2日
 * author      : 第9期実行委員 出水厚輝
 */



/*
 * HTMLの要素読み込み後に即時実行されるメソッド
 */
$(function(){
    $.getJSON('/data/configuration.json', function(config){
        kbc.view.initialize(config);
    });
});



/*
 * window.kbc.util
 * window.kbc.viewやwindow.kbc.controllerで使用する独立したメソッドを定義した名前空間
 */
(function(window, library, namespace, undefined){
'use strict'
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

    ns.smoothScroll = function(){
        var speed = 300;
        var href= $(this).attr('href');
        var target = $(href == '#' || href == '' ? 'html' : href);
        var position = target.offset().top - 100;
        $('html, body').animate({scrollTop:position}, speed, 'swing');
        return false;
    }
}(this, 'kbc', 'util'));



/*
 * window.kbc.view
 * ページの静的な部分の描画を補助するためのメソッドを定義した名前空間
 */
(function(window, library, namespace, undefined){
'use strict'
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

    ns.initialize = function(config){
        $('a.inner-scroll[href^=#]').click(kbc.util.smoothScroll);
        navbar($(config.navbar.elem), config.navbar.opts);
        footer($(config.footer.elem), config.footer.opts);
        sidemenu($(config.sidemenu.elem), $(config.sidemenu.headline));
    };

    /*
     * opts = {
     *     logo: String,
     *     logoUrl: String,
     *     sns: [ String ],
     *     nav: [ { url: String, text: String } ]
     * }
     */
    var navbar = function($elem, opts){
        var $snsCell = $('<div class="kbc-cell">');
        opts.sns.forEach(function(e){
            $snsCell.append($(e));
        });
        var $navCell = $('<div class="kbc-cell">');
        opts.nav.forEach(function(e){
            $navCell.append($('<a class="kbc-nav-btn">')
                            .attr('href', e.url)
                            .append(e.text));
        });

        $elem.addClass('kbc-navbar navbar-fixed-top')
             .append($('<div class="kbc-container">')
                     .append($('<div class="kbc-container-inner kbc-brand">')
                             .append($('<h1>')
                                     .append($('<a>')
                                             .attr('href', opts.logoUrl)
                                             .append($('<img>')
                                                     .attr('src', opts.logo)))))
                     .append($('<div class="kbc-container-inner">')
                             .append($snsCell)
                             .append($navCell)));

        $elem.parent().prepend($('<div id="pagetop">').height($('.kbc-navbar').height()));
    };

    /*
     * opts = {
     *     year: Number,
     *     nav: [ { url: String, text: String } ]
     * }
     */
    var footer = function($elem, opts){
        var $navCell = $('<div class="kbc-cell">');
        opts.nav.forEach(function(e){
            var $linker = $('<a>').attr('href', e.url)
                                  .append(e.text);
            if((/^#/).test(e.url)){
                $linker.click(kbc.util.smoothScroll);
            }
            $navCell.append($linker);
        });

        $elem.addClass('kbc-footer')
             .append($('<div class="kbc-container">')
                     .append($('<div class="kbc-container-inner">'))
                     .append($('<div class="kbc-container-inner">')
                             .append($navCell)
                             .append($('<div class="kbc-cell">')
                                     .append($('<p>')
                                             .append('Copyright &copy; ' + opts.year + ' KBC Organization Team All Rights Reserced.')))));
    };

    var sidemenu = function($elem, $headlines){
        $elem.addClass('kbc-sidemenu')
             .append($('<h2 class="kbc-nav-header">CONTENTS</h2>'))
             .append($('<ul class="kbc-nav-list">'));
        kbc.controller.appendSidemenu($headlines);
    };
}(this, 'kbc', 'view'));



/*
 * window.kbc.controller
 * ページの動的な部分を描画するためのメソッドを定義した名前空間
 */
(function(window, library, namespace, undefined){
'use strict'
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

    ns.appendSidemenu = function($headlines, classes){
        var $navlist = $('.kbc-nav-list');
        classes = classes || '';

        for(var i = 0; i < $headlines.length; i++){
            var $headline = $($headlines[i]);

            var appendId = $headline.attr('id') || 'kbc-headline-' + appended++;
            $headline.attr('id', appendId)

            var headtext = $headline.attr('title') || $headline.text();
            var $linker = $('<a>').attr('href', '#' + appendId)
                                  .append(headtext);

            $linker.click(kbc.util.smoothScroll);
            $navlist.append($('<hr>').addClass(classes))
                    .append($('<li>').addClass(classes).append($linker));
        }
    };
}(this, 'kbc', 'controller'));
