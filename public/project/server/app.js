module.exports = function (app, db) {
    // Database Schemas and Models
    var data = require("./db.js")(db);
    // Models
    var userModel = require("./models/user.model.js")(data.User);
    // Services
    var userService = require("./services/user.service.server.js")(app, userModel);

};