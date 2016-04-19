'use strict';

angular
    .module('LoLCompApp')
    .controller('HomeController', ['$scope', '$rootScope', 'ModalService', HomeController]);


function HomeController($scope, $rootScope, ModalService) {

    $scope.toggle = function(section){
        $scope.section = section;
    }
}
