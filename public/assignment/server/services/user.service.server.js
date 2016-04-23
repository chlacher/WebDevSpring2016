module.exports = function (app, model) {

    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    passport.use(new LocalStrategy(strategy));

    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    app.get("/api/assignment/user/", getAllUsers);
    app.get("/api/assignment/user/:id", getUserById);
    app.get("/api/assignment/user/name/:username", getUserByUsername);
    app.post('/api/assignment/login', passport.authenticate('local'), login);
    app.get('/api/assignment/loggedin', loggedIn);
    app.post('/api/assignment/logout', logOut);
    app.post('/api/assignment/register', register);
    app.post("/api/assignment/user/", createUser);
    app.put("/api/assignment/user/:id", updateUserById);
    app.delete("/api/assignment/user/:id", deleteUserById);

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
        model.findUserById(user._id, function (user) {
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
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function logOut(req, res){
        req.logOut();
        res.send(200);
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

    function deleteUserById (req, res) {
        var id = req.params.id;
        model.deleteUser(id, function(response) {
            res.json(response);
        });
    }
};