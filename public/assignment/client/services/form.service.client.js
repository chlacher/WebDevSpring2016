angular
    .module('FormBuilderApp')
    .factory('FormService', ['APIService', FormService]);

function FormService(APIService){

    var fac = {};

        fac.findFormById = function(formId){
            return APIService.GET("form/" + formId);
        };

        fac.createFormForUser = function(userId, form){
            return APIService.POST("user/" + userId +  "/form", form);
        };

        fac.findAllFormsForUser = function(userId){
            return APIService.GET("user/" + userId + "/form");
        };

        fac.deleteFormById = function(formId){
            return APIService.DELETE("form/" + formId);
        };

        fac.updateFormById = function(formId, newForm){
            return APIService.PUT("form/" + formId, newForm);
        };

        fac.createField = function(field, formId){
            return APIService.POST("form/" + formId + "/field", field);
        };

        fac.findFieldsForForm = function(formId){
            return APIService.GET("form/" + formId + "/field");
        };

        fac.deleteField = function(id, formId){
            return APIService.DELETE("form/" + formId + "/field/" + id);
        };

        fac.updateField = function(id, formId, field){
            return APIService.PUT("form/" + formId + "/field/" + id, field);
        };

        return fac;
}