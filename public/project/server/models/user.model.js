module.exports = function(users) {
    var api = {};

    api.findUserByUsername = function(username) {
        for (var idx in users) {
            if (users[idx].username === username)
                return users[idx];
        }
        return null;
    };

    api.findUserByCredentials = function(creds) {
        for (var idx in users) {
            if (users[idx].username.toLowerCase() == creds.username.toLowerCase() &&
                users[idx].password == creds.password)
                return users[idx];
        }
        return null;
    };

    api.createUser = function(user) {
        var now = new Date();
        user._id = now.getTime();
        users.push(user);
        return user;
    };

    api.updateUser = function(id, user) {
        for (var idx in users) {
            if (users[idx]._id == id) {
                users[idx] = user;
                return user;
            }
        }
        return null;
    };

    return api;
};