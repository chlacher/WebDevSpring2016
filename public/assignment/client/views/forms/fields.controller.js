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
        FormService.findFormById(formId, function(form){
            $scope.form = form;
        });
    };

    var loadFields = function() {
        FormService.findFieldsForForm(formId, function(fields){
            $scope.fields = fields;
        })
    }

    if (formId){
        loadForm();
        loadFields();
    }

    if ($rootScope.user){

        FormService.findAllFormsForUser($rootScope.user._id, function(forms){
            $scope.forms = forms;
        });

        $scope.newField = function(){
            var type = $scope.attrs['type'];
            if (type){
                FormService.createField(defaults[type], $scope.form._id, function(field){
                    loadFields();
                });
            }
        }
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