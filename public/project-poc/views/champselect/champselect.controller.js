'use strict';

angular
    .module('LoLCompApp')
    .controller('ChampSelectController', ['$scope', '$rootScope', "$http", ChampSelectController]);


function ChampSelectController($scope, $rootScope, $http) {
    // Modal functionality
    $scope.flag = {
        modalOpen: true
    }

    var champQuery = "https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion?api_key=373db961-91ff-4b7c-9124-30d883f17951"

    var champs = [];
    $scope.query = "";
    $scope.filtered = [];

    // Get list of champions from riot API
    $http.get(champQuery)
        .success(function(json) {
            // Push each champion's name into a local array
            $.each(json.data, function(champ){
                champs.push(champ);
            });
            $scope.filtered = champs;
        });

    // Filter array to those matching query
    $scope.filter = function() {
        if ($scope.query == ""){
            $scope.filtered = champs;
        } else {
            $scope.filtered = [];
            $.each(champs, function(idx){
                if (champs[idx].toUpperCase().indexOf($scope.query.toUpperCase()) > -1){
                    $scope.filtered.push(champs[idx]);
                }
            });
        }
    };

    // Set the summoner's champion to the one clicked, close the modal
    $scope.choose = function(champ){
        $rootScope.champions[$rootScope.summoner] = champ;
        $rootScope.closeModal('champselect');
    }
}
