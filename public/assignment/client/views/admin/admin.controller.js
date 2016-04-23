'use strict';

angular
    .module('FormBuilderApp')
    .controller('AdminController', ['$scope', 'UserService', AdminController]);


function AdminController($scope, UserService) {

    $scope.newUser = {};

    var refreshUsers = function(){
        UserService.findAllUsers().then(function(response) {
            $scope.users = response.data;
        });
    };

    $scope.delete = function(id){
        if (confirm("Are you sure you want to delete?")){
            UserService.deleteUserById(id).then(function(response){
                 if (response.data.error){
                    alert("Error: " + response.data.error);
                } else {
                    alert(response.data.message);
                    refreshUsers();
                }
            });
        }
    };

    $scope.edit = function(id){
        $scope.editFlag = id;
    };

    $scope.save = function(user){
        // If roles is a string, turn it back to an array
        if (user.roles.split) {
            user.roles = user.roles.replace(/ /g, '').split(',');
        }
        UserService.updateUserById(user._id, user).then(function(response){
            if (response.data){
                $scope.editFlag = '';
            }
        });
    };

    $scope.add = function(){
        // If roles specified, convert string to array
        if($scope.newUser.roles){
            $scope.newUser.roles = $scope.newUser.roles.replace(/ /g, '').split(',');
        }
        UserService.createUser($scope.newUser).then(function(response){
            if (response.data){
                $scope.newUser = {};
                refreshUsers();
            }
        });
    };

    refreshUsers();
}