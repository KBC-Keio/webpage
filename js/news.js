/*
 * title       : KBC Bootstrap News
 * description : トップページのニュースを表示するためのJavaScriptコード群。index.htmlで読み込みます。基本的に本ファイルの内容は一切書き換えてはいけません。JavaScriptおよびjQuery、Twitter Bootstrapを十分に理解していないメンバーが書き換えた場合にはトップページが正しく表示されなくなる恐れがあります。
 * dependency  : jQuery 1.10.2, Twitter Bootstrap 3.0.0
 * version     : 1.0.0
 * date        : 2014年4月2日
 * author      : 第9期実行委員 出水厚輝
 */



/*
 * HTMLの要素読み込み後に即時実行されるメソッド
 */
$(function(){
    $.getJSON('/data/news.json', function(config){
        kbc.news.initialize($(config.elem), config.news);
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
     * news = [
     *     {
     *         title: String,
     *         date: {
     *             year: Number,
     *             month: Number,
     *             day: Number
     *         },
     *         image: String,
     *         description: String
     *     }
     * ]
     */
    ns.initialize = function($elem, news){
        for(var i = 0; i < news.length; i++){
            var n = news[i];
            var timestamp = '(' + n.date.year + '.' + n.date.month + '.' + n.date.day + ' updated)';
            $elem.append($('<h4>')
                         .append(n.title)
                         .append($('<span class="kbc-timestamp">')
                                 .append(timestamp)))
                 .append($('<div class="kbc-thumbnail mini left">')
                         .append($('<span>')
                                 .append($('<img>').attr('src', n.image)))
                         .append($('<p>').append(n.description)));
        }
    };
}(this, 'kbc', 'news'));
