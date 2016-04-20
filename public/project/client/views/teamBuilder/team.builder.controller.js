'use strict';

angular
    .module('LoLCompApp')
    .controller('TeamBuilderController', ['$scope', '$rootScope', 'ModalService', 'SummonerService', TeamBuilderController]);


function TeamBuilderController($scope, $rootScope, ModalService, SummonerService) {
    $scope.names = [];
    $scope.roles = SummonerService.roles;

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
        console.log(idx);
        console.log($scope.names);
        SummonerService.searchSummoner($scope.names[idx], idx);
    };

    $scope.clearSummoner = function(idx){
        $scope.names[idx] = "";
        SummonerService.clearSummoner(idx);
    };

    $scope.updateRole = function(idx, to){
        SummonerService.updateRole(idx, to);
    };

    // Close the modal without updating anything
    $scope.close = function(){
        ModalService.closeModal('summoner');
    };

    // Open the modal
    $scope.openModal = function(idx){
        console.log('opening: ' + idx);
        $scope.idx = idx;
        ModalService.openModal('summoner');
    };

    // Whether or not this modal should be open
    var modalStatus = function(){
        console.log(ModalService.modals);
        $scope.open = ModalService.modals['summoner'];
    };
    // Listen for change in modal status
    ModalService.listen(modalStatus);

    modalStatus();

    updateData();

}
