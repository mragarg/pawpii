const Dog = require('../models/dog');

// render all dog pictures
async function getAll(req, res) {
    const dogsArray = await Dog.getAlldogs();
    res.render('all-dogs', {
        locals: {
            dogs: dogsArray,
            signup: 'Sign up',
            login: 'Log in',
            favorite: 'Favorite',
            logout: 'Log out'
        }
    });
}

async function checkLogin(req, res) {
    const dogsArray = await Dog.getAlldogs();
    if (req.session.user) {
        res.render('all-dogs', {
            locals: {
                dogs: dogsArray,
                signup: 'd-none',
                login: 'd-none',
                favorite: 'Favorite',
                logout: 'Log out'

            }
        });
    } else {
        res.render('all-dogs', {
            locals: {
                dogs: dogsArray,
                signup: 'Sign up',
                login: 'Log in',
                favorite: 'd-none',
                logout: 'd-none'

            }
        });
    }
}


module.exports = {
    getAll,
    checkLogin
}