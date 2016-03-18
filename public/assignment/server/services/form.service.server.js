module.exports = function (app, model) {

    app.get("/api/assignment/user/:userId/form", getFormsForUser);
    app.get("/api/assignment/form/:formId", getFormById);
    app.post("/api/assignment/user/:userId/form", createForm);
    app.put("/api/assignment/form/:formId", updateFormById);
    app.delete("/api/assignment/form/:formId", deleteFormById);

    function getFormsForUser (req, res) {
        var userId = req.params.userId;
        var forms = model.findFormsForUser(userId);
        res.json(forms);
    }

    function getFormById (req, res) {
        var id = req.params.formId;
        var form = model.findUserById(id);
        res.json(form);
    }

    function createForm (req, res) {
        var userId = req.params.userId;
        var now = new Date();
        var form = req.body;
        form._id = now.getTime();
        form.userId = userId;
        model.createForm(form);
        res.json(forms);
    }

    function updateFormById (req, res) {
        var formId = req.params.formId;
        var form = req.body;
        res.json(model.updateForm(formId, form));
    }

    function deleteFormById (req, res) {
        var formId = req.params.formId;
        model.deleteForm(formId);
        res.json (model.findAllUsers());
    }
};