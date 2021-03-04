exports.getAddPatient = (req, res, next) => {
    res.render('patient/add-patient', {
        pageTitle: 'Add Patient',
        path: '/add-patient'
    });
};

