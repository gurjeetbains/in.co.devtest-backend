const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const Users = require('../models/Users');
const config = require('../config');

const options = {};
options.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
options.secretOrKey = config.SecretKey;

const passportMod = (passport) => {
    passport.use('auth-token',
                new JWTStrategy(options, (payload, done) => {
                  Users.findOne({email: payload.email})
                  .then(user => {
                      if(user){
                          return done(null, user);
                      }
                      return done(null, false);
                  })
                  .catch(err => console.log('Error '+err));
                })
    )
}

module.exports = passportMod;