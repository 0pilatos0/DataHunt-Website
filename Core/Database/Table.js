const MySQL = require("./MySQL");
// const pluralize = require("pluralize");

module.exports = class Table{
    // #links = {

    // }

    /**
     * creates a table with columns
     * @param {String} name 
     * @param {Object} columns 
     * @returns {Void]}
     */
    create(name, columns){
        let columnString = "id INT AUTO_INCREMENT PRIMARY KEY, ";
        Object.keys(columns).map(key => {
            columns[key] = columns[key].replace("U", "UNIQUE").replace("AI", "AUTO_INCREMENT").replace("PK", "PRIMARY KEY").replace("NN", "NOT NULL")
            // if(key.includes('_')){
            //     console.log(key)
            //     let tableAndColumn = key.split('_', 2)
            //     console.log(tableAndColumn)
            //     console.log(pluralize(tableAndColumn[0]))
            //     this.#links[tableAndColumn[0]] = MySQL.query(`SELECT * FROM ${pluralize(tableAndColumn[0])} WHERE ${tableAndColumn[1] = }`)
            // }
            columnString += `${key} ${columns[key]}, `
            // if(Object.keys(columns).indexOf(key) != Object.keys(columns).length - 1){
            //     columnString += ", "
            // }
        });
        columnString += "created_at DATETIME DEFAULT CURRENT_TIMESTAMP, ";
        columnString += "updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP";
        // console.log(pluralize.singular(name))
        MySQL.query(`CREATE TABLE IF NOT EXISTS ${name} (${columnString})`);
    }

    /**
     * drops a table
     * @param {String} name 
     */
    drop(name){
        MySQL.query(`DROP TABLE IF EXISTS ${name}`);
    }
    //TODO extend table
}