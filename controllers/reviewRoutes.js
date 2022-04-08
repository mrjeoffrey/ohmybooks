const router = require('express').Router();
const { Review } = require('../models'); // bringing in the model

// Get all reviews
router.get('/', async (req, res) => {
  try {
    const reviewData = await Review.findAll({
      attributes: ['id', 'rating', 'review', 'user_id', 'book_id'],
    });

    const reviews = reviewData.map((review) => {
      return review.get({ plain: true });
    });

    res.render('review', { reviews });
  } catch (err) {
    res.status(500).json(err);
  }
});

// find specific instance of review
router.get('/:id', async (req, res) => {
  try {
    const reviewData = await Review.findByPk(req.params.id, {
      attributes: ['id', 'rating', 'review', 'user_id', 'book_id'],
    });

    const reviews = reviewData.get({ plain: true });

    res.render('review-detail', reviews);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
