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
	 * @param {string} data.name Name
	 * @param {string} data.username Username
	 * @param {string} data.email Email
	 * @param {string} data.password Password
	 * @param {number} data.enabled Enabled
	 * @param {string} data.resetpassword Resetpassword
	 * @param {string} data.verifytoken Verifytoken
	 * @param {number} data.verified Verified
	 * @param {string} data.resettoken Resettoken
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
		}
		if(typeof data.email != "undefined"){
			if(typeof data.email !== "string"){
				throw new Error('email must be typeof string');
			}
		}
		else {
			data.email = "";
			const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split("");
			for (let i = 0; i < 25; i++) {
				data.name += chars[Math.round(Math.random() * chars.length)];
			}
		}
		if(typeof data.password != "undefined"){
			if(typeof data.password !== "string"){
				throw new Error('password must be typeof string');
			}
		}
		else {
			data.password = "";
			const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split("");
			for (let i = 0; i < 25; i++) {
				data.name += chars[Math.round(Math.random() * chars.length)];
			}
		}
		if(typeof data.enabled != "undefined"){
			if(typeof data.enabled !== "number"){
				throw new Error('enabled must be typeof number');
			}
		}
		if(typeof data.resetpassword != "undefined"){
			if(typeof data.resetpassword !== "string"){
				throw new Error('resetpassword must be typeof string');
			}
		}
		else {
			data.resetpassword = "";
			const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split("");
			for (let i = 0; i < 25; i++) {
				data.name += chars[Math.round(Math.random() * chars.length)];
			}
		}
		if(typeof data.verifytoken != "undefined"){
			if(typeof data.verifytoken !== "string"){
				throw new Error('verifytoken must be typeof string');
			}
		}
		else {
			data.verifytoken = "";
			const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split("");
			for (let i = 0; i < 25; i++) {
				data.name += chars[Math.round(Math.random() * chars.length)];
			}
		}
		if(typeof data.verified != "undefined"){
			if(typeof data.verified !== "number"){
				throw new Error('verified must be typeof number');
			}
		}
		if(typeof data.resettoken != "undefined"){
			if(typeof data.resettoken !== "string"){
				throw new Error('resettoken must be typeof string');
			}
		}
		else {
			data.resettoken = "";
			const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split("");
			for (let i = 0; i < 25; i++) {
				data.name += chars[Math.round(Math.random() * chars.length)];
			}
		};
        super.Seed(data);
    }
}