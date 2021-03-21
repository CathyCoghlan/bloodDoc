const Doctor = require('../models/doctor');
const Patient = require('../models/patient');
const Order = require('../models/order');
const Test = require('../models/test');
const httpMsgs = require('http-msgs');
const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');
const moment = require('moment');


exports.getAddPatient = (req, res, next) => {
    res.render('patient/edit-patient', {
        pageTitle: 'Add Patient',
        path: '/add-patient',
        editing: false
    });
};

exports.postAddPatient = (req, res, next) => {
    const firstName= req.body.firstName;
    const lastName= req.body.lastName;
    const dateOfBirth = req.body.dateOfBirth;
    const email = req.body.email;
    const gender = req.body.gender;
    const address = req.body.address;
    const county = req.body.county;
    const eircode= req.body.eircode; 
    const patient = new Patient({
      firstName: firstName,                         // Value on right is data rec'd, left refers to keys you define in your schema
      lastName:lastName,
      dateOfBirth: dateOfBirth,
      email: email,
      gender: gender,
      address: address,
      county: county,
      eircode: eircode,
      doctorId: req.doctor // same as req.user._id
    });
    patient
      .save()
      .then(result => {
         console.log(result);
        console.log('Patient Created');
        res.redirect('/patients');
      })
      .catch(err => {
        console.log(err);
      });
  };

  exports.getEditPatient = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
      return res.redirect('/');
    }
    const patientId = req.params.patientId;
    Patient.findById(patientId)
      .then(patient => {
        if (!patient) {
          return res.redirect('/');
        }
        res.render('patient/edit-patient', {
          pageTitle: 'Edit Product',
          path: '/edit-patient',
          editing: editMode,
          patient: patient
        });
      })
      .catch(err => console.log(err));
  };
  
 
exports.postEditPatient = (req, res, next) => {
    const patientId = req.body.patientId;
  const updatedFirstName= req.body.firstName;
  const updatedLastName= req.body.lastName;
  const updateDateOfBirth = req.body.dateOfBirth;
  const updatedEmail = req.body.email;
  const updatedGender = req.body.gender;
  const updatedAddress = req.body.address;
  const updatedCounty = req.body.county;
  const updatedeEircode= req.body.eircode; 
  console.log(patientId);

  Patient.findById(patientId)
  .then(patient => {
    patient.lastName = updatedLastName;
    patient.firstName = updatedFirstName;
    patient.dateOfBirth = updateDateOfBirth;
    patient.updatedEmail = updatedEmail;
    patient.gender = updatedGender;
    patient.address = updatedAddress;
    patient.updatedCounty = updatedCounty;
    patient.eircode = updatedeEircode
    return patient.save();
  })
    .then(result => {
      console.log('UPDATED Patient!');
      res.redirect('/patients');
    })
    .catch(err => console.log(err));
};
  
exports.getPatients = (req, res, next) => {
  Patient.find()
    .then(patients => {
      //console.log(patients);
      res.render('patient/patients', {
        patient: patients,
        pageTitle: 'Patients',
        path: '/patients'
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getPatient = (req, res, next) => {
  const patientId = req.params.patientId;
  Patient.findById(patientId)
  .then(patient => {
    Order.find({"patient.patientId": patient._id})
    .then(orders => {
      console.log(patient);
      res.render('patient/patient', {
        patient: patient,
        orders: orders,
        pageTitle: 'Patient Details',
        path: '/patient'
      });
    })
  })
  .catch(err => {
    console.log(err);
  });
};

exports.postDeletePatient = (req, res, next) => {
  const patientId = req.body.patientId;
  console.log(patientId);
  Patient.findByIdAndDelete(patientId)
    .then(() => {
      console.log('DESTROYED PATIENT');
      res.redirect('/patients');
    })
    .catch(err => console.log(err));
};

exports.getSelectPatient = (req, res, next) => {
  res.render('patient/select-patient', {
    pageTitle: 'Select Patient',
    path: '/select-patient'
    
});
}

exports.getOrderEntry = (req, res, next) => {
  var drugsTests = {};
  const patientId = req.params.patientId

  Patient.findById((patientId), function(err, pat){
      if(err){
          console.log(err)
      } else {
          Test.find({$or:[{group: '1'}, {group:'7'}]}, function(err, biot){
              if(err) {
                  console.log(err)
              } else {
                Test.find({department:'Immunology'}, function(err, immt){
                    if(err) {
                        console.log(err)
                    } else {
                        Test.find({department: 'Haematology'},function(err, haemt){
                            if(err) {
                                console.log(err)
                            } else {
                                Test.find({group: '2'}, function(err, drugst){
                                    if(err) {
                                        console.log(err)
                                    } else {
                                        drugsTests= drugst;
                                        res.render('patient/order-entry', {
                                            pageTitle:'Order Entry',
                                            path: '/order-entry',
                                            bioTests: biot,
                                            immTests: immt,
                                            haemTests: haemt,
                                            drugsTests: drugsTests,
                                            patient: pat
                                        })
                                    }
                                })
                            }
                        })
                    }
                })
              }
          })
      } 
  })
  
}





exports.getCart = (req, res, next) => {
  const patientId = req.params.patientId;
  req.doctor
  .populate('cart.items.testId')
  .execPopulate()
  .then(doctor => {                       // this returns the full doctor object => {cart: {items: [_id: etc]}}
    const tests = doctor.cart.items;   // this will just get us an array where the productId field is populated with the product information, so now in views structure is differnet. Product data is nested i porductId field so p.productId.title
    Patient.findById(patientId)
    .then(patient => {
      console.log(tests);
      res.render('patient/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        tests: tests,
        patient: patient
      });
    })

  })
  .catch(err => console.log(err));
};

exports.postCartDeleteTest = (req, res, next) => {
  const testId = req.params.testId;
  req.doctor
    .removeFromCart(testId)
    .then(result => {
      console.log('delete')
      res.status(200).json({
        message: 'Success'
      })
    })
    .catch(err => {
      res.status(500).json({message: 'failed'});
    });
};



exports.postOrder = (req, res, next) => {
  const patientId = req.body.patientId;
  console.log(patientId);
  req.doctor
  .populate('cart.items.testId')
  .execPopulate()
  .then(doctor => {
    Patient.findById(patientId)
    .then(patient => {
      const tests = doctor.cart.items.map(i => {
        return { quantity: i.quantity, test: {...i.testId._doc } };
      });
      const order = new Order({
        doctor: {
          email: req.doctor.email,
          doctorId: req.doctor
        },
        tests: tests,
        patient: {
          patientId: patient._id,
          firstName: patient.firstName,
          lastName: patient.lastName,
          dateOfBirth: patient.dateOfBirth,
          gender: patient.gender,
          time: new Date()

        } 
      });
      return order.save();
    })
    .then(result => {
      return req.doctor.clearCart()
    })
    .then(result => {
      console.log("Cart Cleared & Order Made")
      res.redirect('/orders');
    })
    .catch(err => console.log(err));
  })
    

   };
  
  

exports.postAddTest= (req, res, next) => {
  // get data from $ajax request
  const obj = JSON.parse(JSON.stringify(req.body));
  // get the test name
  const testId = obj.name;
  const docCart = req.doctor.cart.items;
  console.log(testId);

  Test.findById(testId)
  .then(test => {
    console.log(test);
    return req.doctor.addToCart(test);
  })
  .then(result => {
    console.log(result);
    
  });

}


exports.getOrders = (req, res, next) => {
    Order.find({"doctor.doctorId": req.doctor._id})
     .then(orders => {
       console.log(orders)
        res.render('patient/orders', {
        path:'/orders',
        pageTitle: 'My Orders',
        orders: orders
      })
    })
    .catch(err => console.log(err)); 
  }




//   var bioTests = {};
//   var immTests = {};
//   var haemTests = {};
//   var patient = {};
//   const patientId = req.params.patientId

//   Patient.findById((patientId), function(err, pat){
//     if(err){
//       console.log(err)
//     } else {
//       Test.find({department: 'Biochemistry'}, function(err, biot){
//         if(err){
//           console.log(err)
//         } else {
//           Test.find({department: 'Immunology'}, function(err, immt){
//             if(err){
//               console.log(err)
//             } else {
//               Test.find({department: 'Haematology'}, function(err, haemt){
//                 if(err){
//                   console.log(err)
//                 } else {
//                   haemTests = haemt;
//                   res.render('patient/order-entry', {
//                     pageTitle: 'Order Entry',
//                     path: '/order-entry',
//                     bioTests: biot,
//                     immTests: immt,
//                     haemTests: haemTests,
//                     patient: pat
//                   })
//                 }
//               })
//             }
//           })

//         }
//       })
//     }
//   })
  
// }

  // Patient.findById((patientId), function(err, pat){
  //   if(err){
  //     console.log(err)
  //   } else {
  //     patient = pat;
  //   }
  // });
  // Test.find(({department: 'Biochemistry'}), function(err, biot){
  //   if(err){
  //     console.log(err)
  //   } else {
  //     bioTests = biot;
  //   }
  // });
  // Test.find(({department: 'Haematology'}), function(err, haemt){
  //   if(err){
  //     console.log(err)
  //   } else {
  //     haemTests = haemt;
  //   }
  // });
  // Test.find(({department: 'Immunology'}), function(err, immt){
  //   if(err){
  //     console.log(err)
  //   } else {
  //     immTests = immt;
  //     res.render('patient/order-entry', {
  //       pageTitle: 'Order Entry',
  //       path: '/order-entry',
  //       patient: patient,
  //       bioTests: bioTests,
  //       immTests: immTests,
  //       haemTests: haemTests
        
  //   });

  //   }
  // });
// };


// exports.postAddTest= (req, res, next) => {
//   // get data from $ajax request
//   const obj = JSON.parse(JSON.stringify(req.body));
//   // get the test name
//   const test = obj.name;
//   const docCart = req.doctor.cart.items;


//   console.log(docCart);
  
//   Test.findOne({name: test})
//   .then(test => {
//       console.log(test);
//       const testN = test.name;
//       console.log(testN);
//       docCart.push({
//         testName: testN
//       })
//       return req.doctor.save();
//   })
//   .then(result => {
//     console.log('Added test')
//   })
//   .catch(err => console.log(err));

//   // httpMsgs.sendJSON(req, res, {
//   //   // from: "Server"
//   // })
// }



// exports.postOrder = (req, res, next) => {
//   const patientId = req.body.patientId;
//   console.log(patientId);
//   req.doctor
//   .populate('cart.items.testId')
//   .execPopulate()
//   .then(doctor => {
//     Patient.findById(patientId)
//     .then(patient => {
//       const tests = doctor.cart.items.map(i => {
//         return { quantity: i.quantity, test: {...i.testId._doc } };
//       });
//       const order = new Order({
//         doctor: {
//           email: req.doctor.email,
//           doctorId: req.doctor
//         },
//         tests: tests,
//         patient: patient._id
//       });
//       return order.save();
//     })
//     .populate('patient')
//     .execPopulate()
//     .then(result => {
//       return order.save();
//     })
//     .then(result => {
//       return req.doctor.clearCart()
//     })
//     .then(result => {
//       console.log("Cart Cleared & Order Made")
//       res.redirect('/');
//     })
//     .catch(err => console.log(err));
//   })
    

//    };
  