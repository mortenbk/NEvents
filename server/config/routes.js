var auth = require("./auth"),
    events = require("../controllers/events");



module.exports = function(app) {
    app.post("/login", auth.authenticate);
    app.post("/logout", function(req, res) {
        req.logout();
        res.end();
    });

    app.get("/api/events", /*auth.requiresLogin, */events.getEvents);
    app.put("/api/events", events.updateEvent);

    app.get("/partials/*", function(req, res) {
        console.log("Loading partial at " + "../../public/app/" + req.params);
        res.render("../../public/app/" + req.params);
    });

    app.all("/api/*", function(req, res) {
        res.send(404);
    });

    app.get("*", function(req, res) {
        res.render("index", {
            bootstrappedUser: req.user
        });
    });

}
