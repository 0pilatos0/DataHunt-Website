const Model = require("../../Core/Database/Model");

module.exports = class Friend extends Model {
    static tableName = "friends";

    constructor(){
        super();
    }

    /**
     * @returns {FriendObject}
     */
    static async find({select, where, orderBy}){
        return super.find({select, where, orderBy});
    }

    /**
     * @returns {FriendObject}
     */
    static async findId({select, where, orderBy}){
        return super.findId({select, where, orderBy});
    }

    /**
     * @returns {Array.<FriendObject>}
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
     * @returns {Array.<FriendObject>}
     */
    static async all(){
        return super.all();
    }

    /**
     * @returns {FriendObject}
     */
    static async first(){
        return super.first();
    }

    /**
     * @returns {FriendObject}
     */
    static async last(){
        return super.last();
    }
}

/**
 * @typedef {Object} FriendObject
 * @property {number} id
 * @property {number} user_id
 * @property {number} sender_id
 * @property {number} receiver_id
 * @property {string} status
 * @property {Date} created_at
 * @property {Date} updated_at
 */