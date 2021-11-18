const Model = require("../../Core/Database/Model");

module.exports = class Role extends Model {
    static tableName = "roles";

    constructor(){
        super();
    }

    /**
     * @returns {RoleObject}
     */
    static async find({select, where, orderBy}){
        return super.find({select, where, orderBy});
    }

    /**
     * @returns {RoleObject}
     */
    static async findId({select, where, orderBy}){
        return super.findId({select, where, orderBy});
    }

    /**
     * @returns {Array.<RoleObject>}
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
     * @returns {Array.<RoleObject>}
     */
    static async all(){
        return super.all();
    }

    /**
     * @returns {RoleObject}
     */
    static async first(){
        return super.first();
    }

    /**
     * @returns {RoleObject}
     */
    static async last(){
        return super.last();
    }
}

/**
 * @typedef {Object} RoleObject
 * @property {number} id
 * @property {string} name
 * @property {Date} created_at
 * @property {Date} updated_at
 */