const router = require('express').Router();
const { request } = require('express');
const { Book } = require('../models'); // bringing in the model
const { Op, Sequelize } = require('sequelize');

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

// find all authors
router.get('/author', async (req, res) => {
  try {
    const bookData = await Book.findAll({
      attributes: ['title', 'book_id', 'description', 'author', 'genre'],
    });

    const books = bookData.map((book) => {
      return book.get({ plain: true });
    });

    res.render('author', { books });
  } catch (err) {
    res.status(500).json(err);
  }
});

// find all isbn
router.get('/isbn', async (req, res) => {
  try {
    const bookData = await Book.findAll({
      attributes: [
        'title',
        'book_id',
        'description',
        'author',
        'genre',
        'isbn',
      ],
    });

    const books = bookData.map((book) => {
      return book.get({ plain: true });
    });

    res.render('isbn', { books });
  } catch (err) {
    res.status(500).json(err);
  }
});

// find all isbn
router.get('/genre', async (req, res) => {
  try {
    const bookData = await Book.findAll({
      attributes: [
        'title',
        'book_id',
        'description',
        'author',
        'genre',
        'isbn',
      ],
    });

    const books = bookData.map((book) => {
      return book.get({ plain: true });
    });

    res.render('genre', { books });
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

    res.render('book', { books });
  } catch (err) {
    res.status(500).json(err);
  }
});

// find a specific author
router.get('/author/:author', async (req, res) => {
  try {
    const bookData = await Book.findAll({
      attributes: ['title', 'genre', 'book_id', 'description', 'author'],
      where: { author: req.params.author },
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

// find a specific title
router.get('/title/:title', async (req, res) => {
  try {
    const bookData = await Book.findAll({
      attributes: ['title', 'genre', 'book_id', 'description', 'author'],
      where: { title: req.params.title },
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

// find a specific isbn
router.get('/isbn/:isbn', async (req, res) => {
  try {
    const bookData = await Book.findAll({
      attributes: ['title', 'genre', 'book_id', 'description', 'author'],
      where: { isbn: req.params.isbn },
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

// Search for genre
router.get('/search', async (req, res) => {
  try {
    const { term } = req.query;
    console.log('Ardvark', term);

    const bookData = await Book.findAll({
      where: { genre: { [Op.like]: '%' + term + '%' } },
    });

    console.log('Penguin', bookData);

    const books = bookData.map((book) => {
      console.log(book.get({ plain: true }));
      return book.get({ plain: true });
    });

    res.render('search', { books });
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

// const { Op } = require('sequelize');
// let search = 'SEARCH VAR FOR INPUT OF FUNCTION ETC.';
// const limit = 10;
// let result = await Book.findAll({
//   title: {
//     [Op.startsWith]: search,
//   },
//   limit: limit,
// });

module.exports = router;
