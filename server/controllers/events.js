var mongoose = require("mongoose"),
    Event = mongoose.model("Event");

exports.getEvents = function(req, res) {
    Event.find({}).exec(function(err, collection) {
        console.log("Sending " + collection);
        res.send(collection);
    });
}

