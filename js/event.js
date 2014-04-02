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
    kbc.event.initialize(['/data/recentevent.json'], ['/data/pastevent.json']);
});



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



    /*
     * recentEventJsons = [String]
     * pastEventJsons = [String]
     */
    ns.initialize = function(recentEventJsons, pastEventJsons){
        $('a[data-toggle="tab"]').click(function(){
            $('.kbc-nav-list>.event-headline').toggleClass('hide');
        });

        var recentPagination = new EventPagination($('#new'), recentEventJsons, function(cards){
            for(var i; i < cards.length; i++){
                if(cards[i].past){
                    this.jsons = undefined;
                    return;
                }
            }
            return cards;
        });

        var pastPagination = new EventPagination($('#past'), recentEventJsons.concat(pastEventJsons), function(cards){
            return cards.filter(function(card){
                return card.past;
            });
        })

        var appendSidemenu = function(card){
            var classes = 'event-headline';
            var recent = $('a[href="#new"]').parent().hasClass('active');
            if(recent && card.past){
                classes += ' hide';
            }
            kbc.controller.appendSidemenu(card.$headline, classes);
        };
        recentPagination.next(3, appendSidemenu);
        pastPagination.next(3, appendSidemenu);
    };


    var EventPagination = function($field, jsons, filter){
        this.$field = $field;
        this.jsons = jsons;
        this.filter = filter;
    };
    EventPagination.prototype = {
        next: function(n, callback){
            var append = function(){
                var card = this.cards.shift();
                card.render(this.$field);
                if(typeof(callback) == 'function'){
                    callback(card);
                }
                this.next(--n, callback);
            };

            if(n > 0){
                if(!this.cards || this.cards.length == 0){
                    this.restock(append.bind(this));
                } else{
                    append();
                }
            }
        },
        restock: function(callback){
            var parseEventCards = function(json, callback){
                var parseDate = function(limit){
                    if(limit.month){
                        limit.month++;
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
                        var card = new EventCard(raw.name, raw.image, raw.description, parseDate(raw.timelimit));
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
    var EventCard = function(name, image, description, timeLimit){
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
    EventCard.prototype = {
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
