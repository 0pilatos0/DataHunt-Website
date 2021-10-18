const Model = require("../Core/Model");

module.exports = class File extends Model{
    static table = "files"
    
    constructor() {
        super();
    }
}