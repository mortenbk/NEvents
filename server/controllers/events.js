var mongoose = require("mongoose"),
    async = require("async"),
    Event = mongoose.model("Event"),
    Location = mongoose.model("Location"),
    Order = mongoose.model("Order"),
    Food = mongoose.model("Food");

exports.getEvents = function(req, res) {
    Event.find({}).populate("location").populate("orders").exec(function(err, collection) {
        res.send(collection);
        console.log("getEvents: " + collection);
    });
}

exports.updateEvent = function(req, res) {
    var updatedEvent = req.body;

    async.series([updateOrders, updateEvent]);

    function updateOrders(callback) {
        for(var i = 0; i < updatedEvent.orders.length; i++) {
            (function(updatedOrder, orderId){
                delete updatedEvent.orders[i]._id;
                    Order.findOneAndUpdate(orderId, updatedOrder, function(err, order) {
                        if(err) {
                            res.status(400);
                            return res.send({reason: err.toString()});
                        }
                        updatedOrder._id = order._id;
                        if(i >= updatedEvent.orders.length-1) {
                            callback(null, updatedEvent.orders);
                        }
                    });
            })(updatedEvent.orders[i], updatedEvent.orders[i]._id);
        };
    }
    function updateEvent(callback) {
        var updatedEventId = req.body._id;
        delete updatedEvent._id;
        Event.findOneAndUpdate({_id: updatedEventId}, updatedEvent).populate("location orders").exec( function(err, event) {
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
                callback(null, updatedEvent);
            }
        });
    }
}

exports.createEvent = function (req, res) {
    var newEvent = req.body;

    function createOrders(callback) {
        for(var i = 0; i < newEvent.orders.length; i++) {
            (function(i){
                Order.create(newEvent.orders[i], function(err, order) {
                    if(err) {
                        res.status(400);
                        return res.send({reason: err.toString()});
                    }
                    newEvent.orders[i]._id = order._id;
                    if(i >= newEvent.orders.length-1) {
                        callback(null, newEvent.orders);
                    }
                });
            })(i);
        };

    }
    function createEvent(callback) {
        if (newEvent && newEvent.title && newEvent.start) {
            Event.create(newEvent, function (err, event) {
                if (err) {
                    res.status(400);
                    return res.send({reason: err.toString()});
                } else {
                    Event.populate(event, "location orders foods", function(e, eventlocandfoods) {
                        if(!e) {
                            for(var i = 0; i < event.orders.length; i++) {
                                (function(i) {
                                    event.orders[i].populate("foods");
                                    if(i >= event.orders.length - 1) {
                                        res.send(eventlocandfoods);
                                        console.log("Successfully created event : " + event.title);
                                    }
                                })(i);
                            }
                        } else {
                            res.status(400);
                            return res.send({reason: e.toString()});
                        }

                    });

                }
            });
            callback(null, newEvent);
    }}
    async.series([createOrders, createEvent]);


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