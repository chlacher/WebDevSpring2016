module.exports = function (db) {
    var data = {}
    // User
    var UserSchema = new db.Schema({"firstName": String, "lastName": String, "username": String, "password": String});
    data.User = db.model("User", UserSchema);

    return data;
};