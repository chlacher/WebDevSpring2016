module.exports = function (app) {
    var users = require("./models/user.mock.json");

    var userModel = require("./models/user.model.js")(users);

    var userService = require("./services/user.service.server.js")(app, userModel);

};