const Model = require("../../Core/Database/Model");

module.exports = class Class extends Model {
    static tableName = "class";

    constructor(){
        super();
    }

    /**
     * @returns {ClassObject}
     */
    static async find({select, where, orderBy}){
        return super.find({select, where, orderBy});
    }

    /**
     * @returns {ClassObject}
     */
    static async findId({select, where, orderBy}){
        return super.findId({select, where, orderBy});
    }

    /**
     * @returns {Array.<ClassObject>}
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
     * @returns {Array.<ClassObject>}
     */
    static async all(){
        return super.all();
    }

    /**
     * @returns {ClassObject}
     */
    static async first(){
        return super.first();
    }

    /**
     * @returns {ClassObject}
     */
    static async last(){
        return super.last();
    }
}

/**
 * @typedef {Object} ClassObject
 * @property {number} id
 * @property {number} attack
 * @property {number} health
 * @property {number} speed
 * @property {number} defense
 * @property {Date} created_at
 * @property {Date} updated_at
 */