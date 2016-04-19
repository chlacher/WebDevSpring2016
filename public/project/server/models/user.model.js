module.exports = function(User) {
    var api = {
        findAll: findAll,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        createUser: createUser,
        updateUser: updateUser
    };

    function findAll(cb){
        User.find({}, function(err, users){
            if (err || !users){
                cb(null);
            } else {
                cb(users);
            }
        });
    }

    function findUserByUsername(username, cb){
        User.find({username: username}, function(err, users){
            if (err || !users){
                cb(null);
            } else {
                cb(users[0]);
            }
        });
    }

    function findUserByCredentials(creds, cb) {
        User.find({username: creds.username, password: creds.password}, function (err, users) {
            if (err || !users) {
                cb(null);
            } else {
                cb(users[0]);
            }
        });
    }

    function createUser(user, cb) {
        User.create(user, function(error, newUser){
            cb(newUser);
        });
    }

    function updateUser(id, user, cb) {
        User.update(
            {_id: id},
            {username: user.username, password: user.password, summoner: user.summoner, region: user.region},
            function(err, numberAffected, rawResponse) {
                console.log(err);
                console.log(numberAffected);
                console.log(rawResponse);
                if (!err) {
                    cb({success: "User Updated"});
                } else {
                    cb(err);
                }
            });
    }

    return api;
};