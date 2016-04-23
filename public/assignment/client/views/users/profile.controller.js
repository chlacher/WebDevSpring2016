'use strict';

angular
    .module('FormBuilderApp')
    .controller('ProfileController', ['$scope', '$rootScope', 'UserService', ProfileController]);


function ProfileController($scope, $rootScope, UserService) {

    $scope.update = function(){
        var user = $rootScope.user;

        if ($scope.password){
            user.password = $scope.password;
        }
        if ($scope.firstname){
            user.firstName = $scope.firstname;
        }
        if ($scope.lastname){
            user.lastName = $scope.lastname;
        }
        if ($scope.email){
            user.email = $scope.email;
        }
        // Verify name not in use
        if ($scope.username) {
            UserService.findUserByUsername($scope.username).then(function (response) {
                if (response.data) {
                    alert("Error: Username Already In Use")
                    return null;
                }
                user.username = $scope.username;
                updateUser(user);
            });
        } else {
            updateUser(user);
        }};

        var updateUser = function(user) {
            UserService.updateUser(user).then(function (response) {
                if (response.data) {
                    $rootScope.user = response.data;
                }
            });
        }

}