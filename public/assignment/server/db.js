module.exports = function (db) {
    var ObjectId = db.Schema.Types.ObjectId;

    var data = {}
    // User
    var UserSchema = new db.Schema({"firstName": String, "lastName": String, "username": String, "password": String, "email": String, "roles": {type: [String], default: ["user"]}});
    data.User = db.model("User", UserSchema);

    // Form
    var FormSchema = new db.Schema({title: String, userId: ObjectId, fieldIds: [ObjectId]});
    data.Form = db.model("Form", FormSchema);

    // Field
    var FieldSchema = new db.Schema({label: String, type: String, attrs: []});
    data.Field = db.model("Field", FieldSchema);

    return data;
};