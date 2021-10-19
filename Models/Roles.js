const Model = require("../Core/Model");

module.exports = class Roles extends Model{
    static table = "roles"
    
    constructor() {
        super();
    }
}