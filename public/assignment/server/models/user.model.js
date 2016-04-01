module.exports = function(users, User) {

    var api = {};

    api.findAllUsers = function(cb) {
        User.find({}, function(err, users){
            cb(users);
        });
    };

    api.findUserById = function(id, cb) {
        User.find({"_id": id}, function(err, users){
            if (err || !users){
                cb(null);
            } else {
                cb(users[0]);
            }
        });
    };

    api.findUserByUsername = function(username, cb) {
        User.find({"username": username}, function(err, users){
            if (err || !users){
                cb(null);
            } else {
                cb(users[0]);
            }
        });
    };

    api.findUserByCredentials = function(creds, cb) {
        User.find({"username": creds.username, "password": creds.password}, function(err, users){
            if (err || !users){
                cb(null);
            } else {
                cb(users[0]);
            }
        });
    };

    api.createUser = function(user, cb) {
        User.create(user, function(error, doc){
            cb(user);
        });
    };

    api.updateUser = function(id, user, cb) {
        User.update(
            {"_id": id},
            {"firstName": user.firstName, "lastName": user.lastName, "username": user.username, "password": user.password, "email": user.email},
            function(err, numberAffected, rawResponse) {
                console.log(err);
                console.log(numberAffected);
                console.log(rawResponse);
                api.findUserById(id, cb);
        });
    };
    // TODO
    api.deleteUser = function(id) {
        for (var idx in users) {
            if (users[idx]._id == id) {
                users.splice(idx, 1);
                return true;
            }
        }
        return false;
    };

    return api;
};