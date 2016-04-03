'use strict';

angular
    .module('FormBuilderApp')
    .controller('RegisterController', ['$scope', '$location', '$rootScope', 'UserService', RegistrationController]);


function RegistrationController($scope, $location, $rootScope, UserService) {

    $scope.register = function(){
        if ($scope.password != $scope.confirm){
            alert("Error: Passwords Don't Match");
            return null;
        }
        if (!($scope.username && $scope.password && $scope.confirm && $scope.email)){
            alert("Error: Missing Fields");
            return null;
        }

        var user = {"username":$scope.username, "password":$scope.password, "email":$scope.email};
        UserService.createUser(user).then(function (response) {
                if (response && response.data) {
                    // Log in the new user
                    UserService.findUserByCredentials($scope.username, $scope.password).then(function (response) {
                        if (response.data) {
                            $rootScope.user = response.data;
                            $location.path('/profile');
                        }
                    });
                } else {
                    alert("Error: Username Already In Use");
                }
            });
    };
}