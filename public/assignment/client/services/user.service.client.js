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
            return APIService.POST("login", user);
        };

        fac.loggedIn = function(){
            return APIService.GET("loggedin");
        };

        fac.logOut = function(){
            return APIService.POST("logout", {});
        };

        fac.register = function(user){
            return fac.findUserByUsername(user.username).then(function(response){
                if (response.data){
                    return null
                } else {
                    return APIService.POST("register", user);
                }
            });
        };

        fac.findAllUsers = function(){
            return APIService.GET("admin/user");
        };

        fac.createUser = function(user){
            return fac.findUserByUsername(user.username).then(function(response){
               if (response.data){
                   return null
               } else {
                   return APIService.POST("admin/user", user);
               }
            });
        };

        fac.deleteUserById = function(userId){
            return APIService.DELETE("admin/user/" + userId);
        };

        fac.updateUserById = function(userId, user){
            return APIService.PUT("admin/user/" + userId, user);
        };

        fac.updateUser = function(user){
            return APIService.PUT("user", user);
        };

        return fac;

};