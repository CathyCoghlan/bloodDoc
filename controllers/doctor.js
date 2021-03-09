const doctor = require('../models/doctor');
const Doctor = require('../models/doctor');
const Test = require('../models/test');
const Patient = require('../models/patient');

exports.getIndex = (req, res, next) => {
    res.render('doctor/index', {
        pageTitle: 'Homepage',
        path: '/'
    });
};

 exports.getDoctor = (req, res, next) => {
    Doctor.find()
      .then(products => {
        console.log(products);
        res.render('doctor/my-account', {
          doctor: products,
          pageTitle: 'My Account',
          path: '/my-account'
        });
      })
      .catch(err => {
        console.log(err);
      });
  };


exports.getSampleQuality = (req, res, next) => {
    res.render('doctor/sample-quality', {
        pageTitle: 'Sample Quality',
        path: '/doctor/sampleQuality'
    });
};

exports.getTests = (req, res, next) => {
  Test.find()
    .then(tests => {
      //console.log(patients);
      res.render('doctor/tests', {
        test: tests,
        pageTitle: 'Tests',
        path: '/tests'
      });
    })
    .catch(err => {
      console.log(err);
    });
};


exports.getAddTest= (req, res, next) => {
  res.render('admin/add-test', {
      pageTitle: 'All Tests',
      path: '/add-test'
  });
};

exports.postAddTest = (req, res, next) => {
  const name = req.body.name;
  const department = req.body.department;
  const turnAroundTime= req.body.turnAroundTime;
  const group = req.body.group;
  const specimenType = req.body.specimenType;
  const details = req.body.details;
  const test = new Test({
    name: name,                         // Value on right is data rec'd, left refers to keys you define in your schema
    department: department,
    turnAroundTime: turnAroundTime,
    group: group,
    specimenType: specimenType,
    details: details    
  });
  test
    .save()
    .then(result => {
      // console.log(result);
      console.log('Test Created');
      res.redirect('/tests');
    })
    .catch(err => {
      console.log(err);
    });
};









