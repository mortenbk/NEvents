var mongoose = require("mongoose"),
    userModel = require("../models/User"),
    eventModel = require("../models/Event"),
    locationModel = require("../models/Location");


module.exports = function(config) {
    mongoose.connect(config.db);
    var db = mongoose.connection;

    db.on("error", console.error.bind(console, "connection error..."));
    db.once("open", function callback() {
        console.log("NEvents db opened");
    });

    userModel.createDefaultUsers();
    eventModel.createDefaultEvents();
    locationModel.createDefaultLocations();
}