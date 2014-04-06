var auth = require("./auth");



module.exports = function(app) {
    app.post("/login", auth.authenticate);
    app.post("/logout", function(req, res) {
        req.logout();
        res.end();
    });

    app.get("/calendar", auth.requiresLogin, function() {return {hello: "hello"}});

    app.get("/partials/*", function(req, res) {
        console.log("redirecting to " + "../../public/app/" + req.params);
        res.render("../../public/app/" + req.params);
    });

    app.get("*", function(req, res) {
        res.render("index", {
            bootstrappedUser: req.user
        });
    });

}
