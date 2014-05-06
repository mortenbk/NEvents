var mongoose = require("mongoose"),
    userModel = require("../models/User"),
    foodModel = require("../models/Food"),
    orderModel = require("../models/Order"),
    locationModel = require("../models/Location"),
    eventModel = require("../models/Event");




module.exports = function(config) {
    mongoose.connect(config.db);
    var db = mongoose.connection;

    db.on("error", console.error.bind(console, "connection error..."));
    db.once("open", function callback() {
        console.log("NEvents db opened");
    });

    userModel.createDefaultUsers();
    foodModel.createDefaultFoods();
    orderModel.createDefaultOrders();
    locationModel.createDefaultLocations();
    eventModel.createDefaultEvents();


}