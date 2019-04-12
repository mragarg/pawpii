const Organization = require('../models/organization');
const User = require('../models/user');

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
}

async function addDogDB(req, res) {

    // console.log('----------THIS IS TOP OF TESTING LINE SESSION----------')
    // console.log(req.session.user);
    // console.log('----------THIS IS BOTTOM OF TESTING LINE SESSION----------')

    const userInstance = await User.getById(req.session.user);
    // console.log(userInstance);
    // console.log(userInstance.orgId);

    if(userInstance.orgId === null) {
        res.send("Access Denied! User is not an organization.");
    }
    else{
        console.log('Adding Dog');
        await userInstance.addDog(req.body.dogName, req.body.dogBreed, req.body.dogAge, req.body.dogDescription, req.body.dogImg);
        console.log('ADDED :)  Dog');
    }
}

function deleteDogForm(req, res) {
    res.render('delete-dog');
}


module.exports = {
    getAllDogs,
    addDogForm,
    addDogDB,
    deleteDogForm
}