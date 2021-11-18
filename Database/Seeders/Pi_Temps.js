const Seeder = require("../../Core/Database/Seeder");

module.exports = class Pi_Temps extends Seeder{
    constructor(){
        super();
    }

    /**
     * @returns {String}
     */
    static get tableName(){
        return "pi_temps";
    }

    /**
     * @param {Object} data to seed table Pi_Temps
	 * @param {string} data.temp Temp
     */
    static async Seed(data){
        if(typeof data.temp != "undefined"){
			if(typeof data.temp !== "string"){
				throw new Error('temp must be typeof string');
			}
		}
		else {
			data.temp = "";
			const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split("");
			for (let i = 0; i < 25; i++) {
				data.name += chars[Math.round(Math.random() * chars.length)];
			}
		};
        super.Seed(data);
    }
}