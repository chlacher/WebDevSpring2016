'use strict';

angular
    .module('LoLCompApp')
    .controller('LoginController', ['$scope', '$rootScope', "ModalService", "UserService", LoginController]);


function LoginController($scope, $rootScope, ModalService, UserService) {
    $scope.username = "";
    $scope.password = "";

    $scope.error = "";

    // Attempt to Log In
    $scope.login = function(){
        UserService.tryLogin($scope.username, $scope.password, login);
    };

    var login = function(user){
        $scope.password = "";
        $scope.error = "";
        if (user){
            UserService.login(user);
            ModalService.closeModal('login');
        } else {
            $scope.error = "Invalid Username/Password";
        }
    };

    // Close the modal without updating anything
    $scope.close = function(){
        ModalService.closeModal('login');
    };

    // Whether or not this modal should be open
    var modalStatus = function(){
        $scope.open = ModalService.modals['login'];
    };
    // Listen for change in modal status
    ModalService.listen(modalStatus);

    modalStatus();
}
