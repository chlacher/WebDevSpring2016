'use strict';

angular
    .module('FormBuilderApp')
    .controller('ProfileController', ['$scope', '$location', '$rootScope', 'UserService', ProfileController]);


function ProfileController($scope, $location, $rootScope, UserService) {

    $scope.update = function(){
        var user = $rootScope.user;
        if ($scope.username){
            var foo = UserService.findUserByUsername($scope.username);
            console.log(foo);
            if (foo != null){
                // TODO: Throw Exception: Username already in use
                return null;
            }
            user.username = $scope.username;
        }
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
        console.log(user);
        console.log(user.id);
        UserService.updateUser(user._id, user, attemptUpdate);
    }

    var attemptUpdate = function(user){
        if (user){
            $rootScope.user = user;
            // TODO: Confirmation message
        }
    }
}