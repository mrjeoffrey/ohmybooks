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
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }
});

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
