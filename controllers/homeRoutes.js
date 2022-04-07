const router = require('express').Router();
const { Comment, User, Book } = require('../models');
const withAuth = require('../utils/auth');

// router.get('/book/:id', async (req, res) => {
//   try {
//     const bookData = await Book.findByPk(req.params.book_id);
//     console.log(bookData);
//     const book = bookData.get({ plain: true });
//     res.render('book', book);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.get('/', async (req, res) => {
  try {
    // Pass serialized data and session flag into template
    res.render('homepage', {
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
      include: [{ model: Comment }],
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

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

router.get('/profile', (req, res) => {
  res.render('profile');
});

// //book page
// router.get('/book', (req, res) => {
//   // This  method is rendering the 'book' handlebars.js template. This is how we connect each route to the correct template.
//   res.render('book');
// });

module.exports = router;
