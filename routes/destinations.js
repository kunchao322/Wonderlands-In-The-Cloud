const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError')
const Destination = require('../models/destination');
const {
    destinationSchema,
} = require('../schemas.js')
const multer = require('multer')
const { storage } = require("../cloudinary")
const upload = multer({ storage })

const { isLoggedIn, isAuthor, validateDestination } = require('../middleware');
const { populate } = require('../models/destination');
module.exports = router;

const destinations = require('../controllers/destinations');

router.get('', catchAsync(destinations.index));

router.get('/new', isLoggedIn, destinations.renderNewForm)

router.post('', upload.array('image'), validateDestination, catchAsync(destinations.createDestination))

router.get('/:id', catchAsync(destinations.showDestination))

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(destinations.renderEditForm))

router.put('/:id', isLoggedIn, isAuthor, upload.array('image'), validateDestination, catchAsync(destinations.updateDestination))

router.delete('/:id', isLoggedIn, isAuthor, catchAsync(destinations.deleteDestination))