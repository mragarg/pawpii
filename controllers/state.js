const Organization = require('../models/organization');



async function orgsByState(req, res) {
    console.log("test ************")
    console.log(req.params.state);
    const {state} = req.params;
    const allOrgs = await Organization.retrieveInfoByState(state);
    console.log(allOrgs)
    res.render('orgs-by-state', {
        locals: {
            orgs: allOrgs

        }

    })

}
// async function orgDogs(req, res) {
// console.log('test*********************')
// const id = 3;
// console.log(id);
// res.redirect (`org-dogs/${id}`);

// }


module.exports = {
    orgsByState
    // orgDogs
}