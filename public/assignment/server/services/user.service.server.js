module.exports = function (app, model) {

    app.get("/api/assignment/user/", getAllUsers);
    app.get("/api/assignment/user/:id", getUserById);
    app.get("/api/assignment/user/name/:username", getUserByUsername);
    app.get("/api/assignment/user/creds/:username/:password", getUserByCredentials);
    app.post("/api/assignment/user/", createUser);
    app.put("/api/assignment/user/:id", updateUserById);
    app.delete("/api/assignment/user/:id", deleteUserById);

    function getAllUsers (req, res) {
        res.json(model.findAllUsers());
    }

    function getUserById (req, res) {
        var id = req.params.id;
        var user = model.findUserById(id);
        res.json(user);
    }

    function getUserByUsername(req, res) {
        var u = req.params.username;
        var user = model.findUserByUsername(u);
        res.json(user);
    }

    function getUserByCredentials(req, res) {
        var u = req.params.username;
        var p = req.params.password;
        var user = model.findUserByCredentials({username: u, password: p});
        res.json(user);
    }

    function createUser (req, res) {
        var user = req.body;
        var now = new Date();
        user._id = now.getTime();
        res.json(model.createUser(user));
    }

    function updateUserById (req, res) {
        var id = req.params.id;
        var user = req.body;
        res.json(model.updateUser(id, user));
    }

    function deleteUserById (req, res) {
        var id = req.params.id;
        model.deleteUser(id);
        res.json (model.findAllUsers());
    }
};