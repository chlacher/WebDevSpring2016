module.exports = function (app, db) {
    // Database Schemas and Models
    var data = require("./db.js")(db);
    // Mock Data TODO: Remove
    var forms = require("./models/form.mock.json");
    // Models
    var userModel = require("./models/user.model.js")(data.User);
    var formModel = require("./models/form.model.js")(forms);
    // Services
    var userService = require("./services/user.service.server.js")(app, userModel);
    var formService = require("./services/form.service.server.js")(app, formModel);
    var fieldService = require("./services/field.service.server.js")(app, formModel);
};