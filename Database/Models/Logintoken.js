const Model = require("../../Core/Database/Model");

module.exports = class Logintoken extends Model {
    static tableName = "logintokens";

    constructor(){
        super();
    }

    /**
     * @returns {LogintokenObject}
     */
    static async find({select, where, orderBy}){
        return super.find({select, where, orderBy});
    }

    /**
     * @returns {LogintokenObject}
     */
    static async findId({select, where, orderBy}){
        return super.findId({select, where, orderBy});
    }

    /**
     * @returns {Array.<LogintokenObject>}
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
     * @returns {Array.<LogintokenObject>}
     */
    static async all(){
        return super.all();
    }

    /**
     * @returns {LogintokenObject}
     */
    static async first(){
        return super.first();
    }

    /**
     * @returns {LogintokenObject}
     */
    static async last(){
        return super.last();
    }
}

/**
 * @typedef {Object} LogintokenObject
 * @property {number} id
 * @property {number} user_id
 * @property {string} token
 * @property {Date} created_at
 * @property {Date} updated_at
 */