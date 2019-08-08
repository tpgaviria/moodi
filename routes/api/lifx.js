const router = require('express').Router();
const lifxController = require('../../controllers/lifxController.js');

router.route('/change')
    .get(lifxController.changeLights);

router
    .route('/data')
    .get(lifxController.getToken);


module.exports = router;