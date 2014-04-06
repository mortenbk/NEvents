var path = require("path");
var rootPath = path.normalize(__dirname + "/../../");

module.exports = {
    development: {
        db: "mongodb://localhost/NEvents",
        rootPath: rootPath,
        port: process.env.PORT || 3030
    },
    production: {
        db: "mongodb://morphy:procell@ds047217.mongolab.com:47217/nevents",
        rootPath: rootPath,
        port: process.env.PORT || 80
    }
};