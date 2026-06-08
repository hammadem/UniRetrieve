const express = require('express');
const router = express.Router({mergeParams: true});
const WrapAsync = require('../utilities/WrapAsync');

const { storage } = require('../Cloud_Config');
const multer = require('multer');
const upload = multer({storage: storage});

const { Claim } = require('../models/claims');
const {isLoggedIn,isNotReporter} = require('../middlewares');
const {ClaimRender,PostClaim} = require('../controllers/claimctrl');

router
    .route('/claim')
        .get (isLoggedIn, isNotReporter, ClaimRender)  // Claim Page
        .post (isLoggedIn, isNotReporter, upload.single('claim[image]'), WrapAsync(PostClaim));

    module.exports = router;