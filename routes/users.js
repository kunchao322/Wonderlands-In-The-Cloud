const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/user');
const users = require('../controllers/users');
const catchAsync = require('../utils/catchAsync');

router.get('/register', (req, res) => {
    res.render('users/register');
})

router.post('/register/', catchAsync(users.renderRegister));

router.get("/login", users.renderLogin);

router.post('/login', passport.authenticate('local', {
    failureFlash: true,
    failureRedirect: '/login'
}), users.login)

router.get('/logout', users.renderLogout)


module.exports = router;