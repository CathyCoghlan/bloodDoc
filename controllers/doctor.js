const doctor = require('../models/doctor');
const Doctor = require('../models/doctor');
const Product = require('../models/product');

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


exports.getTests= (req, res, next) => {
  res.render('doctor/tests', {
      pageTitle: 'All Tests',
      path: '/tests'
  });
};







