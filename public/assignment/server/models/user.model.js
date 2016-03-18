module.exports = function(users) {
    var api = {};

    api.findAllUsers = function() {
        return users;
    };

    api.findUserById = function(id) {
        for (var idx in users) {
            if (users[idx]._id == id)
                return users[idx];
        }
        return null;
    };

    api.findUserByUsername = function(username) {
        for (var idx in users) {
            if (users[idx].username === username)
                return users[idx];
        }
        return null;
    };

    api.findUserByCredentials = function(creds) {
        for (var idx in users) {
            if (users[idx].username == creds.username &&
                users[idx].password == creds.password)
                return users[idx];
        }
        return null;
    };

    api.createUser = function(user) {
        var now = new Date();
        user._id = now.getTime();
        users.push(user);
        return users;
    };

    api.updateUser = function(id, user) {
        for (var idx in users) {
            if (users[idx]._id == id) {
                users[idx] = user;
                return true;
            }
        }
        return false;
    };

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