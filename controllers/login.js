const User = require('../models/user');
const escapeHtml = require('../utils');

function getLoginPage(req, res) {
        res.render('login', {
            locals: {
                email: '',
                message: 'Please login.',
                signup: 'Sign up',
                login: 'Log in',
                favorite: 'd-none',
                logout: 'd-none'
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
                    signup: 'Sign up',
                    login: 'Log in',
                    favorite: 'd-none',
                    logout: 'd-none'
                }
            })
        }

    } else {
        res.render('login', {
            locals: {
                email: theEmail,
                message: 'Email is incorrect. Please try again.',
                signup: 'Sign up',
                login: 'Log in',
                favorite: 'd-none',
                logout: 'd-none'
            }
        })
    }

}

function checkLogin(req, res) {
    if (req.session.user) {
        res.render('login', {
            locals: {
                email: '',
                message: 'Please log in',
                signup: 'd-none',
                login: 'd-none',
                favorite: 'Favorite',
                logout: 'Log out'

            }
        });
    } else {
        res.render('login', {
            locals: {
                email: '',
                message: 'Please log in',
                signup: 'Sign up',
                login: 'Log in',
                favorite: 'd-none',
                logout: 'd-none'

            }
        });
    }
}

module.exports = {
    getLoginPage,
    attemptLogin,
    checkLogin
}