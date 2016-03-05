'use strict';

angular
    .module('FormBuilderApp')
    .controller('FormsController', ['$scope', '$location', '$rootScope', 'FormService', FormsController]);


function FormsController($scope, $location, $rootScope, FormService) {
    var refresh = function(){
        FormService.findAllFormsForUser($rootScope.user._id, attemptFind);
    }

    var attemptFind = function(forms){
        $scope.forms = forms;
    }

    var attemptAdd = function(form){
        refresh();
        $scope.newForm = null;
    }

    var attemptUpdate = function(form){
        $scope.edit = null;
    }

    var attemptDelete = function(forms){
        refresh();
    }

    if ($rootScope.user) {
        refresh();

        $scope.addForm = function () {
            var form = {title: $scope.newForm};
            FormService.createFormForUser($rootScope.user._id, form, attemptAdd);
        }

        $scope.updateForm = function (id, form) {
            FormService.updateFormById(id, form, attemptUpdate)
        }

        $scope.deleteForm = function (id) {
            var conf = confirm("Are you sure you want to delete?");
            if (conf)
                FormService.deleteFormById(id, attemptDelete)
        }

        $scope.selectForm = function (id) {
            $scope.edit = id;
        }
    }
}
