const doctor = require('../models/doctor');
const Doctor = require('../models/doctor');
const Product = require('../models/product');

exports.getIndex = (req, res, next) => {
    res.render('doctor/index', {
        pageTitle: 'Homepage',
        path: '/'
    });
};

exports.getMyAccount = (req, res, next) => {
    Doctor.find()
      .then(doctor => {
        console.log(doctor);
        res.render('doctor/my-account', {
          docs: doctor,
          pageTitle: 'All Products',
          path: '/my-account'
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  exports.getDoctor = (req, res, next) => {
    Doctor.find()
      .then(products => {
        console.log(products);
        res.render('doctor/doctor-account', {
          doctor: products,
          pageTitle: 'All Products',
          path: '/doctor-account'
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







