const Model = require("../../Core/Database/Model");

module.exports = class File extends Model {
    static tableName = "files";

    constructor(){
        super();
    }

    /**
     * @returns {FileObject}
     */
    static async find({select, where, orderBy}){
        return super.find({select, where, orderBy});
    }

    /**
     * @returns {FileObject}
     */
    static async findId({select, where, orderBy}){
        return super.findId({select, where, orderBy});
    }

    /**
     * @returns {Array.<FileObject>}
     */
    static async select({select, where, orderBy, limit}){
        return super.select({select, where, orderBy, limit});
    }

    /**
     * @returns {Boolean}
     */
    static async create({create}){
        return super.create({create});
    }

    /**
     * @returns {Boolean}
     */
    static async update({where, set}){
        return super.update({where, set});
    }

    /**
     * @returns {Boolean}
     */
    static async delete({where}){
        return super.delete({where});
    }

    /**
     * @returns {Array.<FileObject>}
     */
    static async all(){
        return super.all();
    }

    /**
     * @returns {FileObject}
     */
    static async first(){
        return super.first();
    }

    /**
     * @returns {FileObject}
     */
    static async last(){
        return super.last();
    }
}

/**
 * @typedef {Object} FileObject
 * @property {number} id
 * @property {string} name
 * @property {string} file
 * @property {Date} created_at
 * @property {Date} updated_at
 */