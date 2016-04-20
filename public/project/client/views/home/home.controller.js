'use strict';

angular
    .module('LoLCompApp')
    .controller('HomeController', ['$scope', '$rootScope', 'ModalService', HomeController]);


function HomeController($scope, $rootScope, ModalService) {

    // For swapping active nav when you hit the arrow
    $scope.active = function(lett){
        if (!$scope.section){
            if (lett == 'w'){
                return 'active'
            }
        } else {
            if ($scope.section[0] == lett){
                return 'active';
            }
        }
        return '';
    }

    $scope.toggle = function(section){
        $scope.section = section;
    }
}
