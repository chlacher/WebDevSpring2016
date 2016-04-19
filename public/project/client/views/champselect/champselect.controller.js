'use strict';

angular
    .module('LoLCompApp')
    .controller('ChampSelectController', ['$scope', '$rootScope', "ModalService", "SummonerService", "APIService",'UserService', ChampSelectController]);


function ChampSelectController($scope, $rootScope, ModalService, SummonerService, APIService, UserService) {
    $scope.query = "";
    // Holds Champs to be shown in popup
    $scope.filtered = [];
    // Holds less memory-intensive version of champ list
    var champs = [];

    // Filter array to those matching query
    $scope.filter = function() {
        if ($scope.query == ""){
            $scope.filtered = champs;
        } else {
            $scope.filtered = [];
            $.each(champs, function(idx){
                if (champs[idx].name.toUpperCase().indexOf($scope.query.toUpperCase()) > -1){
                    $scope.filtered.push(miniChamp(champs[idx]));
                }
            });
        }
    };

    // Set the summoner's champion to the one clicked, close the modal
    $scope.choose = function(champ){
        SummonerService.chooseChamp(champ);
        ModalService.closeModal('champselect');
    };

    // Close the modal without updating anything
    $scope.close = function(){
        ModalService.closeModal('champselect');
    };

    // Hit the Riot API and get all the champion names
    var getChamps = function(region) {
        SummonerService.champs = [];
        champs = [];
        // Populate local variables with list of all champions
        APIService.GET("champ", function(champions){
            $rootScope.version = champions.version;
            SummonerService.avgDmg = champions.avgDmg;
            for(var idx in champions.champions){
                SummonerService.champs.push(champions.champions[idx]);
                champs.push(miniChamp(champions.champions[idx]));
            }
            $scope.filtered = champs;
        });
    };

    // Whether or not this modal should be open
    var modalStatus = function(){
        $scope.open = ModalService.modals['champselect'];
    };

    // Less memory-intensive representaiton of champion
    var miniChamp = function(champ){
        return {
            id: champ.id,
            key: champ.key,
            name: champ.name
        }
    };

    // Listen for change in modal status
    ModalService.listen(modalStatus);

    // Populate Champion Lists
    getChamps();

    //userStatus();
    modalStatus();
}
