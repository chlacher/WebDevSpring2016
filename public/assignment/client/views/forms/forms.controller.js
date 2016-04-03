'use strict';

angular
    .module('FormBuilderApp')
    .controller('FormsController', ['$scope', '$rootScope', 'FormService', FormsController]);


function FormsController($scope, $rootScope, FormService) {
    var refresh = function(){
        FormService.findAllFormsForUser($rootScope.user._id).then(function(response) {
           if (response.data){
               $scope.forms = response.data
           }
        });
    };

    var attemptFind = function(forms){
        $scope.forms = forms;
    };

    if ($rootScope.user) {
        refresh();

        $scope.addForm = function () {
            var form = {title: $scope.newForm};
            FormService.createFormForUser($rootScope.user._id, form).then(function() {
                refresh();
                $scope.newForm = null;
            });
        };

        $scope.updateForm = function (id, form) {
            FormService.updateFormById(id, form).then(function() {
                $scope.edit = null;
            });
        };

        $scope.deleteForm = function (id) {
            var conf = confirm("Are you sure you want to delete?");
            if (conf)
                FormService.deleteFormById(id).then(function() {
                   refresh();
                });
        };

        $scope.selectForm = function (id) {
            $scope.edit = id;
        };
    }
}
