module.exports = function (app, model) {

    app.get("/api/assignment/form/:formId/field/:fieldId", getFormFieldById);
    app.get("/api/assignment/form/:formId/field", getFieldsForForm);
    app.post("/api/assignment/form/:formId/field", createField);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFormFieldById);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFormFieldById);

    function getFormFieldById (req, res) {
        var fieldId = req.params['fieldId'];
        //var formId = req.params['fieldId'];
        model.findFieldById(fieldId, function(field){
            res.json(field);
        });
    }

    function getFieldsForForm (req, res) {
        var formId = req.params['formId'];
        model.findFieldsForForm(formId, function(fields){
            res.json(fields);
        });
    }

    function createField (req, res) {
        var formId = req.params['formId'];
        var field = req.body;
        model.createField(field, formId, function(field){
            res.json(field);
        });
    }

    function updateFormFieldById (req, res) {
        //var formId = req.params['formId'];
        var fieldId = req.params['fieldId'];
        var field = req.body;
        model.updateField(fieldId, field, function(field){
            res.json(field);
        });
    }

    function deleteFormFieldById (req, res) {
        var formId = req.params['formId'];
        var fieldId = req.params['fieldId'];
        model.deleteField(fieldId, formId, function(response){
            res.json(response);
        });
    }
};