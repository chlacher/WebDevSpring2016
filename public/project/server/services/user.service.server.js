module.exports = function (app, model) {

    app.get("/api/project/user/:username/:password", login);
    app.get("/api/project/user/:username", getUserByUsername);
    app.post("/api/project/user/", createUser);
    //app.put("/api/assignment/user/:id", updateUserById);

    function login (req, res){
        var u = req.params.username;
        var p = req.params.password;
        var user = model.findUserByCredentials({username: u, password: p});
        res.json(user);
    }

    function getUserByUsername(req, res) {
        var u = req.params.username;
        var user = model.findUserByUsername(u);
        res.json(user);
    }

    function createUser (req, res) {
        var user = req.body;
        var now = new Date();
        user._id = now.getTime();
        res.json(model.createUser(user));
    }

    //function updateUserById (req, res) {
    //    var id = req.params.id;;
    //    var user = req.body;
    //    res.json(model.updateUser(id, user));
    //}
};