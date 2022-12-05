const express = require('express');
const {
  getReviews,
  getReview,
  addReview,
  updateReview,
  deleteReview
} = require('../controllers/review.controller.js');

const db=require("../models/index")
const Review =db.reviews

const router = express.Router({ mergeParams: true });

const advancedResults = require('../middleware/advancedResults');
const { protect,authorize } = require('../middleware/auth');

router
  .route('/')
  .get(
    advancedResults(Review),
    getReviews
  )
  .post(protect,authorize('user', 'admin'),addReview);

router
  .route('/:id')
  .get(getReview)
  .put(protect,authorize('user', 'admin'),updateReview)
  .delete(protect,authorize('user', 'admin'),deleteReview);

module.exports = router;