// controls all routes for website

const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

const bookRoutes = require('./bookRoutes');

router.use('/api', apiRoutes);
router.use('/', homeRoutes);

router.use('/book', bookRoutes);

module.exports = router;
