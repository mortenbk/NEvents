var express = require("express");

var app = express();

app.use(express.logger());

app.set("view engine", "jade")

app.get("*", function(req, res) {
    res.render("index");
});

var port = 3030;
app.listen(port);