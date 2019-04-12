const Dog = require('../models/dog');
const Organization = require('../models/organization')

// render all dog pictures
async function getAll(req, res) {
    // const statesArray = "Georgia"
    console.log(req.body)
    console.log(req.body.state)
    const dogsArray = await Dog.getAlldogs();
    const orgsInState = await Organization.retrieveInfoByState(req.body.name)
    console.log(orgsInState)
    // const orgsState= orgsInState.

    res.render('all-dogs', {
        locals: {
            dogs: dogsArray,
            signup: 'Sign up',
            login: 'Log in',
            favorite: 'Favorite',
            logout: 'Log out',
            orgs:  orgsInState
        }
    });
}
async function statesPost(req,res) {
    const state= req.body.state;
    console.log(state);
    res.redirect(`/state/${state}`)
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
    checkLogin,
    statesPost
}