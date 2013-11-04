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
    kbc.event.initialize(1, "/event/recentevent.json", "/event/pastevent.json");
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

    var EventDescriptor = function($elem, filter, book){
        this.$elem = $elem;
        this.filter = filter;
        this.book = book;
        this.curPage = 0;
        this.curLine = 0;
    };
    EventDescriptor.prototype = {
        appendLine: function(num, defaultClasses){
            if(this.curPage >= this.book.length){
                return;
            }
            var dist = this.curLine + num;
            $.getJSON(this.book[this.curPage], (function(lines){
                while(this.curLine < dist){
                    if(lines.length <= this.curLine){
                        this.curPage++;
                        num = dist - this.curLine;
                        this.curLine = 0;
                        this.appendLine(num, defaultClasses);
                        return;
                    }
                    var line = lines[this.curLine];
                    if(this.filter(line)){
                        var classes = "event-headline";
                        if(defaultClasses){
                            classes += " " + defaultClasses;
                        }
                        kbc.view.event(this.$elem, line, classes);
                    } else{
                        dist++;
                    }
                    this.curLine++;
                }
            }).bind(this));
        }
    };

    ns.initialize = function(newPageNo, jsons){
        var newJsons = new Array();
        var pastJsons = new Array();
        for(var i = 1; i < arguments.length; i++){
            if(i <= newPageNo){
                newJsons.push(arguments[i]);
            }
            pastJsons.push(arguments[i]);
        }

        var newEvent = new EventDescriptor($("#new"), function(event){
            return !isPast(event.date);
        }, newJsons);
        var pastEvent = new EventDescriptor($("#past"), function(event){
            return isPast(event.date);
        }, pastJsons);

        newEvent.appendLine(3);
        pastEvent.appendLine(3, "hide");

        $("#new-btn").click(function(){
            newEvent.appendLine(3);
        });
        $("#past-btn").click(function(){
            pastEvent.appendLine(3);
        });

        $("a[data-toggle=\"tab\"]").click(function(){
            $(".kbc-nav-list>.event-headline").toggleClass("hide");
            $(".more-btn").toggleClass("hide");
        });
    };

    var isPast = function(theDate){
        var today = new Date();
        var year = today.getFullYear(),
            month = today.getMonth() + 1,
            date = today.getDate();

        if(theDate.year < year){
            return true;
        } else if(theDate.year > year){
            return false;
        }
        if(theDate.month < month){
            return true;
        } else if(theDate.month > month){
            return false;
        }
        if(theDate.date < date){
            return true;
        } else if(theDate.month > date){
            return false;
        }
        return false;
    };
}(this, "kbc", "event"));
