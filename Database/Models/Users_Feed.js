const Model = require("../../Core/Database/Model");

module.exports = class Users_Feed extends Model {
    static tableName = "users_feed";

    constructor(){
        super();
    }

    /**
     * @returns {Users_FeedObject}
     */
    static async find({select, where, orderBy}){
        return super.find({select, where, orderBy});
    }

    /**
     * @returns {Users_FeedObject}
     */
    static async findId({select, where, orderBy}){
        return super.findId({select, where, orderBy});
    }

    /**
     * @returns {Array.<Users_FeedObject>}
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
     * @returns {Array.<Users_FeedObject>}
     */
    static async all(){
        return super.all();
    }

    /**
     * @returns {Users_FeedObject}
     */
    static async first(){
        return super.first();
    }

    /**
     * @returns {Users_FeedObject}
     */
    static async last(){
        return super.last();
    }
}

/**
 * @typedef {Object} Users_FeedObject
 * @property {number} id
 * @property {number} user_id
 * @property {string} message
 * @property {Date} time
 * @property {Date} created_at
 * @property {Date} updated_at
 */