const express = require('express');
const router = express.Router();
const WrapAsync = require('../utilities/WrapAsync');
const passport = require('passport');

const {isLoggedIn,redirectUrl,logInRedirect} = require('../middlewares');
const {SignupRender,CreateUser,LoginRender,Logout} = require('../controllers/userctrl');

/* SignUp */
router
    .route('/signup')
    .get(SignupRender)
    .post(WrapAsync(CreateUser));

/* login */
router
    .route('/login')
        .get(LoginRender)
        .post(redirectUrl,passport.authenticate('local',{ failureRedirect: '/login' }), WrapAsync(logInRedirect));

/* logout */
router
    .post('/logout', isLoggedIn, WrapAsync(Logout));

    module.exports = router;