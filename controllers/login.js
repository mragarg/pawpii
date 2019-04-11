const User = require('../models/user');
const escapeHtml = require('../utils');

function getLoginPage(req, res) {
    res.render('login', {
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
        req.session.user = theUser.id;
        req.session.save(() => {
            res.redirect('/');
        });
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