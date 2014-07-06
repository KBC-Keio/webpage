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
     * recentEventJson = String
     * pastEventJsons = [String]
     */
    ns.initialize = function(recentEventJson, pastEventJsons){
        $('a[data-toggle="tab"]').click(function(){
            $('.kbc-nav-list>.event-headline').toggleClass('hide');
        });

        var recentPagination = new ns.EventPagination([recentEventJson], function(cards){
            return cards.filter(function(card){
                return !card.past;
            }).reverse();
        });

        pastEventJsons.unshift(recentEventJson);
        var pastPagination = new ns.EventPagination(pastEventJsons, function(cards){
            return cards.filter(function(card){
                return card.past;
            });
        })

        var recent = function(){
            return $('a[href="#new"]').parent().hasClass('active');
        };

        var appendSidemenu = function(card){
            var classes = 'event-headline';
            if(recent() && card.past){
                classes += ' hide';
            } else if(!card.past){
                $('#no-event').addClass('hide');
            }
            kbc.controller.appendSidemenu(card.$headline, classes);
        };
        var $recentField = $('#new');
        var appendRecent = function(card){
            card.render($recentField);
            appendSidemenu(card);
        };
        var $pastField = $('#past');
        var appendPast = function(card){
            card.render($pastField);
            appendSidemenu(card);
        };
        recentPagination.next(3, appendRecent);
        pastPagination.next(3, appendPast);

        $(window).on('scroll', function(){
            var scrollHeight = $(document).height();
            var scrollPosition = $(window).height() + $(window).scrollTop();
            if(scrollHeight - scrollPosition < 100) {
                if(recent()){
                    recentPagination.next(3, appendRecent);
                } else{
                    pastPagination.next(3, appendPast);
                }
            }
        });
    };
}(this, 'kbc', 'event'));
