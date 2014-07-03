/*
 * title       : KBC Bootstrap News
 * description : トップページのニュースを表示するためのJavaScriptコード群。index.htmlで読み込みます。基本的に本ファイルの内容は一切書き換えてはいけません。JavaScriptおよびjQuery、Twitter Bootstrapを十分に理解していないメンバーが書き換えた場合にはトップページが正しく表示されなくなる恐れがあります。
 * dependency  : jQuery 1.10.2, Twitter Bootstrap 3.1.1
 * version     : 1.0.0
 * date        : 2014年4月2日
 * author      : 第9期実行委員 出水厚輝
 */



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
            ns.append($elem, news[i]);
        }
    };

    ns.append = function($elem, news){
        var timestamp = '(' + news.date.year + '.' + news.date.month + '.' + news.date.day + ' updated)';
        var timestampStyle = 'font-size: 12px; color: #555; margin-left: 10px;';
        $elem.append($('<h4>')
                     .append(news.title)
                     .append($('<span style="' + timestampStyle + '">')
                             .append(timestamp)))
             .append($('<div class="kbc-thumbnail mini left">')
                     .append($('<span>')
                             .append($('<img>').attr('src', news.image)))
                     .append($('<p>').append(news.description)));
    };
}(this, 'kbc', 'news'));
