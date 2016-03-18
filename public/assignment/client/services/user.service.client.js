angular
    .module('FormBuilderApp')
    .factory('UserService', function($http){

    var fac = {};

        fac.findUserByUsername = function(username){
            return $http.get("/api/assignment/user?username=" + username);
        };
        fac.findUserByCredentials = function(username, password, callback){
            return callback($http.get("api/assignment/user?username=" + username + "&password=" + password));
        };
        fac.findAllUsers = function(callback){
            return callback($http.get("/api/assignment/user"));
        };
        fac.createUser = function(user, callback){
            if (fac.findUserByUsername(user.username)){
                return callback(null);
            }
            return callback($http.post("/api/assignment/user", {body: user}));
        };
        fac.deleteUserById = function(userId, callback){
            return callback($http.delete("/api/assignment/user?id=" + userId));
        };
        fac.updateUser = function(userId, user, callback){
            return callback($http.put("/api/assignment/user?id=" + userId, {body: user}));
        };

        return fac;

});