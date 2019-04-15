const User = require('../models/user');
const escapeHtml = require('../utils');

async function getLoginPage(req, res) {
    if (req.session.user) {
        const userInstance = await User.getById(req.session.user);
        if (userInstance.orgId) {
            res.render('error', {
                locals: {
                    message: 'Already logged in as an organizaion.',
                    signup: 'd-none',
                    login: 'd-none',
                    favorite: 'Favorite',
                    ad: 'd-none',
                    dogs: 'd-none',
                    logout: 'Log out',
                    id: ''
                }
            });
        } else if (userInstance.orgId === null) {
            res.render('error', {
                locals: {
                    message: 'Already logged in as a user.',
                    signup: 'd-none',
                    login: 'd-none',
                    favorite: 'Favorite',
                    ad: 'd-none',
                    dogs: 'd-none',
                    logout: 'Log out',
                    id: ''
                }
            });
        }
    } else {
        res.render('login', {
            locals: {
                email: '',
                message: 'Please login.',
                signup: 'Sign up',
                login: 'Log in',
                favorite: 'd-none',
                ad: 'd-none',
                dogs: 'd-none',
                logout: 'd-none',
                id: ''
            }
        });
    }
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
                    ad: 'd-none',
                    dogs: 'd-none',
                    logout: 'd-none',
                    id: ''
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
                ad: 'd-none',
                dogs: 'd-none',
                logout: 'd-none',
                id: ''
            }
        })
    }

}

module.exports = {
    getLoginPage,
    attemptLogin
}