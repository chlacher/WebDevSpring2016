'use strict';

angular
    .module('LoLCompApp')
    .controller('HeaderController', ['$scope', '$rootScope', 'UserService', 'ModalService', HeaderController]);


function HeaderController($scope, $rootScope, UserService, ModalService) {

    $rootScope.regions = ["NA", "BR", "EUNE", "EUW", "KR", "LAN", "LAS", "OCE", "PBE", "RU", "TR"];
    $rootScope.ranks = ["All", "Bronze", "Silver", "Gold", "Platinum", "Diamond", "Master", "Challenger"];

    $scope.login = function(){
        ModalService.openModal('login');
    };

    $scope.logout = function(){
        UserService.logout();
    };

    $scope.profile = function(){
      ModalService.openModal('profile');
    };

    // Current User (if exists)
    var userStatus = function(){
        $scope.user = UserService.user;
    };
    // Listen for change in modal status
    UserService.listen(userStatus);

    userStatus();
}