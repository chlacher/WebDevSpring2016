angular
    .module('FormBuilderApp')
    .factory('FormService', ['APIService', FormService]);

function FormService(APIService){

    var fac = {};

        //fac.forms = [
        //    {"_id": "000", "title": "Contacts", "userId": 123},
        //    {"_id": "010", "title": "ToDo",     "userId": 123},
        //    {"_id": "020", "title": "CDs",      "userId": 234},
        //];

        fac.findFormById = function(formId, callback){
            APIService.GET("form/" + formId, callback);
        };

        fac.createFormForUser = function(userId, form, callback){
            APIService.POST("user/" + userId +  "/form", form, callback);
        };

        fac.findAllFormsForUser = function(userId, callback){
            APIService.GET("user/" + userId + "/form", callback);
        };

        fac.deleteFormById = function(formId, callback){
            APIService.DELETE("form/" + formId, callback);
        };

        fac.updateFormById = function(formId, newForm, callback){
            APIService.PUT("form/" + formId, newForm, callback);
        };

        fac.createField = function(field, formId, callback){
            APIService.POST("form/" + formId + "/field", field, callback);
        };

        fac.findFieldsForForm = function(formId, callback){
            APIService.GET("form/" + formId + "/field", callback);
        }

        return fac;
}