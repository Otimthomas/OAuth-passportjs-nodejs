const express = require("express");
const passport = require("passport");

const router = express.Router();

// auth login
router.get("/login", (req, res) => {
    res.render("login", {user: req.user});
});

//auth logout
router.get("/logout", (req, res) => {
    //handle with passport
    // res.send("logging out");
    req.logout();
    res.redirect('/');
});

// auth with google
router.get(
    "/google",
    passport.authenticate("google", {
        scope: ["profile"]
    })
);

// callback route for google to redirect to
router.get("/google/callback", passport.authenticate("google"), (req, res) => {
    // res.send(req.user);
    // console.log(req.user)
    res.redirect('/profile')
});

module.exports = router;