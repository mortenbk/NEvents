var mongoose = require("mongoose"),
    Event = mongoose.model("Event"),
    Location = mongoose.model("Location");

exports.getEvents = function(req, res) {
    Event.find({}).populate("location").exec(function(err, collection) {
        res.send(collection);
        console.log("getEvents: " + collection);
    });
}

exports.updateEvent = function(req, res) {
    var updatedEvent = req.body;

    if(updatedEvent.location) {
        Location.find({_id: updatedEvent.location._id}).exec(function(err, collection) {
            if(!err) {
                updatedEvent.location = {_id: collection._id};
            }
        });
    }
    var updatedEventId = req.body._id;
    delete updatedEvent._id;
    Event.findOneAndUpdate({_id: updatedEventId}, updatedEvent).populate("location").exec( function(err, event) {
        if(!event) {
            res.status(404);
            res.end();
        }
        if(err) {
            res.status(400);
            return res.send({reason: err.toString()});
        } else {
            console.log("Successfully updated " + event.title);
            res.send(event);
        }
    });
}

exports.createEvent = function (req, res) {
    var newEvent = req.body;
    if (newEvent && newEvent.title && newEvent.start) {
        Event.create(newEvent, function (err, event) {
            if (err) {
                res.status(400);
                return res.send({reason: err.toString()});
            }
            Event.populate(event, "location", function(e, eventloc) {
                if(!e) {
                    res.send(eventloc);
                } else {
                    res.status(400);
                    return res.send({reason: e.toString()});
                }

            });
            console.log("Successfully created event : " + event.title);
        });
    }
};


exports.deleteEvent = function (req, res) {
    console.log(req.query._id);
    Event.findByIdAndRemove(req.query._id, function(err, removed) {
        if(err) {
            res.status(400);
            return res.send({reason: err.toString()});
        }
        res.send(removed);
        console.log("Successfully removed event with id : " + req.query._id);
    });
};