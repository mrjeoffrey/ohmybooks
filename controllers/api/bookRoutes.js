const router = require('express').Router();
const Book = require('../../models/Books');
// const withAuth = require('../../utils/auth');

// CREATE a book
router.post('/', async (req, res) => {
  try {
    const newBook = await Book.create({
      ...req.body,
    });

    res.status(200).json(newBook);
    console.log(newBook);
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }
});

// GET all book
router.get('/', async (req, res) => {
  // Get one book from the book table
  Book.findAll({
    // Gets the book based on the isbn given in the request parameters
    where: {
      isbn: req.params.isbn,
    },
  }).then((bookData) => {
    res.json(bookData);
  });
});

// GET a book
router.get('/:isbn', async (req, res) => {
  // Get one book from the book table
  Book.findOne({
    // Gets the book based on the isbn given in the request parameters
    where: {
      isbn: req.params.isbn,
    },
  }).then((bookData) => {
    res.json(bookData);
  });
});

// Updates book based on its isbn
router.put('/:isbn', async (req, res) => {
  // Calls the update method on the Book model
  Book.update(
    {
      // All the fields you can update and the data attached to the request body.
      title: req.body.title,
      author: req.body.author,
      isbn: req.body.isbn,
      pages: req.body.pages,
      edition: req.body.edition,
      is_paperback: req.body.is_paperback,
    },
    {
      // Gets the books based on the isbn given in the request parameters
      where: {
        isbn: req.params.isbn,
      },
    }
  )
    .then((updatedBook) => {
      // Sends the updated book as a json response
      res.json(updatedBook);
    })
    .catch((err) => res.json(err));
});

// DELETE a book
router.delete('/:id', async (req, res) => {
  try {
    const bookData = await Book.destroy({
      where: {
        id: req.params.id,
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

module.exports = router;
