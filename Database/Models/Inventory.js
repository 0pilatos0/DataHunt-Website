const Model = require("../../Core/Database/Model");

module.exports = class Inventory extends Model {
    static tableName = "inventory";

    constructor(){
        super();
    }

    /**
     * @returns {InventoryObject}
     */
    static async find({select, where, orderBy}){
        return super.find({select, where, orderBy});
    }

    /**
     * @returns {InventoryObject}
     */
    static async findId({select, where, orderBy}){
        return super.findId({select, where, orderBy});
    }

    /**
     * @returns {Array.<InventoryObject>}
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
     * @returns {Array.<InventoryObject>}
     */
    static async all(){
        return super.all();
    }

    /**
     * @returns {InventoryObject}
     */
    static async first(){
        return super.first();
    }

    /**
     * @returns {InventoryObject}
     */
    static async last(){
        return super.last();
    }
}

/**
 * @typedef {Object} InventoryObject
 * @property {number} id
 * @property {number} character_id
 * @property {string} json
 * @property {Date} created_at
 * @property {Date} updated_at
 */