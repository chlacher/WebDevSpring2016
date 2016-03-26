'use strict';

angular
    .module('LoLCompApp')
    .controller('HomeController', ['$scope', '$rootScope', 'ModalService', 'SummonerService', HomeController]);


function HomeController($scope, $rootScope, ModalService, SummonerService) {

    // Get champion data from service
    var updateData = function(){
        $scope.summoners = SummonerService.summoners;
    };

    // Call updatedata on update
    SummonerService.listen(updateData);

    // Triggers process to select a champion
    $scope.selectChamp = function(n){
        $rootScope.summoner = n;
        SummonerService.active = n;
        ModalService.openModal('champselect');
    };

    updateData();

}
