/*
 * window.kbc.scaffoldNewsEdit
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
            return window.confirm('プレビューの内容でニュースを編集しますが、よろしいですか?');
        });
    };

}(this, 'kbc', 'scaffoldNewsEdit'));



var m = angular.module('ScaffoldNews', ['angularFileUpload']);

m.filter('preview', function(){
    return function(news){
        var $preview = $('#news-preview');
        $preview.empty();
        kbc.news.append($preview, news);
        return '';
    };
});

m.controller('FormController', function($scope, $location){

    $scope.news = { date: {} };
    $scope.index = Number($location.search().index);

    $.getJSON('/data/news.json', function(config){
        $scope.$apply(function(){
            $scope.news = config.news[$scope.index];
        });
    });

}).$inject = ['$scope', '$location'];
