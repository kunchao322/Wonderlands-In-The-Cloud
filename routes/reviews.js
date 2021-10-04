const express = require('express');
const router = express.Router({
    mergeParams: true
});
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError')
const Destination = require('../models/destination');
const Review = require('../models/review');
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware');

module.exports = router;


const reviews = require('../controllers/reviews');

router.post('/', isLoggedIn, validateReview, catchAsync(reviews.addReview))

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview))