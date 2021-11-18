const mysql = require('mysql');
require('dotenv').config({
    path: '../.env'
})

let con = mysql.createConnection({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASS,
    port: process.env.DBPORT
})

module.exports = class MySQL{
    static connect(database = null){
        if(database != null){
            con.config.database = database;
        }
        con.connect(err => {
            if(err) throw err;
            console.log("Connected to database");
        });
    }

    static query(sql, values){
        return new Promise((resolve, reject) => {
            con.query(sql, values, (err, result) => {
                if(err) return reject(err);
                return resolve(result);
            });
        });
    }
}