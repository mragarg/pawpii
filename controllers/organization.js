const Organization = require('../models/organization');
const User = require('../models/user');

async function getAllDogs(req, res) {
    const {id} = req.params
    const dogsArray = await Organization.retrieveDogsById(id);
    const orgInfo = await Organization.retrieveOrgInfo(id);
    console.log(req.body.orgId);
    // console.log(orgId)
    console.log('*******************');
    
    if (req.session.user) {
        const userInstance = await User.getById(req.session.user);
        if (userInstance.orgId) {
            res.render('org-dogs', {
                locals: {
                    dogsA: dogsArray,
                    orgs: orgInfo,
                    signup: 'd-none',
                    login: 'd-none',
                    favorite: 'd-none',
                    ad: 'Add / Delete',
                    dogs: 'Current dogs',
                    logout: 'Log out',
                    id: userInstance.orgId,
                    orgId: orgInfo.id
                }
            });
        } else if (userInstance.orgId === null) {
            res.render('org-dogs', {
                locals: {
                    dogsA: dogsArray,
                    orgs: orgInfo,
                    signup: 'd-none',
                    login: 'd-none',
                    favorite: 'Favorite',
                    ad: 'd-none',
                    dogs: 'd-none',
                    logout: 'Log out',
                    id: userInstance.orgId
                }
            });
        }
    } else {
        res.render('org-dogs', {
            locals: {
                dogsA: dogsArray,
                orgs: orgInfo,
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

async function addDogForm(req, res) {

    if (req.session.user) {
        const userInstance = await User.getById(req.session.user);
        if (userInstance.orgId) {
            const dogsArray = await Organization.retrieveDogsById(req.session.user);
            const orgInfo = await Organization.retrieveOrgInfo(req.session.user);

            res.render('add-dog', {
                locals: {
                    message: 'About page.',
                    signup: 'd-none',
                    login: 'd-none',
                    favorite: 'd-none',
                    ad: 'Add / Delete',
                    dogs: 'Current dogs',
                    logout: 'Log out',
                    id: userInstance.orgId,
                    dogs: dogsArray,
                    org: orgInfo
                }
            });
        } else if (userInstance.orgId === null) {
            res.render('add-dog', {
                locals: {
                    message: 'About page.',
                    signup: 'd-none',
                    login: 'd-none',
                    favorite: 'Favorite',
                    ad: 'd-none',
                    dogs: 'd-none',
                    logout: 'Log out',
                    id: userInstance.orgId
                }
            });
        }
    } else {
        res.render('add-dog', {
            locals: {
                message: 'About page.',
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
        res.redirect(`/organization/dogs/${userInstance.orgId}`)
    }
}

async function deleteDogForm(req, res) {
    const {id} = req.params
    console.log (id)
    const dogsArray = await Organization.retrieveDogsById(req.session.user);
    console.log(dogsArray)
    console.log('DOGSARAYYYYYYYYYYYYYYYYYYYYY)@)*(#*$^&^$&')
    const userInstance = await User.getById(req.session.user);
    console.log(userInstance)
    console.log('USERINSTANCEEEEEEEE)@)*(#*$^&^$&')
console.log(req.body.dogId)
console.log('isidisjdisjdijsidjsidjidsjidsjidsjisdjisjd')
    await userInstance.deleteFavorite(id);
    await userInstance.deleteDog(id);
    console.log(dogsArray)
     const orgInfo = await Organization.retrieveOrgInfo(req.session.user);
    if (req.session.user) {
        const userInstance = await User.getById(req.session.user);

        if (userInstance.orgId) {
            res.render('add-dog', {
                locals: {
                    signup: 'd-none',
                    login: 'd-none',
                    favorite: 'd-none',
                    ad: 'Add / Delete',
                    dogs: 'Current dogs',
                    logout: 'Log out',
                    id: userInstance.orgId,
                    dogs: dogsArray,
                    org: orgInfo
                }
            });
        } else if (userInstance.orgId === null) {
            res.render('delete-dog', {
                locals: {
                    signup: 'd-none',
                    login: 'd-none',
                    favorite: 'Favorite',
                    ad: 'd-none',
                    dogs: 'd-none',
                    logout: 'Log out',
                    id: userInstance.orgId
                }
            });
        }
    } else {
        res.render('delete-dog', {
            locals: {
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


module.exports = {
    getAllDogs,
    addDogForm,
    addDogDB,
    deleteDogForm
}