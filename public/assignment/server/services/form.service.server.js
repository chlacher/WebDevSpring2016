module.exports = function (app, model) {

    app.get("/api/assignment/user/:userId/form", getFormsForUser);
    app.get("/api/assignment/form/:formId", getFormById);
    app.post("/api/assignment/user/:userId/form", createForm);
    app.put("/api/assignment/form/:formId", updateFormById);
    app.delete("/api/assignment/form/:formId", deleteFormById);

    function getFormsForUser (req, res) {
        var userId = req.params.userId;
        model.findFormsForUser(userId, function(forms){
            res.json(forms);
        });
    }

    function getFormById (req, res) {
        var id = req.params.formId;
        model.findFormById(id, function(form){
            res.json(form);
        });
    }

    function createForm (req, res) {
        var userId = req.params.userId;
        //var now = new Date();
        var form = req.body;
        //form._id = now.getTime();
        form.userId = userId;
        model.createForm(form, function(form){
            res.json(form);
        });
    }

    function updateFormById (req, res) {
        var formId = req.params.formId;
        var form = req.body;
        model.updateForm(formId, form, function(form){
            res.json(form);
        });
    }

    function deleteFormById (req, res) {
        var formId = req.params.formId;
        model.deleteForm(formId, function(response){
            res.json(response);
        });
    }
};