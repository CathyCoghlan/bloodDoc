const doctor = require("../models/doctor");
const Doctor = require("../models/doctor");
const Test = require("../models/test");
const Patient = require("../models/patient");
const { get } = require("../routes/patient");

exports.getIndex = (req, res, next) => {
  const name = req.doctor.lastName;
  console.log(name);
  res.render("doctor/index", {
    pageTitle: "Homepage",
    path: "/",
    name: name,
  });
};

exports.getDoctor = (req, res, next) => {
  const name = req.doctor.lastName;
  const email = req.doctor.email;
  Doctor.find({ email: email })
    .then((doctor) => {
      res.render("doctor/my-account", {
        doctor: doctor,
        pageTitle: "My Account",
        path: "/my-account",
        name: name,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getSampleQuality = (req, res, next) => {
  console.log(req.doctor._id);
  const name = req.doctor.lastName;
  res.render("doctor/sample-quality", {
    pageTitle: "Sample Quality",
    path: "/doctor/sampleQuality",
    name: name,
  });
};

exports.getTests = (req, res, next) => {
  const name = req.doctor.lastName;
  Test.find()
    .then((tests) => {
      //console.log(patients);
      res.render("doctor/tests", {
        test: tests,
        pageTitle: "Tests",
        path: "/tests",
        name: name,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getTest = (req, res, next) => {
  const name = req.doctor.lastName;
  const testId = req.params.testId;
  Test.findById(testId)
    .then((test) => {
      console.log(test);
      res.render("doctor/test-details", {
        test: test,
        pageTitle: "test Details",
        path: "/test-details",
        name: name,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getAddTest = (req, res, next) => {
  const name = req.doctor.lastName;
  res.render("admin/add-test", {
    pageTitle: "All Tests",
    path: "/add-test",
    name: name,
  });
};

exports.postAddTest = (req, res, next) => {
  const name = req.body.name;
  const department = req.body.department;
  const turnAroundTime = req.body.turnAroundTime;
  const group = req.body.group;
  const specimenType = req.body.specimenType;
  const image = req.body.image;
  const details = req.body.details;
  const test = new Test({
    name: name, // Value on right is data rec'd, left refers to keys you define in your schema
    department: department,
    turnAroundTime: turnAroundTime,
    group: group,
    specimenType: specimenType,
    image: image,
    details: details,
  });
  test
    .save()
    .then((result) => {
      // console.log(result);
      console.log("Test Created");
      res.redirect("/tests");
    })
    .catch((err) => {
      console.log(err);
    });
};
