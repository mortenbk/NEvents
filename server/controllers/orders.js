var mongoose = require("mongoose"),
    Order = mongoose.model("Order");

exports.getOrders = function(req, res) {
    Order.find({}).exec(function(err, collection) {
        res.send(collection);
        console.log("getOrder: " + collection);
    });
}

exports.updateOrder = function(req, res) {
    var updatedOrder = req.body;
    var updatedOrderId = req.body._id;
    delete updatedOrder._id;
    Order.findOneAndUpdate({_id: updatedOrderId}, updatedOrder, function(err, order) {
        if(!order) {
            res.status(404);
            res.end();
        }
        if(err) {
            res.status(400);
            return res.send({reason: err.toString()});
        } else {
            console.log("Successfully updated " + order.title);
            res.send(order);
        }
    });
}

exports.createOrder = function (req, res) {
    var newOrder = req.body;
    if (newOrder && newOrder.title) {
        Order.create(newOrder, function (err, order) {
            if (err) {
                res.status(400);
                return res.send({reason: err.toString()});
            }
            res.send(order);
            console.log("Successfully created order : " + order.title);
        });
    }
};


exports.deleteOrder = function (req, res) {
    Order.findByIdAndRemove(req.query._id, function(err, removed) {
        if(err) {
            res.status(400);
            return res.send({reason: err.toString()});
        }
        res.send(removed);
        console.log("Successfully removed order with id : " + req.query._id);
    });
};

