'use strict';

angular
    .module('FormBuilderApp')
    .controller('ProfileController', ['$scope', '$location', '$rootScope', 'UserService', ProfileController]);


function ProfileController($scope, $location, $rootScope, UserService) {

    $scope.update = function(){
        var user = $rootScope.user;
        if ($scope.username){
            if (UserService.findUserByUsername($scope.username)){
                // TODO: Throw Exception: Username already in use
                return null;
            }
            user.username = $scope.username;
        }
        if ($scope.password){
            user.password = $scope.password;
        }
        if ($scope.firstname){
            user.firstname = $scope.firstname;
        }
        if ($scope.lastname){
            user.lastname = $scope.lastname;
        }
        if ($scope.email){
            user.email = $scope.email;
        }
        UserService.updateUser(user.id, user, attemptUpdate);
    }

    var attemptUpdate = function(user){
        if (user){
            $rootScope.user = user;
            // TODO: Confirmation message
        }
    }
}