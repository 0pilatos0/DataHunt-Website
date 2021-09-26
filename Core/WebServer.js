const http = require('http')
const path = require('path')
const HTMLLoader = require('../Loaders/HtmlLoader')
const Request = require('./Request')
const Response = require('./Response')
require('dotenv').config()
const fs = require('fs')
const User = require('../Models/User')
const Helper = require('./Helper')
const qs = require('querystring')

module.exports = class WebServer{
    #posts = []
    #gets = []
    #sessions = []
    #http = http.createServer(async (tReq, tRes) => {
        let req = new Request(tReq)
        let res = new Response(tRes)
        if(!path.extname(req.Url.pathname)){
            //#region session logic
            let sessionID = req.Cookies[Object.keys(req.Cookies).find(c => {
                return c == process.env.SESSIONCOOKIENAME
            })]
            let session = this.#sessions[Object.keys(this.#sessions).find(s => {
                return s == sessionID
            })]
            if(typeof session !== "undefined"){
                req.session = this.#sessions[sessionID]
            }
            else{
                let sessionID = Helper.RandomString(100)
                this.#sessions[sessionID] = {}
                res.CreateCookie(process.env.SESSIONCOOKIENAME, sessionID)
                req.session = this.#sessions[sessionID] 
            }
            //#endregion
            if(req.Method == "GET"){
                let callbacks = getCallbacks(this.#gets, req)
                if(typeof callbacks != "undefined"){
                    let doneCallbacks = 0
                    callbacks.map(async callback => {
                        await callback(req, res)
                        doneCallbacks++
                        if(doneCallbacks == callbacks.length){
                            this.#sessions[req.Cookies[process.env.SESSIONCOOKIENAME]] = req.session
                            res.End()
                        }
                    })
                }
                else{
                    res.Error()
                }
            }
            else if(req.Method == "POST"){
                let callbacks = getCallbacks(this.#posts, req)
                let body = ''
                tReq.on('data', (data) => {
                    body += data
                })
                tReq.on('end', async () => {
                    req.data = qs.parse(body)
                    req.data.has = (name) => {
                        return Object.keyys(req.data).includes(name)
                    }
                    if(typeof callbacks != "undefined"){
                        let doneCallbacks = 0
                        callbacks.map(async callback => {
                            await callback(req, res)
                            doneCallbacks++
                            if(doneCallbacks == callbacks.length){
                                this.#sessions[req.Cookies[process.env.SESSIONCOOKIENAME]] = req.session
                                res.End(JSON.stringify(req.data))
                            }
                        })
                    }
                    else{
                        res.Error()
                    }
                })
            }
            else{
                res.End()
            }
        }
        else if(req.Method === "GET" && path.extname(req.Url.pathname)){
            //Handles files such as js and css
            let filePath = `${__dirname}/../public${req.Url.pathname}`
            if(fs.existsSync(filePath)) {
                if(path.extname(filePath) == ".js"){
                    tRes.writeHead(200, {
                        'Content-Type': 'text/javascript'
                    })
                }
                res.End(fs.readFileSync(filePath))
            }
            else {
                console.info(filePath)
                console.info(`${req.Url.pathname} doesn't exist`)
                res.End()
            }
        }
    })

    constructor() {
        this.#http.listen(process.env.PORT, () => {
            console.log(`WebServer is running on http://${process.env.HOST}:${process.env.PORT}`)
        })
    }

    /**
     * This callback type is called `requestCallback` and is displayed as a global symbol.
     *
     * @callback RequestCallback
     * @param {Request} req
     * @param {Response} res
     */

    /**
     * 
     * @param {string} url 
     * @param {RequestCallback} callback 
     */
    get(url, callback){
        if(!this.#gets[url]){
            this.#gets[url] = []
        }
        this.#gets[url].push(callback)
    }

    /**
     * 
     * @param {string} url 
     * @param {RequestCallback} callback 
     */
    post(url, callback){
        if(!this.#posts[url]){
            this.#posts[url] = []
        }
        this.#posts[url].push(callback)
    }
}


function getCallbacks(responses, req){
    let splittedUrl = req.Url.pathname.substr(1, req.Url.pathname.length).split('/')
    req.params = []
    return responses[Object.keys(responses).find(get => {
        let splittedRequestUrl = get.substr(1, get.length).split('/')
        let index = 0
        let correct = splittedRequestUrl.every(piece => {
            if(piece.indexOf(':') == 0){
                let varName = piece.substr(1, piece.length)
                req.params[varName] = splittedUrl[index]
            }
            if(piece == splittedUrl[index] || piece.indexOf(':') == 0){
                index++
                return true
            }
        })
        if(splittedRequestUrl.length == splittedUrl.length && correct) return get
    })]
}