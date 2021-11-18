const Model = require("../../Core/Database/Model");

module.exports = class User extends Model {
    constructor(){
        super();
    }

    /**
     * @returns {String}
     */
    static get tableName(){
        return "users";
    }

    /**
     * @returns {UserObject}
     */
    static async find({select, where, orderBy}){
        return super.find({select, where, orderBy});
    }

    /**
     * @returns {UserObject}
     */
    static async findId({select, where, orderBy}){
        return super.findId({select, where, orderBy});
    }

    /**
     * @returns {Array.<UserObject>}
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
     * @returns {Array.<UserObject>}
     */
    static async all(){
        return super.all();
    }

    /**
     * @returns {UserObject}
     */
    static async first(){
        return super.first();
    }

    /**
     * @returns {UserObject}
     */
    static async last(){
        return super.last();
    }
}

/**
 * @typedef {Object} UserObject
 * @property {number} id
 * @property {string} username
 * @property {Date} created_at
 * @property {Date} updated_at
 */