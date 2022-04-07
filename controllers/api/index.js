const router = require('express').Router();
const userRoutes = require('./userRoutes');
const reviewRoutes = require('./reviewRoutes');
const bookRoutes = require('./bookRoutes');

router.use('/users', userRoutes); // /api/users
router.use('/review', reviewRoutes); // /api/review
router.use('/books', bookRoutes); // /api/books

module.exports = router;
