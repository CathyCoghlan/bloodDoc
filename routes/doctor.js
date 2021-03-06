const path = require('path');

const express = require('express');

const doctorController = require('../controllers/doctor');

const router = express.Router();

router.get('/', doctorController.getIndex);

router.get('/my-account', doctorController.getDoctor);

router.get('/doctor-account', doctorController.getDoctor);

router.get('/sample-quality', doctorController.getSampleQuality);



module.exports = router;
