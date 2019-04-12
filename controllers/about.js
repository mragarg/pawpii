

function checkLogin(req, res) {
    if (req.session.user) {
        res.render('about', {
            locals: {
                message: 'About page.',
                signup: 'd-none',
                login: 'd-none',
                favorite: 'Favorite',
                logout: 'Log out'
            }
        });
    } else {
        res.render('about', {
            locals: {
                message: 'About page.',
                signup: 'Sign up',
                login: 'Log in',
                favorite: 'd-none',
                logout: 'd-none'

            }
        });
    }
}

module.exports = {
    checkLogin
}

