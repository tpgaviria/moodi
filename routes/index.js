const path = require('path');
const router = require('express').Router();
const apiRoutes = require('./api');


router.use('/api', apiRoutes);
router.get('/auth', function (req, res) {
    console.log('hi')
});

router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"))
});

module.exports = router;