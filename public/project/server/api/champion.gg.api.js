module.exports = function(data, cb) {
    var url = "http://api.champion.gg/" + data + "?api_key=bd94b5c332767b8dae30ece4087e854c";
    console.log(url);
    var request = require('request');
    request(url, function (err, response, body) {
        if (err){
            console.log("An error has occurred");
            cb(null);
        }
        cb(JSON.parse(body));
    });
}