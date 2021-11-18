const Model = require("../../Core/Database/Model");

module.exports = class Characters_Achievement extends Model {
    static tableName = "characters_achievements";

    constructor(){
        super();
    }

    /**
     * @returns {Characters_AchievementObject}
     */
    static async find({select, where, orderBy}){
        return super.find({select, where, orderBy});
    }

    /**
     * @returns {Characters_AchievementObject}
     */
    static async findId({select, where, orderBy}){
        return super.findId({select, where, orderBy});
    }

    /**
     * @returns {Array.<Characters_AchievementObject>}
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
     * @returns {Array.<Characters_AchievementObject>}
     */
    static async all(){
        return super.all();
    }

    /**
     * @returns {Characters_AchievementObject}
     */
    static async first(){
        return super.first();
    }

    /**
     * @returns {Characters_AchievementObject}
     */
    static async last(){
        return super.last();
    }
}

/**
 * @typedef {Object} Characters_AchievementObject
 * @property {number} id
 * @property {number} character_id
 * @property {number} achievement_id
 * @property {number} progress_value
 * @property {number} required_value
 * @property {Date} created_at
 * @property {Date} updated_at
 */