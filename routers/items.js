const express = require('express');
const router = express.Router();
const WrapAsync = require('../utilities/WrapAsync');

const { storage } = require('../Cloud_Config');
const multer = require('multer');
const upload = multer({storage: storage});

const {isLoggedIn,isReporter} = require('../middlewares');

const {ItemsList,PostItems,LocationFilter,RenderReportPage,ItemRender,UpdateItem,DeleteItem,EditItem} = require('../controllers/itemctrl');

router
    .route('/')
        .get(ItemsList) // Index Page
        .post(isLoggedIn, upload.single('item[image]'), WrapAsync(PostItems));

router
    .route('/location')
        .get(LocationFilter); //location-filter


router
    // Report Item
    .get('/report', isLoggedIn, RenderReportPage);

router
    .route('/:id')
        .get(ItemRender) // Item Page
        .patch(isLoggedIn, isReporter, upload.single('item[image]'), WrapAsync(UpdateItem))
        .delete(isLoggedIn, isReporter, WrapAsync(DeleteItem));

router
    .get('/:id/edit', isLoggedIn, isReporter, EditItem);


module.exports = router;