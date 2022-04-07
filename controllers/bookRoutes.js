const router = require('express').Router();
const { Book } = require('../models'); // bringing in the model

// find all
router.get('/', async (req, res) => {
  try {
    const bookData = await Book.findAll({
      attributes: ['Title'],
    });

    const books = bookData.map((book) => {
      return book.get({ plain: true });
    });

    res.render('book', { books });
  } catch (err) {
    res.status(500).json(err);
  }
});

// find specific instance of book
router.get('/:id', async (req, res) => {
  try {
    const bookData = await Book.findByPk(req.params.id, {
      attributes: ['Title'],
    });

    const books = bookData.get({ plain: true });

    res.render('book2', books);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
