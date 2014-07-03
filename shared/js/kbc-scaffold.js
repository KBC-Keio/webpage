(function(){
    'use strict'

    var m = angular.module('kbcScaffold', []);

    m.directive('kbcFileLoader', function(){
        return {
            restrict: 'A',
            link: function(scope, element, attr){
                var callback = scope[attr.kbcFileLoader];
                if(typeof(callback) == 'function'){
                    element.bind('change', function(event){
                        callback(event.target.files);
                    });
                }
            }
        };
    });

    m.directive('kbcFormSubmit', function(){
        return {
            restrict: 'A',
            link: function(scope, element, attr){
                var callback = scope[attr.kbcFormSubmit];
                if(typeof(callback) == 'function'){
                    element.bind('submit', function(event){
                        return callback(event);
                    });
                }
            }
        };
    });

    m.factory('KbcImageApi', function(){
        var ajaxImageApi = function(url, method, data, successCallback, errorCallback){
            var formData = new FormData();
            for(var i in data){
                formData.append(i, data[i]);
            }
            $.ajax(url, {
                type: method,
                async: false,
                data: formData,
                processData: false,
                contentType: false,
                success: function(data){
                    if(data.result){
                        successCallback(data);
                    } else if(typeof(errorCallback) == 'function'){
                        errorCallback(data.error);
                    }
                },
                error: function(xhr, text, msg){
                    if(typeof(errorCallback) == 'function'){
                        errorCallback(xhr.responseText + text + msg, xhr, text, msg);
                    }
                }
            });
        };

        return {
            create: function(image, dir, successCallback, errorCallback){
                ajaxImageApi('/scaffold/image/index.php', 'POST', {
                    image: image,
                    dir: dir
                }, successCallback, errorCallback);
            },
            destroy: function(dir, name , successCallback, errorCallback){
                ajaxImageApi('/scaffold/image/destroy.php', 'POST', {
                    dir: dir,
                    name: name
                }, successCallback, errorCallback);
            }
        };
    });
}());
