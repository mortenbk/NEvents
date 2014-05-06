var auth = require("./auth"),
    events = require("../controllers/events"),
    locations = require("../controllers/locations"),
    foods = require("../controllers/foods"),
    orders = require("../controllers/orders");



module.exports = function(app) {

    //Login
    app.post("/login", auth.authenticate);
    app.post("/logout", function(req, res) {
        req.logout();
        res.end();
    });

    //Events
    app.get("/api/events", /*auth.requiresLogin, */events.getEvents);
    app.put("/api/events", events.updateEvent);
    app.post("/api/events", events.createEvent);
    app.delete("/api/events", events.deleteEvent);

    //Location
    app.get("/api/locations", locations.getLocations);
    app.put("/api/locations", locations.updateLocation);
    app.post("/api/locations", locations.createLocation);
    app.delete("/api/locations", locations.deleteLocation);

    //Food
    app.get("/api/foods", foods.getFoods);
    app.put("/api/foods", foods.updateFood);
    app.post("/api/foods", foods.createFood);
    app.delete("/api/foods", foods.deleteFood);

    //Order
    app.get("/api/orders", orders.getOrders);
    //app.get("api/orders/:id", orders.getOrderByEventId);
    app.put("/api/orders", orders.updateOrder);
    app.post("/api/orders", orders.createOrder);
    app.delete("/api/orders", orders.deleteOrder);

    //Partial routing
    app.get("/partials/*", function(req, res) {
        console.log("Loading partial at " + "../../public/app/" + req.params);
        res.render("../../public/app/" + req.params);
    });

    //If trying to access api that has not been foind return 404
    app.all("/api/*", function(req, res) {
        res.send(404);
    });

    //Return user to default page if path hasn't been caught yet
    app.get("*", function(req, res) {
        res.render("index", {
            bootstrappedUser: req.user
        });
    });

}
