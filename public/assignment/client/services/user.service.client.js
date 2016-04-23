angular
    .module('FormBuilderApp')
    .factory('UserService', ['APIService', UserService]);

function UserService(APIService){

    var fac = {};

        fac.findUserByUsername = function(username){
            return APIService.GET("user/name/" + username);
        };

        fac.login = function(username, password){
            var user = {
                username: username,
                password: password
            };
            return APIService.POST("user/login/", user);
        };

        fac.findAllUsers = function(callback){
            return APIService.GET("user/");
        };

        fac.createUser = function(user){
            return fac.findUserByUsername(user.username).then(function(response){
               if (response.data){
                   return null
               } else {
                   return APIService.POST("user/", user);
               }
            });
        };

        fac.deleteUserById = function(userId){
            return APIService.DELETE("user/" + userId);
        };

        fac.updateUser = function(userId, user){
            return APIService.PUT("user/" + userId, user);
        };

        return fac;

};