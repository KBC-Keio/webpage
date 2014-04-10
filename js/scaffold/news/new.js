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

    ns.initialize = function(){
        $('input[type="button"]').click(ns.preview);
        $('input[type="file"]').on('change', function(){
            var name = this.files[0].name;
            $('.file>span').html(name);
            $('#file-name>input[type="text"]').val(name);
        });
        var today = new Date();
        $('input[name="year"]').val(today.getFullYear());
        $('input[name="month"]').val(today.getMonth() + 1);
        $('input[name="day"]').val(today.getDate());
    };

    // TODO プレビューはAngularでリアルタイムに行って、画像アップロードは最終的なときだけにする
    ns.preview = function(){
        var news = {
            title: $('input[name="title"]').val(),
            date: {
                year: $('input[name="year"]').val(),
                month: $('input[name="month"]').val(),
                day: $('input[name="day"]').val()
            },
            description: $('textarea').val()
        };

        var data = new FormData();
        var image = $('input[type="file"]')[0].files[0];
        var name = $('#file-name>input[type="text"]').val();
        console.log(name);
        data.append('image', image);
        data.append('dir', '/img/news/');
        data.append('name', name);
        $.ajax('/scaffold/image/index.php', {
            type: 'POST',
            data: data,
            processData: false,
            contentType: false,
            success: function(data){
                if(data.result){
                    $('input[name="image-path"]').val(data.path);
                    news.image = data.path;
                    kbc.news.append($('#news-preview'), news);
                    $('input[type="button"]').addClass('hide');
                    $('#news-preview').removeClass('hide');
                    $('input[type="submit"]').removeClass('hide');
                }
            },
            error: function(xhr, text, error){
                console.log(xhr.responseText, text, error);
            }
        });
    };

}(this, 'kbc', 'scaffoldNewsNew'));
