/*
 * title       : KBC Angular Scafoold
 * description : Scaffoldページで使用するAngularJSライブラリ郡。scaffoldディレクトリ以下のHTML/PHPファイルで読み込みます。基本的に本ファイルの内容は一切書き換えてはいけません。JavaScriptおよびjQuery、AngularJSを十分に理解していないメンバーが書き換えた場合にはScaffoldページが正しく機能しなくなる恐れがあります。
 * dependency  : jQuery 1.10.2, AngularJS 1.3.0-beta.5
 * version     : 1.0.0
 * date        : 2014年7月6日
 * author      : 第9期実行委員 出水厚輝
 */



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
