const router = require('express').Router();
const userRoutes = require('./userRoutes');
const commentRoutes = require('./commentRoutes');
const bookRoutes = require('./bookRoutes');

router.use('/users', userRoutes); // /api/users
router.use('/comments', commentRoutes); // /api/Comments
router.use('/books', bookRoutes); // /api/books

module.exports = router;
