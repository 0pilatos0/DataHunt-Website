const Model = require("../../Core/Database/Model");

module.exports = class Item extends Model {
    static tableName = "items";

    constructor(){
        super();
    }

    /**
     * @returns {ItemObject}
     */
    static async find({select, where, orderBy}){
        return super.find({select, where, orderBy});
    }

    /**
     * @returns {ItemObject}
     */
    static async findId({select, where, orderBy}){
        return super.findId({select, where, orderBy});
    }

    /**
     * @returns {Array.<ItemObject>}
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
     * @returns {Array.<ItemObject>}
     */
    static async all(){
        return super.all();
    }

    /**
     * @returns {ItemObject}
     */
    static async first(){
        return super.first();
    }

    /**
     * @returns {ItemObject}
     */
    static async last(){
        return super.last();
    }
}

/**
 * @typedef {Object} ItemObject
 * @property {number} id
 * @property {string} name
 * @property {number} required_level
 * @property {string} type
 * @property {number} rarity
 * @property {number} min_value
 * @property {number} max_value
 * @property {string} texture
 * @property {Date} created_at
 * @property {Date} updated_at
 */