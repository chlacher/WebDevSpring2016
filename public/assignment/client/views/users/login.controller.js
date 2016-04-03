'use strict';

angular
    .module('FormBuilderApp')
    .controller('LoginController', ['$scope', '$location', '$rootScope', 'UserService', LoginController]);


function LoginController($scope, $location, $rootScope, UserService) {

    $scope.login = function () {
        UserService.findUserByCredentials($scope.username, $scope.password).then(function (response) {
            if (response.data) {
                $rootScope.user = response.data;
                $location.path('/profile');
            }
        });
    };
}