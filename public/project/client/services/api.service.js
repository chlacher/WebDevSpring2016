angular
    .module('LoLCompApp')
    .factory('APIService', function($http){

        var fac = {};

        var root = "/api/project/";

        fac.GET = function(url, callback){
            $http({
                method: 'GET',
                url: root + url
            }).then(function successCallback(response) {
                //console.log("response");
                //console.log(response);
                //console.log(response.data);
                return callback(response.data);
            }, function errorCallback(response) {
                // Something went wrong
                console.log("http GET Error");
                console.log(response);
                return callback(null);
            });
        };

        fac.POST = function(url, data, callback){
            $http({
                method: 'POST',
                url: root + url,
                data: data
            }).then(function successCallback(response) {
                return callback(response.data);
            }, function errorCallback(response) {
                // Something went wrong
                console.log("http POST Error");
                console.log(response);
                return callback(null);
            });
        };

        fac.DELETE = function(url, callback){
            $http({
                method: 'DELETE',
                url: root + url
            }).then(function successCallback(response) {
                return callback(response.data);
            }, function errorCallback(response) {
                // Something went wrong
                console.log("http DELETE Error");
                console.log(response);
                return callback(null);
            });
        };

        fac.PUT = function(url, data, callback){
            $http({
                method: 'PUT',
                url: root + url,
                data: data
            }).then(function successCallback(response) {
                return callback(response.data);
            }, function errorCallback(response) {
                // Something went wrong
                console.log("http PUT Error");
                console.log(response);
                return callback(null);
            });
        };

        return fac;

    });