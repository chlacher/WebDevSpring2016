'use strict';

angular
    .module('FormBuilderApp')
    .controller('HeaderController', ['$scope', '$location', '$rootScope', 'UserService', HeaderController]);


function HeaderController($scope, $location, $rootScope, UserService) {
    $scope.logout = function(){
        $rootScope.user = null;
        $location.path('/home')
    }
}
