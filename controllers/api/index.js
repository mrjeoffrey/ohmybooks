const router = require('express').Router();

const userRoutes = require('./userRoutes');
const reviewRoutes = require('./reviewRoutes');
const bookRoutes = require('./bookRoutes');

router.use('/users', userRoutes); // /api/users
router.use('/reviews', reviewRoutes); // /api/reviews
router.use('/books', bookRoutes); // /api/books

module.exports = router;
