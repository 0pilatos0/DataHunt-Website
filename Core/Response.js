const http = require('http')
const HTMLLoader = require('../Loaders/HTMLLoader')
const path = require('path')
const fs = require('fs')
const Feedback = require('../Core/Feedback/Feedback');
const FeedbackEnum = require('../Core/Feedback/FeedbackEnum');
const Utils = require('./Utils');

module.exports = class Response{
    #res
    #req

    /**
     * 
     * @param {http.ServerResponse} res 
     */
    constructor(res, req) {
        this.#res = res
        this.#req = req
    }

    Redirect(url){
        this.#res.writeHead(302, {
            Location: `${Utils.URL}${url}`
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
        let templatePage = HTMLLoader.Read(`${__dirname}/../Public/views/template.html`)
        let htmlPage = HTMLLoader.Read(`${__dirname}/../Public${pageName}.html`)
        Object.keys(vars).map(v => {
            htmlPage.vars[v] = vars[v]
        })
        htmlPage.html = HTMLLoader.Replace(templatePage.html, {
            body: htmlPage.html,
            feedback: this.#req.session.feedback?.join(""),
            code: `
                <script>
                    ${this.#req.session.user ? "" : `document.getElementById("profile").style.display = "none"`}
                    ${this.#req.session.user ? "" : `document.getElementById("logout").style.display = "none"`}
                    ${this.#req.session.user ? `document.getElementById("login").style.display = "none"` : ""}
                    ${this.#req.session.user ? `document.getElementById("register").style.display = "none"` : ""}
                    ${this.#req.session.user?.roles.indexOf("admin") > -1 ? "" : `document.getElementById("admin").style.display = "none"` }
                </script>
            `
        })
        delete this.#req.session.feedback
        if(!path.extname(pageName)) this.Send(HTMLLoader.Replace(htmlPage.html, htmlPage.vars))
        else console.log("Please don't provide an extension")
    }

    CreateCookie(name, value, maxAge = 30 * 24 * 3600){
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
        this.Render('/views/404')
        this.End()
    }

    WriteHead(statusCode, content){
        this.#res.writeHead(statusCode, content)
    }
}