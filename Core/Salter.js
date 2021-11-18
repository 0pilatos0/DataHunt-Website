const bcrypt = require('bcrypt')

module.exports = class Salter {
    constructor(){

    }
    
    /**
     Hashes the password from string and returns hashedpassword as string
     @param {String} password
    **/
    static HashPassword(password){
        return bcrypt.hashSync(password, 12)
    }

    /**
     Verifies the string password and hashed password and return boolean
     @param {String} password
     @param {String} hashedPassword the already hashed password from database
    **/
    static VerifyPassword(password, hashedPassword){
        return bcrypt.compareSync(password, hashedPassword)
    }
}