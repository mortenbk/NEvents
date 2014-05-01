var mongoose = require("mongoose");

var foodSchema = {
    title: {type: String},
    description: {type: String},
    price: {type: Number},
    currency: {type: String}
};

var Food = mongoose.model("Food", foodSchema);


function createDefaultFoods() {
    Food.find({}).exec(function(err, collection) {
        if(collection.length === 0) {
            Food.create(
                {title: "Kage", description: "Dette er mad", price: 3000, currency: "DKK"},
                {title: "Desert", description: "Dette er mad", price: 1500, currency: "DKK"},
                {title: "Kaffe", description: "Dette er drikkelse", price: 500, currency: "DKK"},
                {title: "Sodavand", description: "Dette er drikkelse", price: 1000, currency: "DKK"},
                {title: "Vand", description: "Dette er drikkelse", price: 500, currency: "DKK"},
                {title: "Wienerbrød", description: "Dette er mad", price: 2000, currency: "DKK"},
                {title: "Chicken Stew", description: "This is american food", price: 2000, currency: "USD"}
            );
        }
    });
}

exports.createDefaultFoods = createDefaultFoods;