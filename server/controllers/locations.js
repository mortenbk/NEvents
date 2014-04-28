var mongoose = require("mongoose"),
    Location = mongoose.model("Location");

exports.getLocations = function(req, res) {
    Location.find({}).exec(function(err, collection) {
        res.send(collection);
        console.log("getLocations: " + collection);
    });
}

exports.updateLocation = function(req, res) {
    var updatedLocation = req.body;
    var updatedLocationId = req.body._id;
    delete updatedLocation._id;
    Location.findOneAndUpdate({_id: updatedLocationId}, updatedLocation, function(err, location) {
        if(!location) {
            res.status(404);
            res.end();
        }
        if(err) {
            res.status(400);
            return res.send({reason: err.toString()});
        } else {
            console.log("Successfully updated " + location.title);
            res.send(location);
        }
    });
}

exports.createLocation = function (req, res) {
    var newLocation = req.body;
    if (newLocation && newLocation.title) {
        Location.create(newLocation, function (err, location) {
            if (err) {
                res.status(400);
                return res.send({reason: err.toString()});
            }
            res.send(location);
            console.log("Successfully created location : " + location.title);
        });
    }
};


exports.deleteLocation = function (req, res) {
    Location.findByIdAndRemove(req.query._id, function(err, removed) {
        if(err) {
            res.status(400);
            return res.send({reason: err.toString()});
        }
        res.send(removed);
        console.log("Successfully removed location with id : " + req.query._id);
    });
};

