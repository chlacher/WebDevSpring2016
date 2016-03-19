angular
    .module('FormBuilderApp')
    .factory('UserService', function($http, $location){

    var fac = {};
        var root = "http://" + $location.host() + "/api/assignment/user";
        fac.findUserByUsername = function(username){
            return $http({
                method: 'GET',
                url: root + "/name/" + username
            }).then(function successCallback(response) {
                return response.data;
            }, function errorCallback(response) {
                // Something went wrong
                return null;
            });
        };
        fac.findUserByCredentials = function(username, password, callback){
            return $http({
                method: 'GET',
                url: root + "/creds/" + username + "/" + password
            }).then(function successCallback(response) {
                return callback(response.data);
            }, function errorCallback(response) {
                // Something went wrong
                return null;
            });
        }
        fac.findAllUsers = function(callback){
            return $http({
                method: 'GET',
                url: root + "/"
            }).then(function successCallback(response) {
                return callback(response.data);
            }, function errorCallback(response) {
                // Something went wrong
                return null;
            });
        };
        fac.createUser = function(user, callback){
            if (fac.findUserByUsername(user.username)){
                return callback(null);
            }
            return $http({
                method: 'POST',
                url: root + "/",
                data: {body: user}
            }).then(function successCallback(response) {
                return callback(response.data);
            }, function errorCallback(response) {
                // Something went wrong
                return null;
            });
        };
        fac.deleteUserById = function(userId, callback){
            return $http({
                method: 'DELETE',
                url: root + "/" + userId
            }).then(function successCallback(response) {
                return callback(response.data);
            }, function errorCallback(response) {
                // Something went wrong
                return null;
            });
        };
        fac.updateUser = function(userId, user, callback){
            return $http({
                method: 'PUT',
                url: root + "/",
                data: {body: user}
            }).then(function successCallback(response) {
                return callback(response.data);
            }, function errorCallback(response) {
                // Something went wrong
                return null;
            });
        };

        return fac;

});