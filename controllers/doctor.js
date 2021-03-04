exports.getIndex = (req, res, next) => {
    res.render('doctor/index', {
        pageTitle: 'Homepage',
        path: '/'
    });
};

exports.getMyAccount = (req, res, next) => {
    res.render('doctor/my-account', {
        pageTitle: 'My Account',
        path: '/doctor/my-account'
    });
};


exports.getSampleQuality = (req, res, next) => {
    res.render('doctor/sample-quality', {
        pageTitle: 'Sample Quality',
        path: '/doctor/sampleQuality'
    });
};







