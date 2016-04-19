angular
    .module('LoLCompApp')
    .factory('SummonerService', ['APIService', '$rootScope', SummonerService]);

function SummonerService(APIService, $rootScope){
        var fac = {};

        // Active Summoner (Flag for which to modify)
        fac.active = 0;

        // Array of Summoners
        fac.summoners = new Array(10);
        for (var n = 0; n<10; n++){
            fac.summoners[n] = {
                name: null,
                role: null,
                champ: null,
                champions: null,
                icon: "http://i.imgur.com/H8cydTK.png"
            };
        }

        // chooseChamp: Sets champion and icon to specified champion, notifies listeners
        fac.chooseChamp = function(champ){
            fac.summoners[fac.active].champ = champ;
            fac.summoners[fac.active].icon = "http://ddragon.leagueoflegends.com/cdn/" + $rootScope.version + "/img/champion/" + champ.key + ".png";
            fac.update();
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
                   fac.update();
               }
            });
        };

        // Clear Summoner Name
        fac.clearSummoner = function(idx){
            fac.summoners[idx].name = null;
            fac.summoners[idx].champions = null;
            fac.update();
        };

        // Listeners: callback functions that will be hit on update
        var listeners = [];

        // listen: add callback to listeners
        fac.listen = function(callback){
            listeners.push(callback);
        };

        // update: Hit all listening callback functions
        fac.update = function(){
            for (var i in listeners){
                listeners[i]();
            }
        };

        return fac;
}