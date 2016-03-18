module.exports = function(forms) {
    var api = {};

    api.findAllForms = function () {
        return forms;
    };

    api.findFormById = function (id) {
        for (var idx in forms) {
            if (forms[idx]._id == id)
                return forms[idx];
        }
        return null;
    };

    api.findFormByTitle = function (title) {
        for (var idx in forms) {
            if (forms[idx].title === title)
                return forms[idx];
        }
        return null;
    };

    api.findFormsForUser = function (userId) {
        var userForms = [];
        for (var idx in forms) {
            if (forms[idx].userId === userId)
                userForms.push(forms[idx]);
        }
        return userForms;
    };

    api.findFieldById = function(fieldId, formId) {
        var form = api.findFormById(formId);
        if (form == null)
            return null;
        for (var idx in form.fields){
            if (form.fields[idx]._id == fieldId)
                return form.fields[idx];
        }

        return null;
    };

    api.findFieldsForForm = function(id) {
        for (var idx in forms) {
            if (forms[idx]._id == id)
                return forms[idx].fields;
        }

        return null;
    };

    api.createForm = function (form) {
        var now = new Date();
        form._id = now.getTime();
        forms.push(form);
        return forms;
    };

    api.createField = function(field, formId){
        var now = new Date();
        field._id = now.getTime();
        var form = api.findFormById(formId);
        form.fields.push(field);
        api.updateForm(formId, form);
    };

    api.updateForm = function (id, form) {
        for (var idx in forms) {
            if (forms[idx]._id == id) {
                forms[idx] = form;
                return true;
            }
        }
        return false;
    };

    api.updateField = function (id, field, formId){
        var form = api.findFormById(formId);
        for (var idx in form.fields){
            if (form.fields[idx]._id == id){
                form.fields[idx] = field;
                return updateForm(formId, form);
            }
        }
        return false;
    };

    api.deleteForm = function (id) {
        for (var idx in forms) {
            if (forms[idx]._id == id) {
                forms.splice(idx, 1);
                return true;
            }
        }
        return false;
    };

    api.deleteField = function (fieldId, formId) {
        var form = api.findFormById(formId);
        for (var idx in form.fields){
            if (form.fields[idx]._id == fieldId){
                form.fields.splice(idx, 1);
                return api.updateForm(formId, form);
            }
        }
        return false;
    };

    return api;
};