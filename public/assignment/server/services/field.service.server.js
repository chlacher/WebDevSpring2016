module.exports = function (app, model) {

    app.get("/api/assignment/form/:formId/field/:fieldId", getFormFieldById);
    app.get(" /api/assignment/form/:formId/field", getFieldsForForm);
    app.post("/api/assignment/form/:formId/field", createField);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFormFieldById);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFormFieldById);

    function getFormFieldById (req, res) {
        var fieldId = req.params['fieldId'];
        var formId = req.params['fieldId'];
        res.json(model.findFieldById(fieldId, formId));
    }

    function getFieldsForForm (req, res) {
        var formId = req.params['formId'];
        res.json(model.findFormById(formId).fields);
    }

    function createField (req, res) {
        var formId = req.params['formId'];
        var field = req.body;
        res.json(model.createField(field, formId));
    }

    function updateFormFieldById (req, res) {
        var formId = req.params['formId'];
        var fieldId = req.params['fieldId'];
        var field = req.body;
        res.json(model.updateField(fieldId, field, formId));
    }

    function deleteFormFieldById (req, res) {
        var formId = req.params['formId'];
        var fieldId = req.params['fieldId'];
        res.json(model.deleteField(fieldId, formId));
    }
};