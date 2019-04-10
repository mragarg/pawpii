const User = require('../models/user');

function getLoginPage(req, res) {
    res.render('user-login');
}

module.exports = {
    getLoginPage
}