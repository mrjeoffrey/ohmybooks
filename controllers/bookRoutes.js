const router = require('express').Router();
const { request } = require('express');
const { Book } = require('../models'); // bringing in the model

// find all books
router.get('/', async (req, res) => {
  try {
    const bookData = await Book.findAll({
      attributes: ['title', 'book_id', 'description', 'author', 'genre'],
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
      attributes: [
        'title',
        'book_id',
        'description',
        'author',
        'genre',
        'isbn',
      ],
    });

    const books = bookData.get({ plain: true });

    res.render('book-detail', books);
  } catch (err) {
    res.status(500).json(err);
  }
});

// find a specific genre
router.get('/genre/:genre', async (req, res) => {
  try {
    const bookData = await Book.findAll({
      attributes: ['title', 'genre', 'book_id', 'description', 'author'],
      where: { genre: req.params.genre },
    });

    const books = bookData.map((book) => {
      console.log(book.get({ plain: true }));
      return book.get({ plain: true });
    });

    console.log(books);

    res.render('book', { books });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
