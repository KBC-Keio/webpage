/*
 * title       : KBC Bootstrap Event
 * description : イベントページを表示するためのJavaScriptコード群。event.htmlで読み込みます。基本的に本ファイルの内容は一切書き換えてはいけません。JavaScriptおよびjQuery、Twitter Bootstrapを十分に理解していないメンバーが書き換えた場合にはイベントページが正しく表示されなくなる恐れがあります。
 * dependency  : jQuery 1.10.2, Twitter Bootstrap 3.0.0, KBC Bootstrap 1.0.0
 * version     : 1.0.0
 * date        : 2013年11月2日
 * author      : 第9期実行委員 出水厚輝
 */



/*
 * HTMLの要素読み込み後に即時実行されるメソッド
 */
$(function(){
    $.getJSON("/event/eventlist.json", function(data){
        kbc.event.initialize("/event/eventlist.json");
    });
});



/*
 * window.event
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

    ns.initialize = function(json){
        $.getJSON(json, function(list){
            var i = 0;
            list.forEach(function(e){
                $(".kbc-main .kbc-container-inner").append($("<div>").attr("id", "kbc-event-" + i));
                kbc.view.event($("#kbc-event-" + i), e);
                i++;
            });
        });
    }
}(this, "kbc", "event"));
