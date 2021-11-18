const Model = require("../../Core/Database/Model");

module.exports = class Profile_Picture extends Model {
    constructor(){
        super();
    }

    /**
     * @returns {String}
     */
    static get tableName(){
        return "profile_pictures";
    }

    /**
     * @returns {Profile_PictureObject}
     */
    static async find({select, where, orderBy}){
        return super.find({select, where, orderBy});
    }

    /**
     * @returns {Profile_PictureObject}
     */
    static async findId({select, where, orderBy}){
        return super.findId({select, where, orderBy});
    }

    /**
     * @returns {Array.<Profile_PictureObject>}
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
     * @returns {Array.<Profile_PictureObject>}
     */
    static async all(){
        return super.all();
    }

    /**
     * @returns {Profile_PictureObject}
     */
    static async first(){
        return super.first();
    }

    /**
     * @returns {Profile_PictureObject}
     */
    static async last(){
        return super.last();
    }
}

/**
 * @typedef {Object} Profile_PictureObject
 * @property {number} id
 * @property {number} user_id
 * @property {string} picture
 * @property {Date} created_at
 * @property {Date} updated_at
 */