/*
 * window.kbc.scaffoldNewsNew
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
        $('form').on('submit', function(){
            var error;
            if(window.confirm('プレビューの内容でニュースを作成しますが、よろしいですか?')){
                var $image = $('input[name="image"]');
                var file = $('input[type="file"]')[0].files[0];

                if(file){
                    var data = new FormData();
                    data.append('image', files);
                    data.append('name', $('#file-name>input[type="text"]').val());
                    data.append('dir', '/img/news/');

                    $.ajax('/scaffold/image/index.php', {
                        type: 'POST',
                        async: false,
                        data: data,
                        processData: false,
                        contentType: false,
                        success: function(data){
                            if(data.result){
                                $image.val(data.path);
                            }
                        },
                        error: function(xhr, text, msg){
                            error = xhr.responseText + text + msg;
                            window.alert('サーバエラーが発生しました\n' + error);
                        }
                    });
                } else{
                    $image.val(ns.noImagePath);
                }
            } else{
                error = true;
            }

            if(error){
                return false;
            } else{
                return true;
            }
        });
    };

    ns.noImagePath = '/img/news/no_image.png';

}(this, 'kbc', 'scaffoldNewsNew'));



var m = angular.module('ScaffoldNews', ['angularFileUpload']);

m.filter('preview', function(){
    return function(news){
        var $preview = $('#news-preview');
        $preview.empty();
        kbc.news.append($preview, news);
        return '';
    };
});

m.controller('FormController', function($scope){

    var today = new Date();
    $scope.news = {
        date: {
            year: today.getFullYear(),
            month: today.getMonth() + 1,
            day: today.getDate()
        },
        image: window.kbc.scaffoldNewsNew.noImagePath
    };

    $scope.imageName = 'クリックしてファイルを選択';
    $scope.onFileSelect = function($files){
        var file = $files[0];
        $scope.uploadName = file.name;
        $scope.imageName = file.name;

        var reader = new FileReader();
        reader.onload = function(event){
            $scope.$apply(function(){
                $scope.news.image = event.target.result;
                $scope.uploaded = true;
            });
        };
        reader.readAsDataURL(file);
    };

}).$inject = ['$scope'];
