/*
 * title       : KBC Bootstrap Event
 * description : イベントページを表示するためのJavaScriptコード群。event.htmlで読み込みます。基本的に本ファイルの内容は一切書き換えてはいけません。JavaScriptおよびjQuery、Twitter Bootstrapを十分に理解していないメンバーが書き換えた場合にはイベントページが正しく表示されなくなる恐れがあります。
 * dependency  : jQuery 1.10.2, Twitter Bootstrap 3.1.1, KBC Bootstrap 1.1.0
 * version     : 1.2.0
 * date        : 2014年7月6日
 * author      : 第9期実行委員 出水厚輝
 */



/*
 * window.kbc.event
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



    ns.EventPagination = function(jsons, filter){
        this.jsons = jsons;
        if(filter){
            this.filter = filter;
        } else{
            this.filter = function(cards){
                return cards;
            };
        }
    };
    ns.EventPagination.prototype = {
        next: function(n, callback){
            var append = function(){
                var card = this.cards.shift();
                if(typeof(callback) == 'function'){
                    callback(card);
                }
                this.next(--n, callback);
            };

            if(n > 0){
                if(!this.cards || this.cards.length == 0){
                    this.restock(append.bind(this));
                } else{
                    append.bind(this)();
                }
            }
        },
        restock: function(callback){
            var parseEventCards = function(json, callback){
                var parseDate = function(limit){
                    if(limit.month){
                        limit.month--;
                    }
                    return new Date(limit.year, limit.month, limit.day, limit.hour, limit.minute);
                };

                /*
                 * raws = [
                 *     {
                 *         name: String,
                 *         image: String,
                 *         descripstion: String,
                 *         timelimit: {
                 *             year: Number,
                 *             month: Number,
                 *             day: Number,
                 *             (hour: Number,)
                 *             (minute: Number)
                 *         },
                 *         details: [
                 *             {
                 *                 title: String,
                 *                 content: String
                 *             }
                 *         ],
                 *         button: {
                 *             url: String,
                 *             text: String
                 *         }
                 *     }
                 * ]
                 */
                $.getJSON(json, function(raws){
                    var cards = new Array();
                    for(var i = 0; i < raws.length; i++){
                        var raw = raws[i];
                        var card = new ns.EventCard(raw.name, raw.image, raw.description, parseDate(raw.timelimit));
                        if(raw.details){
                            card.setDetail(raw.details);
                        }
                        if(raw.button){
                            card.setButton(raw.button.url, raw.button.text);
                        }
                        cards.push(card);
                    }
                    callback(cards);
                });
            };

            if(this.jsons && this.jsons.length > 0){
                parseEventCards(this.jsons.shift(), (function(cards){
                    this.cards = this.filter(cards);
                    if(this.cards && this.cards.length > 0){
                        callback();
                    } else if(this.jsons.length > 0){
                        this.restock(callback);
                    }
                }).bind(this));
            }
        }
    };



    var today = new Date();
    /*
     * name = String
     * image = String
     * description = String
     * timeLimit = Date
     */
    ns.EventCard = function(name, image, description, timeLimit){
        this.$headline = $('<h2>').append(name);
        this.$body = $('<div class="kbc-event">')
                     .append(this.$headline)
                     .append($('<hr>'));
        this.$contents = $('<div class="event-contents">')
                         .append($('<img>').attr('src', image));
        this.$description = $('<div class="event-inner-contents">')
                            .append($('<p>').append(description));

        if(today < timeLimit){
            this.past = false;
        } else{
            this.past = true;
        }
    };
    ns.EventCard.prototype = {
        render: function($elem){
            this.$body.append(this.$contents.append(this.$description));
            if(this.$button){
                this.$body.append(this.$button);
            }
            $elem.append(this.$body);
        },
        /*
         * details = [
         *     {
         *         title: String,
         *         content: String
         *     }
         * ]
         */
        setDetail: function(details){
            var $detail = $('<table>');
            for(var i = 0; i < details.length; i++){
                var detail = details[i];
                $detail.append($('<tr>')
                               .append($('<td>').append(detail.title))
                               .append($('<td>').append(detail.content)))
            }
            this.$description.append($detail);
        },
        setButton: function(url, text){
            this.$button = $('<div class="event-btn">')
                           .append($('<a class="btn btn-info">')
                                   .attr('href', url)
                                   .append(text));

        }
    };
}(this, 'kbc', 'event'));
