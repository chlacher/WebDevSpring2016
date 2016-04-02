var express = require('express');

// Assignment
var app = express();

// Body Parser: Needed for API Put
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect to DB
var db = require('mongoose');
var connectionString =  'mongodb://localhost/';

// If we are on OPENSHIFT
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD){
    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/';
}

db.connect(connectionString  + 'assignment');

// Client
app.use(express.static(__dirname + '/public/'));
// Server
require("./public/assignment/server/app.js")(app, db);
require("./public/project/server/app.js")(app);

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.listen(port, ipaddress);