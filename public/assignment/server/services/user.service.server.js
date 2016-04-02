module.exports = function (app, model) {

    app.get("/api/assignment/user/", getAllUsers);
    app.get("/api/assignment/user/:id", getUserById);
    app.get("/api/assignment/user/name/:username", getUserByUsername);
    app.get("/api/assignment/user/creds/:username/:password", getUserByCredentials);
    app.post("/api/assignment/user/", createUser);
    app.put("/api/assignment/user/:id", updateUserById);
    app.delete("/api/assignment/user/:id", deleteUserById);

    function getAllUsers (req, res) {
        model.findAllUsers(function(users){
            res.json(users);
        });
    }

    function getUserById (req, res) {
        var id = req.params.id;
        model.findUserById(id, function(user){
            res.json(user);
        });
    }

    function getUserByUsername(req, res) {
        var u = req.params.username;
        model.findUserByUsername(u, function(user){
            res.json(user);
        });
    }

    function getUserByCredentials(req, res) {
        var u = req.params.username;
        var p = req.params.password;
        model.findUserByCredentials({username: u, password: p}, function(user){
            res.json(user);
        });
    }

    function createUser (req, res) {
        var user = req.body;
        model.createUser(user, function(newUser){
            res.json(newUser);
        });
    }

    function updateUserById (req, res) {
        var id = req.params.id;
        var user = req.body;
        model.updateUser(id, user, function(user){
            res.json(user);
        });
    }

    function deleteUserById (req, res) {
        var id = req.params.id;
        model.deleteUser(id, function(response) {
            res.json(response);
        });
    }
};