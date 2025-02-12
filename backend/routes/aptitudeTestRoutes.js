const express = require('express');
const router = express.Router();
const aptitudeTestController = require('../controllers/aptitudeTestController');

router.get('/start-test', aptitudeTestController.startTest);

router.post('/submit-test', aptitudeTestController.submitTest);

router.get('/results', aptitudeTestController.getResults);

module.exports = router;
