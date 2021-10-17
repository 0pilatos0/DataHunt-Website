const Model = require("../Core/Model");

module.exports = class Role extends Model{
    static table = "users_roles"
    
    constructor() {
        super();
    }
}