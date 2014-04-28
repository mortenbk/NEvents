var mongoose = require("mongoose");

var eventSchema = {
    title: {type: String},
    start: {type: Date},
    end: {type: Date}
}

var Event = mongoose.model("Event", eventSchema);

function createDefaultEvents() {
    Event.find({}).exec(function(err, collection) {
        var currentDate = new Date();
        if(collection.length === 0) {
            Event.create(
                {title: "Test Event 1", start: currentDate, end: currentDate},
                {title: "Test Event 2", start: new Date().setDate(currentDate.getDate()+3), end: new Date().setDate(currentDate.getDate()+5)},
                {title: "Test Event 3", start: new Date().setDate(currentDate.getDate()+6), end: new Date().setDate(currentDate.getDate()+6)},
                {title: "Test Event 4", start: new Date().setDate(currentDate.getDate()+9), end: new Date().setDate(currentDate.getDate()+10)},
                {title: "Test Event 5", start: new Date().setDate(currentDate.getDate()+1), end: new Date().setDate(currentDate.getDate()+1)}
            );
        }
    });
}

exports.createDefaultEvents = createDefaultEvents;