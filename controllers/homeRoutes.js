const router = require('express').Router();
const { Review, User } = require('../models');
const withAuth = require('../utils/auth');
const { Op,  Sequelize } = require('sequelize');

router.get('/', async (req, res) => {
  try {
    const reviewData = await Review.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        }
      ]
    })

    const reviews = reviewData.map((review) => review.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', {
      reviews,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Review }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// user reviews
router.get('/review/:id', async (req, res) => {
  try {
    const reviewData = await Review.findByPk(req.params.id, {
      attributes: [
          'rating',
          'review',
          'user_id',
          'book_id',
          'id'
      ]
    });

    console.log('REVIEW DATAAAAAA!!!', reviewData);

    const reviews = reviewData.get({ plain: true });

    console.log('REVIEWSSS!!!!', reviews);

    res.render('profile', {
      ...reviews,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    console.log('ERROR!!!!!', err);
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }
  res.render('login');
});

router.get('/signup', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/login');
    return;
  }
  res.render('signup');
});


module.exports = router;
