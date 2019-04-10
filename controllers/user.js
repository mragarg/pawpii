const User = require('../models/user');
const escapeHtml = require('../utils');

function getLoginPage(req, res) {
    res.render('user-login', {
        locals: {
            email: '',
        }
    });
}

async function attemptLogin(req, res) {

    const theEmail = escapeHtml(req.body.email);
    const thePassword = escapeHtml(req.body.password);

    const theUser = await User.getByEmail(theEmail);
    const passwordIsCorrect = theUser.checkPassword(thePassword);

    if(passwordIsCorrect) {
        res.redirect('/user/dashboard');
    }
    else {
        res.render('user-login', {
            locals: {
                email: req.body.email
            }
        })
    }

}

module.exports = {
    getLoginPage,
    attemptLogin
}