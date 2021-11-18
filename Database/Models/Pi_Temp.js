const Model = require("../../Core/Database/Model");

module.exports = class Pi_Temp extends Model {
    static tableName = "pi_temps";

    constructor(){
        super();
    }

    /**
     * @returns {Pi_TempObject}
     */
    static async find({select, where, orderBy}){
        return super.find({select, where, orderBy});
    }

    /**
     * @returns {Pi_TempObject}
     */
    static async findId({select, where, orderBy}){
        return super.findId({select, where, orderBy});
    }

    /**
     * @returns {Array.<Pi_TempObject>}
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
     * @returns {Array.<Pi_TempObject>}
     */
    static async all(){
        return super.all();
    }

    /**
     * @returns {Pi_TempObject}
     */
    static async first(){
        return super.first();
    }

    /**
     * @returns {Pi_TempObject}
     */
    static async last(){
        return super.last();
    }
}

/**
 * @typedef {Object} Pi_TempObject
 * @property {number} id
 * @property {string} temp
 * @property {Date} created_at
 * @property {Date} updated_at
 */