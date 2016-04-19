module.exports = function (app, riotAPI) {

    app.get("/api/project/summoner/:name", getSummonerByName);

    function getSummonerByName(req, res){
        var name = req.params.name.toLowerCase();
        riotAPI('by-name/' + req.params.name, 'na', 'summoner', 1.4, function(resp){
            // Abort if Summoner Does Not Exist
            if (!resp[name]){
                res.json(null);
            } else {
                riotAPI('by-summoner/' + resp[name].id + '/ranked', 'na', 'stats', 1.3, function (result) {
                    // Get proper casing on name
                    result.name = resp[name].name;
                    res.json(result);
                });
            }
        });
    }


};