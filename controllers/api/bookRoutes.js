const router = require('express').Router();
const { Book } = require('../../models');
// const withAuth = require('../../utils/auth');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// CREATE a book
router.post('/', async (req, res) => {
  try {
    const newBook = await Book.create({
      ...req.body,
    });

    res.status(200).json(newBook);
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }
});

// DELETE a book
router.delete('/:id', async (req, res) => {
  try {
    const bookData = await Book.destroy({
      where: {
        id: req.query.id,
      },
    });

    if (!bookData) {
      res.status(404).json({ message: 'No book found with this id!' });
      return;
    }

    res.status(200).json(bookData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/search/:isbn', async (req, res) => {
  try {
    console.log('does it workkkk')
    const bookData = await Book.findAll({
      attributes: ['title', 'genre', 'book_id', 'description', 'author'],
      where: { 
        [Op.or]: [
          { title: req.params.title },
          { author: req.params.author },
          { genre: req.params.genre },
          { isbn: req.params.isbn }
        ]
        
      },
    });

    console.log('bookdata', bookData);

    const books = bookData.map((book) => {
      return book.get({ plain: true });
    });

    res.render('search', { books });
  } catch (err) {
    res.status(500).json(err);
  }
});

// find a book
// router.get('/:isbn', async (req, res) => {
//   console.log('does it workkkk')
//   try {
//     const bookData = await Book.findAll({
//       where: {
//         // [Op.or]: [
//         //   {
//         //     title: {
//         //       [Op.like]: '%`${req.query.title}%`'
//         //     }
//         //   },
//         //   {
//         //     author: {
//         //       [Op.like]: '%`${req.query.author}%`'
//         //     }
//         //   },
//         //   {
//         //     genre: {
//         //       [Op.like]: '%`${req.query.genre}%`'
//         //     }
//         //   },
//         //   {
//         //     isbn: {
//         //       [Op.like]: '%`${req.query.isbn}%`'
//         //     }
//         //   },
//         // ],
//         // title: req.query.title,
//         // author: req.query.author,
//         // genre: req.query.genre,
//         isbn: req.query.isbn,
//       },
//       attributes: [
//         'title',
//         'author',
//         'genre',
//         'isbn',
//       ]
//     });

//     console.log('bookdata', bookData);
    
//     const books = bookData.map((book) => {
//       return book.get({ plain: true });
//     });

//     res.render('search', { books })
//   } catch (err) {
//     console.log(err)
//     res.status(500).json(err);
//   }
// });

// router.get('/search', (req, res) => {
//   let { term } = req.query;

//   // Make lowercase
//   term = term.toLowerCase();

//   Gig.findAll({ where: { technologies: { [Op.like]: '%' + term + '%' } } })
//     .then(gigs => res.render('gigs', { gigs }))
//     .catch(err => res.render('error', {error: err}));
// });


module.exports = router;
