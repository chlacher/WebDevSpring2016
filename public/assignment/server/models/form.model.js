module.exports = function(Form, Field) {
    var api = {};

    api.findAllForms = function (cb) {
        Form.find({}, function(err, forms){
            cb(forms);
        });
    };

    api.findFormById = function (id, cb) {
        Form.find({_id: id}, function(err, forms){
            if (err || !forms){
                cb(null);
            } else {
                cb(forms[0]);
            }
        });
    };

    api.findFormByTitle = function (title, cb) {
        Form.find({title: title}, function(err, forms){
            if (err || !forms){
                cb(null);
            } else {
                cb(forms[0]);
            }
        });
    };

    api.findFormsForUser = function (userId, cb) {
        Form.find({userId: userId}, function(err, forms){
            if (err || !forms){
                cb(null);
            } else {
                cb(forms);
            }
        });
    };

    api.findFieldById = function(fieldId, cb) {
        Field.find({_id: fieldId}, function(err, fields){
            if (err || !fields){
                cb(null);
            } else {
                cb(fields[0]);
            }
        });
    };

    api.findFieldsForForm = function(id, cb) {
        api.findFormById(id, function(form){
            Field.find({_id: {$in: form.fieldIds} }, function(err, fields){
                if (err || !fields){
                    cb(null);
                } else {
                    cb(fields);
                }
            })
        });
    };

    api.createForm = function (form, cb) {
        Form.create(form, function(error, doc){
            cb(form);
        });
    };

    api.createField = function(field, formId, cb) {
        // Make sure form exists
        api.findFormById(formId, function (form) {
            if (!form) {
                cb(null);
            } else {
                // Create field
                Field.create(field, function(error, field){
                    // Add field to form fieldIds
                    form.fieldIds.push(field._id);
                    form.save(function(){
                        cb(field);
                    })
                });
            }
        });
    };

    api.updateForm = function (id, form, cb) {
        Form.update(
            {"_id": id},
            {title: form.title, userId: form.userId, fields: form.fields},
            function(err, numberAffected, rawResponse) {
                console.log(err);
                console.log(numberAffected);
                console.log(rawResponse);
                api.findFormById(id, cb);
            });
    };

    api.updateField = function (id, field, cb){
        Field.update(
            {"_id": id},
            {label: field.label, type: field.type, attrs: field.attrs},
            function(err, numberAffected, rawResponse) {
                console.log(err);
                console.log(numberAffected);
                console.log(rawResponse);
                api.findFieldById(id, cb);
            });
    };

    api.deleteForm = function (id, cb){
        Form.findByIdAndRemove(id, function (err) {
            if (err) {
                cb({error: err.message});
            } else {
                cb({message: 'Successfully removed'});
            }
        });
    };

    api.deleteField = function (fieldId, formId, cb) {
        Field.findByIdAndRemove(fieldId, function (err) {
            if (err) {
                cb({error: err.message});
            } else {
                api.findFormById(formId, function(form){
                    for (var idx in form.fieldIds){
                        if (form.fieldIds[idx] == fieldId){
                            form.fieldIds.splice(idx, 1);
                            return form.save(function(){
                                return cb({message: 'Successfully removed'});
                            });
                        }
                    }
                });
            }
        });
    };

    return api;
};