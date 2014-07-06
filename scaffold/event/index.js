/*
 * window.kbc.scaffoldEventIndex
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

    ns.initialize = function($field, jsons){
        var i = 0;
        var append = function(card){
            card.render($field);

            var edit_href = '/scaffold/event/edit.php#?index=' + i;
            var $editButton = $('<a class="event-edit glyphicon glyphicon-pencil"></a>').attr('href', edit_href);

            var $deleteButton = $('<span class="event-delete glyphicon glyphicon-remove"></span>');
            $deleteButton.click(ns.deleteEvent);

            $field.append($('<div class="buttons">')
                          .attr('data-index', i)
                          .append($editButton)
                          .append($deleteButton));
            i++;
        };
        var pagination = new kbc.event.EventPagination(jsons);
        pagination.next(3, append);

        $(window).on('scroll', function(){
            var scrollHeight = $(document).height();
            var scrollPosition = $(window).height() + $(window).scrollTop();
            if(scrollHeight - scrollPosition < 100) {
                pagination.next(3, append);
            }
        });
    };

    ns.deleteNews = function(){
        if(window.confirm('削除してしまうとScaffoldで復元することはできませんが、よろしいですか?')){
            var index = $(this).parent().parent().attr('data-index');
            $('<form method="POST" action="/scaffold/event/delete.php"></form>')
                .append($('<input type="hidden" name="index" />').val(index))
                .appendTo(document.body)
                .submit();
        }
    };

}(this, 'kbc', 'scaffoldEventIndex'));
