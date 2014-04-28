var mongoose = require("mongoose");

var foodSchema = mongoose.Schema({
    title: {type: String},
    description: {type: String},
    price: {type: Number},
    currency: {type: String},
    quantity: {type: Number}
});


foodSchema.methods = {
    getPrice: function(){
        return (this.price/100).toFixed(2);
    },
    setPrice: function(num){
        this.price = num*100;
    }
}

var Food = mongoose.model("Food", foodSchema);


function createDefaultFoods() {
    Food.find({}).exec(function(err, collection) {
        if(collection.length === 0) {
            Food.create(
                {title: "Kage", description: "Dette er mad", price: 3000, currency: "DKK", quantity: 10},
                {title: "Desert", description: "Dette er mad", price: 1500, currency: "DKK", quantity: 5},
                {title: "Kaffe", description: "Dette er drikkelse", price: 500, currency: "DKK", quantity: 20},
                {title: "Sodavand", description: "Dette er drikkelse", price: 1000, currency: "DKK", quantity: 5},
                {title: "Vand", description: "Dette er drikkelse", price: 500, currency: "DKK", quantity: 10},
                {title: "Wienerbrød", description: "Dette er mad", price: 2000, currency: "DKK", quantity: 10}
            );
        }
    });
}

exports.createDefaultFoods = createDefaultFoods;