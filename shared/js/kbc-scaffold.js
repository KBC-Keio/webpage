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
        var ajaxImageApi = function(url, method, data, callback){
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
                        callback(undefined, data);
                    } else{
                        callback(data.error);
                    }
                },
                error: function(xhr, text, msg){
                    callback(xhr.responseText + text + msg);
                }
            });
        };

        return {
            create: function(image, dir, callback){
                ajaxImageApi('/scaffold/image/index.php', 'POST', {
                    image: image,
                    dir: dir
                }, callback);
            },
            destroy: function(dir, name , callback){
                ajaxImageApi('/scaffold/image/destroy.php', 'POST', {
                    dir: dir,
                    name: name
                }, callback);
            }
        };
    });
}());
