'use strict';

angular
    .module('LoLCompApp')
    .controller('AdminController', ['$scope', "$rootScope", "ModalService", "UserService", "APIService", AdminController]);


function AdminController($scope, $rootScope, ModalService, UserService, APIService) {

    $scope.error = "";

    // Attempt to Update
    $scope.updateChamp = function(){
        UserService.tryUpdate($scope.user, update);
    };

    var update = function(user, errorCode){
        $scope.error = "";
        if (!errorCode){
            // Close the Modal
            alert("Success");
        } else if (errorCode) {
            $scope.error = errorCode;
        }
    };

    // Close the modal without updating anything
    $scope.close = function(){
        ModalService.closeModal('admin');
    };

    // Whether or not this modal should be open
    var modalStatus = function(){
        $scope.open = ModalService.modals['admin'];
    };

    // Switch to Admin control
    $scope.admin = function(){
        ModalService.closeModal('admin');
        ModalService.openModal('admin');
    }

    // Listen for change in modal status
    ModalService.listen(modalStatus);

    // Listen for update in user status
    var userStatus = function(){
        UserService.getAllUsers(function(users){
            $scope.users = users;
            $scope.section = 'users';
        });
    };

    $scope.changeSection = function(section){
        $scope.section = section;
    };

    $scope.edit = function(user){
        $scope.user = user;
        $scope.section = 'user';
    }

    UserService.listen(userStatus);

    $scope.checkUpdate = function(){
        APIService.GET('version', function(version){
            $scope.latest = version;
        });
    };

    $scope.update = function(){
        APIService.GET('champ/update', finishUpdate);
        $scope.updating = true;
    };

    var finishUpdate = function(data){
        alert(data.response);
        $scope.updating = false;
        $rootScope.version = $scope.latest;
    };

    modalStatus();
    userStatus();
}
