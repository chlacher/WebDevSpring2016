'use strict';

angular
    .module('LoLCompApp')
    .controller('RegisterController', ['$scope', '$rootScope', "ModalService", "UserService", RegisterController]);


function RegisterController($scope, $rootScope, ModalService, UserService) {

    var initData = {
        username: "",
        password: "",
        confirm: "",
        summoner: "",
        rank: "All",
        region: "NA"
    };

    $scope.data = initData;

    $scope.error = "";

    // Attempt to Log In
    $scope.register = function(){
        UserService.tryRegister($scope.data, register);
    };

    var register = function(user, errorCode){
        $scope.data.password = "";
        $scope.data.confirm = "";
        $scope.error = "";
        if (!errorCode){
            // Clear data
            $scope.data = initData;
            // Log in the new user
            UserService.login(user);
            // Close the Modal
            ModalService.closeModal('register');
        } else if (errorCode) {
            $scope.error = errorCode;
        }
    };

    $scope.login = function(){
        ModalService.closeModal('register');
        ModalService.openModal('login');
    };

    // Close the modal without updating anything
    $scope.close = function(){
        ModalService.closeModal('register');
    };

    // Whether or not this modal should be open
    var modalStatus = function(){
        $scope.open = ModalService.modals['register'];
    };
    // Listen for change in modal status
    ModalService.listen(modalStatus);

    modalStatus();
}
