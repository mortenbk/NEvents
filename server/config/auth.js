var passport = require("passport");

exports.authenticate = function(req, res, next) {
    req.body.email = req.body.email.toLowerCase();
    var auth = passport.authenticate("local", function(err, user) {
        if(err) {
            return next(err);
        }
        if(!user) {
            res.send({success: false});
        }
        req.logIn(user, function(err) {
            if(err) {
                return next(err);
            }

            res.send({success: true, user: user});
            console.log("Successfully logged in as " + user.email)
        });
    });
    auth(req, res, next);
}

exports.requiresLogin = function(req, res, next) {
        if(!req.isAuthenticated()) {
            console.log("403");
            res.status(403);
            res.end();
        } else {
            next();
        }
};