const Organization = require('../models/organization');

async function getAllDogs(req, res) {
    const {id} = req.params
    const dogsArray = await Organization.retrieveDogsById(id);
    const orgInfo = await Organization.retrieveOrgInfo(id);
    console.log(orgInfo);
    console.log('*******************');

    res.render('org-dogs', {
        locals: {
            dogs: dogsArray,
            orgs: orgInfo
        }
    });
}

function addDogForm(req, res) {
    res.render('add-dog');
    console.log("TEST *!$#!@#$!@#$*!@#$*!@#$*!@*#$!@*#$*!@#$*!@#*$!@*#$*E!@#*$!@*$*!@#$*");
    console.log(req.session.user);
    console.log("TEST *!$#!@#$!@#$*!@#$*!@#$*!@*#$!@*#$*!@#$*!@#*$!@*#$*E!@#*$!@*$*!@#$*");

}



module.exports = {
    getAllDogs,
    addDogForm
}