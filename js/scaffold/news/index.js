/*
 * window.kbc.scaffoldNewsIndex
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

    ns.initialize = function($table, news){
        for(var i = 0; i < news.length; i++){
            var $newsCell = $('<td>');
            kbc.news.append($newsCell, news[i]);

            var $editButton = $('<span class="glyphicon glyphicon-pencil"></span>');
            $editButton.click(ns.editNews);

            var $deleteButton = $('<span class="glyphicon glyphicon-remove"></span>');
            $deleteButton.click(ns.deleteNews);

            $table.append($('<tr>')
                          .attr('data-index', i)
                          .append($newsCell)
                          .append($('<td class="news-edit"></td>').append($editButton))
                          .append($('<td class="news-delete"></td>').append($deleteButton)));
        }
    };

    ns.editNews = function(){
        var $news = $(this).parent().parent();
        window.alert($news.attr('data-index') + ' will be edited.');
    };

    ns.deleteNews = function(){
        if(window.confirm('削除してしまうとScaffoldで復元することはできませんが、よろしいですか?')){
            var index = $(this).parent().parent().attr('data-index');
            $('<form method="POST" action="/scaffold/news/delete.php"></form>')
                .append($('<input type="hidden" name="index" />').val(index))
                .appendTo(document.body)
                .submit();
        }
    };

}(this, 'kbc', 'scaffoldNewsIndex'));
