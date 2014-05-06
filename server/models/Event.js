var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

var eventSchema = Schema({
    title: {type: String},
    description: {type: String},
    orders: [{type: Schema.Types.ObjectId, ref: "Order"}],
    location: {type: Schema.Types.ObjectId, ref: "Location"},
    start: {type: Date},
    end: {type: Date}
});

var Event = mongoose.model("Event", eventSchema);

function createDefaultEvents() {
    Event.find({}).exec(function(err, collection) {
        var currentDate = new Date();
        if(collection.length === 0) {
            Event.create(
                {title: "Test Event 1", description: "Teeest1", start: currentDate, end: currentDate},
                {title: "Test Event 2", description: "Teeest2", start: new Date().setDate(currentDate.getDate()+3), end: new Date().setDate(currentDate.getDate()+5)},
                {title: "Test Event 3", description: "Teeest3", start: new Date().setDate(currentDate.getDate()+6), end: new Date().setDate(currentDate.getDate()+6)},
                {title: "Test Event 4", description: "Teeest4", start: new Date().setDate(currentDate.getDate()+9), end: new Date().setDate(currentDate.getDate()+10)},
                {title: "Test Event 5", description: "Teeest5", start: new Date().setDate(currentDate.getDate()+1), end: new Date().setDate(currentDate.getDate()+1)}
            );
        }
    });
}

exports.createDefaultEvents = createDefaultEvents;