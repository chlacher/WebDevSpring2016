var express = require('express');
var app = express();

// Body Parser: Needed for API Put
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Client
app.use(express.static(__dirname + '/public/assignment/client/'));
// Server
require("./public/assignment/server/app.js")(app);

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;



app.listen(port, ipaddress);