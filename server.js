var express = require("express"),
    mongoose = require("mongoose");

var app = express();

app.use(express.logger());

app.set("view engine", "jade");

app.use(express.cookieParser())

app.use(express.bodyParser());
app.use(express.session({secret:"Mean secret"}));

app.use(express.static(__dirname + "/public/"));


mongoose.connect("mongodb://localhost/NEvents");
var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error..."));
db.once("open", function callback() {
    console.log("NEvents db opened");
});

var messageSchema = mongoose.Schema({message: String});
var Message = mongoose.model("Message", messageSchema);
var mongoMessage;

Message.findOne({}).exec(function(err, messageDoc) {
    mongoMessage = messageDoc.message;
});



app.get("/partials/*", function(req, res) {
    res.render(__dirname + "/public/app/" + req.params);
});

app.get("*", function(req, res) {
    res.render("index", {
        mongoMessage: mongoMessage
    });
});



var port = 3030;
app.listen(port);
console.log("Listening to Port " + port + " ....");


