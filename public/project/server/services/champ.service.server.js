module.exports = function (app, model, riotAPI, cggAPI) {

    app.get("/api/project/champ", getLatestData);
    app.get("/api/project/champ/update", updateData);

    function getLatestData(req, res){
        model.getLatestChampData(function(resp){
            res.json(resp);
        });
    }

    // Helper to parse into champion object
    function parseData(champ, roles, champStats, champData){
        return {
            id: champ.id,
            key: champ.key,
            name: champ.name,
            roles: roles,
            chGGstats: champStats,
            chGGdata: champData
        }
    }

    // Gets both types of champion data from champion.gg
    function getExtraData(champ, cb){
        cggAPI('stats/champs/' + champ.key, function (champStats) {
            cggAPI('champion/' + champ.key, function (champData) {
                var roles = [];
                for (var idx in champData) {
                    roles.push(champData[idx].role);
                }
                cb(parseData(champ, roles, champStats, champData));
            });
        });
    }

    // Get Average Damage Dealt for Whole Team
    function getAvgDamage(cb){
        cggAPI('stats/role', function(roleStats) {
            var dmg = 0;
            for (var idx in roleStats){
                dmg+= roleStats[idx]['data']['damageDealt'];
            }
            cb(dmg);
        });
    }

    // Recursively Builds Object from Several API Calls (for easier access)
    function parseChamps(riotChamps, champKeys, list, version, cb){
        var key = champKeys.pop();
        if (!key){
            getAvgDamage(function(dmg){
                model.createChamp({
                    version: version,
                    avgDmg: dmg,
                    champions: list
                }, function(newChamp) {
                    cb({data: newChamp, response: "Successfully Updated Data"});
                });
            });
        } else {
            getExtraData(riotChamps[key], function(parsed){
                list.push(parsed);
                parseChamps(riotChamps, champKeys, list, version, cb);
            });

        }
    }

    // Gets latest version from riot server with list of champs, gets champ data from champion.gg
    function updateData (req, res){
        riotAPI('versions', 'na', 'static-data', 1.2, function(versions){
                var version = versions[0];
                // Check if latest data version already exists
                model.getAllChampData(version, function(data){
                        if(data){
                            res.json({data: data, response: "Latest Version Already Up"});
                        } else {
                            // Get all champions from riot API
                            riotAPI('champion', 'na', 'static-data', 1.2, function(riotData){
                                    var riotChamps = riotData.data;
                                    // Parse information into JSON object for DB storage
                                    var champKeys = [];
                                    for (var key in riotChamps) {
                                        champKeys.push(key);
                                    }
                                    parseChamps(riotChamps, champKeys, [], version, function(response){
                                        res.json(response);
                                    })
                                })
                        }
                    })
            });
    }
};