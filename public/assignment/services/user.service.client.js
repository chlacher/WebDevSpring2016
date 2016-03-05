angular
    .module('FormBuilderApp')
    .factory('UserService', function(){

    var fac = {};

        fac.users = [
            {        "_id":123, "firstName":"Alice",            "lastName":"Wonderland",
                "username":"alice",  "password":"alice",   "roles": ["student"]                },
            {        "_id":234, "firstName":"Bob",              "lastName":"Hope",
                "username":"bob",    "password":"bob",     "roles": ["admin"]                },
            {        "_id":345, "firstName":"Charlie",          "lastName":"Brown",
                "username":"charlie","password":"charlie", "roles": ["faculty"]                },
            {        "_id":456, "firstName":"Dan",              "lastName":"Craig",
                "username":"dan",    "password":"dan",     "roles": ["faculty", "admin"]},
            {        "_id":567, "firstName":"Edward",           "lastName":"Norton",
                "username":"ed",     "password":"ed",      "roles": ["student"]                }
        ];
        fac.findUserByUsername = function(username){
            for (var idx = 0; idx < fac.users.length; idx++){
                if (fac.users[idx].username == username){
                    return fac.users[idx];
                }
            }
            return null;
        };
        fac.findUserByCredentials = function(username, password, callback){
            var user = fac.findUserByUsername(username);
            if (user && user.password == password){
                return callback(user);
            }
            return callback(null);
        };
        fac.findAllUsers = function(callback){
            return callback(fac.users);
        };
        fac.createUser = function(user, callback){
            if (fac.findUserByUsername(user.username)){
                return callback(null);
            }
            user._id = (new Date).getTime();
            fac.users.push(user);
            return callback(user);
        };
        fac.deleteUserById = function(userId, callback){
            for (var idx = 0; idx < fac.users.length; idx++){
                if (fac.users[idx]._id == userId){
                    fac.users.splice(idx, 1);
                    return callback(fac.users);
                }
            }
            return callback(fac.users);
        };
        fac.updateUser = function(userId, user, callback){
            user._id = userId;
            for (var idx = 0; idx < fac.users.length; idx++){
                if (fac.users[idx]._id == userId){
                    fac.users[idx] = user;
                    return callback(user);
                }
            }
            return callback(null);
        };

        return fac;

});