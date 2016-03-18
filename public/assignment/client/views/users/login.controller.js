'use strict';

angular
    .module('FormBuilderApp')
    .controller('LoginController', ['$scope', '$location', '$rootScope', 'UserService', LoginController]);


function LoginController($scope, $location, $rootScope, UserService) {

    $scope.login = function(){
        UserService.findUserByCredentials($scope.username, $scope.password, attemptLogin);
    }

    var attemptLogin = function(user){
        if (user){
            $rootScope.user = user;
            $location.path('/profile');
        } else {
            // TODO: Show invalid username/password message
        }
    }
}