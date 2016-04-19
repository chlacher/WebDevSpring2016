module.exports = function (app, model) {

    app.get("/api/project/user/:username/:password", login);
    app.get("/api/project/user/:username", getUserByUsername);
    app.post("/api/project/user/", createUser);
    app.put("/api/project/user/:id", updateUserById);

    function login (req, res){
        var u = req.params.username;
        var p = req.params.password;
        model.findUserByCredentials({username: u, password: p}, function(user){
            res.json(user);
        });
    }

    function getUserByUsername(req, res) {
        var u = req.params.username;
        model.findUserByUsername(u, function(user){
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
        var id = req.params.id;;
        var user = req.body;
        model.updateUser(id, user, function(user){
            res.json(user);
        });
    }
};