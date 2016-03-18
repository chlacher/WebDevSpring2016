module.exports = function (app) {
    var users = require("./models/user.mock.json");
    var forms = require("./models/form.mock.json");

    var userModel = require("./models/user.model.js")(users);
    var formModel = require("./models/form.model.js")(forms);

    var userService = require("./services/user.service.server.js")(app, userModel);
    var formService = require("./services/form.service.server.js")(app, formModel);
    var fieldService = require("./services/field.service.server.js")(app, formModel);

};