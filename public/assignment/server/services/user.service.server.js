module.exports = function (app, model) {

    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    passport.use(new LocalStrategy(strategy));

    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    app.get("/api/assignment/admin/user/", isAdmin, getAllUsers);
    app.get("/api/assignment/admin/user/:id", isAdmin, getUserById);
    app.get("/api/assignment/user/name/:username", getUserByUsername);
    app.post('/api/assignment/login', passport.authenticate('local'), login);
    app.get('/api/assignment/loggedin', loggedIn);
    app.post('/api/assignment/logout', logOut);
    app.post('/api/assignment/register', register);
    app.post("/api/assignment/admin/user/", createUser);
    app.put("/api/assignment/user/", updateUser);
    app.put("/api/assignment/admin/user/:id", isAdmin, updateUserById);
    app.delete("/api/assignment/admin/user/:id", isAdmin, deleteUserById);

    function strategy(username, password, next) {
        model.findUserByCredentials({username: username, password: password}, function(user){
            if (user) {
                return next(null, user);
            }
            return next(null, false);
        });
    }

    function serializeUser(user, next) {
        next(null, user);
    }

    function deserializeUser(user, next) {
        model.findUserById(user._id, function (found) {
            next(null, user);
        });
    }

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

    function login(req, res) {
        var user = req.user;
        req.login(user, function(err){
            if (err){
                res.json(400).send(err);
            } else {
                res.json(user);
            }
        });
    }

    function loggedIn(req, res) {
        res.send(req.user);
    }

    function logOut(req, res){
        req.logOut();
        res.sendStatus(200);
    }

    function register (req, res) {
        var user = req.body;
        model.createUser(user, function(newUser){
            req.login(newUser, function(err){
                if (err){
                    res.json(400).send(err);
                } else {
                    res.json(newUser);
                }
            });
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

    function updateUser(req, res){
        req.params.id = req.user._id;
        updateUserById(req, res);
    }

    function deleteUserById (req, res) {
        var id = req.params.id;
        model.deleteUser(id, function(response) {
            res.json(response);
        });
    }

    function isAdmin(req, res, next) {
        if (req.isAuthenticated() && req.user.roles.indexOf("admin") > -1){
            next();
        } else {
            res.sendStatus(403);
        }
    }
};