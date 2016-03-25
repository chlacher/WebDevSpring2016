angular
    .module('LoLCompApp')
    .factory('SummonerService', function($rootScope) {

        var fac = {};

        // Active Summoner (Flag for which to modify)
        fac.active = 0;

        // Array of Summoners
        fac.summoners = new Array(10);
        for (var n = 0; n<10; n++){
            fac.summoners[n] = {
                role: null,
                champ: null,
                icon: "http://i.imgur.com/H8cydTK.png"
            };
        }

        // chooseChamp: Sets champion and icon to specified champion, notifies listeners
        fac.chooseChamp = function(champ){
            fac.summoners[fac.active].champ = champ;
            fac.summoners[fac.active].icon = "http://ddragon.leagueoflegends.com/cdn/" + $rootScope.version + "/img/champion/" + champ + ".png";
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
    });