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
            orgs:  orgsInState
        }
    });
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