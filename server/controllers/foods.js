var mongoose = require("mongoose"),
    Food = mongoose.model("Food");

exports.getFoods = function(req, res) {
    Food.find({}).exec(function(err, collection) {
        res.send(collection);
        console.log("getFoods: " + collection);
    });
}

exports.updateFood = function(req, res) {
    var updatedFood = req.body;
    var updatedFoodId = req.body._id;
    delete updatedFood._id;
    Food.findOneAndUpdate({_id: updatedFoodId}, updatedFood, function(err, food) {
        if(!food) {
            res.status(404);
            res.end();
        }
        if(err) {
            res.status(400);
            return res.send({reason: err.toString()});
        } else {
            console.log("Successfully updated " + food.title);
            res.send(food);
        }
    });
}

exports.createFood = function (req, res) {
    var newFood = req.body;
    if (newFood && newFood.title) {
        Food.create(newFood, function (err, food) {
            if (err) {
                res.status(400);
                return res.send({reason: err.toString()});
            }
            res.send(food);
            console.log("Successfully created location : " + food.title);
        });
    }
};


exports.deleteFood = function (req, res) {
    Food.findByIdAndRemove(req.query._id, function(err, removed) {
        if(err) {
            res.status(400);
            return res.send({reason: err.toString()});
        }
        res.send(removed);
        console.log("Successfully removed food with id : " + req.query._id);
    });
};

