
function checkLogin(req, res) {
    if (req.session.user) {
        res.render('home', {
            locals: {
                signup: 'd-none',
                login: 'd-none',
                favorite: 'Favorite',
                logout: 'Log out'

            }
        });
    } else {
        res.render('home', {
            locals: {
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