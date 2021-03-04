const path = require('path');

const express = require('express');

const doctorController = require('../controllers/doctor');

const router = express.Router();

router.get('/', doctorController.getIndex);

router.get('/my-account', doctorController.getMyAccount);

router.get('/sample-quality', doctorController.getSampleQuality);



module.exports = router;
