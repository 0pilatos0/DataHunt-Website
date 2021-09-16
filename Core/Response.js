const http = require('http')
const HTMLLoader = require('../Loaders/HtmlLoader')
const path = require('path')
const fs = require('fs')

module.exports = class Response{
    #res

    /**
     * 
     * @param {http.ServerResponse} res 
     */
    constructor(res) {
        this.#res = res
    }

    Redirect(url){
        this.#res.writeHead(302, {
            Location: `http://${process.env.HOST}:${process.env.PORT}${url}`
        })
    }

    SendFile(path){
        if(fs.existsSync(path)) this.Send(fs.readFileSync(path))
        else console.error(`${path} doesn't exist`)
    }

    Send(data){
        this.#res.write(data)
    }

    Render(pageName, vars = {}){
        let templatePage = HTMLLoader.Read(`${__dirname}/../public/views/template.html`)
        let htmlPage = HTMLLoader.Read(`${__dirname}/../public${pageName}.html`)
        Object.keys(vars).map(v => {
            htmlPage.vars[v] = vars[v]
        })
        if(!path.extname(pageName)) this.Send(HTMLLoader.Replace(templatePage.html, {
            body: htmlPage.html
        }))
        else console.error("Please don't provide an extension")
    }

    Cookie(name, value, maxAge = 30 * 24 * 3600){
        this.#res.writeHead(200, {
            'Set-Cookie': `${name}=${value}; Max-Age=${maxAge}`
        })
    }

    DeleteCookie(name){
        this.#res.writeHead(200, {
            'Set-Cookie': `${name}=; Max-Age=0`
        })
    }

    End(data){
        this.#res.end(data)
    }

    Error(){
        this.Render('404')
        this.End()
    }
}