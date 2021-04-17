const path = require("path");

const express = require("express");

const doctorController = require("../controllers/doctor");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.get("/", isAuth, doctorController.getIndex);

router.get("/my-account", isAuth, doctorController.getDoctor);

router.post("/edit-my-account", isAuth, doctorController.postDoctorEdit);

router.get("/sample-quality", isAuth, doctorController.getSampleQuality);

router.get("/tests", isAuth, doctorController.getTests);

router.get("/add-test", isAuth, doctorController.getAddTest);

router.post("/add-test", isAuth, doctorController.postAddTest);

router.get("/test/:testId", isAuth, doctorController.getTest);

module.exports = router;
