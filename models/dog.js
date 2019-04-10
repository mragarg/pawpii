const db = require('./conn');

class Dog {

    constructor(id, name, breed, age, description, image_url, org_id) {
        this.id = id;
        this.name = name;
        this.breed = breed;
        this.age = age;
        this.description = description;
        this.imageUrl = image_url;
        this.orgId = org_id;
    }

    // get all dogs
    static getAll() {
        db.any(`select * from dogs`);
    }

    // get all dogs from an organization
    static getById(orgId) {
        db.any(`select * from dogs where org_id=$1`, [orgId]);
    }

}

module.exports = Dog;