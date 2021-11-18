const Model = require("../../Core/Database/Model");

module.exports = class Achievement extends Model {
    static tableName = "achievements";

    constructor(){
        super();
    }

    /**
     * @returns {AchievementObject}
     */
    static async find({select, where, orderBy}){
        return super.find({select, where, orderBy});
    }

    /**
     * @returns {AchievementObject}
     */
    static async findId({select, where, orderBy}){
        return super.findId({select, where, orderBy});
    }

    /**
     * @returns {Array.<AchievementObject>}
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
     * @returns {Array.<AchievementObject>}
     */
    static async all(){
        return super.all();
    }

    /**
     * @returns {AchievementObject}
     */
    static async first(){
        return super.first();
    }

    /**
     * @returns {AchievementObject}
     */
    static async last(){
        return super.last();
    }
}

/**
 * @typedef {Object} AchievementObject
 * @property {number} id
 * @property {string} name
 * @property {string} description
 * @property {string} achievement_type
 * @property {Date} created_at
 * @property {Date} updated_at
 */