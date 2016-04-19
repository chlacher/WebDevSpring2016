module.exports = function (db) {
    var ObjectId = db.Schema.Types.ObjectId;

    var data = {};
    // User
    var UserSchema = new db.Schema({username: String, password: String, summoner: String, region: String});
    data.User = db.model("Project_User", UserSchema);
    // Champion Schema: Stores all relevant information about champion (to reduce total API calls and remove API uptime dependability)
    //var ChampSchema = new db.Schema({version: String, avgDmg: Number, champions: [{id: "String", key: "String", name: "String", roles: [String], chGGdata: {}, chGGstats: {}}]});
    //data.Champ = new db.model("Project_Champ", ChampSchema);

    return data;
};