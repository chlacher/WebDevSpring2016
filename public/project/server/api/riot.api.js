module.exports = function(data, region, endpoint, cb) {
    var url = "https://global.api.pvp.net/api/lol/" + endpoint + "/" + region + "/v1.2/" + data + "?api_key=373db961-91ff-4b7c-9124-30d883f17951";
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