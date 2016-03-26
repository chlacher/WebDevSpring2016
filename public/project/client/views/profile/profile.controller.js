'use strict';

angular
    .module('LoLCompApp')
    .controller('ProfileController', ['$scope', "ModalService", "UserService", ProfileController]);


function ProfileController($scope, ModalService, UserService) {

    $scope.error = "";

    // Attempt to Update
    $scope.update = function(){
        UserService.tryUpdate($scope.data, update);
    };

    var update = function(user, errorCode){
        $scope.error = "";
        if (!errorCode){
            // Close the Modal
            ModalService.closeModal('profile');
        } else if (errorCode) {
            $scope.error = errorCode;
        }
    };

    // Close the modal without updating anything
    $scope.close = function(){
        ModalService.closeModal('profile');
    };

    // Whether or not this modal should be open
    var modalStatus = function(){
        $scope.open = ModalService.modals['profile'];
    };
    // Listen for change in modal status
    ModalService.listen(modalStatus);

    // Listen for update in user status
    var userStatus = function(){
        $scope.data = UserService.user;
    }
    UserService.listen(userStatus);

    modalStatus();
    userStatus();
}
