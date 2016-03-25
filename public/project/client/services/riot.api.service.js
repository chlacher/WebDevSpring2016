angular
    .module('LoLCompApp')
    .factory('RiotAPIService', function($http){

        var fac = {};

        var url = "https://global.api.pvp.net";
        var params = "?api_key=373db961-91ff-4b7c-9124-30d883f17951";

        fac.GET = function(data, callback){
            $http({
                method: 'GET',
                url: url + data + params
            }).then(function successCallback(response) {
                return callback(response.data);
            }, function errorCallback(response) {
                // Something went wrong
                console.log("http GET Error");
                console.log(response);
                return callback(null);
            });
        };

        return fac;

    });