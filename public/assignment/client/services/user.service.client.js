angular
    .module('FormBuilderApp')
    .factory('UserService', ['APIService', UserService])

function UserService(APIService){

    var fac = {};

        fac.findUserByUsername = function(username){
            APIService.GET("user/name/" + username, function(response){
                return response;
            });
        };

        fac.findUserByCredentials = function(username, password, callback){
            APIService.GET("user/creds/" + username + "/" + password, callback);
        };
        fac.findAllUsers = function(callback){
            APIService.GET("user/", callback);
        };
        fac.createUser = function(user, callback){
            if (fac.findUserByUsername(user.username)){
                return callback(null);
            }
            APIService.POST("user/", user, callback);
        };
        fac.deleteUserById = function(userId, callback){
            APIService.DELETE("user/" + userId, callback);
        };
        fac.updateUser = function(userId, user, callback){
            APIService.PUT("user/" + userId, user, callback);
        };

        return fac;

};