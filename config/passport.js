var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var mongoose = require("mongoose");
var User = mongoose.model("users");
var keys = require('../config/keys');

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretKey;



module.exports = passport=>{
    passport.use(new JwtStrategy(opts, (jwt_payload, done) =>{
        User.findById(jwt_payload.id)
        .then((user)=>{
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        })
        .catch(err=>console.log(err))
    }));
}