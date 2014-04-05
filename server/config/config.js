var path = require("path");
var rootPath = path.normalize(__dirname + "/../../");

module.exports = {
    development: {
        db: "mongodb://localhost/NEvents",
        rootPath: rootPath,
        port: process.env.PORT || 3030
    }/*,
    production: {
        db: "mongodb://morphy:procell@ds027688.mongolab.com:27688/mean",
        rootPath: rootPath,
        port: process.env.PORT || 80
    }*/
};