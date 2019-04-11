const User = require('../models/user');
const escapeHtml = require('../utils');

function getLoginPage(req, res) {
    res.render('login', {
        locals: {
            email: '',
            message: 'Please login.',
        }
    });
}

async function attemptLogin(req, res) {

    console.log(req.body.email);
    console.log(req.body.password);
    const theEmail = escapeHtml(req.body.email);
    const thePassword = escapeHtml(req.body.password);

    const theUser = await User.getByEmail(theEmail);
    if (theUser) {
        const passwordIsCorrect = theUser.checkPassword(thePassword);
        if(passwordIsCorrect) {
            req.session.user = theUser.id;
            req.session.save(() => {
                res.redirect('/');
            });
        }
        else {
            res.render('login', {
                locals: {
                    email: theEmail,
                    message: 'Password is incorrect. Please try again.',
                }
            })
        }

    } else {
        res.render('login', {
            locals: {
                email: theEmail,
                message: 'Email is incorrect. Please try again.',
            }
        })
    }

}

module.exports = {
    getLoginPage,
    attemptLogin
}