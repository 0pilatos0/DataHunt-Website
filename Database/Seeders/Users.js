const Seeder = require("../../Core/Database/Seeder");

module.exports = class Users extends Seeder{
    constructor(){
        super();
    }

    /**
     * @returns {String}
     */
    static get tableName(){
        return "users";
    }

    /**
     * @param {Object} data to seed table Users
	 * @param {string} data.username Username
     */
    static async Seed(data){
        if(typeof data.username != "undefined"){
			if(typeof data.username !== "string"){
				throw new Error('username must be typeof string');
			}
		}
		else {
			data.username = "";
			const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split("");
			for (let i = 0; i < 25; i++) {
				data.name += chars[Math.round(Math.random() * chars.length)];
			}
		};
        super.Seed(data);
    }
}