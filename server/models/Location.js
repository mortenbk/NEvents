var mongoose = require("mongoose");

var locationSchema = {
    title: {type: String},
    description: {type: String},
    isRoom: {type: Boolean}
}


var Location = mongoose.model("Location", locationSchema);


function createDefaultLocations() {
    Location.find({}).exec(function(err, collection) {
        if(collection.length === 0) {
            Location.create(
                {title: "Test Location 1", description: "This is the location 1", isRoom: true},
                {title: "Test Location 2", description: "This is the location 2", isRoom: true},
                {title: "Test Location 3", description: "This is the location 3", isRoom: false},
                {title: "Test Location 4", description: "This is the location 4", isRoom: true},
                {title: "Test Location 5", description: "This is the location 5", isRoom: false}
            );
        }
    });
}

exports.createDefaultLocations = createDefaultLocations;