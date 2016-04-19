'use strict';

angular
    .module('LoLCompApp')
    .controller('HomeController', ['$scope', '$rootScope', 'ModalService', 'SummonerService', HomeController]);


function HomeController($scope, $rootScope, ModalService, SummonerService) {
    $scope.names = [];

    // Get champion data from service
    var updateData = function(){
        $scope.summoners = SummonerService.summoners;
        $scope.blueDamage = SummonerService.blueDamage;
        $scope.redDamage = SummonerService.redDamage;
        $scope.blueWin = (SummonerService.blueWin)/(SummonerService.blueWin + SummonerService.redWin);
    };

    // Call updatedata on update
    SummonerService.listen(updateData);

    // Triggers process to select a champion
    $scope.selectChamp = function(n){
        $rootScope.summoner = n;
        SummonerService.active = n;
        ModalService.openModal('champselect');
    };

    $scope.searchSummoner = function(idx){
        SummonerService.searchSummoner($scope.names[idx], idx);
    };

    $scope.clearSummoner = function(idx){
        $scope.names[idx] = "";
        SummonerService.clearSummoner(idx);
    };

    $scope.updateRole = function(idx, to){
        SummonerService.updateRole(idx, to);
    };

    updateData();

}
