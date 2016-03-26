'use strict';

angular
    .module('LoLCompApp')
    .controller('ChampSelectController', ['$scope', '$rootScope', "ModalService", "SummonerService", "RiotAPIService",'UserService', ChampSelectController]);


function ChampSelectController($scope, $rootScope, ModalService, SummonerService, RiotAPIService, UserService) {

    var champs = [];
    $scope.query = "";
    $scope.filtered = [];

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
        SummonerService.chooseChamp(champ);
        ModalService.closeModal('champselect');
    };

    // Close the modal without updating anything
    $scope.close = function(){
        ModalService.closeModal('champselect');
    };

    // Hit the Riot API and get all the champion names
    var getChamps = function(region) {
        champs = [];
        var champQuery = "/api/lol/static-data/" + region.toLowerCase() + "/v1.2/champion";
        // Populate local variables with list of all champions
        RiotAPIService.GET(champQuery, function(champions){
            $rootScope.version = champions.version;
            $.each(champions.data, function(champ){
                champs.push(champ);
            });
            $scope.filtered = champs;
        });
    };

    // Whether or not this modal should be open
    var modalStatus = function(){
        $scope.open = ModalService.modals['champselect'];
    };
    ModalService.listen(modalStatus);

    // Current User (if exists)
    var userStatus = function(){
        getChamps(UserService.user.region);
    };
    // Listen for change in modal status
    UserService.listen(userStatus);

    userStatus();
    modalStatus();
}
