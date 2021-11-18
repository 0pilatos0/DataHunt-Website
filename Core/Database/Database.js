const MySQL = require("./MySQL")

module.exports = class Database{
    static create(name){
        MySQL.query(`DROP DATABASE IF EXISTS ${name}`)
        MySQL.query(`CREATE DATABASE IF NOT EXISTS ${name}`) // IF NOT EXISTS ${name}
        MySQL.query(`USE ${name}`)
    }

    //TODO extend database
}