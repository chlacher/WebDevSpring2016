angular
    .module('LoLCompApp')
    .factory('SummonerService', ['APIService', '$rootScope', SummonerService]);

function SummonerService(APIService, $rootScope){
        var fac = {};

        // Active Summoner (Flag for which to modify)
        fac.active = 0;
        // All Champ Data
        fac.champs = [];

        // Array of Summoners
        fac.summoners = new Array(10);
        for (var n = 0; n<10; n++){
            fac.summoners[n] = {
                name: null,
                role: null,
                champ: null,
                champions: null,
                winrate: null,
                icon: "http://i.imgur.com/H8cydTK.png"
            };
        }

        // chooseChamp: Sets champion and icon to specified champion, notifies listeners
        fac.chooseChamp = function(champ){
            fac.summoners[fac.active].champ = champ;
            fac.summoners[fac.active].icon = "http://ddragon.leagueoflegends.com/cdn/" + $rootScope.version + "/img/champion/" + champ.key + ".png";
            update();
        };

        // Search for Summoner Name, See if Exists
        fac.searchSummoner = function(name, idx){
            APIService.GET("summoner/" + name, function(summoner){
               if (!summoner){
                   alert("Summoner Not Found");
               } else {
                   console.log(summoner);
                   fac.summoners[idx].name = summoner.name;
                   fac.summoners[idx].champions = summoner.champions;
                   update();
               }
            });
        };

        // Clear Summoner Name
        fac.clearSummoner = function(idx){
            fac.summoners[idx].name = null;
            fac.summoners[idx].champions = null;
            update();
        };

        // Get updated role from dropdown
        fac.updateRole = function(idx, to){
            fac.summoners[idx].role = to;
            update();
        };

        // Normalize Data to Reduce Low Sample Size From Distorting Data Heavily
        var normalizeData = function(observed, expected, num, degree){
            return (observed*num + expected*degree)/(num + degree)
        };

        // Calculate Expected Winrate Given Number of Games
        var getExpectedWinRate = function(gamesPlayed, distr){
            // If in 125+ group, just use value
            if (gamesPlayed >= 125){
                return distr[4];
            }
            var rates = [1, 5, 15, 50, 125];
            for (var i = 0; i < 4; i++){
                if (rates[i+1] > gamesPlayed){
                    // Bottom of Triangle:
                    var bot = (gamesPlayed - rates[i]);
                    // Hypotenuse
                    var hyp = Math.abs(distr[i+1]-distr[i]);
                    // Percentage of the increase
                    var perc = bot/(rates[i+1]-rates[i]);
                    // Use Trig to Find Value
                    return distr[i] + perc*hyp;
                }
            }
        };

        // Champion GG Data by ChampId for specific role
        var getChampGGData = function(champId, type, role){
            for (var idx in fac.champs){
                var champ = fac.champs[idx];
                if (champ.id == champId){
                    for (var idx2 in champ[type]){
                        if (champ[type][idx2].role.toLowerCase() == role.toLowerCase()){
                            return champ[type][idx2];
                        }
                    }
                }
            }
        };

        var getSumChampWinrate = function(summoner){
            var champId = summoner.champ.id;
            var ggData = getChampGGData(champId, 'chGGdata', summoner.role);
            for (var idx in summoner.champions){
                var champ = summoner.champions[idx];
                if (champ.id == champId){
                    var gamesPlayed = champ['stats']['totalSessionsPlayed'];
                    var winRate = champ['stats']['totalSessionsWon']/gamesPlayed;
                    // Get 'expected winrate' from experience (if exists)
                    if (ggData) {
                        var expWin = getExpectedWinRate(gamesPlayed, ggData['experienceRate']);
                        return normalizeData(winRate*100, expWin, gamesPlayed, 5);
                    }
                    // No champGG data, just return player winrate normalized with 50%
                    return normalizeData(winRate*100, 50, gamesPlayed, 5);
                }
            }
            // No games played or unknown, return champion winrate
            if (ggData){
                return ggData['patchWin'][4];
            }
            // No data available, no data to give
            return null;
        };

        fac.calcAdjustedWin = function(){
            for (var idx in fac.summoners){
                var summ = fac.summoners[idx]
                // See if champ selected
                if (summ.champ && summ.role){
                    // Step 1: Check for Summoner Winrate
                    fac.summoners[idx].winRate = getSumChampWinrate(summ);
                }

            }
        };

        // Listeners: callback functions that will be hit on update
        var listeners = [];

        // listen: add callback to listeners
        fac.listen = function(callback){
            listeners.push(callback);
        };

        // Hit functions triggered by update
        var update = function(){
            fac.update();
            fac.calcAdjustedWin();
        };

        // update: Hit all listening callback functions
        fac.update = function(){
            for (var i in listeners){
                listeners[i]();
            }
        };

        return fac;
}