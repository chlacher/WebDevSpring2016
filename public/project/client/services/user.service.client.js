angular
    .module('LoLCompApp')
    .factory('UserService', ['APIService', UserService])

function UserService(APIService){

    var fac = {};

    // Default Anonymous Settings
    var defaultUser = {
        region: 'NA',
        rank: 'All'
    };

    fac.user = defaultUser;

    fac.login = function(user){
        fac.user = user;
        fac.update();
    };

    fac.tryLogin = function(username, password, callback) {
        APIService.GET("login/" + username + "/" + password, callback);
    };

    fac.logout = function(){
        fac.user = defaultUser;
        fac.update();
    };

    // Listeners: callback functions that will be hit on update
    var listeners = [];

    // listen: add callback to listeners
    fac.listen = function(callback){
        listeners.push(callback);
    };

    // update: Hit all listening callback functions
    fac.update = function(){
        for (var i in listeners){
            listeners[i]();
        }
    };



        //fac.findUserByUsername = function(username){
        //    APIService.GET("user/name/" + username, function(response){
        //        return response;
        //    });
        //};


        //fac.findAllUsers = function(callback){
        //    APIService.GET("user/", callback);
        //};
        //fac.createUser = function(user, callback){
        //    if (fac.findUserByUsername(user.username)){
        //        return callback(null);
        //    }
        //    APIService.POST("user/", user, callback);
        //};
        //fac.deleteUserById = function(userId, callback){
        //    APIService.DELETE("user/" + userId, callback);
        //};
        //fac.updateUser = function(userId, user, callback){
        //    APIService.PUT("user/" + userId, user, callback);
        //};

        return fac;

};