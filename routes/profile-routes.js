const router = require('express').Router();

const authCheck = (req, res, next) => {
    if (!req.user) {
        res.redirect('/auth/login');
    } else {
        next()
    }
}

router.get('/', authCheck, (req, res) => {
    // console.log(req.user)
    // res.send('hello ' + req.user);
    res.render('profile', {
        user: req.user
    })
})

module.exports = router;