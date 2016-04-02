'use strict';

angular
    .module('FormBuilderApp')
    .controller('AdminController', ['$scope', 'UserService', AdminController]);


function AdminController($scope, UserService) {

    $scope.newUser = {};

    var refreshUsers = function(){
        UserService.findAllUsers(function(users){
            $scope.users = users;
        });
    };

    $scope.delete = function(id){
        if (confirm("Are you sure you want to delete?")){
            UserService.deleteUserById(id, function(res){
                 if (res.error){
                    alert("Errror: " + res.error);
                } else {
                    alert(res.message);
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
        UserService.updateUser(user._id, user, function(user){
            if (user){
                $scope.editFlag = '';
            }
        });
    };

    $scope.add = function(){
        // If roles specified, convert string to array
        if($scope.newUser.roles){
            $scope.newUser.roles = $scope.newUser.roles.replace(/ /g, '').split(',');
        }
        UserService.createUser($scope.newUser, function(res) {
            if (res) {
                $scope.newUser = {};
                refreshUsers();
            }
        });
    };

    refreshUsers();
}