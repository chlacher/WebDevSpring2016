module.exports = function (app, db) {
    // Database Schemas and Models
    var data = require("./db.js")(db);
    // Models
    var userModel = require("./models/user.model.js")(data.User);
    var formModel = require("./models/form.model.js")(data.Form, data.Field);
    // Services
    var userService = require("./services/user.service.server.js")(app, userModel);
    var formService = require("./services/form.service.server.js")(app, formModel);
    var fieldService = require("./services/field.service.server.js")(app, formModel);
};