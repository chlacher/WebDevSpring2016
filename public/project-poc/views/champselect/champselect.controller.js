'use strict';

angular
    .module('LoLCompApp')
    .controller('ChampSelectController', ['$scope', '$rootScope', "$http", ChampSelectController]);


function ChampSelectController($scope, $rootScope, $http) {
    // Modal functionality
    $scope.flag = {
        modalOpen: true
    }

    $scope.closeModal = function() {
        console.log("closeModal");
        // optionally do something beforehand
        $scope.flag.modalOpen = false;
    }

    var champQuery = "https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion?api_key=373db961-91ff-4b7c-9124-30d883f17951"

    var champs = [];
    $scope.query = "";
    $scope.filtered = [];

    $http.get(champQuery) // load model with delay
        .success(function(json) {
            console.log(json);
            $.each(json.data, function(champ){
                console.log(champ);
                champs.push(champ);
            });
            $scope.filtered = champs;
        });

    $scope.filter = function() {
        console.log("Filter");
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

    $scope.choose = function(champ){
        $rootScope.champions[$rootScope.summoner] = champ;
        $rootScope.closeModal('champselect');
    }
}
