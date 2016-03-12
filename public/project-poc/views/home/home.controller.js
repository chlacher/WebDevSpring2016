'use strict';

angular
    .module('LoLCompApp')
    .controller('HomeController', ['$scope', '$rootScope', '$http', HomeController]);


function HomeController($scope, $rootScope, $http) {
    $rootScope.modals = {};

    var defaultIcon = "http://i.imgur.com/H8cydTK.png"

    // Using Common Index Instead of Object for Simplicity
    $scope.summoners = new Array(10);
    $scope.roles = new Array(10);
    $rootScope.champions = new Array(10);
    $scope.icons = new Array(10);

    var updateIcons = function(){
        for (var n = 0; n<10; n++){
            var champ = $rootScope.champions[n];
            if (champ){
                $scope.icons[n] = "http://ddragon.leagueoflegends.com/cdn/6.5.1/img/champion/" + champ + ".png";
            } else {
                $scope.icons[n] = defaultIcon;
            }
        }
    };

    $scope.selectChamp = function(n){
        $rootScope.summoner = n;
        $scope.openModal('champselect');
    };

    $scope.openModal = function(modal){
        console.log("Opening Modal: " + modal);
        $rootScope.modals[modal] = true;
        console.log($rootScope.modals);
    };

    $rootScope.closeModal = function(modal){
        $rootScope.modals[modal] = false;
        updateIcons();
    };

    var champQuery = "http://api.champion.gg/champion?api_key=073f59ba919b9d8746d0efebaf49b2dd"
    $http.get(champQuery) // load model with delay
        .success(function(json) {
            console.log(json);
        });




    updateIcons();

}
