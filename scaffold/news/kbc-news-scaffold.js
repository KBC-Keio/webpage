(function(){
    'use strict'

    var m = angular.module('kbcScaffoldNews', ['kbcScaffold']);

    m.factory('News', function($rootScope, $window, KbcImageApi){
        var today = new Date();
        var self = {
            index: 0,
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

        self.load = function(index){
            $.getJSON('/data/news.json', function(config){
                var loaded = config.news[index];
                $rootScope.$apply(function(){
                    self.index = index;
                    self.title = loaded.title;
                    self.date = loaded.date;
                    self.image = loaded.image;
                    self.description = loaded.description;
                });
            });
        };

        self.updateImage = function(file, callback){
            // TODO delete image
            self.file = file;
            // upload image
            KbcImageApi.create(file, '/img/news/', function(err, data){
                if(err){
                    $window.alert('サーバエラーが発生しました\n' + error);
                }
                callback(data.path);
            });
            // read for preview
            var reader = new FileReader();
            reader.onload = function(event){
                $rootScope.$apply(function(){
                    self.image = event.target.result;
                });
            };
            reader.readAsDataURL(file);
        };

        return self;
    }).$inject = ['$rootScope', '$window', 'KbcImageApi'];



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
            News.updateImage(files[0], function(path){
                $scope.imagePath = path;
            });
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



    m.controller('EditController', function($scope, $location, $window, News, KbcImageApi){
        $scope.news = News;

        $scope.init = function(){
            News.load(Number($location.search().index));
        };

        $scope.load = function(files){
            News.updateImage(files[0], function(path){
                $scope.imagePath = path;
            });
        };

        $scope.submit = function(){
            if($window.confirm('プレビューの内容でニュースを編集しますが、よろしいですか?')){
                if(!$scope.imagePath){
                    $scope.imagePath = News.image;
                }
                return true;
            } else{
                return false;
            }
        };
    }).$inject = ['$scope', '$location', '$window', 'News', 'KbcImageApi'];
}());
