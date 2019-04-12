const db = require('./conn');
const bcrypt = require('bcryptjs');

class User {

    constructor(id, first_name, last_name, email, password, org_id) {
        this.id = id;
        this.firstName = first_name;
        this.lastName = last_name;
        this.email = email;
        this.password = password;
        this.orgId = org_id;
    }
    
    static getByEmail(email) {
        return db.one(`select * from users where email=$1`, [email])
            .then((userData) => {
                const aUser = new User(
                    userData.id,
                    userData.first_name,
                    userData.last_name,
                    userData.email,
                    userData.password);
                return aUser;
            })
            .catch(() => {
                console.log("catchdasdasdsadad");
                return null;
            });
    }

    // adds a user
    static add(firstName, lastName, email, password, orgId) {
        return db.one(`
        insert into users 
        (first_name, last_name, email, password, org_id)
        values 
        ($1, $2, $3, $4, $5)
        returning id, first_name, last_name, email, password, org_id
        `, [firstName, lastName, email, password, orgId])
        .then((data) => {
            return data;
        })
    }
    
    // save user data
    save() {
        return db.result(`            
        update users set 
            first_name='${this.firstName}',
            last_name='${this.lastName}',
            email='${this.email}',
            password='${this.password}'
        where id=${this.id}
        `);
    }

    // create hash for password
    setPassword(newPassword) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(newPassword, salt);
        this.password = hash;
    }

    // check to see if password match hashed password
    checkPassword(aPassword) {
        return bcrypt.compareSync(aPassword, this.password);
    }

    // get all data from all users
    static getAll() {
        return db.any(`select * from users`)
            .then((arrayOfUsers) => {
                return arrayOfUsers.map((userData) => {
                    const userInstance = new User(
                        userData.id, 
                        userData.first_name, 
                        userData.last_name, 
                        userData.email, 
                        userData.password
                    );
                    return userInstance;
                })
            })
    }

    // get all data from a user by id
    static getById(id) {
        return db.one(`select * from users where id=${id}`)
            .then((userData) => {
                const userInstance = new User(
                    userData.id, 
                    userData.first_name,
                    userData.last_name,
                    userData.email,
                    userData.password,
                    userData.org_id
                    );
                return userInstance;
            })
    }

}

module.exports = User;