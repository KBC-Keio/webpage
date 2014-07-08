(function(){
    'use strict'

    var m = angular.module('kbcScaffoldEvent', ['kbcScaffold']);

    m.factory('Event', function($rootScope, $window, $http, KbcImageApi){
        var today = new Date();
        var self = {
            index: 0,
            name: '',
            image: '/event/img/no_image.png',
            description: '',
            timelimit: {
                year: today.getFullYear(),
                month: today.getMonth() + 1,
                day: today.getDate(),
                hour: today.getHours(),
                minute: today.getMinutes()
            },
            details: [],
            button: undefined,
            file: undefined
        };

        $http.get('/data/configuration.json').success(function(config){
            self.datafile = '/data/event-' + config.generation + '.json';
        });

        self.load = function(generation, index){
            $.getJSON(self.datafile, function(events){
                var loaded = events[index];
                $rootScope.$apply(function(){
                    self.index = index;
                    self.name = loaded.name;
                    self.image = loaded.image;
                    self.description = loaded.description;
                    self.timelimit = loaded.timelimit;
                    self.details = loaded.details;
                    self.button = loaded.button;
                });
            });
        };

        self.updateImage = function(file, callback){
            // TODO delete image
            self.file = file;
            // upload image
            KbcImageApi.create(file, '/event/img/', function(err, data){
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
    }).$inject = ['$rootScope', '$window', '$http', 'KbcImageApi'];



    m.directive('eventPreview', function(Event){
        return {
            restrict: 'A',
            link: function(scope, element, attr){
                scope.$watch(function(){
                    return Event;
                }, function(){
                    element.empty();
                    var event = new kbc.event.EventCard(Event.name, Event.image, Event.description, Event.timelimit);
                    if(Event.details.length > 0){
                        event.setDetail(Event.details);
                    }
                    if(Event.button){
                        event.setButton(Event.button.url, Event.button.text);
                    }
                    event.render(element);
                }, true);
            }
        };
    }).$inject = ['Event'];



    m.controller('NewController', function($scope, $window, Event, KbcImageApi){
        $scope.event = Event;
        $scope.details = Event.details;

        $scope.addLinkText = 'リンクボタンをつける';
        $scope.toggleLink = function(){
            if(Event.button){
                Event.button = undefined;
                $scope.addLinkText = 'リンクボタンをつける';
            } else{
                Event.button = {
                    url: '',
                    text: ''
                };
                $scope.addLinkText = 'リンクボタンを削除';
            }
        };

        $scope.addDetails = function(){
            Event.details.push({
                title: '',
                content: ''
            });
        };

        $scope.deleteDetail = function($index){
            Event.details.splice($index, 1);
        };

        $scope.load = function(files){
            Event.updateImage(files[0], function(path){
                $scope.imagePath = path;
            });
        };

        $scope.submit = function(){
            if($window.confirm('プレビューの内容でイベントを作成しますが、よろしいですか?')){
                if(!$scope.imagePath){
                    $scope.$apply(function(){
                        $scope.imagePath = Event.image;
                    });
                }
                return true;
            } else{
                return false;
            }
        };
    }).$inject = ['$scope', '$window', 'Event', 'KbcImageApi'];



    /*
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
                    $scope.$apply(function(){
                        $scope.imagePath = News.image;
                    });
                }
                return true;
            } else{
                return false;
            }
        };
    }).$inject = ['$scope', '$location', '$window', 'News', 'KbcImageApi'];
    */
}());
