const router = require('express').Router();
const { Review, User } = require('../models');
const withAuth = require('../utils/auth');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

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

// router.get('/review', async (req, res) => {
//   try {
//     // Get all reviews and JOIN with user data
//     const reviewData = await Review.findAll({
//       include: [
//         {
//           model: User,
//           attributes: ['name'],
//         },
//       ],
//     });

//     // Serialize data so the template can read it
//     const reviews = reviewData.map((review) => review.get({ plain: true }));

//     // Pass serialized data and session flag into template
//     res.render('review', { 
//       reviews, 
//       logged_in: req.session.logged_in 
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// user reviews
router.get('/review/:id', async (req, res) => {
  try {
    const reviewData = await Review.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const review = reviewData.get({ plain: true });

    res.render('review', {
      ...review,
      logged_in: req.session.logged_in
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
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/login');
    return;
  }
  res.render('signup');
});

router.get('/profile', (req, res) => {
  res.render('profile');
});


// find a book
// router.get('/search', async (req, res) => {
//   try {
//     const bookData = await Book.findAll({
//       attributes: ['title', 'genre', 'book_id', 'description', 'author'],
//       where: { 
//         title: req.params.title, 
//         genre: req.params.genre,
//         description: req.params.description,
//         author: req.params.author,
//       },
//     });

//     const books = bookData.map((book) => {
//       console.log(book.get({ plain: true }));
//       return book.get({ plain: true });
//     });

//     res.render('book', { books });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });


module.exports = router;
