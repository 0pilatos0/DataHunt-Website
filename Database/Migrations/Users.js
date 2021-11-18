const Table = require("../../Core/Database/Table")

module.exports = class Users extends Table{
    constructor() {
        super()
        this.create('users', {
            username: "VARCHAR(255) U NN"
        })
    }
}