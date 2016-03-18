'use strict';

angular
    .module('FormBuilderApp')
    .controller('RegisterController', ['$scope', '$location', '$rootScope', 'UserService', RegistrationController]);


function RegistrationController($scope, $location, $rootScope, UserService) {

    $scope.register = function(){
        if ($scope.password != $scope.confirm){
            // TODO: Throw exception: passwords don't match
            return null;
        }
        if (!($scope.username && $scope.password && $scope.confirm && $scope.email)){
            // TODO: Throw exception: missing field
            return null;
        }

        var user = {"username":$scope.username, "password":$scope.password, "email":$scope.email};
        UserService.createUser(user, attemptCreate);
    }

    var attemptCreate = function(user){
        if (user){
            $rootScope.user = user;
            $rootScope.users = UserService.users;
            $location.path('/profile');
        }
    }
}