'use strict';

angular
    .module('FormBuilderApp')
    .controller('FieldsController', ['$scope', '$routeParams', '$rootScope', 'FormService', FieldsController]);


function FieldsController($scope, $routeParams, $rootScope, FormService) {
    var formId = $routeParams.formId;

    $scope.attrs = {};

    $scope.dropdown = {
        text: "Single Line Text",
        textarea: "Paragraph",
        date: "Date",
        dropdown: "Dropdown",
        checkbox: "Checkboxes",
        radio: "Radio Buttons"
    };

    var loadForm = function(){
        FormService.findFormById(formId).then(function(response){
            if (response.data) {
                $scope.form = response.data;
            }
        });
    };

    var loadFields = function() {
        FormService.findFieldsForForm(formId).then(function(response){
            if (response.data) {
                $scope.fields = response.data;
            }
        });
    };

    if (formId){
        loadForm();
        loadFields();
    }

    if ($rootScope.user){

        FormService.findAllFormsForUser($rootScope.user._id).then(function(response){
            if (response.data) {
                $scope.forms = response.data;
            }
        });

        $scope.newField = function(){
            var type = $scope.attrs.type;
            if (type){
                FormService.createField(defaults[type], formId).then(function(){
                    loadFields();
                });
            }
        };

        $scope.editField = function(id){
            // Refresh fields (so unsaved changes are discarded)
            loadFields();
            $scope.edit = id;
        };

        $scope.deleteField = function(id){
            if (confirm("Are You Sure You Want To Delete?")) {
                FormService.deleteField(id, formId).then(function(response){
                    if (response.data) {
                        alert(response.data.message);
                        loadFields();
                    }
                })
            }
        };

        $scope.updateField = function(id, field){
            FormService.updateField(id, formId, field).then(function(){
                loadFields();
                $scope.edit = null;
            });
        };

        $scope.addOption = function(field){
            field.attrs[0].options.push({label: $scope.attrs.label, value: $scope.attrs.value});
            $scope.attrs.label = "";
            $scope.attrs.value = "";
        };

        $scope.deleteOption = function(label, field){
            // Lookup and remove option with specified key
            for (var idx in field.attrs[0].options){
                if (field.attrs[0].options[idx].label == label){
                    field.attrs[0].options.splice(idx, 1);
                    break;
                }
            }
        };
    }
}

// Default Values for new Fields
var defaults = {
    text:       {label: "New Text Field", type: "text", attrs: {placeholder: "New Field"}},
    textarea:   {label: "New Text Field", type:"textarea", attrs: {placeholder: "New Field"}},
    date:       {label: "New Date Field", type:"date"},
    dropdown:   {label: "New Dropdown", type:"options", attrs: {options: [
                    {label: "Option 1", value: "OPTION_1"},
                    {label: "Option 2", value: "OPTION_2"},
                    {label: "Option 3", value: "OPTION_3"}]}},
    checkbox:   {label: "New Checkboxes", type:"checkbox", attrs: {options: [
                    {label: "Option A", value:"a"},
                    {label: "Option B", value:"b"},
                    {label: "Option C", value:"c"}]}},
    radio:   {label: "New Radio Buttons", type:"radio", attrs: {options: [
                    {label: "Option X", value:"x"},
                    {label: "Option Y", value:"y"},
                    {label: "Option Z", value:"z"}]}}
};