const Model = require("../../Core/Database/Model");

module.exports = class Users_Role extends Model {
    static tableName = "users_roles";

    constructor(){
        super();
    }

    /**
     * @returns {Users_RoleObject}
     */
    static async find({select, where, orderBy}){
        return super.find({select, where, orderBy});
    }

    /**
     * @returns {Users_RoleObject}
     */
    static async findId({select, where, orderBy}){
        return super.findId({select, where, orderBy});
    }

    /**
     * @returns {Array.<Users_RoleObject>}
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
     * @returns {Array.<Users_RoleObject>}
     */
    static async all(){
        return super.all();
    }

    /**
     * @returns {Users_RoleObject}
     */
    static async first(){
        return super.first();
    }

    /**
     * @returns {Users_RoleObject}
     */
    static async last(){
        return super.last();
    }
}

/**
 * @typedef {Object} Users_RoleObject
 * @property {number} id
 * @property {number} user_id
 * @property {number} role_id
 * @property {Date} created_at
 * @property {Date} updated_at
 */