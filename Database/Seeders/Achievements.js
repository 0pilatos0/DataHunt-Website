const Seeder = require("../../Core/Database/Seeder");

module.exports = class Achievements extends Seeder{
    constructor(){
        super();
    }

    /**
     * @returns {String}
     */
    static get tableName(){
        return "achievements";
    }

    /**
     * @param {Object} data to seed table Achievements
	 * @param {string} data.name Name
	 * @param {string} data.description Description
	 * @param {string} data.achievement_type Achievement_Type
     */
    static async Seed(data){
        if(typeof data.name != "undefined"){
			if(typeof data.name !== "string"){
				throw new Error('name must be typeof string');
			}
		}
		else {
			data.name = "";
			const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split("");
			for (let i = 0; i < 25; i++) {
				data.name += chars[Math.round(Math.random() * chars.length)];
			}
		}
		if(typeof data.description != "undefined"){
			if(typeof data.description !== "string"){
				throw new Error('description must be typeof string');
			}
		}
		else {
			data.description = "";
			const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split("");
			for (let i = 0; i < 25; i++) {
				data.name += chars[Math.round(Math.random() * chars.length)];
			}
		}
		if(typeof data.achievement_type != "undefined"){
			if(typeof data.achievement_type !== "string"){
				throw new Error('achievement_type must be typeof string');
			}
		}
		else {
			data.achievement_type = "";
			const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split("");
			for (let i = 0; i < 25; i++) {
				data.name += chars[Math.round(Math.random() * chars.length)];
			}
		};
        super.Seed(data);
    }
}