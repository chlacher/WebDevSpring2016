module.exports = function (app, db) {
    // Database Schemas and Models
    var data = require("./db.js")(db);
    // Models
    var userModel = require("./models/user.model.js")(data.User);
    var champModel = require("./models/champ.model.js")(data.Champ);
    // 3rd Party APIs
    var riotAPI = require("./api/riot.api.js");
    var cggAPI = require("./api/champion.gg.api.js");
    // Services
    var userService = require("./services/user.service.server.js")(app, userModel);
    var champService = require("./services/champ.service.server.js")(app, champModel, riotAPI, cggAPI);
}