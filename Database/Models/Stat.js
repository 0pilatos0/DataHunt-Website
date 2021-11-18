const Model = require("../../Core/Database/Model");

module.exports = class Stat extends Model {
    static tableName = "stats";

    constructor(){
        super();
    }

    /**
     * @returns {StatObject}
     */
    static async find({select, where, orderBy}){
        return super.find({select, where, orderBy});
    }

    /**
     * @returns {StatObject}
     */
    static async findId({select, where, orderBy}){
        return super.findId({select, where, orderBy});
    }

    /**
     * @returns {Array.<StatObject>}
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
     * @returns {Array.<StatObject>}
     */
    static async all(){
        return super.all();
    }

    /**
     * @returns {StatObject}
     */
    static async first(){
        return super.first();
    }

    /**
     * @returns {StatObject}
     */
    static async last(){
        return super.last();
    }
}

/**
 * @typedef {Object} StatObject
 * @property {number} id
 * @property {number} user_id
 * @property {number} money
 * @property {number} exp
 * @property {number} level
 * @property {number} health
 * @property {number} attack
 * @property {number} speed
 * @property {number} defense
 * @property {Date} created_at
 * @property {Date} updated_at
 */