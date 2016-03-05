angular
    .module('FormBuilderApp')
    .factory('FormService', function(){

    var fac = {};

        fac.forms = [
            {"_id": "000", "title": "Contacts", "userId": 123},
            {"_id": "010", "title": "ToDo",     "userId": 123},
            {"_id": "020", "title": "CDs",      "userId": 234},
        ];

        fac.createFormForUser = function(userId, form, callback){
            form._id = (new Date).getTime();
            form.userId = userId;
            fac.forms.push(form);
            callback(form);
        };
        fac.findAllFormsForUser = function(userId, callback){
            callback(fac.forms.filter(function(form){return form.userId==userId}));
        };
        fac.deleteFormById = function(formId, callback){
            for (var idx = 0; idx < fac.forms.length; idx++){
                if (fac.forms[idx]._id == formId) {
                    fac.forms.splice(idx, 1);
                    return callback(fac.forms);
                }
            }
            return callback(fac.forms);
        };
        fac.updateFormById = function(formId, newForm, callback){
            newForm._id = formId;
            for (var idx = 0; idx < fac.forms.length; idx++){
                if (fac.forms[idx]._id == formId) {
                    fac.forms[idx] = newForm;
                    return callback(newForm);
                }
                return callback(null);
            }
        };
        return fac;
});