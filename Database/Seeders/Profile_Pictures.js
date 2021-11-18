const Seeder = require("../../Core/Database/Seeder");

module.exports = class Profile_Pictures extends Seeder{
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
     * @param {Object} data to seed table Profile_Pictures
	 * @param {number} data.user_id User_Id
	 * @param {string} data.picture Picture
     */
    static async Seed(data){
        if(typeof data.user_id != "undefined"){
			if(typeof data.user_id !== "number"){
				throw new Error('user_id must be typeof number');
			}
		}
		else {
			data.user_id = Math.round(Math.random() * 255);
		}
		if(typeof data.picture != "undefined"){
			if(typeof data.picture !== "string"){
				throw new Error('picture must be typeof string');
			}
		}
		else {
			data.picture = "";
			const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split("");
			for (let i = 0; i < 25; i++) {
				data.name += chars[Math.round(Math.random() * chars.length)];
			}
		};
        super.Seed(data);
    }
}