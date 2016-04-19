module.exports = function(data, region, endpoint, version, cb) {
    if (version == 1.2) {
        var url = "https://global.api.pvp.net/api/lol/" + endpoint + region + "/v1.2/" + data + "?api_key=373db961-91ff-4b7c-9124-30d883f17951";
    } else if (version == 1.3){
        var url = "https://global.api.pvp.net/api/lol/" + region + "/v1.3/" + endpoint + "/" + data + "?season=SEASON2016&api_key=373db961-91ff-4b7c-9124-30d883f17951";
    } else if (version == 1.4){
        var url = "https://global.api.pvp.net/api/lol/" + region + "/v1.4/" + endpoint + '/' + data + "?api_key=373db961-91ff-4b7c-9124-30d883f17951";
    } else {
        cb({error: "Unsupported Version"});
    }
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