const Dog = require('../models/dog');
const Organization = require('../models/organization');
const User = require('../models/user');

// render all dog pictures
async function getAll(req, res) {
    // const statesArray = "Georgia"
    console.log(req.body)
    console.log(req.body.state)
    const dogsArray = await Dog.getAlldogs();
    const orgsInState = await Organization.retrieveInfoByState(req.body.name)
    console.log(orgsInState)
    // const orgsState= orgsInState.
    if (req.session.user) {
        const userInstance = await User.getById(req.session.user);
        if (userInstance.orgId) {
            res.render('all-dogs', {
                locals: {
                    message: 'About page.',
                    dogsA: dogsArray,
                    signup: 'd-none',
                    login: 'd-none',
                    favorite: 'd-none',
                    ad: 'Add / Delete',
                    dogs: 'Current dogs',
                    logout: 'Log out',
                    id: userInstance.orgId,
                    orgs: orgsInState
                }
            });
        } else if (userInstance.orgId === null) {
            res.render('all-dogs', {
                locals: {
                    message: 'About page.',
                    dogsA: dogsArray,
                    signup: 'd-none',
                    login: 'd-none',
                    favorite: 'Favorite',
                    ad: 'd-none',
                    dogs: 'd-none',
                    logout: 'Log out',
                    id: userInstance.orgId,
                    orgs: orgsInState
                }
            });
        }
    } else {
        res.render('all-dogs', {
            locals: {
                message: 'About page.',
                dogsA: dogsArray,
                signup: 'Sign up',
                login: 'Log in',
                favorite: 'd-none',
                ad: 'd-none',
                dogs: 'd-none',
                logout: 'd-none',
                id: '',
                orgs: orgsInState
            }
        });
    }
}
async function statesPost(req,res) {
    const state= req.body.state;
    console.log(state);
    res.redirect(`/state/${state}`)
}


module.exports = {
    getAll,
    statesPost
}