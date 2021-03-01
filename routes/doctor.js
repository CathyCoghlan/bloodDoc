const path = require('path');

const express = require('express');

const doctorController = require('../controllers/doctor');

const router = express.Router();

router.get('/', doctorController.getIndex);


module.exports = router;
