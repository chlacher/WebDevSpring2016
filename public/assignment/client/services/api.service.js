angular
    .module('FormBuilderApp')
    .factory('APIService', function($http){

        var fac = {};

        var root = "/api/assignment/";

        fac.GET = function(url){
            return $http({
                method: 'GET',
                url: root + url
            });
        };

        fac.POST = function(url, data){
            return $http({
                method: 'POST',
                url: root + url,
                data: data
            });
        };

        fac.DELETE = function(url){
            return $http({
                method: 'DELETE',
                url: root + url
            });
        };

        fac.PUT = function(url, data){
            return $http({
                method: 'PUT',
                url: root + url,
                data: data
            });
        };

        return fac;

    });