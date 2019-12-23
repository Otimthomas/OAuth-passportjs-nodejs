const User = require('../model/user')
const passport = require('passport');
const keys = require('./keys')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

passport.serializeUser((user, done) => {
    // console.log(user);
    return done(null, user.id);
});

passport.deserializeUser((id, done) => {
    return User.findById(id).then(user => {
        // console.log(user)
        done(null, user)
    })
})

passport.use(new GoogleStrategy({
    //options for the google strat
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret,
    callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
    // passport callback function 
    //console.log(profile);

    User.findOne({
        googleId: profile.id
    }).then(currentUser => {
        if (currentUser) {
            // already have the user
            // console.log('user is: ' + currentUser);
            return done(null, currentUser);
        } else {
            new User({
                username: profile.displayName,
                googleId: profile.id
            }).save().then((newUser) => {
                // console.log('new user created: ' + newUser)
                done(null, newUser)
            })
        }
    })
}))