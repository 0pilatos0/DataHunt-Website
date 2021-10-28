const fs = require('fs')
const path = require('path')
const Regex = require('../Core/Regex')

module.exports = class HTMLLoader{
    constructor() {
        
    }

    static Read(htmlFilePath){
        let vars = {}
        let html
        if(path.extname(htmlFilePath) === ".html"){
            if(fs.existsSync(htmlFilePath)){
                html = fs.readFileSync(htmlFilePath).toString()
                if(html.match(Regex.HTMLVar)){
                    html.match(Regex.HTMLVar).map(v => {
                        vars[v.replace(/[{}]/g, '')] = ''
                    })
                }
            }
            else return {html:'',vars:{}}
        } 
        else throw console.error(`${htmlFilePath} file extension must be .html`)
        return {
            html, 
            vars
        }
    }

    /**
     * 
     * @param {String} html 
     * @param {Object} vars 
     * @returns 
     */
    static Replace(html, vars){
        Object.keys(vars).map(v => {
            html = html.replaceAll(`{{${v}}}`, vars[v])
        })
        return html
    }
}