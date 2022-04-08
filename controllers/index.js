// controls all routes for website

const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const reviewRoutes = require('./api/reviewRoutes')
const bookRoutes = require('./bookRoutes');
const reviewRoutes = require('./reviewRoutes');


router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/review', reviewRoutes);
router.use('/book', bookRoutes);
router.use('/review', reviewRoutes);

module.exports = router;
