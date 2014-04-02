/*
 * title       : KBC Bootstrap Slide
 * description : トップページのスライドを表示するためのJavaScriptコード群。index.htmlで読み込みます。基本的に本ファイルの内容は一切書き換えてはいけません。JavaScriptおよびjQuery、Twitter Bootstrapを十分に理解していないメンバーが書き換えた場合にはトップページが正しく表示されなくなる恐れがあります。
 * dependency  : jQuery 1.10.2, Twitter Bootstrap 3.1.1
 * version     : 1.1.0
 * date        : 2014年4月2日
 * author      : 第9期実行委員 出水厚輝
 */



/*
 * HTMLの要素読み込み後に即時実行されるメソッド
 */
$(function(){
    $.getJSON('/data/slide.json', function(config){
        kbc.slide.initialize($(config.elem), config.slides);
    });
});



/*
 * window.kbc.slide
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

    /*
     * slides = {
     *     url: String,
     *     image: String
     * }
     */
    ns.initialize = function($elem, slides){
        var $indicator = $('<ol class="carousel-indicators">');
        var $inner = $('<div class="carousel-inner">');
        var i = 0;
        slides.forEach(function(slide){
            $indicator.append($('<li data-target="#kbc-slide">')
                              .attr('data-slide-to', i++));
            $inner.append($('<div class="item">')
                          .append($('<a>')
                                  .attr('href', slide.url)
                                  .append($('<img>')
                                          .attr('src', slide.image))));
        });
        if(i > 0){
            $($indicator.children()[0]).addClass('active');
            $($inner.children()[0]).addClass('active');
        }
        

        $elem.addClass('kbc-slide')
             .append($('<div id="kbc-slide" class="carousel slide">')
                     .append($indicator)
                     .append($inner)
                     .append($('<a href="#kbc-slide" class="carousel-control left" data-slide="prev">')
                             .append($('<span class="icon-prev">')))
                     .append($('<a href="#kbc-slide" class="carousel-control right" data-slide="next">')
                             .append($('<span class="icon-next">'))))

        $('#kbc-slide').carousel({
            interval: 5000,
            pause: 'hover',
            wrap: true
        });
    };

}(this, 'kbc', 'slide'));
