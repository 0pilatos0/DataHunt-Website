const Model = require("../../Core/Database/Model");

module.exports = class Character extends Model {
    static tableName = "characters";

    constructor(){
        super();
    }

    /**
     * @returns {CharacterObject}
     */
    static async find({select, where, orderBy}){
        return super.find({select, where, orderBy});
    }

    /**
     * @returns {CharacterObject}
     */
    static async findId({select, where, orderBy}){
        return super.findId({select, where, orderBy});
    }

    /**
     * @returns {Array.<CharacterObject>}
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
     * @returns {Array.<CharacterObject>}
     */
    static async all(){
        return super.all();
    }

    /**
     * @returns {CharacterObject}
     */
    static async first(){
        return super.first();
    }

    /**
     * @returns {CharacterObject}
     */
    static async last(){
        return super.last();
    }
}

/**
 * @typedef {Object} CharacterObject
 * @property {number} id
 * @property {string} name
 * @property {number} user_id
 * @property {number} class_id
 * @property {number} stats_id
 * @property {number} kills
 * @property {string} deaths
 * @property {number} level
 * @property {Date} created_at
 * @property {Date} updated_at
 */