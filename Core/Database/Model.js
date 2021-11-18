const MySQL = require("./MySQL")

module.exports = class Model{
    static async find({select, where, orderBy}){
        let data = await Model.select({select, where, orderBy, limit: 1});
        if(data.length > 0){
            return data[0];
        }
        else{
            return false;
        }
    }

    static async findId({select, where, orderBy}){
        let data = await Model.select({select, where, orderBy, limit: 1});
        if(data.length > 0){
            return data[0].id;
        }
        else{
            return false;
        }
    }

    static async select({select, where, orderBy, limit}){
        let whereData = parseWhere(where);
        return await MySQL.query(`SELECT ${select || "*"} FROM ${this.tableName}${where != null ? `WHERE ${whereData.whereString}` : ""}${limit ? `LIMIT ${limit}` : ""}`, whereData.values);
    }

    static async update({where, set}){
        let values = []
        let whereData = parseWhere(where);
        values = values.concat(whereData.values);
        let setData = parseSet(set);
        values = values.concat(setData.values);
        return await MySQL.query(`UPDATE ${this.tableName} SET ${setData.setString} ${where != null ? `WHERE ${whereData.whereString}` : ""}`, values);
    }

    static async delete({where}){
        let whereData = parseWhere(where);
        return await MySQL.query(`DELETE FROM ${this.tableName} WHERE ${whereData.whereString}`, whereData.values);
    }

    static async create({create}){
        let createData = parseCreate(create);
        return await MySQL.query(`INSERT INTO ${this.tableName} (${createData.createString}) VALUES (${createData.valuesString})`, createData.values)
    }

    static async all(){
        return await MySQL.query(`SELECT * FROM ${this.tableName}`);
    }

    static async first(){
        return await MySQL.query(`SELECT * FROM ${this.tableName} LIMIT 1`);
    }

    static async last(){
        return await MySQL.query(`SELECT * FROM ${this.tableName} ORDER BY id DESC LIMIT 1`);
    }
}

function parseWhere(where){
    let whereString = "";
    let values = [];
    Object.keys(where).map(key => {
        whereString += `${key} = ?`;
        values.push(where[key]);
        if(Object.keys(where).indexOf(key) != Object.keys(where).length - 1){
            whereString += " AND ";
        }
    });
    return {whereString, values};
}

function parseSet(set){
    let setString = "";
    let values = [];
    Object.keys(set).map(key => {
        setString += `${key} = ?`;
        values.push(set[key]);
        if(Object.keys(set).indexOf(key) != Object.keys(set).length - 1){
            setString += ", ";
        }
    })
    return {setString, values};
}

function parseCreate(create){
    let createString = "";
    let valuesString = "";
    let values = [];
    Object.keys(create).map(key => {
        createString += `${key}`;
        valuesString += "?";
        values.push(create[key]);
        if(Object.keys(create).indexOf(key) != Object.keys(create).length - 1){
            createString += ", ";
            valuesString += ", ";
        }
    });
}