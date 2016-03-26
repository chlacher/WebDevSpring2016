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
        APIService.GET("user/" + username + "/" + password, callback);
    };

    fac.logout = function(){
        fac.user = defaultUser;
        fac.update();
    };

    fac.tryRegister = function(data, callback){
        // Parse for errors
        if (data.password.length < 3){
            return callback(null, "Password does not meet requirements");
        } else if (data.password != data.confirm) {
            return callback(null, "Passwords do not match");
        }
        var user = APIService.GET("user/" + data.username, function(u){return u});
        if (user){
            return callback(null, "User Already Exists");
        }

        // Create User
        APIService.POST("user/", {
            "username": data.username,
            "password": data.password,
            "summoner": data.summoner,
            "region": data.region,
            "rank": data.rank
        }, callback);

    };

    fac.tryUpdate = function(data, callback){
        APIService.PUT("user/" + data._id, data, callback);
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

    return fac;

};