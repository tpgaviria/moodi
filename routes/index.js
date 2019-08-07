const path = require('path');
const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);
router.get('/auth', function (req, res) {
    console.log('hi')
});

module.exports = router;