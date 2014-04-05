var express = require("express"),
    passport = require("passport");

module.exports = function(app, config) {
    //app.use(express.logger());
    app.set("views", config.rootPath + "/server/views");
    app.set("view engine", "jade");

    app.use(express.cookieParser());
    app.use(express.bodyParser());
    app.use(express.session({ secret: 'keyboard cat' }));
    app.use(passport.initialize());
    app.use(passport.session());

    app.use(express.static(config.rootPath + "/public"));
}
