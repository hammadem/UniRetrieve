const express = require('express');
const router = express.Router();
const passport = require('passport');

const { User } = require('../models/users');
const {isLoggedIn,redirectUrl,logInRedirect} = require('../middlewares');
const {SignupRender,CreateUser,LoginRender,Logout} = require('../controllers/userctrl');
/* SignUp */
router
    .route('/signup')
    .get(SignupRender)
    .post(CreateUser);

/* login */
router
    .route('/login')
        .get(LoginRender)
        .post(redirectUrl,passport.authenticate('local',{ failureRedirect: '/login' }), logInRedirect);

/* logout */
router
    .post('/logout', isLoggedIn, Logout);

    module.exports = router;