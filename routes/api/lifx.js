const router = require('express').Router();
const lifxController = require('../../controllers/lifxController.js');

router
    .route('/')
    .get(lifxController.getToken);

module.exports = router;