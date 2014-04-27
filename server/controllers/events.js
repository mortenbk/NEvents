var mongoose = require("mongoose"),
    Event = mongoose.model("Event");

exports.getEvents = function(req, res) {
    Event.find({}).exec(function(err, collection) {
        //console.log("Sending " + collection);
        res.send(collection);
        console.log("getEvents: " + collection);
    });
}

exports.updateEvent = function(req, res) {
    var updatedEvent = req.body;
    var updatedEventId = req.body._id;
    delete updatedEvent._id;
    Event.findOneAndUpdate({_id: updatedEventId}, updatedEvent, function(err, event) {
        if(!event) {
            res.status(404);
            res.end();
        }
        if(err) {
            res.status(400);
            return res.send({reason: err.toString()});
        } else {
            res.send(event);
        }
    });
}