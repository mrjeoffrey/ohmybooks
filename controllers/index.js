const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const sampleRoutes = require('./sampleDataRoutes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/book', sampleRoutes);

module.exports = router;
