(function(){
    'use strict'

    var m = angular.module('kbcScaffoldNews', ['kbcScaffold']);

    m.factory('News', function(){
        var today = new Date();
        var self = {
            title: '',
            date: {
                year: today.getFullYear(),
                month: today.getMonth() + 1,
                day: today.getDate()
            },
            image: '/img/news/no_image.png',
            description: '',
            file: undefined
        };

        return self;
    });

    m.directive('newsPreview', function(News){
        return {
            restrict: 'A',
            link: function(scope, element, attr){
                scope.$watch(function(){
                    return News;
                }, function(){
                    element.empty();
                    kbc.news.append(element, News);
                }, true);
            }
        };
    }).$inject = ['News'];

    m.controller('NewController', function($scope, $window, News, KbcImageApi){
        $scope.news = News;

        $scope.load = function(files){
            // TODO delete image
            News.file = files[0];
            // upload image
            KbcImageApi.create(News.file, '/img/news/', function(data){
                $scope.$apply(function(){
                    $scope.imagePath = data.path;
                });
            }, function(error){
                $window.alert('サーバエラーが発生しました\n' + error);
            });
            // read for preview
            var reader = new FileReader();
            reader.onload = function(event){
                $scope.$apply(function(){
                    News.image = event.target.result;
                });
            };
            reader.readAsDataURL(News.file);
        };

        $scope.submit = function(){
            if($window.confirm('プレビューの内容でニュースを作成しますが、よろしいですか?')){
                if(!$scope.imagePath){
                    $scope.imagePath = News.image;
                }
                return true;
            } else{
                return false;
            }
        };
    }).$inject = ['$scope', '$window', 'News', 'KbcImageApi'];

}());
