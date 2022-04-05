const router = require('express').Router();
const userRoutes = require('./userRoutes');
const projectRoutes = require('./projectRoutes');
const bookRoutes = require('./bookRoutes');

router.use('/users', userRoutes); // /api/users
router.use('/projects', projectRoutes); // /api/projects
router.use('/books', bookRoutes); // /api/books

module.exports = router;
