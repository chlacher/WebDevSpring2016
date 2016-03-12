'use strict';

angular
    .module('LoLCompApp')
    .controller('HomeController', ['$scope', '$rootScope', '$http', HomeController]);


function HomeController($scope, $rootScope, $http) {
    $rootScope.modals = {};

    $scope.openModal = function(modal){
        console.log("Opening Modal: " + modal);
        $rootScope.modals[modal] = true;
        console.log($rootScope.modals);
    }

    $rootScope.closeModal = function(modal){
        $rootScope.modals[modal] = false;
    }

}
